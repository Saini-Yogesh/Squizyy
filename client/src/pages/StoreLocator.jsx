import React, { useState, useEffect } from 'react';
import { getStores } from '../services/api';

const defaultStores = [
  {
    _id: '1',
    name: 'Sprouts Farmers Market - Dallas Henderson',
    address: { street: '1800 N Henderson Ave', city: 'Dallas', state: 'TX', zip: '75206' },
    phone: '(214) 823-1188',
    hours: '7:00 AM - 10:00 PM Daily',
    inStock: true
  },
  {
    _id: '2',
    name: 'Sprouts Farmers Market - Austin South Lamar',
    address: { street: '4001 S Lamar Blvd', city: 'Austin', state: 'TX', zip: '78704' },
    phone: '(512) 916-9055',
    hours: '7:00 AM - 10:00 PM Daily',
    inStock: true
  },
  {
    _id: '3',
    name: 'Sprouts Farmers Market - Houston Heights',
    address: { street: '1901 Taylor St', city: 'Houston', state: 'TX', zip: '77007' },
    phone: '(713) 869-2323',
    hours: '7:00 AM - 10:00 PM Daily',
    inStock: true
  },
  {
    _id: '4',
    name: 'Sprouts Farmers Market - Scottsdale Pavilions',
    address: { street: '8787 E Indian Bend Rd', city: 'Scottsdale', state: 'AZ', zip: '85250' },
    phone: '(480) 998-0522',
    hours: '7:00 AM - 10:00 PM Daily',
    inStock: true
  },
  {
    _id: '5',
    name: 'Sprouts Farmers Market - Denver Colfax',
    address: { street: '3625 E Colfax Ave', city: 'Denver', state: 'CO', zip: '80206' },
    phone: '(303) 321-2130',
    hours: '7:00 AM - 10:00 PM Daily',
    inStock: true
  }
];

const StoreLocator = () => {
  const [stores, setStores] = useState(defaultStores);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedStore, setSelectedStore] = useState(defaultStores[0]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setStores(defaultStores);
      return;
    }
    const filtered = defaultStores.filter(
      (s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.address.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.address.zip.includes(searchTerm)
    );
    setStores(filtered);
    if (filtered.length > 0) setSelectedStore(filtered[0]);
  };

  useEffect(() => {
    getStores()
      .then((data) => {
        if (data && data.length > 0) {
          setStores(data);
          setSelectedStore(data[0]);
        }
      })
      .catch((err) => {
        console.warn('Using default store list:', err);
      });
  }, []);

  return (
    <div className="w-full bg-cream min-h-screen">
      <div id="shopify-section-template--22276677566635__17871402889e6d1fbe" className="shopify-section">
        <section className="bg-background bg-gradient text-foreground color-scheme-1 py-10 lg:py-16">
          <div className="container mx-auto px-4 max-w-[87.5rem]">
            {/* Header */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-champ uppercase text-center text-dark-brown tracking-tight mb-4">
              Locate Drizzy near you
            </h1>

            {/* Nationwide Banner */}
            <div className="max-w-2xl mx-auto flex items-center justify-center gap-4 bg-white/80 border-2 border-dark-brown rounded-full py-2.5 px-6 mb-10 shadow-sm">
              <img
                src="/assets/images/Sprouts_Farmers_Market_Logo_4_Vectorized.svg"
                alt="Sprouts logo"
                className="h-7 w-auto object-contain"
              />
              <span className="font-champ text-xs sm:text-sm uppercase text-dark-brown">
                Stocked nation-wide at Sprouts Farmers Market
              </span>
            </div>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10 flex gap-3">
              <input
                type="text"
                placeholder="Enter city, state or ZIP code (e.g. Dallas, TX or 75206)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-white border-2 border-dark-brown rounded-full px-5 py-3.5 text-xs font-mono text-dark-brown placeholder:text-dark-brown/50 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-accent-purple text-dark-brown border-2 border-dark-brown rounded-full px-6 py-3.5 font-champ text-sm uppercase button-primary hover:bg-cream"
              >
                Search
              </button>
            </form>

            {/* Split View: Stores list & Map Visualizer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Store List */}
              <div className="lg:col-span-5 space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {stores.length === 0 ? (
                  <div className="p-8 bg-white border-2 border-dark-brown rounded-2xl text-center">
                    <p className="font-champ text-lg uppercase text-dark-brown mb-1">No Stores Found</p>
                    <p className="text-xs font-mono text-dark-brown/70">
                      Try searching another zip code or city.
                    </p>
                  </div>
                ) : (
                  stores.map((store) => {
                    const isSelected = selectedStore?._id === store._id;
                    return (
                      <div
                        key={store._id}
                        onClick={() => setSelectedStore(store)}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-white border-dark-brown shadow-md scale-[1.01]'
                            : 'bg-white/70 border-dark-brown/30 hover:border-dark-brown'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-champ text-base uppercase text-dark-brown leading-snug">
                            {store.name}
                          </h3>
                          <span className="inline-block px-2 py-0.5 rounded-full bg-accent-green/15 text-accent-green text-[10px] font-mono font-bold whitespace-nowrap">
                            In Stock
                          </span>
                        </div>
                        <p className="mt-2 text-xs font-mono text-dark-brown/80">
                          {store.address.street}, {store.address.city}, {store.address.state} {store.address.zip}
                        </p>
                        <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-dark-brown/70 pt-2 border-t border-dark-brown/10">
                          <span>{store.phone}</span>
                          <span>{store.hours}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Map Preview Stage */}
              <div className="lg:col-span-7 bg-cream border-4 border-b-8 border-dark-brown rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-between">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <img
                    src="/assets/images/map-v2.png"
                    alt="Map background"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative z-10 bg-white/90 border border-dark-brown rounded-2xl p-4 max-w-sm shadow-md">
                  <span className="text-[10px] font-mono font-bold uppercase text-accent-green block mb-1">
                    Selected Location
                  </span>
                  <h4 className="font-champ text-lg uppercase text-dark-brown">
                    {selectedStore?.name}
                  </h4>
                  <p className="text-xs font-mono text-dark-brown/80 mt-1">
                    {selectedStore?.address.street}, {selectedStore?.address.city}, {selectedStore?.address.state} {selectedStore?.address.zip}
                  </p>
                  <p className="text-xs font-mono text-dark-brown/70 mt-1">
                    Phone: {selectedStore?.phone}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${selectedStore?.name} ${selectedStore?.address.street} ${selectedStore?.address.city}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-xs font-mono font-bold underline text-dark-brown"
                  >
                    Get Directions on Google Maps ↗
                  </a>
                </div>

                <div className="relative z-10 mt-6 flex justify-center">
                  <div className="bg-dark-brown text-cream px-6 py-3 rounded-full font-champ text-xs uppercase shadow-lg">
                    📍 {stores.length} Retail Locations Stocking Drizzy
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

export default StoreLocator;
