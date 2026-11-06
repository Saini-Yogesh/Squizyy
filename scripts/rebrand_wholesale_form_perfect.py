from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np

orig = Image.open('squizyy-shopify-theme/assets/wholesale-form.png').convert('RGB')
arr = np.array(orig)

# 1. Clean paper card text
paper_color = arr[1115, 145].copy()
arr[1112:1162, 145:330] = paper_color

# 2. Row of 11 bottles on shelf: DRIZZY is at y: 716 to 735
bottle_xs = [105, 187, 269, 350, 428, 508, 589, 668, 747, 822, 892]

for bx in bottle_xs:
    px1, py1, px2, py2 = bx - 28, 716, bx + 38, 735
    b_patch = arr[py1:py2, px1:px2]
    is_dark = (b_patch[:,:,0] < 155)
    b_patch[is_dark] = [228, 130, 50]
    arr[py1:py2, px1:px2] = b_patch

img = Image.fromarray(arr).convert('RGBA')
draw = ImageDraw.Draw(img)
font_path = "C:/Windows/Fonts/ariblk.ttf"

# Draw on paper card
draw.text((150, 1120), "SQUIZYY", font=ImageFont.truetype(font_path, 16), fill=(30, 30, 30, 255))
draw.text((150, 1142), "PEANUT BUTTER", font=ImageFont.truetype(font_path, 12), fill=(30, 30, 30, 255))

# Draw on bottles
shelf_font = ImageFont.truetype(font_path, 10)
sticker = Image.open('squizyy-shopify-theme/assets/sticker.png')

for bx in bottle_xs:
    draw.text((bx + 1, 726), "SQUIZYY", font=shelf_font, fill=(35, 18, 44, 255), anchor="mm")
    st_mini = sticker.resize((18, 18), Image.Resampling.LANCZOS)
    img.paste(st_mini, (bx + 22, 745), st_mini)

# Save verified
crop_shelf = img.crop((50, 640, 400, 820))
crop_shelf.save('scripts/wf_shelf_verified5.png')

# Save destination
img.convert('RGB').save('squizyy-shopify-theme/assets/wholesale-form.png')
img.convert('RGB').save('client/public/assets/images/wholesale-form.png')
print("Successfully generated perfect wholesale-form.png")
