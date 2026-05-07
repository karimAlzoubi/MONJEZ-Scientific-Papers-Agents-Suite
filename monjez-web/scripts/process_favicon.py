"""Generate favicon variants from the cleaned mark.

Outputs:
  - public/favicon.png       (32x32 — fallback)
  - public/favicon-192.png   (192x192 — PWA / Android)
  - public/favicon-512.png   (512x512 — PWA / Apple touch)
  - public/apple-touch-icon.png (180x180 with dark rounded square so iOS doesn't slap white bg)
"""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(r'c:/projects/Monjez/public')
MARK = ROOT / 'brand' / 'monjez-mark@2x.png'

mark = Image.open(MARK).convert('RGBA')


def fit_into(canvas_size: int, padding_ratio: float = 0.10) -> Image.Image:
    """Place mark centered in a transparent canvas with padding."""
    canvas = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))
    pad = int(canvas_size * padding_ratio)
    inner = canvas_size - 2 * pad
    w, h = mark.size
    scale = min(inner / w, inner / h)
    nw, nh = round(w * scale), round(h * scale)
    resized = mark.resize((nw, nh), Image.LANCZOS)
    x = (canvas_size - nw) // 2
    y = (canvas_size - nh) // 2
    canvas.paste(resized, (x, y), resized)
    return canvas


def with_dark_square(canvas_size: int, radius_ratio: float = 0.22) -> Image.Image:
    """Mark on a rounded dark navy square (matches site bg-ink-950)."""
    bg = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(bg)
    radius = int(canvas_size * radius_ratio)
    draw.rounded_rectangle((0, 0, canvas_size - 1, canvas_size - 1), radius=radius, fill=(10, 26, 47, 255))
    fg = fit_into(canvas_size, padding_ratio=0.14)
    bg.paste(fg, (0, 0), fg)
    return bg


def save(img: Image.Image, name: str) -> None:
    p = ROOT / name
    img.save(p, 'PNG', optimize=True)
    print(f'  wrote {name}: {img.size}')


# Plain transparent versions
save(fit_into(32, padding_ratio=0.06), 'favicon.png')
save(fit_into(192, padding_ratio=0.08), 'favicon-192.png')
save(fit_into(512, padding_ratio=0.08), 'favicon-512.png')

# iOS expects an opaque, square icon — give it the brand dark square
save(with_dark_square(180, radius_ratio=0.22), 'apple-touch-icon.png')

print('Done.')
