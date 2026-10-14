import React from 'react';
import { Link } from 'react-router-dom';

const Rules = () => {
  return (
    <div className="w-full">
      <div id="shopify-section-template--22302821253291__main" className="shopify-section">
        <section className="grid items-center bg-background bg-gradient text-foreground color-scheme-1 py-12 lg:py-16">
          <div className="container mx-auto px-4 max-w-4xl text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-champ uppercase text-dark-brown mb-8 text-center sm:text-left">
              Official Rules
            </h1>

            <div className="bg-cream border-4 border-b-8 border-dark-brown rounded-[32px] p-6 sm:p-12 shadow-2xl text-dark-brown space-y-6 font-body text-sm sm:text-base leading-relaxed">
              <p className="font-champ text-xl sm:text-2xl uppercase text-dark-brown">
                DRIZZY SPROUTS LAUNCH SWEEPSTAKES
              </p>
              <p className="font-champ text-lg uppercase text-dark-brown">
                OFFICIAL RULES
              </p>

              <ul className="list-disc pl-6 space-y-3 font-semibold text-dark-brown/95">
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

              <div className="pl-4 space-y-3">
                <p>
                  <strong>1. Purchase Entry:</strong> Set up an account with Sprouts Farmers Market stores. Purchase a bottle of Drizzy Peanut Butter 19.4 oz at any participating Sprouts location. Visit{' '}
                  <Link to="/pages/sproutslaunchwinflightstoaustralia" className="underline font-bold text-dark-brown">
                    https://getdrizzy.co/pages/sproutslaunchwinflightstoaustralia
                  </Link>
                  , upload your receipt photo or digital receipt, and submit your entry.
                </p>
                <p>
                  <strong>2. Alternative Method of Entry (AMOE) — No Purchase Necessary:</strong> Hand-print your full name, mailing address, date of birth, email address, and phone number on a 3” x 5” card and mail it in a stamped envelope to: Drizzy Sprouts Launch Sweepstakes, 936 SW 1st Avenue, PMB 180, Miami, FL 33130.
                </p>
                <p className="text-xs font-mono text-dark-brown/80">
                  Limit one (1) entry per person total across all entry methods combined during the Sweepstakes Period.
                </p>
              </div>

              <div className="pt-4 border-t border-dark-brown/20 space-y-3">
                <p>
                  <strong>PRIZES AND APPROXIMATE RETAIL VALUE (“ARV”):</strong> One (1) winner will be randomly selected to receive:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Round-trip, economy-class airfare for winner and one (1) guest to Sydney, Australia (ARV: $2,780).</li>
                  <li>A Visa® gift card in the amount of $2,000 intended for lodging, food, and other travel expenses (ARV: $2,000).</li>
                </ul>
                <p className="font-champ text-lg uppercase text-dark-brown">
                  Total ARV of Prize Package: $4,780.
                </p>
              </div>

              <p className="text-xs font-mono text-dark-brown/70 pt-4 border-t border-dark-brown/20">
                //END OFFICIAL RULES//
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Rules;
