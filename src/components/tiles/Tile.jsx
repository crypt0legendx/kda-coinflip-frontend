import FlexColumn from "../layout/FlexColumn"

function Tile(props) {

  return (
    <FlexColumn className={`text-left gap-2 ${props.className}`}>
      <span className='text-2xl'>{props.title}</span>
      {props.children}
    </FlexColumn>
  )
}

export default Tile
