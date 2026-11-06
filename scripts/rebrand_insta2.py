from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

img = Image.open('squizyy-shopify-theme/assets/insta-post-2.png').convert('RGBA')

# Bounding box of "DRIZZLIN'" is roughly x: 95 to 260, y: 78 to 115
# Or we can clean the whole text line x: 20 to 316, y: 76 to 118
# Behind the text is the monstera leaf:
# Let's clone/inpaint the monstera leaf texture from above (y: 35 to 75) and below (y: 120 to 140)
patch_box = (20, 75, 316, 118)
px1, py1, px2, py2 = patch_box
pw, ph = px2 - px1, py2 - py1

# Sample background from slightly above
bg_sample = img.crop((px1, py1 - ph, px2, py1)).filter(ImageFilter.GaussianBlur(3.0))

mask = Image.new('L', (pw, ph), 255)
mask = mask.filter(ImageFilter.GaussianBlur(4.0))

img.paste(bg_sample, (px1, py1), mask)

# Now render "NOW SQUEEZIN' AT"
font_path = "C:/Windows/Fonts/ariblk.ttf"
font = ImageFont.truetype(font_path, 21)

draw = ImageDraw.Draw(img)
text = "NOW SQUEEZIN' AT"
cx, cy = 168, 97

# Stroke color: light lilac (220, 195, 240)
stroke_color = (222, 198, 245, 255)
fill_color = (48, 18, 60, 255)

# Draw with stroke
draw.text((cx, cy), text, font=font, fill=fill_color, stroke_width=2, stroke_fill=stroke_color, anchor="mm")

# Save preview and destination
img.convert('RGB').save('squizyy-shopify-theme/assets/insta-post-2.png')
img.convert('RGB').save('client/public/assets/images/insta-post-2.png')

crop = img.crop((20, 40, 320, 140))
crop.save('scripts/insta2_verified.png')
print("Successfully updated insta-post-2.png")

