from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np
from scipy.ndimage import distance_transform_edt, binary_dilation

# Open pristine image
im = Image.open('squizyy-shopify-theme/assets/wholesale-hero.png').convert('RGB')
arr = np.array(im)

front_xs = [-20, 271, 632, 1029, 1363]
front_ly = 370
front_fsize = 24

back_xs = [61, 415, 752, 1086, 1410]
back_ly = 192
back_fsize = 19

# 1. Inpaint front row bottles
for cx in front_xs:
    x1 = max(0, cx - 80)
    x2 = min(arr.shape[1], cx + 80)
    y1 = max(0, front_ly - 32)
    y2 = min(arr.shape[0], front_ly + 28)
    
    crop = arr[y1:y2, x1:x2]
    diff = crop[:,:,0].astype(int) - crop[:,:,2].astype(int)
    is_text = (crop[:,:,0] < 140) & (crop[:,:,1] < 110) & (crop[:,:,2] < 140) & (diff < 90)
    
    if np.sum(is_text) > 50:
        mask = binary_dilation(is_text, iterations=3)
        ind = distance_transform_edt(mask, return_distances=False, return_indices=True)
        inpainted = crop[tuple(ind)]
        inp_img = Image.fromarray(inpainted).filter(ImageFilter.GaussianBlur(1.8))
        inp_smooth = np.array(inp_img)
        
        crop[mask] = inp_smooth[mask]
        arr[y1:y2, x1:x2] = crop

# 2. Inpaint back row bottles
for cx in back_xs:
    x1 = max(0, cx - 60)
    x2 = min(arr.shape[1], cx + 60)
    y1 = max(0, back_ly - 25)
    y2 = min(arr.shape[0], back_ly + 22)
    
    crop = arr[y1:y2, x1:x2]
    diff = crop[:,:,0].astype(int) - crop[:,:,2].astype(int)
    is_text = (crop[:,:,0] < 140) & (crop[:,:,1] < 110) & (crop[:,:,2] < 140) & (diff < 90)
    
    if np.sum(is_text) > 50:
        mask = binary_dilation(is_text, iterations=3)
        ind = distance_transform_edt(mask, return_distances=False, return_indices=True)
        inpainted = crop[tuple(ind)]
        inp_img = Image.fromarray(inpainted).filter(ImageFilter.GaussianBlur(1.5))
        inp_smooth = np.array(inp_img)
        
        crop[mask] = inp_smooth[mask]
        arr[y1:y2, x1:x2] = crop

# Convert back to PIL Image
result = Image.fromarray(arr).convert('RGBA')
draw = ImageDraw.Draw(result)
sticker = Image.open('squizyy-shopify-theme/assets/sticker.png')
font_path = "C:/Windows/Fonts/ariblk.ttf"

# Draw text and paste stickers on front row
for cx in front_xs:
    bfont = ImageFont.truetype(font_path, front_fsize)
    draw.text((cx, front_ly), "SQUIZYY", font=bfont, fill=(35, 18, 44, 255), anchor="mm")
    
    sx = cx + 46
    sy = front_ly + 42
    ssize = 58
    if 0 <= sx < result.width and 0 <= sy < result.height:
        st = sticker.resize((ssize, ssize), Image.Resampling.LANCZOS)
        result.paste(st, (sx - ssize // 2, sy - ssize // 2), st)

# Draw text and paste stickers on back row
for cx in back_xs:
    bfont = ImageFont.truetype(font_path, back_fsize)
    draw.text((cx, back_ly), "SQUIZYY", font=bfont, fill=(35, 18, 44, 255), anchor="mm")
    
    sx = cx + 37
    sy = back_ly + 34
    ssize = 46
    if 0 <= sx < result.width and 0 <= sy < result.height:
        st = sticker.resize((ssize, ssize), Image.Resampling.LANCZOS)
        result.paste(st, (sx - ssize // 2, sy - ssize // 2), st)

# Crop for verification
crop_front = result.crop((520, 300, 750, 460))
crop_front.save('scripts/wh_inpaint_verify_front.png')

crop_back = result.crop((650, 130, 850, 270))
crop_back.save('scripts/wh_inpaint_verify_back.png')

# Save to destination
result.convert('RGB').save('squizyy-shopify-theme/assets/wholesale-hero.png')
result.convert('RGB').save('client/public/assets/images/wholesale-hero.png')

# Mobile version
mobile = result.resize((375, int(375 * result.height / result.width)), Image.Resampling.LANCZOS)
mobile.convert('RGB').save('squizyy-shopify-theme/assets/wholesale-hero-mobile.png')
mobile.convert('RGB').save('client/public/assets/images/wholesale-hero-mobile.png')

print("Successfully generated inpaint-based wholesale-hero.png & wholesale-hero-mobile.png")

