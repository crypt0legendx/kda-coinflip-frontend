import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TxRender from "../tx_and_toasts/TxRender";
import Tile from "./Tile";

function Transactions(props) {
  const transactions = useSelector(state => state.kadenaInfo.transactions);

  const [txRenders, setTxRenders] = useState([]);

  useEffect(() => {
    let renders = [];
    for (var i = transactions.length - 1; i >= 0; i--) {
      renders.push(<TxRender key={i} txData={transactions[i]}/>);
    }
    setTxRenders(renders);
  }, [transactions]);

  return (
  
    <Tile 
      className="text-left gap-2"
      title="Transactions:">
      {txRenders.length === 0 ? <span>None</span> : txRenders}
    </Tile>
  )
}

export default Transactions;