import React from "react";
import { CardStatusProjetoDashboard } from "../components/CardStatusProjetoDashboard";
import { ProjetosRecentes } from "../components/ProjetosRecentes";
const DashboardGeral = () => {
  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        paddingTop: "3rem",
        paddingBottom: "2rem",
      }}
    >
      <div className="container mt-5">
        {/* Cabeçalho da página */}
        <div className="align-align-items-start justify-content-start">
          <h1 className="fw-bolder" style={{ color: "var(--text)" }}>
            Dashboard
          </h1>
          <h5 className="fw-normal" style={{ color: "var(--text-secondary)" }}>
            Gerencie seus projetos elétricos e verificações de conformidade
          </h5>
        </div>

        <div className="d-flex flex-column flex-md-row my-4 gap-2">
          <div className="d-flex flex-fill gap-2 ">
            <CardStatusProjetoDashboard
              status={"Projetos Totais"}
              iconeStatus={"bi bi-file-earmark-text"}
              num={"24"}
              desc={"+2 desde o último mês"}
            />

            <CardStatusProjetoDashboard
              status={"Aprovados"}
              iconeStatus={"bi bi-check2-circle"}
              num={"18"}
              desc={"75% de aprovação"}
            />
          </div>
          <div className="d-flex flex-fill gap-2 ">
            <CardStatusProjetoDashboard
              status={"Pendentes"}
              iconeStatus={"bi bi-exclamation-triangle"}
              num={"6"}
              desc={"Aguardando revisão"}
            />

            <CardStatusProjetoDashboard
              status={"Economia"}
              iconeStatus={"bi bi-graph-up"}
              num={"R$ 12.5k"}
              desc={"Em custos evitados"}
            />
          </div>
        </div>

        {/* Projetos Recentes */}
        <div
          className="p-3 rounded-4 border shadow mb-4 theme-card"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--card-border)",
            color: "var(--text)",
          }}
        >
          <div>
            <h4 className="fw-bold" style={{ color: "var(--text)" }}>
              Projetos Recentes
            </h4>
            <p style={{ color: "var(--text-secondary)" }}>
              Seus últimos projetos verificados
            </p>
          </div>

          {/* Projetos */}
          <ProjetosRecentes
            nomeProjeto={"Residencial Vila Belmiro"}
            tempoProjeto={"2 dias atrás"}
            statusProjeto={"Aprovado"}
          />

          <ProjetosRecentes
            nomeProjeto={"Centro Comercial"}
            tempoProjeto={"5 dias atrás"}
            statusProjeto={"Aprovado"}
          />

          <ProjetosRecentes
            nomeProjeto={"SENAI 721"}
            tempoProjeto={"1 semana atrás"}
            statusProjeto={"Aprovado"}
          />
        </div>

        <div className="d-flex flex-column flex-lg-row gap-3">
          {/* Card Novo Projeto */}
          <div className="flex-fill">
            <div
              className="p-3 rounded-4 border shadow h-100 theme-card"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--card-border)",
                color: "var(--text)",
              }}
            >
              <h4 className="fw-bold" style={{ color: "var(--text)" }}>
                Novo Projeto
              </h4>
              <p style={{ color: "var(--text-secondary)" }}>
                Faça upload de um novo projeto para verificação
              </p>
              <button
                className="btn fw-semibold rounded-3 w-100"
                style={{
                  backgroundColor: "var(--primary)",
                  borderColor: "var(--primary)",
                  color: "#ffffff",
                }}
              >
                Fazer Upload
              </button>
            </div>
          </div>

          {/* Card Relatórios */}
          <div className="flex-fill">
            <div
              className="p-3 rounded-4 border shadow h-100 theme-card"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--card-border)",
                color: "var(--text)",
              }}
            >
              <h4 className="fw-bold" style={{ color: "var(--text)" }}>
                Relatórios
              </h4>
              <p style={{ color: "var(--text-secondary)" }}>
                Visualize relatórios detalhados de conformidade
              </p>
              <button
                className="btn btn-outline fw-semibold rounded-3 w-100"
                style={{
                  borderColor: "var(--primary)",
                  color: "var(--primary)",
                  backgroundColor: "transparent",
                }}
              >
                Ver Relatórios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGeral;
