function TitleMessageRender(props) {

  return (
    <div>
      <span>{props.title}</span>
      <br></br>
      <span className="break-all">{props.message}</span>
    </div>
  )
}

export default TitleMessageRender
