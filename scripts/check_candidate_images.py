import os
from PIL import Image

candidates = [
    'hero-bg.png',
    'hero-bg-mobile.png',
    'our-story.png',
    'wholesale-form.png',
    'wholesale-hero.png',
    'wholesale-hero-mobile.png',
    'product-bottle-left.png',
    'other-product-right.png',
    'squizyy-1.jpg',
    'squizyy-peanut-left.png',
    'insta-post-1.png',
    'insta-post-2.png',
    'insta-post-3.png',
    'insta-post-4.png',
    'timeline-1.jpg',
    'timeline-2.png',
    'timeline-3.jpg',
    'USASQUIZYYBACKcopy.jpg',
    'USASQUIZYYHOWTOcopy.jpg',
    'USASQUIZYYGOODcopy.jpg',
    'USASQUIZYYFRONTcopy.jpg',
    '1_bottle.png',
    '2_bottle.png',
    '3_bottle.png',
    '6_bottles.png'
]

os.makedirs('scripts/crops', exist_ok=True)
for c in candidates:
    p = os.path.join('squizyy-shopify-theme/assets', c)
    if os.path.exists(p):
        try:
            im = Image.open(p)
            print(f"{c}: size {im.size}, mode {im.mode}")
            thumb = im.convert('RGB')
            thumb.thumbnail((500, 500))
            thumb.save(os.path.join('scripts/crops', f"thumb_{c}.jpg"), 'JPEG')
        except Exception as e:
            print(f"Error on {c}: {e}")
    else:
        print(f"MISSING: {c}")
