import React, { useState, useEffect } from "react";

import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import ApproveIcon from "../../../assets/img/icons/active-icon.svg";
import Loader from "../../../components/Loader";

import {
  GET_MENU_APPROVE_LIST,
  RESTAURANT_MENU_IS_APPROVED,
} from "../../../services/ENDPOINT";
import relaodSVG from "../../../assets/img/reload.svg";

const AdminMenuApproval = (props) => {
  const [isloader, setLoader] = useState(false);
  const [menusList, setMenusList] = useState([]);

  const getMenuList = async (e) => {
    try {
      setLoader(true);
      setMenusList([]);
      const data = await GET_MENU_APPROVE_LIST();
      if (data.code === 200 || data.code === "200") {
        setMenusList(data.data);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getMenuList();
    return ()=>{
      setMenusList();
    }
  }, []);

  const changeAappoveDisappove = async (menuId) => {
    const payload = { id: menuId };
    try {
      const data = await RESTAURANT_MENU_IS_APPROVED(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        getMenuList();
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 px-0">
      {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          <div className="col-lg-12 col-md-12 col-sm-12 mt-5">
            <div className="card-table">
              <div className="table-header-sec bg-dark-blue d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                    Menu Approval List
                  </h3>
                  <p className="text-white mb-0">List of Pending Restaurant Menu Approvals</p>
                </div>
                <div>
                  <div className="d-flex align-items-center">
                    <div>
                      <img
                        className="ml-2 cursor-pointer"
                        title="Relaod Data"
                        src={relaodSVG}
                        onClick={(e) => getMenuList()}
                        alt="Relaod Data"
                        width="27px"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Table className="custom-table-sec" hover responsive>
                <thead>
                  <tr>
                    <th>Menu Name</th>
                    <th>Restaurant Name</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Contact Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {menusList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.menu_name}</td>
                      <td>{item.vendor.restaurant_name}</td>
                      <td>{item.vendor.first_name}</td>
                      <td>{item.vendor.last_name}</td>
                      <td>{item.vendor.primary_contact_number}</td>
                      <td>
                        <img
                              className="cursor-pointer"
                              title="Approve"
                              src={ApproveIcon}
                              onClick={() => changeAappoveDisappove(item.id)}
                              alt=""
                              width="24"
                              />
                      </td>
                    </tr>
                  ))}
                  {isloader && (
                    <tr>
                      <td colSpan="100">
                        <div className="d-flex justify-content-center">
                          <i className="fa fa-spinner fa-pulse fa-4x fa-fw color-admin-theme" />
                          <span className="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {isloader === false && menusList.length === 0 && (
                    <tr>
                      <td colSpan="100">
                        <div className="d-flex justify-content-center">
                          Record Not Found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AdminMenuApproval;
