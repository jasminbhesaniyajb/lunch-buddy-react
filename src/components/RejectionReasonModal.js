import React from "react";
import { Modal, Button } from "react-bootstrap";

const RejectionReasonModal = (props) => {
  return (
    <React.Fragment>
      <Modal show={true} onHide={() => props.closeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rejection Reason</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2">
          <div className="text-center w-100">
            <h2 className="mb-1 text-4">{props.rejectionReason}</h2>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <Button
              className="px-4"
              onClick={() => props.closeModal(false)}
              variant="danger"
            >
              cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default RejectionReasonModal;
