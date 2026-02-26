// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');
const navbar = document.querySelector('.navbar');

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// SPA Navigation Logic
const sections = document.querySelectorAll('section');
const pageLinks = document.querySelectorAll('a[href^="#"]');

function navigateTo(hash) {
    const targetId = hash || '#hero';
    const targetSection = document.querySelector(targetId);

    // If the target section doesn't exist, fallback to hero
    if (!targetSection) {
        if (targetId !== '#hero') navigateTo('#hero');
        return;
    }

    // Hide all sections
    sections.forEach(sec => sec.classList.add('hidden-section'));

    // Show target section and reset animations so Observer re-triggers them
    targetSection.classList.remove('hidden-section');
    const fadeElements = targetSection.querySelectorAll('.fade-up');
    fadeElements.forEach(el => el.classList.remove('visible'));

    // Update active nav link
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo(0, 0);
}

// Handle browser navigation (Back/Forward)
window.addEventListener('popstate', () => {
    navigateTo(window.location.hash);
});

// Intercept all internal page links (Navbar, Logo, Buttons)
pageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const hash = link.getAttribute('href');
        if (!hash || hash === '#') return;

        e.preventDefault();

        // Update URL
        if (history.pushState) {
            history.pushState(null, null, hash);
        } else {
            location.hash = hash;
        }

        navigateTo(hash);

        // Mobile menu cleanup
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Initialize SPA on load
document.addEventListener("DOMContentLoaded", () => {
    navigateTo(window.location.hash);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Typing Effect
const typedTextSpan = document.querySelector(".typing-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["AI Student", "Software Engineer", "C++ Learner", "Full Stack Developer"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Scroll Reveal Animation (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animating once
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(element => {
    observer.observe(element);
});
