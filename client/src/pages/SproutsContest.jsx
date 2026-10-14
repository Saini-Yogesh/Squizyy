import React, { useState } from 'react';
import { submitContest } from '../services/api';

const SproutsContest = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    agreedRules: false,
    newsletterOptIn: true,
    receiptFile: null
  });

  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState({ loading: false, success: false, message: '' });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setForm((prev) => ({ ...prev, receiptFile: e.target.files[0].name }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agreedRules) {
      alert('You must accept the Official Rules & Eligibility Terms to enter.');
      return;
    }
    setStatus({ loading: true, success: false, message: '' });
    try {
      const res = await submitContest({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        agreedRules: true,
        newsletterOptIn: form.newsletterOptIn,
        receiptFile: fileName || 'receipt_sprouts.jpg'
      });
      setStatus({
        loading: false,
        success: true,
        message: res.message || 'Congratulations! You are officially entered into the draw to win flights to Australia.'
      });
      setForm({ firstName: '', lastName: '', email: '', agreedRules: false, newsletterOptIn: true, receiptFile: null });
      setFileName('');
    } catch {
      setStatus({
        loading: false,
        success: false,
        message: 'Error submitting your entry. Please check your connection and try again.'
      });
    }
  };

  return (
    <div className="w-full">
      {/* 1. Promotion Hero */}
      <div id="shopify-section-template--22264299061419__promotion_hero_Ai7cpk" className="shopify-section">
        <section
          className="bg-background bg-gradient text-foreground color-scheme-1 pt-[4.25rem] pb-[1.5rem] lg:pt-[1.5rem] lg:pb-[1.5rem]"
          style={{ scrollMarginTop: 'calc(var(--header-height, 0px) + 24px)' }}
          id="promotion-hero"
        >
          <div className="container relative flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-[60px] mx-auto px-4 max-w-[87.5rem]">
            {/* Text & CTAs */}
            <div className="contents lg:block lg:w-1/2 lg:relative">
              <h1 className="order-1 text-center lg:text-left text-4xl sm:text-5xl lg:text-[80px] font-champ uppercase leading-[0.95] text-dark-brown">
                Win a Trip to Australia
              </h1>
              <p className="order-2 lg:mt-[14px] lg:max-w-[35ch] text-base sm:text-lg font-body text-dark-brown mt-3">
                Enter for a chance to win round-trip economy flights to Sydney, Australia for you and a guest + $2,000 USD spending money.
              </p>

              {/* Sprouts Logo Badge */}
              <div
                className="absolute z-[1] max-w-full w-[6.5625rem] -top-[7%] left-[5%] lg:w-[11.25rem] lg:top-[50%] lg:left-[72%]"
                style={{ transform: 'rotate(-7deg)' }}
              >
                <img
                  src="/assets/images/Sprouts_Farmers_Market_Logo_4_Vectorized.svg"
                  alt="Sprouts Farmers Market"
                  width="600"
                  height="156"
                  className="aspect-auto w-full object-cover !w-full !h-auto"
                />
              </div>

              <a
                href="#instructions"
                className="order-3 lg:mt-12 inline-flex text-nowrap transition-colors duration-200 ease-out items-center justify-center cursor-pointer no-underline uppercase rounded-[100px] w-full md:w-fit focus-visible:outline-none text-[16px] lg:text-[20px] font-champ leading-[100%] py-4 px-6 bg-accent-purple text-dark-brown border-2 border-dark-brown hover:bg-cream button-primary !w-full lg:!w-[392px] mt-6"
              >
                ENTER
              </a>

              <div className="order-5 lg:mt-12 text-[8px] leading-[1.4] max-w-[400px] break-words text-dark-brown/70 mt-4">
                <p>
                  <strong>NO PURCHASE NECESSARY; </strong>void where prohibited. Open to U.S. residents, 18+. Ends 9/20/26.{' '}
                  <strong>Limit one (1) entry per person total. </strong>Two entry methods: (i) A qualifying purchase of Drizzy peanut butter at Sprouts Farmers Market, or (ii) mail-in entry. See Official Rules at{' '}
                  <a href="/pages/rules" className="underline font-bold text-dark-brown">
                    https://getdrizzy.co/pages/rules
                  </a>{' '}
                  for details. Sponsor: Drizzy Holdings Inc., 90 Park Ave., NY, NY 10016.
                </p>
              </div>
            </div>

            {/* Media / Video side */}
            <div className="order-4 w-full relative lg:w-1/2 mt-5 lg:mt-0">
              <img
                src="/assets/images/Australia_Icon_7cdf6797-9b9e-43cd-8855-bed45dbfad15.png"
                alt="Australia Icon"
                className="aspect-auto w-full object-cover absolute -top-[12%] left-[84%] lg:top-[6%] lg:left-[0%] -translate-x-1/2 !w-[20vw] lg:!w-[183px] !h-auto z-10 pointer-events-none"
              />

              <div className="relative w-full rounded-[24px] border-4 border-dark-brown overflow-hidden bg-dark-brown">
                <video
                  playsInline
                  muted
                  autoPlay
                  loop
                  width="1200"
                  className="aspect-auto w-full object-cover w-full lg:!h-[31.875rem] !aspect-[641/535] rounded-[20px]"
                  poster="/assets/images/Screenshot_2026-08-21_at_10.32.56_am.png"
                  aria-label="Drizzy USA"
                >
                  <source
                    src="https://getdrizzy.co/cdn/shop/videos/c/vp/3bf20797693b4279ad33d2af5e4962c2/3bf20797693b4279ad33d2af5e4962c2.HD-1080p-7.2Mbps-92269433.mp4"
                    type="video/mp4"
                  />
                  <img
                    src="/assets/images/Screenshot_2026-08-21_at_10.32.56_am.png"
                    alt="Drizzy USA"
                    className="w-full h-full object-cover"
                  />
                </video>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 2. Trip Details ("Here's What You're Playing For") */}
      <div id="shopify-section-template--22264299061419__trip_details_nc3EG9" className="shopify-section">
        <section
          className="text-foreground px-3 lg:px-4 py-0"
          style={{ scrollMarginTop: 'calc(var(--header-height, 0px) + 24px)' }}
          id="trip-details"
        >
          <div className="relative bg-[#ca9af1] rounded-[24px] lg:rounded-[40px] overflow-hidden max-w-[87.5rem] mx-auto">
            {/* Dripping Graphic Divider */}
            <div className="w-full">
              <img
                src="/assets/images/cream-dripping-graphic.png"
                alt="cream drip divider"
                className="w-full hidden md:block aspect-auto object-cover"
              />
              <img
                src="/assets/images/cream-drip-mobile.svg"
                alt="cream drip divider"
                className="w-full md:hidden aspect-auto object-cover"
              />
            </div>

            <div className="container pb-12 pt-6 px-4 mx-auto text-dark-brown">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-champ uppercase text-center mx-auto tracking-tight">
                Here's What You're Playing For
              </h2>

              <div className="flex flex-wrap justify-center gap-10 mt-10 max-w-5xl mx-auto">
                {/* Prize 1 */}
                <div className="flex flex-col w-full lg:w-[20.9375rem] max-w-full text-center lg:text-left items-center lg:items-start">
                  <img
                    src="/assets/images/flight-icon.png"
                    alt="Round-trip flights"
                    className="w-[3.0rem] lg:w-[3.5rem] h-auto object-contain"
                  />
                  <h3 className="text-xl lg:text-2xl font-champ uppercase mt-5 lg:mt-6">
                    Round-trip flights
                  </h3>
                  <div className="text-sm lg:text-base font-body mt-2 lg:mt-3 leading-relaxed">
                    <p>Round-trip economy flights to Sydney, Australia for you and a guest.</p>
                  </div>
                </div>

                {/* Prize 2 */}
                <div className="flex flex-col w-full lg:w-[20.9375rem] max-w-full text-center lg:text-left items-center lg:items-start">
                  <img
                    src="/assets/images/cash-icon.png"
                    alt="$2,000 spending money"
                    className="w-[3.0rem] lg:w-[3.5rem] h-auto object-contain"
                  />
                  <h3 className="text-xl lg:text-2xl font-champ uppercase mt-5 lg:mt-6">
                    $2,000 spending money
                  </h3>
                  <div className="text-sm lg:text-base font-body mt-2 lg:mt-3 leading-relaxed">
                    <p>To spend on your hotel accommodations, food, and other expenses while in Australia.</p>
                  </div>
                </div>

                {/* Prize 3 */}
                <div className="flex flex-col w-full lg:w-[20.9375rem] max-w-full text-center lg:text-left items-center lg:items-start">
                  <img
                    src="/assets/images/cam-icon.png"
                    alt="An unforgettable trip"
                    className="w-[3.0rem] lg:w-[3.5rem] h-auto object-contain"
                  />
                  <h3 className="text-xl lg:text-2xl font-champ uppercase mt-5 lg:mt-6">
                    An unforgettable trip
                  </h3>
                  <div className="text-sm lg:text-base font-body mt-2 lg:mt-3 leading-relaxed">
                    <p>One winner + one guest are heading Down Under.</p>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center mt-10">
                <a
                  href="#instructions"
                  className="inline-flex text-nowrap transition-colors duration-200 ease-out items-center justify-center cursor-pointer no-underline uppercase rounded-[100px] w-full md:w-fit text-[16px] lg:text-[20px] font-champ py-4 px-6 bg-cream text-dark-brown border-2 border-dark-brown hover:bg-accent-purple button-primary !w-full lg:!w-[392px]"
                >
                  ENTER
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 3. Instructions ("How to Enter") */}
      <div id="shopify-section-template--22264299061419__instructions_4NBcEt" className="shopify-section">
        <section
          className="bg-background bg-gradient text-foreground color-scheme-1 py-10 lg:py-16"
          id="instructions"
          style={{ scrollMarginTop: 'calc(var(--header-height, 0px) + 24px)' }}
        >
          <div className="container flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-0 mx-auto px-4 max-w-[87.5rem]">
            {/* Left Image */}
            <div className="relative z-[1] w-full lg:max-w-[40%] lg:-mr-10">
              <div className="w-full aspect-[3/4] lg:aspect-[562/818] rounded-3xl border-4 border-dark-brown overflow-hidden bg-cream shadow-xl">
                <img
                  src="/assets/images/shutterstock_2623398413.jpg"
                  alt="Drizzy Fan with peanut butter"
                  className="aspect-auto w-full object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Right Card with Steps */}
            <div
              className="relative z-[2] w-full lg:max-w-[55%] bg-cream border-4 border-b-8 border-dark-brown rounded-3xl lg:rounded-[32px] px-6 py-8 lg:px-8 lg:py-10 text-dark-brown shadow-2xl"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-champ uppercase tracking-tight">
                How to Enter
              </h2>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-4 mt-6 text-lg font-mono">
                <span>Buy Drizzy (In-store or via sprouts.com)</span>
                <img
                  src="/assets/images/Sprouts_Farmers_Market_Logo_4_Vectorized.svg"
                  alt="Sprouts logo"
                  className="!w-auto !h-[4rem] object-contain"
                />
              </div>

              {/* Step 1 */}
              <div className="mt-6 border-t border-dark-brown/15 pt-5">
                <h3 className="text-lg lg:text-xl font-champ uppercase text-dark-brown">
                  1. Sign up or sign in to Sprouts
                </h3>
                <div className="text-sm lg:text-base font-body mt-2 leading-relaxed text-dark-brown/90">
                  <p>
                    Before you shop, create a Sprouts account or sign in to your existing account. You'll need your purchase linked to your account so we can verify your entry.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="mt-5 border-t border-dark-brown/15 pt-5">
                <h3 className="text-lg lg:text-xl font-champ uppercase text-dark-brown">
                  2. Buy Drizzy at Sprouts
                </h3>
                <div className="text-sm lg:text-base font-body mt-2 leading-relaxed text-dark-brown/90 space-y-2">
                  <p>Purchase at least one bottle of Drizzy at Sprouts between August 24 and September 20, 2026.</p>
                  <p>
                    <strong>One qualifying purchase = one entry. Limit one entry per person total.</strong> Buying additional bottles or making additional purchases will not give you additional entries.
                  </p>
                  <p>Shopping in-store? Make sure your Sprouts account is linked to your purchase at checkout so we can verify your entry.</p>
                  <p>Shopping online? Make sure you're signed in to your Sprouts account at sprouts.com before checking out.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="mt-5 border-t border-dark-brown/15 pt-5">
                <h3 className="text-lg lg:text-xl font-champ uppercase text-dark-brown">
                  3. Keep your receipt
                </h3>
                <div className="text-sm lg:text-base font-body mt-2 leading-relaxed text-dark-brown/90">
                  <p>Hold onto your receipt! You'll need it to enter. If you purchased online, your digital receipt will be in your email inbox showing your Drizzy purchase.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="mt-5 border-t border-dark-brown/15 pt-5">
                <h3 className="text-lg lg:text-xl font-champ uppercase text-dark-brown">
                  4. Upload & enter
                </h3>
                <div className="text-sm lg:text-base font-body mt-2 leading-relaxed text-dark-brown/90 space-y-2">
                  <p>Enter your name and email address below and upload a clear photo or screenshot of your Sprouts receipt. If you purchased online, ensure to download the receipt from your email and upload the file as is.</p>
                  <p>Use the same email address linked to your Sprouts account so we can verify your purchase.</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="mt-5 border-t border-dark-brown/15 pt-5">
                <h3 className="text-lg lg:text-xl font-champ uppercase text-dark-brown">
                  5. You're in!
                </h3>
                <div className="text-sm lg:text-base font-body mt-2 leading-relaxed text-dark-brown/90 space-y-2">
                  <p>Once your qualifying purchase and submission are verified, you’ll officially be entered into the draw.</p>
                  <p><strong>Limit one (1) entry per person total, regardless of entry method.</strong> Purchasing additional bottles, making additional purchases or submitting additional receipts will not result in additional entries.</p>
                  <p><strong>Mail-In Entry:</strong> No purchase necessary. To enter by mail without making a purchase, please see the Official Rules for complete details.</p>
                </div>
              </div>

              {/* Legal Note */}
              <div className="mt-6 text-[10px] leading-[1.4] text-dark-brown/70 border-t border-dark-brown/15 pt-4">
                <p>
                  <strong>NO PURCHASE NECESSARY; </strong>void where prohibited. Open to U.S. residents, 18+. Ends 9/20/26. <strong>Limit one (1) entry per person total. </strong>Two entry methods: (i) A qualifying purchase of Drizzy peanut butter at Sprouts Farmers Market, or (ii) mail-in entry. See Official Rules at{' '}
                  <a href="/pages/rules" className="underline font-bold text-dark-brown">
                    https://getdrizzy.co/pages/rules
                  </a>{' '}
                  for details. Sponsor: Drizzy Holdings Inc., 90 Park Ave., NY, NY 10016.
                </p>
              </div>

              <a
                href="#draw-form"
                className="mt-8 lg:mt-10 inline-flex text-nowrap transition-colors duration-200 ease-out items-center justify-center cursor-pointer no-underline uppercase rounded-[100px] w-full md:w-fit text-[16px] lg:text-[20px] font-champ py-4 px-6 bg-accent-purple text-dark-brown border-2 border-dark-brown hover:bg-cream button-primary !w-full lg:!w-[392px]"
              >
                ENTER
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* 4. Draw Form ("Enter the Draw") */}
      <div id="shopify-section-template--22264299061419__draw_form_zTmHAN" className="shopify-section">
        <section
          className="draw-form relative overflow-x-clip bg-background bg-gradient text-foreground color-scheme-1 py-12 lg:py-16"
          id="draw-form"
          style={{ scrollMarginTop: 'calc(var(--header-height, 0px) + 24px)' }}
        >
          {/* Floating background peanuts */}
          <div className="pointer-events-none absolute inset-0 z-0 select-none" aria-hidden="true">
            <div className="absolute left-0 top-0 hidden w-[90px] rotate-[135deg] lg:block lg:w-[8vw]">
              <img
                src="/assets/images/peanut-right.png"
                alt="peanut"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="absolute right-[4vw] top-[24%] hidden w-[44px] lg:block lg:w-[120px]">
              <img
                src="/assets/images/nuts.png"
                alt="nuts"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="absolute right-0 top-[26%] hidden rotate-[-120deg] lg:block lg:w-[8vw]">
              <img
                src="/assets/images/peanut-right.png"
                alt="peanut"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          <div className="container mx-auto px-4 max-w-[87.5rem] relative z-10">
            <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-end lg:justify-center">
              {/* Mascot illustration */}
              <div className="hidden w-[380px] shrink-0 lg:block">
                <img
                  src="/assets/images/man.svg"
                  alt="Drizzy Man"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Form Card */}
              <div className="w-full min-w-0 max-w-[840px] flex-1">
                <div
                  className="bg-cream border-[3px] border-dark-brown rounded-[32px] p-6 lg:p-10 shadow-[0_8px_0_0_#2d0f28] text-dark-brown"
                >
                  <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-champ uppercase text-center mb-8 text-dark-brown leading-tight">
                    Enter the Draw
                  </h2>

                  {status.success ? (
                    <div className="p-6 bg-[#ca9af1]/30 border-2 border-dark-brown rounded-2xl text-center">
                      <p className="font-champ text-2xl uppercase text-dark-brown mb-2">🎉 Entry Received!</p>
                      <p className="font-mono text-sm text-dark-brown">{status.message}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {status.message && (
                        <div className="p-4 bg-red-100 border-2 border-red-700 rounded-xl text-xs font-mono text-red-900">
                          {status.message}
                        </div>
                      )}

                      {/* Name Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-champ text-sm uppercase tracking-wide text-dark-brown mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                            className="w-full bg-white border border-dark-brown rounded px-4 py-3.5 text-xs font-mono text-dark-brown focus:outline-none focus:ring-2 focus:ring-dark-brown"
                          />
                        </div>
                        <div>
                          <label className="block font-champ text-sm uppercase tracking-wide text-dark-brown mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                            className="w-full bg-white border border-dark-brown rounded px-4 py-3.5 text-xs font-mono text-dark-brown focus:outline-none focus:ring-2 focus:ring-dark-brown"
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block font-champ text-sm uppercase tracking-wide text-dark-brown mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="Your Sprouts-linked email address"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-white border border-dark-brown rounded px-4 py-3.5 text-xs font-mono text-dark-brown focus:outline-none focus:ring-2 focus:ring-dark-brown"
                        />
                      </div>

                      {/* Receipt File Upload */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <label className="block font-champ text-sm uppercase tracking-wide text-dark-brown">
                            Drop Your Receipt *
                          </label>
                          {fileName && (
                            <span className="text-xs font-mono font-bold text-accent-green">
                              ✓ {fileName}
                            </span>
                          )}
                        </div>

                        <label className="flex flex-col items-center justify-center p-6 bg-white border-2 border-dashed border-dark-brown rounded cursor-pointer hover:bg-white/80 transition-colors">
                          <div className="flex items-center gap-3 text-dark-brown font-mono text-sm">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M11 16V7.85L8.4 10.45L7 9L12 4L17 9L15.6 10.45L13 7.85V16H11ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z"
                                fill="#2d0f28"
                              />
                            </svg>
                            <span className="font-bold">click to upload receipt image or PDF</span>
                          </div>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Checkboxes */}
                      <div className="space-y-3 pt-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.agreedRules}
                            onChange={(e) => setForm({ ...form, agreedRules: e.target.checked })}
                            className="mt-1 w-4 h-4 accent-dark-brown"
                          />
                          <span className="text-xs font-mono text-dark-brown leading-relaxed">
                            I certify that I am 18+ and agree to the{' '}
                            <a href="/pages/rules" target="_blank" className="underline font-bold">
                              Official Rules
                            </a>{' '}
                            and{' '}
                            <a href="/policies/privacy-policy" target="_blank" className="underline font-bold">
                              Privacy Policy
                            </a>.
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.newsletterOptIn}
                            onChange={(e) => setForm({ ...form, newsletterOptIn: e.target.checked })}
                            className="mt-1 w-4 h-4 accent-dark-brown"
                          />
                          <span className="text-xs font-mono text-dark-brown leading-relaxed">
                            Sign me up to receive updates and sweet deals from Drizzy!
                          </span>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <div className="text-center pt-4">
                        <button
                          type="submit"
                          disabled={status.loading}
                          className="w-full max-w-[440px] bg-accent-purple text-dark-brown border-2 border-dark-brown rounded-full py-4 px-7 font-champ text-xl uppercase tracking-wide button-primary hover:bg-cream disabled:opacity-50"
                        >
                          {status.loading ? 'SUBMITTING...' : 'SUBMIT ENTRY'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Rules Banner Box */}
                <div className="mt-7 p-4 lg:p-6 bg-[#CF945C80] rounded-xl text-dark-brown">
                  <p className="text-sm font-champ uppercase mb-2">
                    <a href="/pages/rules" target="_blank" className="hover:underline">
                      OFFICIAL RULES
                    </a>{' '}
                    |{' '}
                    <a href="/policies/privacy-policy" target="_blank" className="hover:underline">
                      PRIVACY POLICY
                    </a>
                  </p>
                  <p className="text-[10px] leading-relaxed break-words font-mono">
                    <strong>NO PURCHASE NECESSARY; </strong>void where prohibited. Open to U.S. residents, 18+. Ends 9/20/26. <strong>Limit one (1) entry per person total. </strong>Two entry methods: (i) A qualifying purchase of Drizzy peanut butter at Sprouts Farmers Market, or (ii) mail-in entry. See Official Rules at{' '}
                    <a href="/pages/rules" className="underline font-bold text-dark-brown">
                      https://getdrizzy.co/pages/rules
                    </a>{' '}
                    for details. Sponsor: Drizzy Holdings Inc., 90 Park Ave., NY, NY 10016.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SproutsContest;
