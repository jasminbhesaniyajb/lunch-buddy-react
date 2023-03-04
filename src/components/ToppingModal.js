import React, { useEffect, render } from "react";
import { Modal, Button } from "react-bootstrap";

const ToppingModal = (props) => {

  const addTopping = (e, record) => {
    let index;
    if (e.target.checked == true) {
      const recordData = {
        id: record.id,
        product_name: record.product_name,
        freebie_qty: 1,
        checked: e.target.checked
      };
      props.editToppingList(recordData)
    } else {
      const recordData = {
        id: record.id,
        product_name: record.product_name,
        freebie_qty: "",
        checked: e.target.checked
      };
      props.editToppingList(recordData)
    }
  };
  const addToppingQuantity = (e, record) => {
    const tempToppingArrayObject = props.toppingArray.findIndex((arr) => {
      return arr.id == record.id;
    });
    if (record.checked == true) {
      const recordData = {
        id: record.id,
        product_name: record.product_name,
        freebie_qty: e.target.value,
        checked: record.checked
      };
      props.editToppingList(recordData)
    }
  };

  return (
    <React.Fragment>
      <Modal show={true} onHide={() => props.closeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Topping item(s)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-8 col-mg-8 col-sm-8"></div>
            <div className="col-lg-4 col-mg-4 col-sm-4">
              <h3 className="text-4 text-capitalize">Quantity</h3>
            </div>
          </div>
          <div>
            {props.getToppingList.map((item, index) => (
              <div className="row" key={index}>
                <div className="col-lg-8 col-mg-8 col-sm-8">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={"check" + item.id}
                      value={item.id}
                      onChange={(e) => addTopping(e, item)}
                      checked={item.checked}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={"check" + item.id}
                    >
                      {item.product_name}
                    </label>
                  </div>
                </div>
                <div className="col-lg-4 col-mg-4 col-sm-4">
                  <div className="form-group">
                      <input
                        type="number"
                        min="0"
                        max="50"
                        // defaultValue="1"
                        placeholder=" "
                        name={item.nutritional_name}
                        id={"qty" + item.id}
                        autoComplete="off"
                        className={`form-control eb-contact-input h-3em`}
                        onChange={(e) => addToppingQuantity(e, item)}
                        value={item.freebie_qty}
                      />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-end mt-4">
            <Button
              className="mr-2 px-4 btn btn-dark"
              onClick={() => props.submitTopping()}
              variant="primary"
            >
              Ok
            </Button>
            <Button
              className="px-4"
              onClick={() => props.closeModal(false)}
              variant="danger"
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ToppingModal;
