import { useState } from "react";
import "./index.css";

function Home(){

    const [betAmount, setBetAmount] = useState(1);
    const [headTail, setHeadTail] = useState(0);

    const [loading, setLoading] = useState(false);

    const placeBet = () => {
        setLoading(true)
        console.log("load...")
        setTimeout(()=>{
            setLoading(false);
        }, 35000)
    }

    return(
        <div>
            {
                loading?(
                    <div className="home-container">
                        <img className="coin-logo" src = "./images/coinflipanimation.gif" />
                        <h2><i>Flipping...</i></h2>
                        <h2><i>{headTail === 0 ? "HeadS" : "Tails"} for {betAmount} KDA</i></h2>
                    </div>
                ):(<div  className="home-container">
                    <img className="coin-logo" src = "./logo.png" />
                    <h2>I CHOOSE</h2>
                    <div className="head-tail-section">
                        <button className={`mid-btn head ${headTail === 0?"active":""}`} onClick={()=>setHeadTail(0)}></button>
                        <button className={`mid-btn tail ${headTail === 1?"active":""}`} onClick={()=>setHeadTail(1)}></button>
                    </div>
                    <h2>I WAGER</h2>
                    <div className="amount-section">
                        <button className={`small-btn kda-1 ${betAmount === 1?"active":""}`} onClick={()=>setBetAmount(1)}></button>
                        <button className={`small-btn kda-2 ${betAmount === 2?"active":""}`} onClick={()=>setBetAmount(2)}></button>
                        <button className={`small-btn kda-5 ${betAmount === 5?"active":""}`} onClick={()=>setBetAmount(5)}></button>
                        <button className={`small-btn kda-10 ${betAmount === 10?"active":""}`} onClick={()=>setBetAmount(10)}></button>
                        <button className={`small-btn kda-20 ${betAmount === 20?"active":""}`} onClick={()=>setBetAmount(20)}></button>
                        <button className={`small-btn kda-50 ${betAmount === 50?"active":""}`} onClick={()=>setBetAmount(50)}></button>
                    </div>
                    <div className="divider"></div>
                    <button disabled = {loading} className="large-btn" onClick={()=>placeBet()}><img src="./images/DOUBLE_OR_NOTHING.png" className="large-img" /></button>
                    <div className="divider"></div>
                    <button disabled = {loading} className="large-btn"><img src="./images/CLAIM_REWARDS.png" className="large-img" /></button>
                </div>
                )
            }                                
        </div>
    )
}

export default Home;