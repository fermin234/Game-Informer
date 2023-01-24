import './modal.css'
import error from '../../assets/iconErrorModal.png'

function ModalInformation({ children, isOpen, closeModal }) {
  const handleCloseModal = e => e.stopPropagation()
  return (
    <div className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleCloseModal}>
        <button className='modal-close' onClick={closeModal}> X </button>
        <div className='container-icon-text'>
          <img src={error} alt="ErrorIcon" className='errorIcon' />
          <h1>Oh snap!</h1>
        </div>
        {children}
      </div>
    </div>
  )
}

export default ModalInformation