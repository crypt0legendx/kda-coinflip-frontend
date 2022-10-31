import { useState } from "react"
import { useEffect } from "react"
import { NETWORK_ID } from "../../constants"
import "./index.css"

function ConnectWallet() {
  const [message, setMessage] = useState("")
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState("")

  const isXWalletInstalled = () => {
    const { kadena } = window
    return Boolean(kadena && kadena.isKadena)
  }

  const initialize = async () => {
    if (!isXWalletInstalled()) {
      setMessage("Wallet is installed please connect to the wallet")
    } else {
      const { kadena } = window
      kadena
        .request({
          method: "kda_checkStatus",
          networkId: NETWORK_ID,
        })
        .then((res) => {
          if (res.status === "success") {
            setConnected(true)
            setAddress(res.account.account)
          }
        })
    }
  }

  useEffect(() => {
    initialize()
  }, [])

  const handleConnect = () => {
    const { kadena } = window
    kadena
      .request({
        method: "kda_connect",
        networkId: NETWORK_ID,
      })
      .then((res) => {        
        if (res.status == "success") {
          setConnected(true)
          setAddress(res.account.account)
        } else {
          setConnected(false)
          setMessage("Failed to connect wallet")
        }
      })
  }

  const handleDisconnect = () => {
    const { kadena } = window
    kadena.request({
        method:'kda_disconnect',
        networkId:NETWORK_ID
    }).then(res=>{
        if(res.result.status === "success"){
            setConnected(false);
            setAddress("");
        }        
    })
  }

  return (
    <div className="connect-wallet-warraper">
      {!connected ? (
        <>
          <button
            disabled={!isXWalletInstalled()}
            className="connect-wallet"
            onClick={() => handleConnect()}
          >
            Connect Wallet
          </button>
          <div className="notification-message">{message}</div>
        </>
      ) : (
        <>
          <button
            disabled={!isXWalletInstalled()}
            className="connect-wallet"
            onClick={() => handleDisconnect()}
          >
            Disconnect
          </button>
          <div className="notification-message">
            {String(address).substring(0, 8) +
              "..." +
              String(address).substring(60)}
          </div>
        </>
      )}
    </div>
  )
}

export default ConnectWallet
