import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Container } from "./styles";
import NavbarExtend from "../../components/NavbarExtend";
import FundsInfo from "../../components/FundsInfo";
import BarterTabs from "../../components/BarterTabs";

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

  return (
    <>
    <Container>
        <NavbarExtend />
        <FundsInfo />
        
        <section className="view mt-5 mb-3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="m-tabs-menu">
                            <div className="list-group list-group-horizontal" id="list-tab" role="tablist">
                                <a className="list-group-item list-group-item-action disabled" aria-disabled="true" id="list-one-list" data-bs-toggle="list" href="#list-one" role="tab" aria-controls="list-home">Compra e Venda</a>
                                <a className="list-group-item list-group-item-action active" id="list-two-list" data-bs-toggle="list" href="#list-two" role="tab" aria-controls="list-profile">Mercado Barter</a>
                                <a className="list-group-item list-group-item-action disabled" aria-disabled="true" id="list-three-list" data-bs-toggle="list" href="#list-three" role="tab" aria-controls="list-messages">Status das Transações</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="view">
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
    </Container>
    </>
  );
};
