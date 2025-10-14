import React, { useState } from 'react';
import ModalFiltro from './ModalFiltro';

const Search = ({ onFilterChange, activeFilter }) => {
  const [showModal, setShowModal] = useState(false);

  const handleFilterSelect = (filterName, filterType, filterValue) => {
    onFilterChange({ type: filterType, value: filterValue, name: filterName });
    setShowModal(false);
  };

  const clearFilter = () => {
    onFilterChange(null);
  };

  return (
    <>
      <div className='container-fluid'>
        <div className='d-flex gap-2 align-items-center w-50'>
          <div className='flex-grow-1 position-relative'>
            <i className='bi bi-search position-absolute top-50 translate-middle-y text-muted' style={{left: '12px', zIndex: 10}}></i>
            <input 
              type="text" 
              name="Busca" 
              id="Busca" 
              placeholder={`Buscar...`} 
              className="form-control bg-light text-dark border-1 border-secondary rounded-2 "  
              style={{paddingLeft: '40px'}}
            />
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary d-flex align-items-center gap-1"
              onClick={() => setShowModal(true)}
            >
              <i className='bi bi-funnel'></i>
              {activeFilter ? activeFilter.name : 'Filtrar'}
            </button>
            {activeFilter && (
              <button
                className="btn btn-outline-danger d-flex align-items-center"
                onClick={clearFilter}
                title="Limpar filtro"
              >
                <i className='bi bi-x'></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className='modal show d-block' tabIndex="-1">
          <div className='modal-backdrop show' onClick={() => setShowModal(false)}></div>
          <ModalFiltro
            onClose={() => setShowModal(false)}
            onFilterSelect={handleFilterSelect}
          />
        </div>
      )}
    </>
  );
};

export default Search;