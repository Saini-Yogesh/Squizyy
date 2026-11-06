/**
 * Squizyy Shopify Theme — Global Interactive Features
 */

const initSquizyyApp = () => {
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
    // If the customer just submitted the form successfully, keep modal open displaying the discount code
    if (modal.querySelector('.screen-success-box') || window.location.search.includes('customer_posted=true')) {
      modal.classList.add('active');
    } else {
      let hasSeenModal = false;
      try {
        hasSeenModal = localStorage.getItem('squizyy_newsletter_seen') === 'true';
      } catch (e) {}

      if (!hasSeenModal) {
        setTimeout(() => {
          modal.classList.add('active');
        }, 5000);
      }
    }

    const closeModal = () => {
      modal.classList.remove('active');
      try {
        localStorage.setItem('squizyy_newsletter_seen', 'true');
      } catch (e) {}
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.id === 'RetroModalDismiss') closeModal();
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
};

// Execute immediately if DOM is already ready, otherwise on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSquizyyApp);
} else {
  initSquizyyApp();
}
