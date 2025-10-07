import React from 'react'

const DeleteModal = ({item, onClose, onConfirm, title = "Certeza que deseja excluir o cadastro?" }) => {
    const handleConfirmDelete = () => {
        // Passa apenas o ID do item para a função de confirmação
        onConfirm(item.id);
        onClose();
      };
    return (
    <div className="modal-dialog modal-dialog-centered" style={{ zIndex: 1060 }}>
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">{title}</h5>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>
      <div className="modal-body ">
        <div className="d-flex flex-column gap-3">
        <div className="d-flex justify-content-center align-items-center border-bottom pb-2">
      <button className='btn btn-danger text-light rounded-2 me-5' onClick={handleConfirmDelete}>Excluir</button>
      <button className='btn btn-primary text-light rounded-2 ms-5' onClick={onClose}>Cancelar</button>
      </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal