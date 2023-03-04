import React, { useState } from "react";

import { Dropdown } from "react-bootstrap";
import Avatar from "react-avatar";
import { history } from "../../history";

import ChangePasswordModal from "../ChangePasswordModal";
import LogoutModal from "../../containers/LogoutContainer";

const AdminHorizontalHeader = (props) => {
  const [showSideBar, setShowSidebar] = useState();
  const [changePasswordModalShow, setChangePasswordModalShow] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleProfile = () => {
    history.push("/admin/profile");
  };
  return (
    <React.Fragment>
      <div className="fixed-top bg-light box-shadow-1-light d-print-none">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center justify-content-between px-3 logo-header-top">
            <h2 className="text-capitalize text-dark-700">Logo</h2>
            <div className="menu-btn">
              <i
                onClick={() => props.showsidebar(showSideBar)}
                className="fa fa-bars text-white text-dark-700"
                aria-hidden="true"
              ></i>
            </div>
          </div>
          <div className="d-flex align-items-center w-100 justify-content-between">
            <h5 className="lsi-font-size mb-0 ml-4 text-4 text-capitalize">
              {document.title.split("|")[1]}
            </h5>
            <div className="profile-img-box mr-2">
              <Dropdown className="profile-img-dropdown">
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="d-flex align-items-center"
                >
                  <span>
                    {props.data.loginInfo && (
                      <Avatar
                        textSizeRatio={2}
                        size={40}
                        round
                        name={props.data.loginInfo.email_address}
                      />
                    )}
                  </span>
                  <span className="d-flex flex-column justify-content-start text-left">
                    <span className="text-dark-700 ml-2 font-weight-700">
                      {props.data.loginInfo &&
                        props.data.loginInfo.email_address}
                    </span>
                    <small className="text-dark ml-2">Administrator</small>
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleProfile()}>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setChangePasswordModalShow(true)}
                  >
                    Change Password
                  </Dropdown.Item>
                  <Dropdown.Item onClick={(e) => setShowLogoutModal(true)}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      {changePasswordModalShow && (
        <ChangePasswordModal
          changePasswordModalShow={changePasswordModalShow}
          closeModal={() => setChangePasswordModalShow(false)}
        />
      )}
      {showLogoutModal && (
        <LogoutModal closeModal={() => setShowLogoutModal(false)} />
      )}
    </React.Fragment>
  );
};

export default AdminHorizontalHeader;
