function FlexRow(props) {

  return (
    <div className={`flex flex-row flex-wrap items-stretch ${props.className}`}>
      {props.children}
    </div>
  )
}

export default FlexRow
