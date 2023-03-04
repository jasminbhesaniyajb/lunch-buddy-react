import React, { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

import { history } from "../../../history";

import { FORGOT_PASSWORD } from "../../../services/ENDPOINT";

import { CAPCHA_ID } from "../../../config";
import Recaptcha from "react-recaptcha";

const PublicForgotPasswordModal = (props) => {
  const initialState = {
    isVerified: false,
  };
  const [isloader, setLoader] = useState(false);
  const [capacha, setCapacha] = useState(initialState);
  const verifyCallback = (response) => {
    if (response) {
      setCapacha({
        ...capacha,
        isVerified: true,
      });
    }
  };
  const checkAPICall = async (e) => {
    try {
      setLoader(true);
      if (capacha.isVerified) {
        const data = await FORGOT_PASSWORD(e);
        if (data.code === 200 || data.code === "200") {
          toast.success(data.message);
          handleClose();
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("Please verify that you are a human!");
      }
    } catch ({ data }) {
      toast.error(data.message);
    } finally {
      setLoader(false);
    }
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { t } = useTranslation();

  const inputReference = useRef(null);
  const getFocus = () => {
    inputReference.current && inputReference.current?.focus();
  };

  useEffect(() => {
    setTimeout(() => {
      getFocus();
    }, 1000);
  }, []);

  return (
    <React.Fragment>
      {isloader ? <Loader /> : null}
      <div>
        <Modal show={true} onHide={() => props.closeModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t("forgotPassword")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mt-3">
              <Formik
                initialValues={{
                  email_address: "",
                }}
                validationSchema={Yup.object().shape({
                  email_address: Yup.string()
                    .max(75, t("registerValidationEmailMax"))
                    .email(t("loginvalidationEmail"))
                    .required(t("registerValidationEmailRequired")),
                })}
                onSubmit={async (fields) => {
                  checkAPICall(fields);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="contact-form login pb-3">
                    <div className="form-row">
                      <div className="form-group col">
                        <label className="text-4">
                          <i className="fa fa-user"></i>
                        </label>
                        <Field
                          id="hello"
                          placeholder={t("forgotPasswordEmail")}
                          name="email_address"
                          autoComplete="off"
                          className={`form-control eb-contact-input h-3em ${
                            errors.email_address &&
                            touched.email_address &&
                            "is-invalid input-box-error"
                          }`}
                          innerRef={inputReference}
                        />
                      </div>
                    </div>
                    <ErrorMessage
                      name="email_address"
                      component="div"
                      className="field-error text-danger mb-3 mrg-top-minus"
                    />
                    <div className="form-row">
                      <div className="form-group col-sm-12 col-md-8 my-2 mx-auto">
                        <Recaptcha
                          sitekey={CAPCHA_ID}
                          render="explicit"
                          verifyCallback={verifyCallback}
                        />
                      </div>
                    </div>
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
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default PublicForgotPasswordModal;
