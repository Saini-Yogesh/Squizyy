import os

def check_dir(d, exts):
    matches = []
    for root, dirs, files in os.walk(d):
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if 'dist' in dirs: dirs.remove('dist')
        for f in files:
            if any(f.endswith(e) for e in exts):
                p = os.path.join(root, f)
                with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                    for i, line in enumerate(fp):
                        if '$' in line and '${' not in line and '$(' not in line:
                            matches.append((p, i + 1, line.strip()))
    return matches

print("=== squizyy-shopify-theme ===")
for p, line_no, text in check_dir('squizyy-shopify-theme', ['.liquid', '.json', '.js']):
    print(f"{os.path.basename(p)}:{line_no} -> {text}")

print("\n=== client/src ===")
for p, line_no, text in check_dir('client/src', ['.jsx', '.js', '.html']):
    print(f"{os.path.basename(p)}:{line_no} -> {text}")

