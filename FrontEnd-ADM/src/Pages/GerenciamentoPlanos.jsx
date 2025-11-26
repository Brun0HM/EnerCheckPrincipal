import React, { useEffect, useState } from "react";
import { TabelaGeral } from "../components/TabelaGeral";
import { ContainerLista } from "../components/ContainerLista";
import { ListaPlanos } from "../components/ListaPlanos";
import apiPlanos from "../apis/planos";

const GerenciamentoPlanos = () => {

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
  
  listarPlanos().then(setPlanos).catch(console.error);
  
  },[])


  //  const faturamentoTotal = planos.reduce((valorAnt, plano) => {
  //    return valorAnt + plano.preco * plano.totalUsuarios;
  //  }, 0);
  return (
    <div className='container py-5 mt-2 pt-2 mb-3 pb-3'>
        <h3 className='text-capitalize fw-bold text-start m-0'>Administração de planos</h3>
        <p className='fs-6 fw-light'>Ler, criar, editar e excluir cadastro de planos</p>

{!carregando && planos && (

  <div className='d-flex flex-column gap-3 overflow-hidden'>

        <TabelaGeral
        topic1={"Cadastros Totais"}
        t1info={planos.length}
        
        topic2={"Faturamento Atual"}
        t2info={"R$" }
        
        topic3={"Tópico 3"}
        t3info={"41"}
        />
    <ContainerLista
    topico={"lorem ipsum dolor sit amet"}
    desc={"lorem ipsum dolor doloris"}
    lista={<ListaPlanos />}
    />
  

  </div>
  )}
    </div>
  );
};

export default GerenciamentoPlanos;
