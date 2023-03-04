import React, { useState, useEffect } from "react";

import relaodSVG from "../../../assets/img/reload.svg";
import EyeIcon from "../../../assets/img/icons/eye.svg";
import FeedbackIcon from "../../../assets/img/icons/feedback.svg";
import SearchIcon from "../../../assets/img/icons/search-icon.svg";

import { toast } from "react-toastify";
import { Table } from "react-bootstrap";
import Moment from "react-moment";
import moment from "moment";

import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import ShowingPagination from "../../../components/ShowingPagination";
import OrderDetailsReseiptModal from "../../../components/OrderDetailsReceiptModal";
import EventFeedbackModal from "../../../components/EventFeedbackModal";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../../../config";

import { GET_ALL_PAST_ORDERS, EVENT_FEEDBACK } from "../../../services/ENDPOINT";

const ParentPastOrders = (props) => {
  const [isloader, setLoader] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [pastOrdersList, setPastOrdersList] = useState([]);
  const [tablefields, setTablefields] = useState([
    { value: "order_date", key: "Order Date", sort: true },
    { value: "student_name", key: "Student Name", sort: true },
    { value: "student_grade", key: "Grade", sort: true },
    { value: "restaurant", key: "Restaurant", sort: true },
    { value: "action", key: "Action", sort: false },
  ]);
  const [showReceiptPopup, setShowReceiptPopup] = useState(false);
  const [popupIdReceiptPopup, setPopupIdReceiptPopup] = useState();
  const [showAllCancelOrder, setShowAllCancelOrder] = useState(false);
  const [perPageRowArray, setPerPageRowArray] = useState(PER_PAGE_ROWS_OPTIONS);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [popupIdFeedbackModal, setPopupIdFeedbackModal] = useState();
  let currentDate = new Date();
  let pastDate = moment(currentDate).subtract(1, "d").format("YYYY-MM-DD");
  const [pagination, setPagination] = useState({
    perPageRows:  PER_PAGE_ROWS,
    currentPage: 1,
    eventId: "",
    vendorId: "",
    orderStartDate: "",
    orderEndDate: pastDate,
    cancelledOrder: "",
    orderBy: "DESC",
    sortBy: "id",
  });

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
        pagination.orderStartDate = e.target.value || "";
        pagination.orderEndDate = "";
        getAllPastOrders(showAllCancelOrder);
      } else if (e.target.name == "searchToDate") {
        pagination.orderStartDate = "";
        pagination.orderEndDate = e.target.value;
        getAllPastOrders(showAllCancelOrder);
      }
    }, 500);
  };

  const getAllPastOrders = async (value) => {
    try {
      setLoader(true);
      setPastOrdersList([]);
      const payload = {
        currentPage: pagination.currentPage,
        perPageRows: pagination.perPageRows,
        parentId: props.data.loginInfo.id,
        eventId: pagination.eventId,
        vendorId: pagination.vendorId,
        orderStartDate: pagination.orderStartDate,
        orderEndDate: pagination.orderEndDate,
        cancelledOrder: value ? 1 : 0,
        orderBy: pagination.orderBy,
        sortBy: pagination.sortBy,
      };
      const data = await GET_ALL_PAST_ORDERS(payload);
      if (data.code === 200 || data.code === "200") {
        setPastOrdersList(data.data.orders);
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
    getAllPastOrders(showAllCancelOrder);
    return () =>{
    setPastOrdersList();
    }
  }, []);

  const showCancelOrder = () => {
    setShowAllCancelOrder(!showAllCancelOrder);
    getAllPastOrders(!showAllCancelOrder);
  };

  const changePerPage = async (e) => {
    pagination.perPageRows = parseInt(e.target.value);
    pagination.currentPage = 1;
    getAllPastOrders(showAllCancelOrder);
    setPagination(1);
  };
  const sortData = (data) => {
    if (data.sort) {
      pagination.sortBy = data.value;
      pagination.orderBy = pagination.orderBy === "DESC" ? "ASC" : "DESC";
      getAllPastOrders(showAllCancelOrder);
    }
  };
  const getRefreshAllPastOrdersList = async (e) => {
    pagination.perPageRows = pagination.perPageRows;
    pagination.currentPage = 1;
    getAllPastOrders(showAllCancelOrder);
    setPagination(1);
  };
  const openPopupAndPassId1 = (recordId) => {
    setPopupIdReceiptPopup(recordId);
    setShowReceiptPopup(true);
  };

  const eventFeedbackOpen = (recordId) => {
    setPopupIdFeedbackModal(recordId);
    setShowFeedbackModal(true);
  };

  const checkAPICall = async (e) => {        
    try {
      const payload = {
        id_event: e.id_event,
        id_vendor: e.id_vendor,
        rating: e.rating,
        feedback: e.feedback,
      };
      const data = await EVENT_FEEDBACK(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        setShowFeedbackModal(false)
        const tempOrderObject = pastOrdersList.findIndex((order) => {
          return order.id == popupIdFeedbackModal;
        });
        const tempOrderListArray = [...pastOrdersList];
        tempOrderListArray[tempOrderObject].feedback_given = "1";  
        setPastOrdersList(tempOrderListArray)
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
                    Past Orders
                  </h3>
                  <p className="text-white mb-0">List of Past Orders</p>
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      className="cursor-pointer mr-2"
                      src={SearchIcon}
                      width="27"
                      onClick={() => showSearchBox()}
                      alt="search"
                    />
                  </div>
                  <div>
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
                  </div>
                  <div>
                    <img
                      className="ml-2 cursor-pointer"
                      title="Relaod Data"
                      src={relaodSVG}
                      onClick={(e) => getRefreshAllPastOrdersList()}
                      alt="Relaod Data"
                      width="27px"
                    />
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
                                  type="date"
                                  placeholder=" "
                                  name="searchFromDate"
                                  autoComplete="off"
                                  className={`form-control eb-contact-input material-input h-3em`}
                                  onChange={(e) => handleInputChange(e)}
                                  autoFocus
                                />
                                <label className="material-label text-uppercase text-1">
                                  Order From Date
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
                                  Order To Date
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-sm-12">
                              <div className="ml-4">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={"check"}
                                  value={showAllCancelOrder}
                                  onChange={() => showCancelOrder()}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={"check"}
                                >
                                  Show cancelled order(s) only
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
                  {pastOrdersList.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Moment>{item.order_date}</Moment>
                      </td>
                      <td>
                        {item.student.first_name} {item.student.last_name}
                      </td>
                      <td>{item.student.grade_division_name}</td>
                      <td>{item.vendor.restaurant_name}</td>
                      <td>
                        <img
                          src={EyeIcon}
                          className="mr-2 cursor-pointer"
                          width="26"
                          alt="edit"
                          title="View Order Details"
                          onClick={(e) => openPopupAndPassId1(item.id)}
                        />
                        {item.feedback_given == 0 && (
                          <img
                            src={FeedbackIcon}
                            className="cursor-pointer"
                            width="24"
                            alt="feedback"
                            title="Give Feedback"
                            onClick={() => eventFeedbackOpen(item.id)}
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
                  {isloader === false && pastOrdersList.length === 0 && (
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
                      changePage={() => getAllPastOrders(showAllCancelOrder)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showReceiptPopup && (
        <OrderDetailsReseiptModal
          closeModal={() => setShowReceiptPopup(false)}
          orderId={popupIdReceiptPopup}
          orderBy="parent"
        />
      )}
      {showFeedbackModal && (
        <EventFeedbackModal
          closeModal={() => setShowFeedbackModal(false)}
          popupIdFeedbackModal={popupIdFeedbackModal}
          checkAPICall={(e)=>checkAPICall(e)}
          title="parent"
        />
      )}
    </React.Fragment>
  );
};

export default ParentPastOrders;
