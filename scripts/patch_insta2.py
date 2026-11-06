from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

orig = Image.open('scripts/orig_insta-post-2.png').convert('RGBA')

# Target box for DRIZZLIN'
px, py, pw, ph = 92, 74, 168, 44

# Interpolate from top (y: 60 to 74) and bottom (y: 118 to 132)
top_strip = np.array(orig.crop((px, py - 12, px + pw, py)).resize((pw, ph), Image.Resampling.BILINEAR), dtype=np.float32)
bot_strip = np.array(orig.crop((px, py + ph, px + pw, py + ph + 12)).resize((pw, ph), Image.Resampling.BILINEAR), dtype=np.float32)

gy = np.linspace(0, 1, ph)[:, None, None]
blend = (top_strip * (1 - gy) + bot_strip * gy).astype(np.uint8)
blend_img = Image.fromarray(blend)

mask = Image.new('L', (pw, ph), 255)
mask = mask.filter(ImageFilter.GaussianBlur(1.5))
orig.paste(blend_img, (px, py), mask)

# Font for SQUEEZIN'
font_path = "C:/Windows/Fonts/ariblk.ttf"
font = ImageFont.truetype(font_path, 26)

draw = ImageDraw.Draw(orig)
# Draw SQUEEZIN'
# Stroke: (218, 185, 240), Fill: (45, 17, 56)
cx = px + pw // 2
cy = py + ph // 2 - 1

draw.text((cx, cy), "SQUEEZIN'", font=font, fill=(45, 17, 56, 255), stroke_width=2, stroke_fill=(218, 185, 240, 255), anchor="mm")

# Save test crop
crop = orig.crop((20, 50, 320, 140))
crop.save('scripts/insta2_test.png')

# Save full
orig.convert('RGB').save('squizyy-shopify-theme/assets/insta-post-2.png')
orig.convert('RGB').save('client/public/assets/images/insta-post-2.png')
print("Successfully patched insta-post-2.png")

