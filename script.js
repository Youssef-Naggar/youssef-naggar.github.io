// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// 3D Bubble Effect for Profile Image
document.addEventListener('DOMContentLoaded', function() {
    const profileContainer = document.querySelector('.profile-image-container');
    const profileImage = document.getElementById('profile-image');
    
    // Check if elements exist
    if (!profileContainer || !profileImage) return;
    
    // Variables for the 3D effect
    const maxRotation = 15; // Maximum rotation in degrees
    const maxScale = 1.08; // Maximum scale factor
    const perspective = 800; // Perspective value for 3D effect
    let isAnimating = false; // Flag to track if animation is in progress
    let lastMouseX = 0;
    let lastMouseY = 0;
    let raf; // For requestAnimationFrame
    
    // Set initial styles
    profileContainer.style.perspective = `${perspective}px`;
    
    // Function to handle mouse movement with smoother animation
    function handleMouseMove(e) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        
        if (!isAnimating) {
            isAnimating = true;
            raf = requestAnimationFrame(animateTransform);
        }
    }
    
    // Function to animate the transformation smoothly
    function animateTransform() {
        // Get the position of the container
        const rect = profileContainer.getBoundingClientRect();
        
        // Calculate mouse position relative to the center of the container
        const mouseX = lastMouseX - rect.left - rect.width / 2;
        const mouseY = lastMouseY - rect.top - rect.height / 2;
        
        // Calculate rotation values based on mouse position
        const rotateY = (mouseX / rect.width) * maxRotation * 2;
        const rotateX = -(mouseY / rect.height) * maxRotation * 2;
        
        // Calculate distance from center (0-1)
        const distance = Math.min(1, Math.sqrt(mouseX**2 + mouseY**2) / (rect.width / 2));
        
        // Calculate scale based on distance from center (closer to center = more scale)
        const scale = 1 + ((1 - distance) * (maxScale - 1));
        
        // Apply transformations
        profileImage.style.transform = `
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(${scale})
        `;
        
        // Apply shadow based on rotation (simulates light source)
        const shadowX = -rotateY / 2;
        const shadowY = rotateX / 2;
        const shadowBlur = 20 + Math.abs(rotateX) + Math.abs(rotateY);
        profileImage.style.boxShadow = `
            ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.3),
            0 0 15px rgba(52, 152, 219, 0.2)
        `;
        
        // Create a subtle shine/reflection effect
        profileImage.style.backgroundImage = `
            radial-gradient(
                circle at ${50 + mouseX / rect.width * 40}% ${50 + mouseY / rect.height * 40}%, 
                rgba(255, 255, 255, 0.15), 
                rgba(255, 255, 255, 0) 70%
            )
        `;
        
        // Control the glow effect intensity
        profileContainer.style.setProperty('--glow-opacity', 0.5 - distance * 0.2);
        
        raf = requestAnimationFrame(animateTransform);
    }
    
    // Function to smoothly reset the transformations
    function resetTransform() {
        isAnimating = false;
        cancelAnimationFrame(raf);
        
        // Get current transform values for smooth transition
        const currentTransform = getComputedStyle(profileImage).transform;
        
        // Apply reset with transition
        profileImage.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease, background-image 0.5s ease';
        profileImage.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        profileImage.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        profileImage.style.backgroundImage = 'none';
        
        // Reset the glow effect
        profileContainer.style.setProperty('--glow-opacity', '0');
        
        // Remove transition after it completes
        setTimeout(() => {
            profileImage.style.transition = '';
        }, 500);
    }
    
    // Add event listeners
    profileContainer.addEventListener('mousemove', handleMouseMove);
    profileContainer.addEventListener('mouseleave', resetTransform);
    profileContainer.addEventListener('touchstart', function(e) {
        e.preventDefault(); // Prevent default touch behavior
        const touch = e.touches[0];
        lastMouseX = touch.clientX;
        lastMouseY = touch.clientY;
        if (!isAnimating) {
            isAnimating = true;
            raf = requestAnimationFrame(animateTransform);
        }
    });
    profileContainer.addEventListener('touchend', resetTransform);
    
    // Add a subtle floating animation when the page loads
    function floatingAnimation() {
        // Create a floating animation sequence
        profileImage.style.transition = 'transform 1.5s ease-in-out';
        
        // Animation sequence
        setTimeout(() => {
            profileImage.style.transform = 'translateY(-5px) rotateY(5deg) scale(1.02)';
            setTimeout(() => {
                profileImage.style.transform = 'translateY(3px) rotateX(3deg) rotateY(-2deg) scale(1.01)';
                setTimeout(() => {
                    profileImage.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
                    setTimeout(() => {
                        // Remove transition for mouse interactions
                        profileImage.style.transition = '';
                    }, 1500);
                }, 1500);
            }, 1500);
        }, 500);
    }
    
    // Start the floating animation
    floatingAnimation();
});

