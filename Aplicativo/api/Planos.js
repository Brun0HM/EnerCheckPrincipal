import api from "../services/api";

export const planosAPI = {
    getAllPlanos: async (token) => {
        try {
          const response = await api.get('/api/Planos', {
            headers: { Authorization: `Bearer ${token}` }
          });
          return response.data;
        } catch (error) {
          console.error('Erro ao buscar planos:', error);
          throw error.response?.data || error;
        }
      },
      getPlanoById: async (token, id) => {
        try {
            const response = await api.get(`/api/Planos/${id}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
          console.error('Erro ao buscar plano:', error);
          throw error.response?.data || error;
        }
      },
      incrementarUsuarios: async (planoId, token) => {
        try {
          console.log(`Incrementando usuários do plano ${planoId}...`);
          
          // 1. Buscar dados atuais do plano
          const planoAtual = await planosAPI.getPlanoById(null, planoId); // sem token para GET
          console.log('Plano atual:', planoAtual);
          
          // 2. Incrementar QuantidadeUsers
          const planoAtualizado = {
            planoId: planoAtual.planoId, // Inclui o ID (obrigatório para PUT)
            nome: planoAtual.nome,
            preco: planoAtual.preco,
            quantidadeReq: planoAtual.quantidadeReq,
            ativo: planoAtual.ativo,
            quantidadeUsers: (planoAtual.quantidadeUsers || 0) + 1 //Incrementa
          };
          
          console.log('Plano com usuários incrementados:', planoAtualizado);
          
          // 3. Tentar atualizar no servidor via PUT
          if (token) {
            try {
              console.log('Usando token para atualizar no servidor...');
              const response = await api.put(`/api/Planos/${planoId}`, planoAtualizado, {
                headers: { Authorization: `Bearer ${token}` }
              });
              console.log('Plano atualizado no servidor:', response.data);
              return planoAtualizado; //Retorna dados atualizados
            } catch (updateError) {
              console.error('Erro ao atualizar no servidor:', updateError);
              console.error('Status:', updateError.response?.status);
              console.error('Data:', updateError.response?.data);
              
              // Retorna dados locais mesmo se PUT falhar
              return planoAtualizado;
            }
          } else {
            // 4. Sem token: apenas simulação local
            console.log('Sem token - simulando incremento local');
            return planoAtualizado; 
          }
          
        } catch (error) {
          console.error('Erro ao incrementar usuários:', error);
          console.error('Status:', error.response?.status);
          console.error('Data:', error.response?.data);
          
          // Fallback: retorna estrutura mínima válida
          return { 
            quantidadeUsers: 1,
            nome: 'Plano Básico',
            preco: 0,
            planoId: planoId
          };
        }
      },
    
}
  export default planosAPI;