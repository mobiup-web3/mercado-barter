import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { Container } from './styles';
import GenericTooltip from '../GenericTooltip';
import { formatCurrency } from '../../utils/utils';
import GenericModal from "../GenericModal";
import copyToClipboard from '../../utils/clipboard.js';
import pixIcon from '../../assets/img/icon/pix.svg';
import { params } from '../../data/data';
import Web3 from 'web3';

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

const FundsInfo = ({ profile, cpr, fertilizante, rd, tradercpr, cprrd }) => {
  const [icon, setIcon] = useState('bi bi-clipboard');
  const [copyMessage, setCopyMessage] = useState('');
  const [pix, setPix] = useState(false);
  const [show, setShow] = useState(false);

  const handlePix = async () => {
    setShow(true);
    setTimeout(async () => {
      setPix(true);
  
      // Conecte-se a uma instância Web3 previamente configurada
      const web3 = new Web3(new Web3.providers.HttpProvider(params.goerli.url));
  
      // Calcular o valor em Wei
      const valueInWei = web3.utils.toWei(0, 'ether');
  
      // Instancie uma conta usando a chave privada
      const account = web3.eth.accounts.privateKeyToAccount('0x' + params.goerli.fintech_private);
  
      // Instancie o contrato inteligente WAGMI com sua ABI
      const contract = new web3.eth.Contract(JSON.parse(params.goerli.rd_abi), params.goerli.rd_contract);
  
      // Construa a transação
      const transaction = {
        from: params.goerli.fintech_wallet,
        to: params.goerli.rd_contract,
        gas: 400000,
        gasPrice: await web3.eth.getGasPrice(),
        value: valueInWei,
        data: contract.methods.mint(params.goerli.address_trader, 500).encodeABI(),
      };
  
      // Assine a transação com a chave privada
      const signedTransaction = await web3.eth.accounts.signTransaction(transaction, params.goerli.fintech_private);
  
      web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
        .on('transactionHash', (hash) => {
          console.log(`Hash da transação: ${hash}`);
          // Lógica para lidar com a transação em andamento
        })
        .on('receipt', async (receipt) => {
          console.log('Transação confirmada:', receipt);
          // Lógica para lidar com a transação confirmada
          //this.setState({ isLoading: false });
        })
        .on('error', (error) => {
          console.error('Erro ao enviar a transação:', error);
          // Lógica para lidar com erros
          //this.setState({ isLoading: false });
        });
  
  
    }, 2500);
  }

  const handleCopyToClipboard = () => {
    const codeToCopy = 'hashdopix';
    copyToClipboard(codeToCopy);
    setIcon('bi bi-clipboard2-check');
    setCopyMessage('Código copiado com sucesso'); 

    setTimeout(() => {
      setIcon('bi bi-clipboard');
      setCopyMessage('');
    }, 2000);
  };

  const ref = () => {
    window.location.href = "/p/trader";
  };

  console.log("profileprofileprofileprofile", profile);
  return (
    <section>
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
                      <span className="fs-1 fw-bold">{formatCurrency(parseInt(rd?.balance))} <img src={ pixIcon } width="18" alt="" className="img-fluid" onClick={handlePix} /></span>
                    </div>
                  </div>
                </div>


                <div className="row align-items-center">
                  <div className="col-lg-6">
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
                      <p className="fs-4 fw-bold m-0">{parseInt(tradercpr?.balance).toFixed(2)} {tradercpr?.symbol}</p>
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
          <GenericModal
            show={show}
            title="Comprar DREX"
            centered={true}
            size="md"
            backdrop="static"
            keyboard={false}
          >
            <div className="pay-qrcode-logo mt-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo%E2%80%94pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.svg/1024px-Logo%E2%80%94pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.svg.png" alt="Logo PIX" width="110" className="img-fluid d-block mx-auto" />
            </div>
            {pix ? (
              <div className="pay-qrcode-image text-center">
                <h3 className="fw-bold text-success">Pagamento realizado com sucesso!</h3>
              </div>
            ) : ('')}
            <div className="pay-qrcode-image text-center">
              <h3 className="fw-bold">Escaneie o QR Code <br />para pagar com PIX</h3>
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="" className="img-fluid mx-auto" />
            </div>
            <div className="pay-qrcode-hash">
              {copyMessage && <p className="mb-2 text-success fw-semibold text-center">{copyMessage}</p> }
              <button onClick={handleCopyToClipboard} className="btn btn-default-transparent btn-lg w-100 d-flex align-items-center justify-content-center gap-2">PIX COPIA E COLA <i className={`fs-3 ${icon}`}></i></button>
            </div>
            <div className="">
              <button onClick={ref} className="btn btn-primary-transparent btn-lg w-100 d-flex align-items-center justify-content-center gap-2">FINALIZAR</button>
            </div>
          </GenericModal>
        </>
        )}

        {profile === 'supplier' && (
        <>
          <div className="funds-cpr">
            <div className="container">
              <div className="f-card card py-4 px-3 p-4">
                <div className="row justify-content-between mb-3 mb-md-0 f-initial-info">
                    <div className="col-auto">
                      <span>Nº 016/2018 Produto: <strong>Uréia composto</strong> </span>
                    </div>
                    <div className="col-auto">
                      <span>Quantidade: <strong>98.000 Kg</strong></span>
                    </div>
                    <div className="col-auto">
                      <span>Emitente 1: <strong>Franciscleison Pereira</strong></span>
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
                    <p className="fs-4 fw-bold m-0">{parseInt(fertilizante?.supply).toFixed(2)} {fertilizante?.symbol}</p>
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
                      <p className="fs-4 fw-bold m-0">{parseInt(fertilizante?.balance).toFixed(2)} {fertilizante?.symbol}</p>
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
                      <p className="fs-4 fw-bold m-0">{formatCurrency(fertilizante?.balance * 0.32)}</p>
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
              </div>
            </div>
          </div>
        </>
        )}

        {profile === 'cpr' && (
        <>
          <div className="funds-cpr">
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
                    <p className="fs-4 fw-bold m-0">{parseInt(cpr?.supply).toFixed(2)} {cpr?.symbol}</p>
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
                      <p className="fs-4 fw-bold m-0">{parseInt(cpr?.balance).toFixed(2)} {cpr?.symbol}</p>
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
                      <p className="fs-4 fw-bold m-0">{formatCurrency(parseInt(cprrd?.balance))}</p>
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
              </div>
            </div>
          </div>
        </>
        )}
    </Container>
    </section>
    
  );
};

export default FundsInfo