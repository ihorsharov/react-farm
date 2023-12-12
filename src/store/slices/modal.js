import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    storage: false,
    shop: false,
  },
  reducers: {
    toggle: (state, action) => {
      const { type } = action.payload;
      state[type] = !state[type];
    }
  },
});

export const { actions } = modalSlice;
