import React from "react";
import apiService from "../../services/api";
import { useEffect, useState, useRef } from "react";

const Teste = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [projetos, setProjetos] = useState([]);

  //Criar usuarios
  const inputEmail = useRef();
  const inputSenha = useRef();
  const inputNomeCompleto = useRef();
  const inputNumeroCrea = useRef();
  const inputEmpresa = useRef();
  const inputProjetoNome = useRef();
  const inputProjetoDescricao = useRef();
  const inputProjetoNomePut = useRef();
  const inputProjetoDescricaoPut = useRef();

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
    const token = localStorage.getItem("token");
    if (token) {
      handleGetProjeto();
      handleGetUserByToken();
    }
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
      // Após login bem-sucedido, buscar projetos
      await handleGetUserByToken();
      await handleGetProjeto();
    } catch (error) {
      console.error("Erro ao logar usuário:", error);
      throw error;
    }
  }

  // colocar o plano no usuario logado
  async function handlePutPlanos(event) {
    event.preventDefault();
    try {
      // Envie apenas o planoId como inteiro no corpo
      await apiService.putPlanos(3);
      getUsers(); // Atualiza a lista de usuários
    } catch (error) {
      console.error("Erro ao colocar plano no usuário:", error);
    }
  }

  // Função para obter o usuário logado pelo token
  async function handleGetUserByToken() {
    try {
      const user = await apiService.getUserByToken();
      setCurrentUser(user);
    } catch (error) {
      console.error("Erro ao obter usuário pelo token:", error);
    }
  }

  async function handleGetProjeto() {
    try {
      setLoading(true);
      const projeto = await apiService.getProjetos();
      setProjetos(projeto);
    } catch (error) {
      console.error("Erro ao obter projeto:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePostProjeto(event) {
    event.preventDefault();
    const nome = inputProjetoNome.current?.value || "";
    const descricao = inputProjetoDescricao.current?.value || "";

    // Depuração: verifique os valores no console
    console.log("Valores capturados - Nome:", nome, "Descrição:", descricao);

    if (!nome.trim() || !descricao.trim()) {
      console.error("Nome ou descrição estão vazios. Preencha os campos.");
      return;
    }

    try {
      await apiService.postProjetos(nome, descricao);
      handleGetProjeto();
      inputProjetoNome.current.value = ""; // Limpa após sucesso
      inputProjetoDescricao.current.value = "";
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    }
  }

  async function handleDeleteProjeto(id) {
    try {
      await apiService.deleteProjetos(id);
      handleGetProjeto(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao deletar projeto:", error);
    }
  }
  // falta fazer funcionar corretamente
  // async function handlePutProjeto(id, data) {
  //   try {
  //     await apiService.putProjetos(id, data);
  //     handleGetProjeto(); // Atualiza a lista
  //   } catch (error) {
  //     console.error("Erro ao atualizar projeto:", error);
  //   }
  // }

  return (
    <div>
      <h1 className="text-white">Teste de API</h1>
      {users.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <ul className="text-white">
          {users.map((user) => (
            <li key={user.id} style={{ marginBottom: 12 }}>
              <div>ID: {user.id}</div>
              <div>Email: {user.email}</div>
              <div>Nome: {user.nome}</div>
              <div>Número CREA: {user.numeroCrea}</div>
              <div>UseReq: {user.useReq}</div>
              <div>Empresa: {user.empresa}</div>
              <div>
                Plano:{" "}
                {user.plano
                  ? `${user.plano.nome} (ID: ${user.plano.planoId}, Preço: R$ ${user.plano.preco})`
                  : "Nenhum plano"}
              </div>
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

      <div>
        <h1 className="text-white">Teste do put plano</h1>
        <button onClick={handlePutPlanos}>poer o plano no cu do user</button>
      </div>

      <div>
        <h1 className="text-white">Teste do Usuário Logado</h1>
        {currentUser ? (
          <div className="text-white">
            <p>ID: {currentUser.id}</p>
            <p>Email: {currentUser.email}</p>
            <p>Nome: {currentUser.nomeCompleto}</p>
            <p>Número CREA: {currentUser.numeroCrea}</p>
            <p>Empresa: {currentUser.empresa}</p>
            <p>
              Plano: {currentUser.plano ? currentUser.plano.nome : "Nenhum"}
            </p>
          </div>
        ) : (
          <p className="text-white">Nenhum usuário logado ou erro ao obter.</p>
        )}
      </div>

      <div>
        <h1 className="text-white">teste das chamadas de projeto</h1>
        <div className="text-secondary">
          <h4>Get projetos</h4>
          {projetos.length === 0 ? (
            <p>Nenhum projeto encontrado.</p>
          ) : (
            <ul className="text-white">
              {projetos.map((projeto) => (
                <li key={projeto.id} style={{ marginBottom: 12 }}>
                  <div>ID: {projeto.projetoId}</div>
                  <div>Nome: {projeto.nome}</div>
                  <div>Descrição: {projeto.descricao}</div>
                  <div>Status: {projeto.status}</div>
                  <div>Análise: {projeto.analise}</div>
                  <div>
                    {" "}
                    <i
                      className="bi-trash"
                      onClick={() => handleDeleteProjeto(projeto.projetoId)}
                    >
                      Excluir
                    </i>
                  </div>
                  <div> </div>
                </li>
              ))}
            </ul>
          )}
          <h4>Post projetos</h4>
          <form onSubmit={handlePostProjeto}>
            {" "}
            <input
              type="text"
              placeholder="Nome do Projeto"
              ref={inputProjetoNome}
            />
            <input
              type="text"
              placeholder="Descrição do Projeto"
              ref={inputProjetoDescricao}
            />
            <button type="submit">Criar Projeto</button>{" "}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Teste;
