import React from "react";
import apiService from "../../services/api";
import { useEffect, useState, useRef } from "react";

const Teste = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Criar usuarios
  const inputEmail = useRef();
  const inputSenha = useRef();
  const inputNomeCompleto = useRef();
  const inputNumeroCrea = useRef();
  const inputEmpresa = useRef();

  //salva informação dos usuarios para login
  const inputLoginEmail = useRef();
  const inputLoginSenha = useRef();

  // função que busca os usuarios na api
  async function getUsers() {
    try {
      setLoading(true);
      const dados = await apiService.getUser();
      setUsers(dados);
    } catch (error) {
      setError(error);
      console.error("Erro ao buscar usuarios:", error);
    } finally {
      setLoading(false);
    }
  }

  // Função que cria usuarios na API
  async function handleCreateUser(event) {
    event.preventDefault();
    try {
      await apiService.createUser(
        inputEmail.current.value,
        inputSenha.current.value,
        inputNomeCompleto.current.value,
        inputNumeroCrea.current.value,
        inputEmpresa.current.value
      );
      getUsers(); // Atualiza a lista
      inputEmail.current.value = ""; // Limpa o campo
      inputSenha.current.value = ""; // Limpa o campo
      inputNomeCompleto.current.value = ""; // Limpa o campo
      inputNumeroCrea.current.value = ""; // Limpa o campo
      inputEmpresa.current.value = ""; // Limpa o campo
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  }

  // Função que deleta usuarios na API
  async function handleDeleteUser(id) {
    try {
      await apiService.deleteUser(id);
      getUsers(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  }

  

  // Chama a função getUsers assim que o componente é montado
  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <p className="text-white">Carregando...</p>;
  }

  if (error) {
    return <p className="text-white">Ocorreu um erro.</p>;
  }

  //LOGA NESSA POHA
  async function handleLogin(event) {
    event.preventDefault();
    try {
      await apiService.loginUser(
        inputLoginEmail.current.value,
        inputLoginSenha.current.value
      );
    } catch (error) {
      console.error("Erro ao logar usuário:", error);
    }
  }

  return (
    <div>
      <h1 className="text-white">Teste de API</h1>
      {users.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <ul className="text-white">
          {users.map((user) => (
            <li key={user.id} style={{ marginBottom: 12 }}>
              <div>{user.email}</div>
              <div>{user.nome}</div>
              <i
                className="bi bi-trash"
                onClick={() => handleDeleteUser(user.id)}
              ></i>
            </li>
          ))}
        </ul>
      )}
      <div className="container">
        <form>
          <h1>Novo usuario</h1>
          <input type="text" placeholder="Email" ref={inputEmail} />
          <input type="password" placeholder="Senha" ref={inputSenha} />
          <input
            type="text"
            placeholder="Nome Completo"
            ref={inputNomeCompleto}
          />
          <input type="text" placeholder="Numero Crea" ref={inputNumeroCrea} />
          <input type="text" placeholder="Empresa" ref={inputEmpresa} />
          <button onClick={handleCreateUser}>Criar Usuario</button>
        </form>
      </div>
      <div>
        <input type="text" ref={inputLoginEmail} placeholder="login email" />
        <input type="text" ref={inputLoginSenha} placeholder="login senha" />
        <button onClick={handleLogin}>logar na pqp</button>
      </div>
    </div>
  );
};

export default Teste;
