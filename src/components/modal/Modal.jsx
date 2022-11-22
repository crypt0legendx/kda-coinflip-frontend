import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../layout/CustomButton";
import FlexRow from "../layout/FlexRow";
import { hideModal, registerModal } from "./modalSlice";

function Modal(props) {
  const dispatch = useDispatch();
  const modalInfo = useSelector(state => state.modals.modalInfo);

  // Init
  useEffect(() => {
    dispatch(registerModal(props.modalId));
  }, [props.modalId]);

  const closeModal = () => {
    dispatch(hideModal(props.modalId));
  }

  const yesClicked = () => {
    if (props.onYes) {
      props.onYes();
    }
    closeModal();
  }

  const noClicked = () => {
    if (props.onNo) {
      props.onNo();
    }
    closeModal();
  }
  

  if (!modalInfo[props.modalId]) {
    return null;
  }

  const modalStyle = props.modalStyle ? props.modalStyle : "border-white border-4 rounded-md py-4 px-8 shadow-lg min-w-max max-w-xl flex flex-col gap-4 bg-slate-800";

  return (
    <div className="z-50 bg-blend-darken bg-black bg-opacity-50 transition duration-300 ease-in-out fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto flex flex-col justify-center place-items-center">
      {/* <div className="w-full flex flex-row justify-center pointer-events-none"> */}
      <div className={modalStyle}>
        <div className="flex flex-row justify-between space-x-10">
          <span className="text-3xl">{props.title}</span>
          <button
            className="text-3xl"
            onClick={closeModal}
          >X</button>
        </div>
        <span className="break-all">{props.info}</span>
        <FlexRow className='gap-2'>
          <CustomButton
            className='flex-auto'
            text={props.noText}
            onClick={noClicked}/>
          <CustomButton
            className='flex-auto'
            text={props.yesText}
            onClick={yesClicked}/>
        </FlexRow>
      </div>
      {/* </div> */}
    </div >
  );
}

export default Modal;