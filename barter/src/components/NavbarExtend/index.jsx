import { Link } from "react-router-dom";
import { NavbarContainer } from './styles';

import Logo from "../../assets/img/logo.png";
import cprIcon from "../../assets/img/icon/cpr.png";
import supplierIcon from "../../assets/img/icon/supplier.png";
import traderIcon from "../../assets/img/icon/trader.png";

const NavbarExtend = ({wallet, profile}) => {
  let profileIcon = cprIcon;

  if (wallet == undefined) {
    wallet = '0x000000000000000000000';
  }

  if(profile === 'cpr'){
    profileIcon = cprIcon;
  }

  if(profile === 'supplier'){
    profileIcon = supplierIcon;
  }

  if(profile === 'trader'){
    profileIcon = traderIcon;
  }

  return (
    <NavbarContainer>
        <header className="header py-2">
          <div className="container-fluid">
            <div className="row align-items-center justify-content-between">
              <div className="col-6 col-lg-4">
                <div className="h-content-first">
                  <div className="h-logo">
                  <img src={ Logo } width="220" alt="Mercado Barter" className="img-fluid" />
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg">
                <div className="h-content-second d-flex gap-3 justify-content-end align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <img src={ profileIcon } alt="Profile Icon" width="60" className="circle img-fluid" style={{border: '2px solid var(--m-default-color)'}} />
                    <div className="d-flex flex-column small">
                      <span className="fw-semibold text-muted small">Olá {profile == 'cpr' ? 'Agricultor' : profile == 'supplier' ? 'Fornecedor' : 'Trader/Inst. Financeira'}</span>
                      <span className="fw-semibold">{wallet.substring(0, 4)}...{wallet.substring(wallet.length - 4)}</span>
                    </div>
                  </div>
                  <div className="dropdown d-none">
                    <i className="bi bi-gear-fill fs-5 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Perfil</a></li>
                      <li><a className="dropdown-item" href="#">Configurações</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link to="/" className="dropdown-item" href="#">Sair</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
    </NavbarContainer>
  );
};

export default NavbarExtend