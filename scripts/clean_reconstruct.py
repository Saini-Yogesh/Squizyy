import numpy as np
from PIL import Image

im = Image.open('scripts/drizzy_sticker_orig.png').convert('RGBA')
arr = np.array(im).astype(float)
H, W, _ = arr.shape
cx, cy = 244.0, 248.0
Y, X = np.ogrid[:H, :W]
R = np.hypot(X - cx, Y - cy)
Theta = np.arctan2(Y - cy, X - cx)

# 1. Cleanly erase DRIZZLE in the lower right
# Pixels in lower right where text was
is_text_drizzle = (X > cx) & (Y > cy) & (R > 130) & (R < 192) & (arr[:, :, 0] < 90) & (arr[:, :, 1] < 90) & (arr[:, :, 2] < 90)

# Dilate slightly to catch antialiased edges
from scipy.ndimage import binary_dilation
import scipy.ndimage

mask_drizzle = scipy.ndimage.binary_dilation(is_text_drizzle, iterations=2)

# For drizzle mask, interpolate along theta using non-masked pixels at same radius
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
polar_mask = mask_drizzle[Y_int, X_int]

for r_idx in range(130, 195):
    m_row = polar_mask[r_idx]
    if np.any(m_row):
        val_idx = np.where(~m_row)[0]
        inv_idx = np.where(m_row)[0]
        for c in range(3):
            polar_arr[r_idx, inv_idx, c] = np.interp(inv_idx, val_idx, polar_arr[r_idx, val_idx, c], period=num_theta)

# Map back to drizzle region
y_pts, x_pts = np.where(mask_drizzle)
r_pts = np.clip(np.round(R[y_pts, x_pts]).astype(int), 0, num_r - 1)
t_pts = np.round((Theta[y_pts, x_pts] + np.pi) / (2 * np.pi) * num_theta).astype(int) % num_theta
for c in range(3):
    arr[y_pts, x_pts, c] = polar_arr[r_pts, t_pts, c]

# 2. Cleanly reconstruct center (R < 128)
# In the original, R between 115 and 130 has clean foil pixels at almost every angle!
# Let's inspect the clean foil at R=125 as a reference profile of angle -> color
ref_r_idx = 125
ref_color = polar_arr[ref_r_idx, :, :3]  # shape (720, 3)

# For every pixel where R < 125 and inside the old "D" logo:
is_center_logo = (R < 125) & (arr[:, :, 0] < 80) & (arr[:, :, 1] < 80) & (arr[:, :, 2] < 80)
is_center_logo = scipy.ndimage.binary_dilation(is_center_logo, iterations=2)

y_c, x_c = np.where(is_center_logo)
t_c = np.round((Theta[y_c, x_c] + np.pi) / (2 * np.pi) * num_theta).astype(int) % num_theta
r_c = R[y_c, x_c]

# The holographic sheen gets slightly brighter towards the specular center
# Add a subtle radial gradient modulation matching the original sheen
radial_factor = 1.0 + (125.0 - r_c) / 125.0 * 0.12

for c in range(3):
    arr[y_c, x_c, c] = np.clip(ref_color[t_c, c] * radial_factor, 0, 255)

out = Image.fromarray(arr.astype(np.uint8), 'RGBA')
out.save('C:/Users/yoges/.gemini/antigravity/brain/fbb57ee4-a65e-4fbd-9e63-01665ed890a5/clean_foil_perfect.png')
print('Saved clean_foil_perfect.png')

