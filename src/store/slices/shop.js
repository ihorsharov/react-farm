import { createSlice } from '@reduxjs/toolkit';
import { list } from '../../const/crops/crops';

const seeds = list.reduce((accumulator, el) => {
  accumulator[el.fieldName] = {
    name: el.fieldName,
    cost: el.seedCost,
    image: el.seedImage,
    count: 20,
  };
  return accumulator;
}, {});

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    seeds: {...seeds},
    menu: {
      selectedField: null
    },
  },
  reducers: {
    setMenuField: (state, action) => {
      state.menu.selectedField = action.payload;
    },
    decrease: (state, action) => {
      const {name, count} = action.payload;
      if(state.seeds[name].count < count) throw new Error(`Missing ${name.toLowerCase()} in the shop.`)
      
      state.seeds[name].count -= count;
    },
  },
});

export const { actions } = shopSlice;
