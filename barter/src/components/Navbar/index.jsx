import { NavLink } from 'react-router-dom';
// import Logo from '../../assets/images/logo.svg';

import { NavbarContainer } from './styles';

const Navbar = () => {
  return (
    <NavbarContainer>
          <header className="header w-100">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-6 col-md-auto">
                  <div className="header-brand">
                    <a href="#">
                      <img src="https://via.placeholder.com/68" width="180" className="img-fluid" />
                    </a>
                  </div>
                </div>
                <div className="col-6 col-md-6">
                  <div className="header-navigation">
                    <nav className="navbar navbar-expand-lg">
                      <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                              <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                              </a>
                              <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                              </ul>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
                <div className="d-none d-md-block col-md-auto ms-auto">
                  <div className="header-buttons">
                    icon icon
                  </div>
                </div>


              </div>
            </div>
          </header>
    </NavbarContainer>
  );
};

export default Navbar