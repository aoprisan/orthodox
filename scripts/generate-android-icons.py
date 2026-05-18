#!/usr/bin/env python3
"""
Generate Android launcher icons, adaptive-icon layers, splash screens,
and a Play Store icon for the Orthodox Calendar app.

Aesthetic: "Gilded Panel" — a Byzantine-icon-painting motif. A three-bar
Russian Orthodox cross rendered in two-tone gold leaf, sitting on a deep
oxblood backdrop with a soft mandorla glow and faint aged-panel grain.
"""

from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

# ---------------------------------------------------------------------------
# Palette
# ---------------------------------------------------------------------------

OXBLOOD_DEEP = (16, 8, 11)        # outer frame, vignette
OXBLOOD_MID = (34, 14, 18)        # base panel
OXBLOOD_GLOW = (74, 28, 30)       # mandorla center
GOLD_DEEP = (122, 84, 26)         # cross shadow side
GOLD_BASE = (176, 130, 44)        # cross body
GOLD_BRIGHT = (232, 196, 96)      # cross highlight
GOLD_LEAF = (252, 224, 138)       # extreme highlight
GOLD_HAIRLINE = (146, 108, 44)    # ornament hairlines

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def lerp(a: int, b: int, t: float) -> int:
    return int(a + (b - a) * t)


def lerp_rgb(a, b, t):
    return (lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t))


def radial_gradient(size: int, inner, outer, focus=(0.5, 0.5), radius=0.75, falloff=1.4) -> Image.Image:
    """Soft radial gradient on an opaque RGB canvas."""
    img = Image.new("RGB", (size, size), outer)
    px = img.load()
    cx, cy = focus[0] * size, focus[1] * size
    rmax = radius * size
    for y in range(size):
        for x in range(size):
            d = math.hypot(x - cx, y - cy) / rmax
            t = min(1.0, d) ** falloff
            px[x, y] = lerp_rgb(inner, outer, t)
    return img


def add_grain(img: Image.Image, amount: int = 6, seed: int = 7) -> Image.Image:
    """Stippled monochrome grain to evoke an aged panel."""
    rnd = random.Random(seed)
    w, h = img.size
    noise = Image.new("L", (w, h), 128)
    np = noise.load()
    for y in range(h):
        for x in range(w):
            np[x, y] = 128 + rnd.randint(-amount, amount)
    noise = noise.filter(ImageFilter.GaussianBlur(radius=0.4))
    # Blend grain by mapping noise to a low-contrast multiply.
    base = img.convert("RGB")
    bp = base.load()
    out = Image.new("RGB", (w, h))
    op = out.load()
    for y in range(h):
        for x in range(w):
            r, g, b = bp[x, y]
            n = np[x, y]
            factor = 0.93 + (n - 128) / 800.0  # very subtle
            op[x, y] = (
                max(0, min(255, int(r * factor))),
                max(0, min(255, int(g * factor))),
                max(0, min(255, int(b * factor))),
            )
    return out


# ---------------------------------------------------------------------------
# Background panel
# ---------------------------------------------------------------------------

