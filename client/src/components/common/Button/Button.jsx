import React from 'react';
import styles from './Button.module.css';

const Button = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  fullWidth = false,
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  ...props
}) => {
  const rootClasses = [
    styles.button,
    styles[variant] || styles.primary,
    styles[size] || styles.md,
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={rootClasses}
      {...props}
    >
      {loading ? (
        <span className={styles.spinnerWrapper}>
          <span className={styles.spinner} />
          <span>{typeof children === 'string' ? children : 'Loading...'}</span>
        </span>
      ) : children}
    </button>
  );
};

export default Button;
