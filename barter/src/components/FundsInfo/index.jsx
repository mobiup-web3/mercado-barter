import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { Container } from './styles';
import GenericTooltip from '../GenericTooltip';

const totalValue = 30000;
const availableValue = 12550;

// Dados do gráfico
const data = {
  labels: ['Tokens disponíveis', 'Total de tokens'],
  datasets: [
    {
      data: [availableValue, totalValue],
      backgroundColor: ['#8db9ca', '#0085ad'],
    },
  ],
};

const options = {
  plugins: {
    legend: {
      position: 'left', // Defina a posição da legenda como 'left'
      labels: {
        fontColor: 'black', // Cor do texto da legenda
        fontSize: 13, // Tamanho da fonte da legenda
      },
    },
  },
};

const FundsInfo = ({ profile }) => {
  return (
    <Container>
        {profile === 'trader' && (
        <>
          <section className="funds-trader">
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
                <div className="row justify-content-between align-items-center">
                  <div className="col-auto mt-3 mt-md-0">
                    <div className="d-flex align-items-start gap-2">
                      <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="28" alt="" />
                      <div className="d-flex flex-column">
                        <span className="fw-bold small">CPRCOFEE01 <sup className="bi bi-arrow-down-circle text-danger"></sup></span>
                        <small className="fw-semibold text-muted">R$ 1 <i className="bi bi-chevron-right small"></i> 0.33 CPRCOFEE01</small> 
                      </div>
                    </div>
                  </div>
                  <div className="col-auto mt-3 mt-md-0">
                    <div className="d-flex align-items-start gap-2">
                      <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="28" alt="" />
                      <div className="d-flex flex-column">
                        <span className="fw-bold small">CPRMIL01 <sup className="bi bi-arrow-up-circle text-success"></sup></span>
                        <small className="fw-semibold text-muted">R$ 1 <i className="bi bi-chevron-right small"></i> 0.18 CPRMIL01</small> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
        )}

        {profile === 'cpr' && (
        <>
          <section className="funds-cpr">
            <div className="container">
              <div className="f-card card py-4 px-3 p-4">
                <div className="row justify-content-between mb-3 mb-md-0 f-initial-info">
                    <div className="col-auto">
                      <span>Nº 016/2016 Produto: <strong>Milho em grãos</strong> </span>
                    </div>
                    <div className="col-auto">
                      <span>Quantidade: <strong>30.000 Sacas</strong></span>
                    </div>
                    <div className="col-auto">
                      <span>Emitente 1: <strong>Irineu Zecchin</strong></span>
                    </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div>
                      <small className="text-muted fw-semibold">
                        Total de tokens emitidos
                        <GenericTooltip
                          placement="top"
                          content="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
                        >
                          <i className='bi bi-info-circle-fill ms-1'></i>
                        </GenericTooltip>
                      </small>
                    <p className="fs-4 fw-bold m-0">30.000 CPRMIL01</p>
                    </div>
                    <div>
                      <small className="text-muted fw-semibold">
                        Total de tokens disponíveis na sua carteira
                        <GenericTooltip
                          placement="top"
                          content="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
                        >
                          <i className='bi bi-info-circle-fill ms-1'></i>
                        </GenericTooltip>
                      </small>
                      <p className="fs-4 fw-bold m-0">14.000</p>
                    </div>
                    <div>
                      <small className="text-muted fw-semibold">
                        Quantidade de real digital recebido na carteira
                        <GenericTooltip
                          placement="top"
                          content="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
                        >
                          <i className='bi bi-info-circle-fill ms-1'></i>
                        </GenericTooltip>
                      </small>
                      <p className="fs-4 fw-bold m-0"><small>R$</small> 127.000,00</p>
                    </div>
                  </div>
                  <div className="col-lg-6 mt-3 mt-md-0">
                  <div className="d-flex align-items-center justify-content-center mx-auto" style={{ width: '100%', maxWidth: '100%', height: '300px' }}>
                      <Doughnut 
                        data={data} 
                        options={options}
                      />
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-auto mt-3 mt-md-0">
                    <div className="d-flex align-items-start gap-2">
                      <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="28" alt="" />
                      <div className="d-flex flex-column">
                        <span className="fw-bold small">CPRCOFEE01 <sup className="bi bi-arrow-down-circle text-danger"></sup></span>
                        <small className="fw-semibold text-muted">R$ 1 <i className="bi bi-chevron-right small"></i> 0.33 CPRCOFEE01</small> 
                      </div>
                    </div>
                  </div>
                  <div className="col-auto mt-3 mt-md-0">
                    <div className="d-flex align-items-start gap-2">
                      <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="28" alt="" />
                      <div className="d-flex flex-column">
                        <span className="fw-bold small">CPRMIL01 <sup className="bi bi-arrow-up-circle text-success"></sup></span>
                        <small className="fw-semibold text-muted">R$ 1 <i className="bi bi-chevron-right small"></i> 0.18 CPRMIL01</small> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
        )}
    </Container>
  );
};

export default FundsInfo