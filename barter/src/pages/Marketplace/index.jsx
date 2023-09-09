import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container } from "./styles";
import { TabsContent } from "../../components/BarterTabs/styles";
import NavbarExtend from "../../components/NavbarExtend";
import FundsInfo from "../../components/FundsInfo";
import BarterTabs from "../../components/BarterTabs";
import CPRTabs from "../../components/CPRTabs";
import GenericBreadcrumb from "../../components/GenericBreadcrumb";
import Web3 from 'web3';
import { params } from "../../data/data";

export const Marketplace = () => {
  const { profile } = useParams();
  const navigate = useNavigate();

  const expectedProfiles = ['cpr', 'supplier', 'trader'];

  const [balance, setBalance] = useState(0);
  const [cname, setCname] = useState('');
  const [csymbol, setCsymbol] = useState('');
  const [fertilizante, setFertilizante] = useState({});
  const [wallet, setWallet] = useState('');
  // Função para buscar o saldo
  const getBalanceData = async () => {
    const web3 = new Web3(params.goerli.url);
    const contract = new web3.eth.Contract(JSON.parse(params.goerli.jabi), params.goerli.cpr_contract_address);
    const walletAddress = params.goerli.my_address;

    try {
      const result = await contract.methods.balanceOf(walletAddress).call();
      const cName = await contract.methods.name().call();
      const cSymbol = await contract.methods.symbol().call();
      setBalance(result);
      setCname(cName);
      setCsymbol(cSymbol);
    } catch (error) {
      console.error('Erro ao buscar saldo:', error);
    }
  };

  const getFertilizanteData = async () => {
    const web3 = new Web3(params.mumbai.url);
    const contract = new web3.eth.Contract(JSON.parse(params.mumbai.jabi), params.mumbai.atv_contract_address);
    const walletAddress = params.mumbai.my_address;

    try {
      const result = await contract.methods.balanceOf(walletAddress).call();
      const cName = await contract.methods.name().call();
      const cSymbol = await contract.methods.symbol().call();
      setFertilizante({
        name: cName,
        symbol: cSymbol,
        balance: result.toString(),
      });
    } catch (error) {
      console.error('Erro ao buscar saldo:', error);
    }
  };

//   const sendTransaction = async () => {
//     const { contractAddress, privateKey, walletAddress, valueInEther } = this.state;

//     // Conecte-se a uma instância Web3 previamente configurada
//     const web3 = new Web3(this.props.web3Provider);

//     // Calcular o valor em Wei
//     const valueInWei = web3.utils.toWei(valueInEther.toString(), 'ether');

//     // Instancie uma conta usando a chave privada
//     const account = web3.eth.accounts.privateKeyToAccount(privateKey);

//     // Instancie o contrato inteligente WAGMI com sua ABI
//     const contract = new web3.eth.Contract(this.props.contractABI, contractAddress);

//     // Construa a transação
//     const transaction = {
//       from: walletAddress,
//       to: contractAddress,
//       gas: 200000, // Limite de gás
//       gasPrice: web3.utils.toWei('10', 'gwei'), // Preço do gás em Wei
//       value: valueInWei, // Valor a ser enviado em Wei
//       data: contract.methods.suaFuncaoNoContrato(parametros).encodeABI(), // Encode a chamada da função
//       nonce: await web3.eth.getTransactionCount(walletAddress), // Número do nonce
//     };

//     // Assine a transação com a chave privada
//     const signedTransaction = await web3.eth.accounts.signTransaction(transaction, privateKey);

//     // Enviar a transação
//     this.setState({ isLoading: true });

//     web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
//       .on('transactionHash', (hash) => {
//         console.log(`Hash da transação: ${hash}`);
//         // Lógica para lidar com a transação em andamento
//       })
//       .on('receipt', (receipt) => {
//         console.log('Transação confirmada:', receipt);
//         // Lógica para lidar com a transação confirmada
//         this.setState({ isLoading: false });
//       })
//       .on('error', (error) => {
//         console.error('Erro ao enviar a transação:', error);
//         // Lógica para lidar com erros
//         this.setState({ isLoading: false });
//       });
//   }

  useEffect(() => {
    if (!expectedProfiles.includes(profile)) {
      navigate('/404');
    }
    getBalanceData();
    getFertilizanteData();
    localStorage.setItem('profile', profile);
    console.log("profile", profile);
    if (profile == 'cpr') {
        localStorage.setItem('wallet', params.goerli.my_address);
        setWallet(params.goerli.my_address);
    } 

    if (profile == 'supplier') {
        localStorage.setItem('wallet', params.mumbai.my_address);
        setWallet(params.mumbai.my_address);
    }
  }, [profile, navigate]);

  if (!expectedProfiles.includes(profile)) {
    return null;
  }

  const previousPage = {
    title: 'Onboarding',
    url: '/onboarding',
  };

  const handleItem = (param) => {
    navigate('/approve-offer/' + param);
  }

  return (
    <>
    <Container>
        <NavbarExtend wallet={wallet} profile={profile} />
        <GenericBreadcrumb currentPage="Marketplace" previousPage={previousPage} />
        <FundsInfo profile={profile} balance={balance} name={cname} symbol={csymbol} />
        
        {profile === 'cpr' && (
        <>
            <section className="view-cpr mt-5 mb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="m-tabs-menu">
                                <div className="list-group list-group-horizontal" id="list-tab" role="tablist">
                                    <a className="list-group-item list-group-item-action disabled" aria-disabled="true" id="list-two-list" data-bs-toggle="list" href="#list-two" role="tab" aria-controls="list-profile">Status das Transações</a>
                                    <a className="list-group-item list-group-item-action active" id="list-one-list" data-bs-toggle="list" href="#list-one" role="tab" aria-controls="list-home">Mercado<br />Barter</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="view-cpr">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="m-tabs-content">
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade" id="list-one" role="tabpanel" aria-labelledby="list-home-list">...</div>
                                <div className="tab-pane fade show active" id="list-two" role="tabpanel" aria-labelledby="list-profile-list">
                                    <BarterTabs fertilizante={fertilizante} />
                                </div>
                                <div className="tab-pane fade" id="list-three" role="tabpanel" aria-labelledby="list-messages-list">...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
        )}

        {profile === 'supplier' && (
        <>
            <section className="view-cpr mt-5 mb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="m-tabs-menu">
                                <div className="list-group list-group-horizontal" id="list-tab" role="tablist">
                                    <a className="list-group-item list-group-item-action disabled" aria-disabled="true" id="list-two-list" data-bs-toggle="list" href="#list-two" role="tab" aria-controls="list-profile">Status das Transações</a>
                                    <a className="list-group-item list-group-item-action active" id="list-one-list" data-bs-toggle="list" href="#list-one" role="tab" aria-controls="list-home">Ofertas <br /> recebidas</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="view-cpr">
                <div className="container">
                <TabsContent>
                    <div className="m-tabs-content caR$ rounded-0 mt-3">
                        <div className="row">
                            <div className="col-12 col-md-3 col-lg-4">
                                <div onClick={() => handleItem('rootex-fertilizante')} className="m-tabs-item py-3 d-flex align-items-start gap-3">
                                <i className="link-icon bi bi-chevron-right"></i>
                                <div className="m-tabs-item-media">
                                    <img src="https://http2.mlstatic.com/D_NQ_NP_970839-MLU69446511865_052023-O.webp" alt="" className="rounded img-fluid" />
                                </div>
                                <div className="m-tabs-item-info">
                                    <h4 className="m-tabs-item-title mb-3 text-uppercase fw-bold">Rootex Fertilizante</h4>
                                    <div className="m-tabs-item-cripto mb-3">
                                    <div className="m-tabs-item-cripto-value d-flex align-items-center gap-2">
                                        <div className="d-flex align-items-center gap-2">
                                        <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="32" alt="" />
                                        </div>
                                        <div className='d-flex flex-column'>
                                        <span className="text-muted fw-semibold">CPRMIL01</span>
                                        <span className="fs-6">15.045</span>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="m-tabs-item-value"><small className="fw-semibold text-muted">Valor convertido para real digital</small><p className='m-0'>R$ 2.708,10</p></div>
                                </div>
                                </div> {/* item 1 ends here */}
                            </div>

                            <div className="divider d-md-none"><hr /></div>

                            <div className="col-12 col-md-3 col-lg-4">
                                <div onClick={() => handleItem('eclipse-cross-hipe')} className="m-tabs-item py-3 d-flex align-items-start gap-3">
                                <i className="link-icon bi bi-chevron-right"></i>
                                <div className="m-tabs-item-media">
                                    <img src="https://cdn.motor1.com/images/mgl/3WWyL6/s1/mitsubishi-eclipse-cross-hpe-s-awc-2023.jpg" alt="" className="rounded img-fluid" />
                                </div>
                                <div className="m-tabs-item-info">
                                    <h4 className="m-tabs-item-title mb-3 text-uppercase fw-bold">Eclipse Cross Hipe</h4>
                                    <div className="m-tabs-item-cripto mb-3">
                                    <div className="m-tabs-item-cripto-value d-flex align-items-center gap-2">
                                        <div className="d-flex align-items-center gap-2">
                                        <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="32" alt="" />
                                        </div>
                                        <div className='d-flex flex-column'>
                                        <span className="text-muted fw-semibold">CPRMIL01</span>
                                        <span className="fs-6">959.045455</span>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="m-tabs-item-value"><small className="fw-semibold text-muted">Valor convertido para real digital</small><p className='m-0'>R$ 210.990,00</p></div>
                                </div>
                                </div> {/* veiculo 1 ends here */}
                            </div>
                        </div>
                    </div>
                </TabsContent>
                </div>
            </section>
        </>
        )}

        {profile === 'trader' && (
        <>
            <section className="view-trader mt-5 mb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="m-tabs-menu">
                                <div className="list-group list-group-horizontal" id="list-tab" role="tablist">
                                    <a className="list-group-item list-group-item-action active" id="list-one-list" data-bs-toggle="list" href="#list-one" role="tab" aria-controls="list-home">Compra <br />de CPRs</a>
                                    <a className="list-group-item list-group-item-action disabled" aria-disabled="true" id="list-two-list" data-bs-toggle="list" href="#list-two" role="tab" aria-controls="list-profile">Status das Transações</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="view-trader">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="m-tabs-content">
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="list-one" role="tabpanel" aria-labelledby="list-home-list">
                                    <CPRTabs />
                                </div>
                                <div className="tab-pane fade" id="list-two" role="tabpanel" aria-labelledby="list-profile-list">
                                    ...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
        )}
    </Container>
    </>
  );
};
