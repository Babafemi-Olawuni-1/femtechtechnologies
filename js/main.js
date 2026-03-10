// main.js - FemTech Portfolio

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    // Hover effect on clickable elements
    document.querySelectorAll('a, button, .project-card, .btn, .tech-icon, .skill-icon').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('active');
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

// Typing Effect
const typedText = document.getElementById('typed-text');
if (typedText) {
    const phrases = [
        'build web solutions',
        'create websites',
        'develop for the web',
        'solve problems with code',
        'design digital experiences',
        'bring ideas to life',
        'code with passion'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }
    
    typeEffect();
}

// Counter animation
const counters = document.querySelectorAll('.stat-number');

const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const currentText = counter.innerText.replace('+', '').replace('%', '');
    let current = parseInt(currentText) || 0;
    
    if (current < target) {
        const increment = Math.ceil(target / 50);
        current = Math.min(current + increment, target);
        counter.innerText = current + (counter.innerText.includes('%') ? '%' : '+');
        setTimeout(() => animateCounter(counter), 30);
    }
};

// Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Tech icons animation
const techIcons = document.querySelectorAll('.tech-icon, .skill-icon');
techIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-10px) scale(1.2)';
    });
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scroll for anchor links
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

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Back to top button
const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Parallax effect for home image
window.addEventListener('scroll', () => {
    const visualWrapper = document.querySelector('.visual-wrapper');
    if (visualWrapper) {
        const scroll = window.scrollY;
        visualWrapper.style.transform = `translateY(${scroll * 0.05}px)`;
    }
});