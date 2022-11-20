import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { writeCap } from "../../../store/metaSlice";
import CustomButton from "../../misc/CustomButton";
import CustomInput from "../CustomInput";
import FlexColumn from "../FlexColumn";
import FlexRow from "../../misc/FlexRow";
import Pact from 'pact-lang-api';
import Editor from "@monaco-editor/react";

function DefCap(props) {
  const dispatch = useDispatch();
  const [role, setRole] = useState(props.role ? props.role : '');
  const [description, setDescription] = useState(props.description ? props.description : '');
  const [name, setName] = useState(props.name ? props.name : '');
  const [args, setArgs] = useState(props.argsString ? JSON.parse(props.argsString) : {});

  const argsEditorChanged = (value, event) => {
    try {
      dispatch(setArgs(JSON.parse(value)));
    }
    catch (e) {
      // console.log(e);
    }
  }

  const onInputChanged = (value) => {
    let id = value.target.id;
    if (id === 'role') {
      setRole(value.target.value);
    }
    else if (id === 'name') {
      setName(value.target.value);
    }
    else if (id === 'description') {
      setDescription(value.target.value);
    }
  }

  const deleteCap = () => { 
    props.onDelete(props.keyId);
  }

  useEffect(() => {
    dispatch(writeCap({ key: props.keyId, cap: Pact.lang.mkCap(role, description, name, args) }))
  }, [role, name, description, args]);

  return (
    <FlexColumn className={`bg-slate-900 rounded-md p-2 gap-2 ${props.className}`}>
      <FlexRow className="gap-2">
        <CustomInput
          title="Role:"
          id="role"
          placeholder="Gas Payer"
          default={props.role}
          onInputChanged={onInputChanged}
        />
        <CustomInput
          title="Description:"
          id="description"
          placeholder="Allows paying for gas"
          default={props.description}
          onInputChanged={onInputChanged}
        />
        <CustomInput
          title="Name (full reference):"
          id="name"
          placeholder="coin.GAS"
          default={props.name}
          onInputChanged={onInputChanged}
        />
      </FlexRow>
      <FlexRow className='gap-2'>
        <FlexColumn className="flex-auto w-96">
          <span>Arguments, JSON array:</span>
          <div className='rounded-lg overflow-hidden'>
            <Editor
              height="50px"
              // width="100px"
              defaultLanguage="json"
              defaultValue={props.argsString}
              theme='vs-dark'
              onChange={argsEditorChanged}
              options={{
                // lineNumbers: false,
                minimap: { enabled: false },
                scrollbar: {
                  // Subtle shadows to the left & top. Defaults to true.
                  // useShadows: false,
                  vertical: 'hidden',
                  horizontal: 'hidden',
                }
              }}
            />
          </div>
        </FlexColumn>
        <FlexColumn className="flex-auto gap-2 w-20">
          <FlexRow className="gap-2">
            <input
              type="checkbox"/>
            <span>Include in query</span>
          </FlexRow>
          <CustomButton
            className="flex-auto"
            text="Delete"
            onClick={deleteCap}/>
        </FlexColumn>
        
      </FlexRow>
    </FlexColumn>
    
  )
}

export default DefCap
