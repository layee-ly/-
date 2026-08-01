from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageFile


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
OUTPUT = PUBLIC / "optimized"
SUPPORTED = {".jpg", ".jpeg", ".png"}

Image.MAX_IMAGE_PIXELS = None
ImageFile.LOAD_TRUNCATED_IMAGES = True


def output_path(source: Path) -> Path:
    return OUTPUT / source.relative_to(PUBLIC).with_suffix(".webp")


def resize_for_web(image: Image.Image, source: Path) -> Image.Image:
    if source == PUBLIC / "images" / "homepage-background.jpg":
        max_width = 4400
        scale = min(1, max_width / image.width)
    if source.is_relative_to(PUBLIC / "images"):
        if source != PUBLIC / "images" / "homepage-background.jpg":
            max_dimension = 2400
            scale = min(1, max_dimension / max(image.size))
    else:
        max_width = 2800
        scale = min(1, max_width / image.width)

    if scale == 1:
        return image

    size = (max(1, round(image.width * scale)), max(1, round(image.height * scale)))
    return image.resize(size, Image.Resampling.LANCZOS)


def optimize(source: Path) -> tuple[int, int]:
    target = output_path(source)
    target.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(source) as original:
        original.load()
        image = resize_for_web(original, source)
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGBA" if "transparency" in image.info else "RGB")

        if source == PUBLIC / "images" / "homepage-background.jpg":
            image.save(target, "WEBP", lossless=True, method=6)
        else:
            quality = 88 if source.is_relative_to(PUBLIC / "images") else 90
            image.save(target, "WEBP", quality=quality, method=4)

    return source.stat().st_size, target.stat().st_size


def main() -> int:
    sources = sorted(
        path
        for path in PUBLIC.rglob("*")
        if path.is_file()
        and path.suffix.lower() in SUPPORTED
        and not path.is_relative_to(OUTPUT)
    )

    before = 0
    after = 0
    for index, source in enumerate(sources, start=1):
        source_size, target_size = optimize(source)
        before += source_size
        after += target_size
        print(
            f"[{index:03}/{len(sources):03}] {source.relative_to(PUBLIC)} "
            f"{source_size / 1024 / 1024:.2f} -> {target_size / 1024 / 1024:.2f} MiB",
            flush=True,
        )

    reduction = 0 if before == 0 else (1 - after / before) * 100
    print(
        f"Optimized {len(sources)} images: {before / 1024 / 1024:.2f} -> "
        f"{after / 1024 / 1024:.2f} MiB ({reduction:.1f}% smaller)",
        flush=True,
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
