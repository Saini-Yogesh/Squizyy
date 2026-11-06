import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import scipy.ndimage

# Load original drizzy sticker
orig = Image.open('scripts/drizzy_sticker_orig.png').convert('RGBA')
arr = np.array(orig).astype(float)
H, W, _ = arr.shape
cx, cy = 244.0, 248.0
Y, X = np.ogrid[:H, :W]
R = np.hypot(X - cx, Y - cy)
Theta = np.arctan2(Y - cy, X - cx)

# 1. Cleanly erase ONLY DRIZZLE in lower right
# DRIZZLE is strictly between R in [135, 168] and Theta in [0.22, 1.45] rad
# Double rings are at R >= 180, so R <= 168 NEVER touches the rings!
is_black = (arr[:, :, 0] < 50) & (arr[:, :, 1] < 50) & (arr[:, :, 2] < 50) & (arr[:, :, 3] > 180)
mask_drizzle = (R >= 135) & (R <= 170) & (Theta >= 0.22) & (Theta <= 1.45) & is_black
mask_drizzle = scipy.ndimage.binary_dilation(mask_drizzle, iterations=2)

# Sample the 100% clean ring at R=158 to 162 for angle-based color
num_theta = 720
angles = np.linspace(-np.pi, np.pi, num_theta, endpoint=False)
profile_colors = np.zeros((num_theta, 3))
for i, ang in enumerate(angles):
    ang_diff = np.abs(Theta - ang)
    ang_diff = np.minimum(ang_diff, 2 * np.pi - ang_diff)
    ring_mask = (R >= 157) & (R <= 163) & (ang_diff < (2 * np.pi / num_theta * 1.5))
    profile_colors[i] = np.mean(arr[ring_mask, :3], axis=0)

for c in range(3):
    profile_colors[:, c] = scipy.ndimage.gaussian_filter1d(profile_colors[:, c], sigma=2, mode='wrap')

t_drizzle = np.round((Theta[mask_drizzle] + np.pi) / (2 * np.pi) * num_theta).astype(int) % num_theta
for c in range(3):
    arr[mask_drizzle, c] = profile_colors[t_drizzle, c]

# 2. Cleanly erase ONLY the center "D" logo (bounding box: X in [155, 335], Y in [165, 395])
mask_logo = (X >= 155) & (X <= 335) & (Y >= 165) & (Y <= 395) & is_black
mask_logo = scipy.ndimage.binary_dilation(mask_logo, iterations=3)

t_logo = np.round((Theta[mask_logo] + np.pi) / (2 * np.pi) * num_theta).astype(int) % num_theta
r_logo = R[mask_logo]
brightness = 1.0 + np.clip((140.0 - r_logo) / 140.0 * 0.12, 0, 0.15)
for c in range(3):
    arr[mask_logo, c] = np.clip(profile_colors[t_logo, c] * brightness, 0, 255)

clean_base = Image.fromarray(arr.astype(np.uint8), 'RGBA')

# 3. High resolution composite (3x)
scale = 3
w_hi, h_hi = W * scale, H * scale
cx_hi, cy_hi = cx * scale, cy * scale

base_hi = clean_base.resize((w_hi, h_hi), Image.Resampling.LANCZOS)
color_ink = (45, 15, 40, 255)  # Squizyy signature dark brown #2D0F28

# 4. Render "SQUIZYY." along arc
font_text = ImageFont.truetype('squizyy-shopify-theme/assets/Champ-Black.otf', int(23 * scale))
r_text = 146.5 * scale

text = "SQUIZYY."
angles = np.linspace(19.5, 79.5, len(text))
char_box = int(60 * scale)

for char, deg in zip(text, angles):
    rad = math.radians(deg)
    px = cx_hi + r_text * math.cos(rad)
    py = cy_hi + r_text * math.sin(rad)
    
    c_img = Image.new('RGBA', (char_box, char_box), (0, 0, 0, 0))
    cdraw = ImageDraw.Draw(c_img)
    cdraw.text((char_box / 2, char_box / 2), char, font=font_text, fill=color_ink, anchor='mm')
    
    rot_angle = -(deg + 90)
    c_rot = c_img.rotate(rot_angle, resample=Image.Resampling.BILINEAR)
    base_hi.paste(c_rot, (int(px - char_box / 2), int(py - char_box / 2)), c_rot)

# 5. Draw bold stylized dripping "S" in center
center_layer = Image.new('RGBA', (w_hi, h_hi), (0, 0, 0, 0))
cdraw = ImageDraw.Draw(center_layer)

font_logo = ImageFont.truetype('squizyy-shopify-theme/assets/Champ-Black.otf', int(135 * scale))
cdraw.text((cx_hi - 3 * scale, cy_hi - 22 * scale), "S", font=font_logo, fill=color_ink, anchor='mm')

# Fluid drips from bottom of the S
# Left drip
cdraw.polygon([
    (cx_hi - 28 * scale, cy_hi + 26 * scale),
    (cx_hi - 18 * scale, cy_hi + 26 * scale),
    (cx_hi - 20 * scale, cy_hi + 56 * scale),
    (cx_hi - 26 * scale, cy_hi + 56 * scale)
], fill=color_ink)
cdraw.ellipse([(cx_hi - 30 * scale, cy_hi + 50 * scale), (cx_hi - 16 * scale, cy_hi + 64 * scale)], fill=color_ink)

# Center main drip
cdraw.polygon([
    (cx_hi - 6 * scale, cy_hi + 30 * scale),
    (cx_hi + 8 * scale, cy_hi + 30 * scale),
    (cx_hi + 6 * scale, cy_hi + 80 * scale),
    (cx_hi - 4 * scale, cy_hi + 80 * scale)
], fill=color_ink)
cdraw.ellipse([(cx_hi - 8 * scale, cy_hi + 72 * scale), (cx_hi + 10 * scale, cy_hi + 90 * scale)], fill=color_ink)

# Right drip
cdraw.polygon([
    (cx_hi + 18 * scale, cy_hi + 22 * scale),
    (cx_hi + 28 * scale, cy_hi + 22 * scale),
    (cx_hi + 27 * scale, cy_hi + 48 * scale),
    (cx_hi + 19 * scale, cy_hi + 48 * scale)
], fill=color_ink)
cdraw.ellipse([(cx_hi + 17 * scale, cy_hi + 42 * scale), (cx_hi + 29 * scale, cy_hi + 54 * scale)], fill=color_ink)

final_hi = Image.alpha_composite(base_hi, center_layer)
final_im = final_hi.resize((W, H), Image.Resampling.LANCZOS)
final_im.save('C:/Users/yoges/.gemini/antigravity/brain/fbb57ee4-a65e-4fbd-9e63-01665ed890a5/squizyy_flawless_sticker_v2.png')
print("squizyy_flawless_sticker_v2.png saved!")

