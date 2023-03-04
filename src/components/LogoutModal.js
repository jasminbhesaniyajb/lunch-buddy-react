import React from "react";
import { Modal, Button } from "react-bootstrap";
import { history } from "../history";

import { toast } from "react-toastify";
const LogoutModal = (props) => {
  
  const handleclick = () => {
      localStorage.removeItem('eb-mums-lunch:loginInfo')
      localStorage.removeItem('eb-mums-lunch:userType')
      localStorage.removeItem('eb-mums-lunch:token')
      props.addMainLoginInfoHandler(null);
      history.push("/");
      toast.success('See You Soon!');
  }
  
  return (
    <React.Fragment>
      <Modal show={true} onHide={() => props.closeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2">
          <div className="text-center w-100">
            <h2 className="mb-1 text-4">
              You are about to logout from the system.<br /> Would you like to proceed
              further?
            </h2>
          </div>
          <div className="d-flex justify-content-end mt-4">
          <Button className="mr-2 px-4 btn btn-dark" onClick={() => handleclick()}  variant="primary">Yes</Button>
          <Button className="px-4" onClick={()=> props.closeModal(false)} variant="danger">No</Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default LogoutModal;
