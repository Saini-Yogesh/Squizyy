import cv2
import numpy as np
from PIL import Image

# Load the screen crop
img = cv2.imread('scripts/screen_crop_from_user.jpg')
h, w = img.shape[:2]
print(f"Loaded image {w}x{h}")

# In the screen crop, the background color on the left is roughly:
left_bg = img[int(h*0.3):int(h*0.7), :int(w*0.25)]
mean_color = np.median(left_bg, axis=(0,1))
print("Mean bg color BGR:", mean_color)

# We can create a mask for the text areas and inpaint
# Or even better, examine what the background looks like
# The right side is peanut butter swirl, top is nozzle
# Let's see mask for the white text and purple button and input box
# Input box is cream around y = 0.5 to 0.6
# Button is purple around y = 0.62 to 0.72
# Text is white at y = 0.15 to 0.45
mask = np.zeros((h, w), dtype=np.uint8)

# Input box mask:
cv2.rectangle(mask, (int(w*0.17), int(h*0.50)), (int(w*0.87), int(h*0.60)), 255, -1)
# Button mask:
cv2.rectangle(mask, (int(w*0.17), int(h*0.62)), (int(w*0.87), int(h*0.72)), 255, -1)
# Top text mask (approx):
# Detect white text
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
text_mask = (gray > 160) & (np.arange(h)[:, None] < int(h*0.48))
mask[text_mask] = 255

# Lower text mask:
lower_text = (gray > 140) & (np.arange(h)[:, None] > int(h*0.75))
mask[lower_text] = 255

# Inpaint
inpainted = cv2.inpaint(img, mask, inpaintRadius=7, flags=cv2.INPAINT_TELEA)

# Let's smooth the left background where text was
# The left 40% between h*0.15 and h*0.8 can be a smooth gradient of mean_color
cv2.imwrite('scripts/screen_inpainted.jpg', inpainted)
print("Saved screen_inpainted.jpg")

