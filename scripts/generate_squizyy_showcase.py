import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import scipy.ndimage

# Load base with clean foil
orig = Image.open('scripts/drizzy_sticker_orig.png').convert('RGBA')
arr = np.array(orig).astype(float)
H, W, _ = arr.shape
cx, cy = 244.0, 248.0
Y, X = np.ogrid[:H, :W]
R = np.hypot(X - cx, Y - cy)
Theta = np.arctan2(Y - cy, X - cx)

# 1. Cleanly erase DRIZZLE
mask_drizzle = (R >= 135) & (R <= 178) & (Theta >= 0.22) & (Theta <= 1.45) & (arr[:, :, 0] < 120) & (arr[:, :, 1] < 120) & (arr[:, :, 2] < 120)
mask_drizzle = scipy.ndimage.binary_dilation(mask_drizzle, iterations=2)

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

# 2. Cleanly erase center logo
mask_logo = (R <= 145) & (arr[:, :, 0] < 110) & (arr[:, :, 1] < 110) & (arr[:, :, 2] < 110)
mask_logo = mask_logo & ~((Theta >= 2.0) & (R > 130)) & ~((Theta <= -0.5) & (R > 130))
mask_logo = scipy.ndimage.binary_dilation(mask_logo, iterations=4)

t_logo = np.round((Theta[mask_logo] + np.pi) / (2 * np.pi) * num_theta).astype(int) % num_theta
r_logo = R[mask_logo]
brightness = 1.0 + np.clip((145.0 - r_logo) / 145.0 * 0.12, 0, 0.15)
for c in range(3):
    arr[mask_logo, c] = np.clip(profile_colors[t_logo, c] * brightness, 0, 255)

clean_base = Image.fromarray(arr.astype(np.uint8), 'RGBA')

# 3. High resolution composite
scale = 2
w_hi, h_hi = W * scale, H * scale
cx_hi, cy_hi = cx * scale, cy * scale

base_hi = clean_base.resize((w_hi, h_hi), Image.Resampling.LANCZOS)
color_ink = (45, 15, 40, 255)

# Render "SQUIZYY." exactly replacing "DRIZZLE."
font_text = ImageFont.truetype('squizyy-shopify-theme/assets/Champ-Black.otf', int(23 * scale))
r_text = 153.0 * scale
text = "SQUIZYY."
angles = np.linspace(22, 84, len(text))
char_box = int(50 * scale)

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

# 4. Fluid dripping "S" center mark
center_layer = Image.new('RGBA', (w_hi, h_hi), (0, 0, 0, 0))
cdraw = ImageDraw.Draw(center_layer)

font_logo = ImageFont.truetype('squizyy-shopify-theme/assets/Champ-Black.otf', int(140 * scale))
# Position of "S"
cdraw.text((cx_hi, cy_hi - 18 * scale), "S", font=font_logo, fill=color_ink, anchor='mm')

# Fluid organic drips matching Drizzy's smooth melted drip style
# Left drip
cdraw.polygon([
    (cx_hi - 28 * scale, cy_hi + 26 * scale),
    (cx_hi - 18 * scale, cy_hi + 26 * scale),
    (cx_hi - 20 * scale, cy_hi + 58 * scale),
    (cx_hi - 26 * scale, cy_hi + 58 * scale)
], fill=color_ink)
cdraw.ellipse([(cx_hi - 30 * scale, cy_hi + 52 * scale), (cx_hi - 16 * scale, cy_hi + 66 * scale)], fill=color_ink)

# Center main long drip
cdraw.polygon([
    (cx_hi - 7 * scale, cy_hi + 30 * scale),
    (cx_hi + 9 * scale, cy_hi + 30 * scale),
    (cx_hi + 7 * scale, cy_hi + 82 * scale),
    (cx_hi - 5 * scale, cy_hi + 82 * scale)
], fill=color_ink)
cdraw.ellipse([(cx_hi - 9 * scale, cy_hi + 74 * scale), (cx_hi + 11 * scale, cy_hi + 94 * scale)], fill=color_ink)

# Right drip
cdraw.polygon([
    (cx_hi + 18 * scale, cy_hi + 22 * scale),
    (cx_hi + 28 * scale, cy_hi + 22 * scale),
    (cx_hi + 27 * scale, cy_hi + 50 * scale),
    (cx_hi + 19 * scale, cy_hi + 50 * scale)
], fill=color_ink)
cdraw.ellipse([(cx_hi + 17 * scale, cy_hi + 44 * scale), (cx_hi + 29 * scale, cy_hi + 56 * scale)], fill=color_ink)

# Small teardrop dot like in the Drizzy logo
cdraw.ellipse([(cx_hi - 2 * scale, cy_hi - 10 * scale), (cx_hi + 8 * scale, cy_hi)], fill=(255, 255, 255, 230))

final_hi = Image.alpha_composite(base_hi, center_layer)
final_im = final_hi.resize((W, H), Image.Resampling.LANCZOS)
final_im.save('C:/Users/yoges/.gemini/antigravity/brain/fbb57ee4-a65e-4fbd-9e63-01665ed890a5/squizyy_sticker_showcase.png')
print("squizyy_sticker_showcase.png saved!")

