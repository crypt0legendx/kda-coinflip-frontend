import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pact from "pact-lang-api";
import { local, signAndSend } from "../../kda-wallet/store/kadenaSlice";

import "./index.css";
import AboutModal from "./components/AboutModal";

function Home() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.kadenaInfo.account);
  const metaInfo = useSelector((state) => state.metaInfo);
  const { code, envData, caps, gasLimit, gasPrice, chainIds } = metaInfo;

  const [balance, setBalance] = useState(0);
  const [betAmount, setBetAmount] = useState(1.0);
  const [claimAmount, setClaimAmount] = useState(0);
  const [headTail, setHeadTail] = useState(0);

  const [loading, setLoading] = useState(false);
  const [resultStatus, setResultStatus] = useState(true);
  const [result, setResult] = useState("");
  const [claimResult, setClaimResult] = useState("");
  const bank_account =
    "u:free.coinflip-ryu-latest.require-WITHDRAW:DldRwCblQ7Loqy6wYJnaodHl30d3j3eH-qtFzfEv46g";

  // Local Update Timer //
  var timer;

  useEffect(() => {
    setBalance(0);
    setClaimAmount(0);
    if (timer) {
      clearInterval(timer);
    }
    if (account !== "") {
      timer = setInterval(async () => {
        let res1 = await dispatch(
          local(
            "1",
            `(coin.details "${account}")`,
            envData,
            caps,
            gasLimit,
            gasPrice,
            true
          )
        );
        if (res1.result?.status === "success") {
          setBalance(res1.result.data.balance);
        }
        let res2 = await dispatch(
          local(
            "1",
            `(free.coinflip-ryu-latest.get-claim-amount "${account}")`,
            envData,
            caps,
            gasLimit,
            gasPrice,
            true
          )
        );
        if (res2.result?.status === "success") {
          setClaimAmount(res2.result.data);
        }
      }, 3000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [account]);

  const placeBet = async () => {
    const transferArgs = [
      account,
      bank_account,
      parseFloat(betAmount.toFixed(1)),
    ];
    const betCaps = [
      Pact.lang.mkCap("Gas", "gas", "coin.GAS"),
      Pact.lang.mkCap("Trasfer", "transfer", "coin.TRANSFER", transferArgs),
    ];
    setLoading(true);
    const res = await dispatch(
      signAndSend(
        "1",
        `(free.coinflip-ryu-latest.place-bet "${account}" ${headTail} ${betAmount.toFixed(
          1
        )})`,
        envData,
        betCaps,
        gasLimit,
        gasPrice,
        true
      )
    );
    if (res) {
      res.listenPromise
        .then((data) => {
          if (data.result.status === "success") {
            setResultStatus(true);
            setResult(data.result.data);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const withdrawWinnings = async () => {
    const transferArgs = [bank_account, account, parseFloat(claimAmount)];
    const winnerArgs = [account, parseFloat(claimAmount)];
    const withdrawCaps = [
      Pact.lang.mkCap("Gas", "gas", "coin.GAS"),
      Pact.lang.mkCap("Trasfer", "transfer", "coin.TRANSFER", transferArgs),
      Pact.lang.mkCap(
        "Winner",
        "winner",
        "free.coinflip-ryu-latest.WINNER",
        winnerArgs
      ),
    ];
    setClaimResult("Pending");
    const res = await dispatch(
      signAndSend(
        "1",
        `(free.coinflip-ryu-latest.withdraw-winnings "${account}" ${claimAmount})`,
        envData,
        withdrawCaps,
        gasLimit,
        gasPrice,
        true
      )
    );
    if (res) {
      res.listenPromise
        .then((data) => {
          if (data.result.status === "success") {
            setClaimResult("Success");
          } else {
            setClaimResult("Failure");
          }
        })
        .catch(() => {
          setClaimResult("Failure");
        });
    } else {
      setClaimResult("Failure");
    }
  };

  const handlePlayAgain = () => {
    setResultStatus(false);
    setResult("");
    setClaimResult("");
  };

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
          <h2 className="text-2xl mt-10 font-bold">
            <i>Flipping...</i>
          </h2>
          <h2 className="text-2xl font-bold">
            <i>
              {headTail === 0 ? "Heads" : "Tails"} for {betAmount} KDA
            </i>
          </h2>
        </div>
      ) : (
        <div className="home-container">
          <img className="coin-logo" src="./logo.png" />
          <h2 className="text-xl py-2 font-bold">I CHOOSE</h2>
          <div className="head-tail-section">
            <button
              className={`mid-btn head ${headTail === 0 ? "active" : ""}`}
              onClick={() => setHeadTail(0)}
            >
              <img src="./images/heads.png" className="large-img" />
            </button>
            <button
              className={`mid-btn tail ${headTail === 1 ? "active" : ""}`}
              onClick={() => setHeadTail(1)}
            >
              <img src="./images/tails.png" className="large-img" />
            </button>
          </div>
          <h2 className="text-xl py-2 font-bold">I WAGER</h2>
          <div className="amount-section">
            <button
              className={`small-btn kda-1 ${betAmount === 1.0 ? "active" : ""}`}
              onClick={() => setBetAmount(1.0)}
            >
              <img src="./images/1kda.png" className="small-img" />
            </button>
            <button
              className={`small-btn kda-2 ${betAmount === 2.0 ? "active" : ""}`}
              onClick={() => setBetAmount(2.0)}
            >
              <img src="./images/2kda.png" className="small-img" />
            </button>
            <button
              className={`small-btn kda-5 ${betAmount === 5.0 ? "active" : ""}`}
              onClick={() => setBetAmount(5.0)}
            >
              <img src="./images/5kda.png" className="small-img" />
            </button>
            <button
              className={`small-btn kda-10 ${
                betAmount === 10.0 ? "active" : ""
              }`}
              onClick={() => setBetAmount(10.0)}
            >
              <img src="./images/10kda.png" className="small-img" />
            </button>
            <button
              className={`small-btn kda-20 ${
                betAmount === 20.0 ? "active" : ""
              }`}
              onClick={() => setBetAmount(20.0)}
            >
              <img src="./images/20kda.png" className="small-img" />
            </button>
            <button
              className={`small-btn kda-50 ${
                betAmount === 50.0 ? "active" : ""
              }`}
              onClick={() => setBetAmount(50.0)}
            >
              <img src="./images/50kda.png" className="small-img" />
            </button>
          </div>
          <div className="divider"></div>
          <div className="flex justify-start w-full font-bold">
            <h2>Balance: {balance}KDA</h2>
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
            <h2>Claimable amount: {claimAmount}KDA</h2>
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
              <h2>Claim Status: {claimResult}</h2>
            </div>
          )}
          {account ===
            "k:e5d995c165cf09c67ab1888885715cf08295a8bce29b479414addd15373d9dd7" && (
            <Link to="/admin">
              <button className="my-3">Go to Admin</button>
            </Link>
          )}
        </div>
      )}
      <div>
        <AboutModal />
      </div>
    </div>
  );
}

export default Home;
