import './modal.css'

function ModalInput({ children, isOpen, closeModal }) {
  const handleCloseModal = e => e.stopPropagation()
  return (
    <div className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleCloseModal}>
        <button className='modal-close' onClick={closeModal}> X </button>
        <div className='container-icon-text'>
          <h1>Por favor introduzca la contraseña para poder borrar el video juego</h1>
        </div>
        {children}
      </div>
    </div>
  )
}

export default ModalInput