def draw_background(size: int) -> Image.Image:
    """Aged oxblood panel with a centered gold mandorla glow and rim ornament."""
    # Base radial: oxblood glow at center.
    bg = radial_gradient(size, OXBLOOD_GLOW, OXBLOOD_DEEP, radius=0.72, falloff=1.55)

    # Mid layer: stretch the mid tone over the middle to soften the radial.
    mid = Image.new("RGB", (size, size), OXBLOOD_MID)
    mask = Image.new("L", (size, size), 0)
    md = ImageDraw.Draw(mask)
    md.ellipse(
        (size * 0.06, size * 0.06, size * 0.94, size * 0.94),
        fill=200,
    )
    mask = mask.filter(ImageFilter.GaussianBlur(radius=size * 0.05))
    bg = Image.composite(mid, bg, mask)

    # Gold-leaf inner glow (mandorla).
    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for i, alpha in enumerate([22, 16, 11, 7]):
        r = size * (0.30 + i * 0.07)
        gd.ellipse(
            (size / 2 - r, size / 2 - r, size / 2 + r, size / 2 + r),
            fill=(220, 170, 80, alpha),
        )
    glow = glow.filter(ImageFilter.GaussianBlur(radius=size * 0.06))
    bg = Image.alpha_composite(bg.convert("RGBA"), glow).convert("RGB")

    # Vignette ring — keep edges deep so any adaptive mask reads as old wood.
    vignette = Image.new("L", (size, size), 0)
    vd = ImageDraw.Draw(vignette)
    vd.ellipse(
        (-size * 0.15, -size * 0.15, size * 1.15, size * 1.15),
        fill=255,
        outline=None,
    )
    vd.ellipse(
        (size * 0.04, size * 0.04, size * 0.96, size * 0.96),
        fill=0,
    )
    vignette = vignette.filter(ImageFilter.GaussianBlur(radius=size * 0.07))
    dark = Image.new("RGB", (size, size), OXBLOOD_DEEP)
    bg = Image.composite(dark, bg, vignette)

    # Faint hairline diamond mesh, but only in the outer rim — evokes punched
    # gilding around a Byzantine icon panel. Kept very low alpha so it reads
    # as texture, not pattern.
    ornament = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    od = ImageDraw.Draw(ornament)
    step = max(10, size // 22)
    for k in range(-size, size * 2, step):
        od.line([(k, 0), (k + size, size)], fill=(*GOLD_HAIRLINE, 255), width=1)
        od.line([(k, size), (k + size, 0)], fill=(*GOLD_HAIRLINE, 255), width=1)
    # Mask: visible only near the rim, fading toward the center.
    rim_mask = Image.new("L", (size, size), 0)
    rd = ImageDraw.Draw(rim_mask)
    rd.ellipse((-size * 0.05, -size * 0.05, size * 1.05, size * 1.05), fill=80)
    rd.ellipse((size * 0.10, size * 0.10, size * 0.90, size * 0.90), fill=0)
    rim_mask = rim_mask.filter(ImageFilter.GaussianBlur(radius=size * 0.12))
    ornament.putalpha(rim_mask)
    bg = Image.alpha_composite(bg.convert("RGBA"), ornament).convert("RGB")

    bg = add_grain(bg, amount=10, seed=11)
    return bg


# ---------------------------------------------------------------------------
# Foreground: three-bar Orthodox cross with burnished gold
# ---------------------------------------------------------------------------

def draw_cross(size: int) -> Image.Image:
    """
    Draw the cross on a transparent canvas of given size.
    Designed so the cross sits inside the 72/108 adaptive-icon safe zone.
    """
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))

    # Render at 4x then downsample for crisp anti-aliased edges.
    SS = 4
    W = size * SS
    canvas = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    d = ImageDraw.Draw(canvas)

    safe = 72.0 / 108.0  # adaptive-icon safe zone fraction
    box = W * safe * 0.96
    cx, cy = W / 2, W / 2
    top = cy - box * 0.50
    bottom = cy + box * 0.50

    post_w = box * 0.11
    post_left = cx - post_w / 2
    post_right = cx + post_w / 2

    titulus_w = box * 0.34
    titulus_h = box * 0.085
    titulus_y = top  # flush with top so the post pokes through slightly

    main_w = box * 0.94
    main_h = box * 0.14
    main_y = cy - box * 0.22

    foot_w = box * 0.68
    foot_h = box * 0.115
    foot_cy = cy + box * 0.28
    foot_slant = box * 0.10  # vertical offset (left up, right down)

    def gold_bar_rect(x0, y0, x1, y1, slant_left=0.0, slant_right=0.0, key="bar"):
        """
        Draw a horizontal bar with burnished gold gradient. The bar is a
        parallelogram — slant_left/slant_right are constant y-offsets applied
        to the left and right edges respectively (so the top and bottom edges
        stay parallel). Used for the slanted suppedaneum.
        """
        h = y1 - y0
        steps = 64
        for i in range(steps):
            t = i / (steps - 1)
            t_next = (i + 1) / (steps - 1)
            # Diagonal light: bright upper-left, deepens toward lower-right.
            if t < 0.30:
                tone = lerp_rgb(GOLD_LEAF, GOLD_BRIGHT, t / 0.30)
            elif t < 0.62:
                tone = lerp_rgb(GOLD_BRIGHT, GOLD_BASE, (t - 0.30) / 0.32)
            else:
                tone = lerp_rgb(GOLD_BASE, GOLD_DEEP, (t - 0.62) / 0.38)
            yA = y0 + h * t
            yB = y0 + h * t_next
            poly = [
                (x0, yA + slant_left),
                (x1, yA + slant_right),
                (x1, yB + slant_right),
                (x0, yB + slant_left),
            ]
            d.polygon(poly, fill=(*tone, 255))

        # Inner top highlight strip (thin bright line under the top edge).
        hl_h = max(2, h * 0.09)
        d.polygon(
            [
                (x0 + h * 0.05, y0 + slant_left + 1),
                (x1 - h * 0.05, y0 + slant_right + 1),
                (x1 - h * 0.05, y0 + hl_h + slant_right),
                (x0 + h * 0.05, y0 + hl_h + slant_left),
            ],
            fill=(*GOLD_LEAF, 200),
        )
        # Bottom shadow strip (thin dark line above the bottom edge).
        sh_h = max(2, h * 0.12)
        d.polygon(
            [
                (x0, y1 - sh_h + slant_left),
                (x1, y1 - sh_h + slant_right),
                (x1, y1 + slant_right),
                (x0, y1 + slant_left),
            ],
            fill=(*GOLD_DEEP, 210),
        )
        # Subtle left-edge bevel highlight.
        bevel_w = max(2, h * 0.08)
        d.polygon(
            [
                (x0, y0 + slant_left),
                (x0 + bevel_w, y0 + slant_left),
                (x0 + bevel_w, y1 + slant_left),
                (x0, y1 + slant_left),
            ],
            fill=(*GOLD_LEAF, 90),
        )
        # Right-edge shadow.
        d.polygon(
            [
                (x1 - bevel_w, y0 + slant_right),
                (x1, y0 + slant_right),
                (x1, y1 + slant_right),
                (x1 - bevel_w, y1 + slant_right),
            ],
            fill=(*GOLD_DEEP, 110),
        )

    # Soft drop shadow first (offset down-right).
    shadow = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    off = int(W * 0.012)
    sd.rectangle((post_left + off, top + off, post_right + off, bottom + off), fill=(0, 0, 0, 150))
    sd.rectangle(
        (cx - titulus_w / 2 + off, titulus_y + off, cx + titulus_w / 2 + off, titulus_y + titulus_h + off),
        fill=(0, 0, 0, 150),
    )
    sd.rectangle(
        (cx - main_w / 2 + off, main_y + off, cx + main_w / 2 + off, main_y + main_h + off),
        fill=(0, 0, 0, 150),
    )
    foot_x0s = cx - foot_w / 2 + off
    foot_x1s = cx + foot_w / 2 + off
    foot_y0s = foot_cy - foot_h / 2 + off
    foot_y1s = foot_cy + foot_h / 2 + off
    sd.polygon(
        [
            (foot_x0s, foot_y0s + foot_slant),
            (foot_x1s, foot_y0s - foot_slant),
            (foot_x1s, foot_y1s - foot_slant),
            (foot_x0s, foot_y1s + foot_slant),
        ],
        fill=(0, 0, 0, 150),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=W * 0.020))
    # Tone shadow down — its job is to lift the cross off the panel, not steal contrast.
    shadow.putalpha(Image.eval(shadow.split()[3], lambda v: int(v * 0.55)))
    canvas = Image.alpha_composite(canvas, shadow)
    d = ImageDraw.Draw(canvas)

    # 1. Vertical post.
    gold_bar_rect(post_left, top, post_right, bottom, key="post")
    # 2. Titulus (top short bar).
    gold_bar_rect(cx - titulus_w / 2, titulus_y, cx + titulus_w / 2, titulus_y + titulus_h, key="titulus")
    # 3. Main crossbar.
    gold_bar_rect(cx - main_w / 2, main_y, cx + main_w / 2, main_y + main_h, key="main")
    # 4. Suppedaneum (slanted footrest).
    foot_x0 = cx - foot_w / 2
    foot_x1 = cx + foot_w / 2
    foot_y0 = foot_cy - foot_h / 2
    foot_y1 = foot_cy + foot_h / 2
    gold_bar_rect(
        foot_x0,
        foot_y0,
        foot_x1,
        foot_y1,
        slant_left=foot_slant,
        slant_right=-foot_slant,
        key="foot",
    )

    # Center boss — small gilded square where the post and crossbar meet.
    boss = post_w * 0.55
    d.rectangle(
        (cx - boss / 2, main_y + main_h * 0.25, cx + boss / 2, main_y + main_h * 0.75),
        fill=(*GOLD_LEAF, 220),
    )

    # Downsample with antialiasing.
    img = canvas.resize((size, size), Image.LANCZOS)
    return img


