import './modal.css'

function ModalImage({ children, isOpen }) {
  return (
    <div className={`modal ${isOpen && "is-open"}`}>
      <div className="modal-loader-container">
        <div className='container-icon-text'>
          <h1>Loading!</h1>
        </div>
        {console.log(children)}
        {children}
        <div className="loader"></div>
      </div>
    </div>
  )
}

export default ModalImage