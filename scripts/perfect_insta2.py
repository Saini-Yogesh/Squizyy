from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np
from scipy import ndimage

orig = Image.open('scripts/orig_insta-post-2.png').convert('RGB')
orig_arr = np.array(orig)

# Bounding region of DRIZZLIN' strictly between NOW and AT
x1, y1, x2, y2 = 94, 70, 264, 125
sub = orig_arr[y1:y2, x1:x2]

# Detect text
r, g, b = sub[:,:,0], sub[:,:,1], sub[:,:,2]
is_text = ((r < 75) & (b > 30)) | ((r > 175) & (b > 185) & (g < 210))
is_text = ndimage.binary_dilation(is_text, iterations=2)

indices = ndimage.distance_transform_edt(is_text, return_distances=False, return_indices=True)
inpainted = sub[indices[0], indices[1]]

sub[is_text] = inpainted[is_text]
orig_arr[y1:y2, x1:x2] = sub

orig_img = Image.fromarray(orig_arr).convert('RGBA')

# Font
font_path = "C:/Windows/Fonts/ariblk.ttf"
font = ImageFont.truetype(font_path, 23)

txt_img = Image.new('RGBA', (240, 60), (0, 0, 0, 0))
tdraw = ImageDraw.Draw(txt_img)
tdraw.text((20, 5), "SQUEEZIN'", font=font, fill=(48, 18, 60, 255), stroke_width=2, stroke_fill=(222, 198, 245, 255))

sheared = txt_img.transform((250, 60), Image.AFFINE, (1, -0.15, 0, 0, 1, 0), Image.Resampling.BICUBIC)

# Paste centered cleanly between NOW and AT
orig_img.paste(sheared, (75, 75), sheared)

# Save verified
crop_verified = orig_img.crop((15, 45, 325, 140))
crop_verified.save('scripts/insta2_final_check4.png')

orig_img.convert('RGB').save('squizyy-shopify-theme/assets/insta-post-2.png')
orig_img.convert('RGB').save('client/public/assets/images/insta-post-2.png')
print("Successfully generated perfect insta-post-2.png")
