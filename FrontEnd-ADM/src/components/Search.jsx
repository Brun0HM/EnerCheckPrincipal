import React from 'react'

const Search = () => {
  return (
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
        <div>
          <button
            className="btn btn-outline-secondary d-flex align-items-center gap-1"
            data-bs-toggle="modal"
            data-bs-target="#FilterModal"
          >
            <i className='bi bi-funnel'></i>
            Filtrar
          </button>  
        </div>
      </div>
    </div>
  )
}

export default Search