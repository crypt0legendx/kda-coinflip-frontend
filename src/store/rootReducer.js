import { combineReducers } from "redux";
import kadenaSlice from "../kda-wallet/store/kadenaSlice";
import metaSlice from "./metaSlice";
import localTxSlice from "../components/local_tx/localTxSlice";
import hotkeySlice from "../components/hotkey_button/hotkeySlice";
import miscSlice from "./miscSlice";
import connectWalletModalSlice from "../kda-wallet/store/connectWalletModalSlice";
import modalSlice from "../components/modal/modalSlice";

const rootReducer = combineReducers({
  kadenaInfo: kadenaSlice,
  connectWalletModal: connectWalletModalSlice,
  metaInfo: metaSlice,
  localTx: localTxSlice,
  keysPressed: hotkeySlice,
  miscInfo: miscSlice,
  modals: modalSlice,
});

export default rootReducer;