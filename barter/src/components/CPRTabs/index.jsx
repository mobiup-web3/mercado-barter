import React, { useState } from "react";
import { TabsContent } from "./styles";
import { useNavigate } from "react-router-dom";
import GenericModal from "../GenericModal";
import copyToClipboard from '../../utils/clipboard.js';


const CPRTabs = () => {
  const navigate = useNavigate();
  const [icon, setIcon] = useState('bi bi-clipboard');
  const [copyMessage, setCopyMessage] = useState('');
  const [pix, setPix] = useState(false);

  const handleItem = (param) => {
    navigate('/item/' + param);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  }

  const handleShow = () => {
    setShow(true);
    setTimeout(() => {
      setPix(true);
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

  return (
    <>
      <TabsContent>
        <div className="m-tabs-content card rounded-0 mt-3">
          <div className="container">
            <div className="row">

              <div className="col-12 col-md-3 col-lg-4">
                <div onClick={handleShow} className="m-tabs-item py-3 d-flex align-items-start gap-3">
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

              <div className="divider d-md-none"><hr /></div>

              <div className="col-12 col-md-3 col-lg-4">
                <div onClick={handleShow} className="m-tabs-item py-3 d-flex align-items-start gap-3">
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

            </div>
          </div>
        </div>
      </TabsContent>
      <GenericModal
        show={show}
        handleClose={handleClose}
        title="Comprar CPR"
        centered={true}
        size="md"
        backdrop="static"
        keyboard={false}
      >
        <div className="pay-qrcode-logo mt-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo%E2%80%94pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.svg/1024px-Logo%E2%80%94pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.svg.png" alt="Logo PIX" width="110" className="img-fluid d-block mx-auto" />
        </div>
        <div className="i-resume-checkout d-flex align-items-center gap-2 mb-3">
          <img className="img-fluid rounded-1" width="60" src="https://stonoex.mobiup.io/assets/img/cofbr.svg" alt="{itemData.name}" />
          <div className="d-flex flex-column">
            <span className="fw-semibold">CPRMIL01</span>
            016/2016 Produto: Milho em grãos
          </div>
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
      </GenericModal>
    </>
  );
};

export default CPRTabs