import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Navbar from "./components/misc/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConnectWalletModal from "./kda-wallet/components/ConnectWalletModal";
import {
  txToastManager,
  messageToastManager,
  walletConnectedToastManager,
} from "./components/tx_and_toasts/TxToastManager";
import KeySensor from "./components/hotkey_button/KeySensor";
import Home from "./pages/home";
import Admin from "./pages/admin";
import useTheme from "./hooks/useTheme";

export default function App() {  
  const {theme} = useTheme();
  return (
    
      <BrowserRouter>
        <div className={`w-full min-h-screen flex flex-col items-center px-12 ${theme === "dark"?"bg-slate-900":""}`}>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <KeySensor />
          <ConnectWalletModal
            onNewTransaction={txToastManager}
            onNewMessage={messageToastManager}
            onWalletConnected={walletConnectedToastManager}
            buttonStyle="`border-white border-2 rounded-md h-auto px-10 py-2 hover:border-purple-300 active:border-purple-700 focus:border-purple-500 transition duration-150 ease-out"
          />
          <Navbar />
          <Routes>
            <Route exact path="/home" element={<Home />} key="home" />;
            <Route exact path="/admin" element={<Admin />} key="admin" />;
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </BrowserRouter>
  
  );
}
