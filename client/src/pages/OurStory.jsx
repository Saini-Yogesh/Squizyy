import React, { useState } from 'react';

const OurStory = () => {
  const [activeLocation, setActiveLocation] = useState('queensland');
  const [openPopup, setOpenPopup] = useState(null);

  const handleLocationClick = (loc) => {
    setActiveLocation(loc);
    setOpenPopup(loc);
  };

  return (
    <div className="w-full">
      {/* 1. Story Hero (Map with Flight Path) */}
      <div id="shopify-section-template--22256227418283__story_hero_GWjXpF" className="shopify-section">
        <section className="bg-background bg-gradient text-foreground color-scheme-1 pt-8 pb-10 lg:pt-6 lg:pb-10">
          <div className="container !max-w-[1167px] mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-champ uppercase text-center text-dark-brown">
              From the Heart of Australia to the Home of Peanut Butter
            </h1>

            {/* Map TV Stage */}
            <div className="relative w-full aspect-[1167/829] overflow-hidden mt-6 lg:mt-6">
              {/* Map Image */}
              <div className="absolute top-[6.514%] bottom-[9.891%] left-[0.771%] right-[3.342%] z-[1]">
                <img
                  src="/assets/images/map-v2.png"
                  alt="World map connecting Australia and America"
                  className="aspect-auto w-full object-cover w-full h-full"
                />
              </div>

              {/* Story TV Frame overlay */}
              <div className="absolute inset-0 w-full h-full z-[2] pointer-events-none">
                <img
                  src="/assets/images/story-tv.png"
                  alt="TV frame overlay"
                  className="aspect-auto w-full object-cover w-full h-full"
                />
              </div>

              {/* Arc flight line */}
              <div className="absolute top-[35.103%] bottom-[31.845%] left-[23.136%] right-[29.563%] z-[3] pointer-events-none">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 552 274"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <circle cx="5.5114" cy="268.488" r="5.0114" fill="#2D0F28" stroke="#F8EBD7" />
                  <circle cx="546.183" cy="5.5114" r="5.0114" fill="#2D0F28" stroke="#F8EBD7" />
                  <path
                    d="M10.4883 264.277C163.441 92.9625 273.225 29.1044 535.954 4.85938"
                    stroke="#2D0F28"
                    strokeWidth="4"
                    strokeDasharray="16 16"
                  />
                </svg>
              </div>

              {/* Queensland AUS Button */}
              <button
                type="button"
                onClick={() => handleLocationClick('queensland')}
                className={`absolute z-[3] left-[25%] bottom-[25%] rounded-full py-1 px-2 lg:py-3 lg:px-6 border border-dark-brown text-[8px] lg:text-sm font-champ uppercase transition-colors shadow-md ${
                  activeLocation === 'queensland'
                    ? 'bg-dark-brown text-cream'
                    : 'bg-cream text-dark-brown hover:bg-dark-brown hover:text-cream'
                }`}
              >
                Queensland, AUS
              </button>

              {/* Texas USA Button */}
              <button
                type="button"
                onClick={() => handleLocationClick('texas')}
                className={`absolute z-[3] right-[28%] top-[24.5%] rounded-full py-1 px-2 lg:py-3 lg:px-6 border border-dark-brown text-[8px] lg:text-sm font-champ uppercase transition-colors shadow-md ${
                  activeLocation === 'texas'
                    ? 'bg-dark-brown text-cream'
                    : 'bg-cream text-dark-brown hover:bg-dark-brown hover:text-cream'
                }`}
              >
                Texas, USA
              </button>

              {/* Decorative badge right */}
              <div className="absolute bottom-[22%] right-[2%] z-[3] w-[80px] lg:w-[210px] pointer-events-none">
                <img
                  src="/assets/images/badge-right-story.png"
                  alt="badge"
                  className="aspect-square w-full h-full object-cover"
                />
              </div>

              {/* Peanut mascot bottom right */}
              <div className="absolute bottom-[9%] right-[13%] z-[3] w-[45px] lg:w-[150px] pointer-events-none">
                <img
                  src="/assets/images/peanut-man.png"
                  alt="mascot"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Location Popups */}
          {openPopup && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8"
              role="dialog"
              aria-modal="true"
            >
              <div
                className="absolute inset-0 bg-dark-brown/80 backdrop-blur-sm transition-opacity"
                onClick={() => setOpenPopup(null)}
              />
              <div className="relative bg-cream text-dark-brown rounded-[24px] lg:rounded-[32px] border-4 border-b-8 border-dark-brown max-w-[800px] w-full p-6 lg:p-10 shadow-2xl z-10">
                <button
                  type="button"
                  onClick={() => setOpenPopup(null)}
                  className="absolute top-4 right-4 lg:top-6 lg:right-6 w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full border border-dark-brown hover:bg-dark-brown hover:text-cream transition-colors text-lg font-bold"
                >
                  ✕
                </button>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="lg:w-[60%]">
                    <h3 className="text-2xl lg:text-3xl font-champ uppercase text-dark-brown mb-4">
                      {openPopup === 'queensland' ? 'Queensland, AUS' : 'Texas, USA'}
                    </h3>
                    <div className="text-sm lg:text-base font-body leading-relaxed text-dark-brown/90 space-y-3">
                      {openPopup === 'queensland' ? (
                        <p>
                          From a small peanut farm in Queensland to kitchens across Australia, this is where Drizzy was born—and where our story first took root.
                        </p>
                      ) : (
                        <p>
                          Home of the legendary Runner Peanuts. We spent months finding the perfect American counterpart to our Kingaroy roots, crafting 100% roasted perfection in the Lone Star State.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="lg:w-[40%] rounded-2xl border-2 border-dark-brown overflow-hidden">
                    <img
                      src={openPopup === 'queensland' ? '/assets/images/timeline-1.jpg' : '/assets/images/timeline-2.png'}
                      alt="location snapshot"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* 2. Story Image with Text (Two Aussie Peanut Butter Obsessors) */}
      <div id="shopify-section-template--22256227418283__story_image_with_text_bwNKLK" className="shopify-section">
        <section className="bg-background text-foreground color-scheme-1 py-10 lg:py-16">
          <div className="container flex flex-col lg:flex-row lg:items-center lg:justify-center gap-10 lg:gap-0 mx-auto px-4 max-w-[87.5rem]">
            {/* Left Image */}
            <div className="w-full lg:max-w-[50%] rounded-3xl border-4 border-dark-brown aspect-[41/45] lg:aspect-[745/818] overflow-hidden bg-cream shadow-xl">
              <img
                src="/assets/images/our-story.png"
                alt="Our Founders & Story"
                className="aspect-auto w-full object-cover w-full h-full"
              />
            </div>

            {/* Right Story Card */}
            <div className="bg-cream w-full flex flex-col gap-4 lg:max-w-[38%] lg:h-fit lg:px-8 lg:py-10 lg:ml-[-91px] lg:rounded-[32px] lg:border-4 lg:border-b-8 border-dark-brown text-dark-brown shadow-2xl z-10">
              <p className="text-sm font-champ uppercase text-dark-brown/80 tracking-wide">
                Two Aussie peanut butter obsessors, one mission:
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-champ uppercase text-dark-brown leading-tight">
                To bring the world’s smoothest drizzle from the heart of Queensland to the home of peanut butter.
              </h2>
              <div className="text-sm lg:text-base font-body leading-relaxed text-dark-brown/90 mt-2">
                After one too many mornings scraping peanut butter out of a jar, we reached for the honey and asked ourselves one simple question: "Why doesn't peanut butter squeeze too?". Turns out a lot of people agreed with us!
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 3. Story Timeline (Same Soul, New Soil) */}
      <div id="shopify-section-template--22256227418283__story_timeline_x6DFGe" className="shopify-section">
        <section className="bg-gradient text-foreground pt-0 pb-12 lg:pb-20">
          <div className="parent-wrapper bg-cream mx-3 lg:mx-4 rounded-b-[24px] lg:rounded-b-[80px] border-x-4 border-b-8 border-dark-brown overflow-hidden">
            {/* Drip Graphics */}
            <div className="w-full">
              <img
                src="/assets/images/timeline-drip.svg"
                alt="timeline drip"
                className="w-full hidden md:block aspect-auto object-cover"
              />
              <img
                src="/assets/images/timeline-drip-mobile.svg"
                alt="timeline drip"
                className="w-full md:hidden aspect-auto object-cover"
              />
            </div>

            <div className="container mx-auto px-4 max-w-5xl pt-8 pb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-champ uppercase text-center text-dark-brown mb-16 tracking-tight">
                Same Soul, New Soil
              </h2>

              <div className="space-y-16 lg:space-y-24">
                {/* Step 1: The Australian Way */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  <div className="order-1 flex justify-center lg:justify-end">
                    <img
                      src="/assets/images/timeline-1.jpg"
                      alt="The Australian Way"
                      className="border-4 border-dark-brown rounded-[20px] max-w-[440px] w-full aspect-[440/300] object-cover shadow-lg"
                    />
                  </div>
                  <div className="order-2 flex flex-col gap-3 text-left">
                    <div className="flex items-center gap-3">
                      <img src="/assets/images/mascot-cream.svg" alt="icon" className="w-8 h-8" />
                      <h3 className="text-2xl lg:text-3xl font-champ uppercase text-dark-brown">
                        THE AUSTRALIAN WAY
                      </h3>
                    </div>
                    <p className="text-sm lg:text-base font-body leading-relaxed text-dark-brown/90">
                      We brought the good stuff with us. Our Aussie know-how. Our ridiculously smooth drizzle. And our refusal to put weird stuff in peanut butter.
                    </p>
                    <p className="text-sm lg:text-base font-body leading-relaxed text-dark-brown/90">
                      Now made in America with American-grown peanuts. No palm oil. No stabilizers. No added sugar. Just peanuts doing peanut things.
                    </p>
                  </div>
                </div>

                {/* Step 2: The American Way */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  <div className="order-1 lg:order-2 flex justify-center lg:justify-start">
                    <img
                      src="/assets/images/timeline-2.png"
                      alt="The American Way"
                      className="border-4 border-dark-brown rounded-[20px] max-w-[440px] w-full aspect-[440/300] object-cover shadow-lg"
                    />
                  </div>
                  <div className="order-2 lg:order-1 flex flex-col gap-3 text-left lg:text-right">
                    <div className="flex items-center gap-3 lg:justify-end">
                      <h3 className="text-2xl lg:text-3xl font-champ uppercase text-dark-brown">
                        THE AMERICAN WAY
                      </h3>
                      <img src="/assets/images/peanut-tiny.png" alt="icon" className="w-6 h-6" />
                    </div>
                    <p className="text-sm lg:text-base font-body leading-relaxed text-dark-brown/90">
                      You guys know peanuts. We know drizzle. So we took American-grown peanuts and gave them the Drizzy treatment.
                    </p>
                    <p className="text-sm lg:text-base font-body leading-relaxed text-dark-brown/90">
                      America is the home of peanut butter, after all. We spent months finding the perfect American counterpart to our Kingaroy roots.
                    </p>
                  </div>
                </div>

                {/* Step 3: Well, That Escalated Quickly */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  <div className="order-1 flex justify-center lg:justify-end">
                    <img
                      src="/assets/images/timeline-3.jpg"
                      alt="Well, That Escalated Quickly"
                      className="border-4 border-dark-brown rounded-[20px] max-w-[440px] w-full aspect-[440/300] object-cover shadow-lg"
                    />
                  </div>
                  <div className="order-2 flex flex-col gap-3 text-left">
                    <div className="flex items-center gap-3">
                      <img src="/assets/images/mascot-cream.svg" alt="icon" className="w-8 h-8" />
                      <h3 className="text-2xl lg:text-3xl font-champ uppercase text-dark-brown">
                        WELL, THAT ESCALATED QUICKLY
                      </h3>
                    </div>
                    <p className="text-sm lg:text-base font-body leading-relaxed text-dark-brown/90">
                      A few months after launching in Australia, we packed our bags, packed the Drizzy and moved to America.
                    </p>
                    <p className="text-sm lg:text-base font-body leading-relaxed text-dark-brown/90">
                      Now our little Aussie peanut butter brand is hitting shelves in nearly 500 stores across the USA at Sprouts. Yeah. We’re still processing it too.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OurStory;
