import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import scipy.ndimage

# Load pristine original drizzy sticker
orig = Image.open('scripts/drizzy_sticker_orig.png').convert('RGBA')
arr = np.array(orig).astype(float)
H, W, _ = arr.shape
cx, cy = 244.0, 248.0
Y, X = np.ogrid[:H, :W]
R = np.hypot(X - cx, Y - cy)
Theta = np.arctan2(Y - cy, X - cx)  # -pi to pi

# --- STEP 1: CLEANLY ERASE "DRIZZLE." IN THE LOWER-RIGHT ARC ---
# Drizzle is located at R in [135, 186], Theta in [0.25, 1.45] rad (lower right)
drizzle_box = (R >= 135) & (R <= 186) & (Theta >= 0.25) & (Theta <= 1.45)
mask_drizzle = drizzle_box & ((arr[:, :, 0] < 120) | (arr[:, :, 1] < 120) | (arr[:, :, 2] < 120))
mask_drizzle = scipy.ndimage.binary_dilation(mask_drizzle, iterations=2)

for r_val in range(135, 187):
    sector_pixels = (np.abs(R - r_val) < 0.75) & (Theta >= 0.15) & (Theta <= 1.55)
    clean_in_sector = sector_pixels & (~mask_drizzle) & (arr[:, :, 0] > 130) & (arr[:, :, 1] > 130) & (arr[:, :, 2] > 130)
    
    if np.any(clean_in_sector):
        theta_clean = Theta[clean_in_sector]
        colors_clean = arr[clean_in_sector, :3]
        masked_target = sector_pixels & mask_drizzle
        if np.any(masked_target):
            theta_target = Theta[masked_target]
            for c in range(3):
                arr[masked_target, c] = np.interp(theta_target, theta_clean, colors_clean[:, c])

# --- STEP 2: CLEANLY ERASE THE CENTER "D" LOGO ---
logo_zone = (R <= 145) & ~((Theta >= 2.0) & (R > 130)) & ~((Theta <= -0.5) & (R > 130))
mask_logo = logo_zone & ((arr[:, :, 0] < 110) | (arr[:, :, 1] < 110) | (arr[:, :, 2] < 110))
mask_logo = scipy.ndimage.binary_dilation(mask_logo, iterations=3)

num_theta = 720
angles = np.linspace(-np.pi, np.pi, num_theta, endpoint=False)
ref_colors = np.zeros((num_theta, 3))

for i, ang in enumerate(angles):
    ang_mask = (R >= 112) & (R <= 128) & (np.abs(Theta - ang) < (np.pi / num_theta * 2)) & (~mask_logo) & (arr[:, :, 0] > 100)
    if np.any(ang_mask):
        ref_colors[i] = np.mean(arr[ang_mask, :3], axis=0)
    else:
        ref_colors[i] = [210, 210, 210]

for c in range(3):
    ref_colors[:, c] = scipy.ndimage.gaussian_filter1d(ref_colors[:, c], sigma=4, mode='wrap')

y_logo, x_logo = np.where(mask_logo)
t_logo = Theta[y_logo, x_logo]
t_idx = np.round((t_logo + np.pi) / (2 * np.pi) * num_theta).astype(int) % num_theta
r_logo = R[y_logo, x_logo]

rad_factor = 1.0 + np.clip((120.0 - r_logo) / 120.0 * 0.1, 0, 0.15)
for c in range(3):
    arr[y_logo, x_logo, c] = np.clip(ref_colors[t_idx, c] * rad_factor, 0, 255)

clean_base = Image.fromarray(arr.astype(np.uint8), 'RGBA')
clean_base.save('C:/Users/yoges/.gemini/antigravity/brain/fbb57ee4-a65e-4fbd-9e63-01665ed890a5/clean_foil_sticker_base.png')
print("Clean base ready!")
