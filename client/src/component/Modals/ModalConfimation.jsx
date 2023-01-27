import './modal.css'

function ModalConfimation({ children, isOpen, closeModal }) {
  const handleCloseModal = e => e.stopPropagation()
  return (
    <div className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleCloseModal}>
        <button className='modal-close' onClick={closeModal}> X </button>
        {children}
      </div>
    </div>
  )
}

export default ModalConfimation