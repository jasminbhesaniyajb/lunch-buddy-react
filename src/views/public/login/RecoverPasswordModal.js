import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { RECOVER_PASSWORD } from "../../../services/ENDPOINT";
import { toast } from "react-toastify";
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { useTranslation } from "react-i18next";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { history } from "../../../history";

const RecoverPasswordModal = (props) => {
  const location = useLocation();
  const checkAPICall = async (e) => {
    try {
      const payload = {
        password: e.password,
        token: queryString.parse(location.search).token ? queryString.parse(location.search).token : '0205'
      }
      const data = await RECOVER_PASSWORD(payload);
      if (data.code === 200 || data.code === '200') {
        toast.success(data.message);
        history.push("/login");        
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(true);
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="footer-top-spacing"></div>
        <Modal
          show={show} onHide={handleClose}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("RecoverPassword")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Formik
                initialValues={{
                  password: ""
                }}
                validationSchema={Yup.object().shape({                  
                  password: Yup.string()
                    .max(30, t("registerValidationPasswordMax"))
                    .required(t("registerValidationPasswordRequired"))
                    .matches(
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
                      t("registerValidationPasswordMatches")
                    ),
                  cfmPassword: Yup.string()
                    .required(t("ChangeValidationConfirmPasswordRequired"))
                    .oneOf(
                      [Yup.ref("password"), null],
                      t("registerValidationConfirmPasswordOneOf")
                    ),
                })}
                onSubmit={async (fields) => {
                  checkAPICall(fields);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="contact-form login pb-3">                    
                    <div className="form-row">
                      <div className="form-group col">
                        <div className="material-textfield">
                          <label className="text-4">
                            <i className="fa fa-lock"></i>
                          </label>
                          <Field
                            type="password"
                            placeholder=" "
                            name="password"
                            autoComplete="off"
                            className={`form-control eb-contact-input material-input h-3em ${
                              errors.password &&
                              touched.password &&
                              "is-invalid input-box-error"
                            }`}
                          />
                          <label className="required material-label text-uppercase text-1">
                          {t("globlePassword")}
                          </label>
                        </div>
                      </div>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="field-error text-danger mb-3 mrg-top-minus"
                    />
                    <div className="form-row">
                      <div className="form-group col">
                        <div className="material-textfield">
                          <label className="text-4">
                            <i className="fa fa-lock"></i>
                          </label>
                          <Field
                            type="password"
                            placeholder=" "
                            name="cfmPassword"
                            autoComplete="off"
                            className={`form-control eb-contact-input material-input h-3em ${
                              errors.cfmPassword &&
                              touched.cfmPassword &&
                              "is-invalid input-box-error"
                            }`}
                          />
                          <label className="required material-label text-uppercase text-1">
                          {t("globleConfirmPassword")}
                          </label>
                        </div>
                      </div>
                    </div>
                    <ErrorMessage
                      name="cfmPassword"
                      component="div"
                      className="field-error text-danger mb-3 mrg-top-minus"
                    />
                    <div className="form-row text-center mt-2">
                      <div className="form-group col">
                        <input
                          type="submit"
                          value={t("forgotPasswordBtn")}
                          className="btn btn-dark btn-modern d-block w-100"
                          data-loading-text="Loading..."
                        />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
          </Modal.Body>
        </Modal>
    </React.Fragment>
  );
};

export default RecoverPasswordModal;
