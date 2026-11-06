from PIL import Image
import numpy as np

im = Image.open('scripts/drizzy_sticker_orig.png')
arr = np.array(im)
cx, cy = 244.0, 248.0
H, W, _ = arr.shape
Y, X = np.ogrid[:H, :W]
R = np.hypot(X - cx, Y - cy)
Theta = np.arctan2(Y - cy, X - cx) * 180 / np.pi

is_dark = (arr[:, :, 0] < 50) & (arr[:, :, 1] < 50) & (arr[:, :, 2] < 50) & (arr[:, :, 3] > 200)
drizzle_mask = is_dark & (Theta > 10) & (Theta < 90) & (R > 135) & (R < 185)

# Cluster into connected components
import scipy.ndimage
labeled, num_features = scipy.ndimage.label(drizzle_mask)
print('Number of letter components in DRIZZLE.:', num_features)

components = []
for i in range(1, num_features + 1):
    comp_mask = (labeled == i)
    if np.sum(comp_mask) > 30:  # ignore tiny noise
        comp_thetas = Theta[comp_mask]
        comp_radii = R[comp_mask]
        mean_theta = np.mean(comp_thetas)
        mean_r = np.mean(comp_radii)
        components.append((mean_theta, mean_r, np.sum(comp_mask)))

components.sort(key=lambda c: c[0])
for idx, (th, r, count) in enumerate(components):
    print(f'Letter {idx}: angle={th:.1f} deg, radius={r:.1f} px, size={count} px')

