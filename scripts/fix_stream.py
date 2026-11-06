from PIL import Image, ImageDraw, ImageFilter
import numpy as np

im = Image.open('squizyy-shopify-theme/assets/retro-tv-screen-bg.jpg').convert('RGBA')
w, h = im.size

# We want a thick glossy stream from nozzle tip (x0, y0) to pancake butter (x1, y1)
x0, y0 = 692, 130
x1, y1 = 730, 675

# Draw a thick smooth bezier curve or line with 3D gradient
stream_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
draw = ImageDraw.Draw(stream_layer)

# Control point for slight natural sag
cx, cy = 705, 400

# Sample points along quadratic bezier
points = []
for t in np.linspace(0, 1, 100):
    bx = (1-t)**2 * x0 + 2*(1-t)*t * cx + t**2 * x1
    by = (1-t)**2 * y0 + 2*(1-t)*t * cy + t**2 * y1
    points.append((bx, by))

# Outer shadow / edge of stream (dark caramel)
for i in range(len(points)-1):
    draw.line([points[i], points[i+1]], fill=(130, 75, 30, 255), width=22)

# Main body of stream (warm golden peanut butter)
for i in range(len(points)-1):
    draw.line([points[i], points[i+1]], fill=(195, 125, 60, 255), width=18)

# Center highlight (glossy shine)
for i in range(len(points)-1):
    # offset highlight slightly to the right
    p0 = (points[i][0] + 2, points[i][1])
    p1 = (points[i+1][0] + 2, points[i+1][1])
    draw.line([p0, p1], fill=(235, 175, 110, 230), width=8)

stream_layer = stream_layer.filter(ImageFilter.GaussianBlur(1.0))
im = Image.alpha_composite(im, stream_layer)

final_img = im.convert('RGB')
final_img.save('squizyy-shopify-theme/assets/retro-tv-screen-bg.jpg', quality=95)
final_img.save('client/public/assets/images/retro-tv-screen-bg.jpg', quality=95)
print("Updated stream on retro-tv-screen-bg.jpg")

