import React, { useState } from "react";
import { Container } from "./styles";
import { Link, useNavigate } from "react-router-dom";

export const Onboarding = () => {
  const navigate = useNavigate();

  const [selectedValue, setSelectedValue] = useState("");
  const [error, setError] = useState("");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    setError("");
  };

  const handleLiClick = (value) => {
    setSelectedValue(value);
    setError("");
  };

  const handleSubmit = () => {
    if (!selectedValue) {
      setError("Por favor, selecione uma opção.");
    } else {
      navigate(selectedValue);
    }
  };

  return (
    <>
      <Container>
        <div className="container h-100">
          <div className="row justify-content-center  h-100">
            <div className="col-lg-8 h-100">
              <article className="pt-1 pb-4">
                <div className="o-content py-3">
                  <div className="page-title">Onboarding</div>
                  <p className="fw-semibold mt-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eligendi sit aspernatur aperiam odit harum, tempora atque,
                    distinctio, repellendus ad facere voluptates fuga possimus
                    neque aliquid iste amet. Provident, assumenda cum?
                  </p>

                  <ul className="o-navigation card">
                    <li>
                      <label htmlFor="/p/cpr" onClick={() => handleLiClick("/p/cpr")}>
                        <div>
                          <img
                            src="https://via.placeholder.com/60"
                            width="60"
                            alt=""
                          />
                          <span className="ms-2 fw-semibold">
                            Sou proprietário de CPR
                          </span>
                        </div>
                        <div className="o-navigation-radio">
                          <input
                            type="radio"
                            id="/p/cpr"
                            name="onboarding-type"
                            value="/p/cpr"
                            onChange={handleRadioChange}
                            checked={selectedValue === "/p/cpr"}
                          />
                        </div>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="/p/supplier" onClick={() => handleLiClick("/p/supplier")}>
                        <div>
                          <img
                            src="https://via.placeholder.com/60"
                            width="60"
                            alt=""
                          />
                          <span className="ms-2 fw-semibold">
                            Quero fornecer produtos
                          </span>
                        </div>
                        <div className="o-navigation-radio">
                          <input
                            type="radio"
                            id="/p/supplier"
                            name="onboarding-type"
                            value="/p/supplier"
                            onChange={handleRadioChange}
                            checked={selectedValue === "/p/supplier"}
                          />
                        </div>
                      </label>
                    </li>
                    <li>
                      <label htmlFor="/p/trader" onClick={() => handleLiClick("/p/trader")}>
                        <div>
                          <img
                            src="https://via.placeholder.com/60"
                            width="60"
                            alt=""
                          />
                          <span className="ms-2 fw-semibold">Sou trader</span>
                        </div>
                        <div className="o-navigation-radio">
                          <input
                            type="radio"
                            id="/p/trader"
                            name="onboarding-type"
                            value="/p/trader"
                            onChange={handleRadioChange}
                            checked={selectedValue === "/p/trader"}
                          />
                        </div>
                      </label>
                    </li>
                  </ul>
                  {error && (
                    <div className="invalid-feedback d-block">{error}</div>
                  )}
                </div>

                <div className="o-footer">
                  <Link
                    to="/"
                    className="btn fw-semibold text-muted btn-sm px-0"
                  >
                    Início
                  </Link>
                  <button onClick={handleSubmit} className="btn btn-sm btn-default">
                    Continuar
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
