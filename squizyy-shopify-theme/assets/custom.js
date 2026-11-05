/**
 * Squizyy Shopify Theme — Global Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation
  const menuToggles = document.querySelectorAll('[data-mobile-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const mobileMenuOverlay = document.querySelector('[data-mobile-menu-overlay]');

  if (menuToggles.length > 0 && mobileMenu) {
    const toggleMenu = () => {
      const isOpen = mobileMenu.classList.contains('active');
      if (isOpen) {
        mobileMenu.classList.remove('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.add('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    };

    menuToggles.forEach((btn) => btn.addEventListener('click', toggleMenu));
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', toggleMenu);
  }

  // 2. Retro TV Newsletter Modal with Cookie Suppression
  const modal = document.getElementById('RetroNewsletterModal');
  const modalClose = document.getElementById('RetroModalClose');
  const modalLauncher = document.getElementById('NewsletterLauncher');

  if (modal) {
    const hasSeenModal = localStorage.getItem('squizyy_newsletter_seen');

    if (!hasSeenModal) {
      setTimeout(() => {
        modal.classList.add('active');
      }, 5000);
    }

    const closeModal = () => {
      modal.classList.remove('active');
      localStorage.setItem('squizyy_newsletter_seen', 'true');
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    if (modalLauncher) {
      modalLauncher.addEventListener('click', () => {
        modal.classList.add('active');
      });
    }
  }

  // 3. Instagram Feed Carousel Scroll Arrows
  const instaGrid = document.querySelector('[data-insta-grid]');
  const prevBtn = document.querySelector('[data-insta-prev]');
  const nextBtn = document.querySelector('[data-insta-next]');

  if (instaGrid && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      instaGrid.scrollBy({ left: -320, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      instaGrid.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  // 4. Global Accordion Controller (Single-Open / Exclusive Accordion)
  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-accordion-toggle]');
    if (!toggle) return;

    e.preventDefault();
    const currentItem = toggle.closest('.faq-item') || toggle.closest('.accordion-item');
    if (!currentItem) return;

    const parentList = currentItem.closest('.faq-accordion-list') || currentItem.closest('.pdp-accordions') || currentItem.parentElement;
    const isAlreadyOpen = currentItem.classList.contains('open');

    // Close all other open sibling items in the same container
    if (parentList) {
      const allSiblings = parentList.querySelectorAll('.faq-item, .accordion-item');
      allSiblings.forEach((sibling) => {
        if (sibling !== currentItem) {
          sibling.classList.remove('open');
          const siblingToggle = sibling.querySelector('[data-accordion-toggle]');
          if (siblingToggle) siblingToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Toggle current item: if already open, close it; if closed, open it
    if (isAlreadyOpen) {
      currentItem.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      currentItem.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  // 5. Ajax Newsletter Form Enhancement (Footer & Popup)
  const setupNewsletterForm = (form) => {
    if (!form || form.dataset.ajaxAttached) return;
    form.dataset.ajaxAttached = 'true';

    form.addEventListener('submit', async (e) => {
      if (!form.checkValidity()) return;
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'SUBSCRIBING...';
      }

      try {
        const formData = new FormData(form);
        const actionUrl = form.getAttribute('action') || '/contact';

        await fetch(actionUrl, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'text/html' }
        });

        if (form.classList.contains('footer-form')) {
          form.innerHTML = `
            <div class="footer-success-box">
              <p class="footer-status-success">🎉 Sweet! Check your email for your 10% discount code.</p>
              <div class="footer-discount-pill">
                <span class="footer-discount-label">USE CODE:</span>
                <strong class="footer-discount-code">WELCOME10</strong>
                <button type="button" class="footer-copy-code-btn" onclick="navigator.clipboard.writeText('WELCOME10'); this.innerText='COPIED!';">COPY</button>
              </div>
            </div>
          `;
        } else if (form.classList.contains('retro-newsletter-form')) {
          form.innerHTML = `
            <div style="margin-top: 1rem; text-align: center;">
              <p style="font-family: var(--font-secondary, monospace); font-size: 0.875rem; color: #036e2c; font-weight: 700; margin: 0 0 0.5rem 0;">🎉 Sweet! You're in!</p>
              <p style="font-family: var(--font-secondary, monospace); font-size: 0.8125rem; color: #2d0f28; margin: 0;">Use discount code <strong>WELCOME10</strong> at checkout.</p>
            </div>
          `;
        }
      } catch (err) {
        form.submit();
      }
    });
  };

  document.querySelectorAll('.footer-form, .retro-newsletter-form').forEach(setupNewsletterForm);
});
