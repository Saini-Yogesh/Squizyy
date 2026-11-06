from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np
import math

# Load the existing sticker.png (512x512)
im = Image.open('squizyy-shopify-theme/assets/sticker.png').convert('RGBA')
w, h = im.size

# We want to replace the "D" in the center with a dripping "S",
# and replace "DRIZZLE." with "SQUIZYY."!
# Let's inspect where the "D" is:
# Center is (w//2, h//2) = (256, 256)
# Radius of inner area: about 140 pixels.

# Let's see: Can we extract the holographic sheen background?
# In sticker.png, the black parts are:
# Outer ring: r ~ 220 to 240
# Middle ring: r ~ 160 to 180
# Text: r ~ 180 to 220
# Center "D": r < 140

# Let's create a clean mask for the center and text
# To keep the exact holographic texture, we can inpaint/sample the iridescent sheen!
arr = np.array(im)

# Let's save a copy to inspect
print("Sticker loaded:", w, h)

