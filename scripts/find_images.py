import re

with open('scripts/getdrizzy_home.html', 'r', encoding='utf-8') as f:
    html = f.read()

imgs = list(set(re.findall(r'(?:https:)?//[^\s"\'<>]+\.(?:png|jpg|jpeg|webp|gif)', html, re.I)))
print(f"Total images: {len(imgs)}")
for img in sorted(imgs):
    low = img.lower()
    if any(k in low for k in ['tv', 'popup', 'hero', 'badge', 'modal', 'pancake', 'slogan', 'drizzy', 'story']):
        print(img)
