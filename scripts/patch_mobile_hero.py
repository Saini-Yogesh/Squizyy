from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

orig = Image.open('scripts/drizzy_imgs/hero-bg-mobile.png').convert('RGBA')

font_path = 'C:/Windows/Fonts/ariblk.ttf'
logo_font = ImageFont.truetype(font_path, 34)
sticker = Image.open('squizyy-shopify-theme/assets/sticker.png')

px, py = 175, 668
pw, ph = 370 - 175, 718 - 668

# Sample the curve lighting along x just below DRIZZY at y=716
x_coords = np.linspace(px, px + pw - 1, pw).astype(int)
sampled_row = np.array([orig.getpixel((x, 716))[:3] for x in x_coords], dtype=np.float32)

# Repeat along ph
patch_rgb = np.tile(sampled_row[None, :, :], (ph, 1, 1))
patch_alpha = np.full((ph, pw, 1), 255, dtype=np.float32)
patch_arr = np.concatenate([patch_rgb, patch_alpha], axis=2).astype(np.uint8)
patch_img = Image.fromarray(patch_arr)

# Soft feather
mask = Image.new('L', (pw, ph), 0)
mdraw = ImageDraw.Draw(mask)
mdraw.rectangle([2, 2, pw - 3, ph - 3], fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(1.8))

orig.paste(patch_img, (px, py), mask)

# Draw SQUIZYY in brand purple #23122c
draw = ImageDraw.Draw(orig)
cx = 265
cy = 694
draw.text((cx, cy), 'SQUIZYY', font=logo_font, fill=(35, 18, 44, 255), anchor='mm')

# 2. Paste sticker over old sticker (298, 730), size 58x58
st_scaled = sticker.resize((58, 58), Image.Resampling.LANCZOS)
orig.paste(st_scaled, (298, 730), st_scaled)

# Save test crop
crop = orig.crop((120, 620, 420, 850))
crop.save('scripts/mobile_patch_test4.png')

# Save full image
orig.convert('RGB').save('squizyy-shopify-theme/assets/hero-bg-mobile.png')
orig.convert('RGB').save('client/public/assets/images/hero-bg-mobile.png')
print('Successfully saved mobile hero background!')
