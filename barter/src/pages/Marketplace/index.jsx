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
import { formatCurrency } from '../../utils/utils';

export const Marketplace = () => {
  const { profile } = useParams();
  const navigate = useNavigate();

  const expectedProfiles = ['cpr', 'supplier', 'trader'];

  const [fertilizante, setFertilizante] = useState({
    name: '',
    symbol: '',
    balance: 0,
    supply: 0
  });
  const [realDigital, setRealDigital] = useState({
    name: '',
    symbol: '',
    balance: 0,
    supply: 0
  });
  const [cpr, setCpr] = useState({
    name: '',
    symbol: '',
    balance: 0,
    supply: 0
  });
  const [tradercpr, setTradercpr] = useState({
    name: '',
    symbol: '',
    balance: 0,
    supply: 0
  });
  const [cprrd, setCprrd] = useState({
    name: '',
    symbol: '',
    balance: 0,
    supply: 0
  });
  const [wallet, setWallet] = useState('');
  

  const getBalanceData = async () => {
    const web3 = new Web3(params.goerli.url);
    const contract = new web3.eth.Contract(JSON.parse(params.goerli.jabi), params.goerli.cpr_contract_address);
    const walletAddress = params.goerli.my_address;

    try {
      const result = await contract.methods.balanceOf(walletAddress).call();
      const cName = await contract.methods.name().call();
      const cSymbol = await contract.methods.symbol().call();
      const cSupply = await contract.methods.totalSupply().call();
      setCpr({
        name: cName,
        symbol: cSymbol,
        balance: result.toString(),
        supply: cSupply.toString()
      });
      const cprJSON = JSON.stringify({
        name: cName,
        symbol: cSymbol,
        balance: result.toString(),
        supply: cSupply.toString()
      });
      localStorage.setItem('cpr', cprJSON);
    } catch (error) {
      console.error('Erro ao buscar saldo:', error);
    }
  };

  const getTraderCprData = async () => {
    const web3 = new Web3(params.goerli.url);
    const contract = new web3.eth.Contract(JSON.parse(params.goerli.jabi), params.goerli.cpr_contract_address);
    const walletAddress = params.goerli.address_trader;

    try {
      const result = await contract.methods.balanceOf(walletAddress).call();
      const cName = await contract.methods.name().call();
      const cSymbol = await contract.methods.symbol().call();
      const cSupply = await contract.methods.totalSupply().call();
      setTradercpr({
        name: cName,
        symbol: cSymbol,
        balance: result.toString(),
        supply: cSupply.toString()
      });
      const tradercprJSON = JSON.stringify({
        name: cName,
        symbol: cSymbol,
        balance: result.toString(),
        supply: cSupply.toString()
      });
      localStorage.setItem('tradercpr', tradercprJSON);
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
      const cSupply = await contract.methods.totalSupply().call();
      setFertilizante({
        name: cName,
        symbol: cSymbol,
        balance: result.toString(),
        supply: cSupply.toString()
      });
    } catch (error) {
      console.error('Erro ao buscar saldo:', error);
    }
  };

  const getRealDigitalData = async () => {
    const web3 = new Web3(params.goerli.url);
    const contract = new web3.eth.Contract(JSON.parse(params.goerli.rd_abi), params.goerli.rd_contract);
    const walletAddress = params.goerli.address_trader;

    try {
      const result = await contract.methods.balanceOf(walletAddress).call();
      const cName = await contract.methods.name().call();
      const cSymbol = await contract.methods.symbol().call();
      const cSupply = await contract.methods.totalSupply().call();
      setRealDigital({
        name: cName,
        symbol: cSymbol,
        balance: result.toString(),
        supply: cSupply.toString()
      });
    } catch (error) {
      console.error('Erro ao buscar saldo:', error);
    }
  };

  const getCprRealDigitalData = async () => {
    const web3 = new Web3(params.goerli.url);
    const contract = new web3.eth.Contract(JSON.parse(params.goerli.rd_abi), params.goerli.rd_contract);
    const walletAddress = params.goerli.my_address;

    try {
      const result = await contract.methods.balanceOf(walletAddress).call();
      const cName = await contract.methods.name().call();
      const cSymbol = await contract.methods.symbol().call();
      const cSupply = await contract.methods.totalSupply().call();
      setCprrd({
        name: cName,
        symbol: cSymbol,
        balance: result.toString(),
        supply: cSupply.toString()
      });
    } catch (error) {
      console.error('Erro ao buscar saldo:', error);
    }
  };

  useEffect(() => {
    if (!expectedProfiles.includes(profile)) {
      navigate('/404');
    }
    getBalanceData();
    getFertilizanteData();
    getRealDigitalData();
    getTraderCprData();
    getCprRealDigitalData();

    localStorage.setItem('profile', profile);
    
    if (profile == 'cpr') {
        localStorage.setItem('wallet', params.goerli.my_address);
        setWallet(params.goerli.my_address);
    } 

    if (profile == 'supplier') {
        localStorage.setItem('wallet', params.mumbai.my_address);
        setWallet(params.mumbai.my_address);
    }

    if (profile == 'trader') {
        localStorage.setItem('wallet', params.goerli.address_trader);
        setWallet(params.goerli.address_trader);
    }
  }, [profile, navigate]);

  if (!expectedProfiles.includes(profile)) {
    return null;
  }

  const previousPage = {
    title: 'Onboarding',
    url: '/onboarding',
  };

  const handleItem = (param, fertilizante) => {
    const fertilizanteJSON = JSON.stringify(fertilizante);
    localStorage.setItem('fertilizante', fertilizanteJSON);
    navigate('/approve-offer/' + param);
  }

  return (
    <>
    <Container>
        <NavbarExtend wallet={wallet} profile={profile} />
        <GenericBreadcrumb currentPage="Marketplace" previousPage={previousPage} />
        <FundsInfo profile={profile} cpr={cpr} fertilizante={fertilizante} rd={realDigital} tradercpr={tradercpr} cprrd={cprrd} />
        
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
                                    <BarterTabs fertilizante={fertilizante} cpr={cpr} />
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
                                <div onClick={() => handleItem('milho-cpr', cpr)} className="m-tabs-item py-3 d-flex align-items-start gap-3">
                                <i className="link-icon bi bi-chevron-right"></i>
                                <div className="m-tabs-item-media">
                                    <img src="https://agristore.com/image/cache/catalog/Di%20Solo/milho-ipanema-20-kg-1200x1200.png" alt="" className="rounded img-fluid" />
                                </div>
                                <div className="m-tabs-item-info">
                                    <h4 className="m-tabs-item-title mb-3 text-uppercase fw-bold">{cpr?.name}</h4>
                                    <div className="m-tabs-item-cripto mb-3">
                                    <div className="m-tabs-item-cripto-value d-flex align-items-center gap-2">
                                        <div className="d-flex align-items-center gap-2">
                                        <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="32" alt="" />
                                        </div>
                                        <div className='d-flex flex-column'>
                                        <span className="text-muted fw-semibold">{cpr?.symbol}</span>
                                        <span className="fs-6">{parseInt(cpr?.balance).toFixed(2)}</span>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="m-tabs-item-value">
                                        <small className="fw-semibold text-muted">
                                            Valor convertido para real digital
                                        </small>
                                        <p className='m-0'>
                                            {formatCurrency(parseInt(cpr?.balance) * 0.02)}
                                        </p>
                                    </div>
                                </div>
                                </div> {/* item 1 ends here */}
                            </div>

                            <div className="divider d-md-none"><hr /></div>

                            {/* <div className="col-12 col-md-3 col-lg-4">
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
                                </div>
                            </div> */}
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
                                    <CPRTabs cpr={cpr} />
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
