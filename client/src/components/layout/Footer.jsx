import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscribeNewsletter } from '../../services/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus({ state: 'error', message: 'Please enter a valid email address.' });
      return;
    }
    try {
      setStatus({ state: 'loading', message: '' });
      await subscribeNewsletter(email);
      setStatus({ state: 'success', message: 'Thanks for subscribing to Drizzy!' });
      setEmail('');
    } catch (err) {
      setStatus({ state: 'success', message: 'Thanks for subscribing to Drizzy!' });
      setEmail('');
    }
  };

  return (
    <footer id="shopify-section-sections--22221105135787__footer_BGPBbi" className="shopify-section shopify-section-group-footer-group relative overflow-hidden">
      <section
        className="relative text-foreground color-scheme-1 pb-10 lg:pb-14 overflow-hidden"
        style={{
          '--spacing-top': '0.0rem',
          '--spacing-bottom': '3.75rem',
          '--spacing-top-mobile': '0.0rem',
          '--spacing-bottom-mobile': '2.5rem',
        }}
      >
        {/* Pastel Colorful Gradient Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/assets/images/footer-bg.png"
            alt="drizzy footer background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Dripping Graphic at top of footer */}
        <div className="relative z-[1] w-full">
          <img
            src="/assets/images/footer-drip.svg"
            alt="footer drip"
            className="w-full object-cover hidden lg:block aspect-auto"
          />
          <img
            src="/assets/images/timeline-drip-mobile.svg"
            alt="footer drip"
            className="w-full object-cover lg:hidden aspect-auto"
          />
        </div>

        {/* Main Footer Cards Container */}
        <div className="relative z-[1] container max-w-[87.5rem] mx-auto px-4 lg:px-6 pt-4 lg:pt-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            {/* Card 1: Sign up & save 10% */}
            <div className="lg:w-[35%] bg-cream border-4 border-b-8 border-dark-brown px-6 py-8 lg:px-8 lg:py-10 flex flex-col justify-center rounded-3xl lg:rounded-[32px] shadow-sm">
              <h2 className="text-heading3 font-primary text-dark-brown">
                Sign up & save 10%
              </h2>
              <p className="text-body4 lg:text-body3 mt-2 text-dark-brown font-mono">
                Subscribe to our newsletter and get first access to new releases & exclusive deals.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col gap-4 mt-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                  className="text-caption lg:text-body3 h-[49px] lg:h-[54px] border-2 border-dark-brown bg-cream p-4 rounded-lg placeholder:text-dark-brown/60 text-dark-brown font-mono focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status.state === 'loading'}
                  className="button-primary !w-full py-4 text-sm lg:text-base font-primary uppercase"
                >
                  {status.state === 'loading' ? 'Joining...' : 'Get my 10% off'}
                </button>
              </form>

              {status.message && (
                <p className={`text-xs font-mono font-bold mt-2 ${status.state === 'error' ? 'text-red-600' : 'text-accent-green'}`}>
                  {status.message}
                </p>
              )}
            </div>

            {/* Card 2: Get Drizzy with it */}
            <div className="grow bg-cream border-4 border-b-8 border-dark-brown px-6 py-8 lg:p-10 rounded-3xl lg:rounded-[32px] shadow-sm">
              <h2 className="text-heading2 lg:text-heading1 font-primary text-dark-brown">
                Get Drizzy with it
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 lg:mt-10">
                <div>
                  <ul className="list-none space-y-4 lg:space-y-6 font-mono text-xs lg:text-sm">
                    <li>
                      <Link to="/products/drizzy-squeezy-peanut-butter-19-4-oz" className="text-dark-brown hover:underline block w-fit">
                        Shop Drizzy
                      </Link>
                    </li>
                    <li>
                      <Link to="/pages/our-story" className="text-dark-brown hover:underline block w-fit">
                        Our Story
                      </Link>
                    </li>
                    <li>
                      <Link to="/pages/wholesale" className="text-dark-brown hover:underline block w-fit">
                        Wholesale
                      </Link>
                    </li>
                    <li>
                      <Link to="/pages/sproutslaunchwinflightstoaustralia" className="text-dark-brown hover:underline block w-fit">
                        Win Flights to Australia
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <ul className="list-none space-y-4 lg:space-y-6 font-mono text-xs lg:text-sm">
                    <li>
                      <Link to="/policies/privacy-policy" className="text-dark-brown hover:underline block w-fit">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/policies/terms-of-service" className="text-dark-brown hover:underline block w-fit">
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-mono text-xs lg:text-sm mb-4 text-dark-brown font-bold uppercase">
                    Follow Us On
                  </h3>
                  <ul className="list-none flex gap-6 items-center">
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.instagram.com/getdrizzy/"
                        className="inline-flex items-center justify-center w-6 h-6 hover:opacity-75 transition-opacity"
                        aria-label="Instagram"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 17.7383 21.3889 19.2135 20.3012 20.3012C19.2135 21.3889 17.7383 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 6.26174 2.61107 4.78649 3.69878 3.69878C4.78649 2.61107 6.26174 2 7.8 2ZM7.6 4C6.64522 4 5.72955 4.37928 5.05442 5.05442C4.37928 5.72955 4 6.64522 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C17.3548 20 18.2705 19.6207 18.9456 18.9456C19.6207 18.2705 20 17.3548 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.5815 5.5 17.8995 5.6317 18.1339 5.86612C18.3683 6.10054 18.5 6.41848 18.5 6.75C18.5 7.08152 18.3683 7.39946 18.1339 7.63388C17.8995 7.8683 17.5815 8 17.25 8C16.9185 8 16.6005 7.8683 16.3661 7.63388C16.1317 7.39946 16 7.08152 16 6.75C16 6.41848 16.1317 6.10054 16.3661 5.86612C16.6005 5.6317 16.9185 5.5 17.25 5.5ZM12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z" fill="#2D0F28"/>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.linkedin.com/company/drizzypeanuts/"
                        className="inline-flex items-center justify-center w-6 h-6 hover:opacity-75 transition-opacity"
                        aria-label="LinkedIn"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.5 0H1.5C0.67 0 0 0.67 0 1.5V22.5C0 23.33 0.67 24 1.5 24H22.5C23.33 24 24 23.33 24 22.5V1.5C24 0.67 23.33 0 22.5 0ZM7.73 20.39H4.61V9.37H7.73V20.39ZM6.17 8.01C5.17 8.01 4.36 7.2 4.36 6.2C4.36 5.2 5.17 4.39 6.17 4.39C7.17 4.39 7.98 5.2 7.98 6.2C7.98 7.2 7.17 8.01 6.17 8.01ZM20.39 20.39H17.28V14.25C17.28 12.75 16.74 11.73 15.39 11.73C14.36 11.73 13.75 12.42 13.48 13.09C13.38 13.33 13.36 13.67 13.36 14.01V20.39H10.25V9.37H13.24V10.74C13.64 10.12 14.36 9.24 15.96 9.24C17.98 9.24 19.5 10.56 19.5 13.4V20.39H20.39Z" fill="#2D0F28"/>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.tiktok.com/@getdrizzypeanuts"
                        className="inline-flex items-center justify-center w-6 h-6 hover:opacity-75 transition-opacity"
                        aria-label="TikTok"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10.6785 9.57C7.73422 9.428 5.68755 10.4777 4.53855 12.719C2.81555 16.0815 4.23955 21.5835 9.98855 21.5835C15.7386 21.5835 15.9045 16.0275 15.9045 15.4455V8.9375C17.1345 9.71617 18.1712 10.185 19.0145 10.344C19.8589 10.5027 20.3955 10.573 20.6245 10.555V7.317C19.8439 7.223 19.1689 7.04367 18.5996 6.779C17.7451 6.382 16.0515 5.2805 16.0515 3.666C16.0525 3.674 16.0525 3.2575 16.0515 2.4165H12.4925C12.4822 10.3245 12.4822 14.6675 12.4925 15.4455C12.508 16.6125 11.6025 18.2455 9.76755 18.2455C7.93155 18.2455 7.02605 16.614 7.02605 15.562C7.02605 14.918 7.24755 13.9845 8.16205 13.293C8.70455 12.883 9.45705 12.719 10.6785 12.719V9.57Z"
                            fill="#2D0F28"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Giant Centered Logo & Copyright */}
          <div className="w-full flex flex-col items-center text-center gap-6 mt-8 lg:mt-[60px]">
            <div className="w-full px-2">
              <img
                src="/assets/images/drizzy-dark-logo.svg"
                alt="DRIZZY"
                className="w-full h-auto max-h-[120px] lg:max-h-[160px] object-contain mx-auto"
              />
            </div>
            <div className="text-body4 lg:text-body3 text-dark-brown/80 font-mono">
              © Drizzy Pty Limited, 2026. All Rights Reserved.
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
