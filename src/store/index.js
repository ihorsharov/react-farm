import { configureStore } from '@reduxjs/toolkit';

import { storageSlice } from './slices/storage';
import { areaSlice } from './slices/area';
import { modalSlice } from './slices/modal';
import { shopSlice } from './slices/shop';
import { notificationSlice } from './slices/notification';

// const preloadedState = localStorage.getItem('preloadedState')
//   ? JSON.parse(localStorage.getItem('preloadedState'))
//   : {}

const store = configureStore({
  reducer: {
    storage: storageSlice.reducer,
    area: areaSlice.reducer,
    shop: shopSlice.reducer,
    modal: modalSlice.reducer,
    notification: notificationSlice.reducer,
  },
  // preloadedState
});
// TODO: REFACTORE SELECTORS TO ADD MORE READABILITY TO YOUR FUCKING CODE

// store.subscribe(() =>
//   localStorage.setItem('preloadedState', JSON.stringify(store.getState()))
// )

export default store;
