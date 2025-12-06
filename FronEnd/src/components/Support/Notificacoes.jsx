import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";

const Notificacoes = () => {
  const [emailNotif, setEmailNotif] = useState(false);
  const [projetoNotif, setProjetoNotif] = useState(true);
  const [marketingNotif, setMarketingNotif] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Carregar valores do localStorage ao montar o componente
  useEffect(() => {
    const savedEmail = localStorage.getItem("emailNotif") === "true";
    const savedProjeto = localStorage.getItem("projetoNotif") === "true";
    const savedMarketing = localStorage.getItem("marketingNotif") === "true";
    setEmailNotif(savedEmail);
    setProjetoNotif(savedProjeto);
    setMarketingNotif(savedMarketing);
  }, []);

  // Função para salvar preferências no localStorage
  const salvarPreferencias = () => {
    localStorage.setItem("emailNotif", emailNotif.toString());
    localStorage.setItem("projetoNotif", projetoNotif.toString());
    localStorage.setItem("marketingNotif", marketingNotif.toString());
    setShowToast(true);
  };

  return (
    <div className="col-11 col-md-8 shadow border-2 border rounded-3 p-4 pb-5 mb-5 position-relative">
      {/* Toast de notificação */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        className="m-3 position-absolute top-0 end-0"
        style={{ zIndex: 1050 }}
      >
        <Toast.Body className="bg-success text-white rounded">
          As alterações foram salvas!
        </Toast.Body>
      </Toast>

      <div>
        <h5 className="fw-bold">Preferências de Notificação</h5>
        <p>Escolha como deseja receber notificações</p>
      </div>
      <div className="d-flex flex-column gap-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="">
            <p className="m-0 fw-semibold">Notificação por Email</p>
            <p className="m-0">Receba atualizações por email</p>
          </div>
          <input
            className="border-dark-subtle form-check-input"
            type="checkbox"
            checked={emailNotif}
            onChange={(e) => setEmailNotif(e.target.checked)}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="">
            <p className="m-0 fw-semibold">Atualizações de Projetos</p>
            <p className="m-0">Notificações sobre status dos projetos</p>
          </div>
          <input
            className="border-dark-subtle form-check-input"
            type="checkbox"
            checked={projetoNotif}
            onChange={(e) => setProjetoNotif(e.target.checked)}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="">
            <p className="m-0 fw-semibold">Emails de Marketing</p>
            <p className="m-0">Novidades e promoções</p>
          </div>
          <input
            className="border-dark-subtle form-check-input"
            type="checkbox"
            checked={marketingNotif}
            onChange={(e) => setMarketingNotif(e.target.checked)}
          />
        </div>
      </div>
      <button
        className="btn btn-primary col-12 mt-5 fw-semibold"
        onClick={salvarPreferencias}
      >
        Salvar Preferências
      </button>
    </div>
  );
};

export default Notificacoes;
