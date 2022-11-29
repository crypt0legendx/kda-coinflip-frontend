function CustomButton(props) {
  return (
    <button
      className={`border-white border-2 rounded-md h-auto px-8 py-2 hover:border-purple-300 active:border-purple-700 focus:border-purple-500 transition duration-150 ease-out ${props.className}`}
      onClick={props.onClick ? props.onClick : () => { }}>
      {props.text}
    </button>
  )
}

export default CustomButton
