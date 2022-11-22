function FlexColumn(props) {

  return (
    <div className={`h-auto flex flex-col ${props.className}`}>
      {props.children}
    </div>
  )
}

export default FlexColumn
