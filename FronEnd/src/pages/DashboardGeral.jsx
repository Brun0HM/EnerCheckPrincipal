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
      }}
    >
      <div className="container mt-5">
        <div className="align-align-items-start justify-content-start">
          <h1 className="fw-bolder">Dashboard</h1>
          <h5 className="fw-normal text-secondary">
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
        <div className="p-3 rounded-4 border bg-white shadow mb-4">
          <div>
            <h4 className="fw-bold text-black ">Projetos Recentes</h4>
            <p className="text-secondary">Seus últimos projetos verificados</p>
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
          <div className="flex-fill">
            <div className="p-3 rounded-4 border bg-white shadow h-100">
              <h4 className="fw-bold text-black">Novo Projeto</h4>
              <p className="text-secondary">
                Faça upload de um novo projeto para verificação
              </p>
              <button className="btn btn-primary fw-semibold rounded-3 w-100">
                Fazer Upload
              </button>
            </div>
          </div>

          <div className="flex-fill">
            <div className="p-3 rounded-4 border bg-white shadow h-100">
              <h4 className="fw-bold text-black">Relatórios</h4>
              <p className="text-secondary">
                Visualize relatórios detalhados de conformidade
              </p>
              <button className="btn btn-outline-primary fw-semibold rounded-3 w-100">
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
