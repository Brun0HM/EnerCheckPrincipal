import React from "react";
const Depoimentos = (props) => {
  return (
    <div>
      <div className="">
        {/* Card principal com tema aplicado */}
        <div
          className="card h-100 p-3 pt-4 pe-4 rounded-4 border-1 shadow theme-card"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--card-border)",
            color: "var(--text)",
            transition: "all 0.3s ease",
          }}
        >
          <div className="card-body d-flex flex-column">
            {/* Avaliação em estrelas */}
            <div className="d-flex mt-2 mb-3">
              {/* Estrelas com cor primária do tema */}
              <i
                className="bi bi-star-fill fs-5"
                style={{ color: "var(--primary)" }}
              ></i>
              <i
                className="bi bi-star-fill fs-5 ms-1"
                style={{ color: "var(--primary)" }}
              ></i>
              <i
                className="bi bi-star-fill fs-5 ms-1"
                style={{ color: "var(--primary)" }}
              ></i>
              <i
                className="bi bi-star-fill fs-5 ms-1"
                style={{ color: "var(--primary)" }}
              ></i>
              <i
                className="bi bi-star-fill fs-5 ms-1"
                style={{ color: "var(--primary)" }}
              ></i>
            </div>

            {/* Texto do depoimento */}
            <p
              className="card-text flex-grow-1 text-start mt-1 mb-4"
              style={{
                color: "var(--text)",
                lineHeight: "1.6",
                fontSize: "1rem",
              }}
            >
              "{props.depoimento}"
            </p>

            {/* Seção do usuário - foto, nome e profissão */}
            <div className="d-flex align-items-center mt-auto">
              {/* Container da foto com borda temática */}
              <div
                className="rounded-circle overflow-hidden"
                style={{
                  width: "50px",
                  height: "50px",
                  border: "2px solid var(--card-border)",
                  backgroundColor: "var(--input-bg)", // Fundo caso a imagem não carregue
                }}
              >
                <img
                  src={props.foto}
                  alt={props.user}
                  className="w-100 h-100 object-fit-cover"
                  style={{
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    // Fallback caso a imagem não carregue
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Ícone de fallback */}
                <div
                  className="w-100 h-100 d-none align-items-center justify-content-center"
                  style={{
                    backgroundColor: "var(--input-bg)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <i className="bi bi-person-circle fs-4"></i>
                </div>
              </div>

              {/* Informações do usuário */}
              <div className="ms-3 text-start d-flex flex-column justify-content-center">
                {/* Nome do usuário */}
                <span
                  className="card-title fs-5 fw-bold"
                  style={{ color: "var(--text)", marginBottom: "-5px" }}
                >
                  {props.user}
                </span>
                {/* Profissão */}
                <span
                  className="fs-6"
                  style={{
                    color: "var(--text-secondary)",
                    fontWeight: "500",
                  }}
                >
                  {props.profissa}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Depoimentos;
