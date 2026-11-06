from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

orig = Image.open('scripts/orig_insta-post-4.png').convert('RGB')
arr = np.array(orig)

bottles_config = [
    # (x1, y1, x2, y2, bg_color, text_cx, text_cy, font_size, st_cx, st_cy, st_size)
    (75, 260, 125, 272, [215, 118, 68], 99, 265, 8, 118, 276, 16),
    (145, 242, 195, 254, [225, 126, 75], 170, 247, 9, 189, 257, 18),
    (220, 260, 270, 272, [220, 122, 70], 246, 265, 8, 264, 276, 16)
]

for x1, y1, x2, y2, bg, _, _, _, _, _, _ in bottles_config:
    patch = arr[y1:y2, x1:x2]
    is_text = (patch[:,:,0] < 155) & (patch[:,:,2] > 35) & (patch[:,:,1] < 115)
    patch[is_text] = bg
    arr[y1:y2, x1:x2] = patch

img = Image.fromarray(arr).convert('RGBA')
sticker = Image.open('squizyy-shopify-theme/assets/sticker.png')
font_path = "C:/Windows/Fonts/ariblk.ttf"
draw = ImageDraw.Draw(img)

for _, _, _, _, _, tcx, tcy, fsize, scx, scy, ssize in bottles_config:
    bfont = ImageFont.truetype(font_path, fsize)
    draw.text((tcx, tcy), "SQUIZYY", font=bfont, fill=(35, 18, 44, 255), anchor="mm")
    st_scaled = sticker.resize((ssize, ssize), Image.Resampling.LANCZOS)
    img.paste(st_scaled, (scx - ssize // 2, scy - ssize // 2), st_scaled)

# Save verified
crop_test = img.crop((60, 220, 285, 320))
crop_test.save('scripts/insta4_verified_clean5.png')

# Save destination
img.convert('RGB').save('squizyy-shopify-theme/assets/insta-post-4.png')
img.convert('RGB').save('client/public/assets/images/insta-post-4.png')
print("Successfully generated perfect insta-post-4.png")
