import React, { useState, useEffect } from "react";

import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Activeicon from "../../../assets/img/icons/active-icon.png";
import InActiveIcon from "../../../assets/img/icons/inactive-icon.png";
import EditIcon from "../../../assets/img/icons/edit-circle.svg";
import SearchIcon from "../../../assets/img/icons/search-icon.svg";
import ApproveIcon from "../../../assets/img/icons/active-icon.svg";

import { toast } from "react-toastify";

import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import ShowingPagination from "../../../components/ShowingPagination";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../../../config";

import {
  GET_PARENT_LIST,
  PARENT_IS_ACTIVE,
  PARENT_IS_APPROVED,
} from "../../../services/ENDPOINT";

import relaodSVG from "../../../assets/img/reload.svg";
import { RenderUserStatus } from "../../../common";

const AdminParent = (props) => {
  const [isloader, setLoader] = useState(false);
  const [parentsList, setParentsList] = useState([]);
  const [tablefields, setTablefields] = useState([
    { value: "first_name", key: "First Name", sort: true },
    { value: "last_name", key: "Last Name", sort: true },
    { value: "email_address", key: "Email", sort: true },
    { value: "contact_number", key: "Contact Number", sort: true },
    { value: "status", key: "Status", sort: false },
    { value: "action", key: "Action", sort: false },
  ]);
  const [pagination, setPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    parentName: "",
    orderBy: "DESC",
    sortBy: "id"
  });
  const [showSearch, setShowSearch] = useState(false);
  const [perPageRowArray, setPerPageRowArray] = useState(PER_PAGE_ROWS_OPTIONS);
  const showSearchBox = () => {
    setShowSearch(!showSearch);
  };

  const handleInputChange = (e) => {
    let timer = handleInputChange.timer;
    if (timer) {
      clearTimeout(timer);
    }
    handleInputChange.timer = setTimeout(async () => {
      if(e.target.name == "search"){
        if(e.target.value.length >= 3 || e.target.value.length == 0){        
          e.target.value.length == 0 ? pagination.parentName = "" : pagination.parentName = e.target.value
          getParentList()
        }
      }
    }, 500)
  };

  const getParentList = async (e) => {
    try {
      setLoader(true);
      setParentsList([]);
      const data = await GET_PARENT_LIST(pagination);
      if (data.code === 200 || data.code === "200") {
        setParentsList(data.data.parents);
        setPagination(data.data.pagination);
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
    getParentList();
    return ()=>{
      setParentsList();
    }
  }, []);

  const changePerPage = async (e) => {
    pagination.perPageRows = parseInt(e.target.value);
    pagination.currentPage = 1;
    getParentList();
    setPagination(1);
  };
  const getRefreshParentList = async (e) => {
    pagination.perPageRows = pagination.perPageRows;
    pagination.currentPage = 1;
    getParentList();
    setPagination(1);
  };
  const sortData = (data) => {
    if (data.sort) {
      pagination.sortBy = data.value
      pagination.orderBy = pagination.orderBy === 'DESC' ? 'ASC' : 'DESC'
      getParentList();
    }
  }
  
  const changeActiveDeactive = async (userInfo) => {
    const activeDeactive = Number(userInfo.is_active) === 1 ? 0 : 1;
    const payload = { id: userInfo.id, is_active: activeDeactive };
    try {
      const data = await PARENT_IS_ACTIVE(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempParentObject = parentsList.findIndex((parent) => {
          return parent.user.id == userInfo.id;
        });
        const tempParentsArray = [...parentsList];
        if (activeDeactive == 1) {
          tempParentsArray[tempParentObject].user.is_active = "1";
        } else if (activeDeactive == 0) {
          tempParentsArray[tempParentObject].user.is_active = "0";
        }
        setParentsList(tempParentsArray);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  const changeAappoveDisappove = async (userInfo) => {
    const appoveDisappove = userInfo.approved_date ? false : true;
    const payload = { id: userInfo.id, isAppoved: appoveDisappove };
    try {
      const data = await PARENT_IS_APPROVED(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempParentObject = parentsList.findIndex((parent) => {
          return parent.user.id == userInfo.id;
        });
        const tempParentsArray = [...parentsList];
        if (appoveDisappove == true) {
          tempParentsArray[tempParentObject].user.user_status = 2;
          tempParentsArray[tempParentObject].user.approved_date = new Date();
          tempParentsArray[tempParentObject].user.is_active = "1";
        } else if (appoveDisappove == false) {
          tempParentsArray[tempParentObject].user.user_status = 1;
          tempParentsArray[tempParentObject].user.approved_date = null;
          tempParentsArray[tempParentObject].user.is_active = "0";
        }
        setParentsList(tempParentsArray);
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
                    Parent List
                  </h3>
                  <p className="text-white mb-0"> List of Registered Parents</p>
                </div>
                <div>
                  <div className="d-flex align-items-center">
                    <div>
                      <img
                        className="cursor-pointer"
                        src={SearchIcon}
                        width="27"
                        onClick={() => showSearchBox()}
                        alt="search"
                      />
                    </div>
                    <select
                      className="px-2 py-1 ml-2"
                      name="perPage"
                      onChange={changePerPage}
                    >
                      {perPageRowArray.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        )
                      )}
                    </select>
                    <div>
                      <img
                        className="ml-2 cursor-pointer"
                        title="Relaod Data"
                        src={relaodSVG}
                        onClick={(e) => getRefreshParentList()}
                        alt="Relaod Data"
                        width="27px"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Table className="custom-table-sec" responsive hover>
                <thead>
                  {showSearch && (
                    <tr>
                      <th colSpan="100">
                        <form className="mb-0">
                          <div className="form-row mt-2">
                            <div className="form-group col-lg-4 col-md-6 col-sm-12">
                              <div className="material-textfield">
                                <input
                                  id="name"
                                  placeholder=" "
                                  name="search"
                                  autoComplete="off"
                                  className={`form-control eb-contact-input material-input h-3em`}
                                  onChange={(e) => handleInputChange(e)}
                                  autoFocus
                                />
                                <label className="material-label text-uppercase text-1">
                                  Search parent name
                                </label>
                              </div>
                            </div>
                          </div>
                        </form>
                      </th>
                    </tr>
                  )}
                  <tr>
                    {tablefields.map((item, index) => (
                      <th className={item.sort ? "cursor-pointer" : ""} onClick={() => sortData(item)} key={index}>
                        {item.key} {pagination.sortBy === item.value &&  <i className={pagination.orderBy === "ASC" ? "fa fa-caret-up" : "fa fa-caret-down"} />}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parentsList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>
                        <a href={`mailto:${item.email_address}`}>
                          {item.email_address}
                        </a>
                      </td>
                      <td>
                        <a href={`tel:${item.contact_number}`}>
                          {item.contact_number}
                        </a>
                      </td>
                      {item.user && (
                        <td>
                          <span
                            className={
                              "mr-2 w-90 mt-1 badge badge-pill " +
                              (item.user.user_status === 2
                                ? "badge-success"
                                : "badge-warning")
                            }
                          >
                          {RenderUserStatus(item.user.user_status)}
                          </span>
                        </td>
                      )}
                      <td>
                        <Link
                          to={`/admin/update-parent?id=${item.id}`}
                          className="mr-1"
                        >
                          <img
                            src={EditIcon}
                            width="26"
                            alt="edit"
                            title="Edit"
                          />
                        </Link>
                        {item.user &&
                          item.user.approved_date &&
                          item.user.is_active && (
                            <span>
                              {Number(item.user.is_active) === 0 && (
                                <img
                                  className="cursor-pointer"
                                  title="Inactive"
                                  src={InActiveIcon}
                                  onClick={() =>
                                    changeActiveDeactive(item.user)
                                  }
                                  alt=""
                                  width="35"
                                />
                              )}
                              {Number(item.user.is_active) === 1 && (
                                <img
                                  className="cursor-pointer"
                                  title="Active"
                                  src={Activeicon}
                                  onClick={() =>
                                    changeActiveDeactive(item.user)
                                  }
                                  alt=""
                                  width="35"
                                />
                              )}
                            </span>
                          )}
                        {item.user && item.user.approved_date === null && (
                          <img
                            className="cursor-pointer mr-2"
                            title="Approve"
                            src={ApproveIcon}
                            onClick={() => changeAappoveDisappove(item.user)}
                            alt=""
                            width="24"
                          />
                        )}
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
                  {isloader === false && parentsList.length === 0 && (
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
              <div className="d-lg-flex justify-content-lg-between d-md-flex justify-content-md-between mt-3">
                <div>
                  <ShowingPagination
                    pagination={pagination}
                  />
                </div>
                <div>
                  {pagination && pagination.totalPages > 0 && (
                    <Pagination
                      pagination={pagination}
                      changePage={getParentList}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AdminParent;
