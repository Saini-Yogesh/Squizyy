from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

# Load squizyy logo / font
font_path = "C:/Windows/Fonts/ariblk.ttf" # Arial Black
logo_font = ImageFont.truetype(font_path, 25)
m_logo_font = ImageFont.truetype(font_path, 28)

sticker = Image.open('squizyy-shopify-theme/assets/sticker.png')

# 1. FIX hero-bg.png (1500, 887)
# Reload fresh from scripts/drizzy_imgs/hero-bg.png
hero = Image.open('scripts/drizzy_imgs/hero-bg.png').convert('RGBA')
hw, hh = hero.size

# We want a feathered patch over DRIZZY:
# X: 642 to 772, Y: 518 to 556
patch_w = 772 - 642
patch_h = 556 - 518

# Create patch with the exact vertical gradient:
grad = np.linspace(0, 1, patch_h)[:, None]
pr = (229 - (229 - 224) * grad).repeat(patch_w, axis=1).astype(np.uint8)
pg = (156 - (156 - 150) * grad).repeat(patch_w, axis=1).astype(np.uint8)
pb = (92 - (92 - 86) * grad).repeat(patch_w, axis=1).astype(np.uint8)
pa = np.full((patch_h, patch_w), 255, dtype=np.uint8)
patch_arr = np.dstack([pr, pg, pb, pa])
patch_img = Image.fromarray(patch_arr)

# Feather the patch edges so it blends seamlessly into the label
mask = Image.new('L', (patch_w, patch_h), 0)
mdraw = ImageDraw.Draw(mask)
mdraw.rectangle([3, 3, patch_w - 4, patch_h - 4], fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(2.5))

hero.paste(patch_img, (642, 518), mask)

# Draw SQUIZYY in brand dark purple #23122c
draw = ImageDraw.Draw(hero)
draw.text((702, 537), "SQUIZYY", font=logo_font, fill=(35, 18, 44, 255), anchor="mm")

# Overlay holographic sticker
sticker_scaled = sticker.resize((42, 42), Image.Resampling.LANCZOS)
hero.paste(sticker_scaled, (747, 549), sticker_scaled)

hero.convert('RGB').save('squizyy-shopify-theme/assets/hero-bg.png')
hero.convert('RGB').save('client/public/assets/images/hero-bg.png')
print("Successfully blended hero-bg.png")

# 2. FIX hero-bg-mobile.png (516, 1163)
# Reload fresh from scripts/drizzy_imgs/hero-bg-mobile.png
hero_m = Image.open('scripts/drizzy_imgs/hero-bg-mobile.png').convert('RGBA')

# X: 168 to 320, Y: 670 to 715
mpatch_w = 320 - 168
mpatch_h = 715 - 670

mgrad = np.linspace(0, 1, mpatch_h)[:, None]
mpr = (229 - (229 - 224) * mgrad).repeat(mpatch_w, axis=1).astype(np.uint8)
mpg = (156 - (156 - 150) * mgrad).repeat(mpatch_w, axis=1).astype(np.uint8)
mpb = (92 - (92 - 86) * mgrad).repeat(mpatch_w, axis=1).astype(np.uint8)
mpa = np.full((mpatch_h, mpatch_w), 255, dtype=np.uint8)
mpatch_arr = np.dstack([mpr, mpg, mpb, mpa])
mpatch_img = Image.fromarray(mpatch_arr)

mmask = Image.new('L', (mpatch_w, mpatch_h), 0)
mmdraw = ImageDraw.Draw(mmask)
mmdraw.rectangle([3, 3, mpatch_w - 4, mpatch_h - 4], fill=255)
mmask = mmask.filter(ImageFilter.GaussianBlur(2.5))

hero_m.paste(mpatch_img, (168, 670), mmask)

mdraw = ImageDraw.Draw(hero_m)
mdraw.text((238, 692), "SQUIZYY", font=m_logo_font, fill=(35, 18, 44, 255), anchor="mm")

m_sticker_scaled = sticker.resize((48, 48), Image.Resampling.LANCZOS)
hero_m.paste(m_sticker_scaled, (299, 710), m_sticker_scaled)

hero_m.save('squizyy-shopify-theme/assets/hero-bg-mobile.png')
hero_m.save('client/public/assets/images/hero-bg-mobile.png')
print("Successfully blended hero-bg-mobile.png")
