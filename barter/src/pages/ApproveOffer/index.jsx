import { Container } from "./styles";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavbarExtend from "../../components/NavbarExtend";
import GenericModal from "../../components/GenericModal";
import GenericBreadcrumb from "../../components/GenericBreadcrumb";
import { formatCurrency } from "../../utils/utils";
import { params } from "../../data/data";
import Web3 from "web3";

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
    },
    {
      param: 'milho-cpr',
      name: 'Milho Saca',
      description: 'O Milho Saca é um grão alimentício fundamental que serve de base para uma variedade de pratos deliciosos. Versátil e nutritivo, o milho é uma escolha popular em muitas cozinhas ao redor do mundo. Use-o para fazer pipoca crocante, tortilhas saborosas, ou como ingrediente em pratos tradicionais, como a polenta. O Milho Saca é uma escolha versátil e saborosa para suas necessidades culinárias.',
      value: 'R$ 39,90',
      creator: 'Ind Mil Thons',
      cryptoValue: [
        { currency: 'rd', price: '2708.10' },
        { currency: 'cprmil01', price: '15.045' },
      ],
      image: 'https://agristore.com/image/cache/catalog/Di%20Solo/milho-ipanema-20-kg-1200x1200.png',
    }
  ];

  return mockData.find((data) => data.param === param);
};

