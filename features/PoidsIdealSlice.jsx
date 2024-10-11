import { createSlice } from '@reduxjs/toolkit';

const poidsIdealSlice = createSlice({
  name: 'poidsIdeal',
  initialState: {
    weight: null,
    isAdult: false,
    gender: '',
  },
  reducers: {
    setAdult(state, action) {
      state.isAdult = action.payload;
    },
    setGender(state, action) {
      state.gender = action.payload;
    },
    calculateWeight(state) {
      if (state.isAdult) {
        state.weight = state.gender === 'male' ? 70 : 60; // Example weight calculation
      }
    },
  },
});

export const { setAdult, setGender, calculateWeight } = poidsIdealSlice.actions;
export default poidsIdealSlice.reducer;
