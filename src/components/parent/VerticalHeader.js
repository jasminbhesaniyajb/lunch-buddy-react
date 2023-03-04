import React from "react";
import { Link, useLocation } from "react-router-dom";
import Dashboardicon from "../../assets/img/icons/dashboard-icon.svg";
import DataListIcon from "../../assets/img/icons/data-list.svg";
import HomeIcon from "../../assets/img/icons/home.svg";
import SettinIcon from "../../assets/img/icons/settings.svg";
import ChildrenIcon from "../../assets/img/icons/children.svg";
import PastEventIcon from "../../assets/img/icons/past-event.svg";
import UpcomingEventIcon from "../../assets/img/icons/upcoming-event.svg";

const ParentHeader = (props) => {
  let currentPath = useLocation();
  return (
    <React.Fragment>
      <div
        className={
          "sidebar-wrapper custom-scrollbar position-fixed sm-hidesidebar" +
          " " +
          (props.showsidemenu ? "showsidear" : "hidesidebar")
        }
      >
        <div className="vertical-menu-sec">
          <ul className="list-unstyled side-menu-item">
            <li title="Dashboard">
              <Link
                to={"/parent/dashboard"}
                className={`${
                  currentPath.pathname === "/parent/dashboard"
                    ? "active-vertical-menu"
                    : ""
                }`}
              >
                <span className="d-flex align-items-center">
                  <span>
                    <img src={Dashboardicon} alt="" width="17" />
                  </span>
                  <span className="menu-link ml-2">Dashboard</span>
                </span>
              </Link>
            </li>
            <li title="Home">
              <Link
                to={"/parent/home"}
                className={`${
                  currentPath.pathname === "/parent/home"
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
            <li title="My Child">
              <Link
                to={"/parent/student-list"}
                className={`${
                  currentPath.pathname === "/parent/student-list"
                    ? "active-vertical-menu"
                    : ""
                }`}
              >
                <span className="d-flex align-items-center">
                  <span>
                    <img src={ChildrenIcon} alt="" width="17" />
                  </span>
                  <span className="menu-link ml-2">My Child</span>
                </span>
              </Link>
            </li>
            <li title="Past Orders">
              <Link
                to={"/parent/past-orders"}
                className={`${
                  currentPath.pathname === "/parent/past-orders"
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
                to={"/parent/upcoming-orders"}
                className={`${
                  currentPath.pathname === "/parent/upcoming-orders"
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
              <Link
                to={"/parent/settings"}
                className={`${
                  currentPath.pathname === "/parent/settings"
                    ? "active-vertical-menu"
                    : ""
                }`}
              >
                <span className="d-flex align-items-center">
                  <span>
                    <img src={SettinIcon} alt="" width="17" />
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
export default ParentHeader;
