import { React, useState, useEffect } from 'react';
import { Container } from "./styles";
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import NavbarExtend from "../../components/NavbarExtend";
import GenericModal from "../../components/GenericModal";
import GenericBreadcrumb from "../../components/GenericBreadcrumb";
import { formatCurrency } from '../../utils/utils';
import Web3 from 'web3';
import { params } from '../../data/data';

import DrexLogo from "../../assets/img/drex-box.png";

// função para tratar parametro da url
const findDataByParam = (param) => {
  const mockData = [
    {
      param: 'eclipse-cross-hipe',
      name: 'Eclipse Cross Hipe',
      description: 'O Eclipse Cross Hipe é um SUV moderno e versátil que combina estilo contemporâneo com desempenho eficiente. Seu design elegante e recursos avançados tornam a experiência de condução única, tornando-o uma escolha ideal para quem procura um veículo que une sofisticação e funcionalidade.',
      value: 'R$ 210.990,00',
      creator: 'Concessionária XYZ',
      cryptoValue: [
        { currency: 'rd', price: '210990.50' },
        { currency: 'cprmil01', price: '229,045' },
      ],
      image: 'https://cdn.motor1.com/images/mgl/3WWyL6/s1/mitsubishi-eclipse-cross-hpe-s-awc-2023.jpg',
    },
    {
      param: 'ureia-fertilizante',
      name: 'Ureia Composto',
      description: 'A Ureia Composto é um fertilizante essencial para o crescimento saudável das plantas. Este composto fornece às plantas o nitrogênio necessário para prosperar, promovendo um desenvolvimento robusto e uma colheita abundante. Ideal para agricultura e jardinagem, a Ureia Composto é uma solução confiável para nutrir seu solo e suas plantas.',
      value: 'R$ 2.708,10',
      creator: 'Rootex',
      cryptoValue: [
        { currency: 'rd', price: '2708.10' },
        { currency: 'cprmil01', price: '15.045' },
      ],
      image: 'https://cdn.awsli.com.br/2500x2500/1751/1751727/produto/223379489/embalagem_ureia-zfqd9214q6.png',
    }
  ];

  return mockData.find((data) => data.param === param);
};

// custom select start 
const options = [
  // { value: 'RD', label: 'RD', icon: 'https://stonoex.mobiup.io/assets/img/cofbr.svg' },
  { value: 'CPRMIL01', label: 'CPRMIL01', icon: 'https://stonoex.mobiup.io/assets/img/cofbr.svg' },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '.5rem .5rem'
  }),
  optionLabel: {
    marginRight: '10px', // Espaço para o ícone
  },
  optionIcon: {
    width: '24px',
    height: '24px',
  },
};

const CustomOption = ({ children, innerProps, label, data }) => (
  <div {...innerProps} style={customStyles.option(data)}>
    <img src={data.icon} alt={label} style={customStyles.optionIcon} />
    <span style={customStyles.optionLabel}>{children}</span>
  </div>
);
// custom select end

