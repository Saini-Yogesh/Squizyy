from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np
from scipy.ndimage import distance_transform_edt, binary_dilation

font_path = 'C:/Windows/Fonts/ariblk.ttf'
sticker_path = 'squizyy-shopify-theme/assets/sticker.png'
sticker = Image.open(sticker_path)

# Load pristine original timeline-3.jpg
im = Image.open('squizyy-shopify-theme/assets/timeline-3.jpg').convert('RGB')
arr = np.array(im)

# -------------------------------------------------------------
# 1. Skyscraper vertical banner (y: 0 to 600, x: 650 to 850)
# -------------------------------------------------------------
sky_crop = arr[0:600, 650:850].copy()
r, g, b = sky_crop[:,:,0].astype(int), sky_crop[:,:,1].astype(int), sky_crop[:,:,2].astype(int)

mask_sky = np.zeros((sky_crop.shape[0], sky_crop.shape[1]), dtype=bool)
mask_sky[170:450, 50:126] = (r[170:450, 50:126] < 195) | (g[170:450, 50:126] < 200) | (b[170:450, 50:126] < 205)
mask_sky[0:115, 50:126] = (r[0:115, 50:126] < 195) | (g[0:115, 50:126] < 200) | (b[0:115, 50:126] < 205)

mask_sky = binary_dilation(mask_sky, iterations=2)
ind_sky = distance_transform_edt(mask_sky, return_distances=False, return_indices=True)
inp_sky = sky_crop[tuple(ind_sky)]
inp_sky_smooth = np.array(Image.fromarray(inp_sky).filter(ImageFilter.GaussianBlur(1.5)))
sky_crop[mask_sky] = inp_sky_smooth[mask_sky]

sky_res = Image.fromarray(sky_crop).convert('RGBA')
font_sky = ImageFont.truetype(font_path, 28)

t_canv_sky = Image.new('RGBA', (240, 50), (0,0,0,0))
tdraw_sky = ImageDraw.Draw(t_canv_sky)
tdraw_sky.text((120, 25), 'SQUIZYY', font=font_sky, fill=(45, 20, 55, 255), anchor='mm')
t_rot_sky = t_canv_sky.rotate(267.5, Image.Resampling.BICUBIC, expand=True)

