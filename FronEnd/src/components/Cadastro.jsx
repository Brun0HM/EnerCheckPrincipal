import { useNavigate } from "react-router";
import "../App.css";

const Cadastro = () => {
  const navigate = useNavigate();

  return (
    <div className="row col-11 col-xl-3 p-4 fundo border border-2 rounded-4 shadow shadow-sm text-dark mb-">
      <div className="d-flex flex-column">
        <div className="d-flex flex-column text-start mb-1">
          <h5>Criar conta</h5>
          <p>Preencha os dados abaixo para criar sua conta</p>
        </div>
        <div className=" mb-3 gap-2 d-flex">
          <div className="">
            <h6>Nome</h6>
            <input
              className="w-100 form-control"
              placeholder="Nome"
              type="text"
            />
          </div>
          <div className="">
            <h6>Sobrenome</h6>
            <input
              className="w-100 form-control"
              placeholder="Sobrenome"
              type="text"
            />
          </div>
        </div>
        <div>
          <h6>Email</h6>
          <input
            className="w-100 form-control mb-3"
            placeholder="meu@email.com"
            type="email"
          />
          <h6>Empresa(opcional)</h6>
          <input
            className="w-100 form-control mb-3"
            placeholder="Sua empresa"
            type="text"
          />
          <h6>Senha</h6>
          <input
            className="w-100 form-control mb-3"
            placeholder="Senha"
            type="text"
          />
          <h6>Confirmar Senha </h6>
          <input
            className="w-100 form-control mb-3"
            placeholder="Senha "
            type="text"
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="termsCheck"
            required
          />
          <label className="form-check-label fw-semibold" htmlFor="termsCheck">
            Aceito os{" "}
            <a href="#" className="text-decoration-none">
              termos e condições
            </a>
          </label>
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="termsCheck"
            required
          />
          <label className="form-check-label fw-semibold" htmlFor="termsCheck">
            Quero receber atualizações sobre novos recursos e melhorias
          </label>
        </div>

        <span
          className="mb-1 text-primary"
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer" }}
        >
          Já tenho uma conta
        </span>
        <button className="btn btn-primary">Criar conta</button>
      </div>
    </div>
  );
};

export default Cadastro;
