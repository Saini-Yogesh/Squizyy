import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

size = 800
cx, cy = size / 2.0, size / 2.0
radius = 350.0

# Create radial/conical holographic texture
img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
y, x = np.ogrid[:size, :size]
r = np.hypot(x - cx, y - cy)
theta = np.arctan2(y - cy, x - cx)  # -pi to pi

# Normalize angle [0, 1]
norm_theta = (theta + np.pi) / (2 * np.pi)

# Realistic CD / holographic foil simulation
# Colors: Violet -> Cyan -> Green -> Yellow -> Orange -> Pink -> Violet
# Conical iridescent rainbow
def angle_to_rainbow(t):
    # Multiple shimmer peaks
    # Main reflection highlights at ~45 deg and 225 deg
    t_mod1 = (t * 1.5 + 0.15) % 1.0
    t_mod2 = (t * 2.0 + 0.6) % 1.0
    
    # Base metallic silver
    base_gray = 210 + 35 * np.cos(theta * 2 + 0.5)
    
    # Spectral rainbow components
    # Rainbow phase
    phase = theta * 1.8 + 0.8
    r_val = base_gray + 60 * np.sin(phase) + 30 * np.cos(theta * 4)
    g_val = base_gray + 60 * np.sin(phase + 2.094) + 20 * np.sin(theta * 3)
    b_val = base_gray + 70 * np.sin(phase + 4.188) + 40 * np.cos(theta * 2)
    
    # Specular white highlight streaks across the disc
    spec1 = np.exp(-((theta - 0.7) ** 2) / 0.15)
    spec2 = np.exp(-((theta + 2.3) ** 2) / 0.15)
    spec = np.maximum(spec1, spec2) * 80
    
    r_val += spec
    g_val += spec
    b_val += spec
    
    # Radial brushed metal effect (fine circular lines)
    grain = (np.sin(r * 2.5) * 6 + np.sin(r * 0.8) * 8 + np.cos(r * 5.0) * 4)
    r_val += grain
    g_val += grain
    b_val += grain
    
    # Clip to [0, 255]
    r_val = np.clip(r_val, 0, 255)
    g_val = np.clip(g_val, 0, 255)
    b_val = np.clip(b_val, 0, 255)
    
    return np.stack([r_val, g_val, b_val], axis=-1)

rgb = angle_to_rainbow(norm_theta)

# Mask circular disc with smooth antialiasing
mask = np.clip((radius - r) + 1.0, 0.0, 1.0) * 255.0
rgba = np.dstack([rgb, mask]).astype(np.uint8)

foil_im = Image.fromarray(rgba, 'RGBA')
foil_im.save('C:/Users/yoges/.gemini/antigravity/brain/fbb57ee4-a65e-4fbd-9e63-01665ed890a5/test_foil.png')
print("Saved test_foil.png")

