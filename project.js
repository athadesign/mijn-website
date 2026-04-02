const caseSections = document.querySelectorAll('[data-case-section]');
const sideNavLinks = document.querySelectorAll('.case-side-nav a');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setCurrentSectionState = (id) => {
  caseSections.forEach((section) => {
    section.classList.toggle('is-current', section.id === id);
  });
};

if (caseSections.length && sideNavLinks.length && 'IntersectionObserver' in window) {
  const sectionsById = new Map(Array.from(caseSections).map((section) => [section.id, section]));

  const setActiveLink = (id) => {
    const normalizedId = id === 'inzichten' ? 'aanpak' : id;

    sideNavLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${normalizedId}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    setCurrentSectionState(id);
  };

  const navObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length) {
        setActiveLink(visible[0].target.id);
      }
    },
    {
      rootMargin: '-34% 0px -48% 0px',
      threshold: [0.2, 0.45, 0.7]
    }
  );

  sectionsById.forEach((section) => navObserver.observe(section));

  const initialSection = Array.from(sectionsById.values()).find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.42 && rect.bottom >= window.innerHeight * 0.22;
  });

  if (initialSection) {
    setActiveLink(initialSection.id);
  } else {
    setActiveLink(caseSections[0].id);
  }
} else if (sideNavLinks.length) {
  sideNavLinks[0].classList.add('is-active');
  sideNavLinks[0].setAttribute('aria-current', 'true');
  if (caseSections.length) {
    setCurrentSectionState(caseSections[0].id);
  }
}

if (!prefersReducedMotion && caseSections.length) {
  caseSections.forEach((section) => {
    const staggerItems = section.querySelectorAll('h2, h3, p, ul, figure, .comparison-grid');
    staggerItems.forEach((item, index) => {
      item.classList.add('stagger-item');
      item.style.setProperty('--stagger-delay', `${Math.min(index * 45, 260)}ms`);
    });
  });
}

document.querySelectorAll('.case-list li').forEach((item) => {
  const text = item.textContent.toLowerCase();

  if (/vertrouwen|bestelproces|bestellen/.test(text)) {
    item.classList.add('icon-trust');
    return;
  }

  if (/mobiel|menukaart|menu/.test(text)) {
    item.classList.add('icon-mobile');
    return;
  }

  if (/sneller|tijd|vinden/.test(text)) {
    item.classList.add('icon-speed');
    return;
  }

  if (/allergie|allergenen|overzicht|duidelijk/.test(text)) {
    item.classList.add('icon-clarity');
  }
});

const metricsCarousel = document.querySelector('.metrics-carousel');

if (metricsCarousel) {
  const viewport = metricsCarousel.querySelector('.metrics-carousel__viewport');
  const track = metricsCarousel.querySelector('.metrics-carousel__track');
  const slides = Array.from(metricsCarousel.querySelectorAll('.metrics-carousel__slide'));
  const prevButton = metricsCarousel.querySelector('.metrics-carousel__prev');
  const nextButton = metricsCarousel.querySelector('.metrics-carousel__next');
  const dotsContainer = metricsCarousel.querySelector('.metrics-carousel__dots');

  if (viewport && track && prevButton && nextButton && dotsContainer && slides.length) {
    let currentIndex = 0;
    let slideWidth = 0;
    let slideGap = 0;
    let step = 0;
    let centerOffset = 0;
    let currentTranslate = 0;
    let dragStartX = 0;
    let dragStartTranslate = 0;
    let isDragging = false;

    const dots = slides.map((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'metrics-carousel__dot';
      dot.setAttribute('aria-label', `Ga naar grafiek ${index + 1}`);
      dot.addEventListener('click', () => {
        goTo(index);
      });
      dotsContainer.appendChild(dot);
      return dot;
    });

    const clampIndex = (value) => Math.max(0, Math.min(value, slides.length - 1));

    const measure = () => {
      const firstSlide = slides[0];
      const computedTrack = window.getComputedStyle(track);
      slideGap = parseFloat(computedTrack.columnGap || computedTrack.gap || '0');
      slideWidth = firstSlide.getBoundingClientRect().width;
      step = slideWidth + slideGap;
      centerOffset = (viewport.clientWidth - slideWidth) / 2;
    };

    const updateUi = () => {
      slides.forEach((slide, index) => {
        slide.classList.toggle('is-active', index === currentIndex);
      });

      dots.forEach((dot, index) => {
        dot.classList.toggle('is-active', index === currentIndex);
      });
    };

    const setTranslate = (value, withAnimation) => {
      currentTranslate = value;
      track.style.transition = withAnimation ? 'transform 480ms cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none';
      track.style.transform = `translateX(${value}px)`;
    };

    const goTo = (index, withAnimation = true) => {
      currentIndex = clampIndex(index);
      const target = centerOffset - currentIndex * step;
      setTranslate(target, withAnimation);
      updateUi();
    };

    const snapToNearest = () => {
      const nearest = Math.round((centerOffset - currentTranslate) / step);
      goTo(nearest, true);
    };

    prevButton.addEventListener('click', () => goTo(currentIndex - 1));
    nextButton.addEventListener('click', () => goTo(currentIndex + 1));

    viewport.addEventListener('pointerdown', (event) => {
      isDragging = true;
      dragStartX = event.clientX;
      dragStartTranslate = currentTranslate;
      viewport.classList.add('is-dragging');
      viewport.setPointerCapture(event.pointerId);
      setTranslate(currentTranslate, false);
    });

    viewport.addEventListener('pointermove', (event) => {
      if (!isDragging) return;
      const deltaX = event.clientX - dragStartX;
      const minTranslate = centerOffset - (slides.length - 1) * step;
      const maxTranslate = centerOffset;
      const nextTranslate = Math.max(minTranslate - 30, Math.min(maxTranslate + 30, dragStartTranslate + deltaX));
      setTranslate(nextTranslate, false);
    });

    const endDrag = (event) => {
      if (!isDragging) return;
      isDragging = false;
      viewport.classList.remove('is-dragging');
      if (event) viewport.releasePointerCapture(event.pointerId);
      snapToNearest();
    };

    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);
    viewport.addEventListener('pointerleave', (event) => {
      if (!isDragging) return;
      endDrag(event);
    });

    window.addEventListener('resize', () => {
      measure();
      goTo(currentIndex, false);
    });

    measure();
    goTo(0, false);
  }
}

