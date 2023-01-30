import './modal.css'

function ModalImage({ children, isOpen, closeModal }) {
  const handleCloseModal = e => e.stopPropagation()
  return (
    <div className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-image-container" onClick={handleCloseModal}>
        <button onClick={closeModal} className="closeModal">X</button>
        {children}
      </div>
    </div>
  )
}

export default ModalImage