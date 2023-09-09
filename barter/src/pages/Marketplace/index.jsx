import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Container } from "./styles";
import { TabsContent } from "../../components/BarterTabs/styles";
import NavbarExtend from "../../components/NavbarExtend";
import FundsInfo from "../../components/FundsInfo";
import BarterTabs from "../../components/BarterTabs";
import CPRTabs from "../../components/CPRTabs";
import GenericBreadcrumb from "../../components/GenericBreadcrumb";

export const Marketplace = () => {
  const { profile } = useParams();
  const navigate = useNavigate();

  const expectedProfiles = ['cpr', 'supplier', 'trader'];

  useEffect(() => {
    if (!expectedProfiles.includes(profile)) {
      navigate('/404');
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
        <NavbarExtend />
        <GenericBreadcrumb currentPage="Marketplace" previousPage={previousPage} />
        <FundsInfo profile={profile} />
        
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
                                    <BarterTabs />
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
                                        <span class="fs-6">15.045</span>
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
                                        <span class="fs-6">959.045455</span>
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
