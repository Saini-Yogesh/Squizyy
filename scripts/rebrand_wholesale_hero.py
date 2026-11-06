from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

orig = Image.open('squizyy-shopify-theme/assets/wholesale-hero.png').convert('RGBA')
sticker = Image.open('squizyy-shopify-theme/assets/sticker.png')
font_path = "C:/Windows/Fonts/ariblk.ttf"

# Front row bottles:
front_xs = [-20, 271, 632, 1029, 1363]
front_ly = 370
front_fsize = 23
front_pw, front_ph = 126, 44

# Back row bottles:
back_xs = [61, 415, 752, 1086, 1410]
back_ly = 192
back_fsize = 19
back_pw, back_ph = 102, 36

draw = ImageDraw.Draw(orig)

# 1. Front row
for cx in front_xs:
    px = cx - 62
    py = front_ly - front_ph // 2
    pw, ph = front_pw, front_ph
    
    x_start = max(0, px)
    x_end = min(orig.width, px + pw)
    clip_w = x_end - x_start
    
    if clip_w > 10:
        sample_y = front_ly - 20
        sample_row = np.array([orig.getpixel((min(orig.width - 1, x_start + x), sample_y))[:3] for x in range(clip_w)], dtype=np.float32)
        patch_rgb = np.tile(sample_row[None, :, :], (ph, 1, 1)).astype(np.uint8)
        patch_alpha = np.full((ph, clip_w, 1), 255, dtype=np.uint8)
        patch_img = Image.fromarray(np.concatenate([patch_rgb, patch_alpha], axis=2))
        
        mask = Image.new('L', (clip_w, ph), 0)
        mdraw = ImageDraw.Draw(mask)
        mdraw.rectangle([2, 1, clip_w - 3, ph - 2], fill=255)
        mask = mask.filter(ImageFilter.GaussianBlur(2.0))
        
        orig.paste(patch_img, (x_start, py), mask)
        
        bfont = ImageFont.truetype(font_path, front_fsize)
        draw.text((cx, front_ly), "SQUIZYY", font=bfont, fill=(35, 18, 44, 255), anchor="mm")
        
        # Paste sticker directly over old one
        sx = cx + 46
        sy = front_ly + 42
        ssize = 58
        if sx < orig.width and sy < orig.height:
            st = sticker.resize((ssize, ssize), Image.Resampling.LANCZOS)
            orig.paste(st, (sx - ssize // 2, sy - ssize // 2), st)

# 2. Back row
for cx in back_xs:
    px = cx - 50
    py = back_ly - back_ph // 2
    pw, ph = back_pw, back_ph
    
    x_start = max(0, px)
    x_end = min(orig.width, px + pw)
    clip_w = x_end - x_start
    
    if clip_w > 10:
        sample_y = back_ly - 17
        sample_row = np.array([orig.getpixel((min(orig.width - 1, x_start + x), sample_y))[:3] for x in range(clip_w)], dtype=np.float32)
        patch_rgb = np.tile(sample_row[None, :, :], (ph, 1, 1)).astype(np.uint8)
        patch_alpha = np.full((ph, clip_w, 1), 255, dtype=np.uint8)
        patch_img = Image.fromarray(np.concatenate([patch_rgb, patch_alpha], axis=2))
        
        mask = Image.new('L', (clip_w, ph), 0)
        mdraw = ImageDraw.Draw(mask)
        mdraw.rectangle([2, 1, clip_w - 3, ph - 2], fill=255)
        mask = mask.filter(ImageFilter.GaussianBlur(2.0))
        
        orig.paste(patch_img, (x_start, py), mask)
        
        bfont = ImageFont.truetype(font_path, back_fsize)
        draw.text((cx, back_ly), "SQUIZYY", font=bfont, fill=(35, 18, 44, 255), anchor="mm")
        
        sx = cx + 37
        sy = back_ly + 34
        ssize = 46
        if sx < orig.width and sy < orig.height:
            st = sticker.resize((ssize, ssize), Image.Resampling.LANCZOS)
            orig.paste(st, (sx - ssize // 2, sy - ssize // 2), st)

# Save verified
crop_test = orig.crop((520, 300, 750, 460))
crop_test.save('scripts/wh_verified5.png')

# Save destination
orig.convert('RGB').save('squizyy-shopify-theme/assets/wholesale-hero.png')
orig.convert('RGB').save('client/public/assets/images/wholesale-hero.png')

# Also mobile version
mobile_hero = orig.resize((375, int(375 * orig.height / orig.width)), Image.Resampling.LANCZOS)
mobile_hero.convert('RGB').save('squizyy-shopify-theme/assets/wholesale-hero-mobile.png')
mobile_hero.convert('RGB').save('client/public/assets/images/wholesale-hero-mobile.png')

print("Successfully generated perfect wholesale-hero.png & wholesale-hero-mobile.png")
