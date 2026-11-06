import urllib.request
import re
import os

os.makedirs('scripts/drizzy_imgs', exist_ok=True)

with open('scripts/getdrizzy_home.html', 'r', encoding='utf-8') as f:
    html = f.read()

urls = re.findall(r'(?:https:)?//getdrizzy\.co/cdn/shop/files/[^\s"\'<>]+\.(?:jpg|png|webp)', html)
urls = list(set(urls))
print(f"Found {len(urls)} file URLs on getdrizzy.co")

for u in urls:
    full_url = "https:" + u if u.startswith("//") else u
    filename = os.path.basename(full_url.split('?')[0])
    dest = os.path.join('scripts/drizzy_imgs', filename)
    try:
        urllib.request.urlretrieve(full_url, dest)
        print("Downloaded:", filename)
    except Exception as e:
        print("Failed:", filename, e)

