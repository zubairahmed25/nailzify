(() => {
  const selector = '.nailzify-editorial-collection .slider--tablet';
  const initialized = new WeakSet();
  const initializedFaqs = new WeakSet();

  function initializeFaqs(root) {
    root.querySelectorAll('[data-compact-faq]').forEach(faq => {
      if (initializedFaqs.has(faq)) return;
      initializedFaqs.add(faq);
      const questions = Array.from(faq.querySelectorAll('[data-faq-question]'));
      const extraQuestions = questions.slice(4);
      const toggle = faq.querySelector('[data-faq-toggle]');

      function setExpanded(expanded) {
        extraQuestions.forEach(question => {
          if (!expanded) question.querySelector('details').open = false;
          question.hidden = !expanded;
        });
        toggle.setAttribute('aria-expanded', String(expanded));
        toggle.textContent = expanded ? toggle.dataset.showFewer : toggle.dataset.showAll;
      }

      if (toggle) {
        setExpanded(false);
        toggle.hidden = false;
        toggle.addEventListener('click', () => {
          setExpanded(toggle.getAttribute('aria-expanded') !== 'true');
        });
      }

      // Use the theme's accordion event so its animation and state stay in sync.
      faq.addEventListener('toggle', event => {
        if (!event.detail?.open) return;
        questions.forEach(question => {
          const details = question.querySelector('details');
          if (details !== event.detail.current && details.open) details.open = false;
        });
      });

      // Reveal a selected hidden block before the theme opens it in the editor.
      faq.addEventListener('shopify:block:select', event => {
        if (toggle && event.target.closest('[data-faq-question]')?.hidden) setExpanded(true);
      }, true);
    });
  }

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
    initializeFaqs(root);
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
