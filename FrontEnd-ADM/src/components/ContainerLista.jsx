import React, { useState, useMemo, useEffect } from 'react';

import monitoramento from '../apis/monitoramento';
import apiService from '../../../FronEnd/services/api';
import apiPlanos from '../apis/planos';
import apiProjetos from '../apis/monitoramento';

const ContainerLista = (props) => {

  const [usuarios, setUsuarios] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [projetos, setProjetos] = useState([]);


  useEffect(() => {
  apiPlanos.listagemPlanos().then(setPlanos);
  apiService.getUser().then(setUsuarios);
  apiProjetos.getProjetos().then(setProjetos);
  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Extrair os itens considerando filtros
  const allItems = useMemo(() => {
    if (React.isValidElement(props.lista)) {
      const componentType = props.lista.type;
      const componentProps = props.lista.props || {};
      
      // Se há dados filtrados nas props do componente, use eles
      if (componentProps.filteredData && componentProps.filteredData !== null) {
        return componentProps.filteredData;
      }
      
      // Senão, use os dados originais baseado no tipo
      if (componentType && componentType.name === 'ListaUsers') {
        return usuarios;
      } else if (componentType && componentType.name === 'ListaPlanos') {
        return planos;
      } else if (componentType && componentType.name === 'ListaProjetos') {
        return monitoramento;
      }
    }
    return [];
  }, [props.lista, usuarios, planos, projetos]);

  // Resetar para página 1 quando os dados mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [allItems]);

 
 

    // Cálculos de paginação
    const totalItems = allItems.length;

    const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = allItems.slice(startIndex, endIndex);

  
  // Manipuladores de navegação
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  

  // Renderizar o componente de lista com os itens paginados
  const renderPaginatedList = () => {
    if (React.isValidElement(props.lista)) {
      const componentType = props.lista.type;
      
      if (componentType && componentType.name === 'ListaUsers') {
        return React.cloneElement(props.lista, { 
          paginatedData: currentItems,
          showModals: false,
          filteredData: null
        });
      } else if (componentType && componentType.name === 'ListaPlanos') {
        return React.cloneElement(props.lista, { 
          paginatedData: currentItems,
          showModals: false,
          filteredData: null
        });
      } else if (componentType && componentType.name === 'ListaProjetos') {
        return React.cloneElement(props.lista, { 
          paginatedData: currentItems,
          showModals: false,
          filteredData: null
        });
      }
    }
    return props.lista;
  };

  return (
    <div className="border border-2 border-dark border-opacity-10 d-flex flex-column rounded-4 px-3 py-3">
      {/* Header original mantido */}
      <div className=" mb-3 mt-md-0 d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div>
          <p className="m-0 fw-bold fs-5">{props.topico}</p>
          <p className="small">{props.desc}</p>
        </div>
        {props.ModalOpen && (
          <div className='d-flex flex-row gap-2'>
          <button className={`btn btn-dark py-1 px-3 rounded-3 ${props.sumiu}`}>
            <div
              className="d-flex flex-row align-items-center"
              onClick={props.ModalOpen}
            >
              <i className="bi bi-person-plus-fill text-primary fs-5 me-2"></i>{" "}
              <b className="fs-6">
                Cadastrar
              </b>
            </div>
          </button>
    <button onClick={props.getLista} className="btn bg-primary text-light fw-medium">Recarregar Lista</button>
          </div>
        )}
      </div>

      {/* Container da Lista - altura fixa para exatamente 3 itens */}
      <div className="flex-grow-1" style={{minHeight: '540px', overflow: 'hidden'}}>
        {renderPaginatedList()}
      </div>
      
      {/* Footer com total de itens e navegação */}
      <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
        <small className="text-muted">
          Exibindo {currentItems.length} de {totalItems} itens
        </small>
        
        {totalPages > 1 && (
          <div className="d-flex align-items-center gap-1">
            <button 
              className="btn btn-sm btn-outline-primary"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <span className="fw-medium mx-2">
              {currentPage} de {totalPages}
            </span>
            <button 
              className="btn btn-sm btn-outline-primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { ContainerLista };