import React from "react";
import { Modal, Button } from "react-bootstrap";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const RejectionModal = (props) => {
  const checkAPICall = (e) => {
    props.rejectionId.rejection_reason=e.rejection_reason
    props.checkAPICall()
  }

  return (
    <React.Fragment>
      <Modal show={true} onHide={() => props.closeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rejection</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2">
          <div>
            <Formik
              enableReinitialize
              initialValues={{
                rejection_reason: "",
              }}
              validationSchema={Yup.object().shape({
                rejection_reason: Yup.string()
                .required("Rejection reason is reguired")
                .max(5000, "Rejection reason must be 5000 characters!"),
              })}
              onSubmit={async (fields) => {
                checkAPICall(fields);
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <div className="form-row">
                    <div className="form-group col-lg-12 col-md-12 col-sm-12">
                      <div className="material-textfield">
                        <Field
                          placeholder=" "
                          as="textarea"
                          name="rejection_reason"
                          autoComplete="off"
                          className={`form-control eb-contact-input material-input ${
                            errors.rejection_reason &&
                            touched.rejection_reason &&
                            "is-invalid input-box-error"
                          }`}
                        />
                        <label className="required material-label text-uppercase text-1">
                          Rejection Reason
                        </label>
                      </div>
                      <ErrorMessage
                        name="rejection_reason"
                        component="div"
                        className="field-error text-danger"
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mt-4">
                    <Button
                      type="submit"
                      className="mr-2 px-4 btn btn-dark"
                      variant="primary"
                    >
                      Reject this event
                    </Button>
                    <Button
                      className="px-4"
                      onClick={() => props.closeModal(false)}
                      variant="danger"
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default RejectionModal;
