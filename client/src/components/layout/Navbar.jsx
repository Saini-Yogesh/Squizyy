import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, itemCount } = useCart();

  const getNavLinkClass = ({ isActive }) => 
    `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`;

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.container}>
            <div className={styles.bar}>
              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                id="menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={styles.mobileToggle}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 13.4L7.1 18.3C6.9 18.5 6.7 18.6 6.4 18.6C6.1 18.6 5.9 18.5 5.7 18.3C5.5 18.1 5.4 17.9 5.4 17.6C5.4 17.3 5.5 17.1 5.7 16.9L10.6 12L5.7 7.1C5.5 6.9 5.4 6.7 5.4 6.4C5.4 6.1 5.5 5.9 5.7 5.7C5.9 5.5 6.1 5.4 6.4 5.4C6.7 5.4 6.9 5.5 7.1 5.7L12 10.6L16.9 5.7C17.1 5.5 17.3 5.4 17.6 5.4C17.9 5.4 18.1 5.5 18.3 5.7C18.5 5.9 18.6 6.1 18.6 6.4C18.6 6.7 18.5 6.9 18.3 7.1L13.4 12L18.3 16.9C18.5 17.1 18.6 17.3 18.6 17.6C18.6 17.9 18.5 18.1 18.3 18.3C18.1 18.5 17.9 18.6 17.6 18.6C17.3 18.6 17.1 18.5 16.9 18.3L12 13.4Z"
                      fill="#2D0F28"
                    />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 18H20C20.55 18 21 17.55 21 17C21 16.45 20.55 16 20 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18ZM4 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13ZM3 7C3 7.55 3.45 8 4 8H20C20.55 8 21 7.55 21 7C21 6.45 20.55 6 20 6H4C3.45 6 3 6.45 3 7Z"
                      fill="#2D0F28"
                    />
                  </svg>
                )}
              </button>

              {/* Mobile Center Brand Logo */}
              <Link to="/" className={styles.mobileLogo} aria-label="Drizzy USA logo">
                <img
                  src="/assets/images/drizzy-dark-logo.svg"
                  alt="Drizzy USA"
                  className={styles.mobileLogoImg}
                />
              </Link>

              {/* Desktop Full Navigation */}
              <nav className={styles.desktopNav} aria-label="Main Navigation">
                {/* Left Nav Links */}
                <div className={styles.navGroupLeft}>
                  <NavLink to="/" className={getNavLinkClass}>
                    Home
                  </NavLink>
                  <NavLink to="/pages/our-story" className={getNavLinkClass}>
                    Our Story
                  </NavLink>
                  <NavLink to="/pages/store-locator" className={getNavLinkClass}>
                    Stockists
                  </NavLink>
                </div>

                {/* Center Brand Logo */}
                <Link to="/" className={styles.desktopLogo} aria-label="Drizzy USA logo">
                  <img
                    src="/assets/images/drizzy-dark-logo.svg"
                    alt="Drizzy USA"
                    className={styles.desktopLogoImg}
                  />
                </Link>

                {/* Right Links & Actions */}
                <div className={styles.navGroupRight}>
                  <NavLink to="/pages/wholesale" className={getNavLinkClass}>
                    Wholesale
                  </NavLink>

                  <Link
                    to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                    className={styles.buyNowBtn}
                  >
                    BUY DRIZZY NOW
                  </Link>

                  {/* Desktop Cart Trigger */}
                  <button
                    type="button"
                    onClick={openCart}
                    className={styles.cartTriggerDesktop}
                    aria-label={`Cart with ${itemCount} items`}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.25 20.25C8.66421 20.25 9 19.9142 9 19.5C9 19.0858 8.66421 18.75 8.25 18.75C7.83579 18.75 7.5 19.0858 7.5 19.5C7.5 19.9142 7.83579 20.25 8.25 20.25Z"
                        stroke="#2D0F28"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M18.75 20.25C19.1642 20.25 19.5 19.9142 19.5 19.5C19.5 19.0858 19.1642 18.75 18.75 18.75C18.3358 18.75 18 19.0858 18 19.5C18 19.9142 18.3358 20.25 18.75 20.25Z"
                        stroke="#2D0F28"
                        strokeWidth="1.5"
                      />
                      <path d="M2.25 3.75H5.25L7.5 16.5H19.5" stroke="#2D0F28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M7.5 13.5H19.1925C19.2792 13.5001 19.3633 13.4701 19.4304 13.4151C19.4975 13.3601 19.5434 13.2836 19.5605 13.1986L20.9105 6.44859C20.9214 6.39417 20.92 6.338 20.9066 6.28414C20.8931 6.23029 20.8679 6.18009 20.8327 6.13717C20.7975 6.09426 20.7532 6.05969 20.703 6.03597C20.6528 6.01225 20.598 5.99996 20.5425 6H6"
                        stroke="#2D0F28"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {itemCount > 0 && (
                      <span className={styles.cartBadge}>{itemCount}</span>
                    )}
                  </button>
                </div>
              </nav>

              {/* Mobile Right Cart Button */}
              <div className={styles.mobileActions}>
                <button
                  type="button"
                  onClick={openCart}
                  className={styles.cartTriggerMobile}
                  aria-label={`Cart with ${itemCount} items`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.25 20.25C8.66421 20.25 9 19.9142 9 19.5C9 19.0858 8.66421 18.75 8.25 18.75C7.83579 18.75 7.5 19.0858 7.5 19.5C7.5 19.9142 7.83579 20.25 8.25 20.25Z"
                      stroke="#2D0F28"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M18.75 20.25C19.1642 20.25 19.5 19.9142 19.5 19.5C19.5 19.0858 19.1642 18.75 18.75 18.75C18.3358 18.75 18 19.0858 18 19.5C18 19.9142 18.3358 20.25 18.75 20.25Z"
                      stroke="#2D0F28"
                      strokeWidth="1.5"
                    />
                    <path d="M2.25 3.75H5.25L7.5 16.5H19.5" stroke="#2D0F28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M7.5 13.5H19.1925C19.2792 13.5001 19.3633 13.4701 19.4304 13.4151C19.4975 13.3601 19.5434 13.2836 19.5605 13.1986L20.9105 6.44859C20.9214 6.39417 20.92 6.338 20.9066 6.28414C20.8931 6.23029 20.8679 6.18009 20.8327 6.13717C20.7975 6.09426 20.7532 6.05969 20.703 6.03597C20.6528 6.01225 20.598 5.99996 20.5425 6H6"
                      stroke="#2D0F28"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {itemCount > 0 && (
                    <span className={styles.cartBadge}>{itemCount}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Accordion Menu */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <nav className={styles.mobileNav}>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={styles.mobileNavLink}
              >
                Home
              </Link>
              <Link
                to="/pages/our-story"
                onClick={() => setMobileMenuOpen(false)}
                className={styles.mobileNavLink}
              >
                Our Story
              </Link>
              <Link
                to="/pages/store-locator"
                onClick={() => setMobileMenuOpen(false)}
                className={styles.mobileNavLink}
              >
                Stockists
              </Link>
              <Link
                to="/pages/wholesale"
                onClick={() => setMobileMenuOpen(false)}
                className={styles.mobileNavLink}
              >
                Wholesale
              </Link>
              <Link
                to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                onClick={() => setMobileMenuOpen(false)}
                className={styles.mobileBuyNow}
              >
                Buy Drizzy Now
              </Link>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
