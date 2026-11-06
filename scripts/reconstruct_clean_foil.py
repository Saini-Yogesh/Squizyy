import numpy as np
from PIL import Image

# Load original sticker
orig = Image.open('scripts/drizzy_sticker_orig.png').convert('RGBA')
arr = np.array(orig).astype(float)
H, W, _ = arr.shape
cx, cy = 244.0, 248.0
radius = 205.0

Y, X = np.ogrid[:H, :W]
R = np.hypot(X - cx, Y - cy)
Theta = np.arctan2(Y - cy, X - cx)  # -pi to pi

# Black pixels: R, G, B all low, Alpha high
is_black = (arr[:, :, 0] < 55) & (arr[:, :, 1] < 55) & (arr[:, :, 2] < 55) & (arr[:, :, 3] > 180)
# Inside the sticker circle
inside = (R <= radius)

# For every pixel inside circle that is black, interpolate along theta (angle) from nearest non-black pixels at the same radius!
# Let's map to polar grid (num_r, num_theta)
num_r = int(radius) + 1
num_theta = 720  # 0.5 degree steps

polar_r = np.linspace(0, radius, num_r)
polar_theta = np.linspace(-np.pi, np.pi, num_theta, endpoint=False)

R_grid, T_grid = np.meshgrid(polar_r, polar_theta, indexing='ij')
X_grid = cx + R_grid * np.cos(T_grid)
Y_grid = cy + R_grid * np.sin(T_grid)

# Sample arr at (X_grid, Y_grid)
X_int = np.clip(np.round(X_grid).astype(int), 0, W - 1)
Y_int = np.clip(np.round(Y_grid).astype(int), 0, H - 1)

polar_arr = arr[Y_int, X_int]  # shape (num_r, num_theta, 4)
polar_black = is_black[Y_int, X_int]

# In each radial ring r, interpolate across theta
for r_idx in range(num_r):
    black_row = polar_black[r_idx]
    if np.any(black_row) and not np.all(black_row):
        # Indices of non-black
        valid_indices = np.where(~black_row)[0]
        invalid_indices = np.where(black_row)[0]
        # Periodic interpolation across angle
        # unwrap angles
        for c in range(3):
            vals = polar_arr[r_idx, valid_indices, c]
            # np.interp with period num_theta
            polar_arr[r_idx, invalid_indices, c] = np.interp(
                invalid_indices,
                valid_indices,
                vals,
                period=num_theta
            )

# Now map back from polar to cartesian for black pixels inside circle
# For any (x, y) that is black and inside circle:
black_inside = is_black & inside
y_pts, x_pts = np.where(black_inside)
r_pts = R[y_pts, x_pts]
t_pts = Theta[y_pts, x_pts]

# r index and theta index
r_idx = np.clip(np.round(r_pts).astype(int), 0, num_r - 1)
# theta index in [0, num_theta)
t_idx = np.round((t_pts + np.pi) / (2 * np.pi) * num_theta).astype(int) % num_theta

clean_arr = arr.copy()
for c in range(3):
    clean_arr[y_pts, x_pts, c] = polar_arr[r_idx, t_idx, c]

# Keep alpha transparent outside circle
clean_arr[~inside, 3] = 0.0

clean_img = Image.fromarray(clean_arr.astype(np.uint8), 'RGBA')
clean_img.save('C:/Users/yoges/.gemini/antigravity/brain/fbb57ee4-a65e-4fbd-9e63-01665ed890a5/clean_foil_base.png')
print('Clean foil base saved!')

