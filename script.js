/**
 * Liza Tech - Landing Page Scripts
 * Interactive behaviors: Header effects, Mobile nav, Scrollspy,
 * Stats counter, Feature filtering, Form validation & Toast notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const featureCards = document.querySelectorAll('.feature-card');
  const contactForm = document.getElementById('contact-form');
  const toastNotification = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  // =========================================================================
  // 1. Sticky Header & Back-To-Top Button on Scroll
  // =========================================================================
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header frosted glass effect
    if (scrollPos > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll-to-top button visibility
    if (scrollPos > 350) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }

    // Scrollspy for active nav link
    updateActiveNavLink();
  });

  // Back to top click
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // =========================================================================
  // 2. Mobile Menu Toggle
  // =========================================================================
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
      }
    });
  }

  // =========================================================================
  // 3. Scrollspy Navigation
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const currentLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (currentLink) {
          currentLink.classList.add('active');
        }
      }
    });
  }

  // =========================================================================
  // 4. Animated Stats Counter (Intersection Observer)
  // =========================================================================
  const statNumbers = document.querySelectorAll('.stat-card-number');
  let statsCounted = false;

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsCounted) {
        statsCounted = true;
        animateStats();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    statsObserver.observe(aboutSection);
  }

  function animateStats() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const duration = 1800; // ms
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        // Ease-out cubic formula
        const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 3)));

        stat.textContent = currentCount;

        if (frame === totalFrames) {
          stat.textContent = target;
          clearInterval(counter);
        }
      }, frameDuration);
    });
  }

  // =========================================================================
  // 5. Feature Filtering
  // =========================================================================
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      featureCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 6. Contact Form Validation & Toast Notification
  // =========================================================================
  if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const submitBtn = document.getElementById('submit-btn');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Helper: Validate single field
    function validateField(input, errorEl, condition) {
      if (!condition) {
        input.classList.add('error');
        errorEl.classList.add('visible');
        return false;
      } else {
        input.classList.remove('error');
        errorEl.classList.remove('visible');
        return true;
      }
    }

    // Real-time blur listeners
    nameInput.addEventListener('blur', () => {
      validateField(nameInput, nameError, nameInput.value.trim().length > 1);
    });

    emailInput.addEventListener('blur', () => {
      validateField(emailInput, emailError, emailRegex.test(emailInput.value.trim()));
    });

    messageInput.addEventListener('blur', () => {
      validateField(messageInput, messageError, messageInput.value.trim().length > 5);
    });

    // Form submit
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameError, nameInput.value.trim().length > 1);
      const isEmailValid = validateField(emailInput, emailError, emailRegex.test(emailInput.value.trim()));
      const isMessageValid = validateField(messageInput, messageError, messageInput.value.trim().length > 5);

      if (isNameValid && isEmailValid && isMessageValid) {
        // Visual sending state
        const originalBtnHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
          </svg>
          <span>იგზავნება...</span>
        `;

        // Simulate async sending
        setTimeout(() => {
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;

          showToast('შეტყობინება წარმატებით გაიგზავნა! ჩვენი გუნდი მალე დაგიკავშირდებათ.');
        }, 850);
      }
    });
  }

  // Toast Functionality
  function showToast(message) {
    if (!toastNotification) return;

    if (toastMessage) {
      toastMessage.textContent = message;
    }

    toastNotification.classList.add('active');

    setTimeout(() => {
      toastNotification.classList.remove('active');
    }, 4500);
  }
});

// Inline keyframe for button spinner
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);
