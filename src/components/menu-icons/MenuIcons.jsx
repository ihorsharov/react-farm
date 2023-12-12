import React from 'react';
import styles from './menu-icons.module.css';
import { ReactComponent as BarnIcon } from '../../assets/menu/barn.svg';
import { ReactComponent as CartIcon } from '../../assets/menu/cart.svg';
import { ReactComponent as TruckIcon } from '../../assets/menu/truck.svg';
import { ReactComponent as CrossIcon } from '../../assets/menu/cross.svg';
import { useDispatch } from 'react-redux';
import { modalSlice } from '../../store/slices/modal';
export default function MenuIcons() {
  const [isActive, setIsActive] = React.useState(false);
  const dispatch = useDispatch();
  const { toggle } = modalSlice.actions;

  function handleOpen(type) {
    setIsActive(false);
    dispatch(toggle({ type }));
  }

  const handleIconClick = () => {
    setIsActive(prevIsActive => !prevIsActive);
  };

  return (
    <div className={`${styles.menuContainer} ${isActive && styles.active}`}>
      <div
        className={`${styles.pie} ${styles.pie1}`}
        onClick={() => handleOpen('shop')}
      >
        <div className={`${styles.pieColor} ${styles.pieColor1}`}>
          <CartIcon className={styles.card} width="100" height="100" />
        </div>
      </div>

      <div
        className={`${styles.pie} ${styles.pie2}`}
        onClick={() => handleOpen('storage')}
      >
        <div className={`${styles.pieColor} ${styles.pieColor2}`}>
          <BarnIcon className={styles.discount} width="100" height="100" />
        </div>
      </div>

      <div className={`${styles.pie} ${styles.pie3}`} onClick={handleIconClick}>
        <div className={`${styles.pieColor} ${styles.pieColor3}`}>
          <TruckIcon className={styles.cart} width="100" height="100" />
        </div>
      </div>
      <div
        className={styles.menu}
        onClick={() => {
          setIsActive(prevIsActive => !prevIsActive);
        }}
      >
        <CrossIcon className={styles.hamburger} width="100" height="100" />
      </div>
    </div>
  );
}
