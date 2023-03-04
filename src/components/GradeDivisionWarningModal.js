import React from "react";
import { Modal, Button } from "react-bootstrap";
import WarningIcon from "../assets/img/icons/warning-icon.svg"

const GradeDivisionWarningModal = (props) => {
  return (
    <React.Fragment>
      <Modal show={true} onHide={() => props.closeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Grade Division Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2">
          <div className="w-100 d-flex align-items-center justify-content-center">
          <img src={WarningIcon} className="mr-2" width="35" />
            <h2 className="mb-1 text-4">
            Please select at least one grade to manage the division(s)
            </h2>
          </div>
          <div className="d-flex justify-content-end mt-4">
          <Button className="mr-2 px-4 btn btn-dark"  variant="primary" onClick={()=> props.closeModal(false)}>Ok</Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default GradeDivisionWarningModal;
