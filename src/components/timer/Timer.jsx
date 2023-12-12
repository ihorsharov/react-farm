import React from 'react';
import { normalizeTime } from '../../utils/normalizeTime';
import styles from './timer.module.css';

export default function Timer({ time, callback }) {
  const [renderTime, setRenderTime] = React.useState(time);

  React.useEffect(() => {
    const id = setInterval(() => {
      setRenderTime(prev => {
        if (prev <= 0) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [callback]);

  if (!renderTime) return callback();
  return <div className={styles.timer}>{normalizeTime(renderTime)}s</div>;
}
