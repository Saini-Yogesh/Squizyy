const productsData = [
  {
    name: 'Drizzy Squeezy Peanut Butter 19.4 Oz',
    slug: 'drizzy-squeezy-peanut-butter-19-4-oz',
    description: 'Drizzy™ is an ultra-smooth, drizzlable peanut butter made to fit modern life. No jars. No knives. No mess. Sourced exclusively from Texas for a deeper roast and a smoother drizzle you won\'t find in supermarkets.',
    price: 999, // $9.99
    compareAtPrice: 999,
    category: 'Peanut Butter',
    featured: true,
    available: true,
    rating: 4.9,
    reviewsCount: 1042,
    images: [
      '/assets/images/USADRIZZYFRONTcopy_1.jpg',
      '/assets/images/USADRIZZYBACKcopy_1.jpg',
      '/assets/images/USADRIZZYHOWTOcopy_1.jpg',
      '/assets/images/USADRIZZYGOODcopy_1.jpg',
      '/assets/images/DRIZZY12302_1.jpg',
      '/assets/images/DRIZZY13034_1.jpg',
      '/assets/images/pdp-image.png'
    ],
    details: {
      origin: 'Texas, USA',
      size: '19.4 oz (550g)',
      ingredients: '100% Roasted American Peanuts, Splash of Peanut Oil, Pinch of Salt',
      protein: '7g per serve',
      shelfLife: '12 months from roasting',
      storage: 'Store upright in a cool, dry place. No messy refrigeration needed!'
    },
    bottleOptions: [
      {
        quantity: 1,
        title: '1x Bottle',
        price: 999,
        compareAtPrice: 999,
        discountAmount: 0,
        savingsPercent: '0%',
        badge: '',
        image: '/assets/images/1_bottle.png'
      },
      {
        quantity: 2,
        title: '2x Bottles',
        price: 1898,
        compareAtPrice: 1998,
        discountAmount: 100,
        savingsPercent: '5%',
        badge: '',
        image: '/assets/images/2_bottle.png'
      },
      {
        quantity: 3,
        title: '3x Bottles',
        price: 2797,
        compareAtPrice: 2997,
        discountAmount: 200,
        savingsPercent: '7%',
        badge: '/assets/images/most-popular-sticker.png',
        image: '/assets/images/3_bottle.png'
      },
      {
        quantity: 6,
        title: '6x Bottles',
        price: 4994,
        compareAtPrice: 5994,
        discountAmount: 1000,
        savingsPercent: '17%',
        badge: '/assets/images/best-value-sticker.png',
        image: '/assets/images/6_bottles.png'
      }
    ],
    variants: [
      {
        title: 'Default Title',
        sku: 'DRIZZY-PB-001-USA',
        price: 999,
        compareAtPrice: 999,
        available: true,
        bottleCount: 1
      }
    ]
  },
  {
    name: 'Food Services Case Pack (6 units)',
    slug: 'food-services-pack-6-units',
    description: 'Bulk case pack crafted for cafes, restaurants, bakeries, smoothie shops, and commercial food services. Six 19.4 oz squeeze bottles for fast, clean drizzling.',
    price: 3750, // $37.50
    compareAtPrice: 4200,
    category: 'Commercial & Food Service',
    featured: false,
    available: true,
    rating: 5.0,
    reviewsCount: 88,
    images: [
      '/assets/images/6_bottles.png',
      '/assets/images/DRIZZY13152_copy.jpg',
      '/assets/images/pdp-image.png'
    ],
    details: {
      origin: 'Texas, USA',
      size: '6 x 19.4 oz bottles (7.27 lbs total)',
      ingredients: '100% High-Oleic Roasted American Peanuts, Peanut Oil',
      protein: '7g per 32g serving',
      shelfLife: '12 months',
      storage: 'Room temperature storage, dispense directly from precision drip tip'
    },
    bottleOptions: [
      {
        quantity: 1,
        title: '1x Case (6 Bottles)',
        price: 3750,
        compareAtPrice: 4200,
        discountAmount: 450,
        savingsPercent: '11%',
        badge: '/assets/images/best-value-sticker.png',
        image: '/assets/images/6_bottles.png'
      }
    ],
    variants: [
      {
        title: 'Case Pack (6 Units)',
        sku: 'DRIZZY-FS-006-USA',
        price: 3750,
        compareAtPrice: 4200,
        available: true,
        bottleCount: 6
      }
    ]
  }
];

