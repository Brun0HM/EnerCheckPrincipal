import React, { useEffect, useState,  } from "react";
import apiPlanos from "../apis/planos";
import apiService from "../../../FronEnd/services/api";
import apiUser from "../apis/usuarios";
import { useNavigate } from "react-router";

const Editar = ({plano, usuarios, fechar}) => {

  const navigate = useNavigate()

  const [nome, setNome] = useState(usuarios.nome)
  const [email, setEmail] = useState(usuarios.email)
  const [numCrea, setNumCrea] = useState(usuarios.crea)
  const [empresa, setEmpresa] = useState(usuarios.empresa)
  

  const payload = {
    "email" : email,
    "nomeCompleto": nome,
    "numeroCrea": numCrea,
    "empresa": empresa
  }

  const handleEditUser = async (id) => {
   if (usuarios && id) {
      try {
        
        await apiUser.editUser(id, payload)
        navigate("/users")
      } catch (error) {
        console.error("Erro ao editar dados do usuário: ", error.message)
      }
   } else return;
  }


  return (
  
  
  <>
  { usuarios && 
  
  <div className=" col-11 col-md-3 border border-2 rounded-4 py-4 shadow bg-white">
  <h3 className="ms-4 fw-bold">Editar Usuário</h3>
  <div className="d-flex flex-column align-items-center gap-4 fw-bold py-3">
    <div className="Name col-11 col-md-10">
      <label htmlFor="">Nome Completo</label>
      <input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="form-control" type="text" />
    </div>
    <div className="Email col-11 col-md-10">
      <label htmlFor="">Email</label>
      <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
    </div>
    <div className="CREA col-11 col-md-10">
      <label htmlFor="crea">Número CREA</label>
      <input id="crea" value={numCrea} onChange={(e) => setNumCrea(e.target.value) } className="form-control" />
      <div className="invalid-feedback">
        O CREA deve ter exatamente 10 dígitos.
      </div>
    </div>

    <div className="Empresa col-11 col-md-10">
      <label htmlFor="empresa">Empresa</label>
      <input id="empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value) } className="form-control" />
    </div>
    {/* <div className="Plano col-11 col-md-10">
      <label htmlFor="plano">Plano</label>
      <select id="plano" className="form-select">
        <option value="" disabled>
          Selecione um plano
        </option>

        <option value="Plano Básico">Plano Básico</option>
        <option value="Plano Pro">Plano Pro</option>
        <option value="Plano Pro">Plano Empresarial</option>
        <option value="Plano Pro">Plano Inicial</option>
      </select>
    </div> */}
    <div className="col-10 d-flex justify-content-between mt-3">
      <button className="btn btn-primary col-5" onClick={() => handleEditUser(usuarios.id)}>Salvar</button>
      <button className="btn btn-outline-dark col-5" onClick={fechar}>Cancelar</button>
    </div>
  </div>
</div>
  }
  
      
    </>
  );
};

export default Editar;
