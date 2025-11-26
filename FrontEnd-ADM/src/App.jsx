import { useState } from "react";
import { useNavigate } from "react-router";
import Editar from "./components/Editar";
import loginUser from "./apis/usuarios";

function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState({});
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "O e-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Digite um e-mail válido";
    }

    if (!senha.trim()) {
      newErrors.senha = "A senha é obrigatória";
    } else if (senha.length < 6) {
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setCarregando(true);
    
    if (validateForm()) {

      console.log("Dados do formulário:", { email, senha });

      try {
      loginUser(email, senha)
      setEmail("");
      setSenha("");

      alert("Usuário logado com sucesso.")
      navigate("/users");
      console.log("Token de login: " + localStorage.getItem("Token"))

      } catch (error) {
        console.log("Erro ao logar: ", error)
        
      } finally {
        setCarregando(false);
      }
    }
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
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
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
                  className={`form-control ${errors.senha ? "is-invalid" : ""}`}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                />
                {errors.senha && (
                  <div className="invalid-feedback">{errors.senha}</div>
                )}
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className={`btn btn-primary btn-lg fw-semibold ${carregando && "disabled"}`}
                  disabled={carregando}
                >
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
