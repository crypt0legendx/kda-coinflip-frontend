import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Pact from "pact-lang-api"
import { local, signAndSend } from "../../kda-wallet/store/kadenaSlice"

import "./index.css"
import AboutModal from "./components/AboutModal"
import HowToPlayModal from "./components/HowToPlayModal"
import FaqModal from "./components/FaqModal"
import useTheme from "../../hooks/useTheme"

function Home() {

  const { theme, changeTheme } = useTheme()

  const dispatch = useDispatch()
  const account = useSelector((state) => state.kadenaInfo.account)
  const metaInfo = useSelector((state) => state.metaInfo)
  const { code, envData, caps, gasLimit, gasPrice, chainIds } = metaInfo

  const [balance, setBalance] = useState(0)
  const [betAmount, setBetAmount] = useState(1.0)
  const [claimAmount, setClaimAmount] = useState(0)
  const [headTail, setHeadTail] = useState(0)

  const [loading, setLoading] = useState(false)
  const [resultStatus, setResultStatus] = useState(false)
  const [result, setResult] = useState("")
  const [claimResult, setClaimResult] = useState("")

  const [showAbout, setShowAbount] = useState(false)
  const [showPlay, setShowPlay] = useState(false)
  const [showFaq, setShowFaq] = useState(false)

  const bank_account =
    "u:free.kda-coinflip.require-WITHDRAW:DldRwCblQ7Loqy6wYJnaodHl30d3j3eH-qtFzfEv46g"

  // Local Update Timer //
  var timer

  useEffect(() => {
    setBalance(0)
    setClaimAmount(0)
    if (timer) {
      clearInterval(timer)
    }
    if (account !== "") {
      timer = setInterval(async () => {
        let res1 = await dispatch(
          local(
            "8",
            `(coin.details "${account}")`,
            envData,
            caps,
            gasLimit,
            gasPrice,
            true
          )
        )
        if (res1.result?.status === "success") {
          setBalance(res1.result.data.balance)
        }
        let res2 = await dispatch(
          local(
            "8",
            `(free.kda-coinflip.get-claim-amount "${account}")`,
            envData,
            caps,
            gasLimit,
            gasPrice,
            true
          )
        )
        if (res2.result?.status === "success") {
          setClaimAmount(res2.result.data)
        }
      }, 3000)
    }
    return () => {
      clearInterval(timer)
    }
  }, [account])

  const placeBet = async () => {
    if(balance<betAmount) return;
    const transferArgs = [
      account,
      bank_account,
      parseFloat(betAmount.toFixed(1)),
    ]
    const betCaps = [
      Pact.lang.mkCap("Gas", "gas", "coin.GAS"),
      Pact.lang.mkCap("Trasfer", "transfer", "coin.TRANSFER", transferArgs),
    ]
    setLoading(true)
    const res = await dispatch(
      signAndSend(
        "8",
        `(free.kda-coinflip.place-bet "${account}" ${headTail} ${betAmount.toFixed(
          1
        )})`,
        envData,
        betCaps,
        gasLimit,
        gasPrice,
        true
      )
    )
    if (res) {
      res.listenPromise
        .then((data) => {
          if (data.result.status === "success") {
            setResultStatus(true)
            setResult(data.result.data)
          }
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }

  const withdrawWinnings = async () => {
    const transferArgs = [bank_account, account, parseFloat(claimAmount)]
    const winnerArgs = [account, parseFloat(claimAmount)]
    const withdrawCaps = [
      Pact.lang.mkCap("Gas", "gas", "coin.GAS"),
      Pact.lang.mkCap("Trasfer", "transfer", "coin.TRANSFER", transferArgs),
      Pact.lang.mkCap(
        "Winner",
        "winner",
        "free.kda-coinflip.WINNER",
        winnerArgs
      ),
    ]
    setClaimResult("Pending")
    const res = await dispatch(
      signAndSend(
        "8",
        `(free.kda-coinflip.withdraw-winnings "${account}" ${claimAmount})`,
        envData,
        withdrawCaps,
        gasLimit,
        gasPrice,
        true
      )
    )
    if (res) {
      res.listenPromise
        .then((data) => {
          if (data.result.status === "success") {
            setClaimResult("Success")
          } else {
            setClaimResult("Failure")
          }
        })
        .catch(() => {
          setClaimResult("Failure")
        })
    } else {
      setClaimResult("Failure")
    }
  }

  const handlePlayAgain = () => {
    setResultStatus(false)
    setResult("")
    setClaimResult("")
  }

  return (
    <div>
      {resultStatus ? (
        <div className="home-container  mt-10">
          <img className="h-64" src="./logo.png" />
          {result === "Lost bet" ? (
            <h2 className="text-3xl py-2 font-bold text-red-600  mt-10 ">
              You lost {betAmount} KDA
            </h2>
          ) : (
            <h2 className="text-3xl py-2 font-bold text-green-600  mt-10">
              You won {betAmount} KDA
            </h2>
          )}

          <button className="large-btn mt-5 " onClickCapture={handlePlayAgain}>
            <img src="./images/playagain.png" className="large-img" />
          </button>
        </div>
      ) : loading ? (
        <div className="home-container mt-20">
          <img className="coin-logo" src="./images/coinflipanimation.gif" />
          <h2 className={`text-2xl mt-10 font-bold ${theme==="dark"?"text-white":""}`}>
            <i>Flipping...</i>
          </h2>
          <h2 className={`text-2xl font-bold ${theme==="dark"?"text-white":""}`}>
            <i>
              {headTail === 0 ? "Heads" : "Tails"} for {betAmount} KDA
            </i>
          </h2>
        </div>
      ) : (
        <div className="home-container">
          <img className="coin-logo" src="./logo.png" />
          <h2 className={`text-xl py-2 font-bold  ${theme==='dark'?"text-white":""}`}>I CHOOSE</h2>
          <div className="head-tail-section">
            <button
              className={`mid-btn ${headTail === 0 && theme==="light" ? "border-8 border-black  active":headTail === 0 && theme==="dark"?"border-8 border-white  active": ""}`}
              onClick={() => setHeadTail(0)}
            >
              <img src="./images/heads.png" className="large-img" />
            </button>
            <button
              className={`mid-btn ${headTail === 1 && theme==="light" ? "border-8 border-black active":headTail === 1 && theme==="dark"?"border-8 border-white  active": ""}`}
              onClick={() => setHeadTail(1)}
            >
              <img src="./images/tails.png" className="large-img" />
            </button>
          </div>
          <h2 className={`text-xl py-2 font-bold  ${theme==='dark'?"text-white":""}`}>I WAGER</h2>
          <div className="amount-section">
            <button
              className={`small-btn ${betAmount === 1.0 ? "border-4  active" : ""} ${theme === "light"?"border-black":"border-white"}`}
              onClick={() => setBetAmount(1.0)}
            >
              <img src="./images/1kda.png" className="small-img" />
            </button>
            <button
              className={`small-btn ${betAmount === 2.0 ? "border-4  active" : ""}  ${theme === "light"?"border-black":"border-white"}`}
              onClick={() => setBetAmount(2.0)}
            >
              <img src="./images/2kda.png" className="small-img" />
            </button>
            <button
              className={`small-btn ${betAmount === 5.0 ? "border-4  active" : ""} ${theme === "light"?"border-black":"border-white"}`}
              onClick={() => setBetAmount(5.0)}
            >
              <img src="./images/5kda.png" className="small-img" />
            </button>
            <button
              className={`small-btn ${
                betAmount === 10.0 ? "border-4  active" : ""
              } ${theme === "light"?"border-black":"border-white"}`}
              onClick={() => setBetAmount(10.0)}
            >
              <img src="./images/10kda.png" className="small-img" />
            </button>
            <button
              className={`small-btn ${
                betAmount === 20.0 ? "border-4  active" : ""
              } ${theme === "light"?"border-black":"border-white"}`}
              onClick={() => setBetAmount(20.0)}
            >
              <img src="./images/20kda.png" className="small-img" />
            </button>
            <button
              className={`small-btn ${
                betAmount === 50.0 ? "border-4  active" : ""
              } ${theme === "light"?"border-black":"border-white"}`}
              onClick={() => setBetAmount(50.0)}
            >
              <img src="./images/50kda.png" className="small-img" />
            </button>
          </div>
          <div className="divider"></div>
          <div className="flex justify-start w-full font-bold">
            <h2 className={`text-14 py-2 ${theme==='dark'?"text-white":""}`}>Balance: {balance}KDA</h2>
          </div>
          <button
            disabled={loading || account === ""}
            className="large-btn"
            onClick={() => placeBet()}
          >
            <img src="./images/DOUBLE_OR_NOTHING.png" className="large-img" />
          </button>
          <div className="divider"></div>
          <div className="flex justify-start w-full font-bold">
            <h2  className={`text-14 py-2 ${theme==='dark'?"text-white":""}`}>Claimable amount: {claimAmount}KDA</h2>
          </div>
          <button
            disabled={loading || account === ""}
            className="large-btn"
            onClick={withdrawWinnings}
          >
            <img src="./images/CLAIM_REWARDS.png" className="large-img" />
          </button>
          {claimResult !== "" && (
            <div className="flex justify-start w-full font-bold">
              <h2  className={`text-14 py-2 ${theme==='dark'?"text-white":""}`}>Claim Status: {claimResult}</h2>
            </div>
          )}
          {account ===
            "k:bd7ba3e2854840b37c7612123a0d3195eb42bb35a9859038cbf0f8d141c7ec34" && (
            <Link to="/admin">
              <button  className={`my-3 ${theme === "dark"?"text-white":""}`}>Go to Admin</button>
            </Link>
          )}
          <div className="flex justify-center gap-5 py-5">
            <a className="underline cursor-pointer text-lg text-blue-700" onClick={() => setShowAbount(true)}>About</a>
            <a className="underline cursor-pointer text-lg text-blue-700" onClick={() => setShowPlay(true)}>How To Play</a>
            <a className="underline cursor-pointer text-lg text-blue-700" onClick={() => setShowFaq(true)}>Faq</a>
          </div>
        </div>
      )}
      <div>
        <AboutModal show={showAbout} onClose={() => setShowAbount(false)} />
        <HowToPlayModal show={showPlay} onClose={() => setShowPlay(false)} />
        <FaqModal show={showFaq} onClose={() => setShowFaq(false)} />
      </div>
    </div>
  )
}

export default Home
