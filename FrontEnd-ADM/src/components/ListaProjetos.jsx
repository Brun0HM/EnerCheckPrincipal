import React, { useState } from 'react'
import monitoramento from '../apis/monitoramento'
import { ComponenteLista } from './ComponenteLista';
import VisualizarLista from './VisualizarLista';
import DeleteModal from './DeleteModal';

const ListaProjetos = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModalView, setShowModalView] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
    

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
 <div
      className="d-flex flex-column gap-2 overflow-y-auto rounded-4"
      style={{ maxHeight: "500px" }}
    >
      {monitoramento.map((item) => (
        <ComponenteLista
          key={item.id}
          nome={item.email}
          display1={"d-lg-block d-none"}
          topic1={"Tipo Projeto"}
          t1info={item.tipoProjeto}
          topic2={"Tipo Conta"}
          t2info={item.tipoConta}
          topic3={"Data"}
          t3info={item.data}
          topic4={"Status"}
          t4info={item.statusProjeto}
          view={()=> handleView(item)}
          delete={()=> handleDelete(item)}
          sumiu={item.sumiu}
        />
      ))}
    </div>
    {showModalView &&(
      <div className='modal show d-block' tabIndex="-1">
        <div className='modal-backdrop show' onClick={handleCloseModalView}></div>
        <VisualizarLista
        item={selectedItem}
        onClose={handleCloseModalView}
        />
      </div>
    )}
     {showModalDelete &&(
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
  );
};

export default ListaProjetos;
