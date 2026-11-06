from PIL import Image, ImageFilter
import numpy as np

# Load user crop
im = Image.open('scripts/screen_crop_from_user.jpg')
w, h = im.size
arr = np.array(im).astype(np.float32)

# Background color on the left is ~ [88, 42, 33]
bg_color = np.array([88, 42, 33], dtype=np.float32)

# Notice:
# 1. On the left half (x from 0 to w*0.5), it's smooth background.
# Any pixel that has bright text (r > 120 and b > 70) can be replaced with bg_color:
for y in range(h):
    for x in range(int(w * 0.5)):
        # If it's text
        pixel = arr[y, x]
        if pixel[0] > 115 and pixel[1] > 70 and pixel[2] > 50:
            arr[y, x] = bg_color

# 2. In the input box area (x: 75 to 370, y: 170 to 215):
# It covers from x=75 to x=370.
# On the right (x > 240), there is peanut butter beneath it!
# The peanut butter color is ~ [200, 140, 85]
# Let's see: if we smoothly blend across the input box:
# Or even better, let's upscale with Bicubic/Lanczos to 1024x768
cleaned = Image.fromarray(arr.astype(np.uint8))
cleaned = cleaned.filter(ImageFilter.MedianFilter(size=3))

# Let's save and inspect
cleaned.save('scripts/cleaned_user_bg.jpg')
print("Saved cleaned_user_bg.jpg")

