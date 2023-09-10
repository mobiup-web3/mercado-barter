import { Link } from "react-router-dom";
import { NavbarContainer } from './styles';

import Logo from "../../assets/img/logo.png";

const Navbar = ({wallet, profile}) => {
  console.log("wallet", wallet, profile);
  if (wallet == undefined) {
    wallet = '0x000000000000000000000';
  }

  return (
    <NavbarContainer>
        <header className="header py-3">
          <div className="container-fluid">
            <div className="row align-items-center justify-content-center">
              <div className="col-auto col-lg-4">
                <div className="h-content-first d-flex justify-content-center">
                  <div className="h-logo">
                  <img src={ Logo } width="220" alt="Mercado Barter" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
    </NavbarContainer>
  );
};

export default Navbar