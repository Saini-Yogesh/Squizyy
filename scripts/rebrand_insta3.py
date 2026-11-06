from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np
from scipy import ndimage

orig = Image.open('scripts/orig_insta-post-3.png').convert('RGBA')
orig_arr = np.array(orig)

# 1. Headline: DRIZZLIN' is strictly between y: 80 and 125, x: 44 and 295
hy1, hy2, hx1, hx2 = 80, 125, 44, 295
h_sub = orig_arr[hy1:hy2, hx1:hx2]
hr, hg, hb = h_sub[:,:,0], h_sub[:,:,1], h_sub[:,:,2]

# Text pixels (purple letters or reddish drop shadow)
is_htext = (hr < 235) | (hg < 220) | (hb < 200)
# Slightly dilate to catch antialiasing
is_htext = ndimage.binary_dilation(is_htext, iterations=2)

cream_bg = np.array([250, 236, 217, 255], dtype=np.uint8)
h_sub[is_htext] = cream_bg
orig_arr[hy1:hy2, hx1:hx2] = h_sub

img = Image.fromarray(orig_arr)
sticker = Image.open('squizyy-shopify-theme/assets/sticker.png')

# Font for SQUEEZIN'
font_path = "C:/Windows/Fonts/ariblk.ttf"
hfont = ImageFont.truetype(font_path, 26)

# Arc layout for SQUEEZIN'
txt = "SQUEEZIN'"
# Curve center and radius to match DRIZZLIN'
cx, cy = 168, 280
radius = 185
angles = np.linspace(-34, 34, len(txt))

for i, ch in enumerate(txt):
    ang = angles[i]
    rad = np.radians(ang)
    x = cx + radius * np.sin(rad)
    y = cy - radius * np.cos(rad)
    
    ch_img = Image.new('RGBA', (60, 60), (0, 0, 0, 0))
    cdraw = ImageDraw.Draw(ch_img)
    # 3D shadow in terracotta (195, 120, 115)
    cdraw.text((32, 33), ch, font=hfont, fill=(195, 120, 115, 255), anchor="mm")
    # Letter in authentic deep purple with white border
    cdraw.text((30, 30), ch, font=hfont, fill=(48, 18, 60, 255), stroke_width=2, stroke_fill=(255, 255, 255, 255), anchor="mm")
    
    ch_rot = ch_img.rotate(-ang, Image.Resampling.BICUBIC)
    img.paste(ch_rot, (int(x - 30), int(y - 30)), ch_rot)

# 2. Left Bottle: DRIZZY is at x: 96 to 134, y: 247 to 260
b1_x1, b1_y1, b1_w, b1_h = 96, 246, 38, 15
grad1 = np.linspace(220, 240, b1_w)[None, :, None].repeat(b1_h, axis=0)
b1_rgb = np.zeros((b1_h, b1_w, 3), dtype=np.float32)
b1_rgb[:,:,0] = grad1[:,:,0]
b1_rgb[:,:,1] = grad1[:,:,0] * 0.58
b1_rgb[:,:,2] = grad1[:,:,0] * 0.28
b1_patch = Image.fromarray(b1_rgb.astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.0))
img.paste(b1_patch, (b1_x1, b1_y1))

bfont = ImageFont.truetype(font_path, 9)
draw = ImageDraw.Draw(img)
draw.text((b1_x1 + b1_w // 2, b1_y1 + b1_h // 2), "SQUIZYY", font=bfont, fill=(35, 18, 44, 255), anchor="mm")

# Left bottle sticker (125, 258), size 14x14
st1 = sticker.resize((15, 15), Image.Resampling.LANCZOS)
img.paste(st1, (124, 257), st1)

# 3. Right Bottle: DRIZZY is at x: 218 to 260, y: 279 to 296, tilted ~ 12 deg
b2_x1, b2_y1, b2_w, b2_h = 217, 279, 44, 18
b2_rgb = np.zeros((b2_h, b2_w, 3), dtype=np.float32)
grad2 = np.linspace(220, 245, b2_w)[None, :, None].repeat(b2_h, axis=0)
b2_rgb[:,:,0] = grad2[:,:,0]
b2_rgb[:,:,1] = grad2[:,:,0] * 0.58
b2_rgb[:,:,2] = grad2[:,:,0] * 0.28
b2_patch = Image.fromarray(b2_rgb.astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.0))
img.paste(b2_patch, (b2_x1, b2_y1))

draw.text((b2_x1 + b2_w // 2, b2_y1 + b2_h // 2), "SQUIZYY", font=bfont, fill=(35, 18, 44, 255), anchor="mm")

# Right bottle sticker (246, 297), size 14x14
st2 = sticker.resize((15, 15), Image.Resampling.LANCZOS)
img.paste(st2, (246, 297), st2)

# Save verified preview
img.save('scripts/insta3_verified2.png')

# Save destination
img.convert('RGB').save('squizyy-shopify-theme/assets/insta-post-3.png')
img.convert('RGB').save('client/public/assets/images/insta-post-3.png')
print("Successfully generated perfect insta-post-3.png")