export const Item = () => {
  const { item } = useParams();
  const navigate = useNavigate(); 
  const itemData = findDataByParam(item);
  const [show, setShow] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [modalTitle, setModalTitle] = useState('Fazer Oferta');
  const [selectedValue, setSelectedValue] = useState(null);
  const [offerValue, setOfferValue] = useState('');
  const [profile, setProfile] = useState('');
  const [wallet, setWallet] = useState('');
  const [linkAprovacao, setLinkAprovacao] = useState('');
  const [linkConfirmacao, setLinkConfirmacao] = useState('');
  const [formraw, setFormraw] = useState(true);
  const [blockchain, setBlockchain] = useState(false);
  const [waitingStep, setWaitingStep] = useState(false);
  const [statusBlockchain, setStatusBlockchain] = useState(false);
  const [error, setError] = useState({
    selectedValue: '',
    offerValue: '',
  });
  const [success, setSuccess] = useState({
    selectedValue: false,
    offerValue: false,
  });
  const [fertilizante, setFertilizante] = useState({});
  const [cpr, setCpr] = useState({});

  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => {
    setFormraw(true);
    setWaitingStep(false);
    setBlockchain(false);
    setShowHeader(true);
    setShow(true);
  }

  useEffect(() => {
    const previousPageUrl = document.referrer;
    console.log('URL da página anterior:', previousPageUrl);


    // Recupera o JSON do localStorage
    const fertilizanteJSON = localStorage.getItem('fertilizante');

    // Converte de volta para objeto JavaScript
    const fertilizanteLocal = JSON.parse(fertilizanteJSON);

    // Verifica se o objeto foi recuperado com sucesso
    if (fertilizanteLocal) {
      // Agora você pode usar o objeto fertilizante normalmente
      console.log(fertilizanteLocal);
      setFertilizante(fertilizanteLocal);
    } else {
      // O objeto não foi encontrado no localStorage
      console.log('Objeto não encontrado no localStorage');
    }

    // Recupera o JSON do localStorage
    const cprJSON = localStorage.getItem('cpr');

    // Converte de volta para objeto JavaScript
    const cprLocal = JSON.parse(cprJSON);

    // Verifica se o objeto foi recuperado com sucesso
    if (cprLocal) {
      // Agora você pode usar o objeto fertilizante normalmente
      setCpr(cprLocal);
    } else {
      // O objeto não foi encontrado no localStorage
      console.log('Objeto não encontrado no localStorage');
    }

    const profileLocal = localStorage.getItem('profile');
    setProfile(profileLocal);

    const walletLocal = localStorage.getItem('wallet');
    setWallet(walletLocal);


    if (!itemData) {
      navigate('/404');
    }

  }, []);

  if (!itemData) {
    return null;
  }

  const handleSelectedValueChange = (selectedOption) => {
    setSelectedValue(selectedOption);
  
    // Remova o erro e defina o sucesso
    setError({ ...error, selectedValue: '' });
    setSuccess({ ...success, selectedValue: true });
  };

  const handleOfferValueChange = (e) => {
    const inputValue = e.target.value;
  
    // Verifica se o caractere inserido é um número ou um ponto decimal
    const regex = /^[0-9.]*$/;
  
    // Verifica se a entrada completa é válida
    if (regex.test(inputValue) || inputValue === '') {
      // Verifica se há mais de um ponto decimal na entrada completa
      const decimalCount = (inputValue.match(/\./g) || []).length;
      if (decimalCount > 1) {
        return;
      }

      setOfferValue(inputValue);

      // Remova o erro e defina o sucesso
      setError({ ...error, offerValue: '' });
      setSuccess({ ...success, offerValue: true });
    }
  };  

  const validateForm = () => {
    let isValid = true;
    const errors = {
      selectedValue: '',
      offerValue: '',
    };
  
    if (!selectedValue) {
      isValid = false;
      errors.selectedValue = 'Selecione uma moeda.';
    }
  
    if (!offerValue) {
      isValid = false;
      errors.offerValue = 'Informe o valor da oferta.';
    }
    localStorage.setItem('swap_quantity', offerValue);
    console.log("swap_quantity", offerValue)
    setError(errors);
  
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isValid = validateForm();
  
    if (isValid) {
      // Redefine os estados de erro para indicar sucesso
      setError({
        selectedValue: '',
        offerValue: '',
      });
  
      // Agora você pode aplicar classes de feedback de sucesso
      // Por exemplo, você pode adicionar classes "is-valid" aos campos
      // Para dar feedback visual de sucesso
      setSuccess({
        selectedValue: true,
        offerValue: true,
      });


      setFormraw(false);
      setWaitingStep(true);
      setShowHeader(false);
      setModalTitle('Aguarde');
      // Conecte-se a uma instância Web3 previamente configurada
      const web3 = new Web3(new Web3.providers.HttpProvider(params.goerli.url));

      // Calcular o valor em Wei
      const valueInWei = web3.utils.toWei(0, 'ether');

      // Instancie uma conta usando a chave privada
      const account = web3.eth.accounts.privateKeyToAccount('0x' + params.goerli.my_private);

      // Instancie o contrato inteligente WAGMI com sua ABI
      const contract = new web3.eth.Contract(JSON.parse(params.goerli.jabi), params.goerli.cpr_contract_address);

      // Construa a transação
      const transaction = {
        from: params.goerli.my_address,
        to: params.goerli.cpr_contract_address,
        gas: 200000,
        gasPrice: await web3.eth.getGasPrice(),
        value: valueInWei,
        data: contract.methods.approve(params.goerli.htlc_contract, 500).encodeABI(),
        nonce: await web3.eth.getTransactionCount(params.goerli.my_address),
      };

      // Assine a transação com a chave privada
      const signedTransaction = await web3.eth.accounts.signTransaction(transaction, params.goerli.my_private);

      web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
        .on('transactionHash', (hash) => {
          setWaitingStep(false);
          setBlockchain(true);
          setShowHeader(true);
          setModalTitle('Fazer Oferta');
          console.log(`Hash da transação: ${hash}`);
          setLinkAprovacao(params.goerli.scan + hash);
          // Lógica para lidar com a transação em andamento
        })
        .on('receipt', async (receipt) => {
          console.log('Transação confirmada:', receipt);
          // Lógica para lidar com a transação confirmada
          //this.setState({ isLoading: false });

          // Instancie o contrato inteligente WAGMI com sua ABI
          const contractHtcl = new web3.eth.Contract(JSON.parse(params.goerli.htlc_abi), params.goerli.htlc_contract);
          const valueInWeiHtcl = web3.utils.toWei(0, 'ether');
          // Construa a transação
          const transactionHtcl = {
            from: params.goerli.my_address,
            to: params.goerli.htlc_contract,
            gas: 500000,
            gasPrice: await web3.eth.getGasPrice(),
            value: valueInWeiHtcl,
            data: contractHtcl.methods.newSwap(params.mumbai.my_address, params.goerli.cpr_contract_address, '0xc888c9ce9e098d5864d3ded6ebcc140a12142263bace3a23a36f9905f12bd64a', 1000000000, 500).encodeABI(),
            nonce: await web3.eth.getTransactionCount(params.goerli.my_address),
          };

          // Assine a transação com a chave privada
          const signedTransactionHtcl = await web3.eth.accounts.signTransaction(transactionHtcl, params.goerli.my_private);

          web3.eth.sendSignedTransaction(signedTransactionHtcl.rawTransaction)
            .on('transactionHash', (hash) => {
              console.log(`Swap Hash da transação: ${hash}`);
              setLinkConfirmacao(params.goerli.scan + hash);
              localStorage.setItem('swap', 'OK');
              setStatusBlockchain(true);
              // Lógica para lidar com a transação em andamento
            })
            .on('receipt', (receipt) => {
              console.log('Swap Transação confirmada:', receipt);
              // Lógica para lidar com a transação confirmada
              //this.setState({ isLoading: false });
            })
            .on('error', (error) => {
              setFormraw(true);
              console.error('Swap Erro ao enviar a transação:', error);
              // Lógica para lidar com erros
              //this.setState({ isLoading: false });
            });
        })
        .on('error', (error) => {
          setFormraw(true);
          console.error('Erro ao enviar a transação:', error);
          // Lógica para lidar com erros
          //this.setState({ isLoading: false });
        });
  
      console.log("Form enviado!");
    }
  };

  const previousPage = {
    title: 'Marketplace',
    url: '/p/cpr',
  }

  useEffect(() => {
    if (blockchain) {
      // Função para adicionar a classe "done" aos elementos desejados
      const addDoneClass = () => {
        const progressStep2 = document.getElementById('progressStep2');
        const progressStepText2 = document.getElementById('progressStepText2');

        setTimeout(function(){
          if (progressStep2 && progressStepText2) {
            progressStep2.classList.add('progress-active');
            progressStepText2.classList.add('done');
          }
        }, 3000);
      };

      // Chame a função para adicionar a classe
      addDoneClass();
    }
  }, [blockchain]);

  const addDoneClassToElement = (elementId) => {
    const element = document.getElementById(`progressStep${elementId}`);
      if (element) {
        element.classList.add('progress-active');
        const textElement = document.getElementById(`progressStepText${elementId}`);
        if (textElement) {
          textElement.classList.add('done');
        }
      }
  };

  useEffect(() => {
    if (linkAprovacao != '') {
      addDoneClassToElement(2);
    }
  }, [linkAprovacao]);

  useEffect(() => {
    if (linkConfirmacao != '') {
      addDoneClassToElement(3);
    }
  }, [linkConfirmacao]);

  useEffect(() => {
    if (statusBlockchain) {
      addDoneClassToElement(4);
    }
  }, [statusBlockchain]);

  return (
    <>
      <Container>
        <NavbarExtend profile={profile} wallet={wallet} />
        <GenericBreadcrumb previousPage={previousPage} currentPage={itemData.name} />
        <section className="item mt-5">
          <div className="container">
            <div className="row justify-content-center">
              {itemData ? (
                <>
                <div className="col-lg-8">
                  <div className="i-media">
                    <img className="img-fluid rounded-1" src={itemData.image} alt={itemData.name} />
                  </div>
                  <div className="i-description mt-5 d-none d-md-block">
                    <small className="text-muted fw-semibold">Descrição</small>
                    <p className="mt-2 mb-0 fw-semibold">{itemData.description}</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="i-content">
                    <h2 className="fw-bold">5kg Adubo Fertilizante Uréia</h2>
                    <div className="i-value mt-4">
                      <small className="text-muted fw-semibold">Preço</small>
                      <p className="fs-4 fw-bold">500 {cpr?.symbol}</p>
                      <div className="i-value-cripto d-flex gap-2 justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="36" alt="" />
                          <div>
                            <small className="text-muted fw-semibold">Preço {cpr?.symbol}</small>
                            <p className="fw-bold">{formatCurrency(500 * 0.53)}</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <img src={ DrexLogo } width="36" alt="" />
                          <div>
                            <small className="text-muted fw-semibold">Preço RD</small>
                            <p className="fw-bold">{formatCurrency(fertilizante?.balance * 0.02)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="i-description mt-4 d-md-none">
                      <small className="text-muted fw-semibold">Descrição</small>
                      <p className="mt-2 mb-0 fw-semibold">{itemData.description}</p>
                    </div>
                    <div className="i-owner d-flex align-items-center gap-3 mt-4 mb-5 pb-5">
                      <img src="https://via.placeholder.com/60" className="circle" width="60" alt="" />
                      <div>
                        <small className="text-muted fw-semibold">Anunciado por</small>
                        <p className="fw-bold">{itemData.creator}</p>
                      </div>
                    </div>
                  </div>
                  <div className="i-button p-2">
                    <p className="text-center small text-muted fw-semibold mb-1">Faça uma oferta utilizando seu CPR</p>
                    <button onClick={handleShow} className="btn btn-default btn-lg w-100 text-uppercase">Enviar Oferta</button>
                  </div> 
                </div>
                </>
              ) : (
                <h2 className="fw-bold mt-5">Item não encontrado</h2>
              )}
            </div>
          </div>
        </section>
      </Container>
      <GenericModal
        show={show}
        showHeader={showHeader}
        handleClose={handleClose}
        title={modalTitle}
        centered={true}
        size="md"
        backdrop="static"
        keyboard={false}
      >
        {formraw ? (
          <form onSubmit={handleSubmit}>
          <p className="small">Envie sua oferta agora mesmo. Selecione a moeda e informe o valor para da oferta.</p>
          <div className={`my-3 ${success.selectedValue ? 'is-valid' : ''}`}>
            <label htmlFor="offer-cripto" className="fw-semibold small text-muted">Vou ofertar com</label>
            <Select
              id="offer-cripto"
              options={[
                { value: cpr?.symbol, label: cpr?.symbol, icon: 'https://stonoex.mobiup.io/assets/img/cofbr.svg' }
              ]}
              value={selectedValue}
              onChange={handleSelectedValueChange}
              styles={customStyles}
              isSearchable={false}
              components={{
                Option: CustomOption,
              }}
              className={`form-control ${error.selectedValue ? 'is-invalid' : ''}`}
            />
            {error.selectedValue && <div className="invalid-feedback">{error.selectedValue}</div>}
          </div>
          <div className={`form-floating mb-3 ${success.offerValue ? 'is-valid' : ''}`}>
            <input 
              type="tel"
              name="offer-value"
              value={offerValue}
              onChange={handleOfferValueChange}
              className={`form-control ${error.offerValue ? 'is-invalid' : ''}`}
              id="floatingInput"
              placeholder="e.g: name@example.com"
            />
            <label htmlFor="floatingInput">Valor da oferta</label>
            {error.offerValue && <div className="invalid-feedback">{error.offerValue}</div>}
          </div>
          <button type="submit" className="btn btn-default w-100 text-uppercase">Enviar Oferta</button>
        </form>
        ) : ('')}

        {waitingStep && (
          <div className="text-center h-100 d-flex flex-column align-items-center justify-content-center gap-3 py-5" style={{minHeight: '325px'}}>
            <h3 className="m-0 fw-semibold">Aguarde enquanto processamos sua transação...</h3>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {blockchain ? (
          <div className="w-100 d-flex justify-content-center flex-column" style={{overflow: 'hidden', minHeight: '325px'}}>
            <div className="d-flex justify-content-center">
              <div className="progress-container mt-4">
                <div className="progress-circle progress-active" id="progressStep1">
                  <i className="bi bi-check fs-3"></i>
                  </div>
                <div className="progress-circle" id="progressStep2">
                  <i className="bi bi-check fs-3"></i>
                </div>
                <div className="progress-circle" id="progressStep3">
                  <i className="bi bi-check fs-3"></i>
                </div>
                <div className="progress-circle" id="progressStep4">
                  <i className="bi bi-check fs-3"></i>
                </div>
              </div>
            </div>
            <div className="progress-container-text">
                <p className="step-title mb-1" id="progressStepText4">Operação concluída <i className="bi bi-check-circle-fill text-success"></i></p>
                <p className="step-title mb-1" id="progressStepText3">Confirmando na rede <a className="fs-6" href={linkConfirmacao} target="_blank"><i className="bi bi-box-arrow-up-right"></i></a></p>
                <p className="step-title mb-1" id="progressStepText2">Aprovando na blockchain <a className="fs-6" href={linkAprovacao} target="_blank"><i className="bi bi-box-arrow-up-right"></i></a></p>
                <p className="step-title done mb-1" id="progressStepText1">Oferta recebida</p>
            </div>
            {/* <div className="i-description mt-4">
              <small className="text-muted fw-semibold">Aprovação:</small>
              <p className="mt-2 mb-0 fw-semibold"><a href={linkAprovacao} target="_blank">{linkAprovacao == '' ? 'Carregando...' : 'Ver na Blockchain'}</a></p>
            </div>
            <div className="i-description mt-4">
              <small className="text-muted fw-semibold">Confirmação:</small>
              <p className="mt-2 mb-0 fw-semibold"><a href={linkConfirmacao} target="_blank">{linkConfirmacao == '' ? 'Carregando...' : 'Ver na Blockchain'}</a></p>
            </div>
            <div className="i-description mt-4">
              <small className="text-muted fw-semibold">Status:</small>
              <p className="mt-2 mb-0 fw-semibold">
              {statusBlockchain == false ? 'Enviando...' : 'Enviado'}
              </p>
            </div> */}
          </div>
        ) : ('')}
      </GenericModal>
    </>
  );
};
