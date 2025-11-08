// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#6366f1', '#10b981', '#f59e0b', '#ef4444']
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#6366f1',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.3
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Update icon
    if (newTheme === 'dark') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
if (savedTheme === 'light') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Typewriter Effect
function initTypewriter() {
    const typeText = document.querySelector('.type-text');
    const cursor = document.querySelector('.type-cursor');
    const texts = [
        'Full Stack Developer',
        'Angular Specialist',
        'Node.js Developer',
        'Problem Solver',
        'Web Designer'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
        isEnd = false;
        const currentText = texts[textIndex];

        if (isDeleting) {
            typeText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex++;
            if (textIndex >= texts.length) textIndex = 0;
            setTimeout(type, 500);
        } else {
            const typeSpeed = isDeleting ? 100 : 150;
            const speed = isEnd ? 2000 : typeSpeed;
            setTimeout(type, speed);
        }
    }

    // Start typing after a delay
    setTimeout(type, 1000);
}

// Animated Counter
function initCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        
        const updateCount = () => {
            const currentCount = +counter.innerText;
            const increment = target / speed;

            if (currentCount < target) {
                counter.innerText = Math.ceil(currentCount + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

// Animate elements on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate skill bars
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Animate project cards with delay
                if (entry.target.classList.contains('projects')) {
                    animateProjectCards();
                }
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Animate Skill Bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        setTimeout(() => {
            bar.style.width = level + '%';
        }, 200);
    });
}

// Animate Project Cards with Stagger
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Project Details Modal
function initProjectModals() {
    const detailButtons = document.querySelectorAll('.btn-details');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('.project-title').textContent;
            const projectDescription = projectCard.querySelector('.project-description').textContent;
            const projectTech = projectCard.querySelector('.project-tech').innerHTML;
            
            showProjectModal(projectTitle, projectDescription, projectTech);
        });
    });
}

function showProjectModal(title, description, tech) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>${description}</p>
                <div class="modal-tech">
                    <h4>Technologies Used:</h4>
                    <div class="tech-tags">${tech}</div>
                </div>
                <div class="modal-features">
                    <h4>Key Features:</h4>
                    <ul>
                        <li>Responsive Design</li>
                        <li>User Authentication</li>
                        <li>Database Integration</li>
                        <li>RESTful APIs</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary">View Live Demo</button>
                <button class="btn btn-secondary">GitHub Repository</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add styles for modal if not already added
    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = `
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                backdrop-filter: blur(10px);
                padding: 1rem;
            }
            .modal-content {
                background: var(--card-bg);
                border: 1px solid var(--glass-border);
                border-radius: 20px;
                padding: 1.5rem;
                max-width: 500px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                backdrop-filter: blur(20px);
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                color: var(--gray);
                cursor: pointer;
                transition: var(--transition);
                line-height: 1;
            }
            .modal-close:hover {
                color: var(--danger);
            }
            .modal-body h4 {
                margin: 1.5rem 0 0.5rem 0;
                color: var(--primary);
            }
            .modal-features ul {
                list-style: none;
                padding-left: 1rem;
            }
            .modal-features li {
                margin-bottom: 0.5rem;
                position: relative;
            }
            .modal-features li:before {
                content: '✓';
                color: var(--secondary);
                font-weight: bold;
                position: absolute;
                left: -1rem;
            }
            .modal-footer {
                display: flex;
                gap: 1rem;
                margin-top: 2rem;
                flex-wrap: wrap;
            }
            .modal-footer .btn {
                flex: 1;
                justify-content: center;
                min-width: 120px;
            }
            @media (max-width: 480px) {
                .modal-content {
                    padding: 1rem;
                }
                .modal-footer {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Add escape key to close modal
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 100);
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[name="name"]').value;
        
        // Show loading state
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('span').textContent;
        
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';
        
        // Simulate form submission (replace with actual email service)
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.querySelector('i').className = 'fas fa-paper-plane';
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}-circle"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add notification styles if not exists
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--card-bg);
                border: 1px solid var(--glass-border);
                border-radius: 10px;
                padding: 1rem;
                display: flex;
                align-items: center;
                gap: 1rem;
                backdrop-filter: blur(20px);
                z-index: 3000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 400px;
                width: calc(100% - 40px);
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-success {
                border-left: 4px solid var(--secondary);
            }
            .notification-error {
                border-left: 4px solid var(--danger);
            }
            .notification-info {
                border-left: 4px solid var(--primary);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                flex: 1;
            }
            .notification-success i {
                color: var(--secondary);
            }
            .notification-error i {
                color: var(--danger);
            }
            .notification-info i {
                color: var(--primary);
            }
            .notification-close {
                background: none;
                border: none;
                color: var(--gray);
                cursor: pointer;
                font-size: 1.2rem;
                flex-shrink: 0;
            }
            @media (max-width: 768px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    width: auto;
                    transform: translateY(-100px);
                }
                .notification.show {
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    const removeNotification = setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(removeNotification);
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    document.body.appendChild(scrollBtn);
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
}

// Touch device optimizations
function initTouchOptimizations() {
    // Add touch-specific classes
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        document.body.classList.add('touch-device');
    }
    
    // Improve touch interactions
    document.querySelectorAll('.btn, .social-link, .nav-link').forEach(element => {
        element.style.cursor = 'pointer';
    });
}

// Performance optimizations
function initPerformance() {
    // Lazy load images (if any are added later)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTypewriter();
    initScrollAnimations();
    initProjectModals();
    initContactForm();
    initScrollToTop();
    initTouchOptimizations();
    initPerformance();
    
    // Initialize counter when skills section is in view
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initCounter();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Add CSS for animations
    const animationStyles = `
        .project-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .project-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .skill-progress {
            transition: width 1.5s ease-in-out;
        }
        section {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});

// Add hover effects for social links (only on non-touch devices)
if (!('ontouchstart' in window)) {
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}