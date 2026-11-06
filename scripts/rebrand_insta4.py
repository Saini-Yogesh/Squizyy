from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np
from scipy import ndimage

orig = Image.open('scripts/orig_insta-post-4.png').convert('RGB')
arr = np.array(orig)

# The 3 bottles DRIZZY label regions:
bottles = [
    # (x1, y1, x2, y2, text_cx, text_cy, font_size, st_x, st_y, st_size)
    (75, 252, 122, 270, 97, 261, 10, 110, 268, 16),      # Left bottle
    (144, 233, 196, 252, 169, 242, 11, 180, 248, 18),    # Center bottle
    (222, 252, 270, 270, 245, 261, 10, 256, 268, 16)     # Right bottle
]

for x1, y1, x2, y2, _, _, _, _, _, _ in bottles:
    patch = arr[y1:y2, x1:x2]
    # purple text has r < 140, b > 40, g < 100
    is_text = (patch[:,:,0] < 140) & (patch[:,:,2] > 40) & (patch[:,:,1] < 100)
    is_text = ndimage.binary_dilation(is_text, iterations=2)
    idx = ndimage.distance_transform_edt(is_text, return_distances=False, return_indices=True)
    patch[is_text] = patch[idx[0], idx[1]][is_text]
    arr[y1:y2, x1:x2] = patch

img = Image.fromarray(arr).convert('RGBA')
sticker = Image.open('squizyy-shopify-theme/assets/sticker.png')
font_path = "C:/Windows/Fonts/ariblk.ttf"

draw = ImageDraw.Draw(img)

for _, _, _, _, tcx, tcy, fsize, sx, sy, ssize in bottles:
    bfont = ImageFont.truetype(font_path, fsize)
    # Draw SQUIZYY
    draw.text((tcx, tcy), "SQUIZYY", font=bfont, fill=(35, 18, 44, 255), anchor="mm")
    # Paste sticker
    st_scaled = sticker.resize((ssize, ssize), Image.Resampling.LANCZOS)
    img.paste(st_scaled, (sx, sy), st_scaled)

# Save verified
crop_test = img.crop((60, 220, 280, 320))
crop_test.save('scripts/insta4_verified.png')

# Save destination
img.convert('RGB').save('squizyy-shopify-theme/assets/insta-post-4.png')
img.convert('RGB').save('client/public/assets/images/insta-post-4.png')
print("Successfully generated perfect insta-post-4.png")