def draw_foreground(size: int) -> Image.Image:
    """Adaptive-icon foreground: cross + soft halo, transparent elsewhere."""
    fg = Image.new("RGBA", (size, size), (0, 0, 0, 0))

    # Soft halo behind the cross (mandorla light).
    halo = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    hd = ImageDraw.Draw(halo)
    for r, a in [(0.34, 38), (0.27, 30), (0.21, 22), (0.15, 14)]:
        radius = size * r
        hd.ellipse(
            (size / 2 - radius, size / 2 - radius, size / 2 + radius, size / 2 + radius),
            fill=(240, 200, 120, a),
        )
    halo = halo.filter(ImageFilter.GaussianBlur(radius=size * 0.04))
    fg = Image.alpha_composite(fg, halo)

    cross = draw_cross(size)
    fg = Image.alpha_composite(fg, cross)
    return fg


# ---------------------------------------------------------------------------
# Composites
# ---------------------------------------------------------------------------

def composite_full(size: int) -> Image.Image:
    """Background + foreground rendered together (for legacy + Play Store)."""
    bg = draw_background(size).convert("RGBA")
    fg = draw_foreground(size)
    return Image.alpha_composite(bg, fg)


def squircle_mask(size: int) -> Image.Image:
    """Android-style squircle mask (superellipse)."""
    mask = Image.new("L", (size, size), 0)
    SS = 4
    big = Image.new("L", (size * SS, size * SS), 0)
    bp = big.load()
    c = size * SS / 2
    r = size * SS / 2 - 2
    n = 4.0  # squircle exponent (Android uses ~4)
    for y in range(size * SS):
        for x in range(size * SS):
            dx = abs(x - c) / r
            dy = abs(y - c) / r
            if dx ** n + dy ** n <= 1.0:
                bp[x, y] = 255
    mask = big.resize((size, size), Image.LANCZOS)
    return mask


