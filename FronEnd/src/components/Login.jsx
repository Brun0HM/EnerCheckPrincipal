import "../App.css";

const Login = () => {
  return (
    <div className="row col-11 col-xl-3 p-4 fundo border border-2 rounded-4 shadow shadow-sm text-dark ">
      <div className="d-flex flex-column">
        <div className="d-flex flex-column text-start mb-1">
          <h5>Entrar</h5>
          <p>Digite suas credenciais para acessar sua conta</p>
        </div>
        <div className="mb-3">
          <h6>Email</h6>
          <input
            className="w-100 form-control"
            placeholder="seu@email.com"
            type="text"
          />
        </div>
        <div className="mb-1">
          <h6 className="text-dark">Senha</h6>
          <input
            className="w-100 form-control"
            placeholder="senha"
            type="text"
          />
        </div>
        <div className="d-flex justify-content-between mt-1">
          <div className="d-flex gap-1">
            <input className="form-check-input" type="checkbox" />
            <p className="fw-semibold">Lembrar de mim</p>
          </div>
          <a className="text-decoration-none" href="/cadastrar">
            Esqueceu a senha?
          </a>
        </div>
        <button className="btn btn-primary">Entrar</button>
      </div>
    </div>
  );
};

export default Login;
