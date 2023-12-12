import React from 'react';
import PlantedField from './PlantedField';
import EmptyField from './EmptyField';
import CropSelector from '../crop-selector/CropSelector';
import styles from './field.module.css';
import { AnimatePresence } from 'framer-motion';

export default function Field({ field }) {
  // TODO: Add field texture
  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {field.plant ? (
          <PlantedField key={field.id + 'planted-field'} {...field} />
        ) : (
          <EmptyField id={field.id} />
        )}
      </AnimatePresence>
      <CropSelector id={field.id} />
    </div>
  );
}