sky_res.paste(t_rot_sky, (88 - t_rot_sky.width//2, 310 - t_rot_sky.height//2), t_rot_sky)
sky_res.paste(t_rot_sky, (88 - t_rot_sky.width//2, 45 - t_rot_sky.height//2), t_rot_sky)
arr[0:600, 650:850] = np.array(sky_res.convert('RGB'))

# -------------------------------------------------------------
# 2. Billboard upside-down bottle (y: 600 to 750, x: 620 to 800)
# -------------------------------------------------------------
bb_crop = arr[600:750, 620:800].copy()
poly_mask = Image.new('L', (bb_crop.shape[1], bb_crop.shape[0]), 0)
pdraw = ImageDraw.Draw(poly_mask)
pdraw.polygon([(85, 96), (205, 110), (205, 140), (85, 124)], fill=255)
in_poly = np.array(poly_mask) > 0

r_bb, g_bb, b_bb = bb_crop[:,:,0].astype(int), bb_crop[:,:,1].astype(int), bb_crop[:,:,2].astype(int)
is_text_bb = in_poly & (r_bb < 160) & (g_bb < 100) & (b_bb < 130)

mask_bb = binary_dilation(is_text_bb, iterations=3)
ind_bb = distance_transform_edt(mask_bb, return_distances=False, return_indices=True)
inp_bb = bb_crop[tuple(ind_bb)]
inp_bb_smooth = np.array(Image.fromarray(inp_bb).filter(ImageFilter.GaussianBlur(1.2)))
bb_crop[mask_bb] = inp_bb_smooth[mask_bb]

bb_res = Image.fromarray(bb_crop).convert('RGBA')
t_canv_bb = Image.new('RGBA', (130, 30), (0,0,0,0))
tdraw_bb = ImageDraw.Draw(t_canv_bb)
font_bb = ImageFont.truetype(font_path, 12)
tdraw_bb.text((65, 15), 'SQUIZYY', font=font_bb, fill=(45, 20, 55, 255), anchor='mm')
t_rot_bb = t_canv_bb.rotate(-15, Image.Resampling.BICUBIC, expand=True)

bb_res.paste(t_rot_bb, (140 - t_rot_bb.width//2, 115 - t_rot_bb.height//2), t_rot_bb)

st_bb = sticker.resize((34, 34), Image.Resampling.LANCZOS).rotate(-15)
bb_res.paste(st_bb, (128 - 17, 88 - 17), st_bb)
arr[600:750, 620:800] = np.array(bb_res.convert('RGB'))

# -------------------------------------------------------------
# 3. Billboard headline DRIZZY™ (y: 960 to 1040, x: 630 to 860)
# -------------------------------------------------------------
hl_crop = arr[960:1040, 630:860].copy()
r_hl, g_hl, b_hl = hl_crop[:,:,0].astype(int), hl_crop[:,:,1].astype(int), hl_crop[:,:,2].astype(int)
is_text_hl = (r_hl < 100) & (g_hl < 70) & (b_hl < 100)

mask_hl = binary_dilation(is_text_hl, iterations=3)
ind_hl = distance_transform_edt(mask_hl, return_distances=False, return_indices=True)
inp_hl = hl_crop[tuple(ind_hl)]
inp_hl_smooth = np.array(Image.fromarray(inp_hl).filter(ImageFilter.GaussianBlur(2.0)))
hl_crop[mask_hl] = inp_hl_smooth[mask_hl]

hl_res = Image.fromarray(hl_crop).convert('RGBA')

txt_w, txt_h = 240, 60
t_canvas_hl = Image.new('RGBA', (txt_w, txt_h), (0,0,0,0))
tdraw_hl = ImageDraw.Draw(t_canvas_hl)
font_hl = ImageFont.truetype(font_path, 34)
font_tm = ImageFont.truetype(font_path, 13)

tdraw_hl.text((10, 30), 'SQUIZYY', font=font_hl, fill=(45, 20, 55, 255), anchor='lm')
tdraw_hl.text((188, 16), 'TM', font=font_tm, fill=(45, 20, 55, 255), anchor='mm')
shear_hl = t_canvas_hl.transform((txt_w, txt_h), Image.AFFINE, (1, -0.22, 10, 0, 1, 0), Image.Resampling.BICUBIC)

hl_res.paste(shear_hl, (10, 14), shear_hl)
arr[960:1040, 630:860] = np.array(hl_res.convert('RGB'))

# -------------------------------------------------------------
# 4. Handheld bottle (y: 1300 to 1500, x: 500 to 680)
# -------------------------------------------------------------
hand_crop = arr[1300:1500, 500:680].copy()
zone_hand = hand_crop[69:81, 43:83].copy()
is_text_hand = (zone_hand[:,:,0] < 125) & (zone_hand[:,:,1] < 75) & (zone_hand[:,:,2] < 75)

bg_top = hand_crop[67:69, 43:83].mean(axis=0)
bg_bot = hand_crop[81:83, 43:83].mean(axis=0)
bg_grad = np.linspace(bg_top, bg_bot, 12)

mask_hand = binary_dilation(is_text_hand, iterations=1)
zone_hand[mask_hand] = bg_grad[mask_hand]
hand_crop[69:81, 43:83] = zone_hand

hand_res = Image.fromarray(hand_crop).convert('RGBA')
draw_hand = ImageDraw.Draw(hand_res)
font_hand = ImageFont.truetype(font_path, 8)
draw_hand.text((60, 75), 'SQUIZYY', font=font_hand, fill=(35, 18, 44, 255), anchor='mm')

st_hand = sticker.resize((22, 22), Image.Resampling.LANCZOS)
hand_res.paste(st_hand, (88 - 11, 84 - 11), st_hand)
arr[1300:1500, 500:680] = np.array(hand_res.convert('RGB'))

# -------------------------------------------------------------
# Final output save
# -------------------------------------------------------------
final_img = Image.fromarray(arr)

# Save to Shopify Theme and Client assets
final_img.save('squizyy-shopify-theme/assets/timeline-3.jpg', quality=95)
final_img.save('client/public/assets/images/timeline-3.jpg', quality=95)

# Verification crop
final_img.resize((800, int(800 * final_img.height / final_img.width))).save('scripts/timeline_3_final_verified.jpg', quality=90)
print('timeline-3.jpg successfully rebranded and saved!')

