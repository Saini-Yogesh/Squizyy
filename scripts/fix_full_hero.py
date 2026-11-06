from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

# Load full original 2478 x 1465 image
full_hero = Image.open('scripts/drizzy_imgs/hero-bg.png').convert('RGBA')
fw, fh = full_hero.size

font_path = "C:/Windows/Fonts/ariblk.ttf"
logo_font = ImageFont.truetype(font_path, 54)
sticker = Image.open('squizyy-shopify-theme/assets/sticker.png')

# 1. Seamless blend over DRIZZY in 2478x1465:
patch_x, patch_y = 1070, 854
patch_w, patch_h = 1318 - 1070, 916 - 854

# Sample the curve lighting along x just above DRIZZY at y=852
x_coords = np.linspace(patch_x, patch_x + patch_w - 1, patch_w).astype(int)
sampled_row = np.array([full_hero.getpixel((x, 852))[:3] for x in x_coords], dtype=np.float32)

# Repeat along patch_h
patch_rgb = np.tile(sampled_row[None, :, :], (patch_h, 1, 1))
patch_alpha = np.full((patch_h, patch_w, 1), 255, dtype=np.float32)
patch_arr = np.concatenate([patch_rgb, patch_alpha], axis=2).astype(np.uint8)
patch_img = Image.fromarray(patch_arr)

# Feather mask
mask = Image.new('L', (patch_w, patch_h), 0)
mdraw = ImageDraw.Draw(mask)
mdraw.rectangle([2, 1, patch_w - 3, patch_h - 2], fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(2.0))

full_hero.paste(patch_img, (patch_x, patch_y), mask)

# Draw SQUIZYY in brand purple #23122c
draw = ImageDraw.Draw(full_hero)
draw.text((1192, 884), "SQUIZYY", font=logo_font, fill=(35, 18, 44, 255), anchor="mm")

# 2. Overlay holographic sticker at X: 1230, Y: 910, size: ~ 82x82
sticker_scaled = sticker.resize((82, 82), Image.Resampling.LANCZOS)
full_hero.paste(sticker_scaled, (1230, 910), sticker_scaled)

# Save high-res and resized 1500x887
hero_1500 = full_hero.convert('RGB').resize((1500, 887), Image.Resampling.LANCZOS)
hero_1500.save('squizyy-shopify-theme/assets/hero-bg.png')
hero_1500.save('client/public/assets/images/hero-bg.png')
print("Successfully generated pixel-perfect hero-bg.png")

# Crop the bottle from hero_1500 to verify
crop_test = hero_1500.crop((600, 480, 880, 750))
crop_test.save('scripts/hero_bottle_verified.png')
print("Saved hero_bottle_verified.png")
