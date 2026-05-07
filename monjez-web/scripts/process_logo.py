"""Process the raw Monjez logo PNG into clean, transparent brand assets.

Removes the cream background + faint geometric pattern, decontaminates edges,
and exports tight-cropped variants:
  - brand/monjez-logo-full.png    (text lockup + icon)
  - brand/monjez-logo-full@2x.png
  - brand/monjez-mark.png         (icon mark only — for navbar/footer)
  - brand/monjez-mark@2x.png
  - brand/monjez-wordmark.png     (Arabic + English text only)
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(r'c:/projects/Monjez/public')
SRC = ROOT / 'logo.png'
OUT = ROOT / 'brand'
OUT.mkdir(parents=True, exist_ok=True)


def to_rgba_alpha(arr: np.ndarray) -> np.ndarray:
    """Compute a clean alpha mask: high for saturated or dark pixels, 0 for cream bg."""
    rgb = arr[:, :, :3].astype(np.float32)
    r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    gray = (r + g + b) / 3.0
    mx = np.maximum(np.maximum(r, g), b)
    mn = np.minimum(np.minimum(r, g), b)
    sat = mx - mn

    # Darkness score: anything below 215 starts to be content; below 150 fully opaque.
    dark = np.clip((215.0 - gray) / 65.0, 0.0, 1.0)
    # Saturation score: cream bg is ~6-12 sat, real colors are >35.
    satsc = np.clip((sat - 22.0) / 50.0, 0.0, 1.0)

    alpha = np.maximum(dark, satsc)
    # Suppress speckle from the very faint geometric line pattern (low sat + just slightly grey).
    speckle = (gray > 195) & (sat < 20)
    alpha = np.where(speckle, 0.0, alpha)
    return alpha


def decontaminate(arr: np.ndarray, alpha: np.ndarray, bg=(235.0, 235.0, 226.0)) -> np.ndarray:
    """Pull cream tint out of semi-transparent edge pixels so they don't muddy on dark UI."""
    rgb = arr[:, :, :3].astype(np.float32)
    bg = np.array(bg, dtype=np.float32)
    a = alpha[:, :, None]
    # Solve: observed = a*fg + (1-a)*bg  =>  fg = (observed - (1-a)*bg) / a
    safe_a = np.where(a < 0.05, 1.0, a)
    fg = (rgb - (1.0 - a) * bg) / safe_a
    fg = np.clip(fg, 0.0, 255.0)
    out = np.zeros_like(arr)
    out[:, :, :3] = fg.astype(np.uint8)
    out[:, :, 3] = (alpha * 255.0).astype(np.uint8)
    return out


def smooth_alpha(alpha: np.ndarray) -> np.ndarray:
    """Light Gaussian smoothing on alpha to reduce stair-stepping from the threshold."""
    a8 = (alpha * 255.0).astype(np.uint8)
    img = Image.fromarray(a8, mode='L')
    img = img.filter(ImageFilter.GaussianBlur(radius=0.6))
    return np.asarray(img, dtype=np.float32) / 255.0


def crop_to_alpha(rgba: np.ndarray, pad: int = 24) -> np.ndarray:
    a = rgba[:, :, 3]
    ys, xs = np.where(a > 8)
    if len(ys) == 0:
        return rgba
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, rgba.shape[0])
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, rgba.shape[1])
    return rgba[y0:y1, x0:x1]


def save_resized(rgba: np.ndarray, path: Path, target_w: int) -> None:
    h, w = rgba.shape[:2]
    if w != target_w:
        new_h = round(h * target_w / w)
        img = Image.fromarray(rgba, mode='RGBA').resize(
            (target_w, new_h), Image.LANCZOS
        )
    else:
        img = Image.fromarray(rgba, mode='RGBA')
    img.save(path, 'PNG', optimize=True)
    print(f'  wrote {path.name}: {img.size}')


def main() -> None:
    print(f'Loading {SRC}')
    img = Image.open(SRC).convert('RGBA')
    arr = np.asarray(img)
    print(f'  source: {arr.shape[1]}x{arr.shape[0]}')

    alpha = to_rgba_alpha(arr)
    alpha = smooth_alpha(alpha)
    rgba = decontaminate(arr, alpha)

    # Full lockup (text + icon)
    full = crop_to_alpha(rgba, pad=20)
    print(f'\nFull lockup cropped: {full.shape[1]}x{full.shape[0]}')
    save_resized(full, OUT / 'monjez-logo-full@2x.png', 1600)
    save_resized(full, OUT / 'monjez-logo-full.png', 800)

    # The split: text ends ~x=1334, icon starts ~x=1472 in source coords.
    # After crop_to_alpha removed top/left/right padding, recompute split using vertical
    # column-density gap (works regardless of source coords).
    a = full[:, :, 3]
    col_density = (a > 8).sum(axis=0)
    # Find the longest run of empty columns somewhere in the middle 30-70%.
    w = full.shape[1]
    lo, hi = int(w * 0.30), int(w * 0.72)
    empty = col_density[lo:hi] == 0
    # Find largest contiguous empty span
    best_start, best_len, cur_start, cur_len = 0, 0, 0, 0
    for i, e in enumerate(empty):
        if e:
            if cur_len == 0:
                cur_start = i
            cur_len += 1
            if cur_len > best_len:
                best_len = cur_len
                best_start = cur_start
        else:
            cur_len = 0
    if best_len > 30:
        split_x = lo + best_start + best_len // 2
        print(f'  found gap: {best_len}px at x={lo + best_start}, split @ {split_x}')
    else:
        split_x = w // 2
        print(f'  no clear gap, using midpoint {split_x}')

    # Layout in source: NUMBERS on left, ICON on right.
    # Wait — the source image: looking at column density earlier, content is BOTH at
    # x=552-1334 (text) and x=1472-2420 (icon). RTL layout keeps Arabic text first.
    # So left side = text (Arabic + English), right side = icon mark.
    wordmark = full[:, :split_x]
    mark = full[:, split_x:]

    # Re-tighten each
    wordmark = crop_to_alpha(wordmark, pad=24)
    mark = crop_to_alpha(mark, pad=24)
    print(f'\nWordmark: {wordmark.shape[1]}x{wordmark.shape[0]}')
    print(f'Mark:     {mark.shape[1]}x{mark.shape[0]}')

    save_resized(wordmark, OUT / 'monjez-wordmark@2x.png', 1000)
    save_resized(wordmark, OUT / 'monjez-wordmark.png', 500)

    save_resized(mark, OUT / 'monjez-mark@2x.png', 512)
    save_resized(mark, OUT / 'monjez-mark.png', 256)

    print('\nDone.')


if __name__ == '__main__':
    main()
