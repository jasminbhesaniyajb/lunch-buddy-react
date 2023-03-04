import React, { useEffect, useState } from "react";

import Aos from "aos";
import "aos/dist/aos.css";

import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

import Recaptcha from "react-recaptcha";

import { useTranslation } from "react-i18next";

import { toast } from "react-toastify";

import InputMask from 'react-input-mask';

import { CAPCHA_ID, PHONE_MASK, POSTAL_CODE_MASK } from "../../../config";
import { history } from "../../../history";
import Loader from "../../../components/Loader";
import {
  SCHOOL_REGISTER,
  CHECK_USERNAME_EMAIL,
  GET_CITY,
  GET_PROVINCE,
} from "../../../services/ENDPOINT";

const PublicSchoolsRegistration = (props) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [isloader, setLoader] = useState(false);
  const [emailExit, setEmailExit] = useState(false);
  const [city, setCity] = useState([]);
  const [province, setProvince] = useState([]);
  const [selectCityId, setselectCityId] = useState(null);
  const [school, setSchool] = useState({});
  const initialState = {
    isVerified: false,
  };
  
  const [capacha, setCapacha] = useState(initialState);
  const getAllProvince = async () => {
    try {
      const data = await GET_PROVINCE();
      if (data.code === 200 || data.code === "200") {
        setProvince(data.data);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getAllProvince();
  }, []);
  const getAllCity = async (e) => {
    const payload = e
    setselectCityId(payload)
    try {
      const data = await GET_CITY(payload);
      if (data.code === 200 || data.code === "200") {
        setCity(data.data);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };  
  const checkAPICall = async (e) => {
    try {
      setLoader(true);
      if (capacha.isVerified) {
        if (!emailExit) {
          const data = await SCHOOL_REGISTER(e);
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
    <React.Fragment>
      <div role="main" className="main registration">
        {isloader ? <Loader /> : null}
        <section className="form-section border-0 m-0">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-lg-6 mx-auto">
                <Formik
                  enableReinitialize
                  initialValues={{
                    password: school.password || '',
                    user_type: 3,
                    email_address: school.email_address || '',
                    school_name: school.school_name || '',
                    address: school.address || '',
                    id_province: school.id_province || '',
                    id_city: school.id_city || '',
                    postal_code: school.postal_code || '',
                    fax_number: school.fax_number || '',
                    contact_person_name: school.contact_person_name || '',
                    contact_number: school.contact_number || '',
                    web_site_address: school.web_site_address || '',
                    confirmPassword: school.confirmPassword || '',
                  }}
                  validationSchema={Yup.object().shape({
                    password: Yup.string()
                      .min(5, t("registerValidationPasswordMin"))
                      .max(30, t("registerValidationPasswordMax"))
                      .required(t("registerValidationPasswordRequired"))
                      .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
                        t("registerValidationPasswordMatches")
                      ),
                    email_address: Yup.string()
                      .max(75, t("registerValidationEmailMax"))
                      .email(t("loginvalidationEmail"))
                      .required(t("registerValidationEmailRequired")),
                    school_name: Yup.string()
                      .min(2, t("schoolValidationSchoolNameMin"))
                      .max(75, t("schoolValidationSchoolNameMax"))
                      .required(t("schoolValidationSchoolNameRequired")),
                    address: Yup.string()
                      .min(5, t("restaurantValidationAddressMin"))
                      .max(200, t("restaurantValidationAddressMax"))
                      .required(t("restaurantValidationAddressRequired")),
                    id_province: Yup.string().required(
                      t("restaurantValidationProvinceRequired")
                    ),
                    id_city: Yup.string().required(
                      t("restaurantValidationCityRequired")
                    ),
                    postal_code: Yup.string()
                      .min(3, t("restaurantValidationPostalCodeMin"))
                      .max(10, t("restaurantValidationPostalCodeMax"))
                      .required(t("restaurantValidationPostalCodeRequired")),
                    fax_number: Yup.string()
                      .min(5, t("schoolValidationFaxNumberMin"))
                      .max(15, t("schoolValidationFaxNumberMax")),
                    contact_person_name: Yup.string()
                      .min(5, t("schoolValidationContactPersonNameMin"))
                      .max(50, t("schoolValidationContactPersonNameMax"))
                      .required(t("schoolValidationContactPersonNameRequired")),
                    contact_number: Yup.string()
                      .min(8, t("registerValidationContactMin"))
                      .max(20, t("registerValidationContactMax"))
                      .required(t("registerValidationContactRequired")),
                    web_site_address: Yup.string()
                      .min(7, t("restaurantValidationWebsiteMin"))
                      .max(100, t("restaurantValidationWebsiteMax"))
                      .matches(
                        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                        t("restaurantValidationWebsiteMatches")
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
                    <Form className="contact-form">
                      <div
                        className="col-lg-12 text-center"
                        data-aos="fade-up"
                        data-aos-offset="200"
                        data-aos-easing="ease-in-sine"
                        data-aos-duration="1000"
                      >
                        <h2 className="font-weight-normal text-maven text-color-tertiary text-6 pb-2 mb-0">
                          <strong className="font-weight-semibold">
                            {t("schoolAccountRegistration")}
                          </strong>
                        </h2>
                        <p className="mb-3">
                          Welcome to easy online Mums Lunch ordering. No more
                          paper forms. No more sending cash to school
                        </p>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-lg-12 col-md-12">
                          <div className="material-textfield">
                            <Field
                              placeholder=" "
                              name="email_address"
                              autoComplete="off"
                              value={school.email_address ? school.email_address : ''}
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.email_address &&
                                touched.email_address &&
                                "is-invalid input-box-error"
                              }`}
                              onChange={(e) => {
                                doSearch(e.target.value, "email_address");
                                const list = { ...values };
                                list['email_address'] = e.target.value ?  e.target.value : '';
                                setSchool(list)
                              }}
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
                              type="password"
                              placeholder=" "
                              name="password"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.password &&
                                touched.password &&
                                "is-invalid input-box-error"
                                }`}
                              value={school.password || ''}  
                              onChange={(e) => {
                                doSearch(e.target.value, "password");
                                const list = { ...values };
                                list['password'] = e.target.value;
                                setSchool(list)
                              }}
                            />
                            <label className="required material-label text-uppercase text-1">
                              {t("registerPassword")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                        <div className="form-group col-lg-6 col-md-6">
                          <div className="material-textfield">
                            <Field
                              placeholder=" "
                              type="password"
                              name="confirmPassword"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.confirmPassword &&
                                touched.confirmPassword &&
                                "is-invalid input-box-error"
                              }`}
                            />
                            <label className="required material-label text-uppercase text-1">
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
                        <div className="form-group col-lg-12 col-md-12">
                          <div className="material-textfield">
                            <Field
                              placeholder=" "
                              name="school_name"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.school_name &&
                                touched.school_name &&
                                "is-invalid input-box-error"
                              }`}
                            />
                            <label className="required  material-label text-uppercase text-1">
                              {t("schoolSchoolName")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="school_name"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-lg-6 col-md-12">
                          <div className="material-textfield">
                            <Field
                              placeholder=" "
                              name="contact_person_name"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.contact_person_name &&
                                touched.contact_person_name &&
                                "is-invalid input-box-error"
                              }`}
                            />
                            <label className="required material-label text-uppercase text-1">
                              {t("schoolContactPersonName")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="contact_person_name"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>

                        <div className="form-group col-lg-6 col-md-6">
                          <div className="material-textfield">
                            <InputMask
                                mask={PHONE_MASK}
                                maskChar={null}
                                value={school.primary_contact_number}
                              placeholder=" "
                              name="contact_number"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.contact_number &&
                                touched.contact_number &&
                                "is-invalid input-box-error"
                              }`}
                              onChange={(e) => {
                                const list = { ...values };
                                list['contact_number'] = e.target.value;
                                setSchool(list);
                              }}
                            />
                            <label className="required material-label text-uppercase text-1">
                              {t("restaurantContactNumber")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="contact_number"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-lg-12 col-md-12">
                          <div className="material-textfield">
                            <Field
                              placeholder=" "
                              name="address"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.address &&
                                touched.address &&
                                "is-invalid input-box-error"
                              }`}
                            />
                            <label className="required  material-label text-uppercase text-1">
                              {t("restaurantAddress")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-lg-6 col-md-6">
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
                              onChange={(e) => {
                                getAllCity(e.target.value);
                                const list = { ...values };
                                list['id_province'] = e.target.value;
                                setSchool(list);
                              }}  
                            >
                              <option value="">{t("globleSelect")}</option>
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
                        <div className="form-group col-lg-6 col-md-12">
                          <div className="material-textfield">
                            <Field
                              placeholder=" "
                              as="select"
                              name="id_city"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.id_city &&
                                touched.id_city &&
                                "is-invalid input-box-error"
                              }`}
                            >
                              <option value="">{t("globleSelect")}</option>
                              {city.map(({ id, city_name }, index) => (
                                <option value={id} key={index}>
                                  {city_name}
                                </option>
                              ))}
                            </Field>
                            <label className="required material-label text-uppercase text-1">
                              {t("restaurantCity")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="id_city"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-lg-6 col-md-6">
                          <div className="material-textfield">
                            <InputMask
                                mask={POSTAL_CODE_MASK}
                                maskChar={null}
                                value={school.postal_code}
                              placeholder=" "
                              name="postal_code"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.postal_code &&
                                touched.postal_code &&
                                "is-invalid input-box-error"
                              }`}
                              onChange={(e) => {
                                const list = { ...values };
                                list['postal_code'] = e.target.value;
                                setSchool(list);
                              }}
                            />
                            <label className="required text-uppercase material-label text-1">
                              {t("restaurantPostalCode")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="postal_code"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>

                        <div className="form-group col-lg-6 col-md-6">
                          <div className="material-textfield">
                            <Field
                              placeholder=" "
                              name="fax_number"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.fax_number &&
                                touched.fax_number &&
                                "is-invalid input-box-error"
                              }`}
                            />
                            <label className="material-label text-uppercase text-1">
                              {t("schoolFaxNumber")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="fax_number"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-lg-12 col-md-12">
                          <div className="material-textfield">
                            <Field
                              placeholder=" "
                              name="web_site_address"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.web_site_address &&
                                touched.web_site_address &&
                                "is-invalid input-box-error"
                              }`}
                            />
                            <label className="material-label text-uppercase text-1">
                              {t("restaurantWebsite")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="web_site_address"
                            component="div"
                            className="field-error text-danger"
                          />
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
    </React.Fragment>
  );
};
export default PublicSchoolsRegistration;
