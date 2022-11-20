import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modals',
  initialState: {
    modalInfo: {}
  },
  reducers: {
    registerModal: (state, action) => {
      state.modalInfo[action.payload] = false;
    },
    showModal: (state, action) => {
      state.modalInfo[action.payload] = true;
    },
    hideModal: (state, action) => {
      state.modalInfo[action.payload] = false;
    },
  },
})

export const { registerModal, showModal, hideModal } = modalSlice.actions

export default modalSlice.reducer