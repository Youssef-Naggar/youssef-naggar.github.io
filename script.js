// Master Interactive Script for Youssef Naggar Portfolio
// Star Wars Blue & Red Lightsaber Theme + 2D Interactive AI Engineering Canvas Engines

document.addEventListener('DOMContentLoaded', function() {
    initThemeManager();
    initProfileImageTilt();
    initWeatherWizardRAGCanvas();
    initEmailFraudStackingCanvas();
    initMicroGrad2DCanvas();
    initSmoothNavigation();
    initCollapsibleSections();
    initProjectImageGallery();
});

/* ==========================================================================
   THEME MANAGER (LIGHT / DARK MODE)
   ========================================================================== */
function initThemeManager() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const icon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
        if (icon) icon.className = 'fas fa-moon';
    } else {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
        if (icon) icon.className = 'fas fa-sun';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const isDark = document.body.classList.toggle('dark-mode');
            document.documentElement.classList.toggle('dark-mode', isDark);
            const themeVal = isDark ? 'dark' : 'light';
            localStorage.setItem('portfolio-theme', themeVal);

            if (icon) {
                icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            }

            // Trigger canvas updates across active visualizers
            if (window.updateRAGTheme) window.updateRAGTheme();
            if (window.updateFraudTheme) window.updateFraudTheme();
            if (window.updateMicroGradTheme) window.updateMicroGradTheme();
        });
    }
}

/* ==========================================================================
   PROJECT IMAGE LIGHTBOX GALLERY (FULLSCREEN ENLARGED VIEW + NEXT/PREV)
   ========================================================================== */
function initProjectImageGallery() {
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const closeBtn = document.getElementById('lightboxClose');
    const counter = document.getElementById('lightboxCounter');

    if (!modal || !modalImg) return;

    let currentGallery = [];
    let currentIndex = 0;

    // UltraTube Gallery Group
    const ultratubeSlides = document.querySelectorAll('.ultratube-carousel:not(.monster-gallery) .carousel-slide img');
    const ultratubeImgs = Array.from(ultratubeSlides).map(img => img.src);

    ultratubeSlides.forEach((img, idx) => {
        img.addEventListener('click', () => {
            openLightbox(ultratubeImgs, idx);
        });
    });

    // Monster Wrangler Gallery Group
    const monsterSlides = document.querySelectorAll('.monster-gallery .carousel-slide img');
    const monsterImgs = Array.from(monsterSlides).map(img => img.src);

    monsterSlides.forEach((img, idx) => {
        img.addEventListener('click', () => {
            openLightbox(monsterImgs, idx);
        });
    });

    function openLightbox(imagesList, index) {
        if (!imagesList || imagesList.length === 0) return;
        currentGallery = imagesList;
        currentIndex = index;
        updateModalContent();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateModalContent() {
        modalImg.src = currentGallery[currentIndex];
        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
        }
    }

    function showPrev() {
        if (currentGallery.length === 0) return;
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateModalContent();
    }

    function showNext() {
        if (currentGallery.length === 0) return;
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateModalContent();
    }

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLightbox();
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}

/* ==========================================================================
   COLLAPSIBLE SECTIONS (SHOW MORE / SHOW LESS)
   ========================================================================== */
function initCollapsibleSections() {
    window.toggleSection = function(hiddenId, btnId, moreText, lessText) {
        const hiddenEl = document.getElementById(hiddenId);
        const btn = document.getElementById(btnId);
        if (!hiddenEl || !btn) return;

        const isHidden = hiddenEl.style.display === 'none' || hiddenEl.style.display === '';

        if (isHidden) {
            hiddenEl.style.display = (hiddenId === 'projects-hidden') ? 'flex' : 'grid';
            btn.innerHTML = `<i class="fas fa-chevron-up"></i> ${lessText}`;
            
            // Trigger redraw on newly exposed canvas containers
            if (hiddenId === 'projects-hidden' && window.updateMicroGradTheme) {
                setTimeout(() => {
                    window.updateMicroGradTheme();
                }, 50);
            }
        } else {
            hiddenEl.style.display = 'none';
            btn.innerHTML = `<i class="fas fa-chevron-down"></i> ${moreText}`;
        }
    };
}

/* ==========================================================================
   COVER PORTRAIT 3D MOUSE TILT EFFECT
   ========================================================================== */
function initProfileImageTilt() {
    const profileContainer = document.querySelector('.profile-image-container');
    const profileImage = document.querySelector('.profile-image');

    if (!profileContainer || !profileImage) return;

    const maxRotation = 14;
    let isAnimating = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let raf;

    function handleMouseMove(e) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        if (!isAnimating) {
            isAnimating = true;
            raf = requestAnimationFrame(animateTransform);
        }
    }

    function animateTransform() {
        const rect = profileContainer.getBoundingClientRect();
        const mouseX = lastMouseX - rect.left - rect.width / 2;
        const mouseY = lastMouseY - rect.top - rect.height / 2;

        const rotateY = (mouseX / rect.width) * maxRotation * 2;
        const rotateX = -(mouseY / rect.height) * maxRotation * 2;

        profileImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        isAnimating = false;
    }

    function resetTransform() {
        isAnimating = false;
        cancelAnimationFrame(raf);
        profileImage.style.transition = 'transform 0.5s ease';
        profileImage.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        setTimeout(() => {
            profileImage.style.transition = '';
        }, 500);
    }

    profileContainer.addEventListener('mousemove', handleMouseMove);
    profileContainer.addEventListener('mouseleave', resetTransform);
}

/* ==========================================================================
   SMOOTH NAVIGATION WITH NAVBAR OFFSET
   ========================================================================== */
