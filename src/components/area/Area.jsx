import React from 'react';
import { useSelector } from 'react-redux';
import Field from '../field/Field';
import styles from './area.module.css';

export default function Area() {
  const { fields } = useSelector(state => state.area);

  return (
    <div className={styles.area}>
      {fields.map(field => (
        <Field key={field.id} field={field} />
      ))}
    </div>
  );
}
