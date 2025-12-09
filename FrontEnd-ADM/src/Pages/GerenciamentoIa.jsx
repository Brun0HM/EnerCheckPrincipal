import React, { useState, useMemo, useEffect } from "react";
import Search from "../components/Search";
import ListaProjetos from "../components/ListaProjetos";
import { ContainerLista } from "../components/ContainerLista";
import apiProjetos from "../apis/monitoramento";


const GerenciamentoIa = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [projetos, setProjetos] = useState([])
  // Função para converter data string em objeto Date
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };

  // Função para filtrar e ordenar dados
  const filteredData = useMemo(() => {
    let data = [...projetos];

    if (!activeFilter) return data;

    // Aplicar filtros por propriedade
    if (activeFilter.type === 'tipoProjeto') {
      data = data.filter(item => item.tipoProjeto === activeFilter.value);
    } else if (activeFilter.type === 'tipoConta') {
      data = data.filter(item => item.tipoConta === activeFilter.value);
    } else if (activeFilter.type === 'statusProjeto') {
      data = data.filter(item => item.statusProjeto === activeFilter.value);
    } else if (activeFilter.type === 'dateSort') {
      // Ordenar por data
      data.sort((a, b) => {
        const dateA = parseDate(a.dataInicio);
        const dateB = parseDate(b.dataInicio);
        
        if (activeFilter.value === 'recent') {
          return dateB - dateA; // Mais recente primeiro
        } else {
          return dateA - dateB; // Mais antigo primeiro
        }
      });
    }

    return data;
  }, [activeFilter]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    
  }, [])

  return (
    <>
      <div className='container py-5 mt-2 pt-2 mb-3 pb-3'>
        <h3 className='text-capitalize fw-bold text-start m-0'>Monitoramento de uso da IA</h3>
        <p className='fs-6 fw-light'>Dashboard com métricas de utilização da IA do projeto</p>

        <div className='d-flex flex-column gap-3 overflow-hidden'>
          <div className="border border-2 border-dark border-opacity-10 shadow d-flex flex-column rounded-4 px-3 py-3">
            <Search 
              onFilterChange={handleFilterChange} 
              activeFilter={activeFilter}
            />
          </div>
          <ContainerLista 
            topico={"Listagem Detalhada de Requisições"}
            desc={"Histórico completo de requisições processadas"}
            lista={<ListaProjetos filteredData={filteredData} />}
          />
        </div>
      </div>
    </>
  );
};

export default GerenciamentoIa;