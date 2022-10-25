import { useState } from "react";
import "./index.css";

function Home(){

    const [betAmount, setBetAmount] = useState(1);
    const [headTail, setHeadTail] = useState(0);

    return(
        <div className="home-container">
            <img className="coin-logo" src = "./logo.png" />
            <h2>I CHOOSE</h2>
            <div className="head-tail-section">
                <button className={`mid-btn ${headTail === 0?"active":""}`} onClick={()=>setHeadTail(0)}>HEADS</button>
                <button className={`mid-btn ${headTail === 1?"active":""}`} onClick={()=>setHeadTail(1)}>TAILS</button>
            </div>
            <h2>I WAGER</h2>
            <div className="amount-section">
                <button className={`small-btn ${betAmount === 1?"active":""}`} onClick={()=>setBetAmount(1)}>1 KDA</button>
                <button className={`small-btn ${betAmount === 2?"active":""}`} onClick={()=>setBetAmount(2)}>2 KDA</button>
                <button className={`small-btn ${betAmount === 5?"active":""}`} onClick={()=>setBetAmount(5)}>5 KDA</button>
                <button className={`small-btn ${betAmount === 10?"active":""}`} onClick={()=>setBetAmount(10)}>10 KDA</button>
                <button className={`small-btn ${betAmount === 20?"active":""}`} onClick={()=>setBetAmount(20)}>20 KDA</button>
                <button className={`small-btn ${betAmount === 50?"active":""}`} onClick={()=>setBetAmount(50)}>50 KDA</button>
            </div>
            <div className="divider"></div>
            <button className="large-btn">LET'S DO THIS!</button>
            <button className="large-btn">CLAIM REWARD</button>
            <h3>About | How to  Play | FAQ</h3>
            <h3><i>© 2022 Kadena Coin Flip</i></h3>

        </div>
    )
}

export default Home;