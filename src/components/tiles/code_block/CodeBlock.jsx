import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import pactLanguageSpec from "../../../constants/pactLanguageSpec";
import FlexRow from "../../layout/FlexRow";
import HotkeyButton from "../../hotkey_button/HotkeyButton";
import LocalTxRender from "../../local_tx/LocalTxRender";
import Tile from "../Tile";
import { setCode } from "../../../store/metaSlice";
import { signAndSend } from "../../../kda-wallet/store/kadenaSlice";
import FlexColumn from "../../layout/FlexColumn";
import { updateLocal } from "../../local_tx/localTxSlice";
import Modal from "../../modal/Modal";
import { showModal } from "../../modal/modalSlice";
import { setUnsafe } from "../../../store/miscSlice";

function CodeBlock(props) {
  const UNSAFE_MODAL_ID = 'UNSAFE';

  const dispatch = useDispatch();
  const code = useSelector(state => state.metaInfo.code);
  const envData = useSelector(state => state.metaInfo.envData);
  const chainIds = useSelector(state => state.metaInfo.chainIds);
  const caps = useSelector(state => state.metaInfo.caps);
  const gasLimit = useSelector(state => state.metaInfo.gasLimit);
  const gasPrice = useSelector(state => state.metaInfo.gasPrice);

  const unsafe = useSelector(state => state.miscInfo.unsafe);

  // Setup the pact editor and language
  const pactEditorDidMount = (editor, monaco) => {
    monaco.languages.register({
        id: 'pact'
    });
    
    monaco.languages.setMonarchTokensProvider('pact', pactLanguageSpec);
  }

  const pactEditorChanged = (value, event) => {
    dispatch(setCode(value));
  }

  const safeRunCommand = async () => {
    if (unsafe) {
      dispatch(showModal(UNSAFE_MODAL_ID));
      return;
    }

    runCommand();
  }

  const runCommand = async () => {
    dispatch(setUnsafe(false));

    let capsList = Object.values(caps);
    // console.log(capsList);
    for (var chainId of chainIds) {
      await dispatch(signAndSend(chainId, code, envData, capsList, gasLimit, gasPrice));
    }
  }

  const updateLocalSign = async () => {
    dispatch(updateLocal(true));
  }

  return (
    <Tile
      title="Code:"
      className="h-auto text-left gap-2"
    > 
      <Modal
        modalId={UNSAFE_MODAL_ID}
        title="Unsafe Code"
        info="You've imported code from an unsafe source. Are you sure you want to run it?"
        yesText="YES"
        noText="NO"
        onYes={runCommand}
      />
      <div className='rounded-lg overflow-hidden'>
        <Editor
          height="250px"
          defaultLanguage="pact"
          defaultValue={code}
          theme='vs-dark'
          onMount={pactEditorDidMount}
          onChange={pactEditorChanged}
        />
      </div>
      <FlexColumn className='gap-2'>
        <LocalTxRender className='flex-1'/>
        <FlexRow className='gap-2'>
          <HotkeyButton
            className='flex-auto'
            text="Sign Local"
            hotkeys={['Control', 't']}
            onClick={updateLocalSign}/>
          <HotkeyButton 
            className='flex-auto'
            text="Send"
            hotkeys={['Control', 'r']}
            onClick={safeRunCommand}/>
        </FlexRow>
      </FlexColumn>
    </Tile>
  )
}

export default CodeBlock;