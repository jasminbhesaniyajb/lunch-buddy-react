import React, { useState, useEffect,useRef } from "react";
import { Modal, Button } from "react-bootstrap";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { GET_PROVINCE } from "../services/ENDPOINT";

const AddMasterModal = (props) => {
  const { t } = useTranslation();
  const [province, setProvince] = useState([]);

  const checkAPICall = (e) => {
    if (props.title == "Cities") {
      props.addMasterId.id_province = e.id_province || null;
      props.addMasterId.item_name = e.item_name;
      props.checkAPICall(props.title);
    } else {
      props.addMasterId.item_name = e.item_name;
      props.checkAPICall(props.title);
    }
  };

  const getAllProvince = async () => {
    if (props.title == "Cities") {
      try {
        const data = await GET_PROVINCE();
        if (data.code === 200 || data.code === "200") {
          setProvince(data.data);
        }
      } catch ({ data }) {
        toast.error(data.message);
      }
    }
  };
  useEffect(() => {
    getAllProvince();
  }, []);

  const inputReference = useRef(null);
  const getFocus = () =>{
   inputReference.current && inputReference.current?.focus()
  }

  useEffect(() => {
   setTimeout(() => {
      getFocus();
    }, 1000);
  }, [])

  return (
    <React.Fragment>
      <Modal show={true} onHide={() => props.closeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.title == "Payment Frequencies"
              ? "Payment Frequency"
              : props.title == "Cities"
              ? "City"
              : props.title.slice(0, -1)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2">
          <div>
            {props.title == "Cities" ? (
              <Formik
                enableReinitialize
                initialValues={{
                  id_province: props.addMasterId.id_province || "",
                  item_name: props.addMasterId.item_name || "",
                }}
                validationSchema={Yup.object().shape({
                  id_province: Yup.string().required(
                    t("restaurantValidationProvinceRequired")
                  ),
                  item_name: Yup.string()
                  .required(props.title == "Cities" ? "City is required" : " "),
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
                            as="select"
                            name="id_province"
                            autoComplete="off"
                            className={`form-control eb-contact-input material-input h-3em ${
                              errors.id_province &&
                              touched.id_province &&
                              "is-invalid input-box-error"
                            }`}
                            value={values.id_province}
                            innerRef={inputReference} 
                          >
                            <option value="">select</option>
                            {province.map(({ id, province_name }, index) => (
                              <option value={id} key={index}>
                                {province_name}
                              </option>
                            ))}
                          </Field>
                          <label className="required material-label text-uppercase text-1">
                            {t("restaurantProvince")}
                          </label>
                        </div>
                        <ErrorMessage
                          name="id_province"
                          component="div"
                          className="field-error text-danger"
                        />
                      </div>
                      <div className="form-group col-lg-12 col-md-12 col-sm-12">
                        <div className="material-textfield">
                          <Field
                            placeholder=" "
                            name="item_name"
                            autoComplete="off"
                            className={`form-control eb-contact-input material-input ${
                              errors.item_name &&
                              touched.item_name &&
                              "is-invalid input-box-error"
                            }`}
                            value={values.item_name}
                          />
                          <label className="required material-label text-uppercase text-1">
                            {props.title == "Payment Frequencies"
                              ? "Payment Frequency"
                              : props.title == "Cities"
                              ? "City"
                              : props.title.slice(0, -1)}
                          </label>
                        </div>
                        <ErrorMessage
                          name="item_name"
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
                        Save
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
            ) : (
              <Formik
                enableReinitialize
                initialValues={{
                  item_name: props.addMasterId.item_name || "",
                }}
                validationSchema={Yup.object().shape({
                  item_name: Yup.string().required(
                    props.title == "Payment Frequencies"
                      ? `Payment Frequency is required`
                      : `${props.title.slice(0, -1)} is required`
                  ),
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
                            name="item_name"
                            autoComplete="off"
                            className={`form-control eb-contact-input material-input ${
                              errors.item_name &&
                              touched.item_name &&
                              "is-invalid input-box-error"
                            }`}
                            value={values.item_name}
                            innerRef={inputReference} 
                          />
                          <label className="required material-label text-uppercase text-1">
                          {props.title == "Payment Frequencies"
                              ? "Payment Frequency"
                              : props.title == "Cities"
                              ? "City"
                              : props.title.slice(0, -1)}
                          </label>
                        </div>
                        <ErrorMessage
                          name="item_name"
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
                        Save
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
            )}
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default AddMasterModal;
