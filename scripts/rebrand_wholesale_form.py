from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

orig = Image.open('squizyy-shopify-theme/assets/wholesale-form.png').convert('RGB')
arr = np.array(orig)

# 1. White paper card text:
# x: 145 to 330, y: 1110 to 1165
# Inpaint text using distance transform from paper pixels
card_patch = arr[1110:1165, 145:330]
# Dark text has r < 120
is_text = card_patch[:,:,0] < 120
from scipy import ndimage
idx = ndimage.distance_transform_edt(is_text, return_distances=False, return_indices=True)
card_patch[is_text] = card_patch[idx[0], idx[1]][is_text]
arr[1110:1165, 145:330] = card_patch

img = Image.fromarray(arr).convert('RGBA')

# Render SQUIZYY PEANUT BUTTER on the card
font_path = "C:/Windows/Fonts/ariblk.ttf"
card_font = ImageFont.truetype(font_path, 16)
draw = ImageDraw.Draw(img)

# Shear for italic:
txt_card = Image.new('RGBA', (200, 50), (0, 0, 0, 0))
cdraw = ImageDraw.Draw(txt_card)
cdraw.text((5, 5), "SQUIZYY", font=card_font, fill=(30, 30, 30, 255))
cdraw.text((5, 25), "PEANUT BUTTER", font=ImageFont.truetype(font_path, 13), fill=(30, 30, 30, 255))

txt_card_rot = txt_card.transform((210, 50), Image.AFFINE, (1, -0.15, 0, 0, 1, 0), Image.Resampling.BICUBIC)
img.paste(txt_card_rot, (148, 1115), txt_card_rot)

# 2. Row of 11 bottles on shelf:
# Bottle centers along x:
# Let's find each bottle's DRIZZY label:
# y: 700 to 726, height ~ 26, width ~ 55
sticker = Image.open('squizyy-shopify-theme/assets/sticker.png')
shelf_font = ImageFont.truetype(font_path, 11)

# Centers of the 11 bottles along x:
# 105, 187, 269, 350, 428, 508, 589, 668, 747, 822, 892
bottle_xs = [105, 187, 269, 350, 428, 508, 589, 668, 747, 822, 892]

for bx in bottle_xs:
    # Patch DRIZZY: x from bx - 26 to bx + 28, y: 705 to 722
    px1, py1, px2, py2 = bx - 26, 706, bx + 28, 722
    b_patch = arr[py1:py2, px1:px2]
    # orange background is roughly [225, 125, 45]
    is_purple = (b_patch[:,:,0] < 140) & (b_patch[:,:,2] > 40)
    b_patch[is_purple] = [225, 125, 45]
    arr[py1:py2, px1:px2] = b_patch

# Refresh img with patched bottles
img = Image.fromarray(arr).convert('RGBA')
draw = ImageDraw.Draw(img)

for bx in bottle_xs:
    draw.text((bx + 1, 714), "SQUIZYY", font=shelf_font, fill=(35, 18, 44, 255), anchor="mm")
    # Paste mini sticker at x: bx + 22, y: 720, size 14x14
    st_mini = sticker.resize((14, 14), Image.Resampling.LANCZOS)
    img.paste(st_mini, (bx + 20, 718), st_mini)

# Save verified
crop_card = img.crop((100, 1000, 450, 1250))
crop_card.save('scripts/wf_card_verified.png')

crop_shelf = img.crop((50, 640, 400, 820))
crop_shelf.save('scripts/wf_shelf_verified.png')

# Save destination
img.convert('RGB').save('squizyy-shopify-theme/assets/wholesale-form.png')
img.convert('RGB').save('client/public/assets/images/wholesale-form.png')
print("Successfully generated perfect wholesale-form.png")

