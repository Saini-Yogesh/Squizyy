import re
import urllib.request

with open('scripts/live_home.html', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.findall(r'//squizyy-store\.myshopify\.com/cdn/shop/t/[0-9]+/assets/Slogan_[^\s\"\'\>]+', text)
print("Found slogan asset URLs:", m)
if m:
    url = "https:" + m[0]
    print("Downloading:", url)
    urllib.request.urlretrieve(url, "scripts/downloaded_slogan.png")
    from PIL import Image
    im = Image.open("scripts/downloaded_slogan.png")
    print("Downloaded slogan image size:", im.size, "format:", im.format)

