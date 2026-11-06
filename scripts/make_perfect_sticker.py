from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np
import math

size = 512
cx, cy = size / 2.0, size / 2.0
radius = 240.0

# Create a stunning holographic rainbow metallic sheen
y, x = np.ogrid[:size, :size]
dx = x - cx
dy = y - cy
dist = np.sqrt(dx**2 + dy**2)
angle = np.arctan2(dy, dx)

sin1 = np.sin(angle * 2.0 + 0.5)
sin2 = np.cos(angle * 3.0 - 0.2)
metallic = 185 + 50 * sin1 + 20 * sin2

r_chan = np.clip(metallic + 50 * np.cos(angle * 1.5), 140, 255)
g_chan = np.clip(metallic + 65 * np.sin(angle * 2.0 - 0.5), 130, 255)
b_chan = np.clip(metallic + 75 * np.cos(angle * 2.0 + 1.2), 140, 255)

noise = np.random.normal(0, 2.5, (size, size))
r_chan = np.clip(r_chan + noise, 0, 255).astype(np.uint8)
g_chan = np.clip(g_chan + noise, 0, 255).astype(np.uint8)
b_chan = np.clip(b_chan + noise, 0, 255).astype(np.uint8)

alpha = np.zeros((size, size), dtype=np.uint8)
alpha[dist <= radius] = 255

holo_arr = np.dstack([r_chan, g_chan, b_chan, alpha])
sticker = Image.fromarray(holo_arr)

draw = ImageDraw.Draw(sticker)
draw.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], outline=(255, 255, 255, 220), width=3)
r1 = 226
draw.ellipse([cx - r1, cy - r1, cx + r1, cy + r1], outline=(35, 15, 30, 255), width=4)
r2 = 176
draw.ellipse([cx - r2, cy - r2, cx + r2, cy + r2], outline=(35, 15, 30, 255), width=3)

font_path = "C:/Windows/Fonts/ariblk.ttf"
font = ImageFont.truetype(font_path, 28)
center_font = ImageFont.truetype(font_path, 140)

def draw_curved_text(img, text, center_angle_deg, radius, font, fill=(35, 15, 30, 255), face_inward=False):
    char_widths = [font.getlength(c) for c in text]
    total_len = sum(char_widths) + len(text) * 4
    total_angle = (total_len / (2 * math.pi * radius)) * 360
    
    current_angle = center_angle_deg - (total_angle / 2.0)
    for c, w in zip(text, char_widths):
        ang_step = (w / (2 * math.pi * radius)) * 360
        mid_ang = current_angle + ang_step / 2.0
        current_angle += ang_step + (4 / (2 * math.pi * radius)) * 360
        
        rad = mid_ang * math.pi / 180.0
        px = cx + radius * math.cos(rad)
        py = cy + radius * math.sin(rad)
        
        char_box = 64
        c_img = Image.new('RGBA', (char_box, char_box), (0,0,0,0))
        cdraw = ImageDraw.Draw(c_img)
        cdraw.text((char_box/2, char_box/2), c, font=font, fill=fill, anchor="mm")
        
        if face_inward:
            rot_ang = -(mid_ang - 90)
        else:
            rot_ang = -(mid_ang + 90)
            
        c_rot = c_img.rotate(rot_ang, resample=Image.Resampling.BILINEAR)
        img.paste(c_rot, (int(px - char_box/2), int(py - char_box/2)), c_rot)

draw_curved_text(sticker, "SQUEEZE.", -65, 201, font, face_inward=False)
draw_curved_text(sticker, "SHAKE.", -160, 201, font, face_inward=False)
draw_curved_text(sticker, "SQUIZYY.", 52, 201, font, face_inward=False)

center_layer = Image.new('RGBA', (size, size), (0,0,0,0))
cdraw = ImageDraw.Draw(center_layer)

cdraw.text((cx, cy - 25), "S", font=center_font, fill=(35, 15, 30, 255), anchor="mm")

# Organic drips
cdraw.line([(cx - 24, cy + 30), (cx - 24, cy + 62)], fill=(35, 15, 30, 255), width=16)
cdraw.ellipse([(cx - 33, cy + 53), (cx - 15, cy + 71)], fill=(35, 15, 30, 255))

cdraw.line([(cx + 4, cy + 32), (cx + 4, cy + 85)], fill=(35, 15, 30, 255), width=20)
cdraw.ellipse([(cx - 7, cy + 74), (cx + 15, cy + 96)], fill=(35, 15, 30, 255))

cdraw.line([(cx + 30, cy + 26), (cx + 30, cy + 52)], fill=(35, 15, 30, 255), width=14)
cdraw.ellipse([(cx + 22, cy + 45), (cx + 38, cy + 61)], fill=(35, 15, 30, 255))

# Subtle peanut shine in the top loop
cdraw.ellipse([(cx - 2, cy - 20), (cx + 8, cy - 10)], fill=(240, 235, 250, 255))

sticker = Image.alpha_composite(sticker, center_layer)

sticker.save('squizyy-shopify-theme/assets/sticker.png')
sticker.save('client/public/assets/images/sticker.png')
sticker.save('scripts/perfect_sticker.png')
print("Saved perfect_sticker.png")
