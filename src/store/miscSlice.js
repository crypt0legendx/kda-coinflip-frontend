import { createSlice } from "@reduxjs/toolkit";

export const miscSlice = createSlice({
  name: 'miscInfo',
  initialState: {
    unsafe: false,
  },
  reducers: {
    setUnsafe: (state, action) => {
      state.unsafe = action.payload;
    },
  },
})

export const { 
  setUnsafe
} = miscSlice.actions;

export default miscSlice.reducer;