// custom select start 
const options = [
  // { value: 'CPRCOFEE01', label: 'CPRCOFEE01', icon: 'https://stonoex.mobiup.io/assets/img/cofbr.svg' },
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

export const ApproveOffer = () => {
  const { item } = useParams();
  const navigate = useNavigate(); 
  const itemData = findDataByParam(item);
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState('');
  const [wallet, setWallet] = useState('');
  const [swap, setSwap] = useState(0);
  const [fertilizante, setFertilizante] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);
  const [offerValue, setOfferValue] = useState('');
  const [linkAprovacao, setLinkAprovacao] = useState('');
  const [linkConfirmacao, setLinkConfirmacao] = useState('');
  const [formraw, setFormraw] = useState(true);
  const [blockchain, setBlockchain] = useState(false);
  const [statusBlockchain, setStatusBlockchain] = useState(false);
  const [error, setError] = useState({
    selectedValue: '',
    offerValue: '',
  });
  const [success, setSuccess] = useState({
    selectedValue: false,
    offerValue: false,
  });

  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => {
    setShow(true);
  }

  useEffect(() => {
    const profileLocal = localStorage.getItem('profile');
    setProfile(profileLocal);
    const walletLocal = localStorage.getItem('wallet');
    setWallet(walletLocal);

    // Recupera o JSON do localStorage
    const fertilizanteJSON = localStorage.getItem('fertilizante');

    // Converte de volta para objeto JavaScript
    const fertilizanteLocal = JSON.parse(fertilizanteJSON);

    const swapLocal = localStorage.getItem('swap_quantity');
    setSwap(swapLocal);

    // Verifica se o objeto foi recuperado com sucesso
    if (fertilizanteLocal) {
      // Agora você pode usar o objeto fertilizante normalmente
      console.log(fertilizanteLocal);
      setFertilizante(fertilizanteLocal);
    } else {
      // O objeto não foi encontrado no localStorage
      console.log('Objeto não encontrado no localStorage');
    }

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
  
    setError(errors);
  
    return isValid;
  };

  const handleEnd = async () => {
    const isValid = true;
  
    if (isValid) {
      setFormraw(false);
      // Conecte-se a uma instância Web3 previamente configurada
      const web3 = new Web3(new Web3.providers.HttpProvider(params.mumbai.url));

      // Calcular o valor em Wei
      const valueInWei = web3.utils.toWei(0, 'ether');

      // Instancie uma conta usando a chave privada
      const account = web3.eth.accounts.privateKeyToAccount('0x' + params.mumbai.my_private);

      // Instancie o contrato inteligente WAGMI com sua ABI
      const contract = new web3.eth.Contract(JSON.parse(params.mumbai.jabi), params.mumbai.atv_contract_address);

      // Construa a transação
      const transaction = {
        from: params.mumbai.my_address,
        to: params.mumbai.atv_contract_address,
        gas: 400000,
        gasPrice: await web3.eth.getGasPrice(),
        value: valueInWei,
        data: contract.methods.approve(params.mumbai.htlc_contract, 500).encodeABI(),
        nonce: await web3.eth.getTransactionCount(params.mumbai.my_address),
      };

      // Assine a transação com a chave privada
      const signedTransaction = await web3.eth.accounts.signTransaction(transaction, params.mumbai.my_private);

      web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
        .on('transactionHash', (hash) => {
          setBlockchain(true);
          console.log(`Hash da transação: ${hash}`);
          setLinkAprovacao(params.mumbai.scan + hash);
          // Lógica para lidar com a transação em andamento
        })
        .on('receipt', async (receipt) => {
          console.log('Transação confirmada:', receipt);
          // Lógica para lidar com a transação confirmada
          //this.setState({ isLoading: false });

          // Instancie o contrato inteligente WAGMI com sua ABI
          const contractHtcl = new web3.eth.Contract(JSON.parse(params.mumbai.htlc_abi), params.mumbai.htlc_contract);
          const valueInWeiHtcl = web3.utils.toWei(0, 'ether');
          // Construa a transação
          const transactionHtcl = {
            from: params.mumbai.my_address,
            to: params.mumbai.htlc_contract,
            gas: 400000,
            gasPrice: await web3.eth.getGasPrice(),
            value: valueInWeiHtcl,
            data: contractHtcl.methods.newSwap(params.goerli.my_address, params.mumbai.atv_contract_address, '0xc888c9ce9e098d5864d3ded6ebcc140a12142263bace3a23a36f9905f12bd64a', 1000000000, 500).encodeABI(),
            nonce: await web3.eth.getTransactionCount(params.mumbai.my_address),
          };

          // Assine a transação com a chave privada
          const signedTransactionHtcl = await web3.eth.accounts.signTransaction(transactionHtcl, params.mumbai.my_private);

          web3.eth.sendSignedTransaction(signedTransactionHtcl.rawTransaction)
            .on('transactionHash', (hash) => {
              console.log(`Swap Hash da transação: ${hash}`);
              setLinkConfirmacao(params.mumbai.scan + hash);
              localStorage.setItem('swap', 'OK');

              setStatusBlockchain(true);
              // Lógica para lidar com a transação em andamento
            })
            .on('receipt', async (receipt) => {
              console.log('Swap Transação confirmada:', receipt);

              const swapIndex = await contractHtcl.methods.swapIndex().call();
              console.log("swapIndex 1", swapIndex.toString());
              const valueInWeiHtclFinishSwap = web3.utils.toWei(0, 'ether');
              // Construa a transação
              const transactionHtclFinishSwap = {
                from: params.mumbai.my_address,
                to: params.goerli.htlc_contract,
                gas: 500000,
                gasPrice: await web3.eth.getGasPrice(),
                value: valueInWeiHtclFinishSwap,
                data: contractHtcl.methods.finalizeSwap(parseInt(swapIndex.toString()), '0xc888c9ce9e098d5864d3ded6ebcc140a12142263bace3a23a36f9905f12bd64a').encodeABI(),
                nonce: await web3.eth.getTransactionCount(params.mumbai.my_address),
              };

              // Assine a transação com a chave privada
              const signedTransactionHtclFinishSwap = await web3.eth.accounts.signTransaction(transactionHtclFinishSwap, params.mumbai.my_private);

              web3.eth.sendSignedTransaction(signedTransactionHtclFinishSwap.rawTransaction)
                .on('transactionHash', (hash) => {
                  console.log(`Swap Finish 1 Hash da transação: ${hash}`);
                  // Lógica para lidar com a transação em andamento
                })
                .on('receipt', async (receipt) => {
                  console.log('Swap Finish 1 Transação confirmada:', receipt);
                  // Lógica para lidar com a transação confirmada

                  // ÚLTIMO PASSO PARA FINALIZAR O ATOMIC SWAP
                  const contractHtclEnd = new web3.eth.Contract(JSON.parse(params.goerli.htlc_abi), params.goerli.htlc_contract);

                  const swapIndexEnd = await contractHtclEnd.methods.swapIndex().call();

                  const valueInWeiHtclFinishSwapEnd = web3.utils.toWei(0, 'ether');
                  // Construa a transação
                  const transactionHtclFinishSwapEnd = {
                    from: params.mumbai.my_address,
                    to: params.goerli.htlc_contract,
                    gas: 600000,
                    gasPrice: await web3.eth.getGasPrice(),
                    value: valueInWeiHtclFinishSwapEnd,
                    data: contractHtclEnd.methods.finalizeSwap(parseInt(swapIndexEnd.toString()), '123456').encodeABI(),
                    nonce: await web3.eth.getTransactionCount(params.mumbai.my_address),
                  };

                  // Assine a transação com a chave privada
                  const signedTransactionHtclFinishSwapEnd = await web3.eth.accounts.signTransaction(transactionHtclFinishSwapEnd, params.mumbai.my_private);

                  web3.eth.sendSignedTransaction(signedTransactionHtclFinishSwapEnd.rawTransaction)
                    .on('transactionHash', (hash) => {
                      console.log(`Swap Finish 2 Hash da transação: ${hash}`);
                      // Lógica para lidar com a transação em andamento
                    })
                    .on('receipt', async (receipt) => {
                      console.log('Swap Finish 2 Transação confirmada:', receipt);
                      // Lógica para lidar com a transação confirmada

                    })
                    .on('error', (error) => {
                      setFormraw(true);
                      console.error('Swap Finish 2 Erro ao enviar a transação:', error);
                      // Lógica para lidar com erros
                    });
                  // ÚLTIMO PASSO PARA FINALIZAR O ATOMIC SWAP
                })
                .on('error', (error) => {
                  setFormraw(true);
                  console.error('Swap Finish 1 Erro ao enviar a transação:', error);
                  // Lógica para lidar com erros
                });

              // Lógica para lidar com a transação confirmada
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
  // validate form end

  const previousPage = {
    title: 'Marketplace',
    url: '/p/supplier',
  };

  return (
    <>
      <Container>
        <NavbarExtend wallet={wallet} profile={profile} />
        <GenericBreadcrumb currentPage={itemData.name} previousPage={previousPage} />
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
                    <h2 className="fw-bold">{itemData.name}</h2>
                    <div className="i-value mt-4">
                      <small className="text-muted fw-semibold">Preço Unit</small>
                      <p className="fs-4 fw-bold">{itemData.value}</p>
                      <div className="i-value-cripto d-flex gap-2 justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="36" alt="" />
                          <div>
                            <small className="text-muted fw-semibold">Preço Total {fertilizante?.symbol}</small>
                            <p className="fw-bold">{formatCurrency(parseInt(fertilizante?.balance) * 0.06)}</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <img src={ DrexLogo } width="36" alt="" />
                          <div>
                            <small className="text-muted fw-semibold">Preço RD</small>
                            <p className="fw-bold">{formatCurrency(parseInt(fertilizante?.balance) * 0.02)}</p>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                    <div className="i-offer-info mt-4">
                      <small className="text-muted fw-semibold">Status da oferta</small>
                      <div className="i-offer-info-box d-flex align-items-center justify-content-between">
                        <div className="i-offer-item d-flex gap-2 align-items-center">
                          <div className="i-offer-icon bg-default"><i className="bi bi-check"></i></div>
                          <div className="d-flex flex-column">
                            <span>Oferta aprovada</span>
                            <span>Sua oferta foi aceita <i className="bi bi-check-circle text-success"></i></span>
                          </div>
                        </div>
                        <div className="i-offer-info-value text-end">
                          <span>{swap} {fertilizante?.symbol}</span>
                        </div>
                      </div>
                      <div className="i-offer-info-box d-flex align-items-center justify-content-between mt-3">
                        <div className="i-offer-item d-flex gap-2 align-items-center">
                          <div className="i-offer-icon bg-default"><i className="bi bi-coin"></i></div>
                          <div className="d-flex flex-column">
                            <span>Oferta enviada</span>
                            <span>Aguardando aprovação da oferta</span>
                          </div>
                        </div>
                        <div className="i-offer-info-value text-end">
                          <span>{swap} {fertilizante?.symbol}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="i-button p-2">
                    <button onClick={handleShow} className="btn btn-default btn-lg w-100 text-uppercase mt-1">Confirmar Minha parte do Acordo</button>
                    <p className="text-center small text-muted fw-semibold mt-1 mb-0">Você tem 24h : 14m : 56s para aprovar a transação</p>
                  </div> 
                </div>
                </>
              ) : (
                <h2 className="fw-bold mt-5">Item não encontrado</h2>
              )}
            </div>
          </div>
        </section>
        <GenericModal
          show={show}
          handleClose={handleClose}
          title="Confirmar acordo"
          centered={true}
          size="md"
          backdrop="static"
          keyboard={false}
        >
          {formraw ? (
            <>
              <p className="fw-semibold m-0">Deseja confirmar sua parte no acordo? Essa ação não poderá ser desfeita.</p>
              <div className="i-resume-checkout d-flex gap-2">
                <img className="img-fluid rounded-1" width="90" src={itemData.image} alt={itemData.name} />
                <div>
                  <span className="fw-semibold">{itemData.name}</span>
                  <div className="small d-flex align-items-center gap-2 text-muted fw-semibold">
                    <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="22" alt="" /> 
                    {swap} {fertilizante?.symbol}
                  </div>
                </div>
              </div>
              <div>
                <button onClick={handleEnd} className="btn btn-default btn-lg w-100">Sim, quero confirmar</button>
                <button onClick={handleClose} className="btn btn-default-transparent btn-lg w-100 mt-1 mb-0">Voltar</button>
              </div>
            </>
          ) : ('')}

          {blockchain ? (
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="i-description mt-4 d-md-none">
                  <small className="text-muted fw-semibold">Aprovação:</small>
                  <p className="mt-2 mb-0 fw-semibold"><a href={linkAprovacao} target="_blank">{linkAprovacao == '' ? 'Carregando...' : 'Ver na Blockchain'}</a></p>
                </div>
                <div className="i-description mt-4 d-md-none">
                  <small className="text-muted fw-semibold">Confirmação:</small>
                  <p className="mt-2 mb-0 fw-semibold"><a href={linkConfirmacao} target="_blank">{linkConfirmacao == '' ? 'Carregando...' : 'Ver na Blockchain'}</a></p>
                </div>
                <div className="i-description mt-4 d-md-none">
                  <small className="text-muted fw-semibold">Status:</small>
                  <p className="mt-2 mb-0 fw-semibold">
                  {statusBlockchain == false ? 'Enviando...' : 'Enviado'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          ) : ('')}
        </GenericModal>
      </Container>
    </>
  );
};
