import React from 'react';
import s from './OfflineNotification.module.css';

const OfflineNotification = () => {
  return (
    <div className={s.offlineNotification}>
      <div className={s.content}>
        <span className={s.icon}>⚠️</span>
        <span className={s.message}>
          Modo offline activo - Mostrando datos locales
        </span>
      </div>
    </div>
  );
};

export default OfflineNotification; 