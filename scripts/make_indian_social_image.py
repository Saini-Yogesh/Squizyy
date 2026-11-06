from PIL import Image, ImageDraw, ImageFont

w, h = 1200, 630
img = Image.new('RGB', (w, h), (248, 235, 215)) # Warm cream #f8ebd7
draw = ImageDraw.Draw(img)

# Outer frame
draw.rounded_rectangle([20, 20, w - 20, h - 20], radius=32, fill=(255, 251, 242), outline=(45, 15, 40), width=4)

# Load fonts
font_title = ImageFont.truetype('squizyy-shopify-theme/assets/Champ-Black.otf', 56)
font_sub = ImageFont.truetype('squizyy-shopify-theme/assets/Champ-Black.otf', 32)
try:
    font_body = ImageFont.truetype('C:/Windows/Fonts/ariblk.ttf', 23)
    font_mono = ImageFont.truetype('squizyy-shopify-theme/assets/AzeretMono-VariableFont.ttf', 17)
except:
    font_body = ImageFont.load_default()
    font_mono = ImageFont.load_default()

# Brand Pill: 100% Indian Startup / Made in India
draw.rounded_rectangle([60, 60, 430, 102], radius=20, fill=(202, 154, 241), outline=(45, 15, 40), width=2)
draw.text((75, 72), 'MADE IN INDIA • 100% ALL-NATURAL', font=font_mono, fill=(45, 15, 40))

# Slogan
draw.text((60, 125), 'SHAKE. SQUEEZE.', font=font_title, fill=(45, 15, 40))
draw.text((60, 195), 'DRIZZLE.', font=font_title, fill=(45, 15, 40))

# Subheadline
draw.text((60, 280), "India's First Squeezable\nPeanut Butter Bottle.", font=font_sub, fill=(45, 15, 40))

# Indian Brand Bullets
bullets = [
    '✓ 100% Farm-Fresh Saurashtra (Gujarat) Peanuts',
    '✓ Zero Palm Oil • Zero Added Sugar • Zero Stir',
    '✓ Pure Squeeze Convenience — No Oily Spoons',
    '✓ Free Fast Delivery Across India on ₹499+'
]
y_b = 390
for b in bullets:
    draw.text((60, y_b), b, font=font_body, fill=(70, 30, 60))
    y_b += 40

# Right side: Bottle & Sticker
try:
    bottle = Image.open('squizyy-shopify-theme/assets/1_bottle.png').convert('RGBA')
    bw, bh = bottle.size
    new_h = 480
    new_w = int(bw * (new_h / bh))
    bottle_resized = bottle.resize((new_w, new_h), Image.Resampling.LANCZOS)
    img.paste(bottle_resized, (790, 75), bottle_resized)
except Exception as e:
    print('Bottle paste error:', e)

try:
    sticker = Image.open('squizyy-shopify-theme/assets/sticker.png').convert('RGBA')
    sticker_resized = sticker.resize((155, 155), Image.Resampling.LANCZOS)
    img.paste(sticker_resized, (705, 375), sticker_resized)
except Exception as e:
    print('Sticker paste error:', e)

img.save('squizyy-shopify-theme/assets/social-sharing-image.jpg', quality=95)
img.save('client/public/assets/images/social-sharing-image.jpg', quality=95)
img.save('C:/Users/yoges/.gemini/antigravity/brain/fbb57ee4-a65e-4fbd-9e63-01665ed890a5/social-sharing-image.jpg', quality=95)
print('Regenerated 100% Indian Brand social-sharing-image.jpg successfully!')

