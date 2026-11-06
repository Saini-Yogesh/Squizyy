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

# Extract the 360 degree color profile from the 100% clean ring at R=158 to 162
num_theta = 720
angles = np.linspace(-np.pi, np.pi, num_theta, endpoint=False)
profile_colors = np.zeros((num_theta, 3))

for i, ang in enumerate(angles):
    # sample at R in [158, 162] around angle ang
    ang_diff = np.abs(Theta - ang)
    ang_diff = np.minimum(ang_diff, 2 * np.pi - ang_diff)
    ring_mask = (R >= 157) & (R <= 163) & (ang_diff < (2 * np.pi / num_theta * 1.5))
    profile_colors[i] = np.mean(arr[ring_mask, :3], axis=0)

# Smooth profile slightly along angle
for c in range(3):
    profile_colors[:, c] = scipy.ndimage.gaussian_filter1d(profile_colors[:, c], sigma=2, mode='wrap')

# 1. Fill the entire center circle (R < 155) with this pristine conical foil!
# Notice: the sheen is slightly brighter towards center
center_mask = (R < 155)
t_idx = np.round((Theta[center_mask] + np.pi) / (2 * np.pi) * num_theta).astype(int) % num_theta
r_vals = R[center_mask]
# Specular center brightness
brightness = 1.0 + (155.0 - r_vals) / 155.0 * 0.15

for c in range(3):
    arr[center_mask, c] = np.clip(profile_colors[t_idx, c] * brightness, 0, 255)

# 2. Erase "DRIZZLE." in the lower right (R between 165 and 188, Theta in [0.2, 1.5])
is_drizzle = (R >= 165) & (R <= 188) & (Theta >= 0.2) & (Theta <= 1.5) & (arr[:, :, 0] < 120) & (arr[:, :, 1] < 120) & (arr[:, :, 2] < 120)
is_drizzle = scipy.ndimage.binary_dilation(is_drizzle, iterations=3)

# Fill masked drizzle pixels using profile_colors at their angle
t_drizzle_idx = np.round((Theta[is_drizzle] + np.pi) / (2 * np.pi) * num_theta).astype(int) % num_theta
for c in range(3):
    arr[is_drizzle, c] = profile_colors[t_drizzle_idx, c]

out = Image.fromarray(arr.astype(np.uint8), 'RGBA')
out.save('C:/Users/yoges/.gemini/antigravity/brain/fbb57ee4-a65e-4fbd-9e63-01665ed890a5/flawless_foil_base.png')
print('Flawless foil base saved!')

