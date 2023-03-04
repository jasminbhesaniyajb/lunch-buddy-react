import React, { useState,useRef, useEffect } from "react";

import { Modal } from "react-bootstrap";

import { useTranslation } from "react-i18next";

import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

import { toast } from "react-toastify";

import { history } from "../history";
import { CHANGE_PASSWORD } from "../services/ENDPOINT";

import Loader from "./Loader";

import { CAPCHA_ID } from "../config";
import Recaptcha from "react-recaptcha";

const PublicChangePasswordModal = (props) => {
  const [isloader, setLoader] = useState(false);
  const checkAPICall = async (e) => {
    try {
      setLoader(true);
      if (capacha.isVerified) {
        const data = await CHANGE_PASSWORD(e);
        if (data.code === 200 || data.code === "200") {
          toast.success(data.message);
          history.push("/login");
        } else {
          toast.error(data.message);
        }
      }else {
        toast.error("Please verify that you are a human!");
      }
    } catch ({ data }) {
      toast.error(data.message);
    } finally {
      setLoader(false);
    }
  };
  const initialState = {
    isVerified: false,
  };
  const [capacha, setCapacha] = useState(initialState);
  const verifyCallback = (response) => {
    if (response) {
      setCapacha({
        ...capacha,
        isVerified: true,
      });
    }
  };
  const { t } = useTranslation();
   
  const inputReference = useRef(null);
  const getFocus = () =>{
   inputReference.current && inputReference.current?.focus()
  }

  useEffect(() => {
    setTimeout(() => {
      getFocus();
    }, 1);
  }, [])
  return (
    <React.Fragment>
      {isloader ? <Loader /> : null}
      <div>
        <Modal show={true} onHide={() => props.closeModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t("changePassword")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mt-3">
              <Formik
                initialValues={{
                  oldPassword: "",
                  newPassword: "",
                  cfmPassword: "",
                }}
                validationSchema={Yup.object().shape({
                  oldPassword: Yup.string()
                    .min(5, t("registerValidationPasswordMin"))
                    .max(30, t("registerValidationPasswordMax"))
                    .required(t("ChangeValidationOldPasswordRequired")),
                  newPassword: Yup.string()
                    .min(5, t("registerValidationPasswordMin"))
                    .max(30, t("registerValidationPasswordMax"))
                    .required(t("ChangeValidationNewPasswordRequired"))
                    .matches(
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
                      t("registerValidationPasswordMatches")
                    ),
                  cfmPassword: Yup.string()
                    .min(5, t("registerValidationPasswordMin"))
                    .max(30, t("registerValidationPasswordMax"))
                    .required(t("ChangeValidationConfirmPasswordRequired"))
                    .oneOf(
                      [Yup.ref("newPassword"), null],
                      t("registerValidationConfirmPasswordOneOf")
                    ),
                })}
                onSubmit={async (fields) => {
                  checkAPICall(fields);
                }}
              >
                {({ errors, touched,}) => (
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
                            name="oldPassword"
                            autoComplete="off"
                            className={`form-control eb-contact-input material-input h-3em ${
                              errors.oldPassword &&
                              touched.oldPassword &&
                              "is-invalid input-box-error"
                            }`}
                            innerRef={inputReference} 
                          />
                          <label className="required material-label text-uppercase text-1">
                            Old Password
                          </label>
                        </div>
                      </div>
                    </div>
                    <ErrorMessage
                      name="oldPassword"
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
                            name="newPassword"
                            autoComplete="off"
                            className={`form-control eb-contact-input material-input h-3em ${
                              errors.newPassword &&
                              touched.newPassword &&
                              "is-invalid input-box-error"
                            }`}
                          />
                          <label className="required material-label text-uppercase text-1">
                            New Password
                          </label>
                        </div>
                      </div>
                    </div>
                    <ErrorMessage
                      name="newPassword"
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
                            confirm password
                          </label>
                        </div>
                      </div>
                    </div>
                    <ErrorMessage
                      name="cfmPassword"
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

export default PublicChangePasswordModal;
