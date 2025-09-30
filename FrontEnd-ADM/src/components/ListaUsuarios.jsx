import React from "react";
import { ComponenteLista } from "./ComponenteLista";
import usuarios from "../apis/usuarios";


export const ListaUsuarios = () => {
const user = usuarios;


  return (
    <div className="border border-2 border-dark border-opacity-10 shadow d-flex flex-column rounded-4 px-3 py-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
            <p className="m-0 fw-bold fs-5">Lista de usuários</p>
            <p className="small">Gerencie todos os usuários disponíveis no sistema</p>
        </div>
        <button className="btn btn-dark py-1 px-3 rounded-3">
            <div className="d-flex flex-row align-items-center">
            <i className="bi bi-person-plus-fill text-primary fs-3 me-2"></i> <b className="fs-5">Cadastrar</b>
            </div>
        </button>
      </div>

          <div className="d-flex flex-column gap-2 overflow-y-scroll" style={{ maxHeight: "500px" }} >
            {
              user.map((users) => (
                <ComponenteLista
                key={users.id}
                nome={users.usuarioNome}
                desc={users.email}
    
                topic1={'CREA'}
                t1info={users.crea}

                topic2={'Data de Criação'}
                t2info={users.dataCriacao}
    
                topic3={'Plano'}
                t3info={users.planos[0]?.nome}
                />
              ))
            }


          </div>
      
    </div>
  );
};
