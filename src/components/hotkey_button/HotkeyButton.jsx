import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../layout/CustomButton";
import { setKeyState } from "./hotkeySlice";

function HotkeyButton(props) {
  let dispatch = useDispatch();
  const keysPressed = useSelector(state => state.keysPressed.state);

  const [hotkeyDescriptor, setHotkeyDescriptor] = useState('');

  useEffect(() => {
    if (!props.hotkeys) {
      return;
    }
    var hotkeyList = props.hotkeys.join(' + ');
    setHotkeyDescriptor(` (${hotkeyList})`);
  });

  useEffect(() => {
    // console.log(keysPressed);
    // If we have no hotkeys, stop
    if (!props.hotkeys) {
      return;
    }

    // Check each hotkey we were provided with
    var isPressed = true;
    for (var key of props.hotkeys) {
      if (!keysPressed[key]) {
        isPressed = false;
        break;
      }
    }

    // If pressed, toggle the click
    if (isPressed) {
      var hotkeyReset = {};
      for (var hotkey of props.hotkeys) {
        hotkeyReset[hotkey] = false;
      }
      dispatch(setKeyState({
        ...keysPressed,
        ...hotkeyReset,
      }));
      // console.log('running');
      props.onClick();
    }
  }, [keysPressed]);

  return (
    <CustomButton
      className={props.className}
      text={`${props.text}${hotkeyDescriptor}`}
      onClick={props.onClick}/>
  )
}

export default HotkeyButton;