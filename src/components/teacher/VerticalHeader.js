import React from "react";

import { Link, useLocation } from "react-router-dom";

import Dashboardicon from "../../assets/img/icons/dashboard-icon.svg";
import DataListIcon from "../../assets/img/icons/data-list.svg";
import PastEventIcon from "../../assets/img/icons/past-event.svg";
import UpcomingEventIcon from "../../assets/img/icons/upcoming-event.svg";
import SettingIcon from "../../assets/img/icons/settings.svg";
import HomeIcon from "../../assets/img/icons/home.svg";

const TeacherHeader = (props) => {
  let currentPath = useLocation();
  return (
    <React.Fragment>
        <div
          className={
            "sidebar-wrapper custom-scrollbar position-fixed" +
            " " +
            (props.showsidemenu ? "showsidear" : "hidesidebar")
          }
        >
          <div className="vertical-menu-sec">
            <ul className="list-unstyled side-menu-item">
              <li title="Dashboard">
                <Link
                  to={"/teacher/dashboard"}
                  className={`${
                    currentPath.pathname === "/teacher/dashboard"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={Dashboardicon}
                        alt=""
                        width="17"
                      />
                    </span>
                    <span className="menu-link ml-2">Dashboard</span>
                  </span>
                </Link>
              </li>
              <li title="Home">
              <Link
                to={"/teacher/home"}
                className={`${
                  currentPath.pathname === "/teacher/home"
                    ? "active-vertical-menu"
                    : ""
                }`}
              >
                <span className="d-flex align-items-center">
                  <span>
                    <img src={HomeIcon} alt="" width="17" />
                  </span>
                  <span className="menu-link ml-2">Home</span>
                </span>
              </Link>
            </li>
            <li title="Past Orders">
              <Link
                to={"/teacher/past-orders"}
                className={`${
                  currentPath.pathname === "/teacher/past-orders"
                    ? "active-vertical-menu"
                    : ""
                }`}
              >
                <span className="d-flex align-items-center">
                  <span>
                    <img src={PastEventIcon} alt="" width="17" />
                  </span>
                  <span className="menu-link ml-2">Past Orders</span>
                </span>
              </Link>
            </li>
            <li title="Upcoming Orders">
              <Link
                to={"/teacher/upcoming-orders"}
                className={`${
                  currentPath.pathname === "/teacher/upcoming-orders"
                    ? "active-vertical-menu"
                    : ""
                }`}
              >
                <span className="d-flex align-items-center">
                  <span>
                    <img src={UpcomingEventIcon} alt="" width="17" />
                  </span>
                  <span className="menu-link ml-2">Upcoming Orders</span>
                </span>
              </Link>
            </li>
              <li title="Settings">
                <Link to={"/teacher/settings"}>
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={SettingIcon}
                        alt=""
                        width="17"
                      />
                    </span>
                    <span className="menu-link ml-2">Settings</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
    </React.Fragment>
  );
};
export default TeacherHeader;
