import React from 'react';
import styles from './Badge.module.css';

const Badge = ({
  children,
  variant = 'green', // 'green', 'purple', 'dark', 'outline'
  size = 'md',
  className = '',
  ...props
}) => {
  const rootClasses = [
    styles.badge,
    styles[variant] || styles.green,
    styles[size] || styles.md,
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={rootClasses} {...props}>
      {children}
    </span>
  );
};

export default Badge;
