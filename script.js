// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Typing Animation
const typedTextSpan = document.querySelector(".typed-text");
const texts = ["Web Developer", "Android App Developer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;
let erasingDelay = 100;
let newTextDelay = 2000;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = erasingDelay;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200;
    }

    if (!isDeleting && charIndex === currentText.length) {
        typingDelay = newTextDelay;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingDelay = 500;
    }

    setTimeout(type, typingDelay);
}

// Start typing animation immediately
if (typedTextSpan) type();

// Additional initialization on window load
window.addEventListener('load', () => {
    AOS.init();
});

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

// Form Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch('submit_form.php', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        formMessage.textContent = data.message;
        formMessage.style.color = data.success ? '#50c878' : '#ff6b6b';
        
        if (data.success) {
            contactForm.reset();
            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000);
        }
    } catch (error) {
        formMessage.textContent = 'An error occurred. Please try again later.';
        formMessage.style.color = '#ff6b6b';
    }
});

// Project Card Toggle
function toggleProject(header) {
    const details = header.nextElementSibling;
    const icon = header.querySelector('.expand-icon');
    
    if (details.style.maxHeight) {
        details.style.maxHeight = null;
        details.classList.remove('active');
        icon.textContent = '+';
    } else {
        details.style.maxHeight = details.scrollHeight + "px";
        details.classList.add('active');
        icon.textContent = '-';
    }
}

// Particle and Glow Animation System
class Particle {
    constructor(canvas, x, y) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 60 + 170}, 100%, 50%)`;  // Blue-green spectrum
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.02;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize animation canvas
const canvas = document.createElement('canvas');
canvas.classList.add('animation-canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Animation variables
let particles = [];
let mouseX = 0;
let mouseY = 0;
let glowRadius = 100;
let isMouseMoving = false;
let mouseTimer;

// Mouse move handler
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => isMouseMoving = false, 100);

    // Create particles on mouse move
    if (Math.random() < 0.3) {
        particles.push(new Particle(canvas, mouseX, mouseY));
    }
});

// Animation loop
function animate() {
    ctx.fillStyle = 'rgba(10, 25, 47, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles = particles.filter(particle => {
        particle.update();
        particle.draw(ctx);
        return particle.life > 0;
    });

    // Draw glow effect
    if (isMouseMoving) {
        const gradient = ctx.createRadialGradient(
            mouseX, mouseY, 0,
            mouseX, mouseY, glowRadius
        );
        gradient.addColorStop(0, 'rgba(100, 255, 218, 0.3)');
        gradient.addColorStop(1, 'rgba(100, 255, 218, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    requestAnimationFrame(animate);
}

animate(); 