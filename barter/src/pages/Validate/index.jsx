import React, { useState } from "react";
import { Container } from "./styles";
import { Link } from "react-router-dom";


export const Validate = () => {

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
                <div className="page-title">Validar acesso</div>
                <p className="fw-semibold mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sit aspernatur aperiam odit harum, tempora atque, distinctio, repellendus ad facere voluptates fuga possimus neque aliquid iste amet. Provident, assumenda cum?</p>
                <div className="o-navigation">
                  <p className="m-0">Vamos criar sua carteira na blockchain</p>
                  <div className="form-group mt-3">
                    <input type="text" className="form-control" placeholder="Seu melhor e-mail..." />
                  </div>
                </div>
                
              </div>
                
              <div className="o-footer">
                <Link to="/" class="btn fw-semibold text-muted btn-sm px-0">Início</Link>
                <Link to="" class="btn btn-sm btn-default">Continuar</Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </Container>
    </>
  );
};
