import React from "react";
import { Modal, Button } from "react-bootstrap";

const GradesConformationModal = (props) => {
  return (
    <React.Fragment>
      <Modal show={true} onHide={() => props.resetSelection(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Grade Promotion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2">
          <div className="text-center w-100">
            <h2 className="mb-1 text-4">
            You can not promote student(s) to the same grade division! Please select different one.
            </h2>
          </div>
          <div className="d-flex justify-content-end mt-4">
          <Button className="mr-2 px-4 btn btn-dark"  variant="primary" onClick={()=> props.resetSelection(false)}>Ok</Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default GradesConformationModal;
