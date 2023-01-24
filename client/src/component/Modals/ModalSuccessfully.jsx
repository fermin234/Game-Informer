import './modal.css'

function ModalSuccessfully({ children, isOpen, closeModal }) {
  const handleCloseModal = e => e.stopPropagation()
  return (
    <div className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-succes-container" onClick={handleCloseModal}>
        <button className='modal-close' onClick={closeModal}> X </button>
        <div className='container-icon-text'>
          <h1>Successfully!</h1>
        </div>
        {children}
      </div>
    </div>
  )
}

export default ModalSuccessfully