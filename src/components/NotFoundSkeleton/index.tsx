import React from 'react';

import styles from './NotFoundSkeleton.module.scss';

const NotFoundSkeleton: React.FC = () => {
  return (
    <div className={styles["notfound--block"]}>
      <h1>
        <span>😕</span>
        <br />
        Nothing found
      </h1>
      <p className={styles["notfound--block__description"]}>
        Unfortunately, this page is not available in our online store
      </p>
    </div>
  );
};

export default NotFoundSkeleton