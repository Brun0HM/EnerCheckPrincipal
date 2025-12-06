import PerguntasFrequentes from "../components/PerguntasFrequentes";
import TiposPlanos from "../components/TiposPlanos";

const Planos = () => {

  

  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        paddingBottom: "2rem",
      }}
    >
      <div className="container-fluid text-center d-flex flex-column align-items-center justify-content-center">
        <div className={`mainContent`}>
          <div className="container text-center d-flex flex-column align-items-center justify-content-center px-3">
            <div>
              <p className="bg-primary text-light fw-semibold p-1 rounded-2 conformidade">
                Planos Flexíveis
              </p>
            </div>
            <div className="container">
              <div>
                <h1 className="fw-bold display-3 display-md-3 display-sm-4 display-xs-5">
                  Escolha o plano ideal <br className="d-none d-md-block" />
                  <span className="d-md-none"> </span>para seu{" "}
                  <span className="text-primary"> negócio</span>
                </h1>
              </div>
              <div className="my-4 px-2">
                <span className="text-break fs-4 fs-md-4 fs-sm-5 fs-xs-6">
                  Desde profissionais autônomos até grandes empresas, temos a
                  solução perfeita para suas necessidades de verificação de
                  projetos elétricos.
                </span>
              </div>
            </div>
          </div>
          <div
            className="d-flex flex-column flex-lg-row justify-content-center align-items-stretch gap-3 px-3"
            style={{ minHeight: "600px" }}
          >
            <TiposPlanos
              icon="bi bi-star"
              title="Básico"
              desgracao="Ideal para profissionais autônomos"
              preco="R$49"
              planoId={1}
              itens={[
                "Até 10 projetos",
                "Conformidade NBR 5410",
                "Relatórios em PDF",
                "Suporte por email",
                "Histórico de 30 dias",
              ]}
            />

            <TiposPlanos
              icon="bi bi-people"
              title="Pro"
              desgracao="Para pequenas e médias empresas"
              preco="R$149"
              planoId={2}
              itens={[
                "Até 50 projetos",
                "Conformidade NBR 5410",
                "Relatórios personalizados",
                "Suporte prioritário",
                "Histórico ilimitado",
                "API de integração",
              ]}
            />

            <TiposPlanos
              icon="bi bi-award"
              title="Empresas"
              desgracao="Para grandes organizações"
              preco="R$399"
              planoId={3}
              itens={[
                "Projetos ilimitados",
                "Conformidade NBR 5410",
                "Relatórios white-label",
                "Suporte dedicado 24/7",
                "API completa",
                "Treinamento personalizado",
                "SLA garantido",
              ]}
            />
          </div>
          <div className="mt-5 mb-5">
            <h1 className="fw-bold fs-1">Perguntas Frequentes</h1>
            <p className="fs-4 text-secondary">
              Tire suas dúvidas sobre nossos planos e funcionalidades
            </p>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-6">
                <PerguntasFrequentes
                  title="Como funciona o teste grátis?"
                  descricao="O plano Básico inclui 7 dias de teste gratuito com acesso completo a todas as funcionalidades. Não é necessário cartão de crédito para começar."
                />
              </div>
              <div className="col-12 col-lg-6">
                <PerguntasFrequentes
                  title="Posso mudar de plano a qualquer momento?"
                  descricao="Sim, nossa IA é treinada especificamente para verificar conformidade com a NBR 5410 e outras normas técnicas brasileiras relevantes."
                />
              </div>
              <div className="col-12 col-lg-6">
                <PerguntasFrequentes
                  title="Os relatórios seguem as normas brasileiras?"
                  descricao="Sim, nossa IA é treinada especificamente para verificar conformidade com a NBR 5410 e outras normas técnicas brasileiras relevantes."
                />
              </div>
              <div className="col-12 col-lg-6">
                <PerguntasFrequentes
                  title="Há suporte técnico disponível?"
                  descricao="Todos os planos incluem suporte técnico. O plano Pro tem suporte prioritário e o plano Empresas inclui suporte dedicado 24/7."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planos;
