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
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector("nav ul");
const body = document.body;

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    body.classList.toggle("menu-open");
  });
}

const images = document.querySelectorAll('.gallery img');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');

images.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', e => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = 'none';
  }
});
