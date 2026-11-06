from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

orig = Image.open('scripts/orig_insta-post-4.png').convert('RGB')
arr = np.array(orig)

bottles_config = [
    # (x1, y1, x2, y2, bg_color, text_cx, text_cy, font_size, st_cx, st_cy, st_size)
    (72, 259, 132, 274, [205, 110, 60], 97, 268, 8, 122, 282, 17),
    (136, 246, 192, 260, [225, 135, 80], 163, 254, 9, 180, 268, 18),
    (194, 259, 252, 274, [228, 150, 115], 215, 268, 8, 232, 282, 17)
]

for x1, y1, x2, y2, bg, _, _, _, _, _, _ in bottles_config:
    patch = arr[y1:y2, x1:x2]
    # Inpaint any dark text or shadow
    is_text = (patch[:,:,0] < 190) & (patch[:,:,2] > 20) & (patch[:,:,1] < 140)
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
crop_test.save('scripts/insta4_verified_clean13.png')

# Save destination
img.convert('RGB').save('squizyy-shopify-theme/assets/insta-post-4.png')
img.convert('RGB').save('client/public/assets/images/insta-post-4.png')
print("Successfully generated perfect insta-post-4.png")
