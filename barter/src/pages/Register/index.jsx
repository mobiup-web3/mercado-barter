import { useState } from 'react';
import { Container } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import GenericBreadcrumb from '../../components/GenericBreadcrumb';

import Navbar from '../../components/Navbar';

export const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const isValidEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (regex.test(email)) {
      return true;
    }
    return false;
  };
  

  const handleInputChange = (event) => {
    setEmail(event.target.value);
    validateEmail(event.target.value);
  };

  const validateEmail = (inputValue) => {
    if (!inputValue) {
      setError('Por favor, preencha seu endereço de e-mail.');
    } else if (!isValidEmail(inputValue)) {
      setError('Por favor, insira um endereço de e-mail válido.');
    } else {
      setError('');
    }
  };

  const handleSubmit = () => {
    if (!email) {
      setError('Por favor, preencha seu endereço de e-mail.');
    } else if (!isValidEmail(email)) {
      setError('Por favor, insira um endereço de e-mail válido.');
    } else {
      // Se tudo estiver correto, redirecione para a rota /onboarding
      navigate('/onboarding');
    }
  };

  const validationClass = error ? 'is-invalid' : (email ? 'is-valid' : '');

  // const previousPage = {
  //   title: 'Página Anterior',
  //   url: '/pagina-anterior',
  // };

  return (
    <>
      <Container>
        <Navbar />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 px-0">
              <GenericBreadcrumb currentPage="Register" />
            </div>
          </div>
        </div>
        <div className="container h-100">
          <div className="row justify-content-center h-100">
            <div className="col-lg-8 h-100">  
              <article className="pt-1 pb-5">
                <div className="o-content">
                  <div className="page-title">Autenticação</div>
                  <p className="fw-semibold mt-4">Descubra o mundo da negociação de tokens. Compre e venda tokens RWA com facilidade em nossa plataforma segura. Obtenha preços e informações de mercado em tempo real para tomar decisões e maximizar seus investimentos.</p>
                  <div className="o-navigation card">
                    <p className="small">Crie sua conta no Mercado Barter. Vamos criar uma carteira na blockchain utilizando seu endereço de e-mail.</p>
                    <div className="form-floating">
                      <input
                        type="email"
                        name="email"
                        className={`form-control ${validationClass}`}
                        id="floatingInput"
                        placeholder="e.g: name@example.com"
                        value={email}
                        onChange={handleInputChange}
                        onBlur={() => validateEmail(email)}
                      />
                      <label htmlFor="floatingInput">e.g: name@example.com</label>
                      {error && <div className="invalid-feedback">{error}</div>}
                    </div>
                  </div>
                </div>
                <div className="o-footer mt-5">
                  <Link to="/" className="btn fw-semibold text-muted btn-sm px-0">Início</Link>
                  <button onClick={handleSubmit} className="btn btn-sm btn-default">Continuar</button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
