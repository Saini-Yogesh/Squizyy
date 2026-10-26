/**
 * Squizyy Shopify Theme — Global Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation
  const menuToggle = document.querySelector('[data-mobile-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const mobileMenuOverlay = document.querySelector('[data-mobile-menu-overlay]');

  if (menuToggle && mobileMenu) {
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

    menuToggle.addEventListener('click', toggleMenu);
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

  // 4. Store Locator Search Filter
  const storeSearch = document.getElementById('StoreLocatorSearch');
  const storeList = document.getElementById('StoreLocatorList');
  if (storeSearch && storeList) {
    storeSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const cards = storeList.querySelectorAll('.store-card');
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
});
