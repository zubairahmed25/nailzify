class NailzifyHolidayHandSlider {
  constructor(element) {
    this.element = element;
    this.slides = Array.from(element.querySelectorAll('[data-holiday-hand-slide]'));
    this.controls = Array.from(element.querySelectorAll('[data-holiday-hand-control]'));
    const compareOrder = (a, b) => Number(a.dataset.slideOrder || 1) - Number(b.dataset.slideOrder || 1);
    this.slides.sort(compareOrder);
    this.controls.sort(compareOrder);
    this.slides.forEach((slide, index) => {
      slide.dataset.slideIndex = String(index);
      slide.parentElement.appendChild(slide);
    });
    this.controls.forEach((control, index) => {
      control.dataset.holidayHandControl = String(index);
      control.parentElement.appendChild(control);
    });
    this.status = element.querySelector('[data-holiday-hand-status]');
    this.mobileMedia = window.matchMedia('(max-width: 767px)');
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.autoplayEnabled = element.dataset.autoplay === 'true';
    this.delay = Number(element.dataset.delay) || 5000;
    this.currentIndex = Math.max(
      0,
      this.slides.findIndex((slide) => slide.classList.contains('is-active'))
    );
    this.timer = null;
    this.pointerStartX = null;
    this.pointerStartY = null;
    this.suppressNextClick = false;
    this.userPaused = false;

    if (this.slides.length < 2) return;

    this.bindEvents();
    this.updateSlideState();
    this.scheduleNext();
  }

  bindEvents() {
    this.controls.forEach((control) => {
      control.addEventListener('click', () => {
        this.userPaused = true;
        this.show(Number(control.dataset.holidayHandControl), true);
      });
    });

    this.element.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse') return;
      this.pointerStartX = event.clientX;
      this.pointerStartY = event.clientY;
    });

    this.element.addEventListener('pointerup', (event) => {
      if (this.pointerStartX === null || this.pointerStartY === null) return;

      const distanceX = event.clientX - this.pointerStartX;
      const distanceY = event.clientY - this.pointerStartY;
      this.pointerStartX = null;
      this.pointerStartY = null;

      if (Math.abs(distanceX) < 44 || Math.abs(distanceX) <= Math.abs(distanceY)) return;

      this.userPaused = true;
      this.suppressNextClick = true;
      this.show(this.currentIndex + (distanceX < 0 ? 1 : -1), true);
    });

    this.slides.forEach((slide) => {
      slide.addEventListener('click', (event) => {
        if (!this.suppressNextClick) return;
        event.preventDefault();
        this.suppressNextClick = false;
      });
    });

    this.element.addEventListener('pointerenter', () => this.clearTimer());
    this.element.addEventListener('pointerleave', () => this.scheduleNext());
    this.element.addEventListener('focusin', () => this.clearTimer());
    this.element.addEventListener('focusout', (event) => {
      if (!this.element.contains(event.relatedTarget)) this.scheduleNext();
    });

    this.mobileMedia.addEventListener('change', () => this.scheduleNext());
    this.reducedMotion.addEventListener('change', () => this.scheduleNext());

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.clearTimer();
      } else {
        this.scheduleNext();
      }
    });
  }

  show(requestedIndex, announceChange = false) {
    const nextIndex = (requestedIndex + this.slides.length) % this.slides.length;
    if (nextIndex === this.currentIndex) return;

    const currentSlide = this.slides[this.currentIndex];
    const nextSlide = this.slides[nextIndex];
    const direction =
      nextIndex > this.currentIndex ||
      (this.currentIndex === this.slides.length - 1 && nextIndex === 0)
        ? 'next'
        : 'previous';

    this.element.dataset.direction = direction;
    currentSlide.classList.add('is-leaving');
    currentSlide.classList.remove('is-active');
    nextSlide.classList.add('is-active');
    this.currentIndex = nextIndex;
    this.updateSlideState();

    window.setTimeout(() => {
      currentSlide.classList.remove('is-leaving');
    }, this.reducedMotion.matches ? 0 : 700);

    if (announceChange && this.status) {
      this.status.textContent = nextSlide.dataset.slideLabel || 'New nail design shown.';
    }

    this.scheduleNext();
  }

  updateSlideState() {
    this.slides.forEach((slide, index) => {
      const isActive = index === this.currentIndex;
      slide.setAttribute('aria-hidden', String(!isActive));
      slide.tabIndex = isActive ? 0 : -1;
    });

    this.controls.forEach((control, index) => {
      const isActive = index === this.currentIndex;
      control.classList.toggle('is-active', isActive);
      control.setAttribute('aria-current', String(isActive));
    });
  }

  scheduleNext() {
    this.clearTimer();

    if (
      !this.autoplayEnabled ||
      this.userPaused ||
      !this.mobileMedia.matches ||
      this.reducedMotion.matches ||
      document.hidden
    ) {
      return;
    }

    this.timer = window.setTimeout(() => {
      this.show(this.currentIndex + 1);
    }, this.delay);
  }

  clearTimer() {
    if (!this.timer) return;
    window.clearTimeout(this.timer);
    this.timer = null;
  }
}

const initializeNailzifyHolidayHandSliders = (container = document) => {
  container.querySelectorAll('[data-holiday-hand-slider]').forEach((slider) => {
    if (slider.dataset.initialized === 'true') return;
    slider.dataset.initialized = 'true';
    new NailzifyHolidayHandSlider(slider);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initializeNailzifyHolidayHandSliders());
} else {
  initializeNailzifyHolidayHandSliders();
}

document.addEventListener('shopify:section:load', (event) => {
  initializeNailzifyHolidayHandSliders(event.target);
});
