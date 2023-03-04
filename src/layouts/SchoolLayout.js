import React, { useState, useEffect } from "react";

import { TransitionGroup, CSSTransition } from "react-transition-group";

import { useLocation } from 'react-router';

import { toast } from "react-toastify";

import { history } from "./../history";
import SchoolHorizontalHeaderContainer from "../containers/SchoolHeaderContainer";
import SchoolVerticalHeader from "../components/school/VerticalHeader";
const SchoolLayout = ({ children }) => {

  const location = useLocation();
  useEffect(() => {
    let currentType = localStorage.getItem("eb-mums-lunch:userType");
    let token = localStorage.getItem("eb-mums-lunch:token");
    if (!token) {
      localStorage.removeItem("eb-mums-lunch:userType");
      localStorage.removeItem("eb-mums-lunch:loginInfo");
      localStorage.removeItem("eb-mums-lunch:userType");
      toast.error("Unauthorized Access");
      history.push("/");
      setIsValid(false)
    } else {
      setIsValid(true)
    }
    if (token && Number(currentType) !== 3) {
      toast.error("Unauthorized Access");
      history.push("/");
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  })

  const [showHeader, setShowHeader] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const toggleSidebar = (value) => {
    setShowHeader(!showHeader);
  };
  return (
    <React.Fragment>
      <div className="bg-light-blue">
        <SchoolHorizontalHeaderContainer
          showsidebar={toggleSidebar}
          showmenu={showHeader}
        />
        <div className="row position-relative h-100 mx-auto">
          <div
            className={`bg-dark-blue box-shadow-1-light ${
              showHeader ? "w-12" : "w-3"
            }`}
          >
            <SchoolVerticalHeader showsidemenu={showHeader} />
          </div>
          <div className={`${showHeader ? "w-88" : "w-97"}`}>
            <TransitionGroup component={null}>
              {isValid && (
                <CSSTransition classNames="fade-enter" timeout={1000}>
                    <div className="body">{children}</div>
                </CSSTransition>
              )}
            </TransitionGroup>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SchoolLayout;
