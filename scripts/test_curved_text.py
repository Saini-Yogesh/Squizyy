import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont

orig = Image.open('scripts/drizzy_sticker_orig.png').convert('RGBA')
base = Image.open('C:/Users/yoges/.gemini/antigravity/brain/fbb57ee4-a65e-4fbd-9e63-01665ed890a5/flawless_foil_base.png').convert('RGBA')
cx, cy = 244.0, 248.0
w, h = base.size

scale = 2
size_hi = w * scale
cx_hi = cx * scale
cy_hi = cy * scale

base_hi = base.resize((size_hi, size_hi), Image.Resampling.LANCZOS)
draw_hi = ImageDraw.Draw(base_hi)

color_ink = (45, 15, 40, 255)  # Squizyy dark brown #2D0F28
r_outer = 199.0 * scale
r_inner = 183.0 * scale

draw_hi.ellipse([cx_hi - r_outer, cy_hi - r_outer, cx_hi + r_outer, cy_hi + r_outer], outline=color_ink, width=int(3.5 * scale))
draw_hi.ellipse([cx_hi - r_inner, cy_hi - r_inner, cx_hi + r_inner, cy_hi + r_inner], outline=color_ink, width=int(3.5 * scale))

font = ImageFont.truetype('squizyy-shopify-theme/assets/Champ-Black.otf', int(22 * scale))

def render_curved_word(img, text, start_deg, end_deg, r_arc, font, color):
    angles = np.linspace(start_deg, end_deg, len(text))
    char_box = int(50 * scale)
    
    for char, deg in zip(text, angles):
        rad = math.radians(deg)
        px = cx_hi + r_arc * math.cos(rad)
        py = cy_hi + r_arc * math.sin(rad)
        
        c_img = Image.new('RGBA', (char_box, char_box), (0, 0, 0, 0))
        cdraw = ImageDraw.Draw(c_img)
        cdraw.text((char_box / 2, char_box / 2), char, font=font, fill=color, anchor='mm')
        
        rot_angle = -(deg + 90)
        c_rot = c_img.rotate(rot_angle, resample=Image.Resampling.BILINEAR)
        img.paste(c_rot, (int(px - char_box / 2), int(py - char_box / 2)), c_rot)

# Radius for text centers: 154 px (inner ring is at 183 px)
r_text = 154.0 * scale

# 1. SHAKE.: clockwise from bottom-left (-140 to -215 or 145 to 205 deg)
# In standard math angles:
# 180 is 9 o'clock. 140 is ~7:30 o'clock. 200 is ~10:00 o'clock (-160 deg).
render_curved_word(base_hi, "SHAKE.", 205, 145, r_text, font, color_ink)

# 2. SQUEEZE.: clockwise across the top (-130 to -40 deg)
render_curved_word(base_hi, "SQUEEZE.", -135, -45, r_text, font, color_ink)

# 3. SQUIZYY.: clockwise along the bottom-right (20 to 88 deg)
render_curved_word(base_hi, "SQUIZYY.", 22, 85, r_text, font, color_ink)

out = base_hi.resize((w, h), Image.Resampling.LANCZOS)
out.save('C:/Users/yoges/.gemini/antigravity/brain/fbb57ee4-a65e-4fbd-9e63-01665ed890a5/test_curved_text_v3.png')
print("Saved test_curved_text_v3.png")
