import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { list } from '../../const/crops/crops';
import styles from './storage.module.css';
import { storageSlice } from '../../store/slices/storage';
import SellMenu from './SellMenu';

export default function Storage() {
  const storage = useSelector(state => state.storage.barn);
  const dispatch = useDispatch();
  const { setMenuField } = storageSlice.actions;

  function openMenu(crop) {
    dispatch(setMenuField(crop));
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <table className={styles.tableContainer}>
          <thead className={styles.tableHead}>
            <tr>
              <th></th>
              <th>Crop</th>
              <th>Count</th>
              <th>Cost</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map(crop => {
              const cropCount = storage[crop.fieldName];
              return (
                <tr key={crop.fieldName}>
                  <td>
                    <img
                      className={styles.cropImage}
                      draggable={false}
                      src={crop.image}
                      alt={crop.fieldName}
                    />
                  </td>
                  <td>{crop.fieldName}</td>
                  <td>{cropCount}</td>
                  <td>{crop.cost}$</td>
                  <td>{cropCount * crop.cost}$</td>
                  <td>
                    <button
                      onClick={() => openMenu(crop)}
                      className={styles.button}
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <SellMenu />
    </div>
  );
}
