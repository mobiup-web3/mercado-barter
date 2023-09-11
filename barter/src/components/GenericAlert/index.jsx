import React from 'react';
import { Container } from './styles';
import { Link, useNavigate } from 'react-router-dom';

function GenericAlert({
    type,
    icon,
    title,
    product,
    description,
    showButton=false,
    textButton="Visualizar Oferta",
    linkButton
}) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(linkButton);
    }

  return (
    <Container>
        <div className="container">
            <div className="row justify-content-center mt-3">
                <div className="col-lg-7">
                    <div className={`card h-100 position-relative generic-alert py-3 px-4 px-md-5 d-flex align-items-center gap-3 gap-md-5 border-${type}`} onClick={handleNavigate}>
                        <div className="generic-alert-icon text-center">
                            <div className="d-flex align-items-center h-100">
                                <i className={`bi bi-${icon} text-${type}`}></i>
                            </div>
                        </div>
                        <div className="generic-alert-content">
                            <h4 className="fw-semibold">{title} <strong>{product}</strong></h4>
                            <p className="m-0 small">{description}</p>
                            {showButton && (
                                <div className="mt-3">
                                    <Link to={linkButton} className="btn btn-default btn-sm">{textButton}</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default GenericAlert