import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="w-full bg-cream py-12 lg:py-16">
      <div className="container mx-auto px-4 max-w-4xl text-left">
        <h1 className="text-4xl sm:text-5xl font-champ uppercase text-dark-brown mb-8 text-center sm:text-left">
          Terms of Service
        </h1>

        <div className="bg-white border-4 border-b-8 border-dark-brown rounded-[32px] p-6 sm:p-12 shadow-2xl text-dark-brown space-y-6 font-body text-sm sm:text-base leading-relaxed">
          <div>
            <h3 className="font-champ text-2xl uppercase text-dark-brown mb-2">Welcome to Drizzy!</h3>
            <p>
              These Terms of Service (“Terms”) govern your access to and use of our website, online store, and any related services operated by Drizzy (“we”, “our”, or “us”).
              By visiting our site or making a purchase, you agree to these Terms. Please read them carefully before using our services.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-champ text-xl uppercase text-dark-brown">1. Using Our Website</h3>
            <p>You may use our website and services only for lawful purposes and in accordance with these Terms.</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Do not use our website for any illegal or unauthorized purpose.</li>
              <li>Do not interfere with or disrupt the security or functionality of the website.</li>
              <li>Do not attempt to collect or misuse other users’ personal data.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-champ text-xl uppercase text-dark-brown">2. Products and Orders</h3>
            <p>
              We do our best to display product details, images, and pricing as accurately as possible. When you place an order, you agree that all information provided is accurate and that you are authorized to use the payment method provided.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-champ text-xl uppercase text-dark-brown">3. Shipping and Delivery</h3>
            <p>
              Delivery times are estimates and may vary based on your location. If your order arrives damaged or missing, please contact us within 7 days of delivery at{' '}
              <a href="mailto:hello@getdrizzy.co" className="underline font-bold text-dark-brown">
                hello@getdrizzy.co
              </a>.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-champ text-xl uppercase text-dark-brown">4. Returns and Refunds</h3>
            <p>
              Your satisfaction matters to us! Due to the perishable nature of peanut butter food products, returns are accepted within 7 days if defective or incorrect.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-champ text-xl uppercase text-dark-brown">5. Contact Us</h3>
            <p>
              Questions about the Terms of Service should be sent to{' '}
              <a href="mailto:hello@getdrizzy.co" className="underline font-bold text-dark-brown">
                hello@getdrizzy.co
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
