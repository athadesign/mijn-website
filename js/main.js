const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const yearTarget = document.querySelector('#year');
const revealItems = document.querySelectorAll('.reveal');
const hero = document.querySelector('.hero');
const heroBlob = document.querySelector('.hero-blob');
const heroName = document.querySelector('.hero-name');
const heroQuality = document.querySelector('#hero-quality');
const cards = document.querySelectorAll('.project-card');
const cursorDot = document.querySelector('.cursor-dot');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.documentElement.classList.add('js');

const nameQualities = [
  { letter: 'A', quality: 'Analytisch' },
  { letter: 'T', quality: 'Tekenvaardig' },
  { letter: 'H', quality: 'Helder' },
  { letter: 'A', quality: 'Authentiek' },
  { letter: 'N', quality: 'Nauwkeurig' },
  { letter: 'A', quality: 'AI-nieuwsgierig' },
  { letter: 'S', quality: 'Sociaal' },
  { letter: 'I', quality: 'Inventief' },
  { letter: 'A', quality: 'Aanpassingsvermogen' },
  { letter: ' ', quality: '' },
  { letter: 'D', quality: 'Detailgeorienteerd' },
  { letter: 'R', quality: 'Reflectief' },
  { letter: 'A', quality: 'Ambitieus' },
  { letter: 'K', quality: 'Kritisch' },
  { letter: 'O', quality: 'Oplossingsgericht' },
  { letter: 'P', quality: 'Psychologisch geinteresseerd' },
  { letter: 'O', quality: 'Onderzoekend' },
  { letter: 'U', quality: 'User-empathie' },
  { letter: 'L', quality: 'Loyaal' },
  { letter: 'O', quality: 'Onderbouwend' },
  { letter: 'S', quality: 'Samenwerkend' }
];

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('is-open', !expanded);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('is-open');
    });
  });
}

window.addEventListener(
  'scroll',
  () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 10);
  },
  { passive: true }
);

// Smooth scrolling for in-page anchors.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    event.preventDefault();
    targetElement.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  });
});

if (revealItems.length && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  // Safety net: never leave content hidden if observer callbacks are delayed.
  window.setTimeout(() => {
    revealItems.forEach((item) => {
      if (!item.classList.contains('in-view')) {
        item.classList.add('in-view');
      }
    });
  }, 900);
} else if (revealItems.length) {
  revealItems.forEach((item) => item.classList.add('in-view'));
}

if (heroName) {
  const text = heroName.dataset.name || heroName.textContent.trim();
  const fragment = document.createDocumentFragment();

  text.split('').forEach((char, index) => {
    const qualityEntry = nameQualities[index];

    if (!qualityEntry || qualityEntry.letter.toLowerCase() !== char.toLowerCase()) {
      return;
    }

    const letterElement = document.createElement('button');
    letterElement.type = 'button';
    letterElement.className = 'name-letter';

    if (char === ' ') {
      letterElement.classList.add('space');
      letterElement.tabIndex = -1;
      letterElement.setAttribute('aria-hidden', 'true');
      letterElement.textContent = '\u00A0';
      fragment.appendChild(letterElement);
      return;
    }

    letterElement.textContent = char;
    letterElement.dataset.quality = qualityEntry.quality;
    letterElement.setAttribute('aria-label', `${char} - ${qualityEntry.quality}`);
    fragment.appendChild(letterElement);
  });

  heroName.textContent = '';
  heroName.appendChild(fragment);

  const letters = Array.from(heroName.querySelectorAll('.name-letter:not(.space)'));
  const setHeroQualityText = (quality) => {
    if (heroQuality) {
      heroQuality.textContent = quality || 'Raak een letter aan voor mijn kwaliteit';
    }
  };
  const clearActiveLetters = () => {
    letters.forEach((letter) => letter.classList.remove('is-active'));
  };
  const activateLetter = (letter, persist = false) => {
    window.clearTimeout(letter._activeTimer);
    clearActiveLetters();
    letter.classList.add('is-active');
    setHeroQualityText(letter.dataset.quality);
    if (!persist) {
      letter._activeTimer = window.setTimeout(() => {
        letter.classList.remove('is-active');
      }, 1200);
    }
  };

  letters.forEach((letter) => {
    letter.addEventListener('mouseenter', () => {
      activateLetter(letter, true);
    });

    letter.addEventListener('focus', () => {
      activateLetter(letter, true);
    });

    letter.addEventListener('mouseleave', () => {
      if (document.activeElement !== letter) {
        letter.classList.remove('is-active');
        setHeroQualityText('');
      }
    });

    letter.addEventListener('blur', () => {
      letter.classList.remove('is-active');
      setHeroQualityText('');
    });

    letter.addEventListener('touchstart', () => {
      activateLetter(letter);
    });

    letter.addEventListener('click', () => {
      activateLetter(letter);
    });
  });

  if (hero) {
    hero.addEventListener('mouseleave', () => {
      clearActiveLetters();
      setHeroQualityText('');
    });
  }
}

cards.forEach((card) => {
  card.addEventListener('touchstart', () => {
    cards.forEach((other) => {
      if (other !== card) {
        other.classList.remove('is-tapped');
      }
    });

    card.classList.add('is-tapped');

    window.setTimeout(() => {
      card.classList.remove('is-tapped');
    }, 1300);
  });
});

if (cursorDot && !prefersReducedMotion) {
  window.addEventListener(
    'mousemove',
    (event) => {
      cursorDot.style.left = `${event.clientX}px`;
      cursorDot.style.top = `${event.clientY}px`;
    },
    { passive: true }
  );
}
