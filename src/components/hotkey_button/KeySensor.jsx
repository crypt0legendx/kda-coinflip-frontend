import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setKeyState } from "./hotkeySlice";


function KeySensor(props) {
  let dispatch = useDispatch();
  const keysPressed = useSelector(state => state.keysPressed.state);

  const keyDownHandler = event => {
    // console.log('pressed', event.key);
    let key = event.key;
    dispatch(setKeyState({
      ...keysPressed,
      [key]: true,
    }));
  }
  const keyUpHandler = event => {
    // console.log('unpressed', event.key);
    let key = event.key;
    dispatch(setKeyState({
      ...keysPressed,
      [key]: false,
    }));
    // console.log(keysPressed);
  }

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    }
  })

  return (
    <div></div>
  )
}

export default KeySensor;