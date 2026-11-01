(() => {
  const selector = '.nailzify-editorial-collection .slider--tablet';
  const initialized = new WeakSet();

  function updateFade(slider) {
    const position = Math.abs(slider.scrollLeft);
    const remaining = Math.max(0, slider.scrollWidth - slider.clientWidth - position);
    const rtl = getComputedStyle(slider).direction === 'rtl';
    slider.style.setProperty('--nz-fade-left', `${Math.min(32, rtl ? remaining : position)}px`);
    slider.style.setProperty('--nz-fade-right', `${Math.min(32, rtl ? position : remaining)}px`);
  }

  const observer = new ResizeObserver(entries => {
    entries.forEach(({ target }) => updateFade(target));
  });

  function initialize(root) {
    root.querySelectorAll(selector).forEach(slider => {
      if (initialized.has(slider)) return;
      initialized.add(slider);
      let pending = false;
      slider.addEventListener('scroll', () => {
        if (pending) return;
        pending = true;
        requestAnimationFrame(() => {
          updateFade(slider);
          pending = false;
        });
      }, { passive: true });
      observer.observe(slider);
      updateFade(slider);
    });
  }

  initialize(document);
  document.addEventListener('shopify:section:load', event => initialize(event.target));
  document.addEventListener('shopify:section:unload', event => {
    event.target.querySelectorAll(selector).forEach(slider => observer.unobserve(slider));
  });
})();
