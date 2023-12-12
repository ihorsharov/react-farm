import React from 'react';
import { useSelector } from 'react-redux';
import styles from './header.module.css';
import logo from '../../assets/logo192.png';

export default function Header() {
  const storage = useSelector(state => state.storage);

  return (
    <div className={styles.header}>
      <div>
        <img src={logo} alt="logo" className={styles.logo} />
      </div>
      <p className={styles.money}>${storage.money}</p>
      {/* TODO: add seed displaying to improve user experiece */}
    </div>
  );
}
