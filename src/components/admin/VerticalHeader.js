import React from "react";

import { Link, useLocation } from "react-router-dom";

import Dashboardicon from "../../assets/img/icons/dashboard-icon.svg";
import DataListIcon from "../../assets/img/icons/data-list.svg";
import SettinIcon from "../../assets/img/icons/settings.svg";
import SchoolIcon from "../../assets/img/icons/school.svg";
import ParentIcon from "../../assets/img/icons/parent.svg";
import RestaurantIcon from "../../assets/img/icons/Restaurant.svg";
import StudentIcon from "../../assets/img/icons/student.svg";
import ErrorIcon from "../../assets/img/icons/error.svg";
import InquieryIcon from "../../assets/img/icons/inquiery.svg";
import ApprovalIcon from "../../assets/img/icons/approval.svg";
import ExchangeIcon from "../../assets/img/icons/exchange.svg";
import MasterIcon from "../../assets/img/icons/master.svg";


const AdminHeader = (props) => {
  let currentPath = useLocation();
  return (
    <React.Fragment>
        <div
          className={
            "sidebar-wrapper custom-scrollbar position-fixed d-print-none" +
            " " +
            (props.showsidemenu ? "showsidear" : "hidesidebar")
          }
        >
          <div className="vertical-menu-sec">
            <ul className="list-unstyled side-menu-item">
              <li title="Dashboard">
                <Link
                  to={"/admin/dashboard"}
                  className={`${
                    currentPath.pathname === "/admin/dashboard"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                  
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={Dashboardicon}
                        alt=""
                        width="18"
                      />
                    </span>
                    <span className="menu-link ml-2">Dashboard</span>
                  </span>
                </Link>
              </li>
              <li title="Schools">
                <Link
                  to={"/admin/school-list"}
                  className={`${
                    currentPath.pathname === "/admin/school-list"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={SchoolIcon}
                        alt=""
                        width="18"
                      />
                    </span>
                    <span className="menu-link ml-2">Schools</span>
                  </span>
                </Link>
              </li>
              <li title="Parents">
                <Link
                  to={"/admin/parent-list"}
                  className={`${
                    currentPath.pathname === "/admin/parent-list"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={ParentIcon}
                        alt=""
                        width="18"
                      />
                    </span>
                    <span className="menu-link ml-2">Parents</span>
                  </span>
                </Link>
              </li>
              <li title="Restaurants">
                <Link
                  to={"/admin/restaurant-list"}
                  className={`${
                    currentPath.pathname === "/admin/restaurant-list"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={RestaurantIcon}
                        alt=""
                        width="18"
                      />
                    </span>
                    <span className="menu-link ml-2">Restaurants</span>
                  </span>
                </Link>
            </li>
            <li title="Students">
                <Link
                  to={"/admin/student-list"}
                  className={`${
                    currentPath.pathname === "/admin/student-list"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={StudentIcon}
                        alt=""
                        width="17"
                      />
                    </span>
                    <span className="menu-link ml-2">Students</span>
                  </span>
                </Link>
            </li>
            <li title="Inquiries">
                <Link
                  to={"/admin/inquiries"}
                  className={`${
                    currentPath.pathname === "/admin/inquiries"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={InquieryIcon}
                        alt=""
                        width="17"
                      />
                    </span>
                    <span className="menu-link ml-2">Inquiries</span>
                  </span>
                </Link>
              </li>
              <li title="Errors">
                <Link
                  to={"/admin/error-list"}
                  className={`${
                    currentPath.pathname === "/admin/error-list"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={ErrorIcon}
                        alt=""
                        width="17"
                      />
                    </span>
                    <span className="menu-link ml-2">Errors</span>
                  </span>
                </Link>
              </li>
              <li title="Menu Approval">
                <Link
                  to={"/admin/menu-approval"}
                  className={`${
                    currentPath.pathname === "/admin/menu-approval"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={ApprovalIcon}
                        alt=""
                        width="17"
                      />
                    </span>
                    <span className="menu-link ml-2">Menu Approval</span>
                  </span>
                </Link>
              </li>
              <li title="Menu Change Request">
                <Link
                  to={"/admin/menu-change-request"}
                  className={`${
                    currentPath.pathname === "/admin/menu-change-request"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={ExchangeIcon}
                        alt=""
                        width="17"
                      />
                    </span>
                    <span className="menu-link ml-2">Menu Change Request</span>
                  </span>
                </Link>
              </li>
              <li title="Masters">
                <Link
                  to={"/admin/masters"}
                  className={`${
                    currentPath.pathname === "/admin/masters"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={MasterIcon}
                        alt=""
                        width="17"
                      />
                    </span>
                    <span className="menu-link ml-2">Masters</span>
                  </span>
                </Link>
              </li>
              <li title="Restaurant Payment">
                <Link to={"/admin/restaurnt-payment"} className={`${
                    currentPath.pathname === "/admin/restaurnt-payment"
                      ? "active-vertical-menu"
                      : ""
                  }`}>
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={SettinIcon}
                        alt=""
                        width="17"
                      />
                    </span>
                    <span className="menu-link ml-2">Vendor Payment Dues</span>
                  </span>
                </Link>
              </li>
              <li title="Restaurant Payment History">
                <Link to={"/admin/restaurant-payment-history"} className={`${
                    currentPath.pathname === "/admin/restaurant-payment-history"
                      ? "active-vertical-menu"
                      : ""
                  }`}>
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={DataListIcon}
                        alt=""
                        width="17"
                      />
                    </span>
                    <span className="menu-link ml-2">Vendor Payment History</span>
                  </span>
                </Link>
              </li>
              <li title="Settings">
                <Link to={"/admin/settings"}>
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
export default AdminHeader;
