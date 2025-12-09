import api from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Buscar todos os usuários
const getAllUsuarios = async () => {
  try {
    console.log('Buscando todos os usuários...');
    
    const response = await api.get('/api/Usuarios');
    const listaCompleta = response.data;
    
    // Mapeia a lista para retornar formato simplificado
    const listaSimples = listaCompleta.map((user) => ({
      id: user.id,
      nome: user.nomeCompleto,
      email: user.email,
      numeroCrea: user.numeroCrea,
      useReq: user.useReq,
      empresa: user.empresa,
      plano: user.plano,
    }));
    
    console.log('Usuários carregados:', listaSimples.length);
    return listaSimples;
    
  } catch (error) {
    console.error('Erro ao buscar usuários:', error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

// Buscar usuário autenticado pelo token
const getUserByToken = async () => {
  try {
    console.log('Buscando usuário autenticado...');
    

    const response = await api.get('/api/Usuarios/me');
    
    console.log('Usuário obtido com sucesso:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Erro ao obter usuário pelo token:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status, 'Dados:', error.response.data);
    }
    return null;
  }
};

// Criar novo cliente
const createCliente = async (userData) => {
  try {
    console.log('Criando cliente:', userData.email);
    
    const response = await api.post('/api/Usuarios/Cliente', userData);
    
    console.log('Cliente criado:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Erro ao criar cliente:', error?.response?.data || error);
    throw error?.response?.data || error;
  }
};

// Atualizar dados do usuário
const updateUsuario = async (id, data) => {
  try {
    console.log('Atualizando usuário ID:', id);
    
    const payload = { usuarios: data };
    const response = await api.put(`/api/Usuarios/${id}`, payload);
    
    console.log('Usuário atualizado:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    if (error.response) {
      console.error('Status:', error.response.status, 'Dados:', error.response.data);
    }
    throw error?.response?.data || error;
  }
};

// Atualizar dados do usuário autenticado (PUT /api/Usuarios/me)
const updateUsuarioMe = async (data) => {
  try {
    console.log('💾 Atualizando dados do usuário autenticado...');
    console.log('📦 Dados enviados:', data);
    
    // O endpoint espera: { email, nomeCompleto, numeroCrea, empresa }
    const response = await api.put('/api/Usuarios/me', data);
    
    console.log('✅ Usuário atualizado com sucesso:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Erro ao atualizar usuário autenticado:', error);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Dados do erro:', error.response.data);
    }
    throw error?.response?.data || error;
  }
};


// Vincular plano ao usuário (compatibilidade com putPlanos do código de referência)
const vincularPlano = async (planoId) => {
  try {
    console.log('Vinculando plano ao usuário:', planoId);
    
    // Token é adicionado automaticamente pelo interceptor
    // O backend espera apenas o número do planoId no body (não um objeto)
    const response = await api.put('/api/Usuarios/add/plano', planoId, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Plano vinculado com sucesso:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('Erro ao vincular plano:', error?.response?.data || error);
    throw error?.response?.data || error;
  }
}

// Exportar funções
export const usuariosAPI = {
  getAllUsuarios,
  getUserByToken,
  createCliente,
  updateUsuario,
    updateUsuarioMe,
  vincularPlano,
};

export default usuariosAPI;