const storesData = [
  {
    name: 'Sprouts Farmers Market - Dallas Henderson',
    chain: 'Sprouts Farmers Market',
    address: '1800 N Henderson Ave',
    city: 'Dallas',
    state: 'TX',
    zip: '75206',
    phone: '(214) 826-0044',
    inStock: true,
    latitude: 32.8124,
    longitude: -96.7725
  },
  {
    name: 'Sprouts Farmers Market - Austin South Lamar',
    chain: 'Sprouts Farmers Market',
    address: '4001 S Lamar Blvd',
    city: 'Austin',
    state: 'TX',
    zip: '78704',
    phone: '(512) 383-0500',
    inStock: true,
    latitude: 30.2372,
    longitude: -97.7876
  },
  {
    name: 'Sprouts Farmers Market - Houston Heights',
    chain: 'Sprouts Farmers Market',
    address: '1070 N Shepherd Dr',
    city: 'Houston',
    state: 'TX',
    zip: '77008',
    phone: '(713) 861-1250',
    inStock: true,
    latitude: 29.7903,
    longitude: -95.4095
  },
  {
    name: 'Sprouts Farmers Market - Santa Monica',
    chain: 'Sprouts Farmers Market',
    address: '915 Wilshire Blvd',
    city: 'Santa Monica',
    state: 'CA',
    zip: '90401',
    phone: '(310) 393-0100',
    inStock: true,
    latitude: 34.0223,
    longitude: -118.4912
  },
  {
    name: 'Sprouts Farmers Market - Scottsdale Central',
    chain: 'Sprouts Farmers Market',
    address: '4402 N Miller Rd',
    city: 'Scottsdale',
    state: 'AZ',
    zip: '85251',
    phone: '(480) 949-5500',
    inStock: true,
    latitude: 33.5015,
    longitude: -111.9174
  },
  {
    name: 'Sprouts Farmers Market - Denver Highlands',
    chain: 'Sprouts Farmers Market',
    address: '3625 W Colfax Ave',
    city: 'Denver',
    state: 'CO',
    zip: '80204',
    phone: '(303) 595-3600',
    inStock: true,
    latitude: 39.7398,
    longitude: -105.0347
  },
  {
    name: 'Sprouts Farmers Market - Atlanta Buckhead',
    chain: 'Sprouts Farmers Market',
    address: '2530 Piedmont Rd NE',
    city: 'Atlanta',
    state: 'GA',
    zip: '30324',
    phone: '(404) 946-8800',
    inStock: true,
    latitude: 33.8245,
    longitude: -84.3672
  }
];

const reviewsData = [
  {
    productSlug: 'drizzy-squeezy-peanut-butter-19-4-oz',
    author: 'Sarah M.',
    rating: 5,
    title: 'Never buying a jar again!',
    content: 'The squeeze bottle is revolutionary. I put this on oatmeal every single morning. No oily separation on top and zero sticky spoons to wash!',
    verified: true,
    location: 'Austin, TX'
  },
  {
    productSlug: 'drizzy-squeezy-peanut-butter-19-4-oz',
    author: 'Liam O.',
    rating: 5,
    title: 'Discovered in Bondi, so glad it is in the US now',
    content: 'Been having Drizzy in Australia for years. The roast profile on this Texas peanut version is genuinely richer and the consistency is sheer perfection.',
    verified: true,
    location: 'Sydney / New York'
  },
  {
    productSlug: 'drizzy-squeezy-peanut-butter-19-4-oz',
    author: 'Jessica T.',
    rating: 5,
    title: 'The cleanest drizzle ever',
    content: 'My kids love drizzling their own apples and banana pancakes. Normally they would destroy the kitchen with a knife and jar. 10/10 innovation.',
    verified: true,
    location: 'Los Angeles, CA'
  },
  {
    productSlug: 'drizzy-squeezy-peanut-butter-19-4-oz',
    author: 'Marcus K.',
    rating: 5,
    title: 'Real peanuts, incredible flavor',
    content: 'Just pure roasted peanuts with zero palm oil or fillers. The texture is smooth like silk. Got the 6-pack to get free shipping and already through 2 bottles.',
    verified: true,
    location: 'Dallas, TX'
  },
  {
    productSlug: 'drizzy-squeezy-peanut-butter-19-4-oz',
    author: 'Chloe P.',
    rating: 5,
    title: 'Best gym fuel ever',
    content: 'Easy 7g protein hit straight into smoothies or on rice cakes right before workouts. Stays in my gym bag without any leaking.',
    verified: true,
    location: 'Brisbane, Australia'
  }
];

module.exports = {
  productsData,
  storesData,
  reviewsData
};
