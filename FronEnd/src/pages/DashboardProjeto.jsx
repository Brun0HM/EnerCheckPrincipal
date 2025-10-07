import React, { useEffect, useState } from "react";
import { InfoGeralContainer } from "../components/InfoGeralContainer";
import { ContainerChecagem } from "../components/ContainerChecagem";

/**
 * Dashboard de Projeto - Tela de análise detalhada de projeto elétrico
 *
 * Exibe pontuações, análises de conformidade e checagem de circuitos.
 * Design centralizado e responsivo com suporte completo a temas.
 */
const DashboardProjeto = () => {
  const [comentarioGeral, setComentarioGeral] = useState("");
  const [comentConform, setComentConform] = useState("");
  const [comentInstalacao, setComentInstalacao] = useState("");

  // Pontuações dos diferentes aspectos do projeto
  const pontuacaoGeral = 10;
  const pontuacaoConformidade = 90;
  const pontuacaoInstalacao = 50;

  const trocarComentario = () => {
    if (pontuacaoGeral <= 50) {
      setComentarioGeral("Razoável, ajustes necessários");
    }
    if (pontuacaoGeral >= 70) {
      setComentarioGeral("Conformidade padrão, há pontos a melhorar");
    }
    if (pontuacaoGeral >= 90) {
      setComentarioGeral("Excelente conformidade");
    }
    if (pontuacaoGeral <= 20) {
      setComentarioGeral("Erros críticos a serem revisados");
    }
  };

  const trocarComentInst = () => {
    if (pontuacaoInstalacao <= 50) {
      setComentInstalacao("Razoável, ajustes necessários");
    }
    if (pontuacaoInstalacao >= 70) {
      setComentInstalacao("Conformidade padrão, há pontos a melhorar");
    }
    if (pontuacaoInstalacao >= 90) {
      setComentInstalacao("Excelente conformidade");
    }
    if (pontuacaoInstalacao <= 30) {
      setComentInstalacao("Erros críticos a serem revisados");
    }
  };

  const trocarComentConform = () => {
    if (pontuacaoConformidade <= 50) {
      setComentConform("Razoável, ajustes necessários");
    }
    if (pontuacaoConformidade >= 70) {
      setComentConform("Conformidade padrão, há pontos a melhorar");
    }
    if (pontuacaoConformidade >= 90) {
      setComentConform("Excelente conformidade");
    }
    if (pontuacaoConformidade <= 20) {
      setComentConform("Erros críticos a serem revisados");
    }
  };

  useEffect(() => {
    trocarComentario();
  }, [pontuacaoGeral]);

  useEffect(() => {
    trocarComentConform();
  }, [pontuacaoConformidade]);

  useEffect(() => {
    trocarComentInst();
  }, [pontuacaoInstalacao]);

  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        paddingTop: "6rem",
        paddingBottom: "2rem",
      }}
    >
      {/* Container principal centralizado e responsivo */}
      <div className="container-fluid px-3 px-md-4">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-10">
            {/* Cabeçalho da página */}
            <div className="text-center mb-4">
              <h1 className="fw-bold mb-2" style={{ color: "var(--text)" }}>
                Dashboard do Projeto
              </h1>
              <p
                className="fs-5 mb-0"
                style={{ color: "var(--text-secondary)" }}
              >
                Análise detalhada de conformidade e instalação elétrica
              </p>
            </div>

            {/* Seção de pontuações - Layout responsivo */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-4">
                <InfoGeralContainer
                  topico={"Pontuação Geral"}
                  iconeTopico={"bi-speedometer2"}
                  corNumero={"danger"}
                  pontuacaoGeral={pontuacaoGeral}
                  comentario={comentarioGeral}
                />
              </div>
              <div className="col-12 col-md-4">
                <InfoGeralContainer
                  topico={"Conformidade NBR"}
                  iconeTopico={"bi-shield-check"}
                  corNumero={"success"}
                  pontuacaoGeral={pontuacaoConformidade}
                  comentario={comentConform}
                />
              </div>
              <div className="col-12 col-md-4">
                <InfoGeralContainer
                  topico={"Instalação"}
                  iconeTopico={"bi-tools"}
                  corNumero={"warning"}
                  pontuacaoGeral={pontuacaoInstalacao}
                  comentario={comentInstalacao}
                />
              </div>
            </div>

            {/* Seção de análise detalhada */}
            <div className="row g-4">
              <div className="col-12 col-lg-6">
                <ContainerChecagem
                  categoria={"Circuitos de Força"}
                  descricao={"Análise dos circuitos de força e dimensionamento"}
                />
              </div>
              <div className="col-12 col-lg-6">
                <ContainerChecagem
                  categoria={"Proteção e Segurança"}
                  descricao={
                    "Verificação de dispositivos de proteção (DR, disjuntores)"
                  }
                />
              </div>
            </div>

            {/* Card de ações rápidas */}
            <div className="row justify-content-center mt-4">
              <div className="col-12 col-md-8 col-lg-6">
                <div
                  className="p-4 rounded-4 border text-center theme-card"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--card-border)",
                  }}
                >
                  <h5 className="fw-bold mb-3" style={{ color: "var(--text)" }}>
                    Ações Disponíveis
                  </h5>
                  <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                    <button
                      className="btn btn-lg"
                      style={{
                        backgroundColor: "var(--primary)",
                        borderColor: "var(--primary)",
                        color: "#ffffff",
                      }}
                    >
                      <i className="bi bi-download me-2"></i>
                      Baixar Relatório
                    </button>
                    <button
                      className="btn btn-outline btn-lg"
                      style={{
                        borderColor: "var(--primary)",
                        color: "var(--primary)",
                      }}
                    >
                      <i className="bi bi-arrow-repeat me-2"></i>
                      Reprocessar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProjeto;
