import React from 'react';
import styles from './Spinner.module.css';

const Spinner = ({ size = 'md', text = '', className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={`${styles.spinner} ${styles[size] || styles.md}`} />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default Spinner;
