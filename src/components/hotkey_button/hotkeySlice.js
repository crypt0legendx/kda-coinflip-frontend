import { createSlice } from "@reduxjs/toolkit";

export const hotkeySlice = createSlice({
  name: 'keysPressed',
  initialState: {
    state: {}
  },
  reducers: {
    setKeyState: (state, action) => {
      state.state = action.payload;
    },
  },
})

export const { 
  setKeyState
} = hotkeySlice.actions;

export default hotkeySlice.reducer;