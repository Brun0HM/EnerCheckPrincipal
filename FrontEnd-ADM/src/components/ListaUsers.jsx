import React from 'react'
import usuarios from '../apis/usuarios'
import { ComponenteLista } from './ComponenteLista'


export const ListaUsers = () => {
  return (
    <div className="d-flex flex-column gap-2 overflow-y-auto rounded-4" style={{ maxHeight: "500px" }} >
            {
              usuarios.map((users) => (
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
  )
}
