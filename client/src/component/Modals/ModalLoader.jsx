import './modal.css'

function ModalLoader({ children, isOpen }) {
  return (
    <div className={`modal ${isOpen && "is-open"}`}>
      <div className="modal-loader-container">
        <div className='container-icon-text'>
          <h1>Loading!</h1>
        </div>
        {children}
        <div className="loader"></div>
      </div>
    </div>
  )
}

export default ModalLoader