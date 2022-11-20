import { createSlice } from "@reduxjs/toolkit";

export const metaSlice = createSlice({
  name: 'metaInfo',
  initialState: {
    chainIds: ['1'],
    gasLimit: 15000,
    gasPrice: 1e-5,
    caps: {},
    envData: '',
    code: '',
  },
  reducers: {
    setChainIds: (state, action) => {
      state.chainIds = action.payload;
    },
    setGasLimit: (state, action) => {
      state.gasLimit = action.payload;
    },
    setGasPrice: (state, action) => {
      state.gasPrice = action.payload;
    },
    setCapabilities: (state, action) => {
      state.caps = action.payload;
    },
    writeCap: (state, action) => {
      state.caps[action.payload.key] = action.payload.cap;
    },
    removeCap: (state, action) => {
      delete state.caps[action.payload];
    },
    setEnvData: (state, action) => {
      state.envData = action.payload;
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
  },
})

export const { 
  setChainIds, setGasLimit, setGasPrice, setCapabilities, 
  writeCap, removeCap, setEnvData, setCode 
} = metaSlice.actions;

export const formatCaps = (caps) => {
  return Object.values(caps);
}

export default metaSlice.reducer;