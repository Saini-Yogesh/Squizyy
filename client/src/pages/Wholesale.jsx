import React, { useState } from 'react';
import { submitWholesale } from '../services/api';

const Wholesale = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, message: '' });
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, message: '' });
    try {
      const res = await submitWholesale(formData);
      setStatus({
        loading: false,
        success: true,
        message: res.message || 'Thank you! Your wholesale application has been submitted. Our team will review it within 1-2 business days.'
      });
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
    } catch {
      setStatus({
        loading: false,
        success: false,
        message: 'There was an issue submitting your inquiry. Please try again.'
      });
    }
  };

  const faqs = [
    {
      q: 'What is Drizzy?',
      a: 'Drizzy is 100% natural peanut butter, made from just peanuts and a splash of peanut oil. Our signature squeeze bottle has no added sugar, no palm oil, and no stabilizers. Just shake, squeeze and drizzle to enjoy.'
    },
    {
      q: 'Is Drizzy vegan & gluten free?',
      a: 'Yes! Drizzy is made from 100% American peanuts and a splash of peanut oil, making it naturally vegan and gluten-free.'
    },
    {
      q: 'How does shipping work?',
      a: 'We ship wholesale cases directly from our fulfillment centers across the United States. Typical freight transit takes 2-4 business days.'
    },
    {
      q: 'What are minimum order quantities (MOQ)?',
      a: 'Our standard wholesale entry tier begins with single case packs (6 units), up to multi-pallet shipments for large grocery and cafe partners.'
    }
  ];

  return (
    <div className="w-full">
      {/* 1. Hero with Box */}
      <div id="shopify-section-template--22221105660075__hero_with_box_6kyLGW" className="shopify-section">
        <section className="bg-background bg-gradient text-foreground color-scheme-1 pt-6 pb-0 lg:pt-6 lg:pb-0 px-3 lg:px-4">
          <div className="relative w-full h-[28.125rem] mb-16 lg:mb-6 flex items-end justify-center px-3 max-w-[87.5rem] mx-auto">
            {/* Background image container */}
            <div className="absolute w-full h-full inset-0 rounded-3xl lg:rounded-[40px] overflow-hidden z-0">
              <img
                src="/assets/images/wholesale-hero.png"
                alt="Wholesale banner"
                className="aspect-auto w-full object-cover hidden lg:block w-full h-full"
              />
              <img
                src="/assets/images/wholesale-hero-mobile.png"
                alt="Wholesale banner mobile"
                className="aspect-auto w-full object-cover block lg:hidden w-full h-full"
              />
            </div>

            {/* Overlapping Hero Card */}
            <div className="relative z-[1] w-full lg:max-w-[932px] flex flex-col justify-center items-center text-center bg-cream space-y-3 rounded-[32px] px-6 py-8 lg:p-10 border-4 border-b-8 border-dark-brown -mb-16 lg:-mb-6 shadow-2xl text-dark-brown">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-champ uppercase text-dark-brown">
                Partner with Drizzy
              </h1>
              <p className="text-sm sm:text-base lg:text-lg font-body text-dark-brown/90 max-w-xl">
                Partner with a brand that values quality and simplicity. Tell us about your store and let’s grow together.
              </p>
              <div className="flex flex-col items-center gap-2 pt-2">
                <p className="text-xs font-mono text-dark-brown/75">
                  Already a partner?{' '}
                  <a href="#contact_form" className="underline font-bold text-dark-brown">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 2. Logos Marquee */}
      <div id="shopify-section-template--22221105660075__logos_marquee_8ytKhE" className="shopify-section">
        <section className="text-dark-brown bg-cream pt-14 pb-8 overflow-hidden border-b-2 border-dark-brown/15">
          <div className="flex overflow-hidden select-none">
            <div className="flex justify-around flex-shrink-0 min-w-full animate-marquee">
              <div className="flex items-center gap-4 pr-[60px]">
                <img src="/assets/images/aussie.png" alt="Aussie owned" className="h-10 w-10 lg:h-14 lg:w-14 object-contain" />
                <p className="text-lg lg:text-xl font-champ uppercase text-dark-brown">Aussie owned</p>
              </div>
              <div className="flex items-center gap-4 pr-[60px]">
                <img src="/assets/images/smile.png" alt="Ultra-Smooth Drizzle" className="h-10 w-10 lg:h-14 lg:w-14 object-contain" />
                <p className="text-lg lg:text-xl font-champ uppercase text-dark-brown">Ultra-Smooth Drizzle</p>
              </div>
              <div className="flex items-center gap-4 pr-[60px]">
                <img src="/assets/images/zero-sugar.png" alt="Zero added sugar" className="h-10 w-10 lg:h-14 lg:w-14 object-contain" />
                <p className="text-lg lg:text-xl font-champ uppercase text-dark-brown">Zero added sugar</p>
              </div>
              <div className="flex items-center gap-4 pr-[60px]">
                <img src="/assets/images/natural-fuel.png" alt="Natural fuel" className="h-10 w-10 lg:h-14 lg:w-14 object-contain" />
                <p className="text-lg lg:text-xl font-champ uppercase text-dark-brown">Natural fuel</p>
              </div>
            </div>
            <div className="flex justify-around flex-shrink-0 min-w-full animate-marquee" aria-hidden="true">
              <div className="flex items-center gap-4 pr-[60px]">
                <img src="/assets/images/aussie.png" alt="Aussie owned" className="h-10 w-10 lg:h-14 lg:w-14 object-contain" />
                <p className="text-lg lg:text-xl font-champ uppercase text-dark-brown">Aussie owned</p>
              </div>
              <div className="flex items-center gap-4 pr-[60px]">
                <img src="/assets/images/smile.png" alt="Ultra-Smooth Drizzle" className="h-10 w-10 lg:h-14 lg:w-14 object-contain" />
                <p className="text-lg lg:text-xl font-champ uppercase text-dark-brown">Ultra-Smooth Drizzle</p>
              </div>
              <div className="flex items-center gap-4 pr-[60px]">
                <img src="/assets/images/zero-sugar.png" alt="Zero added sugar" className="h-10 w-10 lg:h-14 lg:w-14 object-contain" />
                <p className="text-lg lg:text-xl font-champ uppercase text-dark-brown">Zero added sugar</p>
              </div>
              <div className="flex items-center gap-4 pr-[60px]">
                <img src="/assets/images/natural-fuel.png" alt="Natural fuel" className="h-10 w-10 lg:h-14 lg:w-14 object-contain" />
                <p className="text-lg lg:text-xl font-champ uppercase text-dark-brown">Natural fuel</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 3. Customer Form (Be one of the first to stock Drizzy) */}
      <div id="shopify-section-template--22221105660075__customer_form_3VHj8A" className="shopify-section">
        <section className="bg-background text-foreground color-scheme-1 py-12 lg:py-16">
          <div className="container flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-0 mx-auto px-4 max-w-[87.5rem]">
            {/* Left Image with Mascot */}
            <div className="relative z-[1] w-full lg:max-w-[40%] lg:-mr-10">
              <div className="w-full aspect-[3/4] lg:aspect-[562/818] rounded-3xl border-4 border-dark-brown overflow-hidden bg-cream shadow-xl">
                <img
                  src="/assets/images/wholesale-form.png"
                  alt="Wholesale Drizzy jars"
                  className="aspect-auto w-full object-cover w-full h-full"
                />
              </div>
              <div className="absolute w-[125px] lg:w-[195px] left-[-18px] lg:left-[-69px] -bottom-6 lg:-bottom-10 pointer-events-none">
                <img
                  src="/assets/images/peanut-man.png"
                  alt="peanut mascot"
                  className="aspect-auto w-full object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Right Form Card */}
            <div className="relative z-[2] bg-cream lg:max-w-[55%] w-full rounded-3xl lg:rounded-[32px] border-4 border-b-8 border-dark-brown p-6 lg:p-10 shadow-2xl text-dark-brown">
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-champ uppercase text-dark-brown">
                  Be one of the first to stock Drizzy.
                </h3>
                <div className="text-sm lg:text-base font-body leading-relaxed text-dark-brown/90 space-y-2">
                  <p>We're partnering with select stores who care about quality, natural products and seriously smooth peanut butter.</p>
                  <p>Tell us where you’re from and we’ll be in touch.</p>
                </div>
              </div>

              {status.success ? (
                <div className="mt-8 p-6 bg-[#ca9af1]/30 border-2 border-dark-brown rounded-2xl text-center">
                  <p className="font-champ text-2xl uppercase text-dark-brown mb-2">🎉 Application Sent!</p>
                  <p className="font-mono text-sm text-dark-brown">{status.message}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="contact_form" className="mt-6 lg:mt-8 space-y-5">
                  {status.message && (
                    <div className="p-4 bg-red-100 border-2 border-red-700 rounded-xl text-xs font-mono text-red-900">
                      {status.message}
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-champ text-xs uppercase text-dark-brown">Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-dark-brown rounded px-4 py-3 text-xs font-mono text-dark-brown focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-champ text-xs uppercase text-dark-brown">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@somemail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-dark-brown rounded px-4 py-3 text-xs font-mono text-dark-brown focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-champ text-xs uppercase text-dark-brown">Company *</label>
                      <input
                        type="text"
                        required
                        placeholder="your company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-white border border-dark-brown rounded px-4 py-3 text-xs font-mono text-dark-brown focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-champ text-xs uppercase text-dark-brown">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="your contact"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-dark-brown rounded px-4 py-3 text-xs font-mono text-dark-brown focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-2 lg:col-span-2">
                      <label className="font-champ text-xs uppercase text-dark-brown">Message</label>
                      <textarea
                        rows={5}
                        placeholder="tell us about your business"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white border border-dark-brown rounded px-4 py-3 text-xs font-mono text-dark-brown focus:outline-none resize-none"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col items-center gap-3 lg:max-w-[70%] mx-auto pt-2">
                    <button
                      type="submit"
                      disabled={status.loading}
                      className="!w-full inline-flex text-nowrap transition-colors duration-200 ease-out items-center justify-center cursor-pointer no-underline uppercase rounded-[100px] text-[16px] lg:text-[20px] font-champ py-4 px-6 bg-accent-purple text-dark-brown border-2 border-dark-brown hover:bg-cream disabled:opacity-80 button-primary"
                    >
                      {status.loading ? 'Submitting...' : 'Submit form'}
                    </button>
                    <p className="text-xs font-mono text-dark-brown/70 text-center">
                      Applications are reviewed within 1-2 business days.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* 4. Heading with Image (Aug 24, stocked nation-wide at Sprouts) */}
      <div id="shopify-section-template--22221105660075__heading_with_image_cLzkQB" className="shopify-section">
        <section className="relative bg-cream text-dark-brown py-12 overflow-hidden border-y-2 border-dark-brown/15">
          <div className="container flex flex-col lg:flex-row gap-6 lg:gap-12 items-center justify-center mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-champ uppercase text-center text-dark-brown">
              Aug 24, stocked nation-wide at
            </h2>
            <div className="h-[68px] w-auto">
              <img
                src="/assets/images/sprouts-market.png"
                alt="Sprouts Farmers Market"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        </section>
      </div>

      {/* 5. FAQ with Image */}
      <div id="shopify-section-template--22221105660075__faq_with_image_Bmpn8L" className="shopify-section">
        <section id="faqs-section" className="relative w-full bg-dark-brown text-cream overflow-hidden">
          {/* Top Cream Drip */}
          <div className="w-full relative z-[1]">
            <img
              src="/assets/images/timeline-drip.svg"
              alt="drip"
              className="w-full object-cover hidden md:block aspect-auto"
            />
            <img
              src="/assets/images/timeline-drip-mobile.svg"
              alt="drip"
              className="w-full object-cover md:hidden aspect-auto"
            />
          </div>

          <div className="relative w-full pb-16 lg:pb-24 pt-6 max-w-[87.5rem] mx-auto px-4 lg:px-6">
            {/* Background FAQ illustration (bottle dripping) */}
            <div className="absolute top-0 right-0 max-w-[50vw] lg:max-w-[38vw] pointer-events-none z-0">
              <img
                src="/assets/images/faq-bg.png"
                alt="FAQ bottle background"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="container relative z-[1] mx-auto max-w-4xl">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-champ uppercase text-cream mb-8 leading-tight">
                <p>You Got Questions.</p>
                <p>We Got Answers.</p>
              </div>

              {/* Cream Accordion Card with Dark Brown Text */}
              <div className="bg-cream text-dark-brown px-5 lg:px-8 py-4 rounded-[24px] lg:rounded-[32px] border-4 border-b-8 border-dark-brown shadow-2xl">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className={`border-b border-dashed border-dark-brown/25 last:border-b-0 py-5 transition-all ${
                        isOpen ? 'pb-6' : ''
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between text-left font-champ text-lg lg:text-xl uppercase text-dark-brown gap-4 cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <span className={`transform transition-transform duration-200 text-xl font-bold ${isOpen ? 'rotate-180' : ''}`}>
                          ↓
                        </span>
                      </button>
                      {isOpen && (
                        <div className="mt-4 text-sm lg:text-base font-body text-dark-brown/90 leading-relaxed font-normal">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Wholesale;
