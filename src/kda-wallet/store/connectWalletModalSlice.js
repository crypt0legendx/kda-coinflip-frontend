import { createSlice } from '@reduxjs/toolkit'

export const connectWalletModalSlice = createSlice({
  name: 'connectWalletModal',
  initialState: {
    showing: false,
  },
  reducers: {
    showConnectWalletModal: (state) => {
      state.showing = true;
    },
    hideConnectWalletModal: (state) => {
      state.showing = false;
    },
  },
})

export const { showConnectWalletModal, hideConnectWalletModal } = connectWalletModalSlice.actions

export default connectWalletModalSlice.reducer