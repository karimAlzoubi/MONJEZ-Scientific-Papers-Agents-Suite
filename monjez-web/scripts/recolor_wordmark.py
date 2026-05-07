"""Recolor the wordmark from the original logo:
   - Arabic مُنجز  → white  (#FFFFFF)
   - English Monjez → mint  (#34D9B6, matching tailwind mint-400)

Keeps the EXACT shape, font, kerning and proportions from the original art —
only the fill color is replaced. Alpha (anti-aliasing) is preserved.

Outputs:
  - public/brand/monjez-wordmark-light.png       (500w)
  - public/brand/monjez-wordmark-light@2x.png    (1000w)
"""
from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(r'c:/projects/Monjez/public/brand')
SRC = ROOT / 'monjez-wordmark@2x.png'

# Find the y-split between Arabic and English by row density gap.
img = Image.open(SRC).convert('RGBA')
arr = np.array(img)
h, w = arr.shape[:2]
alpha = arr[:, :, 3]
row_density = (alpha > 30).sum(axis=1)

# Inside the band y in [h*0.4, h*0.75], find the longest gap.
lo, hi = int(h * 0.40), int(h * 0.75)
threshold = max(1, int(row_density.max() * 0.04))

best = (0, 0, 0)  # start, length, end
cur_start = lo
cur_len = 0
for y in range(lo, hi):
    if row_density[y] <= threshold:
        if cur_len == 0:
            cur_start = y
        cur_len += 1
        if cur_len > best[1]:
            best = (cur_start, cur_len, y + 1)
    else:
        cur_len = 0

split_y = best[0] + best[1] // 2
print(f'Split at y={split_y} (gap span {best[0]}-{best[2]}, len {best[1]})')

# Build recolored RGBA: white above split, mint below split.
ARABIC = np.array([255, 255, 255], dtype=np.float32)
ENGLISH = np.array([52, 217, 182], dtype=np.float32)  # mint-400

out = np.zeros_like(arr)
a = alpha.astype(np.float32) / 255.0
fill = np.empty((h, w, 3), dtype=np.float32)
fill[:split_y] = ARABIC
fill[split_y:] = ENGLISH

# Premultiplied-style: just replace RGB; the alpha already carries anti-aliasing.
out[:, :, :3] = fill.astype(np.uint8)
out[:, :, 3] = alpha

img_out = Image.fromarray(out, mode='RGBA')
img_out.save(ROOT / 'monjez-wordmark-light@2x.png', 'PNG', optimize=True)
print(f'  wrote monjez-wordmark-light@2x.png: {img_out.size}')

img_1x = img_out.resize((w // 2, h // 2), Image.LANCZOS)
img_1x.save(ROOT / 'monjez-wordmark-light.png', 'PNG', optimize=True)
print(f'  wrote monjez-wordmark-light.png: {img_1x.size}')
