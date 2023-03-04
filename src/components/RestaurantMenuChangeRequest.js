import React, {useRef, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const RestaurantMenuChangeRequest = (props) => {
  const checkAPICall = (e) => {
    props.menuChangeRequest.change_request_detail=e.change_request_detail
    props.checkAPICall()
  }
  const inputReference = useRef(null);
  const getFocus = () =>{
   inputReference.current && inputReference.current?.focus()
  }

  useEffect(() => {
    setTimeout(() => {
      getFocus();
    }, 1);
  }, []);

  return (
    <React.Fragment>
      <Modal show={true} onHide={() => props.closeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Restaurant Menu Change Request</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2">
        <div>
            <Formik
              enableReinitialize
              initialValues={{
                change_request_detail: "",
              }}
              validationSchema={Yup.object().shape({
                change_request_detail: Yup.string()
                .required("Menu change is reguired")
                .max(5000, "Menu change must be 5000 characters!"),
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
                          name="change_request_detail"
                          autoComplete="off"
                          className={`form-control eb-contact-input material-input h-200 ${
                            errors.change_request_detail &&
                            touched.change_request_detail &&
                            "is-invalid input-box-error"
                          }`}
                          innerRef={inputReference} 
                        />
                        <label className="required textarea-label text-uppercase text-1">
                          Menu Change
                        </label>
                      </div>
                      <ErrorMessage
                        name="change_request_detail"
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
                      Submit
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

export default RestaurantMenuChangeRequest;
