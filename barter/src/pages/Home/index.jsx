import { Container } from "./styles";
import { Link } from "react-router-dom";

export const Home = () => {
  
  return (
    <>
    <Container>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <div className="h-logo">
              <img src="https://via.placeholder.com/320" className="d-block mx-auto" alt="Mercado Barter Logo" />
            </div>
            <div className="h-content mt-4 text-center">
              <h2 className="fw-bold">Mercado Barter</h2>
              <p className="text-muted m-0 fw-semibold">Buy and sell RWA tokens easily</p>
              <div className="mt-4">
                <Link to="/register" className="btn w-100 btn-default btn-lg">Começar</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
    </>
  );
};
