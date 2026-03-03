document.addEventListener('DOMContentLoaded', () => {

// ===== CUSTOM CURSOR =====
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

// Only enable on non-touch devices
if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    // Add slight delay to ring for smooth effect
    cursorRing.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 150, fill: 'forwards' });
  });
  
  // Hover effects on clickable elements
  const clickables = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-tag');
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.section-tag, .section-title, .section-subtitle, .about-text, .profile-card, .quick-facts, .skill-category, .project-card, .cert-card, .narrative-block, .contact-left, .contact-right');

// Add initial reveal class
revealElements.forEach(el => el.classList.add('reveal'));

const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Only animate once
    }
  });
};

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach(el => revealObserver.observe(el));

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Calculate header offset
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== HERO PARTICLES SIMPLE IMPLEMENTATION =====
const particlesContainer = document.getElementById('heroParticles');
if (particlesContainer) {
  // Create simple floating particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    
    // Random properties
    const size = Math.random() * 4 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const opacity = Math.random() * 0.5 + 0.1;
    const animDuration = Math.random() * 20 + 10;
    const animDelay = Math.random() * 5;
    
    // Style
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = '#00f0ff';
    particle.style.borderRadius = '50%';
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = opacity;
    particle.style.boxShadow = `0 0 ${size * 2}px #00f0ff`;
    
    particle.animate([
      { transform: 'translate(0, 0)', opacity: opacity },
      { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * -100 - 50}px)`, opacity: 0 }
    ], {
      duration: animDuration * 1000,
      delay: animDelay * 1000,
      iterations: Infinity,
      direction: 'alternate'
    });
    
    particlesContainer.appendChild(particle);
  }
}

// Active Nav Link updating on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
});
});
