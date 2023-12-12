import React from 'react';
import styles from './shop.module.css';
import { list } from '../../const/crops/crops';
import { useDispatch, useSelector } from 'react-redux';
import BuyMenu from './BuyMenu';
import { shopSlice } from '../../store/slices/shop';
import bagIcon from '../../assets/shop/bag.svg';

export default function Shop() {
  const seeds = useSelector(state => state.shop.seeds);
  const dispatch = useDispatch();
  const { setMenuField } = shopSlice.actions;

  function openMenu(seed) {
    dispatch(setMenuField(seed));
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <table className={styles.tableContainer}>
          <thead className={styles.tableHead}>
            <tr>
              <th></th>
              <th>Seed</th>
              <th>Available</th>
              <th>Cost</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map(crop => {
              const seed = seeds[crop.fieldName];
              return (
                <tr key={crop.fieldName}>
                  <td>
                    <div className={styles.bag}>
                      <img
                        className={styles.bag}
                        draggable={false}
                        src={bagIcon}
                        alt={crop.fieldName}
                      />
                      <img
                        className={styles.cropImage}
                        draggable={false}
                        src={crop.image}
                        alt={crop.fieldName}
                      />
                    </div>
                  </td>
                  <td>{crop.fieldName}</td>
                  <td>{seed.count}</td>
                  <td>{seed.cost}$</td>
                  <td>
                    <button
                      onClick={() => openMenu(seed)}
                      className={styles.button}
                    >
                      Buy
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <BuyMenu />
    </div>
  );
}
