import React, { useState, useEffect } from "react";

import { Table } from "react-bootstrap";
import SearchIcon from "../../../assets/img/icons/search-icon.svg";
import EyeIcon from "../../../assets/img/icons/eye.svg";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import Moment from "react-moment";

import Loader from "../../../components/Loader";

import Pagination from "../../../components/Pagination";
import ShowingPagination from "../../../components/ShowingPagination";
import { GET_ERROR_LIST } from "../../../services/ENDPOINT";
import relaodSVG from "../../../assets/img/reload.svg";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../../../config";

const AdminError = (props) => {
  const [isloader, setLoader] = useState(false);
  const [errorsList, setErrorsList] = useState([]);
  const [tablefields, setTablefields] = useState([
    { value: "error_code", key: "Error Code", sort: true },
    { value: "method", key: "Method", sort: true },
    { value: "action", key: "Action", sort: true },
    { value: "api_path", key: "Api Path", sort: true },
    { value: "user.email_address", key: "Email", sort: false },
    { value: "created_date", key: "Created Date", sort: true },
    { value: "view", key: "View", sort: false },
  ]);
  const [pagination, setPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    errorFromDate: "",
    errorToDate: "",
    orderBy: "DESC",
    sortBy: "id",
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
      if (e.target.name == "searchFromDate") {
        pagination.errorFromDate = e.target.value || "";
        pagination.errorToDate = "";
        getErrorList();
      } else if (e.target.name == "searchToDate") {
        pagination.errorFromDate = "";
        pagination.errorToDate = e.target.value;
        getErrorList();
      }
    }, 500);
  };

  const getErrorList = async (e) => {
    try {
      setLoader(true);
      setErrorsList([]);
      const data = await GET_ERROR_LIST(pagination);
      if (data.code === 200 || data.code === "200") {
        setErrorsList(data.data.errors);
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
    getErrorList();
    return ()=>{
      setErrorsList();
    }
  }, []);
  const changePerPage = async (e) => {
    pagination.perPageRows = parseInt(e.target.value);
    pagination.currentPage = 1;
    getErrorList();
    setPagination(1);
  };
  const getRefreshErrorList = async (e) => {
    pagination.perPageRows = pagination.perPageRows;
    pagination.currentPage = 1;
    getErrorList();
    setPagination(1);
  };
  const sortData = (data) => {
    if (data.sort) {
      pagination.sortBy = data.value;
      pagination.orderBy = pagination.orderBy === "DESC" ? "ASC" : "DESC";
      getErrorList();
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
                    Error List
                  </h3>
                  <p className="text-white mb-0">List of Errors</p>
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
                        onClick={(e) => getRefreshErrorList()}
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
                                  type="date"
                                  placeholder=" "
                                  name="searchFromDate"
                                  autoComplete="off"
                                  className={`form-control eb-contact-input material-input h-3em`}
                                  onChange={(e) => handleInputChange(e)}
                                  autoFocus
                                />
                                <label className="material-label text-uppercase text-1">
                                  From-Date
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-sm-12">
                              <div className="material-textfield">
                                <input
                                  id="toDate"
                                  type="date"
                                  placeholder=" "
                                  name="searchToDate"
                                  autoComplete="off"
                                  className={`form-control eb-contact-input material-input h-3em`}
                                  onChange={(e) => handleInputChange(e)}
                                />
                                <label className="material-label text-uppercase text-1">
                                  To-Date
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
                      <th
                        className={item.sort ? "cursor-pointer" : ""}
                        onClick={() => sortData(item)}
                        key={index}
                      >
                        {item.key}
                        {pagination.sortBy === item.value && (
                          <i
                            className={
                              pagination.orderBy === "ASC"
                                ? "fa fa-caret-up"
                                : "fa fa-caret-down"
                            }
                          />
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {errorsList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.error_code}</td>
                      <td>{item.method}</td>
                      <td>{item.action}</td>
                      <td>{item.api_path}</td>
                      <td>
                        {item.user &&
                          item.user.email_address &&
                          item.user.email_address}
                      </td>
                      <td><Moment>{item.created_date}</Moment></td>
                      <td>
                        <Link to={`/admin/error-detail?id=${item.id}`}>
                          <img
                            className="cursor-pointer"
                            src={EyeIcon}
                            width="26"
                            alt="view"
                            title="View"
                          />
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {isloader && (
                    <tr>
                      <td colSpan="100">
                        <div className="d-flex justify-content-center">
                          <i className="fa fa-spinner fa-pulse fa-4x fa-fw color-admin-theme " />
                          <span className="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {isloader === false && errorsList.length === 0 && (
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
                      changePage={getErrorList}
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
export default AdminError;
