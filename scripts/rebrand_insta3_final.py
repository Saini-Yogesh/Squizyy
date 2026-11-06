from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

orig = Image.open('scripts/orig_insta-post-3.png').convert('RGB')
arr = np.array(orig)

# 1. Clean DRIZZLIN' using exact column gap
gap_ys = []
for x in range(40, 295):
    text_ys = [y for y in range(40, 140) if arr[y, x, 0] < 235]
    l1 = [y for y in text_ys if y < 85]
    l2 = [y for y in text_ys if y >= 75 and y < 125]
    if l1 and l2:
        gap_y = (max(l1) + min(l2)) // 2
    elif l2:
        gap_y = min(l2) - 2
    else:
        gap_y = 78
    gap_ys.append(gap_y)

parchment = np.array([249, 233, 207], dtype=np.uint8)
for i, gap in enumerate(gap_ys):
    col_x = 40 + i
    # Bottom limit: 126 in center, 134 on wings
    y_max = 133 if (col_x < 95 or col_x > 240) else 126
    for y in range(gap + 1, y_max):
        if arr[y, col_x, 0] < 235 or arr[y, col_x, 1] < 220:
            arr[y, col_x] = parchment

# 2. Bottle 1 label inpaint: y: 247 to 260, x: 96 to 135
b1 = arr[247:260, 96:135]
for y in range(b1.shape[0]):
    for x in range(b1.shape[1]):
        if b1[y, x, 0] < 160 and b1[y, x, 2] > 40 and b1[y, x, 1] < 120:
            b1[y, x] = [232, 138, 68] # natural warm orange

# 3. Bottle 2 label inpaint: y: 280 to 296, x: 218 to 260
b2 = arr[280:296, 218:260]
for y in range(b2.shape[0]):
    for x in range(b2.shape[1]):
        if b2[y, x, 0] < 160 and b2[y, x, 2] > 40 and b2[y, x, 1] < 120:
            b2[y, x] = [235, 140, 70]

img = Image.fromarray(arr).convert('RGBA')
sticker = Image.open('squizyy-shopify-theme/assets/sticker.png')

# Render SQUEEZIN' along the arch
font_path = "C:/Windows/Fonts/ariblk.ttf"
hfont = ImageFont.truetype(font_path, 25)

txt = "SQUEEZIN'"
cx, cy = 168, 275
radius = 180
angles = np.linspace(-30, 30, len(txt))

for i, ch in enumerate(txt):
    ang = angles[i]
    rad = np.radians(ang)
    x = cx + radius * np.sin(rad)
    y = cy - radius * np.cos(rad)
    
    ch_img = Image.new('RGBA', (60, 60), (0, 0, 0, 0))
    cdraw = ImageDraw.Draw(ch_img)
    # Terracotta 3D drop shadow
    cdraw.text((32, 33), ch, font=hfont, fill=(195, 120, 115, 255), anchor="mm")
    # Deep purple text with white outline
    cdraw.text((30, 30), ch, font=hfont, fill=(48, 18, 60, 255), stroke_width=2, stroke_fill=(255, 255, 255, 255), anchor="mm")
    
    ch_rot = ch_img.rotate(-ang, Image.Resampling.BICUBIC)
    img.paste(ch_rot, (int(x - 30), int(y - 30)), ch_rot)

# Bottle labels text & stickers
bfont = ImageFont.truetype(font_path, 8)
draw = ImageDraw.Draw(img)

# Left bottle text
draw.text((115, 253), "SQUIZYY", font=bfont, fill=(35, 18, 44, 255), anchor="mm")
st1 = sticker.resize((15, 15), Image.Resampling.LANCZOS)
img.paste(st1, (124, 257), st1)

# Right bottle text (tilted ~ 12 deg)
txt_b2 = Image.new('RGBA', (50, 20), (0, 0, 0, 0))
b2_draw = ImageDraw.Draw(txt_b2)
b2_draw.text((25, 10), "SQUIZYY", font=bfont, fill=(35, 18, 44, 255), anchor="mm")
txt_b2_rot = txt_b2.rotate(-12, Image.Resampling.BICUBIC)
img.paste(txt_b2_rot, (216, 278), txt_b2_rot)

st2 = sticker.resize((15, 15), Image.Resampling.LANCZOS)
img.paste(st2, (246, 297), st2)

# Save verified
img.save('scripts/insta3_verified_final.png')

# Save destination
img.convert('RGB').save('squizyy-shopify-theme/assets/insta-post-3.png')
img.convert('RGB').save('client/public/assets/images/insta-post-3.png')
print("Successfully generated perfect insta-post-3.png")

