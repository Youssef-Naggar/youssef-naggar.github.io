---
name: optimize-landingpage
description: >-
  A comprehensive, battle-tested checklist and engineering guide for AI coding agents
  to optimize landing pages and portfolios to score 90+ on Google PageSpeed Insights (Mobile & Desktop).
---

# 🚀 Landing Page Performance Optimization Skill (90+ PageSpeed Checklist)

This skill provides an actionable, step-by-step optimization manual for any AI coding agent to inspect, refactor, and tune a web landing page or portfolio to consistently achieve **90+ to 98+ on Google PageSpeed Insights (Mobile)**.

---

## 🎯 Target Core Web Vitals Benchmarks

| Metric | Target (Good / Green) | Focus Area |
| :--- | :--- | :--- |
| **First Contentful Paint (FCP)** | `< 1.8 s` | Early HTML/CSS delivery & font rendering |
| **Largest Contentful Paint (LCP)** | `< 2.5 s` (Ideal `< 1.8 s`) | Hero image compression, resizing & preloading |
| **Total Blocking Time (TBT)** | `< 200 ms` (Ideal `0 ms`) | Script deferral & removing heavy main-thread work |
| **Cumulative Layout Shift (CLS)** | `< 0.1` (Ideal `0.00`) | Explicit image dimensions & aspect ratios |
| **Total Critical Payload** | `< 250 KB` compressed | Zero unused web fonts, local SVG icons |

---

## 📋 The 6-Pillar Optimization Checklist

### 1. 🖼️ Hero Image & LCP Optimization (Largest Contentful Paint)
The Largest Contentful Paint is usually the hero image or primary banner. An unoptimized hero image is the #1 killer of mobile performance.

- [ ] **Convert format to modern WebP or AVIF**:
  - Never serve raw `.png` or high-res `.jpg` in the hero section.
  - Convert to `.webp` with quality 80–85% using tools like `cwebp` or Python `PIL`:
    ```python
    from PIL import Image
    im = Image.open("hero.jpg")
    im.save("hero.webp", "WEBP", quality=82, optimize=True)
    ```
- [ ] **Resize to exact rendered intrinsic dimensions**:
  - Never serve a 2000px or 420px image if the hero container renders at 354px on mobile.
  - Scale down image pixels to 1:1 or 2x retina max.
- [ ] **Preload with `fetchpriority="high"` in `<head>`**:
  ```html
  <!-- Preload Critical LCP Hero Image -->
  <link rel="preload" as="image" href="assets/profile-photo.webp" type="image/webp" fetchpriority="high">
  ```
- [ ] **Set `decoding="sync"` and explicit dimensions**:
  ```html
  <img src="assets/profile-photo.webp" 
       alt="Hero profile photo" 
       width="354" 
       height="354" 
       fetchpriority="high" 
       decoding="sync">
  ```
  *(Note: Never add `loading="lazy"` to the hero/LCP image! Lazy loading the hero delays paint).*

---

### 2. ⚡ Standalone SVG Icons (Ditch FontAwesome & Icon Fonts)
Icon font packages (FontAwesome, Material Icons, Glyphicons) force the browser to download hundreds of kilobytes of unused glyphs just to display a few icons.

- [ ] **Eliminate icon font stylesheets and font files**:
  - Remove `<link rel="stylesheet" href=".../fontawesome...css">`.
  - Delete unused `fa-solid.woff2`, `fa-brands.woff2`, etc. (saves 200 KB - 500 KB).
- [ ] **Download only required icons as SVG**:
  - Store individual `.svg` files in an `assets/icons/` directory.
  - Combine them into a single optimized SVG sprite (`assets/icons/icons.svg`):
    ```xml
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol id="icon-github" viewBox="0 0 496 512">
        <path d="..."/>
      </symbol>
      <symbol id="icon-envelope" viewBox="0 0 512 512">
        <path d="..."/>
      </symbol>
    </svg>
    ```
- [ ] **Replace `<i>` tags with `<svg><use>` elements**:
  ```html
  <!-- Old -->
  <i class="fab fa-github"></i>
  
  <!-- New: Ultra-fast SVG vector instance -->
  <svg class="svg-icon" aria-hidden="true">
    <use href="assets/icons/icons.svg#icon-github"></use>
  </svg>
  ```
- [ ] **Style `.svg-icon` with `currentColor` inheritance**:
  ```css
  .svg-icon {
      width: 1em;
      height: 1em;
      display: inline-block;
      vertical-align: -0.15em;
      fill: currentColor;
      flex-shrink: 0;
  }
  ```
  *This guarantees that icons instantly inherit link colors, theme tints, and hover animations without extra CSS.*

---

### 3. 🌐 Eliminate 3rd-Party CDNs & Self-Host Fonts Locally
Connecting to external origins (`fonts.googleapis.com`, `cdnjs.cloudflare.com`) introduces round-trip network delays (DNS lookup, TCP handshake, TLS negotiation) for every external domain.

