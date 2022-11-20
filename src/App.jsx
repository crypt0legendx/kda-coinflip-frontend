import './App.css';
import Navbar from './components/misc/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConnectWalletModal from './kda-wallet/components/ConnectWalletModal';
import { txToastManager, messageToastManager, walletConnectedToastManager } from './components/tx_and_toasts/TxToastManager';
import KeySensor from './components/hotkey_button/KeySensor';
import Home from './pages/home';


export default function App() {
  
  return (
    <div className="w-full flex flex-col items-center px-12">
      
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
        <KeySensor/>
        <ConnectWalletModal 
          onNewTransaction={txToastManager}
          onNewMessage={messageToastManager}
          onWalletConnected={walletConnectedToastManager}
          buttonStyle="`border-white border-2 rounded-md h-auto px-10 py-2 hover:border-purple-300 active:border-purple-700 focus:border-purple-500 transition duration-150 ease-out"
        />
        <Navbar />
        <Home />
      
    </div>
  )
}
