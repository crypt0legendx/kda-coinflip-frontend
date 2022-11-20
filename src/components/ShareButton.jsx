import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CustomButton from "./layout/CustomButton";

function ShareButton(props) {
  const network = useSelector(state => state.kadenaInfo.network);
  const networkId = useSelector(state => state.kadenaInfo.networkId);
  const chainIds = useSelector(state => state.metaInfo.chainIds);
  const gasLimit = useSelector(state => state.metaInfo.gasLimit);
  const gasPrice = useSelector(state => state.metaInfo.gasPrice);
  const caps = useSelector(state => state.metaInfo.caps);
  const envData = useSelector(state => state.metaInfo.envData);
  const code = useSelector(state => state.metaInfo.code);

  const onClick = () => {
    var params = [];

    params.push(`network=${encodeURIComponent(network)}`);
    params.push(`networkId=${encodeURIComponent(networkId)}`);
    params.push(`chainIds=${encodeURIComponent(JSON.stringify(chainIds))}`);
    params.push(`gasLimit=${encodeURIComponent(String(gasLimit))}`);
    params.push(`gasPrice=${encodeURIComponent(String(gasPrice))}`);
    console.log('caps', Object.keys(caps).length);
    console.log('envData', envData);
    if (Object.keys(caps).length !== 0) {
      console.log('here');
      params.push(`caps=${encodeURIComponent(JSON.stringify(caps))}`);
    }
    if (Object.keys(envData).length !== 0) {
      params.push(`envData=${encodeURIComponent(JSON.stringify(envData))}`);
    }
    if (code !== '') {
      params.push(`code=${encodeURIComponent(code)}`);
    }

    var url = `kadenakode.luzzotica.xyz/?${params.join('&')}`;
    console.log(url);
    navigator.clipboard.writeText(url);
    toast.success('Copied share URL to clipboard.');
  }

  return (
    <CustomButton
      className={props.className}
      text="Share Current Configuration"
      onClick={onClick}/>
  )
}

export default ShareButton;