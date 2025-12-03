import React, { useEffect, useState } from "react";
import apiService from "../../services/api";

const ResumoPedido = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // Função para obter o usuário logado pelo token
  async function getUserToken() {
    try {
      const user = await apiService.getUserByToken();
      setCurrentUser(user);
    } catch (error) {
      console.error("Erro ao obter usuário pelo token:", error);
    }
  }

  useEffect(() => {
    getUserToken();
  }, []);

  return (
    <>
      <h5 className="fw-bold">Resumo do Pedido</h5>
      <div className="Plano">
        <div className="preco fw-bold d-flex justify-content-between">
          <p>
            {" "}
            Plano:{" "}
            {currentUser && currentUser.plano
              ? currentUser.plano.nome
              : "Nenhum"}
          </p>
          <h5 className="fw-bold">
            {""}
            R$:{"     "}
            {currentUser && currentUser.plano
              ? currentUser.plano.preco
              : "Nenhum"}
          </h5>
        </div>
        <p className="mb-1">por mês</p>
        <span
          className="bg-primary-subtle p-1 px-2 rounded-2"
          style={{ fontSize: 14, color: "#001aff" }}
        >
          7 dias grátis
        </span>
      </div>
      <hr />
      <div>
        <div className="d-flex justify-content-between mb-1">
          <p className="m-0">Subtotal:</p>
          <p className="m-0 fw-bold">R$00.00</p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="m-0">Desconto:</p>
          <p className="m-0">
            {""}
            R$:{"     "}
            {currentUser && currentUser.plano
              ? currentUser.plano.preco
              : "Nenhum"}
          </p>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between ">
        <h5 className="">Total</h5>
        <h4 className="fw-bold">
          {""}
          R$:{"     "}
          {currentUser && currentUser.plano
            ? currentUser.plano.preco
            : "Nenhum"}
        </h4>
      </div>
    </>
  );
};

export default ResumoPedido;
