import React from 'react';
import styles from './field.module.css';

export default function EmptyField({ id }) {
  return <div className={styles.field}>Plant {id}</div>;
}
