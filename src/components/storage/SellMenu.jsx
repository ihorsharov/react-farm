import React from 'react';
import styles from './sell-menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { storageSlice } from '../../store/slices/storage';
import { motion, AnimatePresence, useAnimate } from 'framer-motion';

export default function SellMenu() {
  const [sellCount, setSellCount] = React.useState(1);
  const [error, setError] = React.useState(null);
  const dispatch = useDispatch();
  const { sellCrop, setMenuField } = storageSlice.actions;
  const storage = useSelector(state => state.storage);
  const [scope, animate] = useAnimate();

  const selectedField = storage.menu.selectedField || {};
  const maxAmount = storage.barn[selectedField.fieldName];

  React.useEffect(() => {
    setSellCount(1);
    setError(null);
  }, [storage.menu.selectedField]);

  function handleSell(e) {
    e.preventDefault();
    if (sellCount <= 0) return setError('Amount should be greater than 0');
    if (error) {
      return animate(
        scope.current,
        { rotate: [0, -1, 0, 1, 0] },
        { duration: 0.2 }
      );
    }

    const amount = sellCount * selectedField.cost;

    try {
      dispatch(
        sellCrop({
          amount: amount,
          fieldName: selectedField.fieldName,
          count: sellCount,
        })
      );
    } catch (error) {
      return setError(error.message);
    }

    dispatch(setMenuField(null));
    setSellCount(0);
  }

  function handleCountChange(e) {
    const sellCount = Number(e.target.value);

    setSellCount(sellCount >= 0 ? sellCount : 0);
    if (sellCount <= 0) return setError('Amount should be greater than 0');
    if (sellCount > maxAmount && maxAmount) {
      return setError(`You have only ${maxAmount} ${selectedField.fieldName}s`);
    }
    if (!maxAmount) {
      return setError(`You don't have ${selectedField.fieldName}`);
    }
    setError(null);
  }

  return (
    <AnimatePresence>
      {storage.menu.selectedField && (
        <motion.form
          key="sell-menu"
          onSubmit={handleSell}
          className={styles.menu}
          animate={{ y: 0, zIndex: 300, scaleY: 1, scaleX: 1, borderRadius: 0 }}
          exit={{ opacity: 0, y: -50, zIndex: 300 }}
          initial={{
            zIndex: 300,
            scaleY: 0,
            scaleX: 0.5,
            y: -220,
          }}
          transition={{
            type: 'spring',
            damping: 15,
          }}
        >
          <div className={styles.image}>
            <img
              className={styles.cropImage}
              draggable={false}
              src={selectedField.image}
              alt={selectedField.fieldName}
            />
          </div>
          <h3 className={styles.title}>Sell: {selectedField.fieldName}</h3>
          <label>
            Count:
            <input
              value={sellCount}
              onChange={handleCountChange}
              type="number"
            />
            <AnimatePresence>
              {error && (
                <motion.p
                  key="sell-menu-error"
                  className={styles.error}
                  ref={scope}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </label>
          <div className={styles.menuResult}>
            Total Cost: {sellCount * selectedField.cost}$
          </div>
          <button className={styles.button} type="submit">
            Submit
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
