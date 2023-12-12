import React from 'react';
import styles from './modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { modalSlice } from '../../store/slices/modal';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ children, title, type }) {
  const dispatch = useDispatch();
  const open = useSelector(state => state.modal[type]);
  const { toggle } = modalSlice.actions;

  function handleClose() {
    dispatch(toggle({ type }));
  }

  const containerInitialAnimation = {
    scale: 0,
    opacity: 0,
    rotate: 90,
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className={styles.wrapper}
        >
          <motion.div
            initial={containerInitialAnimation}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}
            exit={containerInitialAnimation}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            onClick={e => e.stopPropagation()}
            className={styles.container}
          >
            <div className={styles.header}>{title}</div>
            <div>{children}</div>
            <button onClick={handleClose} className={styles.button}>
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
