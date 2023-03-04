import React from "react";
import { Modal, Button } from "react-bootstrap";

const TeacherConformationModal = (props) => {
  return (
    <React.Fragment>
      <Modal show={true} onHide={() => props.resetSelection()} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Teacher Conformation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2">
          <div className="text-center w-100">
            <h2 className="mb-1 text-4">
            This teacher has been assigned to Grade Division. Would you like to proceed further?
            </h2>
          </div>
          <div className="d-flex justify-content-end mt-4">
          <Button className="mr-2 px-4 btn btn-dark" variant="primary" onClick={() => props.selectTeacher()}>Yes</Button>
          <Button className="px-4" onClick={()=> props.resetSelection()} variant="danger">No</Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default TeacherConformationModal;
