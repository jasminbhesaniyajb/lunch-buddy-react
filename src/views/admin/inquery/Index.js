import React, { useState, useEffect } from "react";

import { Table, Button } from "react-bootstrap";
import SearchIcon from "../../../assets/img/icons/search-icon.svg";

import { toast } from "react-toastify";

import Loader from "../../../components/Loader";

import Moment from "react-moment";

import Pagination from "../../../components/Pagination";
import ShowingPagination from "../../../components/ShowingPagination";
import { FETCH_ALL_INQUERY, CLOSE_INQUIRY } from "../../../services/ENDPOINT";
import relaodSVG from "../../../assets/img/reload.svg";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../../../config";

const AdminInquiry = (props) => {
  const [isloader, setLoader] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [tablefields, setTablefields] = useState([
    { value: "first_name", key: "First Name", sort: true },
    { value: "last_name", key: "Last Name", sort: true },
    { value: "contact_email_address", key: "Email", sort: true },
    { value: "user_type", key: "User Type", sort: true },
    { value: "message_content", key: "Messages", sort: true },
    { value: "inquiry_date", key: "Inquiry Date", sort: true },
    { value: "action", key: "Action", sort: false },
  ]);
  const [pagination, setPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    inquiryFromDate: "",
    inquiryToDate: "",
    orderBy: "DESC",
    sortBy: "id",
  });
  const [showSearch, setShowSearch] = useState(false);
  const [showAllInquery, setShowAllInquery] = useState(true);
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
        pagination.inquiryFromDate = e.target.value || "";
        pagination.inquiryToDate = "";
        getInquiryList();
      } else if (e.target.name == "searchToDate") {
        pagination.inquiryFromDate = "";
        pagination.inquiryToDate = e.target.value;
        getInquiryList();
      }
    }, 500);
  };

  const getInquiryList = async (value) => {
    try {
      setLoader(true);
      setInquiries([]);
      const payload = {
        currentPage: pagination.currentPage,
        perPageRows: pagination.perPageRows,
        onlyOpenInquiries: value ? 1 : 0,
        inquiryFromDate: pagination.inquiryFromDate,
        inquiryToDate: pagination.inquiryToDate,
        orderBy: pagination.orderBy,
        sortBy: pagination.sortBy,
      };
      const data = await FETCH_ALL_INQUERY(payload);
      if (data.code === 200 || data.code === "200") {
        setInquiries(data.data.inquiries);
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
    getInquiryList(showAllInquery);
    return ()=>{
      setInquiries();
    }
  }, []);

  const toMail = (slag, location) => {
    return `${slag}:${location}`;
  };
  const showAll = () => {
    setShowAllInquery(!showAllInquery);
    getInquiryList(!showAllInquery);
  };

  const closeInquiry = async (id) => {
    try {
      const payload = {
        id: id,
      };
      const data = await CLOSE_INQUIRY(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        getInquiryList(showAllInquery);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const changePerPage = async (e) => {
    pagination.perPageRows = parseInt(e.target.value);
    pagination.currentPage = 1;
    getInquiryList(showAllInquery);
    setPagination(1);
  };
  const getRefreshInquiryList = async (e) => {
    pagination.perPageRows = pagination.perPageRows;
    pagination.currentPage = 1;
    getInquiryList(showAllInquery);
    setPagination(1);
  };
  const sortData = (data) => {
    if (data.sort) {
      pagination.sortBy = data.value;
      pagination.orderBy = pagination.orderBy === "DESC" ? "ASC" : "DESC";
      getInquiryList(showAllInquery);
    }
  };

  const getUserType = (type) => {
    const userTyes = [
      { id: 2, name: "Restaurant" },
      { id: 3, name: "School" },
      { id: 4, name: "Parent" },
    ];
    const user = userTyes.find((i) => i.id == type);
    return user ? user.name : "";
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
                    Inquiries
                  </h3>
                  <p className="text-white mb-0">List of Inquiries</p>
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      className="cursor-pointer mx-2"
                      src={SearchIcon}
                      width="27"
                      onClick={() => showSearchBox()}
                      alt="search"
                    />
                  </div>

                  <select
                    className="px-2 py-1"
                    name="perPage"
                    onChange={changePerPage}
                  >
                    {perPageRowArray.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <div>
                    <img
                      className="ml-2 cursor-pointer"
                      title="Relaod Data"
                      src={relaodSVG}
                      onClick={(e) => getRefreshInquiryList()}
                      alt="Relaod Data"
                      width="27px"
                    />
                  </div>
                </div>
              </div>
              <Table className="custom-table-sec" hover responsive>
                <thead>
                  {showSearch && (
                    <tr>
                      <th colSpan="100">
                        <form className="mb-0">
                          <div className="form-row mt-2">
                            <div className="form-group col-lg-4 col-md-6 col-sm-12">
                              <div className="material-textfield">
                                <input
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
                            <div className="form-group col-lg-4 col-md-6 col-sm-12">
                              <div>
                                <div className="form-check ml-2 mt-2">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                    value={showAllInquery}
                                    onChange={() => showAll()}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="exampleCheck1"
                                  >
                                    Show All Inquiries
                                  </label>
                                </div>
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
                        {item.key}{" "}
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
                  {inquiries.map((item, index) => (
                    <tr key={index}>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>
                        <a href={toMail("mailto", item.contact_email_address)}>
                          {item.contact_email_address}
                        </a>
                      </td>
                      <td> {getUserType(item.user_type)} </td>
                      <td>{item.message_content} </td>
                      <td>
                        <Moment>{item.inquiry_date}</Moment>
                      </td>
                      <td>
                        {item.addressed_date == null && (
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => closeInquiry(item.id)}
                          >
                            Close this Inquiry
                          </Button>
                        )}
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
                  {isloader === false && inquiries.length === 0 && (
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
                  <ShowingPagination pagination={pagination} />
                </div>
                <div>
                  {pagination && pagination.totalPages > 0 && (
                    <Pagination
                      pagination={pagination}
                      changePage={() => getInquiryList(showAllInquery)}
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
export default AdminInquiry;
