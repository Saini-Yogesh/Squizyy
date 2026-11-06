from PIL import Image
im = Image.open('squizyy-shopify-theme/assets/Australia_Icon_7cdf6797-9b9e-43cd-8855-bed45dbfad15.png')
print("Image size:", im.size)
im.thumbnail((300, 300))
im.save('scripts/check_aus_icon.png')
print("Saved preview to scripts/check_aus_icon.png")

