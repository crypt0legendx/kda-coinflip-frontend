import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { local } from "../../kda-wallet/store/kadenaSlice";
import CustomButton from "../layout/CustomButton";
import FlexColumn from "../layout/FlexColumn";
import FlexRow from "../layout/FlexRow";
import TxRender from "../tx_and_toasts/TxRender";
import { updateLocal } from "./localTxSlice";

function LocalTxRender(props) {
  const dispatch = useDispatch();
  const network = useSelector(state => state.kadenaInfo.network);
  const networkId = useSelector(state => state.kadenaInfo.networkId);
  const code = useSelector(state => state.metaInfo.code);
  const envData = useSelector(state => state.metaInfo.envData);
  const chainIds = useSelector(state => state.metaInfo.chainIds);
  const caps = useSelector(state => state.metaInfo.caps);
  const gasLimit = useSelector(state => state.metaInfo.gasLimit);
  const gasPrice = useSelector(state => state.metaInfo.gasPrice);
  const localTxs = useSelector(state => state.localTx.txs);

  const [localTxRenders, setLocalTxRenders] = useState([]);

  //// Local Update Timer ////
  var timer

  // Immediate update when basic values change
  useEffect(() => {
    dispatch(updateLocal());
  }, [network, networkId, chainIds, gasLimit, gasPrice]);

  // Wait for a few seconds after typing to send the local command.
  useEffect(() => {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => { 
      dispatch(updateLocal());
      clearInterval(timer);
    }, 1500);
    return () => {
      clearInterval(timer);
    }
  }, [code, envData, caps]);

  useEffect(() => {
    setLocalTxRenders(
      Object.keys(localTxs).map(
        chainId => <TxRender 
          key={chainId} 
          className='flex-auto' 
          chainId={chainId}
          txData={localTxs[chainId]}/>
      )
    );
    // console.log('Local Rx Renders:', localTxRenders);
  }, [localTxs]);

  return (
    <FlexColumn className='gap-2'>
      {localTxRenders}
    </FlexColumn>
  )
}

export default LocalTxRender;