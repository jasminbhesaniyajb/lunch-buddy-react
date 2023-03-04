import React from "react";
import mumsLogo from "../../assets/img/mums-logo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PublicScrollBottom from "../ScrollBottom";

const PublicFooter = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
    <footer id="footer">
      <div className="container">
        <div className="row py-5 my-4">
          <div className="col-md-5 mb-4 mb-lg-0">
            <a href="index.html" className="logo pr-0 pr-lg-3">
              <img
                alt="Mums Lunch"
                src={mumsLogo}
                className="opacity-7 bottom-4"
                height="40"
              />
            </a>
            <p className="mt-2 mb-2">{t("footerDescription")}</p>
            <p className="mb-0">
              <Link to={"/privacy-policy"} className="btn-flat btn-xs">
                <strong className="text-2">{t("footerPrivacyPolicy")}</strong>
              </Link>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Link to={"/terms-and-condition"} className="btn-flat btn-xs">
                <strong className="text-2">
                  {t("footerTermsAndCondition")}
                </strong>
              </Link>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Link to={"/cancellation-refund-policy"} className="btn-flat btn-xs">
                <strong className="text-2">
                  Cancellation and Refund Policy
                </strong>
              </Link>
            </p>
          </div>
          <div className="col-md-4">
            <h5 className="text-3 text-dark mb-3">{t("footerContactUs")}</h5>
            <ul className="list list-icons list-icons-lg">
              <li className="mb-1">
                <i className="far fa-dot-circle text-color-primary"></i>
                <p className="m-0">{t("address")}</p>
              </li>
              <li className="mb-1">
                <i className="fab fa-whatsapp text-color-primary"></i>
                <p className="m-0">
                  <a href="tel:8001234567" rel="noopener">
                    (800) 123-4567
                  </a>
                </p>
              </li>
              <li className="mb-1">
                <i className="far fa-envelope text-color-primary"></i>
                <p className="m-0">
                  <a href="mailto:mail@example.com" rel="noopener">
                    mail@example.com
                  </a>
                </p>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5 className="text-3 text-dark mb-3">{t("footerFollowUs")}</h5>
            <ul className="social-icons">
              <li className="social-icons-facebook">
                <a
                  href="http://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li className="social-icons-twitter">
                <a
                  href="http://www.twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="social-icons-linkedin">
                <a
                  href="http://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Linkedin"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright footer-copyright-style-2">
        <div className="container py-2">
          <div className="row">
            <div className="col d-flex align-items-center justify-content-center text-white">
              <p>{t("footerAllRightsReserved")}</p>
            </div>
          </div>
        </div>
      </div>
      <PublicScrollBottom />
    </footer>
    </React.Fragment>
  );
};
export default PublicFooter;
