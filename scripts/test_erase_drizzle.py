import numpy as np
from PIL import Image

im = Image.open('scripts/drizzy_sticker_orig.png').convert('RGBA')
arr = np.array(im).astype(float)
H, W, _ = arr.shape
cx, cy = 244.0, 248.0
Y, X = np.ogrid[:H, :W]
R = np.hypot(X - cx, Y - cy)
Theta = np.arctan2(Y - cy, X - cx)

is_black = (arr[:, :, 0] < 50) & (arr[:, :, 1] < 50) & (arr[:, :, 2] < 50) & (arr[:, :, 3] > 180)
drizzle_region = (X > cx) & (Y > cy) & (R > 135) & (R < 192) & is_black

# For each pixel in drizzle_region, interpolate from non-black pixels in that same quadrant at the same radius
y_pts, x_pts = np.where(drizzle_region)
for y, x in zip(y_pts, x_pts):
    r_val = R[y, x]
    t_val = Theta[y, x]
    # find nearby non-black pixels with similar radius within 1 pixel and within +/- 0.4 rad
    r_mask = (np.abs(R - r_val) < 1.0) & (np.abs(Theta - t_val) < 0.45) & (~is_black) & (X > cx) & (Y > cy)
    if np.any(r_mask):
        # average color
        avg_color = np.mean(arr[r_mask], axis=0)
        arr[y, x] = avg_color

out = Image.fromarray(arr.astype(np.uint8), 'RGBA')
out.save('C:/Users/yoges/.gemini/antigravity/brain/fbb57ee4-a65e-4fbd-9e63-01665ed890a5/drizzle_erased.png')
print('Saved drizzle_erased.png')

