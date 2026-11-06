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

# Angle profile from clean ring R in [158, 162]
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

# 1. Cleanly replace DRIZZLE
mask_drizzle = (R >= 130) & (R <= 172) & (Theta >= 0.25) & (Theta <= 1.42)
t_drizzle = np.round((Theta[mask_drizzle] + np.pi) / (2 * np.pi) * num_theta).astype(int) % num_theta
for c in range(3):
    arr[mask_drizzle, c] = profile_colors[t_drizzle, c]

# 2. Cleanly replace the center inner disc (R <= 128 px)
mask_center = (R <= 128)
t_center = np.round((Theta[mask_center] + np.pi) / (2 * np.pi) * num_theta).astype(int) % num_theta
r_center = R[mask_center]
brightness = 1.0 + np.clip((128.0 - r_center) / 128.0 * 0.12, 0, 0.15)
for c in range(3):
    arr[mask_center, c] = np.clip(profile_colors[t_center, c] * brightness, 0, 255)

# 3. Cleanly replace drip area of the old "D" logo (R in [128, 165], Theta in [1.1, 2.0] rad)
mask_drips = (R > 128) & (R <= 165) & (Theta >= 1.1) & (Theta <= 2.0)
t_drips = np.round((Theta[mask_drips] + np.pi) / (2 * np.pi) * num_theta).astype(int) % num_theta
for c in range(3):
    arr[mask_drips, c] = profile_colors[t_drips, c]

clean_base = Image.fromarray(arr.astype(np.uint8), 'RGBA')

# 4. High resolution composite (4x for ultra-sharp vectors)
scale = 4
w_hi, h_hi = W * scale, H * scale
cx_hi, cy_hi = cx * scale, cy * scale

base_hi = clean_base.resize((w_hi, h_hi), Image.Resampling.LANCZOS)
color_ink = (45, 15, 40, 255)  # Squizyy signature dark brown #2D0F28

# Draw "SQUIZYY." along arc
font_text = ImageFont.truetype('squizyy-shopify-theme/assets/Champ-Black.otf', int(23 * scale))
r_text = 151.0 * scale

text = "SQUIZYY."
angles = np.linspace(20.0, 78.0, len(text))
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

font_logo = ImageFont.truetype('squizyy-shopify-theme/assets/Champ-Black.otf', int(145 * scale))
cdraw.text((cx_hi, cy_hi - 16 * scale), "S", font=font_logo, fill=color_ink, anchor='mm')

# Draw organic, fluid dripping peanut butter
# Main left dripping tear (long fluid drop)
left_neck_x = cx_hi - 15 * scale
left_bulb_y = cy_hi + 72 * scale

cdraw.polygon([
    (left_neck_x - 12 * scale, cy_hi + 28 * scale),
    (left_neck_x + 8 * scale, cy_hi + 28 * scale),
    (left_neck_x + 6 * scale, left_bulb_y - 8 * scale),
    (left_neck_x - 10 * scale, left_bulb_y - 8 * scale)
], fill=color_ink)
cdraw.ellipse([
    (left_neck_x - 16 * scale, left_bulb_y - 14 * scale),
    (left_neck_x + 12 * scale, left_bulb_y + 14 * scale)
], fill=color_ink)

# Right shorter fluid drip
right_neck_x = cx_hi + 18 * scale
right_bulb_y = cy_hi + 48 * scale
cdraw.polygon([
    (right_neck_x - 8 * scale, cy_hi + 22 * scale),
    (right_neck_x + 8 * scale, cy_hi + 22 * scale),
    (right_neck_x + 6 * scale, right_bulb_y - 6 * scale),
    (right_neck_x - 6 * scale, right_bulb_y - 6 * scale)
], fill=color_ink)
cdraw.ellipse([
    (right_neck_x - 10 * scale, right_bulb_y - 10 * scale),
    (right_neck_x + 10 * scale, right_bulb_y + 10 * scale)
], fill=color_ink)

# Fillets / meniscus between drips
cdraw.polygon([
    (left_neck_x + 6 * scale, cy_hi + 28 * scale),
    (right_neck_x - 6 * scale, cy_hi + 22 * scale),
    (right_neck_x - 6 * scale, cy_hi + 32 * scale),
    (left_neck_x + 6 * scale, cy_hi + 32 * scale)
], fill=color_ink)

final_hi = Image.alpha_composite(base_hi, center_layer)
final_im = final_hi.resize((W, H), Image.Resampling.LANCZOS)
final_im.save('C:/Users/yoges/.gemini/antigravity/brain/fbb57ee4-a65e-4fbd-9e63-01665ed890a5/squizyy_perfect_sticker_final.png')
print("squizyy_perfect_sticker_final.png saved!")
