import React, { useState } from 'react'
import usuarios from '../apis/usuarios'
import { ComponenteLista } from './ComponenteLista'
import VisualizarLista from './VisualizarLista';
import DeleteModal from './DeleteModal';

export const ListaUsers = ({ paginatedData}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModalView, setShowModalView] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  
  // Usar dados paginados se fornecidos, senão usar todos os dados
  const dataToRender = paginatedData || usuarios;

  const handleView = (item)=>{
    setSelectedItem(item);
    setShowModalView(true);
  }
  const handleCloseModalView = ()=>{
    setSelectedItem(null);
    setShowModalView(false);
  }
  const handleCloseModalDelete = ()=>{
    setSelectedItem(null);
    setShowModalDelete(false);
  }
  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowModalDelete(true);
  }

  const handleConfirmDelete = (itemId) => {
    console.log(`Excluindo item com ID: ${itemId}`);
  }

  return (
    <>
      <div className="d-flex flex-column gap-2 rounded-4" style={{ maxHeight: "500px" }}>
        {dataToRender.map((item) => (
          <ComponenteLista
            key={item.id}
            nome={item.usuarioNome}
            desc={item.email}
            topic1={'CREA'}
            t1info={item.crea}
            topic2={'Data de Criação'}
            t2info={item.dataCriacao}
            topic3={'Plano'}
            t3info={item.planos[0]?.nome}
            view={()=> handleView(item)}
            delete={()=> handleDelete(item)}
          />
        ))}
      </div>
      
      {showModalView && (
        <div className='modal show d-block' tabIndex="-1">
          <div className='modal-backdrop show' onClick={handleCloseModalView}></div>
          <VisualizarLista
            item={selectedItem}
            onClose={handleCloseModalView}
          />
        </div>
      )}
      
      { showModalDelete && (
        <div className='modal show d-block' tabIndex="-1">
          <div className='modal-backdrop show' onClick={handleCloseModalDelete}></div>
          <DeleteModal
            item={selectedItem}
            onClose={handleCloseModalDelete}
            onConfirm={handleConfirmDelete}
          />
        </div>
      )}
    </>
  )
}