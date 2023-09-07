import { Link } from 'react-router-dom';
import { Container } from "./styles";

export const Error404 = () => {
  
  return (
    <>
    <Container>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="e-content">
              <h1>404</h1>

              <h2>Página não encontrada</h2>
              <p>Não encontramos a página que você está tentando acessar. Certifique-se que está digitando o endereço corretamente e tente de novo.</p>
              <div className="text-center">
                <Link to="/" className="mt-4 btn fw-semibold text-muted px-0 m-0 text-underline">Voltar para página inicial</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
    </>
  );
};
