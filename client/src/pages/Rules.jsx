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
            DRIZZY SPROUTS LAUNCH SWEEPSTAKES
          </h2>
          <h3 className={styles.subheading} style={{ fontSize: '1.125rem' }}>
            OFFICIAL RULES
          </h3>

          <ul className={styles.bulletList}>
            <li>
              NO PURCHASE NECESSARY TO ENTER OR WIN. A PURCHASE WILL NOT INCREASE YOUR CHANCES OF WINNING. VOID WHERE PROHIBITED BY LAW.
            </li>
            <li>
              AFFIDAVIT OF ELIGIBILITY, RELEASE OF LIABILITY & PRIZE ACCEPTANCE AGREEMENT MAY BE REQUIRED IF REQUESTED BY SPONSOR.
            </li>
            <li>
              BY ENTERING (OR OTHERWISE PARTICIPATING) IN THE SWEEPSTAKES, YOU AGREE TO THESE OFFICIAL RULES, WHICH CREATE A CONTRACT, SO READ THEM CAREFULLY BEFORE ENTERING. WITHOUT LIMITATION, SUCH CONTRACT INCLUDES A CLASS ACTION WAIVER AND A LIMITATION OF YOUR RIGHTS AND REMEDIES.
            </li>
          </ul>

          <p>
            <strong>SPONSOR:</strong> Drizzy Pty Limited, 90 Park Avenue, New York, NY 10016 (“Sponsor”).
          </p>

          <p>
            <strong>ELIGIBILITY:</strong> The Drizzy Sprouts Launch Sweepstakes (the “Sweepstakes”) is open to legal U.S. residents of the fifty (50) United States (including the District of Columbia) who are eighteen (18) years of age or older at the time of entry and have reached the age of majority in their respective states of residence. Employees of Sponsor, Sprouts Farmers Market, and their immediate families are not eligible.
          </p>

          <p>
            <strong>SWEEPSTAKES PERIOD:</strong> The Sweepstakes begins at 12:00 a.m. Eastern Time (“ET”) on August 24, 2026, and ends at 11:59 p.m. ET on September 20, 2026 (the “Sweepstakes Period”).
          </p>

          <p>
            <strong>HOW TO ENTER:</strong> Eligible individuals may enter the Sweepstakes by one of the following two methods:
          </p>

          <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p>
              <strong>1. Purchase Entry:</strong> Set up an account with Sprouts Farmers Market stores. Purchase a bottle of Drizzy Peanut Butter 19.4 oz at any participating Sprouts location. Visit{' '}
              <Link to="/pages/sproutslaunchwinflightstoaustralia" style={{ textDecoration: 'underline', fontWeight: 700, color: 'var(--color-dark-brown, #2b1408)' }}>
                https://getdrizzy.co/pages/sproutslaunchwinflightstoaustralia
              </Link>
              , upload your receipt photo or digital receipt, and submit your entry.
            </p>
            <p>
              <strong>2. Alternative Method of Entry (AMOE) — No Purchase Necessary:</strong> Hand-print your full name, mailing address, date of birth, email address, and phone number on a 3” x 5” card and mail it in a stamped envelope to: Drizzy Sprouts Launch Sweepstakes, 936 SW 1st Avenue, PMB 180, Miami, FL 33130.
            </p>
            <p style={{ fontSize: '11px', fontFamily: "var(--font-secondary, 'Azeret Mono')", color: 'rgba(43, 20, 8, 0.8)' }}>
              Limit one (1) entry per person total across all entry methods combined during the Sweepstakes Period.
            </p>
          </div>

          <div className={styles.sectionDivider}>
            <p>
              <strong>PRIZES AND APPROXIMATE RETAIL VALUE (“ARV”):</strong> One (1) winner will be randomly selected to receive:
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li>Round-trip, economy-class airfare for winner and one (1) guest to Sydney, Australia (ARV: $2,780).</li>
              <li>A Visa® gift card in the amount of $2,000 intended for lodging, food, and other travel expenses (ARV: $2,000).</li>
            </ul>
            <p style={{ fontFamily: "var(--font-primary, 'Champ Black')", fontSize: '1.125rem', textTransform: 'uppercase', color: 'var(--color-dark-brown, #2b1408)' }}>
              Total ARV of Prize Package: $4,780.
            </p>
          </div>

          <p className={styles.footerNote}>
            //END OFFICIAL RULES//
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rules;
