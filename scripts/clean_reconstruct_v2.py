import numpy as np
from PIL import Image
import scipy.ndimage

im = Image.open('scripts/drizzy_sticker_orig.png').convert('RGBA')
arr = np.array(im).astype(float)
H, W, _ = arr.shape
cx, cy = 244.0, 248.0
Y, X = np.ogrid[:H, :W]
R = np.hypot(X - cx, Y - cy)
Theta = np.arctan2(Y - cy, X - cx)  # -pi to pi

# We want to identify ALL black pixels belonging to the center "D" logo (and its drips) AND the text "DRIZZLE"
# Text "SHAKE." and "SQUEEZE." and the double outer rings should remain UNTOUCHED!
# Let's verify where SHAKE and SQUEEZE are:
# SHAKE is on the left: X < cx, Theta between 2.2 and 2.9 rad (~125 to 165 deg)
# SQUEEZE is at the top: Theta between -2.2 and -0.4 rad
# Double rings are at R >= 180 (outer ring R in [192, 203], inner ring R in [180, 186])

# Logo is strictly inside R < 170 and NOT at the left or top border
is_black = (arr[:, :, 0] < 55) & (arr[:, :, 1] < 55) & (arr[:, :, 2] < 55) & (arr[:, :, 3] > 180)

# Mask for DRIZZLE: in lower-right quadrant, R between 130 and 178
mask_drizzle = (X > cx) & (Y > cy) & (R > 130) & (R < 178) & is_black

# Mask for Center Logo: inside R < 165, and NOT in SHAKE or SQUEEZE
mask_logo = (R < 165) & is_black & ~((X < cx) & (R > 135)) & ~((Y < cy) & (R > 135))

# Combine text drizzle and center logo
mask_to_erase = mask_drizzle | mask_logo
mask_to_erase = scipy.ndimage.binary_dilation(mask_to_erase, iterations=3)

# To fill the masked pixels with 100% authentic holographic foil:
# For every pixel (y, x) in mask_to_erase:
# Find clean (non-masked) pixels at nearby radius and angle.
# Since the sheen is conical, clean pixels with same or close radius R and angle Theta give the best match.
# If R < 110 (inner circle), the entire inner area can be filled from clean pixels at R in [110, 130].
# Let's map polar coordinates
num_r = int(205) + 1
num_theta = 720
polar_r = np.linspace(0, 205, num_r)
polar_theta = np.linspace(-np.pi, np.pi, num_theta, endpoint=False)

R_grid, T_grid = np.meshgrid(polar_r, polar_theta, indexing='ij')
X_grid = cx + R_grid * np.cos(T_grid)
Y_grid = cy + R_grid * np.sin(T_grid)

X_int = np.clip(np.round(X_grid).astype(int), 0, W - 1)
Y_int = np.clip(np.round(Y_grid).astype(int), 0, H - 1)

polar_arr = arr[Y_int, X_int]
polar_mask = mask_to_erase[Y_int, X_int]

# First, fix rings where R in [100, 178] by interpolating across Theta
for r_idx in range(100, 185):
    m_row = polar_mask[r_idx]
    if np.any(m_row) and not np.all(m_row):
        val_idx = np.where(~m_row)[0]
        inv_idx = np.where(m_row)[0]
        for c in range(3):
            polar_arr[r_idx, inv_idx, c] = np.interp(inv_idx, val_idx, polar_arr[r_idx, val_idx, c], period=num_theta)

# Now for inner core R < 100, extrapolate inwards from polar_arr[105]:
ref_105 = polar_arr[105, :, :3]
for r_idx in range(0, 100):
    factor = 1.0 + (100.0 - r_idx) / 100.0 * 0.1
    for c in range(3):
        polar_arr[r_idx, :, c] = np.clip(ref_105[:, c] * factor, 0, 255)

# Map everything back to arr
y_pts, x_pts = np.where(mask_to_erase)
r_pts = np.clip(np.round(R[y_pts, x_pts]).astype(int), 0, num_r - 1)
t_pts = np.round((Theta[y_pts, x_pts] + np.pi) / (2 * np.pi) * num_theta).astype(int) % num_theta
for c in range(3):
    arr[y_pts, x_pts, c] = polar_arr[r_pts, t_pts, c]

out = Image.fromarray(arr.astype(np.uint8), 'RGBA')
out.save('C:/Users/yoges/.gemini/antigravity/brain/fbb57ee4-a65e-4fbd-9e63-01665ed890a5/base_sticker_clean.png')
print('base_sticker_clean.png saved!')

