import React, { useState, useEffect } from "react";

import { useLocation, Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import mumsLogo from "../../assets/img/mums-logo.png";
import PublicNavbar from "../../components/public/PublicNavbar";
import SignIcon from "../../assets/img/icons/login-icon.svg";

const PublicHeader = (props) => {
  let currentPath = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  
  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('eb-mums-lunch:token'))
      setUserInfo(userInfo)
    } catch {}
    const token = localStorage.getItem('eb-mums-lunch:token')
    const userType = localStorage.getItem('eb-mums-lunch:userType')
    setUserType(userType)
    if (token && userType) setIsLogging(true)
    else setIsLogging(false)
  })
  
  const handleToggle = (e) => {
    e.preventDefault();
    setExpanded(!isExpanded);
  };
  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
      isCancelled = true;
    };
  }, []);

  const redirectDashboard = () => {
    if(userType == 1) return '/admin/dashboard'
    if(userType == 2) return '/restaurant/dashboard'
    if(userType == 3) return '/school/dashboard'
    if(userType == 4) return '/parent/dashboard'
  }

  const { t } = useTranslation();

  return (
    <React.Fragment>
    <header
      id="header"
      className="header-transparent header-semi-transparent header-semi-transparent-light header-effect-shrink"
    >
      <div
        className={`header-body header-drop-shadow border-top-0 ${
          isExpanded ? "show-header" : "hide-header"
        } `}
      >
        <PublicNavbar />
        <div
          className={`${
            scrolled ? "scrolled-top-header" : ""
          } header-container container`}
        >
          <div className="header-row justify-content-between">
            <div className="d-flex align-items-center">
              <div>
                <div className="header-row">
                  <div className="header-logo">
                    <img
                      alt="Mums Lunch"
                      height="100"
                      src={mumsLogo}
                      className={`${scrolled ? "sticky-logo" : ""}`}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="header-row">
                  <div className="header-nav header-nav-line header-nav-top-line header-nav-top-line-animated">
                    <div className="header-nav-main header-nav-main-square header-nav-main-effect-2 header-nav-main-sub-effect-1">
                    <nav className={`${scrolled ? "sticky-logo-nav-margin" : "non-sticky-logo"} collapse ${isExpanded ? "show" : ""}`}>
                        <ul className="nav nav-pills" id="mainNav">
                          <li className="dropdown">
                            <Link
                              to={"/"}
                              className={`${
                                currentPath.pathname === "/" ? "active" : ""
                              } dropdown-item`}
                            >
                              {t("headerHome")}
                            </Link>
                          </li>
                          <li className="dropdown">
                            <Link
                              to={"/about"}
                              className={`${
                                currentPath.pathname === "/about"
                                  ? "active"
                                  : ""
                              } dropdown-item`}
                            >
                              {t("headerAbout")}
                            </Link>
                          </li>
                          <li className="dropdown">
                            <Link
                              to={"/parents"}
                              className={`${
                                currentPath.pathname === "/parents"
                                  ? "active"
                                  : ""
                              } dropdown-item`}
                            >
                              {t("headerParents")}
                            </Link>
                          </li>
                          <li className="dropdown">
                            <Link
                              to={"/schools"}
                              className={`${
                                currentPath.pathname === "/schools"
                                  ? "active"
                                  : ""
                              } dropdown-item`}
                            >
                              {t("headerSchools")}
                            </Link>
                          </li>
                          <li className="dropdown">
                            <Link
                              to={"/restaurants"}
                              className={`${
                                currentPath.pathname === "/restaurants"
                                  ? "active"
                                  : ""
                              } dropdown-item`}
                            >
                              {t("headerRestaurants")}
                            </Link>
                          </li>
                          <li className="dropdown">
                            <Link
                              to={"/contact-us"}
                              className={`${
                                currentPath.pathname === "/contact-us"
                                  ? "active"
                                  : ""
                              } dropdown-item`}
                            >
                              {t("headerContactUs")}
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    <button
                      className="btn header-btn-collapse-nav"
                      onClick={(e) => handleToggle(e)}
                    >
                      <i className="fas fa-bars"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="header-nav header-nav-line header-nav-top-line header-nav-top-line-animated">
            <nav>
                <ul className="d-flex list-unstyled nav nav-pills mb-0" id="mainNav">
                  {!isLogging && 
                    <li className="dropdown">
                      <Link className="font-weight-700 py-4" to={"/login"}>
                        {t("navbarSignIn")}
                        <img
                          src={SignIcon}
                          className="ml-1"
                          alt="signIcon"
                          width="25"
                        />
                      </Link>
                    </li>
                  }
                  
                  {isLogging && redirectDashboard &&
                    <li className="dropdown">
                      <Link className="font-weight-700 py-4" to={redirectDashboard}>
                        {'Dashboard '}
                        <img
                          src={SignIcon}
                          alt="signIcon"
                          width="25"
                        />
                      </Link>
                    </li>
                  }
              </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
    </React.Fragment>
  );
};
export default PublicHeader;
