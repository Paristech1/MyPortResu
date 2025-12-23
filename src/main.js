import './style.css';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@fontsource/dm-serif-display';
import '@fontsource/public-sans';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Animations
const initAnimations = () => {
  // Hero Text Reveal
  const revealElements = document.querySelectorAll('.reveal-text');

  revealElements.forEach((element) => {
    gsap.fromTo(element,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Image Reveal
  const revealImages = document.querySelectorAll('.reveal-image, .project-image');

  revealImages.forEach((element) => {
    gsap.fromTo(element,
      {
        scale: 0.95,
        opacity: 0.5
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true
        }
      }
    );
  });

  // Scroll Spy for Navigation
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a');

  sections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (self.isActive) {
          // Remove active class from all links
          navLinks.forEach(link => link.classList.remove('active'));

          // Add active class to corresponding link
          const activeLink = document.querySelector(`.nav a[href="#${section.id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      }
    });
  });
};

// Project Card Click Handlers
const initProjectCards = () => {
  const projectCards = document.querySelectorAll('.project-card[data-notion-url]');
  
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Prevent navigation if clicking on a tag or other interactive element
      if (e.target.closest('.tag') || e.target.closest('a')) {
        return;
      }
      
      const notionUrl = card.getAttribute('data-notion-url');
      if (notionUrl && notionUrl !== 'https://notion.so') {
        window.open(notionUrl, '_blank', 'noopener,noreferrer');
      }
    });
  });
};

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initProjectCards();
});
