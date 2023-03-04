import React, { useState,useEffect } from "react";

import mumsLogo from "../../../assets/img/mums-logo.png";
import FacebookLogin from "react-facebook-login";

import GoogleLogin from "react-google-login";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

import { useTranslation } from "react-i18next";

import { toast } from "react-toastify";

import ForgotPasswordModal from "../login/ForgotPasswordModal";
import { FACEBOOK_APP_ID, GOOGLE_ID } from "../../../config";
import { history } from "../../../history";
import Loader from "../../../components/Loader";
import { LOGIN, SOCIAL_LOGIN } from "../../../services/ENDPOINT";
import LoginBgBottom from "../../../assets/img/login-bg-bottom.png";
import LoginBgTop from "../../../assets/img/login-bg-top.png";
import MapBottom from "../../../assets/img/map-bottom-left.png";
import MapTop from "../../../assets/img/map-top-right.png";
import Logo from "../../../assets/img/home/logo.png";
import LunchImg from "../../../assets/img/home/why.png";
import RegisterTypePopup from "../../../components/public/RegisterTypePopup";

const PublicLogin = (props) => {
  const [isloader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const { t } = useTranslation();

  const checkAPICall = async (e) => {
    try {
      setLoader(true);
      const data = await LOGIN(e);
      if (data.code === 200 || data.code === "200") {
        if (data.redirectVerify) {
          toast.error(data?.message);
          history.push(`/verify-otp?id=${data.data.id}`);
        } else {
          if (data.data.loginInfo.user_type === 1) {
            toast.success(
              `Howdy ${data.data.loginInfo.email_address}, Welcome to the Mums Lunch!`
            );
          } else if (data.data.loginInfo.user_type === 2) {
            toast.success(
              `Howdy ${data.data.loginInfo.first_name} ${data.data.loginInfo.last_name}, Welcome to the Mums Lunch!`
            );
          } else if (data.data.loginInfo.user_type === 3) {
            toast.success(
              `Howdy ${data.data.loginInfo.contact_person_name}, Welcome to the Mums Lunch!`
            );
          } else if (data.data.loginInfo.user_type === 4) {
            toast.success(
              `Howdy ${data.data.loginInfo.first_name} ${data.data.loginInfo.last_name}, Welcome to the Mums Lunch!`
            );
          } else if (data.data.loginInfo.user_type === 5) {
            toast.success(
              `Howdy ${data.data.loginInfo.teacher_name}, Welcome to the Mums Lunch!`
            );
          }
          localStorage.setItem(
            "eb-mums-lunch:loginInfo",
            JSON.stringify(data.data.loginInfo)
          );
          localStorage.setItem("eb-mums-lunch:token", data.data.token);
          localStorage.setItem(
            "eb-mums-lunch:userType",
            data.data.loginInfo.user_type
          );
          props.addMainLoginInfoHandler(data.data.loginInfo);
          if (data.data.loginInfo.user_type === 1) {
            history.push("/admin/dashboard");
          } else if (data.data.loginInfo.user_type === 2) {
            history.push("/restaurant/dashboard");
          } else if (data.data.loginInfo.user_type === 3) {
            history.push("/school/dashboard");
          } else if (data.data.loginInfo.user_type === 4) {
            history.push("/parent/dashboard");
          } else if (data.data.loginInfo.user_type === 5) {
            history.push("/teacher/dashboard");
          } else {
            history.push("/");
          }
        }
      } else {
        toast.error(data?.message);
      }
    } catch ({ data }) {
      toast.error(data?.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    return () => {
      setLoader(false);
    }
  }, [])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  const responseFacebook = async (response) => {
    try {
      setLoader(true);
      const payload = {
        id_token: response.accessToken,
        ss_type: 2,
      };
      const data = await SOCIAL_LOGIN(payload);
      if (data.code === 200 || data.code === "200") {
        if (data.redirectVerify) {
          toast.error(data?.message);
          history.push(`/verify-otp?id=${data.data.id}`);
        } else {
          if (data.data.loginInfo.user_type === 1) {
            toast.success(
              `Howdy ${data.data.loginInfo.email_address}, Welcome to the Mums Lunch!`
            );
          } else if (data.data.loginInfo.user_type === 2) {
            toast.success(
              `Howdy ${data.data.loginInfo.first_name} ${data.data.loginInfo.last_name}, Welcome to the Mums Lunch!`
            );
          } else if (data.data.loginInfo.user_type === 3) {
            toast.success(
              `Howdy ${data.data.loginInfo.contact_person_name}, Welcome to the Mums Lunch!`
            );
          } else if (data.data.loginInfo.user_type === 4) {
            toast.success(
              `Howdy ${data.data.loginInfo.first_name} ${data.data.loginInfo.last_name}, Welcome to the Mums Lunch!`
            );
          } else if (data.data.loginInfo.user_type === 5) {
            toast.success(
              `Howdy ${data.data.loginInfo.teacher_name}, Welcome to the Mums Lunch!`
            );
          }
          localStorage.setItem(
            "eb-mums-lunch:loginInfo",
            JSON.stringify(data.data.loginInfo)
          );
          localStorage.setItem("eb-mums-lunch:token", data.data.token);
          localStorage.setItem(
            "eb-mums-lunch:userType",
            data.data.loginInfo.user_type
          );
          props.addMainLoginInfoHandler(data.data.loginInfo);
          if (data.data.loginInfo.user_type === 1) {
            history.push("/admin/dashboard");
          } else if (data.data.loginInfo.user_type === 2) {
            history.push("/restaurant/dashboard");
          } else if (data.data.loginInfo.user_type === 3) {
            history.push("/school/dashboard");
          } else if (data.data.loginInfo.user_type === 4) {
            history.push("/parent/dashboard");
          } else if (data.data.loginInfo.user_type === 5) {
            history.push("/teacher/dashboard");
          } else {
            history.push("/");
          }
        }
      } else {
        toast.error(data?.message);
      }
    } catch ({ data }) {
      toast.error(data?.message);
    } finally {
      setLoader(false);
    }
  };

  const responseGoogle = async (response) => {
    try {
      setLoader(true);
      const payload = {
        id_token: response.tokenObj.id_token,
        ss_type: 1,
      };
      const data = await SOCIAL_LOGIN(payload);
      if (data.code === 200 || data.code === "200") {
        if (data.redirectVerify) {
          toast.error(data?.message);
          history.push(`/verify-otp?id=${data.data.id}`);
        } else {
          if (data.data.loginInfo.user_type === 1) {
            toast.success(
              `Howdy ${data.data.loginInfo.email_address}, Welcome to the Mums Lunch!`
            );
          } else if (data.data.loginInfo.user_type === 2) {
            toast.success(
              `Howdy ${data.data.loginInfo.first_name} ${data.data.loginInfo.last_name}, Welcome to the Mums Lunch!`
            );
          } else if (data.data.loginInfo.user_type === 3) {
            toast.success(
              `Howdy ${data.data.loginInfo.contact_person_name}, Welcome to the Mums Lunch!`
            );
          } else if (data.data.loginInfo.user_type === 4) {
            toast.success(
              `Howdy ${data.data.loginInfo.first_name} ${data.data.loginInfo.last_name}, Welcome to the Mums Lunch!`
            );
          } else if (data.data.loginInfo.user_type === 5) {
            toast.success(
              `Howdy ${data.data.loginInfo.teacher_name}, Welcome to the Mums Lunch!`
            );
          }
          localStorage.setItem(
            "eb-mums-lunch:loginInfo",
            JSON.stringify(data.data.loginInfo)
          );
          localStorage.setItem("eb-mums-lunch:token", data.data.token);
          localStorage.setItem(
            "eb-mums-lunch:userType",
            data.data.loginInfo.user_type
          );
          props.addMainLoginInfoHandler(data.data.loginInfo);
          if (data.data.loginInfo.user_type === 1) {
            history.push("/admin/dashboard");
          } else if (data.data.loginInfo.user_type === 2) {
            history.push("/restaurant/dashboard");
          } else if (data.data.loginInfo.user_type === 3) {
            history.push("/school/dashboard");
          } else if (data.data.loginInfo.user_type === 4) {
            history.push("/parent/dashboard");
          } else if (data.data.loginInfo.user_type === 5) {
            history.push("/teacher/dashboard");
          } else {
            history.push("/");
          }
        }
      } else {
        toast.error(data?.message);
      }
    } catch ({ data }) {
      toast.error(data?.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <React.Fragment>
      {isloader ? <Loader /> : null}
      <div role="main" className="main">
        <section className="section-height-3 login-page border-0 m-0">
          <div className="login-bg-top-left">
            <img src={LoginBgTop} alt="" width="270px" />
          </div>
          <div className="login-bg-bottom-right">
            <img src={LoginBgBottom} alt="" width="270px" />
          </div>
          <div className="login-map-top-right">
            <img src={MapTop} alt="" width="400px" />
          </div>
          <div className="login-map-bottom-left">
            <img src={MapBottom} alt="" width="400px" />
          </div>
          <div className="container login-wrapper">
            <div className="row align-items-center justify-content-center px-3 h-100">
              <div className="col-md-9 col-lg-9 mx-auto col-12 login-card">
                <div className="row">
                  <div className="col-sm-6 d-none-mobile">
                    <div className="justify-content-center py-4 text-center">
                      <Link to={"/schools"}>
                        <img
                          src={mumsLogo}
                          width="100px"
                          className="center-block"
                          alt={Logo}
                        />
                      </Link>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-5">
                        <div className="w-100 position-relative">
                          <Slider {...settings} className="eb-slider">
                            <div className="img-thumbnail border-0 p-0 d-block">
                              <img
                                src={LunchImg}
                                className="img-fluid border-radius-0 w-100"
                                alt={LunchImg}
                              />
                            </div>
                            <div className="img-thumbnail border-0 p-0 d-block">
                              <img
                                src={LunchImg}
                                className="img-fluid border-radius-0 w-100"
                                alt={LunchImg}
                              />
                            </div>
                            <div className="img-thumbnail border-0 p-0 d-block">
                              <img
                                src={LunchImg}
                                className="img-fluid border-radius-0 w-100"
                                alt={LunchImg}
                              />
                            </div>
                          </Slider>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6 login-form">
                    <h2 className="font-weight-normal text-maven text-center text-color-primary text-6 py-4 mb-1">
                      <strong className="font-weight-semibold">
                        {t("login")}
                      </strong>
                    </h2>
                    <Formik
                      validateOnBlur={false}            
                      initialValues={{
                        email_address: "",
                        password: "",
                      }}
                      validationSchema={Yup.object().shape({
                        email_address: Yup.string()
                          .max(75, t("registerValidationEmailMax"))
                          .email(t("loginvalidationEmail"))
                          .required(t("registerValidationEmailRequired")),
                        password: Yup.string()
                          .max(30, t("registerValidationPasswordMax"))
                          .required(t("registerValidationPasswordRequired")),
                      })}
                      onSubmit={async (fields) => {
                        checkAPICall(fields);
                      }}
                    >
                      {({ errors, touched }) => (
                        <Form className="contact-form login">
                          <div className="form-row">
                            <div className="form-group col">
                              <label className="text-4">
                                <i className="fa fa-user"></i>
                              </label>
                              <Field
                                placeholder={t("loginEmail")}
                                name="email_address"
                                autoComplete="off"
                                className={`form-control eb-contact-input h-3em ${
                                  errors.email_address &&
                                  touched.email_address &&
                                  "is-invalid input-box-error"
                                }`}
                                autoFocus
                              />
                            </div>
                          </div>
                          <ErrorMessage
                            name="email_address"
                            component="div"
                            className="field-error text-danger mb-2 mrg-top-minus"
                          />
                          <div className="form-row">
                            <div className="form-group col">
                              <label className="text-4">
                                <i className="fa fa-lock"></i>
                              </label>
                              <Field
                                type="password"
                                placeholder="******"
                                name="password"
                                autoComplete="off"
                                className={`form-control eb-contact-input h-3em ${
                                  errors.password &&
                                  touched.password &&
                                  "is-invalid input-box-error"
                                }`}
                              />
                            </div>
                          </div>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="field-error text-danger mb-2 mrg-top-minus"
                          />
                          <div className="form-row text-center">
                            <div className="form-group col mb-0">
                              <input
                                type="submit"
                                value={t("login")}
                                className="btn btn-dark btn-modern d-block w-100"
                                data-loading-text="Loading..."
                              />
                            </div>
                          </div>
                          <div className="d-flex justify-content-between mt-3">
                            <div>
                              <h6 className="text-3">
                                {t("loginNoAccount")}
                                <span
                                  className="link-btn-hover text-color-primary cursor-pointer ml-1"
                                  onClick={(e) => setShowPopup(true)}
                                >
                                  {t("loginCreateOne")}
                                </span>
                              </h6>
                            </div>
                            <div className="form-row d-block link-btn-hover text-right">
                              <h6 className="text-3 cursor-pointer"
                                onClick={() => setShowForgotPasswordModal(true)}
                              >
                                Forgot Password
                              </h6>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group text-center">
                          <div className="divider my-5">
                            <span className="bg-light w-60 px-1 text-2 text-color-grey position-absolute left-50pct top-50pct transform3dxy-n50">
                              {t("loginOr")}
                            </span>
                          </div>
                          <div>
                            <GoogleLogin
                              clientId={GOOGLE_ID}
                              size="small"
                              render={(renderProps) => (
                                <button
                                  onClick={renderProps.onClick}
                                  disabled={renderProps.disabled}
                                  className="btn btn-secondary-scale-2 w-122  btn-modern text-transform-none rounded-0 font-weight-bold align-items-center d-inline-flex justify-content-center  mb-1 mobile-social mrg-r-7"
                                >
                                  <i className="fab fa-google text-5 mr-2"></i>
                                  {t("loginWithGoogle")}
                                </button>
                              )}
                              buttonText={t("loginWithGoogle")}
                              onSuccess={responseGoogle}
                              onFailure={responseGoogle}
                              cookiePolicy={"single_host_origin"}
                            />
                            <FacebookLogin
                              appId={FACEBOOK_APP_ID}
                              textButton={"Facebook"}
                              autoLoad={false}
                              size="small"
                              fields="name,email,picture"
                              callback={responseFacebook}
                              cssClass="btn btn-primary-scale-2 w-122 btn-modern text-transform-none rounded-0 font-weight-bold align-items-center d-inline-flex justify-content-center mb-1"
                              icon="fab fa-facebook text-5  mr-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {showPopup && (
        <RegisterTypePopup closeModal={() => setShowPopup(false)} />
      )}
      {showForgotPasswordModal && (
        <ForgotPasswordModal
          closeModal={() => setShowForgotPasswordModal(false)}
        />
      )}
    </React.Fragment>
  );
};
export default PublicLogin;
