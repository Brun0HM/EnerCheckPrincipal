import React, { useState } from "react";
import monitoramento from "../apis/monitoramento";
import { ComponenteLista } from "./ComponenteLista";
import VisualizarLista from "./VisualizarLista";

const ListaProjetos = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleView = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };
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
            view={() => handleView(item)}
            sumiu={item.sumiu}
          />
        ))}
      </div>
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-backdrop show" onClick={handleCloseModal}></div>
          <VisualizarLista item={selectedItem} onClose={handleCloseModal} />
        </div>
      )}
    </>
  );
};

export default ListaProjetos;
