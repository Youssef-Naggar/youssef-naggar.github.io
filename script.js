// Master Interactive Script for Youssef Naggar Portfolio
// Star Wars Blue & Red Lightsaber Theme + Core Interactive Utilities

document.addEventListener('DOMContentLoaded', function() {
    initThemeManager();
    initProfileImageTilt();
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