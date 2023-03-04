import React, { useRef, useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useTranslation } from "react-i18next";

import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";

import { toast } from "react-toastify";

import { Link } from "react-router-dom";

import Loader from "../../../components/Loader";
import { SAVE_INQUERY } from "../../../services/auth";
import schoolPng from "../../../assets/img/School-card.png";
import restaurantPng from "../../../assets/img/restaurant-card.png";
import studentParentsPng from "../../../assets/img/student-parents-card.png";
import headerBg from "../../../assets/img/home/kids.png";
import slide1Img from "../../../assets/img/home/slide1.png";
import slide2Img from "../../../assets/img/home/slide2.png";
import slide3Img from "../../../assets/img/home/slide3.png";
import whyLunchBuddyImg from "../../../assets/img/home/why.png";

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

const PublicHome = (props) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [isloader, setLoader] = useState(false);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [selectCityId, setselectCityId] = useState(null);
  const lunchid = useRef();
  const [contactUs, setContactUs] = useState([]);
  const handleScrollToElement = () => {
    window.scrollTo({
      behavior: "smooth",
      top: lunchid.current.offsetTop - 40,
    });
  };

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
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch ({ data }) {
      toast.error(data.message);
    } finally {
      setLoader(false);
    }
  };
  let slider = useRef();
  const next = () => {
    slider.slickNext();
  };
  const previous = () => {
    slider.slickPrev();
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
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
  const { t } = useTranslation();
  return (
    <React.Fragment>
    <div role="main" className="main">
      {isloader ? <Loader /> : null}
      <section className="border-0 m-0 jumbotron">
        <div className="container h-100">
          <div className="row align-items-top text-center h-100">
            <div className="col">
              <div
                data-aos="fade-zoom-in"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000"
                className="align-items-bottom"
              >
                <h1 className="text-color-secondary text-maven main-title font-weight-semibold text-8 mb-3">
                  <span className="text-color-quaternary">
                    {t("homeMumsLunch")}
                  </span>
                  <br />
                  {t("homeHassleFree")}
                  <br className="d-block d-none-mobile" />
                </h1>
                <button
                  type="submit"
                  className="btn btn-dark text-white btn-modern"
                  onClick={() => handleScrollToElement()}
                >
                  {t("homeRegisterStudentAccount")}
                </button>
              </div>
              <div className="kids-img"><img className="img-fluid" src={headerBg} alt={headerBg} width="750"/></div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="featured-boxes featured-boxes-flat bg-light-gray py-5"
        ref={lunchid}
      >
        <div className="container">
          <div className="row">
            <div
              className="col-lg-12 text-center"
              data-aos="fade-up"
              data-aos-offset="10"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <h2 className="font-weight-normal text-maven text-color-secondary text-6 pb-2 mb-2">
                <strong className="font-weight-semibold text-maven">
                  Let the Mums Lunches be fun for all…!
                </strong>
              </h2>
              <p className="mb-4">
                Mums Lunch is an excellent platform to facilitate schools,
                parents and restaurants to organise fun-lunches with ease.
                <br />
                We also offer an additional flexible feature for ordering the
                daily lunch for kids.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="featured-box featured-box-secondary featured-box-effect-2">
                <div className="box-content box-content-border-bottom min-h-335">
                  <i className="icon-featured">
                    <img src={schoolPng} alt={schoolPng} />
                  </i>
                  <h4 className="font-weight-semibold text-maven text-5 mt-4">
                    {t("homeSchools")}
                  </h4>
                  <ul className="mt-2 mb-4 text-2 color-light-gray text-left pl-3">
                    <li>
                      Counting cash manually and Dealing with paper-based orders
                      is tough and error-prone.
                    </li>
                    <li>
                      We believe that fun-lunch events should be fun for you
                      too.
                    </li>
                    <li>You also think so ?</li>
                  </ul>
                  <Link
                    to="/schools"
                    type="button"
                    className="btn btn-secondary text-white mb-2 font-weight-bold w-120"
                  >
                    {t("globleYes")}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="featured-box featured-box-primary featured-box-effect-2">
                <div className="box-content box-content-border-bottom min-h-335">
                  <i className="icon-featured">
                    <img src={studentParentsPng} alt={studentParentsPng} />
                  </i>
                  <h4 className="font-weight-semibold text-maven text-5 mt-4">
                    {t("homeStudents&Parents")}
                  </h4>
                  <ul className="mt-2 mb-4 text-2 color-light-gray text-left pl-3">
                    <li>
                      We know how hard it is to parent. It's like a fulltime job
                      but no weekends, no time-off.
                    </li>
                    <li>We believe that you deserve to relax.</li>
                    <li>Want to know how ?</li>
                  </ul>
                  <Link
                    to="/parents"
                    type="button"
                    className="btn btn-primary text-white mb-2 font-weight-bold w-120 mrg-top-24 mrg-t-0"
                  >
                    {t("homeClickHere")}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="featured-box featured-box-quaternary featured-box-effect-2">
                <div className="box-content box-content-border-bottom min-h-335">
                  <i className="icon-featured">
                    <img src={restaurantPng} alt={restaurantPng} />
                  </i>
                  <h4 className="font-weight-semibold text-maven text-5 mt-4">
                    {t("homeRestaurants")}
                  </h4>
                  <ul className="mt-2 mb-4 text-2 color-light-gray text-left pl-3">
                    <li>Bulk orders are always welcomed at restaurants.</li>
                    <li>
                      And if they come with flexible platform, who says no!?
                    </li>
                    <li>Do you wanna grow with us ?</li>
                  </ul>
                  <Link
                    to="/restaurants"
                    type="button"
                    className="btn btn-quaternary text-white mb-2 font-weight-bold w-120"
                  >
                    {t("homeClickForSure")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2
              className="font-weight-normal text-maven text-color-quaternary text-6 pb-2 mb-4"
              data-aos="fade-up"
              data-aos-offset="50"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <strong className="font-weight-semibold">
                {t("homeHowWeworks")}
              </strong>
            </h2>
          </div>
          <div className="w-100 position-relative">
            <Slider ref={(c) => (slider = c)} {...settings}>
              <div className="img-thumbnail border-0 p-0 d-block">
                <img
                  src={slide1Img}
                  className="img-fluid border-radius-0 position-relative bg-img-color"
                  alt={slide1Img}
                />
                <div className="col-lg-6 col-md-6 col-sm-6 mx-auto">
                  <div className="text-center slider-content">
                    <h2 className="font-weight-semibold text-maven mb-1 text-6 text-color-primary">
                    {t("homeParents")}
                    </h2>
                    <p className="text-white">
                      Enough of sending cash for Mums Lunches No more paper
                      forms for orders Choose right food from menu options based
                      on nutritional info A day off from packing lunches!!
                    </p>
                  </div>
                </div>
              </div>
              <div className="img-thumbnail border-0 p-0 d-block">
                <img
                  src={slide2Img}
                  className="img-fluid border-radius-0 position-relative bg-img-color"
                  alt={slide2Img}
                />
                <div className="col-lg-6 col-md-6 col-sm-6 mx-auto">
                  <div className="text-center slider-content">
                    <h2 className="font-weight-semibold text-maven mb-1 text-6 text-color-secondary">
                    {t("homeSchools")}
                    </h2>
                    <p className="text-white">
                      Mums Lunches will be fun for schools too No more manual
                      paper forms and counting cash Can plan for more and more
                      Mums Lunches Fundraise is a plus!!
                    </p>
                  </div>
                </div>
              </div>
              <div className="img-thumbnail border-0 p-0 d-block">
                <img
                  src={slide3Img}
                  className="img-fluid border-radius-0 position-relative"
                  alt={slide3Img}
                />
                <div className="col-lg-6 col-md-6 col-sm-6 mx-auto">
                  <div className="text-center slider-content">
                    <h2 className="font-weight-semibold text-maven mb-1 text-6 text-color-quaternary">
                    {t("homeRestaurants")}
                    </h2>
                    <p className="text-white">
                      Paperless orders Early notifications from schools No
                      orders, no fees Sign up is free for restaurants too!!
                    </p>
                  </div>
                </div>
              </div>
            </Slider>
            <div className="eb-slider-nav" style={{ textAlign: "center" }}>
              <button className="eb-slider-prev" onClick={previous}></button>
              <button className="eb-slider-next" onClick={next}></button>
            </div>
          </div>
        </div>
      </div>
      <section className="why-us pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 p-0">
              <section
                className="section section-text-light section-background section-center match-height border-top-0"
                style={{
                  backgroundImage: "url(" + whyLunchBuddyImg + ")",
                  minHeight: "300px",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "299.2px",
                }}
              >
              <div></div>
              </section>
            </div>
            <div className="col-lg-6 p-0">
              <section className="section section-default pl-4 pr-4 match-height border-top-0">
                <div className="row">
                  <div className="col">
                    <h2 className="font-weight-semibold text-maven mb-3 text-6 text-color-primary">
                      {t("homeWhyLunchBuddy")}
                    </h2>
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula eget dolor. Aenean massa. <br />
                      Nulla consequat massa quis enim.Donec pede justo,
                      fringilla vel, aliquet nec, vulputate eget, arcu.In enim
                      justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                      Nullam dictum felis eu pede mollis pretium.Integer
                      tincidunt. Cras dapibus. Vivamus elementum semper
                      nisi.Aenean vulputate eleifend tellus.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
      <section className="section-height-3 form-section border-0 m-0">
        <div className="container">
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
                  id_province: contactUs.id_province || '',
                  id_city: contactUs.id_city || '',
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
                              <option value={null}>{t("globleSelect")}</option>
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
                    </div>
                    <div className="form-row">
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
export default PublicHome;
