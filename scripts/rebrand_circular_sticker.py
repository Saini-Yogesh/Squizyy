from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np
import math

im = Image.open('squizyy-shopify-theme/assets/sticker.png').convert('RGBA')
w, h = im.size # 512, 512
cx, cy = w / 2, h / 2

# Create holographic background:
# Sample pixels where there's NO black graphics (R > 80 or G > 80 or B > 80)
# We can create a radial iridescent gradient or use the existing image's colors
arr = np.array(im)

# Detect black graphics:
# In arr, black graphics have (R < 50 and G < 50 and B < 50 and A > 200)
is_black = (arr[:, :, 0] < 50) & (arr[:, :, 1] < 50) & (arr[:, :, 2] < 50) & (arr[:, :, 3] > 200)

# Replace black pixels in the center (r < 130 from center) with smooth holographic texture
# and replace black pixels where "DRIZZLE." was (bottom right: angle from 10 deg to 90 deg)
y_coords, x_coords = np.ogrid[:h, :w]
dist_from_center = np.sqrt((x_coords - cx)**2 + (y_coords - cy)**2)
angles = np.arctan2(y_coords - cy, x_coords - cx) * 180 / np.pi # -180 to 180

# Clean the center area (dist < 135)
center_mask = dist_from_center < 135
# Interpolate center using surrounding holographic sheen
# Holographic sheen at r = 140 has radial angle-based color
clean_arr = arr.copy()

# Sample surrounding ring colors at r ~ 140
for y in range(h):
    for x in range(w):
        if center_mask[y, x] and is_black[y, x]:
            # sample from angle at r=138
            ang = math.atan2(y - cy, x - cx)
            sample_r = 138
            sx = int(cx + sample_r * math.cos(ang))
            sy = int(cy + sample_r * math.sin(ang))
            sx = max(0, min(w-1, sx))
            sy = max(0, min(h-1, sy))
            clean_arr[y, x] = arr[sy, sx]

# Clean "DRIZZLE." area:
# "DRIZZLE." is located roughly at bottom-right between angles 15° and 95°, radius 175 to 225
drizzle_mask = (dist_from_center >= 170) & (dist_from_center <= 225) & (angles >= 15) & (angles <= 95)
for y in range(h):
    for x in range(w):
        if drizzle_mask[y, x] and is_black[y, x]:
            # sample from adjacent radial position or slightly inside/outside
            r_val = dist_from_center[y, x]
            ang = angles[y, x]
            # sample at ang - 10 or slightly different r
            sample_ang = (ang + 3) * math.pi / 180
            sx = int(cx + (168) * math.cos(sample_ang))
            sy = int(cy + (168) * math.sin(sample_ang))
            sx = max(0, min(w-1, sx))
            sy = max(0, min(h-1, sy))
            clean_arr[y, x] = arr[sy, sx]

clean_img = Image.fromarray(clean_arr)

# Now let's draw:
# 1. "SQUIZYY." curved text in place of "DRIZZLE."
# 2. Dripping bold "S" in the center!
draw = ImageDraw.Draw(clean_img)

# Try loading a bold font, fallback to default
try:
    font_path = "C:/Windows/Fonts/ariblk.ttf" # Arial Black
    font = ImageFont.truetype(font_path, 34)
    center_font = ImageFont.truetype(font_path, 150)
except:
    font = ImageFont.load_default()
    center_font = ImageFont.load_default()

# 1. Text along circular arc: "SQUIZYY."
# Radius for text baseline is approx 192 px
text = "SQUIZYY."
# Arc spans from angle ~ 25° to ~ 85°
start_angle = 24
end_angle = 84
char_angles = np.linspace(start_angle, end_angle, len(text))

for char, ang_deg in zip(text, char_angles):
    ang_rad = ang_deg * math.pi / 180
    # Position
    px = cx + 192 * math.cos(ang_rad)
    py = cy + 192 * math.sin(ang_rad)
    # Render single char on small canvas, rotate by tangent (ang_deg + 90)
    char_img = Image.new('RGBA', (60, 60), (0,0,0,0))
    cdraw = ImageDraw.Draw(char_img)
    cdraw.text((15, 10), char, font=font, fill=(35, 15, 30, 255))
    # Rotate
    rot = char_img.rotate(-(ang_deg - 90), expand=False, resample=Image.Resampling.BILINEAR)
    clean_img.paste(rot, (int(px - 30), int(py - 30)), rot)

# 2. Dripping "S" in the center:
# Draw a bold stylized "S" with peanut butter drips at the bottom!
s_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
sdraw = ImageDraw.Draw(s_layer)

# Draw central bold "S"
sdraw.text((cx - 52, cy - 105), "S", font=center_font, fill=(35, 15, 30, 255))

# Add organic peanut butter drips coming down from the bottom loop of the "S"
# Drop 1 (left)
sdraw.line([(cx - 28, cy + 30), (cx - 28, cy + 65)], fill=(35, 15, 30, 255), width=18)
sdraw.ellipse([(cx - 39, cy + 55), (cx - 17, cy + 77)], fill=(35, 15, 30, 255))

# Drop 2 (middle long drip)
sdraw.line([(cx + 5, cy + 32), (cx + 5, cy + 85)], fill=(35, 15, 30, 255), width=22)
sdraw.ellipse([(cx - 8, cy + 74), (cx + 18, cy + 98)], fill=(35, 15, 30, 255))

# Drop 3 (right small drip)
sdraw.line([(cx + 36, cy + 25), (cx + 36, cy + 55)], fill=(35, 15, 30, 255), width=16)
sdraw.ellipse([(cx + 26, cy + 46), (cx + 46, cy + 66)], fill=(35, 15, 30, 255))

clean_img = Image.alpha_composite(clean_img, s_layer)

clean_img.save('squizyy-shopify-theme/assets/sticker.png')
clean_img.save('client/public/assets/images/sticker.png')
clean_img.save('scripts/rebranded_sticker.png')
print("Successfully rebranded sticker.png!")

