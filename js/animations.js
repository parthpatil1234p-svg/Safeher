/**
 * SafeHer — 3D Web Creative Motion & Interactive Controller
 * Awwwards / Apple Standard High-End UI/UX Engine
 * Stack: Pure Vanilla JavaScript (GPU 60fps, Zero Dependencies)
 */

'use strict';

(function () {
  /**
   * 1. 3D INTERACTIVE PARTICLE MESH CANVAS (HERO SCENE)
   * Lightweight, battery-efficient 3D particle constellation.
   * Dynamically tracks mouse parallax with depth scaling.
   */
  function initHeroParticleCanvas() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    let mouse = { x: width / 2, y: height / 2, active: false };
    const numParticles = Math.min(Math.floor(width / 22), 48);
    const particles = [];

    class Particle3D {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 10;
        this.z = Math.random() * 0.8 + 0.2; // Depth layer: 0.2 to 1.0
        this.vx = (Math.random() - 0.5) * 0.45 * this.z;
        this.vy = -(Math.random() * 0.5 + 0.2) * this.z;
        this.baseRadius = (Math.random() * 2.5 + 1.2) * this.z;
        this.alpha = (Math.random() * 0.5 + 0.3) * this.z;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Subtle mouse parallax attraction based on depth (z)
        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = ((180 - dist) / 180) * 0.02 * this.z;
            this.x += dx * force;
            this.y += dy * force;
          }
        }

        // Screen boundary wrap
        if (this.y < -20 || this.x < -20 || this.x > width + 20) {
          this.reset(false);
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${this.alpha})`;
        ctx.shadowBlur = 8 * this.z;
        ctx.shadowColor = 'rgba(139, 92, 246, 0.6)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle3D());
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Draw connective constellations between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.18 * particles[i].z;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(196, 181, 253, ${lineAlpha})`;
            ctx.lineWidth = 0.8 * particles[i].z;
            ctx.stroke();
          }
        }
      }

      // Draw all particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(render);
    }

    render();

    // Mouse Parallax Listeners
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    // Throttled Resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!canvas.parentElement) return;
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
      }, 200);
    });
  }

  /**
   * 2. 3D INTERACTIVE TILT WITH DYNAMIC SPECULAR GLARE
   * Injects dynamic radial specular reflections that glide across card surfaces.
   */
  function initCard3DTiltWithGlare() {
    if (window.matchMedia('(hover: none) or (prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const cards = document.querySelectorAll('.card, .dashboard-card, .glass-panel-3d');

    cards.forEach((card) => {
      // Inject specular glare element if not already present
      let glare = card.querySelector('.card__glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'card__glare';
        card.appendChild(glare);
      }

      let isHovered = false;
      let targetRotateX = 0;
      let targetRotateY = 0;
      let glareX = 50;
      let glareY = 50;

      function updateCardTransform() {
        if (!isHovered) return;
        card.style.transform = `perspective(1000px) rotateX(${targetRotateX}deg) rotateY(${targetRotateY}deg) translate3d(0, -4px, 0)`;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.05) 45%, transparent 70%)`;
        requestAnimationFrame(updateCardTransform);
      }

      card.addEventListener('mouseenter', () => {
        isHovered = true;
        requestAnimationFrame(updateCardTransform);
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Normalize between -1 and 1
        const xVal = (mouseX / width) * 2 - 1;
        const yVal = (mouseY / height) * 2 - 1;

        targetRotateX = (yVal * -6.5).toFixed(2);
        targetRotateY = (xVal * 6.5).toFixed(2);

        glareX = ((mouseX / width) * 100).toFixed(1);
        glareY = ((mouseY / height) * 100).toFixed(1);
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
      });
    });
  }

  /**
   * 3. MAGNETIC BUTTON MICRO-INTERACTIONS
   * Draws CTA buttons slightly toward the cursor on proximity hover.
   */
  function initMagneticButtons() {
    if (window.matchMedia('(hover: none) or (prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const magneticBtns = document.querySelectorAll('.btn--primary, .btn--lg');

    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - btnCenterX) * 0.28;
        const deltaY = (e.clientY - btnCenterY) * 0.28;

        btn.style.transform = `translate3d(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px, 0)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  /**
   * 4. STAGGERED SPRING SCROLL OBSERVER
   */
  function initScrollStagger() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.anim-card, .anim-stagger-item').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const staggerObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.anim-card, .anim-stagger-item').forEach((el, index) => {
      if (![...el.classList].some((c) => c.startsWith('stagger-'))) {
        const delay = (index % 8) * 0.08;
        el.style.transitionDelay = `${delay}s`;
      }
      staggerObserver.observe(el);
    });
  }

  /**
   * 5. FLOATING LABELS DETECTION
   */
  function initFloatingLabels() {
    const floatInputs = document.querySelectorAll('.form-group--float .form-input');

    floatInputs.forEach((input) => {
      const parent = input.closest('.form-group--float');
      if (!parent) return;

      const checkValue = () => {
        if (input.value && input.value.trim() !== '') {
          parent.classList.add('has-value');
        } else {
          parent.classList.remove('has-value');
        }
      };

      input.addEventListener('input', checkValue);
      input.addEventListener('change', checkValue);
      input.addEventListener('blur', checkValue);
      checkValue();
    });
  }

  /**
   * 6. VALIDATION SHAKE PROGRAMMATIC TRIGGER
   */
  function triggerInputShake(target) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;

    el.classList.remove('input-shake');
    void el.offsetWidth; // Force Reflow
    el.classList.add('input-shake');

    el.addEventListener(
      'animationend',
      () => {
        el.classList.remove('input-shake');
      },
      { once: true }
    );
  }

  /**
   * 7. MULTI-STEP PROGRESS STEPPER ANIMATOR
   */
  function setStepperStep(stepNumber) {
    const fill = document.querySelector('.stepper-progress-fill');
    if (fill) {
      fill.className = `stepper-progress-fill step-${stepNumber}`;
    }

    const steps = document.querySelectorAll('.stepper-step');
    steps.forEach((step, index) => {
      const num = index + 1;
      if (num < stepNumber) {
        step.classList.add('completed');
        step.classList.remove('active');
      } else if (num === stepNumber) {
        step.classList.add('active');
        step.classList.remove('completed');
      } else {
        step.classList.remove('completed', 'active');
      }
    });
  }

  // Global Exports
  window.triggerInputShake = triggerInputShake;
  window.setStepperStep = setStepperStep;

  // Run on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    initHeroParticleCanvas();
    initCard3DTiltWithGlare();
    initMagneticButtons();
    initScrollStagger();
    initFloatingLabels();
  });
})();
