import { createSlice } from '@reduxjs/toolkit';
import shuffle from 'lodash.shuffle';

const initialState = {
  items: [
    { id: 1, name: 'машина', active: false },
    { id: 2, name: 'коза', active: false },
    { id: 3, name: 'коза', active: false },
  ],
  activeDoor: undefined,
  isButton: false,
  isAcceptButton: false,
  goatDoor: undefined,
  secondActiveDoor: undefined,
  win: 0,
  lose: 0,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setActiveDoor: (state, action) => {
      state.activeDoor = action.payload - 1;
    },
    setIsButton: (state) => {
      state.isButton = true;
      state.items = state.items.map((item, i) => {
        if (i === state.goatDoor) {
          return { id: item.id, name: item.name, active: true };
        } else {
          return item;
        }
      });
    },
    setIsAcceptButton: (state) => {
      state.isAcceptButton = true;
      if (state.items[state.activeDoor].name === 'машина') {
        state.win += 1;
      } else {
        state.lose += 1;
      }
      state.items = state.items.map((item, i) => {
        if (i === state.activeDoor) {
          return { id: item.id, name: item.name, active: true };
        } else {
          return item;
        }
      });
    },
    setGoatDoor: (state, action) => {
      state.goatDoor = action.payload;
    },
    setSecondActiveDoor: (state, action) => {
      state.secondActiveDoor = action.payload;
    },
    shuffleItems: (state) => {
      state.items = shuffle(state.items);
    },
    reset: (state) => {
      state.items = shuffle([
        { id: 1, name: 'машина', active: false },
        { id: 2, name: 'коза', active: false },
        { id: 3, name: 'коза', active: false },
      ]);
      state.activeDoor = undefined;
      state.isButton = false;
      state.isAcceptButton = false;
      state.goatDoor = undefined;
      state.secondActiveDoor = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setActiveDoor,
  setIsButton,
  setGoatDoor,
  setSecondActiveDoor,
  setIsAcceptButton,
  shuffleItems,
  reset,
} = mainSlice.actions;

export default mainSlice.reducer;
