// JavaScript for Ofek Loya Professional Website

document.addEventListener('DOMContentLoaded', function() {
    // Add js-enabled class for progressive enhancement
    document.documentElement.classList.add('js-enabled');

    // Initialize all functionality
    initNavigation();
    initParticleBackground();
    initTypedAnimation();
    initScrollAnimations();
    initSkillBars();
    initTestimonialCarousel();
    initContactForm();
    initMobileMenu();
    updateBusinessMonths();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            const menuToggle = document.querySelector('.menu-toggle');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                setTimeout(() => {
                    document.body.classList.remove('menu-open');
                }, 150);
            }
        });
    });

    // Active section highlighting
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveNavigation(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    function updateActiveNavigation(activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }
}

// Particle background animation
function initParticleBackground() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        };
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }

    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Wrap around screen
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });

        // Draw connections
        particles.forEach((particle, i) => {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particle.x - particles[j].x;
                const dy = particle.y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        animationId = requestAnimationFrame(animate);
    }

    function startAnimation() {
        resizeCanvas();
        initParticles();
        animate();
    }

    function stopAnimation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    }

    // Handle reduced motion preference
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        startAnimation();
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAnimation();
        } else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            startAnimation();
        }
    });
}

// Typed animation for hero section
function initTypedAnimation() {
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;

    const strings = [
        'AI Developer',
        'Company Founder',
        'Military Leader',
        'Full Stack Developer',
        'Tech Innovator'
    ];

    let currentStringIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typeSpeed = 50;

    function type() {
        const currentString = strings[currentStringIndex];

        if (isDeleting) {
            typedElement.textContent = currentString.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typeSpeed = 30;
        } else {
            typedElement.textContent = currentString.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typeSpeed = 50;
        }

        if (!isDeleting && currentCharIndex === currentString.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause before deleting
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentStringIndex = (currentStringIndex + 1) % strings.length;
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing animation
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        type();
    } else {
        typedElement.textContent = strings[0]; // Show first string statically
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Add animation classes to elements
    const elementsToAnimate = document.querySelectorAll('.section-header, .about-content, .timeline-item, .skill-category, .project-card, .testimonial-card, .contact-form-wrapper, .contact-info');

    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        animationObserver.observe(el);
    });
}

// Animated skill progress bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBar(entry.target);
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    function animateSkillBar(bar) {
        const progress = bar.dataset.progress;
        const progressFill = bar.querySelector('.progress-fill');

        let current = 0;
        const increment = progress / 100;
        const duration = 1500; // 1.5 seconds
        const stepTime = duration / (progress / increment);

        const timer = setInterval(() => {
            current += increment;
            progressFill.style.width = current + '%';

            if (current >= progress) {
                clearInterval(timer);
                progressFill.style.width = progress + '%';
            }
        }, stepTime);
    }
}

// Testimonial carousel
function initTestimonialCarousel() {
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    const totalCards = cards.length;

    function updateCarousel() {
        // Update cards
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Update track position
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Auto-advance carousel
    let autoAdvance = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(autoAdvance));
        carousel.addEventListener('mouseleave', () => {
            autoAdvance = setInterval(nextSlide, 5000);
        });
    }

    // Initialize
    updateCarousel();
}

