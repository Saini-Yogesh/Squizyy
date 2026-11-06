import json
import os
import re

print("Starting Indian startup currency & localization update...")

# 1. Update settings_schema.json
schema_path = 'squizyy-shopify-theme/config/settings_schema.json'
with open(schema_path, 'r', encoding='utf-8') as f:
    schema = json.load(f)

for section in schema:
    if section.get('name') == 'Cart & Shipping':
        for s in section.get('settings', []):
            if s.get('id') == 'free_shipping_threshold':
                s['label'] = 'Free Shipping Threshold (in paise / cents)'
                s['default'] = 49900
                s['info'] = '49900 = ₹499.00 INR (Store Currency)'
            elif s.get('id') == 'free_shipping_message':
                s['default'] = 'Add another bottle for FREE delivery across India!'
            elif s.get('id') == 'free_shipping_unlocked':
                s['default'] = "You've unlocked FREE shipping across India!"

with open(schema_path, 'w', encoding='utf-8') as f:
    json.dump(schema, f, indent=2)
print("Updated settings_schema.json")

# 2. Update settings_data.json
data_path = 'squizyy-shopify-theme/config/settings_data.json'
with open(data_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

if 'current' in data:
    data['current']['free_shipping_threshold'] = 49900
    data['current']['free_shipping_message'] = 'Add another bottle for FREE delivery across India!'
    data['current']['free_shipping_unlocked'] = "You've unlocked FREE shipping across India!"

with open(data_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)
print("Updated settings_data.json")

# 3. Update theme.liquid fallback
theme_liquid_path = 'squizyy-shopify-theme/layout/theme.liquid'
with open(theme_liquid_path, 'r', encoding='utf-8') as f:
    theme_content = f.read()

theme_content = theme_content.replace('settings.free_shipping_threshold | default: 4999', 'settings.free_shipping_threshold | default: 49900')
with open(theme_liquid_path, 'w', encoding='utf-8') as f:
    f.write(theme_content)
print("Updated theme.liquid")