- [ ] **Download Google Fonts locally as WOFF2**:
  - Download only the specific font subsets (Latin, Arabic, etc.) and weights needed (e.g., 400, 600, 700).
  - Place `.woff2` files in `assets/fonts/`.
- [ ] **Define local `@font-face` rules with `font-display: swap`**:
  ```css
  /* assets/fonts/fonts.css */
  @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-display: swap; /* Prevents invisible text flash (FOIT) */
      src: url('inter-400.woff2') format('woff2');
  }
  ```
- [ ] **Preload the primary heading font**:
  ```html
  <link rel="preload" href="assets/fonts/outfit-bold.woff2" as="font" type="font/woff2" crossorigin>
  ```
- [ ] **Purge all third-party stylesheet links**:
  - Ensure zero external `<link rel="stylesheet">` calls remain in the HTML `<head>`.

---

### 4. 💤 Non-Critical Asset Lazy Loading
Images below the fold (project screenshots, certificates, testimonials) should never compete for network bandwidth with the hero section.

- [ ] **Add `loading="lazy"` and `decoding="async"` to all below-the-fold media**:
  ```html
  <img src="assets/project-preview.webp" 
       alt="Project Screenshot" 
       width="400" 
       height="250" 
       loading="lazy" 
       decoding="async">
  ```
- [ ] **Convert all project & certificate thumbnails to WebP**:
  - Compress gallery and thumbnail images to `< 40 KB` each.
  - Defer high-resolution lightbox or full-screen previews until the user clicks on them.

---

### 5. 📐 Zero Layout Shift (CLS = 0.000)
Cumulative Layout Shift (CLS) measures visual stability. Shifting content frustrates users and triggers heavy Google PageSpeed penalties.

- [ ] **Always define explicit `width` and `height` attributes on every `<img>`**:
  - Even if CSS overrides the display size with responsive styles (`width: 100%; height: auto;`), HTML attributes allow modern browsers to calculate the aspect ratio instantly before downloading the image.
- [ ] **Reserve space for dynamic content**:
  - If components expand/collapse or dynamically load data, reserve CSS container dimensions or use CSS transitions instead of sudden DOM insertions.
- [ ] **Never inject DOM elements above existing content** after page load.

---

### 6. 📜 Script & Stylesheet Delivery
Ensure JavaScript and CSS never block initial page parsing.

- [ ] **Preload primary stylesheet**:
  ```html
  <link rel="preload" href="MyStyle.css" as="style">
  <link rel="stylesheet" href="MyStyle.css">
  ```
- [ ] **Always defer JavaScript**:
  ```html
  <!-- Placed before </body> with defer -->
  <script src="script.js" defer></script>
  ```
- [ ] **Keep scripts event-driven**:
  - Use `addEventListener('click')` and `IntersectionObserver` instead of continuous polling or background intervals.

---

## 🔍 Pre-Deployment Audit Command Runbook

Before deploying changes, an agent must execute the following checks:

### Step 1: Check for Remaining External CDN Links
```bash
# Verify 0 external stylesheet/script dependencies
grep -Ei "https?://(cdnjs|fonts\.googleapis|unpkg|cdn)" index.html
```
*(Should return empty / 0 matches)*.

### Step 2: Check for Unoptimized Legacy Images
```bash
# Verify all images are modern WebP or SVG
find assets/ -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \)
```
*(Should return no large unoptimized media)*.

### Step 3: Check for Missing Image Dimensions
```bash
# Check that all <img> tags have width and height
python -c "
import re
with open('index.html', 'r', encoding='utf-8') as f:
    imgs = re.findall(r'<img\b[^>]*>', f.read())
for img in imgs:
    if 'width=' not in img or 'height=' not in img:
        print('Missing dimensions:', img)
"
```

### Step 4: Check Total Critical Bundle Size
```bash
# Check critical files payload (index.html, styles, hero image, icons sprite)
python -c "
import os
critical_files = ['index.html', 'MyStyle.css', 'assets/profile-photo.webp', 'assets/icons/icons.svg', 'assets/fonts/fonts.css']
total = sum(os.path.getsize(f) for f in critical_files if os.path.exists(f))
print(f'Total critical path size: {total:,} bytes ({total/1024:.1f} KB)')
"
```
*(Target: Under 150 KB uncompressed)*.

---

## 🏆 Summary Checklist for Quick Agent Verification

| Check | Action | Verified? |
| :--- | :--- | :---: |
| 1. Hero LCP | Compressed to WebP, exact display dimensions, `preload` with `fetchpriority="high"` | [ ] |
| 2. SVG Icons | FontAwesome removed (~400KB saved), single SVG sprite with `<use>` tags | [ ] |
| 3. Self-Hosted Fonts | WOFF2 stored locally, `font-display: swap`, zero Google CDN calls | [ ] |
| 4. Lazy Loading | All below-the-fold `<img>` have `loading="lazy"` and `decoding="async"` | [ ] |
| 5. Zero CLS | All images have explicit `width` and `height` HTML attributes | [ ] |
| 6. Script Delivery | `<script src="..." defer>` at end of document, 0 render-blocking JS | [ ] |