// Multi-step contact form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const steps = form.querySelectorAll('.form-step');
    const nextBtn = form.querySelector('.next-step');
    const prevBtn = form.querySelector('.prev-step');
    const submitBtn = form.querySelector('.submit-form');

    let currentStep = 1;
    const totalSteps = steps.length;

    function updateFormProgress() {
        // Hide all steps
        steps.forEach(step => step.classList.remove('active'));

        // Show current step
        const currentStepElement = form.querySelector(`[data-step="${currentStep}"]`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }

        // Update button visibility
        prevBtn.style.display = currentStep > 1 ? 'block' : 'none';

        if (currentStep === totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }

    function validateCurrentStep() {
        const currentStepElement = form.querySelector(`[data-step="${currentStep}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        const radioGroups = currentStepElement.querySelectorAll('input[type="radio"]');

        let isValid = true;

        // Validate required fields
        requiredFields.forEach(field => {
            clearFieldError(field);
            if (!field.value.trim()) {
                showFieldError(field, 'This field is required');
                isValid = false;
            }
        });

        // Validate radio button groups
        if (currentStep === 1) {
            const serviceSelected = form.querySelector('input[name="service"]:checked');
            if (!serviceSelected) {
                showFormError('Please select a service option');
                isValid = false;
            }
        }

        return isValid;
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        field.style.borderColor = '#e53e3e';

        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#e53e3e';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }

    function clearFieldError(field) {
        field.classList.remove('error');
        field.style.borderColor = '';
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    function showFormError(message) {
        // Remove existing form error
        const existingError = form.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }

        // Add form error
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.style.color = '#e53e3e';
        errorElement.style.textAlign = 'center';
        errorElement.style.marginBottom = '1rem';
        errorElement.textContent = message;
        form.insertBefore(errorElement, form.firstChild);
    }

    function nextStep() {
        if (validateCurrentStep() && currentStep < totalSteps) {
            currentStep++;
            updateFormProgress();
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            updateFormProgress();
        }
    }

    function submitForm(e) {
        e.preventDefault();

        if (validateCurrentStep()) {
            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Show success message
            showSuccessMessage();

            // Log form data (in real implementation, send to server)
            console.log('Form submitted:', data);

            // Reset form
            form.reset();
            currentStep = 1;
            updateFormProgress();
        }
    }

    function showSuccessMessage() {
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.style.background = '#38a169';
        successElement.style.color = 'white';
        successElement.style.padding = '1rem';
        successElement.style.borderRadius = '8px';
        successElement.style.textAlign = 'center';
        successElement.style.marginBottom = '1rem';
        successElement.innerHTML = '✓ Thank you! Your message has been sent successfully.';

        form.insertBefore(successElement, form.firstChild);

        // Remove success message after 5 seconds
        setTimeout(() => {
            if (successElement.parentNode) {
                successElement.remove();
            }
        }, 5000);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextStep);
    if (prevBtn) prevBtn.addEventListener('click', prevStep);
    if (submitBtn) submitBtn.addEventListener('click', submitForm);

    // Clear errors on input
    form.addEventListener('input', function(e) {
        if (e.target.matches('input, textarea, select')) {
            clearFieldError(e.target);
        }
    });

    // Initialize form
    updateFormProgress();
}

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!menuToggle || !mobileMenu) return;

    function openMobileMenu() {
        // Add classes with slight delay to ensure smooth animation
        menuToggle.classList.add('active');
        document.body.classList.add('menu-open');

        // Use requestAnimationFrame to ensure DOM has updated
        requestAnimationFrame(() => {
            mobileMenu.classList.add('active');
        });
    }

    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');

        // Wait for transition to complete before removing body class
        setTimeout(() => {
            document.body.classList.remove('menu-open');
        }, 150); // Match --transition-fast duration
    }

    menuToggle.addEventListener('click', function() {
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Mobile menu close button functionality
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        if (mobileMenu.classList.contains('active')) {
            // Small delay to let orientation change complete
            setTimeout(() => {
                // Force reflow to ensure proper sizing
                mobileMenu.style.display = 'none';
                mobileMenu.offsetHeight; // Trigger reflow
                mobileMenu.style.display = 'flex';
            }, 100);
        }
    });
}

// Business duration calculator
function updateBusinessMonths() {
    var monthsElement = document.getElementById('months_working');
    if (!monthsElement) return;

    // Business start date: June 1, 2025
    var startDate = new Date(2025, 5, 1); // Month is 0-indexed, so 5 = June
    var currentDate = new Date();

    // Calculate the difference in months
    var yearDiff = currentDate.getFullYear() - startDate.getFullYear();
    var monthDiff = currentDate.getMonth() - startDate.getMonth();
    var totalMonths = yearDiff * 12 + monthDiff;

    // Handle edge case where current day is before start day in the month
    var dayAdjustment = currentDate.getDate() < startDate.getDate() ? -1 : 0;
    var finalMonths = Math.max(0, totalMonths + dayAdjustment);

    // Update the element content
    monthsElement.textContent = finalMonths + '+';
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Reinitialize particle background on resize
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}, 250));

// Handle reduced motion preference changes
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    if (e.matches) {
        // Disable animations
        document.documentElement.style.setProperty('--transition-normal', '0ms');
        document.documentElement.style.setProperty('--transition-slow', '0ms');
        document.documentElement.style.setProperty('--transition-fast', '0ms');
    } else {
        // Re-enable animations
        document.documentElement.style.removeProperty('--transition-normal');
        document.documentElement.style.removeProperty('--transition-slow');
        document.documentElement.style.removeProperty('--transition-fast');
    }
});

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if images with data-src exist
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    // Hide any loading spinners
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(el => el.style.display = 'none');
});