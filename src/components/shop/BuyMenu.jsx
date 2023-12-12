import React from 'react';
import styles from './buy-menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence, useAnimate } from 'framer-motion';
import { shopSlice } from '../../store/slices/shop';
import { storageSlice } from '../../store/slices/storage';
import bagIcon from '../../assets/shop/bag.svg';

export default function BuyMenu() {
  const [buyCount, setBuyCount] = React.useState(1);
  const [error, setError] = React.useState(null);
  const dispatch = useDispatch();
  const { decrease, setMenuField } = shopSlice.actions;
  const { buySeed } = storageSlice.actions;
  const shop = useSelector(state => state.shop);
  const [scope, animate] = useAnimate();

  const selectedField = shop.menu.selectedField || {};
  const maxAmount = shop.seeds[selectedField.name]?.count;

  React.useEffect(() => {
    setBuyCount(1);
    setError(null);
  }, [shop.menu.selectedField]);

  function handleSell(e) {
    e.preventDefault();
    if (buyCount <= 0) return setError('Amount should be greater than 0');
    if (error) {
      return animate(
        scope.current,
        { rotate: [0, -1, 0, 1, 0] },
        { duration: 0.2 }
      );
    }

    const amount = buyCount * selectedField.cost;

    try {
      dispatch(
        buySeed({
          amount: amount,
          name: selectedField.name,
          count: buyCount,
        })
      );
    } catch (error) {
      return setError(error.message);
    }

    dispatch(decrease({ name: selectedField.name, count: buyCount }));
    dispatch(setMenuField(null));
    setBuyCount(0);
  }

  function handleCountChange(e) {
    const buyCount = Number(e.target.value);

    setBuyCount(buyCount >= 0 ? buyCount : 0);
    if (buyCount <= 0) return setError('Amount should be greater than 0');
    if (buyCount > maxAmount && maxAmount) {
      return setError(`We have only ${maxAmount} seed`);
    }
    if (!maxAmount) {
      return setError(`We don't have ${selectedField.fieldName} seeds`);
    }
    setError(null);
  }

  return (
    <AnimatePresence>
      {shop.menu.selectedField && (
        <motion.form
          key="buy-menu"
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
          <div className={styles.imageContainer}>
            <img
              draggable={false}
              src={bagIcon}
              alt={selectedField.name}
              className={styles.bag}
            />
            <img
              className={styles.image}
              draggable={false}
              src={selectedField.image}
              alt={selectedField.name}
            />
          </div>
          <h3 className={styles.title}>Buy: {selectedField.name}</h3>
          <label>
            Count:
            <input
              value={buyCount}
              onChange={handleCountChange}
              type="number"
            />
            <AnimatePresence>
              {error && (
                <motion.p
                  key="buy-menu-error"
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
            Total Cost: {buyCount * selectedField.cost}$
          </div>
          <button className={styles.button} type="submit">
            Submit
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
