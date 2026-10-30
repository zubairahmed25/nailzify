(() => {
  const mobileGalleryQuery = window.matchMedia('(max-width: 639px)');

  function selectPeekedMedia(event) {
    if (!mobileGalleryQuery.matches) return;

    const slider = event.currentTarget;
    const selectedMedia = event.target.closest('.product__media');
    if (!selectedMedia || typeof slider.select !== 'function') return;

    const mediaItems = slider.itemsToShow || Array.from(slider.querySelectorAll('.product__media'));
    const selectedIndex = mediaItems.indexOf(selectedMedia);
    const currentIndex = Math.max((slider.currentPage || 1) - 1, 0);

    if (selectedIndex < 0 || selectedIndex === currentIndex) return;

    event.preventDefault();
    event.stopPropagation();
    slider.select(selectedIndex + 1);
  }

  function initializeMobileGallery(scope = document) {
    scope.querySelectorAll('.nailzify-product-redesign media-gallery slider-element').forEach((slider) => {
      if (slider.dataset.nailzifyPeekGallery === 'true') return;

      slider.dataset.nailzifyPeekGallery = 'true';
      slider.addEventListener('click', selectPeekedMedia, true);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initializeMobileGallery(), { once: true });
  } else {
    initializeMobileGallery();
  }

  document.addEventListener('shopify:section:load', (event) => initializeMobileGallery(event.target));
})();
