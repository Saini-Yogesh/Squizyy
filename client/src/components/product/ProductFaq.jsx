import React, { useState } from 'react';
import styles from './ProductFaq.module.css';

const faqs = [
  {
    q: 'What is Drizzy?',
    a: 'Drizzy is 100% natural peanut butter, made from American peanuts and a splash of peanut oil. We filled a squeeze bottle so you no longer have to deal with the pains of a jar. Drizzy has no added sugar, no palm oil and no stabilizers. Just shake, squeeze and drizzle.',
  },
  {
    q: 'Where can I buy Drizzy?',
    a: 'You can buy Drizzy right here on our official website, nationwide at Sprouts Farmers Market stores, and on Amazon.',
  },
  {
    q: 'Is Drizzy vegan & gluten-free?',
    a: 'Yes! Drizzy contains only 100% American roasted peanuts and peanut oil. It is naturally vegan, gluten-free, dairy-free, and non-GMO.',
  },
  {
    q: 'Does Drizzy contain palm oil, added sugar or stabilizers?',
    a: 'Never. We never use palm oils, hydrogenated fats, added sugars, or emulsifiers. Only pure peanuts and peanut oil.',
  },
  {
    q: 'Why do I need to shake Drizzy?',
    a: 'Because Drizzy has zero artificial stabilizers or emulsifiers, natural peanut oils will naturally separate to the top. A quick 5-second shake blends it back into an ultra-smooth drizzle!',
  },
  {
    q: 'How should I store Drizzy?',
    a: 'Store Drizzy at room temperature in your pantry with the cap facing up. Do not refrigerate, as cold temperatures will harden natural peanut butter.',
  },
  {
    q: 'My order arrived damaged. What should I do?',
    a: 'Shoot an email to support@getdrizzy.co with a photo of the package and your order number. We will send you a replacement immediately, hassle-free!',
  },
];

const ProductFaq = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className={styles.faqSection} aria-label="Frequently Asked Questions">
      {/* Top Cream Drip */}
      <div className={styles.dripWrapper}>
        <img
          src="/assets/images/timeline-drip.svg"
          alt=""
          aria-hidden="true"
          className={styles.dripDesktop}
        />
        <img
          src="/assets/images/timeline-drip-mobile.svg"
          alt=""
          aria-hidden="true"
          className={styles.dripMobile}
        />
      </div>

      <div className={styles.contentWrapper}>
        {/* Background FAQ illustration (bottle dripping) */}
        <div className={styles.bgIllustration}>
          <img
            src="/assets/images/faq-bg.png"
            alt=""
            aria-hidden="true"
            className={styles.bgIllustrationImg}
          />
        </div>

        <div className={styles.container}>
          <div className={styles.titleArea}>
            <p className={styles.titleLine}>You Got Questions.</p>
            <p className={styles.titleLine}>We Got Answers.</p>
          </div>

          {/* Cream Accordion Card with Dark Brown Text */}
          <div className={styles.faqCard}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className={styles.questionButton}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`${styles.arrowIcon} ${isOpen ? styles.arrowIconRotated : ''}`}
                      aria-hidden="true"
                    >
                      ↓
                    </span>
                  </button>
                  {isOpen && (
                    <div className={styles.answerText}>
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
  );
};

export default ProductFaq;
