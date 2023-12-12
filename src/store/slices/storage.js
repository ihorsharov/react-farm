import { createSlice } from '@reduxjs/toolkit';
import { list } from '../../const/crops/crops';

const barn = list.reduce((accumulator, el) => {
  accumulator[el.fieldName] = 0
  return accumulator;
}, {});

export const storageSlice = createSlice({
  name: 'storage',
  initialState: {
    barn: {...barn},
    seeds: {...barn},
    menu: {
      selectedField: null
    },
    money: 20,
  },
  reducers: {
    append: (state, action) => {
      const { fieldName, count } = action.payload;
      state.barn[fieldName] = state.barn[fieldName] + count;
    },
    plantCrop: (state, action) => {
      const { fieldName, count } = action.payload;
      if(state.seeds[fieldName] < count) throw new Error(`Missing ${fieldName.toLowerCase()} in your storage.`)
      state.seeds[fieldName] = state.seeds[fieldName] - count;
    },
    setMenuField: (state, action) => {
      state.menu.selectedField = action.payload;
    },
    sellCrop: (state, action) => {
      const {amount, fieldName, count} = action.payload;
      if(state.barn[fieldName] < count) throw new Error(`Missing ${fieldName.toLowerCase()} in your storage.`)
      
      state.barn[fieldName] -= count;
      state.money += amount;
    },
    buySeed: (state, action) => {
      const {amount, name, count} = action.payload;
      if(state.money < amount) throw new Error(`Not enouth money`)
      
      state.money -= amount;
      state.seeds[name] += count;
    },
  },
});

export const { actions } = storageSlice;
