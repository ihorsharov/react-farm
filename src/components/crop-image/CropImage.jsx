import React from 'react';
import { easeInOut, easeOut, motion } from 'framer-motion';

export default function CropImage({ plant }) {
  return (
    <motion.img
      initial={{ scale: 0.1 }}
      animate={{ scale: 1 }}
      exit={{
        opacity: [1, 1, 0],
        y: [0, -15, 20],
        transition: { duration: 1, ease: easeInOut },
      }}
      draggable={false}
      src={plant.image}
      alt={plant.fieldName}
      transition={{ duration: plant.time, ease: easeOut }}
    />
  );
}
