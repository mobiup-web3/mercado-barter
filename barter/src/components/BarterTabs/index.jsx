import {Container, TabsContent} from './styles';
import {useNavigate} from "react-router-dom";
import { formatCurrency } from "../../utils/utils"

const BarterTabs = ({fertilizante}) => {
    const navigate = useNavigate();

    const handleItem = (param, fertilizante) => {
      const fertilizanteJSON = JSON.stringify(fertilizante);
      localStorage.setItem('fertilizante', fertilizanteJSON);
      navigate('/item/' + param);
    }

    return (
        <>
            <Container className="container">
                <div className="m-tabs-menu">
                    <div className="list-group list-group-horizontal" id="list-tab-barter" role="tablist">
                        <a className="list-group-item list-group-item-action" id="list-one-list" data-bs-toggle="list" href="#list-one-barter" role="tab" aria-controls="list-home">Veículos</a>
                        <a className="list-group-item list-group-item-action active" id="list-two-list-barter" data-bs-toggle="list" href="#list-two-barter" role="tab" aria-controls="list-profile">Fertilizantes</a>
                        <a className="list-group-item list-group-item-action" id="list-three-list-barter" data-bs-toggle="list" href="#list-three-barter" role="tab" aria-controls="list-messages">Fertilizantes</a>
                        <a className="list-group-item list-group-item-action" id="list-four-list-barter" data-bs-toggle="list" href="#list-four-barter" role="tab" aria-controls="list-messages">Fertilizantes</a>
                        <a className="list-group-item list-group-item-action" id="list-five-list-barter" data-bs-toggle="list" href="#list-five-barter" role="tab" aria-controls="list-messages">Fertilizantes</a>
                    </div>
                </div>
            </Container>
            <TabsContent>
                <div className="m-tabs-content caR$ rounded-0 mt-3">
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade" id="list-one-barter" role="tabpanel" aria-labelledby="list-home-list">

                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-md-3 col-lg-4">
                                        <div onClick={
                                                () => handleItem('eclipse-cross-hipe')
                                            }
                                            className="m-tabs-item py-3 d-flex align-items-start gap-3">
                                            <i className="link-icon bi bi-chevron-right"></i>
                                            <div className="m-tabs-item-media">
                                                <img src="https://cdn.motor1.com/images/mgl/3WWyL6/s1/mitsubishi-eclipse-cross-hpe-s-awc-2023.jpg" alt="" className="rounded img-fluid"/>
                                            </div>
                                            <div className="m-tabs-item-info">
                                                <h4 className="m-tabs-item-title mb-3 text-uppercase fw-bold">Eclipse Cross Hipe</h4>
                                                <div className="m-tabs-item-cripto mb-3">
                                                    <div className="m-tabs-item-cripto-value d-flex align-items-center gap-2">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="32" alt=""/>
                                                        </div>
                                                        <div className='d-flex flex-column'>
                                                            <span className="text-muted fw-semibold">CPRMIL01</span>
                                                            <span className="fs-6">959.045455</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="m-tabs-item-value">
                                                    <small className="fw-semibold text-muted">Valor convertido para real digital</small>
                                                    <p className='m-0'>R$ 210.990,00</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* veiculo 1 ends here */} </div>

                                    <div className="divider d-md-none"><hr/></div>

                                    <div className="col-12 col-md-3 col-lg-4">
                                        <div onClick={
                                                () => handleItem('eclipse-cross-hipe')
                                            }
                                            className="m-tabs-item py-3 d-flex align-items-start gap-3">
                                            <i className="link-icon bi bi-chevron-right"></i>
                                            <div className="m-tabs-item-media">
                                                <img src="https://cdn.motor1.com/images/mgl/3WWyL6/s1/mitsubishi-eclipse-cross-hpe-s-awc-2023.jpg" alt="" className="rounded img-fluid"/>
                                            </div>
                                            <div className="m-tabs-item-info">
                                                <h4 className="m-tabs-item-title mb-3 text-uppercase fw-bold">Eclipse Cross Hipe</h4>
                                                <div className="m-tabs-item-cripto mb-3">
                                                    <div className="m-tabs-item-cripto-value d-flex align-items-center gap-2">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="32" alt=""/>
                                                        </div>
                                                        <div className='d-flex flex-column'>
                                                            <span className="text-muted fw-semibold">CPRMIL01</span>
                                                            <span className="fs-6">959.045455</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="m-tabs-item-value">
                                                    <small className="fw-semibold text-muted">Valor convertido para real digital</small>
                                                    <p className='m-0'>R$ 210.990,00</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* veiculo 1 ends here */} </div>


                                </div>
                            </div>

                        </div>
                        <div className="tab-pane fade show active" id="list-two-barter" role="tabpanel" aria-labelledby="list-profile-list">

                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-md-3 col-lg-4">
                                        <div onClick={
                                                () => handleItem('ureia-fertilizante', fertilizante)
                                            }
                                            className="m-tabs-item py-3 d-flex align-items-start gap-3">
                                            <i className="link-icon bi bi-chevron-right"></i>
                                            <div className="m-tabs-item-media">
                                                <img src="https://http2.mlstatic.com/D_NQ_NP_970839-MLU69446511865_052023-O.webp" alt="" className="rounded img-fluid"/>
                                            </div>
                                            <div className="m-tabs-item-info">
                                                <h4 className="m-tabs-item-title mb-3 text-uppercase fw-bold">{fertilizante?.name}</h4>
                                                <div className="m-tabs-item-cripto mb-3">
                                                    <div className="m-tabs-item-cripto-value d-flex align-items-center gap-2">
                                                        <div className="d-flex align-items-center gap-2">
                                                            <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="32" alt=""/>
                                                        </div>
                                                        <div className='d-flex flex-column'>
                                                            <span className="text-muted fw-semibold">{fertilizante?.symbol}</span>
                                                            <span className="fs-6">{parseInt(fertilizante?.balance).toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="m-tabs-item-value">
                                                    <small className="fw-semibold text-muted">Valor convertido para real digital</small>
                                                    <p className='m-0'>R$ {formatCurrency(fertilizante?.balance * 0.35)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* item 1 ends here */} </div>

                                    <div className="divider d-md-none"><hr/></div>
                                </div>
                            </div>

                        </div>
                        <div className="tab-pane fade" id="list-three-barter" role="tabpanel" aria-labelledby="list-messages-list">...</div>
                        <div className="tab-pane fade" id="list-four-barter" role="tabpanel" aria-labelledby="list-messages-list">...</div>
                        <div className="tab-pane fade" id="list-five-barter" role="tabpanel" aria-labelledby="list-messages-list">...</div>
                    </div>
                </div>
            </TabsContent>
        </>
    );
};

export default BarterTabs
