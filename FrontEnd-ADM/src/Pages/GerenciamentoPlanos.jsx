import React, { useEffect, useState } from "react";
import { TabelaGeral } from "../components/TabelaGeral";
import { ContainerLista } from "../components/ContainerLista";
import { ListaPlanos } from "../components/ListaPlanos";
import apiPlanos from "../apis/planos";

const GerenciamentoPlanos = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
  

  const [planos, setPlanos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  
  
  
  const listarPlanos = async () => {
  
    try {
      setCarregando(true)
      const dados = await apiPlanos.listagemPlanos()
      setPlanos(dados);
    } catch (e) {
      console.log("Erro ao utilizar a api: ", e)
    } finally {
      setCarregando(false);
    }
  }
  
  useEffect(() => {
  
  listarPlanos().catch(console.error);
  
  },[])


  //  const faturamentoTotal = planos.reduce((valorAnt, plano) => {
  //    return valorAnt + plano.preco * plano.totalUsuarios;
  //  }, 0);
  return (
    <div className='container py-5 mt-2 pt-2 mb-3 pb-3'>
        <h3 className='text-capitalize fw-bold text-start m-0'>Administração de planos</h3>
        <p className='fs-6 fw-light'>Ler, criar, editar e excluir cadastro de planos</p>

{ planos && (

  <div className='d-flex flex-column gap-3 overflow-hidden'>

        <TabelaGeral
        topic1={"Planos Disponíveis"}
        t1info={planos.length}
        
        topic2={"Faturamento Atual"}
        t2info={"R$" }
        
        topic3={"Tópico 3"}
        t3info={"41"}
        />
    <ContainerLista
    topico={"Listagem de Planos"}
    desc={"Gerencie todos os Planos disponíveis"}
    lista={<ListaPlanos />}
    ModalOpen={() => setIsModalOpen(true)}
    />
  

  </div>
  )}
    </div>
  );
};

export default GerenciamentoPlanos;
