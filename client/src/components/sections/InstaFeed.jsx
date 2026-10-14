import React from 'react';
import { Heart, MessageCircle, Play } from 'lucide-react';

const InstaFeed = () => {
  const posts = [
    {
      id: '1',
      img: '/assets/images/insta-post-1.png',
      caption: 'Two Aussie favourites, now together in Texas! 🇦🇺🤝🇺🇸',
      link: 'https://instagram.com/getdrizzy',
    },
    {
      id: '2',
      img: '/assets/images/insta-post-2.png',
      caption: 'THE TOPPINGS BAR JUST GOT DRIZZYYYY 🥜💜 Drizzy has officially landed at Yo-Chi Dallas!!!',
      link: 'https://instagram.com/getdrizzy',
    },
    {
      id: '3',
      img: '/assets/images/insta-post-3.png',
      caption: 'Dallas, we’ll see y’all real soon 🤠👀 Can you guess where we’re coming?',
      link: 'https://instagram.com/getdrizzy',
    },
    {
      id: '4',
      img: '/assets/images/insta-post-4.png',
      caption: 'Okay wow… you guys REALLY love getting your Drizzy on Amazon 😭 In the meantime, find us at Sprouts 💜',
      link: 'https://instagram.com/getdrizzy',
    },
  ];

  return (
    <div id="shopify-section-template--22221105463467__178698386217403125" className="shopify-section">
      <section
        className="bg-background bg-gradient text-foreground color-scheme-1 py-12 lg:py-16"
        style={{
          '--spacing-top': '3.75rem',
          '--spacing-bottom': '3.75rem',
          '--spacing-top-mobile': '2.5rem',
          '--spacing-bottom-mobile': '2.5rem',
        }}
      >
        <div className="max-w-[87.5rem] mx-auto px-4 lg:px-6">
          <div className="container text-center mb-8">
            <h2 className="text-heading2 lg:text-heading1 text-center font-primary uppercase tracking-tight">
              Follow @getdrizzy
            </h2>
          </div>

          {/* Grid of Authentic Instagram posts */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl md:rounded-[24px] overflow-hidden border-2 md:border-3 border-dark-brown bg-white shadow-sm block transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={post.img}
                  alt={post.caption}
                  className="w-full h-auto aspect-[336/439] object-cover"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstaFeed;
