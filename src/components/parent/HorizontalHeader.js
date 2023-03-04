import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { Dropdown } from "react-bootstrap";

import Avatar from "react-avatar";

import { toast } from "react-toastify";

import ChangePasswordModal from "../ChangePasswordModal";
import { history } from "../../history";
import LogoutModal from "../../containers/LogoutContainer";
import {
  GET_CART_BY_ID,
} from "../../services/ENDPOINT";
import ShoppingCartIcon from "../../assets/img/icons/shopping-cart.svg";

const ParentHorizontalHeader = (props) => {
  const parentName =
    props?.data?.loginInfo?.first_name + " " + props?.data?.loginInfo?.last_name;
  const [showSideBar, setShowSidebar] = useState();
  const [changePasswordModalShow, setChangePasswordModalShow] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [cartArrays, setCartArrays] = useState([]);

  const handleProfile = () => {
    history.push("/parent/profile");
  };
  const removeCartLocalStorage = () => {
    localStorage.removeItem('eb-mums-lunch:cartItemTotal')
    props.addCartInfoHandler(null);
    setShowLogoutModal(true)
  }
  const getCartItem = async (e) => {
    try {
      setCartArrays([]);
      const payload = props.data.loginInfo.id;
      const data = await GET_CART_BY_ID(payload);
      if (data.code === 200 || data.code === "200") {
        for (var i = 0; i < data.data.carts.length; i++) {
          for (var j = 0; j < data.data.carts[i].carts.length; j++) {
            cartArrays.push(data.data.carts[i].carts[j].cart_items.length);
          }
        }
        var cartItemTotal = cartArrays.reduce((a, b) => a + b, 0);
        localStorage.setItem("eb-mums-lunch:cartItemTotal", cartItemTotal);
        props.addCartInfoHandler(cartItemTotal);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      if (data) toast.error(data.message);
    }
  };
  useEffect(() => {
    getCartItem();
  }, []);

  return (
    <React.Fragment>
      <div className="fixed-top bg-light box-shadow-1-light">
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
          <div className="d-flex align-items-center w-100 justify-content-end">
            <h5 className="lsi-font-size mb-0 ml-4 text-4 text-capitalize">
              {document.title.split("|")[1]}
            </h5>
            <Link to={"/parent/cart-details"} className="position-relative">
              <img
                src={ShoppingCartIcon}
                width="32"
                alt="cart"
                title="View Cart"
              />
              <div className="cart-item-counter position-absolute bg-dark-blue d-flex justify-content-center align-items-center">
                <p className="text-white mb-0">{props.cart.cartInfo}</p>
              </div>
            </Link>
            <div className="profile-img-box mr-2 d-flex align-items-center">
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
                        name={parentName}
                      />
                    )}
                  </span>
                  <span className="d-flex flex-column justify-content-start text-left">
                    <span className="text-dark-700 ml-2 font-weight-700">
                    {props.data.loginInfo && props.data.loginInfo.first_name}{" "}
                    {props.data.loginInfo && props.data.loginInfo.last_name}
                    </span>
                    <small className="text-dark ml-2">Parent</small>
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
                  <Dropdown.Item onClick={(e) => removeCartLocalStorage()}>
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

export default ParentHorizontalHeader;
