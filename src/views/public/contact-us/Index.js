import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import Aos from "aos";
import "aos/dist/aos.css";

import { Formik, Field, Form, ErrorMessage } from "formik";

import { Link } from "react-router-dom";

import * as Yup from "yup";

import { toast } from "react-toastify";

import Loader from "../../../components/Loader";
import { SAVE_INQUERY } from "../../../services/auth";

import { GET_CITY, GET_PROVINCE } from "../../../services/ENDPOINT";

const formSchema = Yup.object().shape({
  contact_email_address: Yup.string()
    .email("Invalid email")
    .max(75, "Email must be 75 characters!")
    .required("Email is required"),
  first_name: Yup.string()
    .min(3, "Full name must be 3 characters!")
    .max(50, "Full name must be 50 characters!")
    .required("Full name is required"),
  last_name: Yup.string()
    .min(3, "Last name must be 3 characters!")
    .max(50, "Last name must be 50 characters!")
    .required("Last name is required"),
  message_content: Yup.string()
    .min(10, "Message must be 10 characters!")
    .max(1000, "Message must be 1000 characters!")
    .required("Message is required"),
  user_type: Yup.string().required("User type is required"),
});

const PublicContactUs = (props) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [isloader, setLoader] = useState(false);
  const [city, setCity] = useState([]);
  const [province, setProvince] = useState([]);
  const [selectCityId, setselectCityId] = useState(null);
  const [contactUs, setContactUs] = useState([]);
  const { t } = useTranslation();  

  const getAllCity = async (e) => {
    if(e !== "Select" && e !== null){
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

  useEffect(() => {
    getAllProvince();
  }, []);

  const checkAPICall = async (e) => {
    try {
      setLoader(true);
      await SAVE_INQUERY(e);
      toast.success("Your Inquery Added Successfully");
      contactUs.contact_email_address= ""
      contactUs.first_name= ""
      contactUs.last_name= ""
      contactUs.id_province= ""
      contactUs.id_city= ""
      contactUs.message_content= ""
    } catch ({ data }) {
      toast.error(data.message);
    } finally {
      setLoader(false);
    }
  };
  return (
    <React.Fragment>
      <div role="main" className="main">
        {isloader ? <Loader /> : null}
        <section className="section-height-3 form-section border-0 m-0 padding-top-120">
          <div className="container">
            <div className="row pt-4">
              <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
                <div className="contact-us-top-card">
                  <p className="mb-0">
                    There’s a lot going on behind the curtain at MumsLunch. Find
                    some of the most common questions that our users can have.
                  </p>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
                <div className="contact-us-top-card">
                  <p className="mb-0">
                    We are operational in some of the schools of Calgary,
                    Okotoks, Cochrane, and XYZ. MumsLunch is growing and will be
                    avalilable in more schools and cities soon. If you would
                    like us to provide our service to your school and city soon,
                    please let us know by contacting us at
                    <a href={`mailto:${"info.mumslunch@gmail.com"}`}> info.mumslunch@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="col-lg-12 text-center"
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000"
              >
                <h2 className="font-weight-normal text-maven text-color-tertiary text-6 pb-2 mb-0">
                  <strong className="font-weight-semibold">
                    {t("homeContactUs")}
                  </strong>
                </h2>
                <p className="mb-4">
                  To learn about our services, or submit questions, comments, or
                  concerns,
                  <br />
                  please fill out the form below. We are happy to help with any
                  questions you may have. <br /> A member of mumsLunch crew will
                  respond shortly.
                </p>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6 mx-auto">
                <Formik
                  enableReinitialize
                  initialValues={{
                    contact_email_address: contactUs.contact_email_address || '',
                    first_name: contactUs.first_name || '',
                    last_name: contactUs.last_name || '',
                    user_type: "" || '',
                    service_type: "" || '',
                    message_content: contactUs.message_content || '',
                    id_province: contactUs.id_province || null,
                    id_city: contactUs.id_city || null,
                  }}
                  validationSchema={formSchema}
                  onSubmit={async (fields) => {
                    checkAPICall(fields);
                  }}
                >
                  {({ errors, touched, values }) => (
                    <Form className="contact-form">
                      <div className="contact-form-success alert alert-success d-none mt-4">
                        <strong>Success!</strong> Your message has been sent to
                        us.
                      </div>

                      <div className="contact-form-error alert alert-danger d-none mt-4">
                        <strong>Error!</strong> There was an error sending your
                        message.
                        <span className="mail-error-message text-1 d-block"></span>
                      </div>
                      <div className="form-row">
                        <div className="form-group col">
                          <div className="material-textfield">
                            <Field
                              placeholder=" "
                              name="contact_email_address"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em ${
                                errors.contact_email_address &&
                                touched.contact_email_address &&
                                "is-invalid input-box-error"
                              }`}
                              autoFocus
                            />
                            <label className="required material-label text-uppercase text-1">
                              {t("homeContactusEmailAddress")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="contact_email_address"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-lg-6">
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
                              {t("homeContactusFirstName")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="first_name"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                        <div className="form-group col-lg-6">
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
                              {t("homeContactusLastName")}
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
                        <div className="form-group col-lg-6">
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
                              value={values.id_school}
                              onChange={(e) => {
                                getAllCity(e.target.value);
                                const list = { ...values };
                                list['id_province'] = e.target.value == 'Select' ? null : e.target.value;
                                setContactUs(list);
                              }}
                            >
                              <option value={null}>Select</option>
                              {province.map(({ id, province_name }, index) => (
                                <option value={id} key={index}>
                                  {province_name}
                                </option>
                              ))}
                            </Field>
                            <label className="material-label text-uppercase text-1">
                              {t("restaurantProvince")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="id_province"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                        <div className="form-group col-lg-6">
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
                              <option value={null}>{t("globleSelect")}</option>
                              {city.map(({ id, city_name }, index) => (
                                <option value={id} key={index}>
                                  {city_name}
                                </option>
                              ))}
                            </Field>
                            <label className="material-label text-uppercase text-1">
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
                        <div className="form-group col-lg-12">
                          <label className="required font-weight-semibold text-dark text-uppercase text-1">
                            {t("homeContactusInquiryType")}
                          </label>
                          <div role="group" aria-labelledby="my-radio-group">
                            <label className="mr-3">
                              <Field
                                className="mr-2"
                                type="radio"
                                name="user_type"
                                value="2"
                              />
                              {t("homeContactusInquiryTypeSchool")}
                            </label>
                            <label className="mr-3">
                              <Field
                                className="mr-2"
                                type="radio"
                                name="user_type"
                                value="3"
                              />
                              {t("homeContactusInquiryTypeParent")}
                            </label>
                            <label>
                              <Field
                                className="mr-2"
                                type="radio"
                                name="user_type"
                                value="4"
                              />
                              {t("homeContactusInquiryTypeRestaurant")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="picked"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                        <div className="form-group col-lg-12">
                          <label className="required font-weight-semibold text-dark text-uppercase text-1">
                          {t("homeContactusServiceType")}
                          </label>
                          <div role="group" aria-labelledby="my-radio-group">
                            <label className="mr-3">
                              <Field
                                className="mr-2"
                                type="radio"
                                name="service_type"
                                value="1"
                              />
                               {t("homeCotactUsServiceTypeFunLunch")}
                            </label>
                            <label className="mr-3">
                              <Field
                                className="mr-2"
                                type="radio"
                                name="service_type"
                                value="2"
                              />
                              {t("homeCotactUsServiceTypeRegularLunch")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="service_type"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col">
                          <div className="material-textfield">
                            <Field
                              placeholder=" "
                              style={{ height: "118px" }}
                              as="textarea"
                              name="message_content"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input ${
                                errors.message_content &&
                                touched.message_content &&
                                "is-invalid input-box-error"
                              }`}
                            />
                            <label className="required textarea-label text-uppercase text-1">
                              {t("homeContactusMessage")}
                            </label>
                          </div>
                          <ErrorMessage
                            name="message_content"
                            component="div"
                            className="field-error text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-row text-center">
                        <div className="form-group col mb-0">
                          <input
                            type="submit"
                            value={t("homeSendMessage")}
                            className="btn btn-dark btn-modern"
                            data-loading-text="Loading..."
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
export default PublicContactUs;
