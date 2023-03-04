import React from "react";
import { Link, useLocation } from "react-router-dom";
import Dashboardicon from "../../assets/img/icons/dashboard-icon.svg";
import DataListIcon from "../../assets/img/icons/data-list.svg";
import PastEventIcon from "../../assets/img/icons/past-event.svg";
import UpcomingEventIcon from "../../assets/img/icons/upcoming-event.svg";
import ManageMenuIcon from "../../assets/img/icons/Restaurant.svg";
import SettinIcon from "../../assets/img/icons/settings.svg";

const RestaurantHeader = (props) => {
  let currentPath = useLocation();
  return (
    <React.Fragment>
          <div
          className={
            "sidebar-wrapper custom-scrollbar position-fixed d-print-none sm-hidesidebar" +
            " " +
            (props.showsidemenu ? "showsidear" : "hidesidebar")
          }
        >
          <div className="vertical-menu-sec">
            <ul className="list-unstyled side-menu-item">
              <li title="Dashboard">
                <Link
                  to={"/restaurant/dashboard"}
                  className={`${
                    currentPath.pathname === "/restaurant/dashboard"
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
              <li title="Manage Menu">
                <Link
                  to={"/restaurant/manage-menu"}
                  className={`${
                    currentPath.pathname === "/restaurant/manage-menu"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={ManageMenuIcon}
                        alt=""
                        width="17"
                      />
                    </span>
                    <span className="menu-link ml-2">Manage Menu</span>
                  </span>
                </Link>
              </li>
              <li title="Past Events">
                <Link
                  to={"/restaurant/past-event"}
                  className={`${
                    currentPath.pathname === "/restaurant/past-event"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={PastEventIcon}
                        alt=""
                        width="17"
                      />
                    </span>
                    <span className="menu-link ml-2">Past Events</span>
                  </span>
                </Link>
              </li>
              <li title="Upcoming Events">
                <Link
                  to={"/restaurant/upcoming-event"}
                  className={`${
                    currentPath.pathname === "/restaurant/upcoming-event"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={UpcomingEventIcon}
                        alt=""
                        width="17"
                      />
                    </span>
                    <span className="menu-link ml-2">Upcoming Events</span>
                  </span>
                </Link>
              </li>
              <li title="Settings">
                <Link
                  to={"/restaurant/settings"}
                  className={`${
                    currentPath.pathname === "/restaurant/settings"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={SettinIcon}
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
export default RestaurantHeader;
