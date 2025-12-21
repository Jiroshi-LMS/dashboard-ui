const Loader = (props: { className?: string }) => {
  return (
    <div className={`flex justify-center items-center w-full ${(props?.className) ? props.className : ""}`}>
      <div className="loader"></div>
    </div>
  )
}

export default Loader