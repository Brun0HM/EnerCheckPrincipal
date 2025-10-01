import React, { useEffect, useState } from "react";
import { InfoGeralContainer } from "../components/InfoGeralContainer";
import { ContainerChecagem } from "../components/ContainerChecagem";

const DashboardProjeto = () => {
  const [comentarioGeral, setComentarioGeral] = useState("");
  const [comentConform, setComentConform] = useState("");
  const [comentInstalacao, setComentInstalacao] = useState("");

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
      }}
    >
      <div className="d-flex flex-column container gap-2">
        <div className="my-3 d-flex flex-row p-3 gap-3">
          <InfoGeralContainer
            topico={"Pontuação Geral"}
            iconeTopico={"bi-rocket-takeoff"}
            corNumero={"primary"}
            pontuacaoGeral={pontuacaoGeral}
            comentario={comentarioGeral}
          />

          <InfoGeralContainer
            topico={"Pontuação de Conformidade"}
            iconeTopico={"bi-rocket-takeoff"}
            corNumero={"success"}
            pontuacaoGeral={pontuacaoConformidade}
            comentario={comentConform}
          />

          <InfoGeralContainer
            topico={"Pontuação de Instalação"}
            iconeTopico={"bi-rocket-takeoff"}
            corNumero={"danger"}
            pontuacaoGeral={pontuacaoInstalacao}
            comentario={comentInstalacao}
          />
        </div>

        <div className="px-3 d-flex flex-row gap-3 my-2">
          <ContainerChecagem
            categoria={"Topico 1"}
            descricao={"Descrição do topico 1"}
          />
          <ContainerChecagem
            categoria={"Topico 2"}
            descricao={"Descrição do topico 2"}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardProjeto;
