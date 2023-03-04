import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { Formik, Field, Form } from "formik";

import { ACKNOWLEDGE_CHANGE_REQUEST } from "../services/ENDPOINT";

const AcknowledgeThisRequestModal = (props) => {

  const acknowledgeChangeRequest = async (id) => {
    try {
      const payload = {
        id: id,
      };
      const data = await ACKNOWLEDGE_CHANGE_REQUEST(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
    props.closeModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={true}
        onHide={() => props.closeModal(false)}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Menu Change Request Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2">
          <div className="d-flex justify-content-end">
            <span className="link-btn-hover">
              <Link
                to={`/admin/manage-menu?restaurantId=${props.vendorId}`}
                target="_blank"
                className="text-color-primary"
              >
                Restaurant Menu
              </Link>
            </span>
          </div>
          <div className="row mt-2">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h2 className="mb-1 text-4 font-weight-semibold">
                    Restaurant Name:
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h2 className="mb-1 text-4">{props.restaurantName}</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h2 className="mb-1 text-4 font-weight-semibold">
                    Primary Contact Number:
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h2 className="mb-1 text-4">{props.primaryContactNumber}</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h2 className="mb-1 text-4 font-weight-semibold">
                    Email Address:
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h2 className="mb-1 text-4">{props.emailAddress}</h2>
                </div>
              </div>
            </div>
          </div>
          <Formik>
          <Form>
          <div className="form-row mt-4">
            <div className="form-group col-lg-12 col-md-12 col-sm-12">
              <div className="material-textfield">
                <Field
                  placeholder=" "
                  as="textarea"
                  readOnly={true}
                  value={props.changeRequestDetail}
                  autoComplete="off"
                  className={`form-control eb-contact-input material-input`}
                />
                <label className="material-label text-uppercase text-1">
                  Menu Change Request Detail
                </label>
              </div>
            </div>
          </div>
          </Form>
          </Formik>
          <div className="d-flex justify-content-end mt-4">
          {props.addressedDate == null &&
            <Button
              className="px-4 mr-2"
              onClick={() => acknowledgeChangeRequest(props.recordId)}
              variant="primary"
            >
              Acknowledge this request
            </Button>
          }
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

export default AcknowledgeThisRequestModal;
