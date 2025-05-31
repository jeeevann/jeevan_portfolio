// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const words = ['Web Developer', 'Frontend Developer', 'UI/UX Designer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    typingText.textContent = `I'm a ${currentChar}`;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, 200);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 100);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

type();

// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.padding = '1rem 5%';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.padding = '1.5rem 5%';
    }
});

// Form Submission (you can add your own backend endpoint)
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Project Card Toggle
function toggleProject(header) {
    const projectCard = header.parentElement;
    const wasActive = projectCard.classList.contains('active');
    
    // Close all project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // If the clicked card wasn't active before, open it
    if (!wasActive) {
        projectCard.classList.add('active');
    }
} 