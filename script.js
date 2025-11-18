
// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Animated counter for stats
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target.querySelector('.stat-number');
            const targetValue = parseInt(numberElement.textContent);
            numberElement.dataset.suffix = '+';
            animateValue(numberElement,950, targetValue, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

const animateValue2 = (element, start, end, duration) => {
    let startTimestamp = null;
    const prefix = element.dataset.prefix || "";
    const suffix = element.dataset.suffix || "";

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);

        element.textContent = `${prefix}${value}${suffix}`;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Helper to safely parse number from text (removes non-digit, non-minus, non-dot)
const extractNumber = (text) => {
    const cleaned = String(text).replace(/[^0-9\.\-]/g, '');
    // use parseFloat to allow decimals if needed, then Math.floor for integers below
    return cleaned === '' ? 0 : Math.floor(parseFloat(cleaned));
};

const statsObserver2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target.querySelector('.stat-number-two');
            if (!numberElement) return;

            // Safely get the numeric target even if HTML has $ or commas
            const targetValue = extractNumber(numberElement.textContent);

            // Set prefix to dollar sign
            numberElement.dataset.prefix = '$';
            numberElement.dataset.suffix = ''; // no suffix

            // Start from 0 (change if you want different start)
            animateValue2(numberElement, 0, targetValue, 2000);

            // stop observing this item
            statsObserver2.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe all stat-item blocks
document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver2.observe(item);
});


// Form submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your interest! We will contact you shortly.');
    this.reset();
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});
