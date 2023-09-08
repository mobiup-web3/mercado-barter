import { Container, TabsContent } from './styles';
import { useNavigate } from "react-router-dom";

const BarterTabs = () => {
  const navigate = useNavigate();

  const handleItem = (param) => {
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
        <div className="m-tabs-content card rounded-0 mt-3">
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade" id="list-one-barter" role="tabpanel" aria-labelledby="list-home-list">

                  <div class="container">
                    <div className="row">
                      <div className="col-12 col-md-3 col-lg-4">
                        <div onClick={() => handleItem('eclipse-cross-hipe')} className="m-tabs-item py-3 d-flex align-items-start gap-3">
                          <i className="link-icon bi bi-chevron-right"></i>
                          <div className="m-tabs-item-media">
                            <img src="https://cdn.motor1.com/images/mgl/3WWyL6/s1/mitsubishi-eclipse-cross-hpe-s-awc-2023.jpg" alt="" className="rounded img-fluid" />
                          </div>
                          <div className="m-tabs-item-info">
                            <h4 className="m-tabs-item-title mb-3 text-uppercase fw-bold">Eclipse Cross Hipe</h4>
                            <div className="m-tabs-item-value mb-3"><span>R$ 210.990,00</span></div>
                            <div className="m-tabs-item-cripto">
                              <div className="m-tabs-item-cripto-value d-flex align-items-center gap-2 mb-2">
                                <div className="d-flex align-items-center gap-2">
                                  <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="22" alt="" />
                                  CPRCOFEE01
                                </div>
                                <span>959,045455</span>
                              </div>
                              <div className="m-tabs-item-cripto-value d-flex align-items-center gap-2">
                                <div className="d-flex align-items-center gap-2">
                                  <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="22" alt="" />
                                  CPRMIL01
                                </div>
                                <span>959,045455</span>
                              </div>
                            </div>
                          </div>
                        </div> {/* veiculo 1 ends here */}
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
                            <div className="m-tabs-item-value mb-3"><span>R$ 210.990,00</span></div>
                            <div className="m-tabs-item-cripto">
                              <div className="m-tabs-item-cripto-value d-flex align-items-center gap-2 mb-2">
                                <div className="d-flex align-items-center gap-2">
                                  <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="22" alt="" />
                                  CPRCOFEE01
                                </div>
                                <span>959,045455</span>
                              </div>
                              <div className="m-tabs-item-cripto-value d-flex align-items-center gap-2">
                                <div className="d-flex align-items-center gap-2">
                                  <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="22" alt="" />
                                  CPRMIL01
                                </div>
                                <span>959,045455</span>
                              </div>
                            </div>
                          </div>
                        </div> {/* veiculo 1 ends here */}
                      </div>
                    

                    </div>
                  </div>

                </div>
                <div className="tab-pane fade show active" id="list-two-barter" role="tabpanel" aria-labelledby="list-profile-list">
                  
                  <div class="container">
                    <div className="row">
                      <div className="col-12 col-md-3 col-lg-4">
                        <div onClick={() => handleItem('rootex-fertilizante')} className="m-tabs-item py-3 d-flex align-items-start gap-3">
                          <i className="link-icon bi bi-chevron-right"></i>
                          <div className="m-tabs-item-media">
                            <img src="https://http2.mlstatic.com/D_NQ_NP_970839-MLU69446511865_052023-O.webp" alt="" className="rounded img-fluid" />
                          </div>
                          <div className="m-tabs-item-info">
                            <h4 className="m-tabs-item-title mb-3 text-uppercase fw-bold">Rootex Fertilizante</h4>
                            <div className="m-tabs-item-value mb-3"><span>R$ 210.990,00</span></div>
                            <div className="m-tabs-item-cripto">
                              <div className="m-tabs-item-cripto-value d-flex align-items-center gap-2 mb-2">
                                <div className="d-flex align-items-center gap-2">
                                  <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="22" alt="" />
                                  COFFBR
                                </div>
                                <span>959,045455</span>
                              </div>
                              <div className="m-tabs-item-cripto-value d-flex align-items-center gap-2">
                                <div className="d-flex align-items-center gap-2">
                                  <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="22" alt="" />
                                  COFFBR
                                </div>
                                <span>959,045455</span>
                              </div>
                            </div>
                          </div>
                        </div> {/* item 1 ends here */}
                      </div>

                      <div className="divider d-md-none"><hr /></div>

                      <div className="col-12 col-md-3 col-lg-4">
                        <div onClick={() => handleItem('rootex-fertilizante')} className="m-tabs-item py-3 d-flex align-items-start gap-3">
                          <i className="link-icon bi bi-chevron-right"></i>
                          <div className="m-tabs-item-media">
                            <img src="https://http2.mlstatic.com/D_NQ_NP_970839-MLU69446511865_052023-O.webp" alt="" className="rounded img-fluid" />
                          </div>
                          <div className="m-tabs-item-info">
                            <h4 className="m-tabs-item-title mb-3 text-uppercase fw-bold">Rootex Fertilizante</h4>
                            <div className="m-tabs-item-value mb-3"><span>R$ 210.990,00</span></div>
                            <div className="m-tabs-item-cripto">
                              <div className="m-tabs-item-cripto-value d-flex align-items-center gap-2 mb-2">
                                <div className="d-flex align-items-center gap-2">
                                  <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="22" alt="" />
                                  COFFBR
                                </div>
                                <span>959,045455</span>
                              </div>
                              <div className="m-tabs-item-cripto-value d-flex align-items-center gap-2">
                                <div className="d-flex align-items-center gap-2">
                                  <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="22" alt="" />
                                  COFFBR
                                </div>
                                <span>959,045455</span>
                              </div>
                            </div>
                          </div>
                        </div> {/* item 2 ends here */}
                      </div>
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