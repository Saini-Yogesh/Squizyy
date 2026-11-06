from PIL import Image
import numpy as np

im = Image.open('scripts/screen_crop_from_user.jpg')
arr = np.array(im)
h, w, c = arr.shape
print(f"Size: {w}x{h}")

# Background on the left:
# Let's inspect column 20 from y=50 to y=300
left_col = arr[50:300, 20]
print("Left col median RGB:", np.median(left_col, axis=0))

# Notice that the left half (x from 0 to 180) is mostly background and text!
# If we replace the text on the left with the background color gradient:
clean = arr.copy()

# The text color is cream/white (R > 180, G > 160, B > 140)
# Let's see: on the left (x < 220), if a pixel is text, replace it with the smooth background!
bg_color = np.array([88, 42, 33], dtype=np.uint8) # warm brown

# In the text area:
# Replace the input box (y: 170 to 215, x: 75 to 380)
# But wait! In the input box area (x > 220), there is peanut butter behind it!
# Let's inspect what is behind the input box on the right:
# In the original photo, peanut butter is pouring onto pancakes!

# Let's save a clean composite combining the authentic high-res pancake photo and the exact warm palette

