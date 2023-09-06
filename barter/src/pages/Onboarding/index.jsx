import React, { useState } from "react";
import { Container } from "./styles";
import { Link } from "react-router-dom";


export const Onboarding = () => {

  const [selectedValue, setSelectedValue] = useState(""); // Estado para armazenar o valor selecionado

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    console.log("OKOKO", event);
  };
  
  return (
    <>
    <Container>
      <div className="container h-100">
        <div className="row justify-content-center  h-100">
          <div className="col-lg-8 h-100">  
            <article class="pt-1 pb-4">
              <div className="o-content py-3">
                <div className="page-title">Onboarding</div>
                <p className="fw-semibold mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sit aspernatur aperiam odit harum, tempora atque, distinctio, repellendus ad facere voluptates fuga possimus neque aliquid iste amet. Provident, assumenda cum?</p>

                <ul className="o-navigation">
                  <li>
                    <div>
                      <img src="https://via.placeholder.com/60" width="60" alt="" />
                      <span className="ms-2 fw-semibold">Sou proprietário de CPR</span>
                    </div>
                    <div className="o-navigation-radio">
                      <input type="radio" name="onboarding-type" value="/cpr" />
                    </div>
                  </li>
                  <li>
                    <div>
                      <img src="https://via.placeholder.com/60" width="60" alt="" />
                      <span className="ms-2 fw-semibold">Quero fornecer produtos</span>
                    </div>
                    <div className="o-navigation-radio">
                      <input type="radio" name="onboarding-type" value="/supplier" />
                    </div>
                  </li>
                  <li>
                    <div>
                      <img src="https://via.placeholder.com/60" width="60" alt="" />
                      <span className="ms-2 fw-semibold">Sou trader</span>
                    </div>
                    <div className="o-navigation-radio">
                      <input type="radio" name="onboarding-type" value="/trader" />
                    </div>
                  </li>
                </ul>
              </div>
                
              <div className="o-footer">
                <Link to="/" class="btn fw-semibold text-muted btn-sm px-0">Início</Link>
                <Link to="/validate" class="btn btn-sm btn-default">Continuar</Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </Container>
    </>
  );
};
