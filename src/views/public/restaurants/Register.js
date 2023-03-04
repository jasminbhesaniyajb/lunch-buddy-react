import React, { useEffect, useState } from "react";

import Aos from "aos";
import "aos/dist/aos.css";

import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

import Recaptcha from "react-recaptcha";

import { useTranslation } from "react-i18next";

import { toast } from "react-toastify";

import InputMask from "react-input-mask";

import { CAPCHA_ID, PHONE_MASK, POSTAL_CODE_MASK } from "../../../config";
import { history } from "../../../history";
import Loader from "../../../components/Loader";
import {
  RESTAURANT_REGISTER,
  CHECK_USERNAME_EMAIL,
  GET_CITY,
  GET_PROVINCE,
  GET_RESTAURANT,
} from "../../../services/ENDPOINT";

const PublicRestaurantsRegistration = (props) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [isloader, setLoader] = useState(false);
  const [emailExit, setEmailExit] = useState(false);

  const initialState = {
    isVerified: false,
  };
  const [capacha, setCapacha] = useState(initialState);
  const [city, setCity] = useState([]);
  const [province, setProvince] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [selectCityId, setselectCityId] = useState(null);
  const [restaurantData, setRestaurantData] = useState({});

  const getAllCity = async (e) => {
    const payload = e;
    setselectCityId(payload);
    try {
      const data = await GET_CITY(payload);
      if (data.code === 200 || data.code === "200") {
        setCity(data.data);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

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

  const getAllRestaurant = async () => {
    try {
      const data = await GET_RESTAURANT();
      if (data.code === 200 || data.code === "200") {
        setRestaurant(data.data);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getAllProvince();
  }, []);
  useEffect(() => {
    getAllRestaurant();
  }, []);

  const checkAPICall = async (e) => {
    try {
      setLoader(true);
      if (capacha.isVerified) {
        if (!emailExit) {
          const data = await RESTAURANT_REGISTER(e);
          if (data.code === 200 || data.code === "200") {
            if (data.data.id) {
              if (data.status == "Approval Pending") {
                localStorage.setItem(
                  "eb-mums-lunch:approvalPendingStatus",
                  data.status
                );
                localStorage.setItem(
                  "eb-mums-lunch:approvalPendingMeassage",
                  data.message
                );
                history.push(`/verify-otp?id=${data.data.id}`);
              } else {
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
    } catch (e) {
      toast.error(e);
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
                    password: restaurantData.password || '',
                    user_type: 2,
                    email_address: restaurantData.email_address || '',
                    id_franchise: restaurantData.id_franchise || null,
                    restaurant_name: restaurantData.restaurant_name || '',
                    first_name: restaurantData.first_name || '', 
                    last_name: restaurantData.last_name || '',
                    address: restaurantData.address || '',
                    id_province: restaurantData.id_province || '',
                    id_city: restaurantData.id_city || '',
                    postal_code: restaurantData.postal_code || '',
                    distance: 100,
                    web_site_address: restaurantData.web_site_address || '',
                    primary_contact_number:
                      restaurantData.primary_contact_number || '',
                    emergency_contact_number:
                      restaurantData.emergency_contact_number || '',
                    confirmPassword: restaurantData.confirmPassword || '',
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
                    id_province: Yup.string().required(
                      t("restaurantValidationProvinceRequired")
                    ),
                    id_city: Yup.string().required(
                      t("restaurantValidationCityRequired")
                    ),
                    email_address: Yup.string()
                      .max(75, t("registerValidationEmailMax"))
                      .email(t("loginvalidationEmail"))
                      .required(t("registerValidationEmailRequired")),
                    first_name: Yup.string()
                      .min(3, t("registerValidationFirstNameMin"))
                      .max(30, t("registerValidationFirstNameMax"))
                      .required(t("registerValidationFirstNameRequired")),
                    last_name: Yup.string()
                      .min(3, t("registerValidationLastNameMin"))
                      .max(30, t("registerValidationFirstNameMax"))
                      .required(t("registerValidationLastNameRequired")),
                    address: Yup.string()
                      .min(5, t("restaurantValidationAddressMin"))
                      .max(200, t("restaurantValidationAddressMax"))
                      .required(t("restaurantValidationAddressRequired")),
                    postal_code: Yup.string()
                      .min(3, t("restaurantValidationPostalCodeMin"))
                      .max(10, t("restaurantValidationPostalCodeMax"))
                      .required(t("restaurantValidationPostalCodeRequired")),
                    // distance: Yup.number()
                    //   .min(1, t("restaurantValidationDistanceMin"))
                    //   .max(200, t("restaurantValidationDistanceMax"))
                    //   .required(t("restaurantValidationDistanceRequired")),
                    web_site_address: Yup.string()
                      .min(7, t("restaurantValidationWebsiteMin"))
                      .max(100, t("restaurantValidationWebsiteMax"))
                      .matches(
                        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                        t("restaurantValidationWebsiteMatches")
                      ),
                    primary_contact_number: Yup.string()
                      .min(8, t("restaurantValidationContactNumberMin"))
                      .max(20, t("restaurantValidationContactNumberMax"))
                      .required(t("restaurantValidationContactNumberRequired")),
                    emergency_contact_number: Yup.string()
                      .min(8, t("restaurantValidationContactNumberMin"))
                      .max(20, t("restaurantValidationContactNumberMax"))
                      .required(
                        t("restaurantValidationEmergencyContactNumberRequired")
                      ),
                    confirmPassword: Yup.string()
                      .min(5, t("registerValidationPasswordMin"))
                      .max(30, t("registerValidationPasswordMax"))
                      .required(t("registerValidationConfirmPasswordRequired"))
                      .oneOf(
                        [Yup.ref("password"), null],
                        t("registerValidationConfirmPasswordOneOf")
                      ),
                    restaurant_name: Yup.string()
                    .max(100,t("restaurantValidationRestaurantNameMax"))
                    .required(t("restaurantValidationRestaurantNameRequired")),
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
                            {t("restaurantAccountRegistration")}
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
                              value={restaurantData.email_address || ''}
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.email_address &&
                                touched.email_address &&
                                "is-invalid input-box-error"
                              }`}
                              onChange={(e) => {
                                doSearch(e.target.value, "email_address");
                                const list = { ...values };
                                list['email_address'] = e.target.value || '';
                                setRestaurantData(list);
                              }}
                              autoFocus
                            />
                            <label className="required material-label text-uppercase text-1">
                              {t("registerEmailAddress")}
                            </label>
                          </div>
                          <div className="text-danger">
                            {emailExit &&
                              "Email is already exists. Please try a different email address."}
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
                              as="select"
                              name="id_franchise"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em`}
                              value={restaurantData.id_franchise}
                              onChange={(e) => {
                                const list = { ...values };
                                list['id_franchise'] = e.target.value == 'Select' ? null : e.target.value;
                                setRestaurantData(list);
                              }}
                            >
                              <option value={null}>{t("globleSelect")}</option>
                              {restaurant.map(
                                ({ id, franchise_name }, index) => (
                                  <option value={id} key={index}>
                                    {franchise_name}
                                  </option>
                                )
                              )}
                            </Field>
                            <label className="material-label text-uppercase text-1">
                              {t("restaurantFranchiseName")}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-lg-12 col-md-12">
                          <div className="material-textfield">
                            <Field
                              placeholder=" "
                              name="restaurant_name"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.restaurant_name &&
                                touched.restaurant_name &&
                                "is-invalid input-box-error"
                              }`}
                            />
                            <label className="required material-label text-uppercase text-1">
                              {t("restaurantRestaurantName")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="restaurant_name"
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
                              name="first_name"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.first_name &&
                                touched.first_name &&
                                "is-invalid input-box-error"
                              }`}
                            />
                            <label className="required material-label text-uppercase text-1">
                              {t("registerFirstName")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="first_name"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                        <div className="form-group col-lg-6 col-md-6">
                          <div className="material-textfield">
                            <Field
                              placeholder=" "
                              name="last_name"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.last_name &&
                                touched.last_name &&
                                "is-invalid input-box-error"
                              }`}
                            />
                            <label className="required material-label text-uppercase text-1">
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
                        <div className="form-group col-lg-6 col-md-6 col-sm-12">
                          <div className="material-textfield">
                            <InputMask
                              mask={PHONE_MASK}
                              maskChar={null}
                              value={restaurant.primary_contact_number}
                              placeholder=" "
                              name="primary_contact_number"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.primary_contact_number &&
                                touched.primary_contact_number &&
                                "is-invalid input-box-error"
                                }`}
                                onChange={(e) => {
                                  const list = { ...values };
                                  list['primary_contact_number'] = e.target.value;
                                  setRestaurantData(list);
                                }}
                            />
                            <label className="required material-label text-uppercase text-1">
                              {t("restaurantContactNumber")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="primary_contact_number"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                        <div className="form-group col-lg-6 col-md-6 col-sm-12">
                          <div className="material-textfield">
                            <InputMask
                              mask={PHONE_MASK}
                              maskChar={null}
                              value={restaurant.emergency_contact_number}
                              placeholder=" "
                              name="emergency_contact_number"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.emergency_contact_number &&
                                touched.emergency_contact_number &&
                                "is-invalid input-box-error"
                                }`}
                                onChange={(e) => {
                                  const list = { ...values };
                                  list['emergency_contact_number'] = e.target.value;
                                  setRestaurantData(list);
                                }}
                            />
                            <label className="required material-label text-uppercase text-1">
                              {t("restaurantEmergencyContactNumber")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="emergency_contact_number"
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
                            <label className="required material-label text-uppercase text-1">
                              {t("restaurant Address")}
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
                                setRestaurantData(list);
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
                        <div className="form-group col-lg-6 col-md-6">
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
                              value={restaurant.postal_code}
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
                                setRestaurantData(list);
                              }}
                            />
                            <label className="required material-label text-uppercase text-1">
                              {t("restaurantPostalCode")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="postal_code"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                        {/* <div className="form-group col-lg-6 col-md-6 col-sm-6">
                          <div className="material-textfield">
                            <Field
                              placeholder=" "
                              type="number"
                              name="distance"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.distance &&
                                touched.distance &&
                                "is-invalid input-box-error"
                              }`}
                            />
                            <label className="required material-label text-uppercase text-1">
                              {t("restaurantDistance")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="distance"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div> */}
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
export default PublicRestaurantsRegistration;
