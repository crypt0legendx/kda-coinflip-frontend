import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pact from "pact-lang-api";
import { local, signAndSend } from "../../kda-wallet/store/kadenaSlice";

import "./index.css";

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
  const [resultStatus, setResultStatus] = useState(false);
  const [result, setResult] = useState({});
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

  return (
    <div>
      {resultStatus ? (
        <div className="home-container">BetResult:{result}</div>
      ) : loading ? (
        <div className="home-container">
          <img className="coin-logo" src="./images/coinflipanimation.gif" />
          <h2 className="text-xl">
            <i>Flipping...</i>
          </h2>
          <h2 className="text-xl">
            <i>
              {headTail === 0 ? "HeadS" : "Tails"} for {betAmount} KDA
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
          <button disabled={loading || account === ""} className="large-btn">
            <img src="./images/CLAIM_REWARDS.png" className="large-img" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
