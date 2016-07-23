import React from 'react';

import styles from '../styles/scoped/components/ContainerCard.scss';

const ContainerCard = ({children, className, ...otherProps}) => {
  let containerClassName = `${styles.container}`;

  if (className) {
    containerClassName += ` ${className}`;
  }

  return (
    <div
      className={containerClassName}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default ContainerCard;
