import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Rules.module.css';

const Rules = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          Official Rules
        </h1>

        <div className={styles.card}>
          <h2 className={styles.subheading}>
            SQUIZYY INDIA GRAND LAUNCH GIVEAWAY
          </h2>
          <h3 className={styles.subheading} style={{ fontSize: '1.125rem' }}>
            OFFICIAL RULES &amp; ELIGIBILITY
          </h3>

          <ul className={styles.bulletList}>
            <li>
              NO PURCHASE NECESSARY TO ENTER OR WIN. A PURCHASE WILL NOT INCREASE YOUR CHANCES OF WINNING. VOID WHERE PROHIBITED BY LAW.
            </li>
            <li>
              AFFIDAVIT OF ELIGIBILITY, GOVERNMENT ID VERIFICATION (AADHAAR / PAN), &amp; PRIZE ACCEPTANCE AGREEMENT REQUIRED UPON SELECTION.
            </li>
            <li>
              BY ENTERING (OR OTHERWISE PARTICIPATING) IN THE GIVEAWAY, YOU AGREE TO THESE OFFICIAL RULES, WHICH CREATE A BINDING CONTRACT. PLEASE READ CAREFULLY BEFORE ENTERING.
            </li>
          </ul>

          <p>
            <strong>SPONSOR:</strong> Squizyy Foods India Private Limited, Registered Office: Gujarat / Maharashtra, India (“Sponsor”).
          </p>

          <p>
            <strong>ELIGIBILITY:</strong> The Squizyy India Grand Launch Giveaway (the “Giveaway”) is open to legal residents of the Republic of India who are eighteen (18) years of age or older at the time of entry. Employees, contractors, directors, and officers of Sponsor, its distribution partners, and immediate family members are not eligible to participate.
          </p>

          <p>
            <strong>GIVEAWAY PERIOD:</strong> The Giveaway begins on January 1, 2026, and ends at 11:59 p.m. IST on December 31, 2026 (the “Giveaway Period”). Lucky draws and winner announcements will be conducted periodically throughout the campaign.
          </p>

          <p>
            <strong>HOW TO ENTER:</strong> Eligible individuals may enter the Giveaway through either of the following two methods:
          </p>

          <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p>
              <strong>1. Purchase Entry:</strong> Purchase any qualifying bottle of Squizyy Peanut Butter online at{' '}
              <Link to="/" style={{ textDecoration: 'underline', fontWeight: 700, color: 'var(--color-dark-brown, #2b1408)' }}>
                squizyy-store.myshopify.com
              </Link>{' '}
              or from any authorized supermarket or quick-commerce partner across India. Visit our Giveaway page, enter your Order Number or upload a clear photo of your retail bill, and submit the entry form.
            </p>
            <p>
              <strong>2. Alternative Method of Entry (AMOE) — No Purchase Necessary:</strong> Eligible participants may enter for free without making a purchase by completing the online entry form and typing "FREE" into the Order Number field, or by sending an email with your full name, mobile number, city, and pincode to <a href="mailto:support@squizyy.in" style={{ textDecoration: 'underline', fontWeight: 700, color: 'var(--color-dark-brown, #2b1408)' }}>support@squizyy.in</a> with the subject line "Free Squizyy Launch Giveaway Entry".
            </p>
            <p style={{ fontSize: '11px', fontFamily: "var(--font-secondary, 'Azeret Mono')", color: 'rgba(43, 20, 8, 0.8)' }}>
              Limit one (1) entry per person total across all entry methods combined during each draw period.
            </p>
          </div>

          <div className={styles.sectionDivider}>
            <p>
              <strong>PRIZES AND APPROXIMATE RETAIL VALUE (“ARV”):</strong> Selected winners will receive:
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li><strong>Grand Prize (Luxury Vacation):</strong> Round-trip domestic economy flight tickets for winner and one (1) companion to a premier vacation destination (Goa, Kerala, or Kashmir) (ARV: ₹40,000).</li>
              <li><strong>Spending Allowance:</strong> ₹1,00,000 cash spending allowance transferred via verified Bank Transfer or UPI for 5-star lodging, food, and activities (ARV: ₹1,00,000).</li>
              <li><strong>1-Year Free Squizyy Peanut Butter:</strong> 12 monthly drops of fresh slow-roasted Saurashtra peanut butter delivered to winner's address (ARV: ₹12,000).</li>
            </ul>
            <p style={{ fontFamily: "var(--font-primary, 'Champ Black')", fontSize: '1.125rem', textTransform: 'uppercase', color: 'var(--color-dark-brown, #2b1408)' }}>
              Total ARV of Grand Prize Package: ₹1,52,000.
            </p>
          </div>

          <p>
            <strong>WINNER SELECTION &amp; NOTIFICATION:</strong> Potential winners will be selected in random automated draws. Winners will be notified via registered Email and WhatsApp within seven (7) business days of the draw date. Winners must present valid government photo identification (Aadhaar or PAN) to claim their prize.
          </p>

          <p>
            <strong>GOVERNING LAW &amp; JURISDICTION:</strong> All issues and questions concerning the construction, validity, interpretation, and enforceability of these Official Rules shall be governed by the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Ahmedabad / Mumbai, India.
          </p>

          <p className={styles.footerNote}>
            //END OFFICIAL RULES — SQUIZYY FOODS INDIA PRIVATE LIMITED//
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rules;
