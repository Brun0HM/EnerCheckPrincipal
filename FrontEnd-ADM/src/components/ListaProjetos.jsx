import React from 'react'
import monitoramento from '../apis/monitoramento'

const ListaProjetos = () => {
  return (
 <div
      className="d-flex flex-column gap-2 overflow-y-auto rounded-4"
      style={{ maxHeight: "500px" }}
    >
      {monitoramento.map((monitoramento) => (
        <ComponenteLista
          key={monitoramento.id}
          nome={monitoramento.email}
          topic1={"Tipo Projeto"}
          t1info={monitoramento.tipoProjeto}
          topic2={"Tipo Conta"}
          t2info={monitoramento.tipoConta}
          topic3={"Data"}
          t3info={monitoramento.data}
          topic4={"Status"}
          t4info={monitoramento.statusProjeto}
        />
      ))}
    </div>
  );
};

export default ListaProjetos