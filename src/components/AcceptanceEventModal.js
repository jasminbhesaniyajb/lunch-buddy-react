import React from "react";
import { Modal, Button } from "react-bootstrap";

const AcceptanceEventModal = (props) => {
  return (
    <React.Fragment>
      <Modal show={true} onHide={() => props.closeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Acceptance Event</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2">
          <div className="text-center w-100">
            {props.pathVariable=="school" &&
              <h2 className="mb-1 text-4">
              You are about to submit "{props.eventName}" event for restaurant acceptance. 
              Would you like to proceed further?
              </h2>
            }
            {props.pathVariable=="restaurant" &&
              <h2 className="mb-1 text-4">
              You are about to accept "{props.eventName}". 
              Would you like to proceed further?
              </h2>
            }
          </div>
          <div className="d-flex justify-content-end mt-4">
          <Button className="mr-2 px-4 btn btn-dark"  variant="primary" onClick={()=> props.acceptanceEventItem() }>Yes</Button>
          <Button className="px-4" onClick={()=> props.closeModal(false)} variant="danger">No</Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default AcceptanceEventModal;
