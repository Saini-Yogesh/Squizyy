from PIL import Image, ImageFilter
import numpy as np

# Load the full high-res 2000x3000 image
full = Image.open('scripts/drizzy_imgs/DRIZZY12496.jpg')
fw, fh = full.size

# Target TV screen aspect ratio and resolution: 1200 x 852 (1.408 ratio)
tw, th = 1200, 852

# Create the warm cocoa background
# Color: #54251a (84, 37, 26) with radial vignette to #2f1009 (47, 16, 9)
y, x = np.ogrid[:th, :tw]
cx, cy = tw * 0.65, th * 0.6
dist = np.sqrt((x - cx)**2 + (y - cy)**2)
max_dist = np.sqrt(tw**2 + th**2)
grad = np.clip(1.0 - (dist / max_dist) * 0.45, 0, 1)

r = (47 + (88 - 47) * grad).astype(np.uint8)
g = (16 + (39 - 16) * grad).astype(np.uint8)
b = (9 + (27 - 9) * grad).astype(np.uint8)
bg_arr = np.dstack([r, g, b])
bg = Image.fromarray(bg_arr).convert('RGBA')

# In DRIZZY12496.jpg:
# The pancake with thick peanut butter topping is roughly:
# X: fw * 0.35 to fw * 0.85
# Y: fh * 0.73 to fh * 0.88 (just the top fluffy pancakes + peanut butter swirl, ignoring white plate!)
pancake_top = full.crop((int(fw * 0.38), int(fh * 0.74), int(fw * 0.82), int(fh * 0.87)))
pw, ph = pancake_top.size

# The nozzle tip:
# X: fw * 0.46 to fw * 0.58
# Y: fh * 0.33 to fh * 0.40
nozzle = full.crop((int(fw * 0.46), int(fh * 0.33), int(fw * 0.58), int(fh * 0.40)))
nw, nh = nozzle.size

# Remove the light background from nozzle
n_arr = np.array(nozzle).astype(np.float32)
# Light wall background has r > 210, g > 180, b > 150
is_bg = (n_arr[:, :, 0] > 200) & (n_arr[:, :, 1] > 170) & (n_arr[:, :, 2] > 140)
n_alpha = np.where(is_bg, 0, 255).astype(np.uint8)
nozzle_rgba = nozzle.convert('RGBA')
nozzle_rgba.putalpha(Image.fromarray(n_alpha).filter(ImageFilter.GaussianBlur(1.2)))

# Feather the pancake edges smoothly so it melts into the warm cocoa background
p_arr = np.array(pancake_top).astype(np.float32)
p_alpha = np.ones((ph, pw), dtype=np.uint8) * 255

# Feather left edge
for i in range(int(pw * 0.25)):
    factor = i / (pw * 0.25)
    p_alpha[:, i] = np.minimum(p_alpha[:, i], int(255 * factor))

# Feather top edge
for i in range(int(ph * 0.2)):
    factor = i / (ph * 0.2)
    p_alpha[i, :] = np.minimum(p_alpha[i, :], int(255 * factor))

# Feather bottom edge (to hide plate entirely)
for i in range(int(ph * 0.25)):
    factor = i / (ph * 0.25)
    p_alpha[ph - 1 - i, :] = np.minimum(p_alpha[ph - 1 - i, :], int(255 * factor))

pancake_rgba = pancake_top.convert('RGBA')
pancake_rgba.putalpha(Image.fromarray(p_alpha).filter(ImageFilter.GaussianBlur(3.0)))

# Scale pancake nicely to fit bottom-right 65% of screen
target_pw = int(tw * 0.72)
target_ph = int(target_pw * (ph / pw))
pancake_scaled = pancake_rgba.resize((target_pw, target_ph), Image.Resampling.LANCZOS)

# Scale nozzle to fit top-center
target_nw = int(tw * 0.20)
target_nh = int(target_nw * (nh / nw))
nozzle_scaled = nozzle_rgba.resize((target_nw, target_nh), Image.Resampling.LANCZOS)

# Paste pancake
px = tw - target_pw + int(tw * 0.05)
py = th - target_ph + int(th * 0.05)
bg.paste(pancake_scaled, (px, py), pancake_scaled)

# Paste nozzle at top center
nx = int(tw * 0.52 - target_nw // 2)
ny = -8
bg.paste(nozzle_scaled, (nx, ny), nozzle_scaled)

# Create a thick, smooth peanut butter drizzle stream from nozzle to pancake
stream_x = nx + int(target_nw * 0.54)
stream_top = ny + target_nh - 12
stream_bottom = py + int(target_ph * 0.28)
stream_h = stream_bottom - stream_top
stream_w = int(tw * 0.024)

# Create peanut butter stream with 3D gradient (highlight in center, darker edges)
sy, sx = np.ogrid[:stream_h, :stream_w]
s_norm = np.abs(sx - stream_w / 2.0) / (stream_w / 2.0)
# Peanut butter RGB: highlight (225, 160, 95), body (190, 125, 65), edge shadow (130, 75, 35)
sr = (225 - (225 - 130) * (s_norm**1.5)).astype(np.uint8)
sg = (160 - (160 - 75) * (s_norm**1.5)).astype(np.uint8)
sb = (95 - (95 - 35) * (s_norm**1.5)).astype(np.uint8)
stream_arr = np.dstack([sr, sg, sb])
stream_img = Image.fromarray(stream_arr).convert('RGBA')

# Round the stream edges
stream_alpha = np.where(s_norm < 1.0, 255, 0).astype(np.uint8)
stream_img.putalpha(Image.fromarray(stream_alpha).filter(ImageFilter.GaussianBlur(0.8)))
bg.paste(stream_img, (stream_x - stream_w // 2, stream_top), stream_img)

# Slight darkening on left half for crisp white text legibility
left_shade = Image.new('RGBA', (tw, th), (0, 0, 0, 0))
ls_arr = np.zeros((th, tw, 4), dtype=np.uint8)
for col in range(int(tw * 0.65)):
    factor = 1.0 - (col / (tw * 0.65))
    ls_arr[:, col, 3] = int(55 * factor)
left_shade = Image.fromarray(ls_arr)
bg = Image.alpha_composite(bg, left_shade)

final_img = bg.convert('RGB')
final_img.save('squizyy-shopify-theme/assets/retro-tv-screen-bg.jpg', quality=95)
final_img.save('client/public/assets/images/retro-tv-screen-bg.jpg', quality=95)
print("Saved high-res seamless retro-tv-screen-bg.jpg")
