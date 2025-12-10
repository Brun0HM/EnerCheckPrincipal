import React, { useEffect, useState } from "react";
import { InfoGeralContainer } from "../../components/Dashboard/InfoGeralContainer";
import { ContainerChecagem } from "../../components/Projects/ContainerChecagem";

const DashboardProjeto2 = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Dados pré-setados - Análise Elétrica NBR 5410
  const [dadosProjeto] = useState({
    nome: "Análise Elétrica NBR 5410 - Revisão Detalhada",
    dataAnalise: "09/12/2025",
    observacaoGeral:
      "Análise detalhada da planta única fornecida. O projeto original possui não conformidades críticas na quantificação de TUGs em áreas molhadas e na ausência de dispositivos DR. A avaliação reflete as Não Conformidades Críticas que *persistiriam* sem o Quadro de Cargas detalhado, mas atribui conformidade aos pontos que puderam ser verificados.",
    pontuacaoGeral: 41,
    categorias: [
      {
        nome: "Condutores e Circuitos",
        percentualConformidade: 75,
        conformidades: [
          "Separação de Circuitos: Circuitos de iluminação (C, D, E, F) e de tomadas (1, 2, 3, 4, 5, 6, 7) estão separados.",
          "Bitola Mínima TUGs: Condutor de 2,5 mm² está indicado na maioria dos trechos de tomadas, atendendo ao mínimo exigido pela NBR 5410.",
          "TUEs Identificados: Circuitos de alta potência (Chuveiro no Banheiro 5400 VA e possível TUE na Cozinha 2500 VA) estão identificados com bitolas maiores (6 mm² e 4 mm²), indicando a intenção de TUE.",
        ],
        naoConformidades: [
          "Bitola Iluminação: Não é visível o condutor para o trecho entre o interruptor e o ponto de luz em todos os casos (mínimo 1,5 mm²). Necessário confirmar no Quadro de Cargas.",
          "Dimensionamento de TUEs: O TUE da Cozinha (2500 VA / 4 mm²) e do Chuveiro (5400 VA / 6 mm²) precisam ter seus disjuntores e correntes verificados no Quadro de Cargas.",
          "Taxa de Ocupação: O diâmetro dos eletrodutos (25 mm) precisa ser verificado quanto à taxa de ocupação dos condutores, especialmente nos troncos.",
        ],
      },
      {
        nome: "Pontos de Utilização",
        percentualConformidade: 40,
        conformidades: [
          "Potência Mínima: A potência mínima de 100 VA (salas/quartos) e 600 VA (áreas molhadas) está sendo respeitada.",
          "Quantificação (Parcial): A Sala e o Quarto parecem ter quantidade de TUGs mínima satisfatória para seus perímetros.",
        ],
        naoConformidades: [
          "**Não Conformidade Crítica - Quantificação Cozinha:** A Cozinha apresenta apenas 2 TUGs (além de 1 TUE), abaixo do mínimo de 3 TUGs exigido para seu perímetro pela NBR 5410.",
          "**Não Conformidade Crítica - Quantificação Lavanderia:** A Lavanderia/Área de Serviço apresenta apenas 1 TUG, abaixo do mínimo de 2 TUGs exigido.",
          "Altura das Tomadas: A altura de instalação (baixa, média, alta) não está especificada, mas é comum o padrão baixo (30 cm) quando ausente a informação.",
        ],
      },
      {
        nome: "Proteção e Segurança",
        percentualConformidade: 20,
        conformidades: [
          "Condutor Terra (Geral): A planta indica um condutor de proteção de grande bitola (50 mm²) na alimentação principal.",
        ],
        naoConformidades: [
          "Disjuntores: Ausente o Quadro de Cargas. Não é possível verificar o dimensionamento de disjuntores para proteção contra sobrecarga/curto-circuito.",
          "**Não Conformidade Crítica - Dispositivos DR:** Não há indicação de Dispositivos DR (Diferencial Residual), obrigatórios para áreas molhadas (Banheiro, Cozinha, Lavanderia) e para o circuito do chuveiro.",
          "Continuidade do Terra: É crucial confirmar no QD/Detalhe que o condutor de proteção está presente e conectado a todos os pontos de utilização (tomadas e TUEs).",
          "Dispositivos DPS: Ausente a indicação de Dispositivos de Proteção contra Surtos (DPS), altamente recomendado pela NBR 5410.",
        ],
      },
      {
        nome: "Simbologia e Documentação",
        percentualConformidade: 30,
        conformidades: [
          "Símbolos Básicos: Símbolos de luz, interruptores e tomadas são facilmente identificáveis.",
        ],
        naoConformidades: [
          "**Não Conformidade Crítica - Quadro de Cargas:** Ausente o Quadro de Cargas (QD), impedindo a verificação de demanda, disjuntores e balanceamento de fases.",
          "Legenda Completa: Ausência de uma legenda clara para todos os elementos, especialmente para a codificação de circuitos nos condutores.",
          "Detalhamento: Ausentes notas técnicas sobre o tipo de aterramento ou detalhes de caixas de passagem.",
        ],
      },
    ],
  });

  const [comentarioGeral, setComentarioGeral] = useState("");

  const trocarComentario = (pontuacao) => {
    if (pontuacao <= 20) return "Erros críticos a serem revisados";
    if (pontuacao <= 50) return "Razoável, ajustes necessários";
    if (pontuacao >= 70 && pontuacao < 90)
      return "Conformidade padrão, há pontos a melhorar";
    if (pontuacao >= 90) return "Excelente conformidade";
    return "Aguardando análise";
  };

  const getCorPontuacao = (pontuacao) => {
    if (pontuacao <= 30) return "danger";
    if (pontuacao <= 60) return "warning";
    return "success";
  };

  useEffect(() => {
    setComentarioGeral(trocarComentario(dadosProjeto.pontuacaoGeral));
  }, [dadosProjeto]);

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
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        >
          <div className="spinner-grow text-primary fs-3"></div>
        </div>
      ) : (
        <div className="container-fluid px-3 px-md-4">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-10">
              {/* Cabeçalho da página */}
              <div className="text-start mb-4">
                <h1 className="fw-bold mb-2" style={{ color: "var(--text)" }}>
                  {dadosProjeto.nome}
                </h1>
                <p
                  className="fs-5 mb-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Data da Análise: {dadosProjeto.dataAnalise}
                </p>
                <div
                  className="alert alert-warning border-0 rounded-4"
                  style={{
                    backgroundColor: "rgba(255, 193, 7, 0.1)",
                    borderLeft: "4px solid #ffc107",
                  }}
                >
                  <p className="mb-0" style={{ color: "var(--text)" }}>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    <strong>Observação Geral:</strong>{" "}
                    {dadosProjeto.observacaoGeral}
                  </p>
                </div>
              </div>

              {/* Seção de pontuações - Layout responsivo */}
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-4">
                  <InfoGeralContainer
                    topico={"Pontuação Geral"}
                    iconeTopico={"bi-speedometer2"}
                    corNumero={getCorPontuacao(dadosProjeto.pontuacaoGeral)}
                    pontuacaoGeral={dadosProjeto.pontuacaoGeral}
                    comentario={comentarioGeral}
                  />
                </div>

                {dadosProjeto.categorias.slice(0, 2).map((categoria, index) => (
                  <div className="col-12 col-md-4" key={index}>
                    <InfoGeralContainer
                      topico={categoria.nome}
                      iconeTopico={
                        index === 0 ? "bi-lightning-charge" : "bi-plug"
                      }
                      corNumero={getCorPontuacao(
                        categoria.percentualConformidade
                      )}
                      pontuacaoGeral={categoria.percentualConformidade}
                      comentario={trocarComentario(
                        categoria.percentualConformidade
                      )}
                    />
                  </div>
                ))}
              </div>

              {/* Seção de análise detalhada */}
              <div className="row g-4">
                {dadosProjeto.categorias.map((categoria, index) => (
                  <div className="col-12 col-lg-6" key={index}>
                    <div
                      className="p-4 rounded-4 border h-100"
                      style={{
                        backgroundColor: "var(--card-bg)",
                        borderColor: "var(--card-border)",
                      }}
                    >
                      <div className="d-flex align-items-center mb-3">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: `rgba(var(--bs-${getCorPontuacao(
                              categoria.percentualConformidade
                            )}-rgb), 0.1)`,
                          }}
                        >
                          <span
                            className={`fs-4 text-${getCorPontuacao(
                              categoria.percentualConformidade
                            )}`}
                          >
                            {categoria.percentualConformidade}%
                          </span>
                        </div>
                        <div>
                          <h5
                            className="mb-0 fw-bold"
                            style={{ color: "var(--text)" }}
                          >
                            {categoria.nome}
                          </h5>
                          <small style={{ color: "var(--text-secondary)" }}>
                            {trocarComentario(categoria.percentualConformidade)}
                          </small>
                        </div>
                      </div>

                      {/* Conformidades */}
                      {categoria.conformidades &&
                        categoria.conformidades.length > 0 && (
                          <div className="mb-3">
                            <h6
                              className="fw-semibold mb-2"
                              style={{ color: "var(--success)" }}
                            >
                              <i className="bi bi-check-circle-fill me-2"></i>
                              Conformidades
                            </h6>
                            <ul className="list-unstyled ms-3">
                              {categoria.conformidades.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="mb-2"
                                  style={{ color: "var(--text-secondary)" }}
                                >
                                  <i className="bi bi-check2 text-success me-2"></i>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      {/* Não Conformidades */}
                      {categoria.naoConformidades &&
                        categoria.naoConformidades.length > 0 && (
                          <div>
                            <h6
                              className="fw-semibold mb-2"
                              style={{ color: "var(--danger)" }}
                            >
                              <i className="bi bi-x-circle-fill me-2"></i>
                              Não Conformidades
                            </h6>
                            <ul className="list-unstyled ms-3">
                              {categoria.naoConformidades.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="mb-2"
                                  style={{ color: "var(--text-secondary)" }}
                                >
                                  <i className="bi bi-exclamation-triangle text-danger me-2"></i>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                ))}
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
                    <h5
                      className="fw-bold mb-3"
                      style={{ color: "var(--text)" }}
                    >
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
      )}
    </div>
  );
};

export default DashboardProjeto2;
