import os
import re

pattern = re.compile(r'[\'\" ]([a-zA-Z0-9_\-\.]+\.(?:png|jpg|jpeg|webp|svg))[\'\" ]', re.I)

theme_imgs = set()
for folder in ['sections', 'snippets', 'templates', 'layout']:
    path = os.path.join('squizyy-shopify-theme', folder)
    for root, dirs, files in os.walk(path):
        for f in files:
            with open(os.path.join(root, f), 'r', encoding='utf-8', errors='ignore') as fl:
                matches = pattern.findall(fl.read())
                for m in matches:
                    theme_imgs.add(m)

print(f"Total referenced images in theme: {len(theme_imgs)}")
for img in sorted(theme_imgs):
    print(img)
