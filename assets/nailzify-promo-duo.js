if (!customElements.get('nailzify-promo-duo')) {
  customElements.define(
    'nailzify-promo-duo',
    class NailzifyPromoDuo extends HTMLElement {
      constructor() {
        super();

        this.button = this.querySelector('[data-promo-duo-submit]');
        this.status = this.querySelector('[data-promo-duo-status]');
        this.onSubmit = this.onSubmit.bind(this);
      }

      connectedCallback() {
        this.button?.addEventListener('click', this.onSubmit);
      }

      disconnectedCallback() {
        this.button?.removeEventListener('click', this.onSubmit);
      }

      get variantIds() {
        return [this.dataset.variantOne, this.dataset.variantTwo].filter(Boolean);
      }

      get cartDrawer() {
        return document.querySelector('cart-drawer');
      }

      get cartUsesPage() {
        return document.body.classList.contains('template-cart') || window.theme?.settings?.cartType === 'page';
      }

      setStatus(message, state = '') {
        if (!this.status) return;

        this.status.textContent = message;
        if (state) {
          this.status.dataset.state = state;
        } else {
          delete this.status.dataset.state;
        }
      }

      prepareItems() {
        return this.variantIds.reduce((items, id) => {
          const existingItem = items.find((item) => item.id === id);
          if (existingItem) {
            existingItem.quantity += 1;
          } else {
            items.push({ id, quantity: 1 });
          }
          return items;
        }, []);
      }

      async onSubmit() {
        if (!this.button || this.button.disabled || this.button.getAttribute('aria-busy') === 'true') return;

        if (this.variantIds.length !== 2) {
          this.setStatus(this.dataset.errorText, 'error');
          return;
        }

        this.button.disabled = true;
        this.button.setAttribute('aria-busy', 'true');
        this.setStatus(this.dataset.loadingText);

        try {
          const sections = [];
          document.documentElement.dispatchEvent(
            new CustomEvent('cart:bundled-sections', {
              bubbles: true,
              detail: { sections }
            })
          );

          const response = await fetch(window.theme?.routes?.cart_add_url || '/cart/add.js', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({
              items: this.prepareItems(),
              sections,
              sections_url: window.location.pathname
            })
          });

          const addedProducts = await response.json();
          if (!response.ok || addedProducts.status) {
            throw new Error(addedProducts.description || addedProducts.message || this.dataset.errorText);
          }

          if (this.cartUsesPage) {
            window.location.href = window.theme?.routes?.cart_url || '/cart';
            return;
          }

          const cartResponse = await fetch(window.theme?.routes?.cart_url || '/cart.js', {
            headers: { Accept: 'application/json' }
          });
          const cart = await cartResponse.json();
          cart.sections = addedProducts.sections || {};

          window.theme?.pubsub?.publish(
            window.theme.pubsub.PUB_SUB_EVENTS.cartUpdate,
            {
              source: 'nailzify-promo-duo',
              productVariantId: this.variantIds[0],
              cart
            }
          );

          document.dispatchEvent(
            new CustomEvent('ajaxProduct:added', {
              detail: { product: addedProducts }
            })
          );

          this.setStatus(this.dataset.successText, 'success');
          this.cartDrawer?.show(this.button);
        } catch (error) {
          console.error('Nailzify promo duo:', error);
          this.setStatus(error.message || this.dataset.errorText, 'error');
        } finally {
          this.button.removeAttribute('aria-busy');
          this.button.disabled = false;
        }
      }
    }
  );
}
