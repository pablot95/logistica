document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-list a');

    mobileBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Smooth Scroll for Anchor Links (Polyfill-like behavior if needed, but CSS scroll-behavior handles most)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Form Submission Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation feedback
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = 'Enviando...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            // Simulate network request
            setTimeout(() => {
                alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo a la brevedad.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
            }, 1500);
        });
    }

    // Hero Animation
    setTimeout(() => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.classList.add('hero-active');
        }
    }, 1000);

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Handle delay if present
                const delay = target.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    target.classList.add('animate-in');
                }, delay);
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    // Setup Service Cards Animation (Staggered)
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        // Stagger delay: 150ms per item
        card.setAttribute('data-delay', index * 150);
        observer.observe(card);
    });

    // Setup Advantages Animation (Staggered)
    const advantageItems = document.querySelectorAll('.advantage-item');
    advantageItems.forEach((item, index) => {
        // Stagger delay: 300ms per item for clear sequence
        item.setAttribute('data-delay', index * 300);
        observer.observe(item);
    });

    // Other animated elements
    const otherAnimatedElements = document.querySelectorAll('.contact-wrapper');
    otherAnimatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Helper for generic elements to use the same animate-in class logic
    otherAnimatedElements.forEach(el => {
        el.classList.add('animate-ready');
    });

    // Content Protection (Disable Right Click, Copy, Cut, Paste, Drag)
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    
    document.addEventListener('keydown', (e) => {
        // Prevent Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+U (View Source), Ctrl+S (Save), F12 (DevTools)
        if (
            (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X' || e.key === 'v' || e.key === 'V' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) ||
            e.key === 'F12'
        ) {
            e.preventDefault();
        }
    });

    document.addEventListener('copy', (e) => e.preventDefault());
    document.addEventListener('cut', (e) => e.preventDefault());
    document.addEventListener('paste', (e) => e.preventDefault());
    document.addEventListener('dragstart', (e) => e.preventDefault());
});
