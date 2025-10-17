// Hero text animation
const heroTextContainer = document.getElementById("hero-text");
const heroImage = document.querySelector(".hero-image img");

if (heroTextContainer && heroImage) {
  const text = heroTextContainer.textContent;
  heroTextContainer.textContent = "";

  const letters = [];
  for (let char of text) {
    const span = document.createElement("span");
    span.textContent = char;
    heroTextContainer.appendChild(span);
    letters.push(span);
  }

  function updateLetterColors() {
    const imageRect = heroImage.getBoundingClientRect();

    letters.forEach(letter => {
      const letterRect = letter.getBoundingClientRect();

      const overlapLeft = Math.max(imageRect.left - letterRect.left, 0);
      const overlapRight = Math.max(letterRect.right - imageRect.right, 0);
      const overlapWidth = letterRect.width - overlapLeft - overlapRight;
      const overlapPercent = Math.min(Math.max(overlapWidth / letterRect.width, 0), 1) * 100;

      let gradient = "";

      if (overlapPercent === 0) {
        gradient = `var(--color-text)`;
      } else if (letterRect.left < imageRect.left) {
        gradient = `linear-gradient(to right, 
          var(--color-text) 0%, 
          var(--color-text) ${100 - overlapPercent}%, 
          var(--color-bg) ${100 - overlapPercent}%, 
          var(--color-bg) 100%)`;
      } else if (letterRect.right > imageRect.right) {
        gradient = `linear-gradient(to right, 
          var(--color-bg) 0%, 
          var(--color-bg) ${overlapPercent}%, 
          var(--color-text) ${overlapPercent}%, 
          var(--color-text) 100%)`;
      } else {
        gradient = `var(--color-bg)`;
      }

      letter.style.background = gradient;
      letter.style.color = "transparent";
      letter.style.backgroundClip = "text";
      letter.style.webkitBackgroundClip = "text";
    });
  }

  function animate() {
    updateLetterColors();
    requestAnimationFrame(animate);
  }

  animate();
}
// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Scroll-triggered image animations
const imageItems = document.querySelectorAll('.image-item');

if (imageItems.length > 0) {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    imageItems.forEach(item => {
        imageObserver.observe(item);
    });
}

// Lightbox functionality
const images = document.querySelectorAll('.image-wrapper img');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');

if (lightbox && lightboxImg && closeBtn) {
    images.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}