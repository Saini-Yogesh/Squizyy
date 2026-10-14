import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="w-full bg-cream py-12 lg:py-16">
      <div className="container mx-auto px-4 max-w-4xl text-left">
        <h1 className="text-4xl sm:text-5xl font-champ uppercase text-dark-brown mb-8 text-center sm:text-left">
          Privacy Policy
        </h1>

        <div className="bg-white border-4 border-b-8 border-dark-brown rounded-[32px] p-6 sm:p-12 shadow-2xl text-dark-brown space-y-6 font-body text-sm sm:text-base leading-relaxed">
          <div>
            <h3 className="font-champ text-2xl uppercase text-dark-brown mb-2">Welcome to Drizzy!</h3>
            <p>
              Your privacy is important to us. This Privacy Policy explains how <strong>Drizzy</strong> (“we”, “our”, or “us”) collects, uses, and protects the personal information you share when you interact with our website, online store, or any other digital service operated by Drizzy.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-champ text-xl uppercase text-dark-brown">1. Information We Collect</h3>
            <p>We may collect the following types of information when you interact with us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> such as your name, email address, shipping address, phone number, and payment details when you make a purchase or sign up for our newsletter.
              </li>
              <li>
                <strong>Non-Personal Information:</strong> such as browser type, device information, IP address, and how you use our website (e.g., pages visited, time spent).
              </li>
              <li>
                <strong>Cookies & Tracking:</strong> We use cookies and similar technologies to enhance your browsing experience, personalize content, and analyze site performance.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-champ text-xl uppercase text-dark-brown">2. How We Use Your Information</h3>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Process and fulfill your orders.</li>
              <li>Communicate with you about your purchases, promotions, or updates.</li>
              <li>Improve our products, services, and website experience.</li>
              <li>Respond to your inquiries or feedback.</li>
              <li>Comply with legal obligations and prevent fraudulent activity.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-champ text-xl uppercase text-dark-brown">3. How We Protect Your Information</h3>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, please note that no online transmission or electronic storage method is 100% secure.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-champ text-xl uppercase text-dark-brown">4. Sharing Your Information</h3>
            <p>
              We do <strong>not</strong> sell your personal data. We may share limited information with trusted third parties who help us operate our business, such as payment processors, delivery partners, and email service providers.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-champ text-xl uppercase text-dark-brown">5. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please reach out to us at{' '}
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

export default PrivacyPolicy;
