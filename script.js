/* ============================================
   SKILL PROGRESS ANIMATION
   ============================================ */

/**
 * Animate circular progress indicators
 * Calculates stroke-dashoffset based on percentage value
 */
function animateSkillProgress() {
    const progressRings = document.querySelectorAll('.progress-ring-fill');

    progressRings.forEach(ring => {
        const percent = parseFloat(ring.getAttribute('data-percent'));
        const radius = ring.getAttribute('r');
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percent / 100) * circumference;

        ring.style.strokeDasharray = circumference;
        ring.style.strokeDashoffset = circumference;

        // Trigger animation on page load
        setTimeout(() => {
            ring.style.strokeDashoffset = offset;
        }, 100);
    });
}

/**
 * Intersection Observer for skill section
 * Animates skills when section comes into view
 */
function observeSkillsSection() {
    const skillsSection = document.querySelector('.skills');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillProgress();
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    observer.observe(skillsSection);
}

/* ============================================
   PORTFOLIO FILTERING
   ============================================ */

/**
 * Filter portfolio items by category
 * Shows/hides items based on selected filter
 */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInScale 0.5s ease';
                } else {
                    const category = item.getAttribute('data-category');
                    if (category === filterValue) {
                        item.classList.remove('hidden');
                        item.style.animation = 'fadeInScale 0.5s ease';
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });
}

/* ============================================
   SMOOTH SCROLLING & NAVIGATION
   ============================================ */

/**
 * Handle smooth scrolling for navigation links
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Don't prevent default for logo link
            if (href === '#home') {
                closeNavMenu();
            }

            // Close mobile menu after clicking
            if (window.innerWidth <= 768) {
                closeNavMenu();
            }
        });
    });
}

/* ============================================
   MOBILE NAVIGATION
   ============================================ */

/**
 * Toggle mobile navigation menu
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            closeNavMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            closeNavMenu();
        }
    });
}

/**
 * Close the navigation menu
 */
function closeNavMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

/* ============================================
   CONTACT FORM HANDLING
   ============================================ */

/**
 * Handle contact form submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Validate form
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            // Validate email
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show a success message
            showNotification(
                `Thank you ${name}! Your message has been received. We\'ll get back to you soon.`,
                'success'
            );

            // Reset form
            contactForm.reset();
        });
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show notification message
 */
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

/* ============================================
   ANIMATIONS
   ============================================ */

/**
 * Add keyframe animations to document
 */
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

/**
 * Animate elements on scroll using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const elementsToObserve = document.querySelectorAll(
        '.about-info, .stat-card, .info-card, .blog-card, .timeline-content'
    );

    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

/* ============================================
   ACTIVE NAVIGATION LINK
   ============================================ */

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ============================================
   ADD CSS FOR ACTIVE NAV LINK
   ============================================ */

/**
 * Add styling for active nav link
 */
function addActiveNavLinkStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--accent-gold);
        }

        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
}

/* ============================================
   STATS COUNTER
   ============================================ */

/**
 * Animate stat numbers when section comes into view
 */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const statsSection = document.querySelector('.about-stats');
    if (!statsSection) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statNumbers.forEach(number => {
                        const finalValue = parseFloat(number.textContent);
                        const increment = finalValue / 100;
                        let currentValue = 0;

                        const interval = setInterval(() => {
                            currentValue += increment;
                            if (currentValue >= finalValue) {
                                number.textContent = finalValue + (number.textContent.includes('+') ? '+' : '');
                                clearInterval(interval);
                            } else {
                                number.textContent = Math.floor(currentValue) + (number.textContent.includes('+') ? '+' : '');
                            }
                        }, 20);
                    });

                    statsAnimated = true;
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    observer.observe(statsSection);
}

/* ============================================
   INITIALIZATION
   ============================================ */

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Add animations to document
    addAnimationStyles();
    addActiveNavLinkStyles();

    // Initialize features
    initPortfolioFilter();
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initStatsCounter();
    observeSkillsSection();
    updateActiveNavLink();

    // Animate skills on page load if already in view
    const skillsSection = document.querySelector('.skills');
    if (skillsSection.getBoundingClientRect().top < window.innerHeight) {
        animateSkillProgress();
    }
});

/* ============================================
   UTILITY: DEBOUNCE FUNCTION
   ============================================ */

/**
 * Debounce function to limit function calls
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

/* ============================================
   RESPONSIVE HANDLER
   ============================================ */

/**
 * Handle window resize events
 */
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        closeNavMenu();
    }
}, 250));

/* ============================================
   PAGE LOAD COMPLETE
   ============================================ */

window.addEventListener('load', () => {
    // Trigger any animations that depend on images being loaded
    document.body.style.opacity = '1';
});
