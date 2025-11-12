import React from "react";
import api from "../../services/api";
import { useEffect, useState, useRef } from "react";

const Teste = () => {
  const [users, setUsers] = useState([]);

  //Criar usuarios
  const inputEmail = useRef();
  const inputSenha = useRef();

  // função que busca os usuarios na api
  async function getUsers() {
    const usersFromApi = await api.get("/api/Usuarios");

    setUsers(usersFromApi.data);
  }
  // Função que cria usuarios na API
  async function createUsers(event) {
    event.preventDefault(); // Impede o recarregamento da página
    await api.post("/register", {
      email: inputEmail.current.value,
      password: inputSenha.current.value,
    });

    getUsers(); // Atualiza a lista de usuários após a criação
  }
  // Função que deleta usuarios na API
  async function deleteUser(id) {
    await api.delete(`/api/Usuarios/${id}`);
    getUsers(); // Atualiza a lista de usuários após a exclusão
  }

  // Chama a função getUsers assim que o componente é montado
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1 className="text-white">Teste de API</h1>
      {users.length === 0 ? (
        <p>Carregando ou nenhum usuário encontrado.</p>
      ) : (
        <ul className="text-white">
          {users.map((user, idx) => (
            <li key={user.id ?? user.Id ?? idx} style={{ marginBottom: 12 }}>
              <div>{user.email ?? "Email não disponível"}</div>
              <div>{user.userName ?? "senha indisponivel"}</div>
              <i
                className="bi bi-trash"
                onClick={() => deleteUser(user.id)}
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
          <button onClick={createUsers}>Criar Usuario</button>
        </form>
      </div>
    </div>
  );
};

export default Teste;
