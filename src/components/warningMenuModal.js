import React from "react";
import { Modal, Button } from "react-bootstrap";
import WarningIcon from "../assets/img/icons/warning-icon.svg"

const WarningMenuModal = (props) => {
  return (
    <React.Fragment>
      <Modal show={true} onHide={() => props.closeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2">
          <div className="w-100 d-flex align-items-center justify-content-center">
          <img src={WarningIcon} className="mr-2" width="35" />
            {props.newAllergence.length==0 && props.nutrition_data==0 && props.recordData.id_product_category!=4 ?
              <h2 className="mb-0 text-4">
              You have not entered Allergens and NV for this item.
              </h2>
            :
            props.newAllergence.length==0 ?
              <h2 className="mb-0 text-4">
              You have not entered Allergens for this item.
              </h2>
            :
            props.nutrition_data==0 && props.recordData.id_product_category!=4 && 
              <h2 className="mb-0 text-4">
              You have not entered NV for this item.
              </h2>
            }
          </div>
          <div className="d-flex justify-content-end mt-4">
          <Button className="mr-2 px-4 btn btn-dark"  variant="primary" onClick={()=> props.checkAPICall(props.recordData)}>Ok</Button>
          <Button className="px-4" onClick={()=> props.closeModal(false)} variant="danger">Cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default WarningMenuModal;