def circle_mask(size: int) -> Image.Image:
    mask = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse((0, 0, size - 1, size - 1), fill=255)
    return mask


def legacy_squircle(size: int) -> Image.Image:
    img = composite_full(size)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(img, mask=squircle_mask(size))
    return out


def legacy_round(size: int) -> Image.Image:
    img = composite_full(size)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(img, mask=circle_mask(size))
    return out


# ---------------------------------------------------------------------------
# Splash
# ---------------------------------------------------------------------------

def draw_splash(width: int, height: int) -> Image.Image:
    """Splash: oxblood panel with a small centered cross + mandorla."""
    short = min(width, height)
    # Background — sample from a larger square, then crop to the splash aspect.
    s = max(width, height)
    bg = draw_background(s)
    # Crop centered to (width, height).
    cx, cy = s // 2, s // 2
    left = cx - width // 2
    top = cy - height // 2
    bg = bg.crop((left, top, left + width, top + height)).convert("RGBA")

    # Icon at ~30% of the short side, centered.
    icon_size = int(short * 0.30)
    icon = draw_foreground(icon_size)
    bg.paste(icon, ((width - icon_size) // 2, (height - icon_size) // 2), icon)
    return bg


# ---------------------------------------------------------------------------
# Driver
# ---------------------------------------------------------------------------

REPO = Path(__file__).resolve().parents[1]
RES = REPO / "android" / "app" / "src" / "main" / "res"
BUILD_OUT = REPO / "build" / "icons"

# Adaptive-icon foreground is 108dp; legacy launcher is 48dp.
ADAPTIVE_SIZES = {
    "mipmap-mdpi": 108,
    "mipmap-hdpi": 162,
    "mipmap-xhdpi": 216,
    "mipmap-xxhdpi": 324,
    "mipmap-xxxhdpi": 432,
}
LEGACY_SIZES = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192,
}


def main():
    BUILD_OUT.mkdir(parents=True, exist_ok=True)

    # Reference master at high resolution (also serves as Play Store icon).
    print("Rendering 1024 reference …")
    master = composite_full(1024)
    master.save(BUILD_OUT / "ic_launcher_play_store_1024.png")
    master.resize((512, 512), Image.LANCZOS).save(BUILD_OUT / "ic_launcher_play_store_512.png")

    # Adaptive foreground + background at all densities.
    for folder, size in ADAPTIVE_SIZES.items():
        out_dir = RES / folder
        out_dir.mkdir(parents=True, exist_ok=True)
        print(f"  fg/bg @ {folder} ({size}px)")
        draw_foreground(size).save(out_dir / "ic_launcher_foreground.png")
        draw_background(size).save(out_dir / "ic_launcher_background.png")

    # Legacy square + round at all densities.
    for folder, size in LEGACY_SIZES.items():
        out_dir = RES / folder
        out_dir.mkdir(parents=True, exist_ok=True)
        print(f"  legacy @ {folder} ({size}px)")
        legacy_squircle(size).save(out_dir / "ic_launcher.png")
        legacy_round(size).save(out_dir / "ic_launcher_round.png")

    # Splash screens.
    splash_specs = [
        ("drawable", 480, 320),       # default placeholder, treat as landscape mdpi
        ("drawable-port-mdpi", 320, 480),
        ("drawable-port-hdpi", 480, 800),
        ("drawable-port-xhdpi", 720, 1280),
        ("drawable-port-xxhdpi", 960, 1600),
        ("drawable-port-xxxhdpi", 1280, 1920),
        ("drawable-land-mdpi", 480, 320),
        ("drawable-land-hdpi", 800, 480),
        ("drawable-land-xhdpi", 1280, 720),
        ("drawable-land-xxhdpi", 1600, 960),
        ("drawable-land-xxxhdpi", 1920, 1280),
    ]
    for folder, w, h in splash_specs:
        out_dir = RES / folder
        out_dir.mkdir(parents=True, exist_ok=True)
        print(f"  splash @ {folder} ({w}x{h})")
        draw_splash(w, h).save(out_dir / "splash.png")

    print("Done.")


if __name__ == "__main__":
    main()
