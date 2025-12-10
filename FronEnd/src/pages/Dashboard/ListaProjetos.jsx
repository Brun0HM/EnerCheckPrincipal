import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import projetosService from "../../../services/projetos";

const ListaProjetos = () => {
  const navigate = useNavigate();
  const [projetos, setProjetos] = useState([]);
  const [projetosFiltrados, setProjetosFiltrados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("todos");

  // Função para obter projetos da API
  async function getProjeto() {
    try {
      setLoading(true);
      const projeto = await projetosService.getProjetos();
      setProjetos(projeto);
      setProjetosFiltrados(projeto);
    } catch (error) {
      console.error("Erro ao obter projeto:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProjeto();
  }, []);

  // Função para filtrar projetos
  useEffect(() => {
    let resultados = projetos;

    // Filtro por termo de busca
    if (searchTerm) {
      resultados = resultados.filter(
        (projeto) =>
          projeto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          projeto.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por status
    if (statusFilter !== "todos") {
      resultados = resultados.filter(
        (projeto) => projeto.status === statusFilter
      );
    }

    setProjetosFiltrados(resultados);
  }, [searchTerm, statusFilter, projetos]);

  /**
   * Define a cor do badge baseada no status
   * Adapta as cores para funcionarem em ambos os temas
   */
  const getBadgeStyle = (status) => {
    const baseStyle = {
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      display: "inline-block",
    };

    switch (status) {
      case "aprovado":
      case "concluído":
        return {
          ...baseStyle,
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          color: "#16a34a",
          border: "1px solid rgba(34, 197, 94, 0.3)",
        };
      case "pendente":
      case "em análise":
        return {
          ...baseStyle,
          backgroundColor: "rgba(251, 191, 36, 0.2)",
          color: "#d97706",
          border: "1px solid rgba(251, 191, 36, 0.3)",
        };
      case "rejeitado":
        return {
          ...baseStyle,
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          color: "#dc2626",
          border: "1px solid rgba(239, 68, 68, 0.3)",
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: "var(--card-border)",
          color: "var(--text-secondary)",
          border: "1px solid var(--card-border)",
        };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const handleProjetoClick = (projetoId) => {
    navigate(`/dashboardProjeto/${projetoId}`);
  };

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
        {/* Cabeçalho */}
        <div className="mb-4">
          <h1 className="fw-bolder" style={{ color: "var(--text)" }}>
            Meus Projetos
          </h1>
          <p className="fw-normal" style={{ color: "var(--text-secondary)" }}>
            Visualize e gerencie todos os seus projetos cadastrados
          </p>
        </div>

        {/* Barra de Busca e Filtros */}
        <div
          className="p-4 rounded-4 border shadow mb-4 theme-card"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--card-border)",
          }}
        >
          <div className="row g-3">
            {/* Campo de Busca */}
            <div className="col-12 col-lg-8">
              <div className="position-relative">
                <i
                  className="bi bi-search position-absolute"
                  style={{
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-secondary)",
                    fontSize: "1.2rem",
                  }}
                ></i>
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Buscar por nome ou descrição do projeto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    backgroundColor: "var(--input-bg)",
                    borderColor: "var(--input-border)",
                    color: "var(--text)",
                    padding: "0.75rem 1rem 0.75rem 3rem",
                    borderRadius: "0.5rem",
                  }}
                />
              </div>
            </div>

            {/* Filtro de Status */}
            <div className="col-12 col-lg-4">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  backgroundColor: "var(--input-bg)",
                  borderColor: "var(--input-border)",
                  color: "var(--text)",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                }}
              >
                <option value="todos">Todos os Status</option>
                <option value="aprovado">Aprovados</option>
                <option value="pendente">Pendentes</option>
                <option value="em análise">Em Análise</option>
                <option value="rejeitado">Rejeitados</option>
              </select>
            </div>
          </div>

          {/* Contador de Resultados */}
          <div className="mt-3">
            <small style={{ color: "var(--text-secondary)" }}>
              {projetosFiltrados.length}{" "}
              {projetosFiltrados.length === 1
                ? "projeto encontrado"
                : "projetos encontrados"}
            </small>
          </div>
        </div>

        {/* Lista de Projetos */}
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border"
              style={{ color: "var(--primary)" }}
              role="status"
            >
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
              Carregando projetos...
            </p>
          </div>
        ) : projetosFiltrados.length === 0 ? (
          <div
            className="p-5 rounded-4 border shadow text-center theme-card"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--card-border)",
            }}
          >
            <i
              className="bi bi-folder2-open"
              style={{
                fontSize: "4rem",
                color: "var(--text-secondary)",
                opacity: 0.5,
              }}
            ></i>
            <h4 className="mt-3 fw-bold" style={{ color: "var(--text)" }}>
              Nenhum projeto encontrado
            </h4>
            <p style={{ color: "var(--text-secondary)" }}>
              {searchTerm || statusFilter !== "todos"
                ? "Tente ajustar os filtros de busca"
                : "Comece criando seu primeiro projeto"}
            </p>
            {!searchTerm && statusFilter === "todos" && (
              <button
                className="btn btn-primary mt-3 px-4 py-2"
                onClick={() => navigate("/dashboard/upload")}
                style={{
                  backgroundColor: "var(--button-primary-bg)",
                  borderColor: "var(--button-primary-bg)",
                }}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Novo Projeto
              </button>
            )}
          </div>
        ) : (
          <div className="row g-3">
            {projetosFiltrados.map((projeto) => (
              <div key={projeto.projetoId} className="col-12 col-md-6 col-lg-4">
                <div
                  className="p-4 rounded-4 border shadow h-100 theme-card"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--card-border)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => handleProjetoClick(projeto.projetoId)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  {/* Cabeçalho do Card */}
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="flex-grow-1">
                      <h5
                        className="fw-bold mb-2"
                        style={{
                          color: "var(--text)",
                          fontSize: "1.1rem",
                          lineHeight: "1.4",
                        }}
                      >
                        {projeto.nome}
                      </h5>
                      <span style={getBadgeStyle(projeto.status)}>
                        {projeto.status || "pendente"}
                      </span>
                    </div>
                  </div>

                  {/* Descrição */}
                  {projeto.descricao && (
                    <p
                      className="mb-3"
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.9rem",
                        lineHeight: "1.5",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {projeto.descricao}
                    </p>
                  )}

                  {/* Informações do Projeto */}
                  <div className="mt-auto">
                    <div
                      className="d-flex align-items-center mb-2"
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.85rem",
                      }}
                    >
                      <i className="bi bi-calendar3 me-2"></i>
                      <span>Criado em: {formatDate(projeto.dataInicio)}</span>
                    </div>

                    {projeto.dataFim && (
                      <div
                        className="d-flex align-items-center mb-2"
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.85rem",
                        }}
                      >
                        <i className="bi bi-check-circle me-2"></i>
                        <span>
                          Finalizado em: {formatDate(projeto.dataFim)}
                        </span>
                      </div>
                    )}

                    {/* Botão de Ação */}
                    <button
                      className="btn btn-sm w-100 mt-3"
                      style={{
                        backgroundColor: "var(--primary)",
                        borderColor: "var(--primary)",
                        color: "#fff",
                        padding: "0.5rem",
                        borderRadius: "0.5rem",
                        fontWeight: "500",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjetoClick(projeto.projetoId);
                      }}
                    >
                      Ver Detalhes
                      <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaProjetos;
