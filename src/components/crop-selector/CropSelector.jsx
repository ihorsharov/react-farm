import React from 'react';
import { crops } from '../../const/crops';
import { useDispatch, useSelector } from 'react-redux';
import { areaSlice } from '../../store/slices/area';
import styles from './crop-selector.module.css';
import { storageSlice } from '../../store/slices/storage';
import { notificationSlice } from '../../store/slices/notification';
import { notifications } from '../../const/notifications';

export default function CropSelector({ id }) {
  const modalRef = React.useRef();
  const [showTooltip, setShowTooltip] = React.useState(false);

  const dispatch = useDispatch();
  const { plant } = areaSlice.actions;
  const { plantCrop } = storageSlice.actions;
  const { show } = notificationSlice.actions;

  const field = useSelector(state => state.area.fields[id]);
  // TODO: connect to seeds
  React.useEffect(() => {
    const timerId = setTimeout(() => {
      function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setShowTooltip(false);
        }
      }

      document.addEventListener('click', handleClickOutside);

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, 200);

    return () => clearTimeout(timerId);
  }, []);

  React.useEffect(() => {
    if (field.plant) setShowTooltip(false);
  }, [field.plant]);

  function handlePlant(crop) {
    setShowTooltip(false);
    try {
      dispatch(plantCrop(crop));
      dispatch(plant({ id, plant: crop }));
    } catch (error) {
      dispatch(
        show({
          type: notifications.type.error,
          text: error.message,
        })
      );
    }
  }

  function handleOpen() {
    setShowTooltip(true);
  }

  return (
    <div ref={modalRef} className={styles.modal} onClick={handleOpen}>
      <div className={`${styles.menu}  ${showTooltip && styles.active}`}>
        {crops.list.map((crop, i) => (
          <div
            style={{ '--i': i }}
            key={crop.fieldName}
            className={`${styles.button} ${showTooltip && styles.active}`}
            onClick={() => handlePlant(crop)}
          >
            <img src={crop.image} alt={crop.fieldName} style={{ '--i': i }} />
          </div>
        ))}
      </div>
    </div>
  );
}
