from PIL import Image

for name in ['DRIZZY-1537_1.png', 'DRIZZY-1658_1.png']:
    im = Image.open('scripts/drizzy_imgs/' + name)
    thumb = im.convert('RGB').resize((400, 600))
    thumb.save(f'scripts/{name}_thumb.jpg', 'JPEG')
    print('Saved thumb for', name)
