import React from 'react';
import CropImage from '../crop-image/CropImage';
import styles from './garden-cup.module.css';

export default function GardenCup({ plant }) {
  return (
    <div className={styles.plantation}>
      <CropImage plant={plant} />
      <CropImage plant={plant} />
      <CropImage plant={plant} />
      <CropImage plant={plant} />
    </div>
  );
}
