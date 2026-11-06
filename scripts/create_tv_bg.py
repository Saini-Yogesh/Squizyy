from PIL import Image, ImageFilter
import numpy as np

# Load the pancake drizzle crop
pancake = Image.open('scripts/pancake_drizzle_crop.jpg')
pw, ph = pancake.size

# Target screen background: 1200 x 850
target_w, target_h = 1200, 850

# Base warm cocoa-brown background with subtle vignette
bg = Image.new('RGB', (target_w, target_h), (82, 35, 23)) # #522317

# Create radial warm lighting gradient
y, x = np.ogrid[:target_h, :target_w]
center_x, center_y = target_w * 0.65, target_h * 0.6
dist = np.sqrt((x - center_x)**2 + (y - center_y)**2)
max_dist = np.sqrt(target_w**2 + target_h**2)
grad = 1.0 - (dist / max_dist) * 0.45

# Base colors: center is warmer caramel-brown (100, 48, 30), edge is dark espresso (40, 16, 10)
r = (40 + (105 - 40) * grad).astype(np.uint8)
g = (16 + (50 - 16) * grad).astype(np.uint8)
b = (10 + (32 - 10) * grad).astype(np.uint8)
bg_arr = np.dstack([r, g, b])
bg = Image.fromarray(bg_arr)

# Now let's place the pancake stack at the bottom-right and the nozzle at top-center
# From pancake image:
# Nozzle: top portion (x: pw*0.35 to pw*0.8, y: 0 to ph*0.25)
# Stream: middle portion
# Pancakes: bottom portion (y: ph*0.6 to ph)

# Let's resize pancake crop so it fits nicely on the right half
scale = 1.25
new_pw, new_ph = int(pw * scale), int(ph * scale)
p_resized = pancake.resize((new_pw, new_ph), Image.Resampling.LANCZOS)

# Create a soft feather mask for pancake
# Keep nozzle at top and pancake at bottom, fade out the light wall background into our warm cocoa brown
p_arr = np.array(p_resized).astype(np.float32)

# In p_resized, the wall background is light peach: R > 200, G > 170, B > 140
# The peanut butter nozzle is orange/purple, stream is brown (190, 120, 60), pancakes are (180, 110, 50)
# We can blend based on color or a soft mask
# Or let's see how screen_crop_from_user looked:
# In screen_crop_from_user, the background was recolored or tinted to warm dark brown!

p_resized.save('scripts/p_scaled.jpg')
bg.save('scripts/bg_base.jpg')
print("Saved base components")

