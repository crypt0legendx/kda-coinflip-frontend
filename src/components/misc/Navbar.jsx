import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { KadenaKodeLogo } from "../../assets"
import { disconnectProvider } from "../../kda-wallet/store/kadenaSlice"
import { showConnectWalletModal } from "../../kda-wallet/store/connectWalletModalSlice"
import reduceToken from "../../kda-wallet/utils/reduceToken"
import CustomButton from "../layout/CustomButton"
import FlexRow from "../layout/FlexRow"

function Navbar() {
  const account = useSelector((state) => state.kadenaInfo.account)
  const dispatch = useDispatch()

  const openModal = () => {
    dispatch(showConnectWalletModal())
  }

  const disconnect = () => {
    dispatch(disconnectProvider())
  }

  return (
    <nav className="w-full flex flex-row space-x-2 justify-between items-center p-2 h-40 text-xl">
      <div className="h-10">&nbsp;</div>
      <div className="header-title">
        <h1>Kadena Coin Flip</h1>
      </div>
      <FlexRow className="gap-2">
        <CustomButton
          className="flex-1 sm:flex-none absolute right-10 top-10"
          text={account === "" ? "Connect Wallet" : "Disconnect"}
          onClick={account === "" ? openModal : disconnect}
        />
      </FlexRow>
    </nav>
  )
}

export default Navbar