// 3D Bubble Effect for Profile Image
document.addEventListener('DOMContentLoaded', function() {
    const profileContainer = document.querySelector('.profile-image-container');
    const profileImage = document.getElementById('profile-image');
    
    // Check if elements exist
    if (!profileContainer || !profileImage) return;
    
    // Variables for the 3D effect
    const maxRotation = 10; // Maximum rotation in degrees
    const maxScale = 1.05; // Maximum scale factor
    const perspective = 800; // Perspective value for 3D effect
    
    // Set initial styles
    profileContainer.style.perspective = `${perspective}px`;
    
    // Function to handle mouse movement
    function handleMouseMove(e) {
        // Get the position of the container
        const rect = profileContainer.getBoundingClientRect();
        
        // Calculate mouse position relative to the center of the container
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        
        // Calculate rotation values based on mouse position
        const rotateY = (mouseX / rect.width) * maxRotation * 2;
        const rotateX = -(mouseY / rect.height) * maxRotation * 2;
        
        // Calculate distance from center (0-1)
        const distance = Math.min(1, Math.sqrt(mouseX**2 + mouseY**2) / (rect.width / 2));
        
        // Calculate scale based on distance from center
        const scale = 1 + ((1 - distance) * (maxScale - 1));
        
        // Apply transformations
        profileImage.style.transform = `
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(${scale})
        `;
        
        // Create a subtle shine/reflection effect
        const lightAngle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
        const lightDistance = distance * 100;
        profileImage.style.backgroundImage = `
            radial-gradient(
                circle at ${50 + mouseX / rect.width * 30}% ${50 + mouseY / rect.height * 30}%, 
                rgba(255, 255, 255, 0.1), 
                rgba(255, 255, 255, 0) 60%
            )
        `;
    }
    
    // Function to reset the transformations
    function resetTransform() {
        profileImage.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        profileImage.style.backgroundImage = 'none';
    }
    
    // Add event listeners
    profileContainer.addEventListener('mousemove', handleMouseMove);
    profileContainer.addEventListener('mouseleave', resetTransform);
    
    // Add a subtle animation when the page loads
    setTimeout(() => {
        profileImage.style.transform = 'rotateY(5deg) scale(1.02)';
        setTimeout(() => {
            profileImage.style.transform = 'rotateX(3deg) rotateY(-2deg) scale(1.01)';
            setTimeout(() => {
                profileImage.style.transform = 'rotateX(0) rotateY(0) scale(1)';
            }, 300);
        }, 300);
    }, 500);
});

// ===== Read More / Show More Toggle =====
function toggleSection(hiddenId, btnId) {
    var hidden = document.getElementById(hiddenId);
    var btn = document.getElementById(btnId);
    var isHidden = hidden.style.display === 'none' || hidden.style.display === '';

    if (isHidden) {
        hidden.style.display = hiddenId === 'certs-hidden' ? 'grid' : 'block';
        btn.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less';
    } else {
        hidden.style.display = 'none';
        if (hiddenId === 'projects-hidden') {
            btn.innerHTML = '<i class="fas fa-chevron-down"></i> Show More Projects';
        } else {
            btn.innerHTML = '<i class="fas fa-chevron-down"></i> Show More Certifications';
        }
    }
}