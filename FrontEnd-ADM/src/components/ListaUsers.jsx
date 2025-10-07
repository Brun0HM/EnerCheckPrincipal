import React, { useState } from 'react'
import usuarios from '../apis/usuarios'
import { ComponenteLista } from './ComponenteLista'
import VisualizarLista from './VisualizarLista';


export const ListaUsers = () => {
   const [selectedItem, setSelectedItem] = useState(null);
      const [showModal, setShowModal] = useState(false);
    
      const handleView = (item)=>{
        setSelectedItem(item);
        setShowModal(true);
      }
      const handleCloseModal = ()=>{
        setSelectedItem(null);
        setShowModal(false);
      }
  return (
    <>
    <div className="d-flex flex-column gap-2 overflow-y-auto rounded-4 " style={{ maxHeight: "500px" }} >
            {
              usuarios.map((item) => (
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
                />
              ))
            }


          </div>
          {showModal &&(
      <div className='modal show d-block' tabIndex="-1">
        <div className='modal-backdrop show' onClick={handleCloseModal}></div>
        <VisualizarLista
        item={selectedItem}
        onClose={handleCloseModal}
        />
      </div>
    )}
          </>
  )
}
