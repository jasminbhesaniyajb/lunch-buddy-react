import React, { useState, useEffect } from "react";

import Aos from "aos";
import "aos/dist/aos.css";

import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

import Recaptcha from "react-recaptcha";

import { useTranslation } from "react-i18next";

import { toast } from "react-toastify";

import InputMask from 'react-input-mask';

import { CAPCHA_ID, PHONE_MASK } from "../../../config";
import { history } from "../../../history";
import Loader from "../../../components/Loader";
import {
  PARENT_REGISTER,
  CHECK_USERNAME_EMAIL,
} from "../../../services/ENDPOINT";

const PublicRegistration = (props) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [isloader, setLoader] = useState(false);
  const [emailExit, setEmailExit] = useState(false);

  const initialState = {
    isVerified: false,
  };
  const [capacha, setCapacha] = useState(initialState);
  const [parentData, setParentData] = useState({});

  const checkAPICall = async (e) => {
    try {
      setLoader(true);
      if (capacha.isVerified) {
        if (!emailExit) {
          const data = await PARENT_REGISTER(e);
          if (data.code === 200 || data.code === "200") {
            if (data.data.id) {
              if(data.status == "Approval Pending"){
                localStorage.setItem("eb-mums-lunch:approvalPendingStatus", data.status);
                localStorage.setItem("eb-mums-lunch:approvalPendingMeassage", data.message);
                history.push(`/verify-otp?id=${data.data.id}`);
              }else{
                toast.success(data.message);
                history.push(`/verify-otp?id=${data.data.id}`);
              }
            } else {
              setEmailExit(data.data.emailExit);
            }
          } else {
            toast.error(data.message);
          }
        } else {
          toast.error("Email or Username already exist!");
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

  const doSearch = (e, field) => {
    const value = e ? e : "";
    let timer = doSearch.timer;
    if (timer) {
      clearTimeout(timer);
    }
    doSearch.timer = setTimeout(async () => {
      try {
        const data = await CHECK_USERNAME_EMAIL({ [field]: value });
        if (data.code === 200 || data.code === "200") {
          setEmailExit(data.data.emailExit);
        }
      } catch ({ data }) {
        toast.error(data.message);
      }
    }, 800);
  };

  const verifyCallback = (response) => {
    if (response) {
      setCapacha({
        ...capacha,
        isVerified: true,
      });
    }
  };
  const { t } = useTranslation();
  return (
    <div>
      <div role="main" className="main registration">
        {isloader ? <Loader /> : null}
        <section className="form-section border-0 m-0">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-lg-6 mx-auto">
                <Formik
                enableReinitialize
                  initialValues={{
                    first_name: parentData.first_name || '',
                    last_name: parentData.last_name || '',
                    contact_number: parentData.contact_number || null,
                    email_address: parentData.email_address || '',
                    password: parentData.password || '',
                    confirmPassword: parentData.confirmPassword || '',
                    user_type: 4,
                  }}
                  validationSchema={Yup.object().shape({
                    first_name: Yup.string()
                      .min(3, t("registerValidationFirstNameMin"))
                      .max(50, t("registerValidationFirstNameMax"))
                      .required(t("registerValidationFirstNameRequired")),
                    last_name: Yup.string()
                      .min(3, t("registerValidationLastNameMin"))
                      .max(50, t("registerValidationLastNameMax"))
                      .required(t("registerValidationLastNameRequired")),
                    email_address: Yup.string()
                      .email(t("loginvalidationEmail"))
                      .max(75, t("registerValidationEmailMax"))
                      .required(t("registerValidationEmailRequired")),
                    password: Yup.string()
                      .min(5, t("registerValidationPasswordMin"))
                      .max(30, t("registerValidationPasswordMax"))
                      .required(t("registerValidationPasswordRequired"))
                      .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
                        t("registerValidationPasswordMatches")
                      ),
                    confirmPassword: Yup.string()
                      .min(5, t("registerValidationPasswordMin"))
                      .max(30, t("registerValidationPasswordMax"))
                      .required(t("registerValidationConfirmPasswordRequired"))
                      .oneOf(
                        [Yup.ref("password"), null],
                        t("registerValidationConfirmPasswordOneOf")
                      ),
                  })}
                  onSubmit={async (fields) => {
                    checkAPICall(fields);
                  }}
                >
                  {({ errors, touched, values }) => (
                    <Form className="contact_number-form contact-form">
                      <div
                        className="col-lg-12 text-center"
                        data-aos="fade-up"
                        data-aos-offset="200"
                        data-aos-easing="ease-in-sine"
                        data-aos-duration="1000"
                      >
                        <h2 className="font-weight-normal text-maven text-color-tertiary text-6 pb-2 mb-0">
                          <strong className="font-weight-semibold">
                            {t("registerParentAccountRegistration")}
                          </strong>
                        </h2>
                        <p className="mb-3">
                          Welcome to easy online Mums Lunch ordering. No more
                          paper forms. No more sending cash to school
                        </p>
                      </div>
                      <div className="form-row">
                        <div className="form-group  col-lg-12 col-md-12">
                          <div className="material-textfield">
                          {/* onKeyUp */}
                            <Field
                              id="email"
                              placeholder=" "
                              name="email_address"
                              autoComplete="off"
                              value={parentData.email_address || ''}
                              onChange={(e) => {
                                doSearch(e.target.value, "email_address");
                                const list = { ...values };
                                list['email_address'] = e.target.value || '';
                                setParentData(list);
                              }}
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.email_address &&
                                touched.email_address &&
                                "is-invalid input-box-error"
                              }`}
                              autoFocus
                            />
                            <label className="required material-label text-uppercase text-1">
                              {t("registerEmailAddress")}
                            </label>
                          </div>
                          <div className="text-danger">
                            {emailExit && "Email is already exists. Please try a different email address."}
                          </div>
                          <ErrorMessage
                            name="email_address"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-lg-6 col-md-6">
                          <div className="material-textfield">
                            <Field
                              id="password"
                              placeholder=" "
                              type="password"
                              name="password"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.password &&
                                touched.password &&
                                "is-invalid input-box-error"
                              }`}
                            />
                            <label className="material-label required text-uppercase text-1">
                              {t("registerPassword")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                        <div className="form-group  col-lg-6 col-md-6">
                          <div className="material-textfield">
                            <Field
                              placeholder=" "
                              id="confirmPassword"
                              type="password"
                              name="confirmPassword"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.confirmPassword &&
                                touched.confirmPassword &&
                                "is-invalid input-box-error"
                              }`}
                            />
                            <label className="material-label required text-uppercase text-1">
                              {t("registerConfirmPassword")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-lg-6 col-md-6">
                          <div className="material-textfield">
                            <Field
                              id="name"
                              placeholder=" "
                              name="first_name"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.first_name &&
                                touched.first_name &&
                                "is-invalid input-box-error"
                              }`}
                            />
                            <label className="material-label required text-uppercase text-1">
                              {t("registerFirstName")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="first_name"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                        <div className="form-group  col-lg-6 col-md-6">
                          <div className="material-textfield">
                            <Field
                              id="lastName"
                              placeholder=" "
                              name="last_name"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.last_name &&
                                touched.last_name &&
                                "is-invalid input-box-error"
                              }`}
                            />
                            <label className="material-label required text-uppercase text-1">
                              {t("registerLastName")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="last_name"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-lg-12 col-md-12">
                          <div className="material-textfield">
                            <InputMask
                              mask={PHONE_MASK}
                              maskChar={null}
                              value={parentData.contact_number || ''}
                              placeholder=" "
                              name="contact_number"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em`}
                              onChange={(e) => {
                                const list = { ...values };
                                list['contact_number'] = e.target.value == "" ? null : e.target.value;
                                setParentData(list);
                              }}
                            />
                            <label className="material-label text-uppercase text-1">
                              {t("registerContactNumber")}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-row text-center">
                        <div className="form-group col-sm-12 col-md-8 mb-4 mt-3 mx-auto">
                          <Recaptcha
                            sitekey={CAPCHA_ID}
                            render="explicit"
                            verifyCallback={verifyCallback}
                          />
                        </div>
                      </div>
                      <div className="form-row text-center">
                        <div className="form-group col mb-0 mt-2">
                          <input
                            type="submit"
                            value={t("registerBtn")}
                            className="btn btn-dark btn-modern"
                          />
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default PublicRegistration;
