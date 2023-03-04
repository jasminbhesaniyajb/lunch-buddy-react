import React from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import Nav from 'react-bootstrap/Nav'
const PublicNavbar = (hideTop) => {
  // const [scrolled, setScrolled] = useState(false);

  // Scroll to Sticky navbar
  // const handleScroll = () => {
  //   const offset = window.scrollY;
  //   if (offset > 200) {
  //     setScrolled(true);
  //   } else {
  //     setScrolled(false);
  //   }
  // };
  // useEffect(() => {
  //   let isCancelled = false;
  //   if (!isCancelled) {
  //     window.addEventListener("scroll", handleScroll);
  //   }
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     isCancelled = true;
  //   };
  // }, []);

  // const { t } = useTranslation();

  return (
    <React.Fragment>
    {/* <div
      className={` ${
        scrolled ? "scrolled-top-hide" : ""
      } header-top header-top-borders`}
    >
      <div className="container h-100">
        <div className="header-row h-100">
          <div className="header-column justify-content-start d-none-mobile">
            <div className="header-row">
              <nav className="header-nav-top">
                <ul className="nav nav-pills">
                  <li className="nav-item nav-item-borders py-2 d-sm-inline-flex">
                    <span className="pl-0">
                      <i className="far fa-dot-circle text-4 text-color-primary" />
                      Lorem ipsum dolor sit amet
                    </span>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="header-column justify-content-end">
            <div className="header-row">
              <nav className="header-nav-top">
                <ul className="nav nav-pills">
                  <li className="nav-item nav-item-borders py-2 d-lg-inline-flex">
                    <Link to={"/login"}>{t("navbarSignIn")}</Link>
                  </li>
                  <li className="nav-item nav-item-borders py-2 d-lg-inline-flex">
                    <Link to={"/registration"}>{t("navbarSignUp")}</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    </React.Fragment>
  );
};
export default PublicNavbar;
