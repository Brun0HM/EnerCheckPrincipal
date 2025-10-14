import React from 'react';

const ModalFiltro = ({ onClose, onFilterSelect }) => {
  const handleFilterClick = (filterName, filterType, filterValue) => {
    onFilterSelect(filterName, filterType, filterValue);
  };

  return (
    <div className="modal-dialog modal-dialog-centered bg-light" style={{ zIndex: 1060 }}>
      <div className="modal-content" style={{ backgroundColor: "var(--card-bg)", color: "var(--text)" }}>
        <div className="modal-header" style={{ borderColor: "var(--card-border)" }}>
          <h5 className="modal-title" style={{ color: "var(--text)" }}>Filtros</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            style={{ filter: "var(--bs-btn-close-filter, invert(1))" }}
          ></button>
        </div>
        <div className="modal-body">
          <div className="d-flex flex-column gap-4">
            
            {/* Tipo Projeto */}
            <div>
              <h6 style={{ color: "var(--text)" }}>Tipo Projeto</h6>
              <div className="d-flex gap-2 flex-wrap">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleFilterClick('Residencial', 'tipoProjeto', 'Projeto Residencial')}
                >
                  Residencial
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleFilterClick('Comercial', 'tipoProjeto', 'Projeto Comercial')}
                >
                  Comercial
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleFilterClick('Industrial', 'tipoProjeto', 'Projeto Industrial')}
                >
                  Industrial
                </button>
              </div>
            </div>

            {/* Tipo Conta */}
            <div>
              <h6 style={{ color: "var(--text)" }}>Tipo Conta</h6>
              <div className="d-flex gap-2 flex-wrap">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleFilterClick('Pro', 'tipoConta', 'Pro')}
                >
                  Pro
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleFilterClick('Básico', 'tipoConta', 'Básico')}
                >
                  Básico
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleFilterClick('Empresas', 'tipoConta', 'Empresas')}
                >
                  Empresas
                </button>
              </div>
            </div>

            {/* Status */}
            <div>
              <h6 style={{ color: "var(--text)" }}>Status</h6>
              <div className="d-flex gap-2 flex-wrap">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleFilterClick('Concluído', 'statusProjeto', 'Concluído')}
                >
                  Concluído
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleFilterClick('Processando', 'statusProjeto', 'Processando')}
                >
                  Processando
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleFilterClick('Erro', 'statusProjeto', 'Erro')}
                >
                  Erro
                </button>
              </div>
            </div>

            {/* Ordenação por Data */}
            <div>
              <h6 style={{ color: "var(--text)" }}>Ordenar por Data</h6>
              <div className="d-flex gap-2 flex-wrap">
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => handleFilterClick('Mais Recentes', 'dateSort', 'recent')}
                >
                  Mais Recentes
                </button>
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => handleFilterClick('Mais Antigos', 'dateSort', 'oldest')}
                >
                  Mais Antigos
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFiltro;