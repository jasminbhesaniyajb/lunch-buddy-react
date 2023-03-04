import React from "react";

import { Link, useLocation } from "react-router-dom";

import Dashboardicon from "../../assets/img/icons/dashboard-icon.svg";
import DataListIcon from "../../assets/img/icons/data-list.svg";
import PastEventIcon from "../../assets/img/icons/past-event.svg";
import UpcomingEventIcon from "../../assets/img/icons/upcoming-event.svg";
import StudentIcon from "../../assets/img/icons/student.svg";
import GradeIcon from "../../assets/img/icons/grade-white.svg";
import TeachersIcon from "../../assets/img/icons/teachers-white.svg";
import OrganizeEventIcon from "../../assets/img/icons/organize-event.svg";
import GradePromotionIcon from "../../assets/img/icons/grade-promtion.svg";
import SettinIcon from "../../assets/img/icons/settings.svg";

const AdminHeader = (props) => {
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
                  to={"/school/dashboard"}
                  className={`${
                    currentPath.pathname === "/school/dashboard"
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
              <li title="Teachers">
                <Link
                  to={"/school/teacher-list"}
                  className={`${
                    currentPath.pathname === "/school/teacher-list"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={TeachersIcon}
                        alt=""
                        width="17"
                      />
                    </span>
                    <span className="menu-link ml-2">Teachers</span>
                  </span>
                </Link>
              </li>
              <li title="Students">
                <Link
                  to={"/school/student-list"}
                  className={`${
                    currentPath.pathname === "/school/student-list"
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
              <li title="Organize An Event">
                <Link
                  to={"/school/organize-event"}
                  className={`${
                    currentPath.pathname === "/school/organize-event"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={OrganizeEventIcon}
                        alt=""
                        width="17"
                      />
                    </span>
                    <span className="menu-link ml-2">Organize an event</span>
                  </span>
                </Link>
              </li>
              <li title="Past Events">
                <Link
                  to={"/school/past-event"}
                  className={`${
                    currentPath.pathname === "/school/past-event"
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
                  to={"/school/upcoming-event"}
                  className={`${
                    currentPath.pathname === "/school/upcoming-event"
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
              <li title="School Grades">
                <Link
                  to={"/school/school-grades"}
                  className={`${
                    currentPath.pathname === "/school/school-grades"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={GradeIcon}
                        alt=""
                        width="17"
                      />
                    </span>
                    <span className="menu-link ml-2">School Grades</span>
                  </span>
                </Link>
              </li>
              <li title="Grade Promotion">
                <Link
                  to={"/school/grade-promotion"}
                  className={`${
                    currentPath.pathname === "/school/grade-promotion"
                      ? "active-vertical-menu"
                      : ""
                  }`}
                >
                  <span className="d-flex align-items-center">
                    <span>
                      <img
                        src={GradePromotionIcon}
                        alt=""
                        width="17"
                      />
                    </span>
                    <span className="menu-link ml-2">Grade Promotion</span>
                  </span>
                </Link>
              </li>
              <li title="Settings">
                <Link
                  to={"/school/settings"}
                  className={`${
                    currentPath.pathname === "/school/settings"
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
export default AdminHeader;
