import React from 'react'

const VisualizarLista = ({ item, onClose, title = "Visualizar" }) => {
  if (!item) return null;

  const renderField = (label, value) => {
    if (!value) return null;
    return (
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
        <span className="fw-medium text-primary">{label}:</span>
        <span className="fw-semibold">{value}</span>
      </div>
    );
  };

  return (
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{ zIndex: 1060 }}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          <div className="d-flex flex-column gap-3">
            
            {/* Renderização dinâmica baseada no tipo de item */}
            {item.email && renderField("Email", item.email)}
            {item.usuarioNome && renderField("Nome", item.usuarioNome)}
            {item.nome && renderField("Nome", item.nome)}
            
            {item.tipoProjeto && renderField("Tipo Projeto", item.tipoProjeto)}
            {item.tipoConta && renderField("Tipo Conta", item.tipoConta)}
            {item.data && renderField("Data", item.data)}
            {item.statusProjeto && renderField("Status", item.statusProjeto)}
            
            {item.crea && renderField("CREA", item.crea)}
            {item.dataCriacao && renderField("Data de Criação", item.dataCriacao)}
            {item.planos && item.planos[0] && renderField("Plano", item.planos[0].nome)}
            
            {item.preco && renderField("Preço", item.preco)}
            {item.requisicoes && renderField("Requisições", item.requisicoes)}
            {item.ativo !== undefined && renderField("Ativo", item.ativo ? "Sim" : "Não")}
            
            {item.id && renderField("ID", item.id)}

          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default VisualizarLista