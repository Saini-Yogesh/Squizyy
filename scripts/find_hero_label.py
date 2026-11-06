from PIL import Image, ImageDraw, ImageFont
import numpy as np

# Load hero-bg.png (1500, 887)
hero = Image.open('squizyy-shopify-theme/assets/hero-bg.png')
w, h = hero.size

# Let's inspect where the bottle is in hero-bg.png
# In hero-bg.png, the bottle is centered:
# Bottle label DRIZZY is roughly:
# X: 700 to 790
# Y: 440 to 480
crop = hero.crop((680, 420, 820, 520))
crop.save('scripts/hero_text_area.png')
print("Saved hero_text_area.png")
