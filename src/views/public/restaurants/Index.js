import React, { useEffect, useState } from "react";
import Restaurant from "../../../assets/img/restaurant-banner.png";
import Logo from "../../../assets/img/home/logo.png";
import { Accordion, Card } from "react-bootstrap";
import ChevronRight from "../../../assets/img/icons/chevron-right.svg";
import { Link } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useTranslation } from "react-i18next";

const PublicRestaurants = (props) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

const [selectCollapse, setSelectCollapse] = useState("0");

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
  const { t } = useTranslation();
  return (
    <React.Fragment>
        <div role="main" className="main">
          <section className="border-0 m-0 restaurant">
            <div className="inner-page">
              <div className="container">
                <div className="row align-items-top text-left h-100">
                  <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                    <img
                      src={Restaurant}
                      className="img-fluid page-img"
                      alt={Restaurant}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <div className="align-items-bottom inner-page-responsive">
                      <h1 className="text-maven page-title-restaurant font-weight-semibold text-color-tertiary text-6 mb-3">
                        <blockquote className="border-left-0 position-relative pt-0">
                          Hello Restaurants! <br />
                          Ready for more orders from the <br /> new set of
                          customers!!?
                          <br className="d-block d-none-mobile" />
                          <span className="text-color-light text-2">
                            Mums Lunch is a new way for restaurants to get
                            <br className="d-block d-none-mobile" />
                            bulk orders and boost up their revenue. And all
                            <br className="d-block d-none-mobile" />
                            these good things with no sign up fees!
                          </span>
                        </blockquote>
                      </h1>
                      <Link to={"/restaurants-registration"}>
                        <button
                          type="submit"
                          className="btn btn-warning btn-modern mrg-b-sm"
                        >
                          {t("parentRegisterStudentAccount")}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="restaurant-process">
            <div className="container">
              <div className="row">
                <div
                  className="col-lg-12 text-center appear-animation"
                  data-aos="fade-up"
                  data-aos-offset="50"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                >
                  <h2 className="font-weight-normal text-maven text-color-tertiary text-6 pb-2 mb-2">
                    <strong className="font-weight-semibold text-maven">
                      {t("parentHowItWorks")}
                    </strong>
                  </h2>
                  <p className="mb-4">
                    You will receive an invitation from your children’s school
                    to register an account.
                    <br /> Click the registration link and
                  </p>
                </div>
              </div>
              <div className="row process process-shapes mt-5">
                <div
                  className="process-step col-lg-4 mb-5 mb-lg-4 appear-animation"
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="500"
                >
                  <div className="process-step-circle">
                    <strong className="process-step-circle-content">01</strong>
                  </div>
                  <div className="process-step-content">
                    <h4 className="mb-1 text-5 font-weight-bold">
                      {t("parentFirstStep")}
                    </h4>
                    <p className="mb-0">{t("parentSignUpForFree")}</p>
                  </div>
                </div>
                <div
                  className="process-step col-lg-4 mb-5 mb-lg-4 appear-animation"
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                >
                  <div className="process-step-circle">
                    <strong className="process-step-circle-content">02</strong>
                  </div>
                  <div className="process-step-content">
                    <h4 className="mb-1 text-5 font-weight-bold">
                      {t("parentSecondStep")}
                    </h4>
                    <p className="mb-0">
                    {t("restaurantSetUpYourProfile")} <br /> {t("restaurantAndMenuDetailsAndPrices")}
                    </p>
                  </div>
                </div>
                <div
                  className="process-step col-lg-4 mb-5 mb-lg-4 appear-animation"
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1500"
                >
                  <div className="process-step-circle">
                    <strong className="process-step-circle-content">03</strong>
                  </div>
                  <div className="process-step-content">
                    <h4 className="mb-1 text-5 font-weight-bold">
                      {t("parentThirdStep")}
                    </h4>
                    <p className="mb-0">{t("restaurantWaitForMumsLunchOrders")}</p>
                  </div>
                </div>
              </div>
              <div className="row process process-shapes mt-lg-5">
                <div
                  className="process-step col-lg-4 offset-lg-2 mb-5 mb-lg-4 appear-animation"
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="500"
                >
                  <div className="process-step-circle">
                    <strong className="process-step-circle-content">04</strong>
                  </div>
                  <div className="process-step-content">
                    <h4 className="mb-1 text-5 font-weight-bold">
                      {t("parentFourthStep")}
                    </h4>
                    <p className="mb-0">{t("restaurantDeliver")}</p>
                  </div>
                </div>
                <div
                  className="process-step col-lg-4 mb-5 mb-lg-4 appear-animation"
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                >
                  <div className="process-step-circle">
                    <strong className="process-step-circle-content">05</strong>
                  </div>
                  <div className="process-step-content">
                    <h4 className="mb-1 text-5 font-weight-bold">
                      {t("parentFifthStep")}
                    </h4>
                    <p className="mb-0">{t("restaurantGetThePayment")}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section restaurant-faq-small section-center mb-0">
            <div className="container">
              <div className="row">
                <div className="col">
                  <h2 className="mb-5 text-color-tertiary font-weight-semibold text-maven">
                    {t("parentGotQuestions")}
                  </h2>
                  <Accordion defaultActiveKey="0" onSelect={(e) => setSelectCollapse(e)}>
                    <Card className="border-0 mb-2">
                      <Accordion.Toggle as={Card.Header} eventKey="0">
                        <div className="alert text-left mb-0 bg-white cursor-pointer">
                          <img src={ChevronRight} className={`mr-1 collaps-arrow cursor-pointer ${
                              selectCollapse === "0"
                                ? "arrowDirectionDown"
                                : null
                            }`} alt="arrow" width="15" />
                          How many days before parents have to place an order
                          for their kids Daily Lunch?
                        </div>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <p className="text-left">
                            Parents need to book the lunch one week in advance
                            for the upcoming week. For instance, if parents want
                            to order the lunch for a let’s say third week of May
                            then the deadline to order the lunch will be the
                            midnight Friday of the second week of May. (Admin
                            has to prepare the list of Saturday Morning and send
                            the list to restaurants.
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="border-0 mb-2">
                      <Accordion.Toggle as={Card.Header} eventKey="1">
                        <div className="alert text-left mb-0 bg-white cursor-pointer">
                        <img src={ChevronRight} className={`mr-1 collaps-arrow cursor-pointer ${
                              selectCollapse === "1"
                                ? "arrowDirectionDown"
                                : null
                            }`} alt="arrow" width="15" />
                          Why do I need to Pay the payment processing fee and
                          fixed transaction amount in every order?
                        </div>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <p className="text-left">
                            For using third party payment services to secure the
                            parents card details, third party levy additional
                            processing fees on every order which is why we take
                            additional processing fees to show up on every order
                            when parents pay the money. Fixed transaction amount
                            is taken to account for the GST payment that we have
                            to pay to restaurants.
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="border-0 mb-2">
                      <Accordion.Toggle as={Card.Header} eventKey="2">
                        <div className="alert text-left mb-0 bg-white cursor-pointer">
                        <img src={ChevronRight} className={`mr-1 collaps-arrow cursor-pointer ${
                              selectCollapse === "2"
                                ? "arrowDirectionDown"
                                : null
                            }`} alt="arrow" width="15" />
                          What if Restaurants could not serve that menu that was
                          ordered by parents?
                        </div>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <p className="text-left">
                            Restaurants are given the option to choose the
                            available menu a week in advance so in that case
                            restaurants have to manage that menu item which was
                            on the list and ordered by the . A few exceptions
                            can be made however restaurants have to immediately
                            notify Mums Lunch coordinator.
                          </p>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                  <Link to={"/restaurant-faq"}>
                    <button
                      type="submit"
                      className="btn btn-warning btn-modern mt-5"
                    >
                      {t("parentGetAnswers")}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="parallax section section-text-light section-parallax testimonial-bg-img section-center mt-0 mb-0">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <Slider {...settings} className="eb-slider">
                    <div className="row justify-content-center parallax">
                      <div className="img-thumbnail border-0 p-0 d-block col-lg-10 mx-auto bg-transparent">
                        <div className="nav-bottom rounded-nav">
                          <div>
                            <div className="testimonial testimonial-style-2 testimonial-with-quotes mb-0">
                              <div className="testimonial-author">
                                <img
                                  src={Logo}
                                  className="img-fluid rounded-circle"
                                  alt=""
                                />
                              </div>
                              <blockquote>
                                <p className="mb-0">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Sed eget risus porta,
                                  tincidunt turpis at, interdum tortor.
                                  Suspendisse potenti. Lorem ipsum dolor sit
                                  amet, consectetur adipiscing elit. Sociis
                                  natoque penatibus et magnis dis parturient
                                  montes, nascetur ridiculus mus. Fusce ante
                                  tellus, convallis non consectetur sed,
                                  pharetra nec ex.
                                </p>
                              </blockquote>
                              <div className="testimonial-author">
                                <p>
                                  <strong className="font-weight-extra-bold">
                                    U.S Pizza
                                  </strong>
                                  <span>Restaurant</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row justify-content-center parallax">
                      <div className="img-thumbnail border-0 p-0 d-block col-lg-10 mx-auto bg-transparent">
                        <div className="nav-bottom rounded-nav">
                          <div>
                            <div className="testimonial testimonial-style-2 testimonial-with-quotes mb-0">
                              <div className="testimonial-author">
                                <img
                                  src={Logo}
                                  className="img-fluid rounded-circle"
                                  alt=""
                                />
                              </div>
                              <blockquote>
                                <p className="mb-0">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Sed eget risus porta,
                                  tincidunt turpis at, interdum tortor.
                                  Suspendisse potenti. Lorem ipsum dolor sit
                                  amet, consectetur adipiscing elit. Sociis
                                  natoque penatibus et magnis dis parturient
                                  montes, nascetur ridiculus mus. Fusce ante
                                  tellus, convallis non consectetur sed,
                                  pharetra nec ex.
                                </p>
                              </blockquote>
                              <div className="testimonial-author">
                                <p>
                                  <strong className="font-weight-extra-bold">
                                    John Smith
                                  </strong>
                                  <span>CEO & Founder - Okler</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </section>
        </div>
    </React.Fragment>
  );
};
export default PublicRestaurants;
