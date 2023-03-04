import React from "react";
import schoolPng from "../../assets/img/School-card.png";
import studentParentsPng from "../../assets/img/student-parents-card.png";
import restaurantPng from "../../assets/img/restaurant-card.png";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegisterTypePopup = (props) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Modal
        size="lg"
        show={true}
        onHide={() => props.closeModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create an account</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="featured-box featured-box-secondary featured-box-hover featured-box-effect-2">
                <Link to={"/school-registration"}>
                  <div className="box-content box-content-border-bottom min-h-266">
                      <i className="icon-featured cursor-pointer">
                        <img src={schoolPng} className="mt-3" alt={schoolPng} />
                      </i>
                    <h4 className="font-weight-semibold text-maven text-5 mt-2">
                      {t("homeSchools")}
                    </h4>
                  </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="featured-box featured-box-primary featured-box-hover featured-box-effect-2">
                <Link to={"/registration"}>
                  <div className="box-content box-content-border-bottom min-h-266">
                      <i className="icon-featured cursor-pointer">
                        <img
                          src={studentParentsPng}
                          className="mt-3"
                          alt={studentParentsPng}
                        />
                      </i>
                    <h4 className="font-weight-semibold text-maven text-5 mt-2">
                      {t("homeStudents&Parents")}
                    </h4>
                  </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="featured-box featured-box-quaternary featured-box-hover featured-box-effect-2">
                <Link to={"/restaurants-registration"}>
                  <div className="box-content box-content-border-bottom min-h-266">
                      <i className="icon-featured cursor-pointer">
                        <img
                          src={restaurantPng}
                          className="mt-3"
                          alt={restaurantPng}
                        />
                      </i>
                    <h4 className="font-weight-semibold text-maven text-5 mt-2">
                      {t("homeRestaurants")}
                    </h4>
                  </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default RegisterTypePopup;
