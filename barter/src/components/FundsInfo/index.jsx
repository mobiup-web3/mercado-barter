import { Container } from './styles';

const FundsInfo = () => {
  return (
    <Container>
        <div className="container">
          <div className="f-card card py-4 px-3 p-4">
            <div className="row justify-content-between mb-3">
                <div className="col-auto">
                  <span className="fw-semibold">Sua conta</span>
                </div>
                <div className="col-auto">
                  <i className="bi bi-arrow-up-circle-fill me-2"></i>
                  <span>2,36%</span>
                </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div>
                  <span className="fs-1 fw-bold"><small>R$</small> 145.000,00</span>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-auto mt-3 mt-md-0">
                <div className="d-flex align-items-start gap-2">
                  <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="28" alt="" />
                  <div className="d-flex flex-column">
                    <span className="fw-bold">COFBR <sup className="bi bi-arrow-down-circle text-danger"></sup></span>
                    <small className="fw-semibold text-muted">R$ 1 <i className="bi bi-chevron-right small"></i> 0.33 CFBR</small> 
                  </div>
                </div>
              </div>
              <div className="col-auto mt-3 mt-md-0">
                <div className="d-flex align-items-start gap-2">
                  <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="28" alt="" />
                  <div className="d-flex flex-column">
                    <span className="fw-bold">MILBR <sup className="bi bi-arrow-up-circle text-success"></sup></span>
                    <small className="fw-semibold text-muted">R$ 1 <i className="bi bi-chevron-right small"></i> 0.18 CFBR</small> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Container>
  );
};

export default FundsInfo