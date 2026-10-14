import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, itemCount } = useCart();
  const location = useLocation();

  return (
    <div
      id="shopify-section-sections--22221105168555__aee8d273-a723-4121-98fe-3e6743d9dbc4"
      className="shopify-section shopify-section-group-header-group relative z-30"
    >
      <header
        id="shopify-section-header"
        className="transition-transform !duration-300 !ease-in-out w-full bg-background text-foreground color-scheme-1"
        style={{
          '--spacing-top': '1.5rem',
          '--spacing-bottom': '1.5rem',
          '--spacing-top-mobile': '0.875rem',
          '--spacing-bottom-mobile': '0.875rem',
        }}
      >
        <div className="relative w-full pt-[0.875rem] pb-[0.875rem] lg:pt-[1.5rem] lg:pb-[1.5rem]">
          <div className="px-4 lg:px-6 flex">
            <div className="w-full flex gap-0 items-center justify-between">
              {/* Mobile Menu Toggle Button */}
              <button
                id="menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex justify-center items-center w-8 h-8 p-1 text-foreground cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.9998 13.4L7.0998 18.3C6.91647 18.4834 6.68314 18.575 6.3998 18.575C6.11647 18.575 5.88314 18.4834 5.6998 18.3C5.51647 18.1167 5.4248 17.8834 5.4248 17.6C5.4248 17.3167 5.51647 17.0834 5.6998 16.9L10.5998 12L5.6998 7.10005C5.51647 6.91672 5.4248 6.68338 5.4248 6.40005C5.4248 6.11672 5.51647 5.88338 5.6998 5.70005C5.88314 5.51672 6.11647 5.42505 6.3998 5.42505C6.68314 5.42505 6.91647 5.51672 7.0998 5.70005L11.9998 10.6L16.8998 5.70005C17.0831 5.51672 17.3165 5.42505 17.5998 5.42505C17.8831 5.42505 18.1165 5.51672 18.2998 5.70005C18.4831 5.88338 18.5748 6.11672 18.5748 6.40005C18.5748 6.68338 18.4831 6.91672 18.2998 7.10005L13.3998 12L18.2998 16.9C18.4831 17.0834 18.5748 17.3167 18.5748 17.6C18.5748 17.8834 18.4831 18.1167 18.2998 18.3C18.1165 18.4834 17.8831 18.575 17.5998 18.575C17.3165 18.575 17.0831 18.4834 16.8998 18.3L11.9998 13.4Z"
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
              <Link to="/" className="!outline-none !border-none block lg:hidden" aria-label="Drizzy USA logo">
                <img
                  src="/assets/images/drizzy-dark-logo.svg"
                  alt="Drizzy USA"
                  className="h-[30px] w-auto object-contain"
                />
              </Link>

              {/* Desktop Full Navigation */}
              <nav className="hidden w-full lg:flex items-center justify-between gap-8">
                {/* Left Nav Links */}
                <div className="flex items-center gap-6 basis-1/3 grow justify-end">
                  <NavLink
                    to="/"
                    className="block text-heading6 uppercase hover:opacity-75 transition-opacity text-dark-brown"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/pages/our-story"
                    className="block text-heading6 uppercase hover:opacity-75 transition-opacity text-dark-brown"
                  >
                    Our Story
                  </NavLink>
                  <NavLink
                    to="/pages/store-locator"
                    className="block text-heading6 uppercase hover:opacity-75 transition-opacity text-dark-brown"
                  >
                    Stockists
                  </NavLink>
                </div>

                {/* Center Brand Logo */}
                <Link to="/" className="!outline-none !border-none block px-4 shrink-0" aria-label="Drizzy USA logo">
                  <img
                    src="/assets/images/drizzy-dark-logo.svg"
                    alt="Drizzy USA"
                    className="h-[46px] w-auto object-contain"
                  />
                </Link>

                {/* Right Links & Actions */}
                <div className="flex items-center gap-6 basis-1/3 grow justify-start">
                  <NavLink
                    to="/pages/wholesale"
                    className="block text-heading6 uppercase hover:opacity-75 transition-opacity text-dark-brown"
                  >
                    Wholesale
                  </NavLink>

                  <Link
                    to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                    className="block !text-heading6 !py-3 uppercase inline-flex text-nowrap transition-colors duration-200 ease-out items-center justify-center cursor-pointer no-underline rounded-[100px] w-fit focus-visible:outline-none text-[16px] lg:text-[18px] font-champ leading-[100%] py-3 px-6 bg-accent-purple text-dark-brown border-2 border-dark-brown hover:bg-cream button-primary shadow-sm"
                  >
                    BUY DRIZZY NOW
                  </Link>

                  {/* Desktop Cart Trigger */}
                  <button
                    type="button"
                    onClick={openCart}
                    className="cart-drawer-trigger ml-auto flex relative justify-center items-center w-10 h-10 p-2 rounded-full border border-dark-brown bg-accent-purple cursor-pointer transition-transform hover:scale-105"
                    aria-label="cart icon"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.25 20.25C8.66421 20.25 9 19.9142 9 19.5C9 19.0858 8.66421 18.75 8.25 18.75C7.83579 18.75 7.5 19.0858 7.5 19.5C7.5 19.9142 7.83579 20.25 8.25 20.25Z"
                        stroke="#2D0F28"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.75 20.25C19.1642 20.25 19.5 19.9142 19.5 19.5C19.5 19.0858 19.1642 18.75 18.75 18.75C18.3358 18.75 18 19.0858 18 19.5C18 19.9142 18.3358 20.25 18.75 20.25Z"
                        stroke="#2D0F28"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                      <span className="absolute -top-1 -right-1 bg-dark-brown text-cream text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center font-primary border border-cream">
                        {itemCount}
                      </span>
                    )}
                  </button>
                </div>
              </nav>

              {/* Mobile Right Cart Button */}
              <div className="flex gap-3 items-center lg:hidden">
                <button
                  type="button"
                  onClick={openCart}
                  className="cart-drawer-trigger flex relative justify-center items-center w-8 h-8 p-1.5 rounded-full border border-dark-brown bg-accent-purple cursor-pointer"
                  aria-label="cart icon"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.25 20.25C8.66421 20.25 9 19.9142 9 19.5C9 19.0858 8.66421 18.75 8.25 18.75C7.83579 18.75 7.5 19.0858 7.5 19.5C7.5 19.9142 7.83579 20.25 8.25 20.25Z"
                      stroke="#2D0F28"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.75 20.25C19.1642 20.25 19.5 19.9142 19.5 19.5C19.5 19.0858 19.1642 18.75 18.75 18.75C18.3358 18.75 18 19.0858 18 19.5C18 19.9142 18.3358 20.25 18.75 20.25Z"
                      stroke="#2D0F28"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                    <span className="absolute -top-1 -right-1 bg-dark-brown text-cream text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-primary border border-cream">
                      {itemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Accordion Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden w-full bg-background border-b-2 border-dark-brown px-6 py-6 transition-all duration-200">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-heading5 uppercase py-2 border-b border-foreground/15 text-foreground"
              >
                Home
              </Link>
              <Link
                to="/pages/our-story"
                onClick={() => setMobileMenuOpen(false)}
                className="text-heading5 uppercase py-2 border-b border-foreground/15 text-foreground"
              >
                Our Story
              </Link>
              <Link
                to="/pages/store-locator"
                onClick={() => setMobileMenuOpen(false)}
                className="text-heading5 uppercase py-2 border-b border-foreground/15 text-foreground"
              >
                Stockists
              </Link>
              <Link
                to="/pages/wholesale"
                onClick={() => setMobileMenuOpen(false)}
                className="text-heading5 uppercase py-2 border-b border-foreground/15 text-foreground"
              >
                Wholesale
              </Link>
              <Link
                to="/products/drizzy-squeezy-peanut-butter-19-4-oz"
                onClick={() => setMobileMenuOpen(false)}
                className="button-primary text-center py-3 text-base mt-2"
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
