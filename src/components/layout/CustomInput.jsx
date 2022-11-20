import FlexColumn from "./FlexColumn";

function CustomInput(props) {
  return (
    <FlexColumn className={`flex-auto h-15 ${props.className}`}>
      <span>{props.title}</span>
      <input 
        id={props.id}
        defaultValue={props.default ? props.default : ''}
        placeholder={props.placeholder ? props.placeholder : ''}
        className='flex-auto bg-black rounded-md border-white border-2 p-1'
        onChange={props.onInputChanged}/>
    </FlexColumn>
  )
}

export default CustomInput;