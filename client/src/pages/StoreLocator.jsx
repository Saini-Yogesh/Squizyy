import React, { useState, useEffect } from 'react';
import { getStores } from '../services/api';
import styles from './StoreLocator.module.css';

const defaultStores = [
  {
    _id: '1',
    name: 'Sprouts Farmers Market - Dallas Henderson',
    address: { street: '1800 N Henderson Ave', city: 'Dallas', state: 'TX', zip: '75206' },
    phone: '(214) 823-1188',
    hours: '7:00 AM - 10:00 PM Daily',
    inStock: true,
  },
  {
    _id: '2',
    name: 'Sprouts Farmers Market - Austin South Lamar',
    address: { street: '4001 S Lamar Blvd', city: 'Austin', state: 'TX', zip: '78704' },
    phone: '(512) 916-9055',
    hours: '7:00 AM - 10:00 PM Daily',
    inStock: true,
  },
  {
    _id: '3',
    name: 'Sprouts Farmers Market - Houston Heights',
    address: { street: '1901 Taylor St', city: 'Houston', state: 'TX', zip: '77007' },
    phone: '(713) 869-2323',
    hours: '7:00 AM - 10:00 PM Daily',
    inStock: true,
  },
  {
    _id: '4',
    name: 'Sprouts Farmers Market - Scottsdale Pavilions',
    address: { street: '8787 E Indian Bend Rd', city: 'Scottsdale', state: 'AZ', zip: '85250' },
    phone: '(480) 998-0522',
    hours: '7:00 AM - 10:00 PM Daily',
    inStock: true,
  },
  {
    _id: '5',
    name: 'Sprouts Farmers Market - Denver Colfax',
    address: { street: '3625 E Colfax Ave', city: 'Denver', state: 'CO', zip: '80206' },
    phone: '(303) 321-2130',
    hours: '7:00 AM - 10:00 PM Daily',
    inStock: true,
  },
];

const getAddressString = (addr) => {
  if (!addr) return '';
  if (typeof addr === 'string') return addr;
  return `${addr.street || ''}, ${addr.city || ''}, ${addr.state || ''} ${addr.zip || ''}`.trim();
};

const StoreLocator = () => {
  const [stores, setStores] = useState(defaultStores);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState(defaultStores[0]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      setStores(defaultStores);
      return;
    }

    const filtered = defaultStores.filter((s) => {
      const nameMatch = (s.name || '').toLowerCase().includes(query);
      const addrStr = getAddressString(s.address).toLowerCase();
      const cityMatch = typeof s.address === 'object' && s.address?.city ? s.address.city.toLowerCase().includes(query) : false;
      const stateMatch = typeof s.address === 'object' && s.address?.state ? s.address.state.toLowerCase().includes(query) : false;
      const zipMatch = typeof s.address === 'object' && s.address?.zip ? s.address.zip.includes(query) : false;
      return nameMatch || addrStr.includes(query) || cityMatch || stateMatch || zipMatch;
    });

    setStores(filtered);
    if (filtered.length > 0) setSelectedStore(filtered[0]);
  };

  useEffect(() => {
    let isMounted = true;
    getStores()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setStores(data);
          setSelectedStore(data[0]);
        }
      })
      .catch((err) => {
        console.warn('Using default store list:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.section} aria-label="Find Drizzy in stores">
        <div className={styles.container}>
          {/* Header */}
          <h1 className={styles.heading}>
            Locate Drizzy near you
          </h1>

          {/* Nationwide Banner */}
          <div className={styles.nationwideBanner}>
            <img
              src="/assets/images/Sprouts_Farmers_Market_Logo_4_Vectorized.svg"
              alt="Sprouts logo"
              className={styles.sproutsLogo}
            />
            <span className={styles.sproutsText}>
              Stocked nation-wide at Sprouts Farmers Market
            </span>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Enter city, state or ZIP code (e.g. Dallas, TX or 75206)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
              aria-label="Search stores by location"
            />
            <button
              type="submit"
              className={styles.searchBtn}
            >
              Search
            </button>
          </form>

          {/* Split View: Stores list & Map Visualizer */}
          <div className={styles.splitView}>
            {/* Store List */}
            <div className={styles.storeList}>
              {stores.length === 0 ? (
                <div className={styles.noStoresCard}>
                  <p className={styles.noStoresTitle}>No Stores Found</p>
                  <p className={styles.noStoresDesc}>
                    Try searching another zip code or city.
                  </p>
                </div>
              ) : (
                stores.map((store) => {
                  const isSelected = selectedStore?._id === store._id;
                  const addressText = getAddressString(store.address);

                  return (
                    <div
                      key={store._id}
                      onClick={() => setSelectedStore(store)}
                      className={`${styles.storeCard} ${
                        isSelected ? styles.storeCardSelected : styles.storeCardDefault
                      }`}
                      role="button"
                      tabIndex={0}
                    >
                      <div className={styles.cardHeader}>
                        <h3 className={styles.storeName}>
                          {store.name}
                        </h3>
                        <span className={styles.inStockBadge}>
                          In Stock
                        </span>
                      </div>
                      <p className={styles.storeAddress}>
                        {addressText}
                      </p>
                      <div className={styles.storeMeta}>
                        <span>{store.phone || '(800) DRIZZY-PB'}</span>
                        <span>{store.hours || '7:00 AM - 10:00 PM Daily'}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Map Preview Stage */}
            <div className={styles.mapCard}>
              <div className={styles.mapBg}>
                <img
                  src="/assets/images/map-v2.png"
                  alt=""
                  aria-hidden="true"
                  className={styles.mapBgImg}
                />
              </div>

              <div className={styles.selectedLocationBox}>
                <span className={styles.locationLabel}>
                  Selected Location
                </span>
                <h4 className={styles.locationTitle}>
                  {selectedStore?.name}
                </h4>
                <p className={styles.storeAddress}>
                  {getAddressString(selectedStore?.address)}
                </p>
                {selectedStore?.phone && (
                  <p className={styles.storeAddress}>
                    Phone: {selectedStore.phone}
                  </p>
                )}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${selectedStore?.name} ${getAddressString(selectedStore?.address)}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directionsLink}
                >
                  Get Directions on Google Maps ↗
                </a>
              </div>

              <div className={styles.counterBadgeWrapper}>
                <div className={styles.counterBadge}>
                  📍 {stores.length} Retail Locations Stocking Drizzy
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoreLocator;
