from PIL import Image

im = Image.open('squizyy-shopify-theme/assets/SQUIZYY12496.jpg')
w, h = im.size
print(f"SQUIZYY12496 size: {w}x{h}")

# The nozzle is around y = 35% to 40%
# The pancakes are at y = 75% to 92%
# If we crop from nozzle down to pancakes:
# Box: x: w*0.2 to w*0.8, y: h*0.35 to h*0.95
box = (int(w*0.1), int(h*0.34), int(w*0.9), int(h*0.95))
crop = im.crop(box)
crop.save('scripts/pancake_drizzle_crop.jpg')
print("Saved pancake_drizzle_crop.jpg", crop.size)

