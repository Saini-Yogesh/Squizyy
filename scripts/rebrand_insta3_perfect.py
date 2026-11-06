from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np
from scipy import ndimage

orig = Image.open('scripts/orig_insta-post-3.png').convert('RGBA')
orig_arr = np.array(orig)

# 1. Headline inpainting: DRIZZLIN' is strictly between y: 77 and 126, x: 44 and 295
h_sub = orig_arr[77:126, 44:295]
hr, hg, hb = h_sub[:,:,0], h_sub[:,:,1], h_sub[:,:,2]

# Detect letters of DRIZZLIN' (not parchment)
is_htext = (hr < 235) | (hg < 220) | (hb < 195)
is_htext = ndimage.binary_dilation(is_htext, iterations=2)

parchment_bg = np.array([249, 233, 207, 255], dtype=np.uint8)
h_sub[is_htext] = parchment_bg
orig_arr[77:126, 44:295] = h_sub

# 2. Bottle 1 label inpaint: y: 247 to 260, x: 96 to 135
b1 = orig_arr[247:260, 96:135]
b1_text = (b1[:,:,0] < 160) & (b1[:,:,2] > 40) & (b1[:,:,1] < 120)
b1_text = ndimage.binary_dilation(b1_text, iterations=2)
b1_idx = ndimage.distance_transform_edt(b1_text, return_distances=False, return_indices=True)
b1[b1_text] = b1[b1_idx[0], b1_idx[1]][b1_text]
orig_arr[247:260, 96:135] = b1

# 3. Bottle 2 label inpaint: y: 280 to 296, x: 218 to 260
b2 = orig_arr[280:296, 218:260]
b2_text = (b2[:,:,0] < 160) & (b2[:,:,2] > 40) & (b2[:,:,1] < 120)
b2_text = ndimage.binary_dilation(b2_text, iterations=2)
b2_idx = ndimage.distance_transform_edt(b2_text, return_distances=False, return_indices=True)
b2[b2_text] = b2[b2_idx[0], b2_idx[1]][b2_text]
orig_arr[280:296, 218:260] = b2

img = Image.fromarray(orig_arr).convert('RGBA')
sticker = Image.open('squizyy-shopify-theme/assets/sticker.png')

# Draw SQUEEZIN' along the natural arc
font_path = "C:/Windows/Fonts/ariblk.ttf"
hfont = ImageFont.truetype(font_path, 25)

txt = "SQUEEZIN'"
cx, cy = 168, 275
radius = 175
angles = np.linspace(-32, 32, len(txt))

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
img.save('scripts/insta3_verified_perfect2.png')

# Save destination
img.convert('RGB').save('squizyy-shopify-theme/assets/insta-post-3.png')
img.convert('RGB').save('client/public/assets/images/insta-post-3.png')
print("Successfully generated perfect insta-post-3.png")
