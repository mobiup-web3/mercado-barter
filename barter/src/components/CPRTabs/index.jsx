import { TabsContent } from './styles';
import { useNavigate } from "react-router-dom";

const CPRTabs = () => {
  const navigate = useNavigate();

  const handleItem = (param) => {
    navigate('/item/' + param);
  }

  return (
    <>
      <TabsContent>
        <div className="m-tabs-content card rounded-0 mt-3">
          <div class="container">
            <div className="row">
              <div className="col-12 col-md-3 col-lg-4">
                <div onClick={() => handleItem('cprcofee01')} className="m-tabs-item py-3 d-flex align-items-start gap-3">
                  <i className="link-icon bi bi-chevron-right"></i>
                  <div className="m-tabs-item-info">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex gap-2 align-items-center mb-3">
                        <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="22" alt="" />
                        <h4 className="m-tabs-item-title text-uppercase fw-bold m-0">CPRCOFEE01</h4>
                      </div>
                      <div>
                        <i className="bi bi-arrow-up-circle-fill me-2"></i>
                        <span>2,36%</span>
                      </div>
                    </div>
                    <div className="m-tabs-item-info">
                      <p>016/2016 Produto: Milho em grãos</p>
                      <p>Quantidade: 30.000 sacas</p>
                      <p>Total disponível de tokens: 14.000</p>
                      <p>Preço por token: R$ 16,88</p>
                      <p>Potencial de crescimento: 22% a.a</p>
                    </div>
                  </div>
                </div> {/* veiculo 1 ends here */}
              </div>

              <div className="divider d-md-none"><hr /></div>

              <div className="col-12 col-md-3 col-lg-4">
                <div onClick={() => handleItem('cprmil01')} className="m-tabs-item py-3 d-flex align-items-start gap-3">
                  <i className="link-icon bi bi-chevron-right"></i>
                  <div className="m-tabs-item-info">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex gap-2 align-items-center mb-3">
                        <img src="https://stonoex.mobiup.io/assets/img/cofbr.svg" width="22" alt="" />
                        <h4 className="m-tabs-item-title text-uppercase fw-bold m-0">cprmil01</h4>
                      </div>
                      <div>
                        <i className="bi bi-arrow-up-circle-fill me-2"></i>
                        <span>2,36%</span>
                      </div>
                    </div>
                    <div className="m-tabs-item-info">
                      <p>016/2016 Produto: Milho em grãos</p>
                      <p>Quantidade: 80.000 sacas</p>
                      <p>Total disponível de tokens: 78.200</p>
                      {/* <p>Preço por token: R$ 16,88</p> */}
                      <p>Potencial de crescimento: 19% a.a</p>
                    </div>
                  </div>
                </div> {/* veiculo 1 ends here */}
              </div>          

            </div>
          </div>
        </div>
      </TabsContent>
    </>
  );
};

export default CPRTabs