function initSmoothNavigation() {
    document.querySelectorAll('nav.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const nav = document.querySelector('nav.main-nav');
                    const navHeight = nav ? nav.offsetHeight : 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight - 16;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/* ==========================================================================
   1. WEATHER WIZARD 3000: 2D INTERACTIVE ANIMATED RAG PIPELINE
   ========================================================================== */
function initWeatherWizardRAGCanvas() {
    const container = document.getElementById('rag-canvas-container');
    const canvas = document.getElementById('ragCanvas');
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let animFrame;
    let particleOffset = 0;

    function resize() {
        width = container.clientWidth || (container.parentElement ? container.parentElement.clientWidth : 0) || 750;
        height = container.clientHeight || 380;
        if (width > 0) {
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
    }
    resize();
    window.addEventListener('resize', resize);

    function render() {
        if (!width || width === 0) {
            resize();
        }
        ctx.clearRect(0, 0, width, height);

        const isDark = document.body.classList.contains('dark-mode');
        const bluePrimary = isDark ? '#00d2ff' : '#0284c7';
        const redSecondary = isDark ? '#ef4444' : '#dc2626';
        
        const cardBg = isDark ? 'rgba(16, 23, 38, 0.9)' : 'rgba(255, 255, 255, 0.95)';
        const textMain = isDark ? '#f1f5f9' : '#0f172a';
        const textMuted = isDark ? '#94a3b8' : '#64748b';

        // Calm, smooth animation pacing
        particleOffset = (particleOffset + 0.004) % 1;

        const colWidth = Math.min(260, (width - 80) / 3);
        const colGap = (width - colWidth * 3) / 4;

        const subgraphs = [
            {
                title: '1. Multimodal Closet Synthesizer',
                color: bluePrimary,
                x: colGap,
                y: 30,
                w: colWidth,
                h: height - 60,
                nodes: [
                    { label: 'Closet Photos (closet/)', sub: 'Input Assets' },
                    { label: 'synthesizer.py', sub: 'Multimodal Vision LLM' },
                    { label: 'closet.json', sub: 'Structured Inventory' }
                ]
            },
            {
                title: '2. Grounded LLM Weather Wizard',
                color: redSecondary,
                x: colGap * 2 + colWidth,
                y: 30,
                w: colWidth,
                h: height - 60,
                nodes: [
                    { label: 'OpenWeatherMap API', sub: '5-Day Forecast' },
                    { label: 'weather_filter.py + prompt_builder.py', sub: 'Seasonality Target' },
                    { label: 'brain.py (LiteLLM)', sub: 'Grounded Outfit IDs' }
                ]
            },
            {
                title: '3. Virtual Avatar Drawer AI',
                color: bluePrimary,
                x: colGap * 3 + colWidth * 2,
                y: 30,
                w: colWidth,
                h: height - 60,
                nodes: [
                    { label: 'User Avatar + Garments', sub: 'Multi-Image Request' },
                    { label: 'drawer.py Engine', sub: 'Drawer AI Model' },
                    { label: 'tryon_outfit.png', sub: 'Rendered Visual Demo' }
                ]
            }
        ];

        subgraphs.forEach((sg, idx) => {
            ctx.fillStyle = isDark ? 'rgba(12, 18, 30, 0.6)' : 'rgba(241, 245, 249, 0.8)';
            ctx.strokeStyle = sg.color;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.roundRect(sg.x, sg.y, sg.w, sg.h, 12);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = sg.color;
            ctx.font = 'bold 11px Outfit, sans-serif';
            ctx.fillText(sg.title, sg.x + 12, sg.y + 24);

            const nodeH = 48;
            const nodeSpacing = (sg.h - 60 - nodeH * 3) / 2;

            sg.nodes.forEach((n, nIdx) => {
                const nx = sg.x + 12;
                const ny = sg.y + 42 + nIdx * (nodeH + nodeSpacing);
                const nw = sg.w - 24;

                ctx.fillStyle = cardBg;
                ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect(nx, ny, nw, nodeH, 8);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = textMain;
                ctx.font = 'bold 11px Inter, sans-serif';
                ctx.fillText(n.label, nx + 10, ny + 20);

                ctx.fillStyle = textMuted;
                ctx.font = '10px Fira Code, monospace';
                ctx.fillText(n.sub, nx + 10, ny + 36);

                if (nIdx < 2) {
                    const fromY = ny + nodeH;
                    const toY = fromY + nodeSpacing;
                    const midX = nx + nw / 2;

                    ctx.strokeStyle = sg.color;
                    ctx.lineWidth = 1.5;
                    ctx.setLineDash([4, 3]);
                    ctx.beginPath();
                    ctx.moveTo(midX, fromY);
                    ctx.lineTo(midX, toY);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    const pY = fromY + ((particleOffset + nIdx * 0.33) % 1) * nodeSpacing;
                    ctx.fillStyle = sg.color;
                    ctx.beginPath();
                    ctx.arc(midX, pY, 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            if (idx < 2) {
                const nextSg = subgraphs[idx + 1];
                const startX = sg.x + sg.w;
                const endX = nextSg.x;
                const connectY = sg.y + sg.h / 2;

                ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(startX, connectY);
                ctx.lineTo(endX, connectY);
                ctx.stroke();

                const px = startX + particleOffset * (endX - startX);
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = sg.color;
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(px, connectY, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        });

        animFrame = requestAnimationFrame(render);
    }

    render();
    window.updateRAGTheme = resize;
}

/* ==========================================================================
   2. EMAIL FRAUD DETECTION: 2D ARCHITECTURE STREAM CANVAS
   High-Tech Circuit PCB Aesthetics, 5 Full Stages, and Dynamic PR-Threshold Curve
   ========================================================================== */
function initEmailFraudStackingCanvas() {
    const container = document.getElementById('fraud-canvas-container');
    const canvas = document.getElementById('fraudCanvas');
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let animFrame;
    let flowProgress = 0;

    function resize() {
        width = container.clientWidth || (container.parentElement ? container.parentElement.clientWidth : 0) || 750;
        height = container.clientHeight || 480;
        if (width > 0) {
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
    }
    resize();
    window.addEventListener('resize', resize);

    // Track mouse for hover card inspection
    let mousePos = { x: -100, y: -100 };
    container.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        mousePos.x = e.clientX - rect.left;
        mousePos.y = e.clientY - rect.top;
    });
    container.addEventListener('mouseleave', function() {
        mousePos.x = -100;
        mousePos.y = -100;
    });

    // Draw background PCB Circuit Board Traces
    function drawCircuitBackground(isDark, blueCol, redCol) {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = isDark ? 'rgba(0, 210, 255, 0.07)' : 'rgba(2, 132, 199, 0.06)';
        
        // Horizontal & diagonal bus traces
        const busLines = [
            { y: 38, x1: 20, x2: width - 20 },
            { y: 76, x1: 50, x2: width - 50 },
            { y: height - 55, x1: 30, x2: width - 30 },
            { y: height - 22, x1: 20, x2: width - 20 }
        ];

        busLines.forEach(l => {
            ctx.beginPath();
            ctx.moveTo(l.x1, l.y);
            ctx.lineTo(l.x2, l.y);
            ctx.stroke();

            // Circuit junction dots
            for (let j = l.x1 + 40; j < l.x2; j += 120) {
                ctx.fillStyle = isDark ? 'rgba(0, 210, 255, 0.25)' : 'rgba(2, 132, 199, 0.15)';
                ctx.beginPath();
                ctx.arc(j, l.y, 2.5, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // 45-degree angle trace branches
        const diagBranches = [
            { x: 90, y: 38, dx: 30, dy: 30 },
            { x: width - 140, y: height - 55, dx: 35, dy: -35 },
            { x: width * 0.44, y: 76, dx: 45, dy: 35 },
            { x: width * 0.66, y: height - 22, dx: -30, dy: -30 }
        ];

        diagBranches.forEach(b => {
            ctx.beginPath();
            ctx.moveTo(b.x, b.y);
            ctx.lineTo(b.x + b.dx, b.y + b.dy);
            ctx.stroke();
            ctx.fillStyle = isDark ? 'rgba(0, 210, 255, 0.35)' : 'rgba(2, 132, 199, 0.25)';
            ctx.beginPath();
            ctx.arc(b.x + b.dx, b.y + b.dy, 2, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();
    }

    // Draw glowing curved connector path with traveling photon particles
    function drawCurvedConnector(x1, y1, x2, y2, color, label, progress, isHighlighted) {
        ctx.save();
        ctx.strokeStyle = isHighlighted ? '#ffffff' : color;
        ctx.lineWidth = isHighlighted ? 2.5 : 1.6;
        ctx.shadowColor = color;
        ctx.shadowBlur = isHighlighted ? 12 : 5;

        const midX = (x1 + x2) / 2;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.bezierCurveTo(midX, y1, midX, y2, x2, y2);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Particle pulse
        const t = (progress) % 1;
        const cx1 = midX, cy1 = y1, cx2 = midX, cy2 = y2;
        const px = Math.pow(1 - t, 3) * x1 + 3 * Math.pow(1 - t, 2) * t * cx1 + 3 * (1 - t) * Math.pow(t, 2) * cx2 + Math.pow(t, 3) * x2;
        const py = Math.pow(1 - t, 3) * y1 + 3 * Math.pow(1 - t, 2) * t * cy1 + 3 * (1 - t) * Math.pow(t, 2) * cx2 + Math.pow(t, 3) * y2;

        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, isHighlighted ? 4 : 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (label) {
            ctx.fillStyle = color;
            ctx.font = 'bold 8.5px Fira Code, monospace';
            ctx.fillText(label, midX - 25, (y1 + y2) / 2 - 6);
        }
        ctx.restore();
    }

    // Main Render Loop
    function render() {
        if (!width || width === 0) {
            resize();
        }
        ctx.clearRect(0, 0, width, height);

        const isDark = document.body.classList.contains('dark-mode');
        const bluePrimary = isDark ? '#00d2ff' : '#0284c7';
        const redSecondary = isDark ? '#ef4444' : '#dc2626';
        const greenSuccess = '#10b981';

        // Cards have a sleek dark background in Dark Mode matching the reference aesthetic
        const cardBg = isDark ? 'rgba(12, 19, 34, 0.95)' : 'rgba(255, 255, 255, 0.96)';
        const cardInnerBg = isDark ? 'rgba(16, 26, 46, 0.95)' : 'rgba(241, 245, 249, 0.9)';
        const textMain = isDark ? '#f8fafc' : '#0f172a';
        const textMuted = isDark ? '#94a3b8' : '#64748b';
        const textDim = isDark ? '#64748b' : '#94a3b8';

        // Slower, smooth flow pacing
        flowProgress = (flowProgress + 0.003) % 1;

        // Draw Circuit Board Ambience
        drawCircuitBackground(isDark, bluePrimary, redSecondary);

        // Layout Dimensions (5 Stages)
        const stageMargin = 16;
        const totalAvailW = width - stageMargin * 2;
        const stageW = Math.max(150, Math.min(220, (totalAvailW - 48) / 5));
        const stageGap = (totalAvailW - stageW * 5) / 4;

        const headerY = 26;
        const contentTopY = 50;
        const contentHeight = height - contentTopY - 42;

        // Stage 1 to 5 Positions
        const s1X = stageMargin;
        const s2X = s1X + stageW + stageGap;
        const s3X = s2X + stageW + stageGap;
        const s4X = s3X + stageW + stageGap;
        const s5X = s4X + stageW + stageGap;

        // Stage Top Headers
        const headers = [
            { text: 'Stage 1 - Input Layer', x: s1X + stageW / 2 },
            { text: 'Stage 2 - Feature & Representation Layer', x: s2X + stageW / 2 },
            { text: 'Stage 3 - Tri-Stream Level-1 GBDT Models', x: s3X + stageW / 2 },
            { text: 'Stage 4 - Level-2 Stacking Meta-Learner', x: s4X + stageW / 2 },
            { text: 'Stage 5 - Output & Calibrated Decision', x: s5X + stageW / 2 }
        ];

        headers.forEach(h => {
            ctx.fillStyle = textMuted;
            ctx.font = '600 10px Outfit, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(h.text, h.x, headerY);
        });
        ctx.textAlign = 'left';

        // -------------------------------------------------------------
        // STAGE 1: INPUT LAYER CARD
        // -------------------------------------------------------------
        const s1CardY = contentTopY + contentHeight * 0.22;
        const s1CardH = contentHeight * 0.52;
        const isS1Hover = mousePos.x >= s1X && mousePos.x <= s1X + stageW && mousePos.y >= s1CardY && mousePos.y <= s1CardY + s1CardH;

        ctx.save();
        ctx.fillStyle = cardBg;
        ctx.strokeStyle = isS1Hover ? '#ffffff' : bluePrimary;
        ctx.lineWidth = isS1Hover ? 2 : 1.5;
        if (isS1Hover) { ctx.shadowColor = bluePrimary; ctx.shadowBlur = 15; }
        ctx.beginPath();
        ctx.roundRect(s1X, s1CardY, stageW, s1CardH, 12);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Stage 1 Icon (Envelope Stack)
        const iconCenterX = s1X + stageW / 2;
        const iconCenterY = s1CardY + 38;
        ctx.strokeStyle = bluePrimary;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(iconCenterX - 22, iconCenterY - 14, 44, 26);
        ctx.fillStyle = cardInnerBg;
        ctx.fillRect(iconCenterX - 18, iconCenterY - 6, 36, 24);
        ctx.strokeRect(iconCenterX - 18, iconCenterY - 6, 36, 24);
        ctx.beginPath();
        ctx.moveTo(iconCenterX - 18, iconCenterY - 6);
        ctx.lineTo(iconCenterX, iconCenterY + 5);
        ctx.lineTo(iconCenterX + 18, iconCenterY - 6);
        ctx.stroke();

        // Stage 1 Text Content
        ctx.fillStyle = textMain;
        ctx.font = 'bold 12px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('447K Raw', iconCenterX, s1CardY + 88);
        ctx.fillText('Enron Emails', iconCenterX, s1CardY + 104);

        ctx.fillStyle = bluePrimary;
        ctx.font = '8.5px Fira Code, monospace';
        ctx.fillText('(192:1 Class Imbalance,', iconCenterX, s1CardY + 126);
        ctx.fillText('Text + Metadata)', iconCenterX, s1CardY + 140);
        ctx.textAlign = 'left';

        // -------------------------------------------------------------
        // STAGE 2: FEATURE & REPRESENTATION LAYER (2 SUB-CARDS)
        // -------------------------------------------------------------
        const s2GroupY = contentTopY + 8;
        const s2GroupH = contentHeight - 16;

        ctx.fillStyle = isDark ? 'rgba(10, 15, 26, 0.45)' : 'rgba(241, 245, 249, 0.5)';
        ctx.strokeStyle = isDark ? 'rgba(0, 210, 255, 0.25)' : 'rgba(2, 132, 199, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(s2X, s2GroupY, stageW, s2GroupH, 12);
        ctx.fill();
        ctx.stroke();

        // Card 2A: PyTorch Deep Autoencoder
        const c2AY = s2GroupY + 12;
        const c2AH = (s2GroupH - 34) / 2;
        const is2AHover = mousePos.x >= s2X + 8 && mousePos.x <= s2X + stageW - 8 && mousePos.y >= c2AY && mousePos.y <= c2AY + c2AH;

        ctx.save();
        ctx.fillStyle = cardBg;
        ctx.strokeStyle = is2AHover ? '#ffffff' : bluePrimary;
        ctx.lineWidth = is2AHover ? 2 : 1.3;
        if (is2AHover) { ctx.shadowColor = bluePrimary; ctx.shadowBlur = 12; }
        ctx.beginPath();
        ctx.roundRect(s2X + 8, c2AY, stageW - 16, c2AH, 9);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Autoencoder Neural Network Mini-Graphic
        const nnX = s2X + 22;
        const nnY = c2AY + 22;
        ctx.strokeStyle = bluePrimary;
        ctx.fillStyle = bluePrimary;
        ctx.lineWidth = 1;
        const nCoords = [[nnX, nnY - 8], [nnX, nnY + 8], [nnX + 16, nnY], [nnX + 32, nnY - 8], [nnX + 32, nnY + 8]];
        nCoords.forEach(c => { ctx.beginPath(); ctx.arc(c[0], c[1], 2.5, 0, Math.PI * 2); ctx.fill(); });
        ctx.beginPath();
        ctx.moveTo(nnX, nnY - 8); ctx.lineTo(nnX + 16, nnY); ctx.lineTo(nnX + 32, nnY - 8);
        ctx.moveTo(nnX, nnY + 8); ctx.lineTo(nnX + 16, nnY); ctx.lineTo(nnX + 32, nnY + 8);
        ctx.stroke();

        ctx.fillStyle = bluePrimary;
        ctx.font = 'bold 10.5px Outfit, sans-serif';
        ctx.fillText('PyTorch Deep', s2X + 64, c2AY + 18);
        ctx.fillText('Autoencoder', s2X + 64, c2AY + 32);

        ctx.fillStyle = textMuted;
        ctx.font = '8px Fira Code, monospace';
        ctx.fillText('(384-d MiniLM -> 64-d', s2X + 16, c2AY + 52);
        ctx.fillText('Latents + Anomaly MSE)', s2X + 16, c2AY + 65);

        // Card 2B: Head-Tail Text Extraction & 12 Domain Features
        const c2BY = c2AY + c2AH + 10;
        const c2BH = c2AH;
        const is2BHover = mousePos.x >= s2X + 8 && mousePos.x <= s2X + stageW - 8 && mousePos.y >= c2BY && mousePos.y <= c2BY + c2BH;

        ctx.save();
        ctx.fillStyle = cardBg;
        ctx.strokeStyle = is2BHover ? '#ffffff' : redSecondary;
        ctx.lineWidth = is2BHover ? 2 : 1.3;
        if (is2BHover) { ctx.shadowColor = redSecondary; ctx.shadowBlur = 12; }
        ctx.beginPath();
        ctx.roundRect(s2X + 8, c2BY, stageW - 16, c2BH, 9);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = redSecondary;
        ctx.font = 'bold 10px Outfit, sans-serif';
        ctx.fillText('Head-Tail Text Extraction', s2X + 16, c2BY + 20);
        ctx.fillText('& 12 Domain Features', s2X + 16, c2BY + 33);

        ctx.fillStyle = textMuted;
        ctx.font = '8px Fira Code, monospace';
        ctx.fillText('(VADER Polarity,', s2X + 16, c2BY + 52);
        ctx.fillText('Stylometry, Velocity)', s2X + 16, c2BY + 65);

        // -------------------------------------------------------------
        // STAGE 3: TRI-STREAM LEVEL-1 GBDT MODELS (3 STREAM CARDS)
        // -------------------------------------------------------------
        const s3GroupY = contentTopY + 8;
        const s3GroupH = contentHeight - 16;

        ctx.fillStyle = isDark ? 'rgba(10, 15, 26, 0.45)' : 'rgba(241, 245, 249, 0.5)';
        ctx.strokeStyle = isDark ? 'rgba(0, 210, 255, 0.25)' : 'rgba(2, 132, 199, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(s3X, s3GroupY, stageW, s3GroupH, 12);
        ctx.fill();
        ctx.stroke();

        const streamCardH = (s3GroupH - 38) / 3;

        // Stream A: XGBoost
        const c3AY = s3GroupY + 9;
        const is3AHover = mousePos.x >= s3X + 8 && mousePos.x <= s3X + stageW - 8 && mousePos.y >= c3AY && mousePos.y <= c3AY + streamCardH;

        ctx.save();
        ctx.fillStyle = cardBg;
        ctx.strokeStyle = is3AHover ? '#ffffff' : bluePrimary;
        ctx.lineWidth = is3AHover ? 2 : 1.3;
        if (is3AHover) { ctx.shadowColor = bluePrimary; ctx.shadowBlur = 10; }
        ctx.beginPath();
        ctx.roundRect(s3X + 8, c3AY, stageW - 16, streamCardH, 8);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = textMain;
        ctx.font = 'bold 10px Outfit, sans-serif';
        ctx.fillText('Stream A: XGBoost', s3X + 16, c3AY + 17);
        ctx.fillStyle = bluePrimary;
        ctx.font = '8.5px Inter, sans-serif';
        ctx.fillText('(Semantic-Tabular Expert)', s3X + 16, c3AY + 29);
        ctx.fillStyle = textDim;
        ctx.font = '7.8px Fira Code, monospace';
        ctx.fillText('- 64d Compressed Dims', s3X + 16, c3AY + 43);
        ctx.fillText('- Tabular/Categorical', s3X + 16, c3AY + 54);

        // Stream B: CatBoost
        const c3BY = c3AY + streamCardH + 9;
        const is3BHover = mousePos.x >= s3X + 8 && mousePos.x <= s3X + stageW - 8 && mousePos.y >= c3BY && mousePos.y <= c3BY + streamCardH;

        ctx.save();
        ctx.fillStyle = cardBg;
        ctx.strokeStyle = is3BHover ? '#ffffff' : redSecondary;
        ctx.lineWidth = is3BHover ? 2 : 1.3;
        if (is3BHover) { ctx.shadowColor = redSecondary; ctx.shadowBlur = 10; }
        ctx.beginPath();
        ctx.roundRect(s3X + 8, c3BY, stageW - 16, streamCardH, 8);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = textMain;
        ctx.font = 'bold 10px Outfit, sans-serif';
        ctx.fillText('Stream B: CatBoost', s3X + 16, c3BY + 17);
        ctx.fillStyle = redSecondary;
        ctx.font = '8.5px Inter, sans-serif';
        ctx.fillText('(Lexical-Categorical Expert)', s3X + 16, c3BY + 29);
        ctx.fillStyle = textDim;
        ctx.font = '7.8px Fira Code, monospace';
        ctx.fillText('- TF-IDF Bi-Grams Dicts', s3X + 16, c3BY + 43);
        ctx.fillText('- Tabular/Categorical', s3X + 16, c3BY + 54);

        // Stream C: LightGBM
        const c3CY = c3BY + streamCardH + 9;
        const is3CHover = mousePos.x >= s3X + 8 && mousePos.x <= s3X + stageW - 8 && mousePos.y >= c3CY && mousePos.y <= c3CY + streamCardH;

        ctx.save();
        ctx.fillStyle = cardBg;
        ctx.strokeStyle = is3CHover ? '#ffffff' : bluePrimary;
        ctx.lineWidth = is3CHover ? 2 : 1.3;
        if (is3CHover) { ctx.shadowColor = bluePrimary; ctx.shadowBlur = 10; }
        ctx.beginPath();
        ctx.roundRect(s3X + 8, c3CY, stageW - 16, streamCardH, 8);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = textMain;
        ctx.font = 'bold 10px Outfit, sans-serif';
        ctx.fillText('Stream C: LightGBM', s3X + 16, c3CY + 17);
        ctx.fillStyle = bluePrimary;
        ctx.font = '8.5px Inter, sans-serif';
        ctx.fillText('(Dual-NLP Expert)', s3X + 16, c3CY + 29);
        ctx.fillStyle = textDim;
        ctx.font = '7.8px Fira Code, monospace';
        ctx.fillText('- TF-IDF Bi-Grams Dicts', s3X + 16, c3CY + 43);
        ctx.fillText('- 64d Compressed Dims', s3X + 16, c3CY + 54);

        // -------------------------------------------------------------
        // STAGE 4: LEVEL-2 STACKING META-LEARNER CARD
        // -------------------------------------------------------------
        const s4CardY = contentTopY + contentHeight * 0.24;
        const s4CardH = contentHeight * 0.48;
        const isS4Hover = mousePos.x >= s4X && mousePos.x <= s4X + stageW && mousePos.y >= s4CardY && mousePos.y <= s4CardY + s4CardH;

        ctx.save();
        ctx.fillStyle = cardBg;
        ctx.strokeStyle = isS4Hover ? '#ffffff' : bluePrimary;
        ctx.lineWidth = isS4Hover ? 2 : 1.5;
        if (isS4Hover) { ctx.shadowColor = bluePrimary; ctx.shadowBlur = 15; }
        ctx.beginPath();
        ctx.roundRect(s4X, s4CardY, stageW, s4CardH, 12);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = bluePrimary;
        ctx.font = 'bold 12px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('ElasticNet', s4X + stageW / 2, s4CardY + 34);
        ctx.fillText('Meta-Learner', s4X + stageW / 2, s4CardY + 50);

        ctx.fillStyle = textMuted;
        ctx.font = '8.5px Fira Code, monospace';
        ctx.fillText('(Logit Space Stacking', s4X + stageW / 2, s4CardY + 76);
        ctx.fillText('+ 12 Skip Features,', s4X + stageW / 2, s4CardY + 89);
        ctx.fillText('SAGA Solver)', s4X + stageW / 2, s4CardY + 102);
        ctx.textAlign = 'left';

        // -------------------------------------------------------------
        // STAGE 5: OUTPUT & CALIBRATED DECISION (PR-CURVE + METRICS)
        // -------------------------------------------------------------
        const s5CardY = contentTopY + 8;
        const s5CardH = contentHeight - 16;
        const isS5Hover = mousePos.x >= s5X && mousePos.x <= s5X + stageW && mousePos.y >= s5CardY && mousePos.y <= s5CardY + s5CardH;

        ctx.save();
        ctx.fillStyle = cardBg;
        ctx.strokeStyle = isS5Hover ? '#ffffff' : bluePrimary;
        ctx.lineWidth = isS5Hover ? 2 : 1.5;
        if (isS5Hover) {
            ctx.shadowColor = bluePrimary;
            ctx.shadowBlur = 15;
        }
        ctx.beginPath();
        ctx.roundRect(s5X, s5CardY, stageW, s5CardH, 12);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Mini PR-Curve Graph inside Stage 5
        const prGraphX = s5X + 18;
        const prGraphY = s5CardY + 16;
        const prGraphW = stageW - 36;
        const prGraphH = 80;

        // Axes
        ctx.strokeStyle = textDim;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(prGraphX, prGraphY);
        ctx.lineTo(prGraphX, prGraphY + prGraphH);
        ctx.lineTo(prGraphX + prGraphW, prGraphY + prGraphH);
        ctx.stroke();

        // PR Curve Line (smooth curved decay)
        ctx.strokeStyle = greenSuccess;
        ctx.lineWidth = 2;
        ctx.shadowColor = greenSuccess;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.moveTo(prGraphX, prGraphY + 6);
        ctx.bezierCurveTo(
            prGraphX + prGraphW * 0.65, prGraphY + 8,
            prGraphX + prGraphW * 0.85, prGraphY + 28,
            prGraphX + prGraphW, prGraphY + prGraphH - 4
        );
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Cutoff Marker on PR curve (tau* = 0.050)
        const markerX = prGraphX + prGraphW * 0.62;
        const markerY = prGraphY + 24;

        ctx.strokeStyle = redSecondary;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 2]);
        ctx.beginPath();
        ctx.moveTo(markerX, prGraphY);
        ctx.lineTo(markerX, prGraphY + prGraphH);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = redSecondary;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(markerX, markerY, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Stage 5 Text & Telemetry
        ctx.fillStyle = textMain;
        ctx.font = 'bold 10.5px Outfit, sans-serif';
        ctx.fillText(`Dynamic Threshold`, s5X + 14, s5CardY + 116);

        ctx.fillStyle = bluePrimary;
        ctx.font = 'bold 9.5px Fira Code, monospace';
        ctx.fillText(`(tau* = 0.050) ->`, s5X + 14, s5CardY + 130);

        ctx.fillStyle = textMain;
        ctx.font = 'bold 10px Fira Code, monospace';
        ctx.fillText(`F2-Score: 0.8842`, s5X + 14, s5CardY + 154);

        ctx.fillStyle = textMuted;
        ctx.font = '8.5px Fira Code, monospace';
        ctx.fillText(`• 90.5% Recall`, s5X + 14, s5CardY + 172);
        ctx.fillText(`• 80.8% Precision`, s5X + 14, s5CardY + 186);
        ctx.fillText(`• 0.999 ROC-AUC`, s5X + 14, s5CardY + 200);

        // -------------------------------------------------------------
        // CONNECTING TRACES & ANIMATED DATA FLOW PARTICLES
        // -------------------------------------------------------------

        // 1. Stage 1 -> Stage 2A & 2B
        const s1OutX = s1X + stageW;
        const s1OutY = s1CardY + s1CardH / 2;
        drawCurvedConnector(s1OutX, s1OutY, s2X + 8, c2AY + c2AH / 2, bluePrimary, '', flowProgress, isS1Hover || is2AHover);
        drawCurvedConnector(s1OutX, s1OutY, s2X + 8, c2BY + c2BH / 2, redSecondary, '', (flowProgress + 0.5) % 1, isS1Hover || is2BHover);

        // 2. Stage 2A (Autoencoder) -> Stage 3 (Stream A & Stream C)
        const s2AOutX = s2X + stageW - 8;
        const s2AOutY = c2AY + c2AH / 2;
        drawCurvedConnector(s2AOutX, s2AOutY, s3X + 8, c3AY + streamCardH / 2, bluePrimary, '', flowProgress, is2AHover || is3AHover);
        drawCurvedConnector(s2AOutX, s2AOutY, s3X + 8, c3CY + streamCardH / 2, bluePrimary, '', (flowProgress + 0.33) % 1, is2AHover || is3CHover);

        // 3. Stage 2B (Domain Features) -> Stage 3 (Stream A & Stream B)
        const s2BOutX = s2X + stageW - 8;
        const s2BOutY = c2BY + c2BH / 2;
        drawCurvedConnector(s2BOutX, s2BOutY, s3X + 8, c3AY + streamCardH * 0.75, bluePrimary, 'Tabular', (flowProgress + 0.2) % 1, is2BHover || is3AHover);
        drawCurvedConnector(s2BOutX, s2BOutY, s3X + 8, c3BY + streamCardH / 2, redSecondary, 'TF-IDF Text', (flowProgress + 0.6) % 1, is2BHover || is3BHover);

        // 4. Stage 3 (Streams A, B, C) -> Stage 4 (ElasticNet Meta-Learner)
        const s3OutX = s3X + stageW - 8;
        const s4InX = s4X;
        const s4InY = s4CardY + s4CardH / 2;
        drawCurvedConnector(s3OutX, c3AY + streamCardH / 2, s4InX, s4InY - 16, bluePrimary, '', flowProgress, is3AHover || isS4Hover);
        drawCurvedConnector(s3OutX, c3BY + streamCardH / 2, s4InX, s4InY, redSecondary, '', (flowProgress + 0.4) % 1, is3BHover || isS4Hover);
        drawCurvedConnector(s3OutX, c3CY + streamCardH / 2, s4InX, s4InY + 16, bluePrimary, '', (flowProgress + 0.7) % 1, is3CHover || isS4Hover);

        // 5. Skip Connection from Stage 2B to Stage 4 (Curved bottom bus line)
        const skipStartY = c2BY + c2BH;
        const skipStartX = s2X + stageW / 2;
        const skipEndY = s4CardY + s4CardH;
        const skipEndX = s4X + stageW / 2;
        const skipBusY = height - 16;

        ctx.save();
        ctx.strokeStyle = bluePrimary;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(skipStartX, skipStartY);
        ctx.lineTo(skipStartX, skipBusY);
        ctx.lineTo(skipEndX, skipBusY);
        ctx.lineTo(skipEndX, skipEndY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Skip connection animated packet
        const skipP = (flowProgress * 1.2) % 1;
        let skipPx, skipPy;
        if (skipP < 0.25) {
            skipPx = skipStartX;
            skipPy = skipStartY + (skipP / 0.25) * (skipBusY - skipStartY);
        } else if (skipP < 0.75) {
            skipPx = skipStartX + ((skipP - 0.25) / 0.5) * (skipEndX - skipStartX);
            skipPy = skipBusY;
        } else {
            skipPx = skipEndX;
            skipPy = skipBusY - ((skipP - 0.75) / 0.25) * (skipBusY - skipEndY);
        }
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = bluePrimary;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(skipPx, skipPy, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = bluePrimary;
        ctx.font = 'bold 8.5px Fira Code, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('skip connection (12 domain features)', (skipStartX + skipEndX) / 2, skipBusY - 6);
        ctx.textAlign = 'left';
        ctx.restore();

        // 6. Stage 4 -> Stage 5
        const s4OutX = s4X + stageW;
        const s4OutY = s4CardY + s4CardH / 2;
        const s5InX = s5X;
        const s5InY = s5CardY + s5CardH / 2;
        drawCurvedConnector(s4OutX, s4OutY, s5InX, s5InY, bluePrimary, '', flowProgress, isS4Hover || isS5Hover);

        animFrame = requestAnimationFrame(render);
    }

    render();
    window.updateFraudTheme = resize;
}

/* ==========================================================================
   3. MICROGRAD: 2D INTERACTIVE NEURAL NETWORK & BACKPROPAGATION ENGINE
   Forward Pass Activations, Backprop Derivatives Chain Rule
   ========================================================================== */
function initMicroGrad2DCanvas() {
    const container = document.getElementById('micrograd-canvas-container');
    const canvas = document.getElementById('microgradCanvas');
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0, height = 420;
    let animFrame;

    // Simulation & Mode State
    let forwardPulse = 0;
    let backpropPulse = 0;
    let isForwardRunning = false;
    let isBackpropRunning = false;
    let lossVal = 0.0412;

    // UI Elements
    const btnForward = document.getElementById('btn-mg-forward');
    const btnBackprop = document.getElementById('btn-mg-backprop');
    const telemetrySpan = document.getElementById('mg-telemetry-text');

    if (btnForward) {
        btnForward.addEventListener('click', function() {
            isForwardRunning = true;
            forwardPulse = 0;
            lossVal = (Math.random() * 0.03 + 0.02).toFixed(4);
            if (telemetrySpan) {
                telemetrySpan.innerHTML = `<span style="color: #00d2ff;">[FORWARD PASS]</span> Calculated a = &sigma;(Wx+b) | Loss L = ${lossVal}`;
            }
        });
    }

    if (btnBackprop) {
        btnBackprop.addEventListener('click', function() {
            isBackpropRunning = true;
            backpropPulse = 1;
            lossVal = (lossVal * 0.92).toFixed(4);
            if (telemetrySpan) {
                telemetrySpan.innerHTML = `<span style="color: #ef4444;">[BACKPROPAGATION]</span> Propagated &part;L/&part;w via Chain Rule | Updated Weights`;
            }
        });
    }

    function resize() {
        const measuredW = container.clientWidth;
        const parentW = container.parentElement ? container.parentElement.clientWidth : 0;
        width = measuredW > 0 ? measuredW : (parentW > 0 ? parentW - 40 : 750);
        height = container.clientHeight > 0 ? container.clientHeight : 420;

        if (width > 0) {
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
    }
    resize();
    window.addEventListener('resize', resize);

    // ResizeObserver ensures canvas re-measures and renders when #projects-hidden is shown
    if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.contentRect.width > 0) {
                    resize();
                }
            }
        });
        ro.observe(container);
    }

    // Mouse Tracking for Neuron Hover Inspector
    let mousePos = { x: -100, y: -100 };
    container.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        mousePos.x = e.clientX - rect.left;
        mousePos.y = e.clientY - rect.top;
    });
    container.addEventListener('mouseleave', function() {
        mousePos.x = -100;
        mousePos.y = -100;
    });

    // Multi-Layer Perceptron (MLP) Network Structure
    const layerSizes = [3, 4, 4, 2];
    const layerNames = ['Input Layer (x)', 'Hidden Layer 1 (h1)', 'Hidden Layer 2 (h2)', 'Output Layer (\u0177)'];

    function render() {
        if (!width || width === 0) {
            resize();
        }
        ctx.clearRect(0, 0, width, height);

        const isDark = document.body.classList.contains('dark-mode');
        const bluePrimary = isDark ? '#00d2ff' : '#0284c7';
        const redSecondary = isDark ? '#ef4444' : '#dc2626';
        const cardBg = isDark ? 'rgba(12, 18, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)';
        const textMain = isDark ? '#f8fafc' : '#0f172a';
        const textMuted = isDark ? '#94a3b8' : '#64748b';
        const textDim = isDark ? '#64748b' : '#94a3b8';

        // Calm, smooth propagation pacing
        if (isForwardRunning) {
            forwardPulse += 0.006;
            if (forwardPulse > 1) { isForwardRunning = false; forwardPulse = 0; }
        }

        if (isBackpropRunning) {
            backpropPulse -= 0.006;
            if (backpropPulse < 0) { isBackpropRunning = false; backpropPulse = 0; }
        }

        const availW = Math.max(300, width - 80);
        const layerGap = availW / (layerSizes.length - 1);
        const startX = 40;
        const nodeRadius = 18;

        // Compute exact Node positions
        const nodeCoordinates = [];
        layerSizes.forEach((size, lIdx) => {
            const x = startX + lIdx * layerGap;
            const colNodes = [];
            const totalH = (size - 1) * 62;
            const startY = (height - 60 - totalH) / 2 + 25;

            for (let i = 0; i < size; i++) {
                const y = startY + i * 62;
                colNodes.push({ x, y, layer: lIdx, index: i });
            }
            nodeCoordinates.push(colNodes);
        });

        // 1. Draw Synaptic Interconnection Lines
        for (let l = 0; l < nodeCoordinates.length - 1; l++) {
            const fromNodes = nodeCoordinates[l];
            const toNodes = nodeCoordinates[l + 1];

            fromNodes.forEach((fromN, fIdx) => {
                toNodes.forEach((toN, tIdx) => {
                    const weightSeed = Math.sin(l * 5 + fIdx * 3 + tIdx * 2);
                    const isPositiveWeight = weightSeed >= 0;

                    ctx.save();
                    ctx.strokeStyle = isDark ? (isPositiveWeight ? 'rgba(0, 210, 255, 0.18)' : 'rgba(239, 68, 68, 0.18)')
                                             : (isPositiveWeight ? 'rgba(2, 132, 199, 0.18)' : 'rgba(220, 38, 38, 0.18)');
                    ctx.lineWidth = Math.abs(weightSeed) * 2 + 0.8;
                    ctx.beginPath();
                    ctx.moveTo(fromN.x, fromN.y);
                    ctx.lineTo(toN.x, toN.y);
                    ctx.stroke();

                    // Forward Animated Pulses
                    if (isForwardRunning) {
                        const p = (forwardPulse * (nodeCoordinates.length - 1) - l);
                        if (p >= 0 && p <= 1) {
                            const px = fromN.x + p * (toN.x - fromN.x);
                            const py = fromN.y + p * (toN.y - fromN.y);
                            ctx.fillStyle = '#ffffff';
                            ctx.shadowColor = bluePrimary;
                            ctx.shadowBlur = 8;
                            ctx.beginPath();
                            ctx.arc(px, py, 3.5, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.shadowBlur = 0;
                        }
                    }

                    // Backprop Gradient Pulses
                    if (isBackpropRunning) {
                        const p = 1 - (backpropPulse * (nodeCoordinates.length - 1) - (nodeCoordinates.length - 2 - l));
                        if (p >= 0 && p <= 1) {
                            const px = toN.x - p * (toN.x - fromN.x);
                            const py = toN.y - p * (toN.y - fromN.y);
                            ctx.fillStyle = '#ffffff';
                            ctx.shadowColor = redSecondary;
                            ctx.shadowBlur = 10;
                            ctx.beginPath();
                            ctx.arc(px, py, 4, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.shadowBlur = 0;
                        }
                    }

                    ctx.restore();
                });
            });
        }

        // 2. Draw Layer Titles & Header Badges
        nodeCoordinates.forEach((colNodes, lIdx) => {
            const colX = colNodes[0].x;
            ctx.fillStyle = textMuted;
            ctx.font = 'bold 10px Outfit, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(layerNames[lIdx], colX, 26);
            ctx.textAlign = 'left';
        });

        // 3. Draw Neurons (Spheres / Discs with Activation Values)
        let hoveredNeuron = null;

        nodeCoordinates.forEach((colNodes, lIdx) => {
            colNodes.forEach((node, nIdx) => {
                const distToMouse = Math.hypot(mousePos.x - node.x, mousePos.y - node.y);
                const isHover = distToMouse <= nodeRadius + 4;
                if (isHover) hoveredNeuron = { ...node, lIdx, nIdx };

                const isBlueNode = lIdx % 2 === 0;
                const nodeColor = isBlueNode ? bluePrimary : redSecondary;

                ctx.save();
                ctx.fillStyle = cardBg;
                ctx.strokeStyle = isHover ? '#ffffff' : nodeColor;
                ctx.lineWidth = isHover ? 2.5 : 1.8;
                if (isHover) {
                    ctx.shadowColor = nodeColor;
                    ctx.shadowBlur = 16;
                }
                ctx.beginPath();
                ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = isBlueNode 
                    ? (isDark ? `rgba(0, 210, 255, 0.25)` : `rgba(2, 132, 199, 0.2)`)
                    : (isDark ? `rgba(239, 68, 68, 0.25)` : `rgba(220, 38, 38, 0.2)`);
                ctx.beginPath();
                ctx.arc(node.x, node.y, nodeRadius - 4, 0, Math.PI * 2);
                ctx.fill();

                let label = '';
                if (lIdx === 0) label = `x${nIdx + 1}`;
                else if (lIdx === 1) label = `h1.${nIdx + 1}`;
                else if (lIdx === 2) label = `h2.${nIdx + 1}`;
                else label = `\u0177${nIdx + 1}`;

                ctx.fillStyle = textMain;
                ctx.font = 'bold 9.5px Fira Code, monospace';
                ctx.textAlign = 'center';
                ctx.fillText(label, node.x, node.y + 3.5);
                ctx.textAlign = 'left';
                ctx.restore();
            });
        });

        // 4. Draw Neuron Hover Inspector Tooltip
        if (hoveredNeuron) {
            const hx = Math.min(width - 240, Math.max(20, hoveredNeuron.x - 110));
            const hy = hoveredNeuron.y > height - 120 ? hoveredNeuron.y - 100 : hoveredNeuron.y + 28;

            ctx.save();
            ctx.fillStyle = isDark ? 'rgba(6, 10, 18, 0.96)' : 'rgba(255, 255, 255, 0.98)';
            ctx.strokeStyle = bluePrimary;
            ctx.lineWidth = 1.5;
            ctx.shadowColor = 'rgba(0,0,0,0.6)';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.roundRect(hx, hy, 220, 75, 8);
            ctx.fill();
            ctx.stroke();
            ctx.shadowBlur = 0;

            const zVal = (Math.sin(hoveredNeuron.lIdx + hoveredNeuron.nIdx) * 1.5).toFixed(3);
            const aVal = Math.max(0, parseFloat(zVal)).toFixed(3);
            const bVal = (Math.cos(hoveredNeuron.nIdx) * 0.2).toFixed(3);
            const gradVal = (Math.sin(hoveredNeuron.nIdx * 4) * 0.04).toFixed(4);

            ctx.fillStyle = bluePrimary;
            ctx.font = 'bold 10px Outfit, sans-serif';
            ctx.fillText(`Neuron ${layerNames[hoveredNeuron.lIdx]} [Node ${hoveredNeuron.nIdx + 1}]`, hx + 10, hy + 18);

            ctx.fillStyle = textMain;
            ctx.font = '8.5px Fira Code, monospace';
            ctx.fillText(`z = Wx + b = ${zVal} | b = ${bVal}`, hx + 10, hy + 36);
            ctx.fillText(`a = ReLU(z) = ${aVal}`, hx + 10, hy + 50);

            ctx.fillStyle = redSecondary;
            ctx.fillText(`\u2207L (\u2202L/\u2202w) = ${gradVal}`, hx + 10, hy + 64);
            ctx.restore();
        }

        // Bottom Telemetry Bar inside canvas
        ctx.fillStyle = textDim;
        ctx.font = '9px Fira Code, monospace';
        ctx.fillText(`Matrix Calc: Pure Vectorized NumPy / CuPy | Chain Rule: \u2202L/\u2202w = \u2202L/\u2202a \u00B7 \u03C3'(z) \u00B7 x`, 24, height - 16);

        animFrame = requestAnimationFrame(render);
    }

    render();
    window.updateMicroGradTheme = resize;
}