import { useState } from 'react'


function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Dados do formulário:", { email, senha });
  };

  return (
    <>
        <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="bg-white p-4 rounded-3 border border-black border-opacity-25 shadow"
          style={{ width: "400px" }}
        >
          <div className="text-start d-flex flex-column mb-4">
            <span className="text-black fs-2 fw-semibold">
              Entrar na sua conta
            </span>
            <span className="text-black-50 fs-6">
              Preencha os dados abaixo para entrar na sua conta
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label text-black fw-semibold"
              >
                Endereço de e-mail
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Digite seu e-mail"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="senha"
                className="form-label text-black fw-semibold"
              >
                Senha
              </label>
              <input
                type="password"
                id="senha"
                className="form-control"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                placeholder="Digite sua senha"
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg fw-semibold">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>

  );
}

export default App;
