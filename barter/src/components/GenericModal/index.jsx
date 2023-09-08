import React from 'react';
import Modal from 'react-bootstrap/Modal';

const GenericModal = ({
  show,
  handleClose,
  title,
  children,
  centered,
  size = "",
  backdrop = "",
  keyboard = false
}) => {

  return (
    <Modal show={show} onHide={handleClose} centered={centered} backdrop={backdrop} keyboard={keyboard} size={size}>
        <div className="modal-header border-0 d-flex align-items-center">
          <h3 className="m-0 fw-semibold">{title}</h3>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
        </div>
        <div className="modal-body py-4 pt-0 d-grid gap-3 rounded-bottom">
          {children}
        </div>
    </Modal>
  );
};

export default GenericModal;
