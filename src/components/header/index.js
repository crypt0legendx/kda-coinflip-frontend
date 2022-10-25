import ConnectWallet from "../connect-wallet";
import "./index.css";

function Header(){
    return(
        <div>
            <div className="nav">            
                <h1>Kadena Coin Flip</h1>            
            </div>
            <ConnectWallet />
        </div>
    )
}

export default Header;