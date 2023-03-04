import React, { useEffect } from "react";
import School from "../../../assets/img/school-page.png";
import Logo from "../../../assets/img/home/logo.png";
import { Link } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useTranslation } from "react-i18next";

const PublicSchool = (props) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0)
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
  const { t } = useTranslation();
  return (
    <React.Fragment>
        <div role="main" className="main">
          <section className="border-0 m-0 parents">
            <div className="inner-page-school">
              <div className="container">
                <div className="row align-items-top text-left h-100">
                  <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                    <img
                      src={School}
                      className="img-fluid page-img"
                      alt={School}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <div className="align-items-bottom inner-page-responsive">
                      <h1 className="text-maven page-title-school font-weight-semibold text-color-dark-secondary text-6 mb-3">
                        <blockquote className="pt-0 position-relative">
                          Hello Schools!
                          <br className="d-block d-none-mobile" />
                          <span className="text-color-light text-2">
                            Let the technology make your life smoother
                            <br className="d-block d-none-mobile" />
                            by registering with us to organize and
                            <br className="d-block d-none-mobile" />
                            manage the Mums Lunches online.
                          </span>
                        </blockquote>
                      </h1>
                      <Link to={"/school-registration"}>
                        <button
                          type="submit"
                          className="btn btn-success btn-modern mt-4 mrg-b-sm"
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
          <section className="school-process mt-5">
            <div className="container">
              <div className="row">
                <div
                  className="col-lg-12 text-center appear-animation"
                  data-aos="fade-up"
                  data-aos-offset="50"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                >
                  <h2 className="font-weight-normal text-maven text-color-secondary text-6 pb-2 mb-2">
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
                    <p className="mb-0">{t("parentSetUpYourChildrenProfiles")}</p>
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
                    <p className="mb-0">
                    {t("parentWaitForLunchDatesAndNotificationFromSchool")}
                    </p>
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
                    <p className="mb-0">{t("parentExploreMenusAndOrder")}</p>
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
                    <p className="mb-0">{t("parentSitBackAndRelax")}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section school-faq-small section-center mb-0">
            <div className="container">
              <div className="row">
                <div className="col">
                  <h2 className="mb-5 text-color-secondary font-weight-semibold text-maven">
                    {t("parentGotQuestions")}
                  </h2>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="alert alert-white text-left">
                        Which foods are best for my children during the break
                        time?
                      </div>
                      <div className="alert alert-white text-left">
                        Which foods are best for my children during the break
                        time?
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="alert alert-white text-left">
                        Which foods are best for my children during the break
                        time?
                      </div>
                      <div className="alert alert-white text-left">
                        Which foods are best for my children during the break
                        time?
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success btn-modern mt-3"
                  >
                    {t("parentGetAnswers")}
                  </button>
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
export default PublicSchool;
