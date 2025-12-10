import React, { useEffect, useState } from "react";
import { TabelaGeral } from "../components/TabelaGeral";
import { ContainerLista } from "../components/ContainerLista";
import { ListaPlanos } from "../components/ListaPlanos";
import apiPlanos from "../apis/planos";
import { ToastContainer, toast } from "react-toastify";
const GerenciamentoPlanos = () => {
  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [planos, setPlanos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  
  // const mediaPlanos = planos.reduce((acc, curr, index, array) => {
  //   acc += (curr.preco * curr.quantidadeUsers)
  
  //   if (index === array.length - 1) {
  //     return acc / array.length;
  //   }
  //   return acc;
  // }, 0)


  const listarPlanos = async () => {
    setCarregando(true);
    setPlanos("");
    const notificacao = toast.loading(" Carregando dados...", {
      position: "bottom-right",
      className: "bg-primary text-light"
    });

    try {
      
      const dados = await apiPlanos.listagemPlanos();
      if (dados) {
        setPlanos(dados);
        console.log("Dados de planos carregados!");
        if (planos) {
          toast.update(notificacao, {
           render: "Dados Carregados!",
          type: "success",
          className: "bg-success text-light border border-2 border-light",
          isLoading: false,
          autoClose: 2000,
          progressClassName: "text-light bg-success-subtle"
          });
        }
      }
    } catch (e) {
      console.log("Erro ao utilizar a api: ", e);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    listarPlanos();
  }, []);


  return (
    <div className="container py-5 mt-2 pt-2 mb-3 pb-3">
      <ToastContainer></ToastContainer>
      <h3 className="text-capitalize fw-bold text-start m-0">
        Administração de planos
      </h3>
      <p className="fs-6 fw-light">
        Ler, criar, editar e excluir cadastro de planos
      </p>

      <div className="d-flex flex-column gap-3 overflow-hidden">
        <TabelaGeral
          topic1={"Planos Disponíveis"}
          t1info={planos.length}
          topic2={"Faturamento Atual"}
          t2info={"R$ " + "100,00"}
          topic3={"Tópico 3"}
          t3info={"41"}
        />
        <ContainerLista
          topico={"Listagem de Planos"}
          desc={"Gerencie todos os Planos disponíveis"}
          lista={<ListaPlanos plano={planos} />}
          ModalOpen={() => setIsModalOpen(true)}
        />
      </div>
    </div>
  );
};

export default GerenciamentoPlanos;
