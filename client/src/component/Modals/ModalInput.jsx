import './modal.css'

function ModalInput({ children, isOpen, closeModal }) {
  const handleCloseModal = e => e.stopPropagation()
  return (
    <div className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleCloseModal}>
        <button className='modal-close' onClick={closeModal}> X </button>
        <div className='container-icon-text'>
          <h1>Please enter the password in order to delete the video game.</h1>
        </div>
        {children}
      </div>
    </div>
  )
}

export default ModalInput