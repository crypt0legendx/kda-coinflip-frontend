import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { writeCap } from "../../../store/metaSlice";
import CustomButton from "../../layout/CustomButton";
import FlexColumn from "../../layout/FlexColumn";
import FlexRow from "../../layout/FlexRow";
import Pact from 'pact-lang-api';
import Editor from "@monaco-editor/react";
import CustomInput from "../../layout/CustomInput";

function DefCap(props) {
  const dispatch = useDispatch();
  const caps = useSelector(state => state.metaInfo.caps);
  const [role, setRole] = useState(caps[props.keyId] ? caps[props.keyId].role : "");
  const [description, setDescription] = useState(caps[props.keyId] ? caps[props.keyId].description : "");
  const [name, setName] = useState(caps[props.keyId] ? caps[props.keyId].cap.name : "");
  const [args, setArgs] = useState(caps[props.keyId] ? caps[props.keyId].cap.args : []);

  const argsEditorChanged = (value, event) => {
    try {
      dispatch(setArgs(JSON.parse(`[${value}]`)));
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
    else if (id == 'include') {
      if (value.target.checked) {
        updateCap();
      }
      else {
        // Remove the cap from the state
        dispatch(removeCap(props.keyId));
      }
    }
  }

  const deleteCap = () => {
    props.onDelete(props.keyId);
  }

  useEffect(() => {
    updateCap();
  }, [role, name, description, args]);

  const updateCap = () => {
    // console.log("Role:", role, "Name: ",  name, "Desc", description, "Args", args);
    dispatch(writeCap({ key: props.keyId, cap: Pact.lang.mkCap(role, description, name, args) }));
  }

  return (
    <FlexColumn className={`bg-slate-900 rounded-md p-2 gap-2 ${props.className}`}>
      <FlexRow className="gap-2">
        <CustomInput
          title="Role:"
          id="role"
          placeholder="Cap Purpose"
          default={role}
          onInputChanged={onInputChanged}
        />
        <CustomInput
          title="Description:"
          id="description"
          placeholder="One sentence explanation"
          default={description}
          onInputChanged={onInputChanged}
        />
        <CustomInput
          title="Name (full reference):"
          id="name"
          placeholder="e.g. coin.GAS"
          default={name}
          onInputChanged={onInputChanged}
        />
      </FlexRow>
      <FlexRow className='gap-2'>
        <FlexColumn className="flex-auto w-96">
          <span>Arguments, separate values with commas, strings must be in quotes "":</span>
          <div className='rounded-lg overflow-hidden'>
            <Editor
              height="50px"
              // width="100px"
              defaultLanguage="json"
              defaultValue={args.join(', ')}
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
              id="include"
              type="checkbox"
              onChange={onInputChanged}/>
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
