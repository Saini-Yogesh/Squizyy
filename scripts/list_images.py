import os, re

theme_dir = 'squizyy-shopify-theme'
images_used = set()

for root, dirs, files in os.walk(theme_dir):
    for f in files:
        if f.endswith('.liquid'):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                c = fp.read()
                matches = re.findall(r"['\"]([^'\"/\\]+\.(?:jpg|png|svg))['\"]", c)
                for m in matches:
                    images_used.add(m)

print(f"Total referenced images: {len(images_used)}")
for m in sorted(images_used):
    print(" -", m)

