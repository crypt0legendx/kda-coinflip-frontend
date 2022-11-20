import { useDispatch, useSelector } from "react-redux";
import { setChainIds, setGasLimit, setGasPrice } from "../../store/metaSlice";
import { setNetwork, setNetworkId } from "../../kda-wallet/store/kadenaSlice";
import FlexColumn from "../layout/FlexColumn";
import FlexRow from "../layout/FlexRow";
import { useEffect, useState } from "react";
import { } from "react";

function MetaInput(props) {
  const dispatch = useDispatch();
  const network = useSelector(state => state.kadenaInfo.network);
  const networkId = useSelector(state => state.kadenaInfo.networkId);
  const chainIds = useSelector(state => state.metaInfo.chainIds);
  const gasLimit = useSelector(state => state.metaInfo.gasLimit);
  const gasPrice = useSelector(state => state.metaInfo.gasPrice);

  const [chainIdsText, setChainIdsText] = useState(chainIds.join(', '));
  const [gasLimitText, setGasLimitText] = useState(String(gasLimit));
  const [gasPriceText, setGasPriceText] = useState(String(gasPrice));

  useEffect(() => {
    setChainIdsText(chainIds.join(','));
  }, [chainIds]);

  useEffect(() => {
    setGasLimitText(String(gasLimit));
  }, [gasLimit]);

  useEffect(() => {
    setGasPriceText(String(gasPrice));
  }, [gasPrice]);

  const onInputChanged = (e) => {
    let id = e.target.id;
    console.log(id);
    if (id === 'chainIds') {
      var chainIds = e.target.value.split(',')
        .map((e) => {
          let trimmed = e.trim();
          if (trimmed !== '') {
            return isNaN(Number(trimmed)) ? '' : trimmed
          }
          else {
            return trimmed
          }
        });
      chainIds.sort();

      // Count the number of empty inputs
      // var countEmpty = 0;
      // for (var cid of chainIds) {
      //   if (cid === '') {
      //     countEmpty++;
      //     if (countEmpty > 1) {
      //       break;
      //     }
      //   }
      // }

      // If the first value is empty, don't publish data
      if (chainIds[0] !== '') {
        dispatch(setChainIds(chainIds));
      }
      
      setChainIdsText(e.target.value);
    }
    else if (id === 'network') {
      dispatch(setNetwork(e.target.value));
    }
    else if (id === 'networkId') {
      dispatch(setNetworkId(e.target.value));
    }
    else if (id === 'gasLimit') {
      let n = Number(e.target.value);
      if (!isNaN(n)) {
        dispatch(setGasLimit(n));
      }
      setGasLimitText(e.target.value);
    }
    else if (id === 'gasPrice') {
      let n = Number(e.target.value);
      if (!isNaN(n)) {
        dispatch(setGasPrice(n));
      }
      setGasPriceText(e.target.value);
    }
  }

  return (
    <FlexColumn className='gap-4'>
      <FlexRow className='h-auto text-left gap-2'>
        <FlexColumn className='flex-1'>
          <span>Chain IDs, (1, 2, 5, 6...):</span>
          <input 
            id="chainIds"
            value={chainIdsText}
            className='flex-auto bg-black rounded-md border-white border-2 p-1'
            onChange={onInputChanged}/>
        </FlexColumn>
        <FlexColumn className='flex-1'>
          <span>Network:</span>
          <select 
            id="network" 
            value={network}
            className='flex-auto bg-black rounded-md border-white border-2 p-1' 
            onChange={onInputChanged}
          >
            <option value="https://api.testnet.chainweb.com">https://api.testnet.chainweb.com</option>
            <option value="https://api.chainweb.com">https://api.chainweb.com</option>
          </select>
        </FlexColumn>
        <FlexColumn className='flex-1'>
          <span>Network ID:</span>
          <select 
            id="networkId" 
            value={networkId}
            className='flex-auto bg-black rounded-md border-white border-2 p-1' 
            onChange={onInputChanged}
          >
            <option value="testnet04">testnet04</option>
            <option value="mainnet01">mainnet01</option>
          </select>
        </FlexColumn>
      </FlexRow>
      <FlexRow className='h-auto text-left gap-2'>
        <FlexColumn className='flex-1'>
          <span>Gas Limit:</span>
          <input 
            id="gasLimit"
            type="number"
            value={gasLimitText}
            className='flex-auto bg-black rounded-md border-white border-2 p-1'
            onChange={onInputChanged}/>
        </FlexColumn>
        <FlexColumn className='flex-1'>
          <span>Gas Price:</span>
          <input 
            id="gasPrice"
            // type="number"
            value={gasPriceText}
            className='flex-auto bg-black rounded-md border-white border-2 p-1'
            onChange={onInputChanged}/>
        </FlexColumn>
      </FlexRow>
    </FlexColumn>
  )
}

export default MetaInput;