import React, { useState, useEffect } from "react";

import { Table } from "react-bootstrap";
import relaodSVG from "../../../assets/img/reload.svg";
import SearchIcon from "../../../assets/img/icons/search-icon.svg";
import copyIcon from "../../../assets/img/icons/copy.svg";
import ViewResMenuIcon from "../../../assets/img/icons/view-res-menu.svg";
import FeedbackIcon from "../../../assets/img/icons/feedback.svg";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";

import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import ShowingPagination from "../../../components/ShowingPagination";
import RestaurantMenuModal from "../../../components/RestaurantMenuModal";
import EventFeedbackModal from "../../../components/EventFeedbackModal";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../../../config";

import { GET_ALL_PAST_EVENTS, EVENT_FEEDBACK } from "../../../services/ENDPOINT";

const SchoolPastEvent = (props) => {
  const [isloader, setLoader] = useState(false);
  const [eventsList, setEventsList] = useState([]);
  const [tablefields, setTablefields] = useState([
    { value: "event_name", key: "Event Name", sort: true },
    { value: "restaurant", key: "Vendor Name", sort: true },
    { value: "scheduled_date", key: "Schedule Date", sort: true },
    { value: "cutoff_date", key: "Order Cutoff Date", sort: true },
    { value: "action", key: "Action", sort: false },
  ]);
  let currentDate = new Date();
  let pastDate = moment(currentDate).subtract(1, "d").format("YYYY-MM-DD");
  const [pagination, setPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    scheduleEndDate: pastDate,
    scheduleStartDate: "",
    orderBy: "DESC",
    sortBy: "id",
  });
  const [showSearch, setShowSearch] = useState(false);
  const [showRestaurantMenuModal, setShowRestaurantMenuModal] = useState(false);
  const [popupIdRestaurantMenuModal, setPopupIdRestaurantMenuModal] =
    useState();
  const [pathVariableRestaurantMenuModal, setPathvariableRestaurantMenuModal] =
    useState("upcoming-menu");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [popupIdFeedbackModal, setPopupIdFeedbackModal] = useState();
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
        pagination.scheduleStartDate = e.target.value || "";
        pagination.scheduleEndDate = "";
        getAllEvents();
      } else if (e.target.name == "searchToDate") {
        pagination.scheduleStartDate = "";
        pagination.scheduleEndDate = e.target.value;
        getAllEvents();
      }
    }, 500);
  };

  const getAllEvents = async (e) => {
    try {
      setLoader(true);
      setEventsList([]);
      const payload = {
        currentPage: pagination.currentPage,
        perPageRows: pagination.perPageRows,
        schoolId: props.data.loginInfo.id,
        scheduleEndDate: pagination.scheduleEndDate,
        scheduleStartDate: pagination.scheduleStartDate,
        orderBy: pagination.orderBy,
        sortBy: pagination.sortBy,
      };
      const data = await GET_ALL_PAST_EVENTS(payload);
      if (data.code === 200 || data.code === "200") {
        setEventsList(data.data.menu_items);
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
    getAllEvents();
    return () =>{
      setEventsList();
    }
  }, []);

  const changePerPage = async (e) => {
    pagination.perPageRows = parseInt(e.target.value);
    pagination.currentPage = 1;
    getAllEvents();
    setPagination(1);
  };
  const sortData = (data) => {
    if (data.sort) {
      pagination.sortBy = data.value;
      pagination.orderBy = pagination.orderBy === "DESC" ? "ASC" : "DESC";
      getAllEvents();
    }
  };
  const getRefreshAllEvents = async (e) => {
    pagination.perPageRows = pagination.perPageRows;
    pagination.currentPage = 1;
    getAllEvents();
    setPagination(1);
  };

  const viewPastEvent = (recordId) => {
    setPopupIdRestaurantMenuModal(recordId);
    setShowRestaurantMenuModal(true);
  };

  const eventFeedbackOpen = (recordId) => {
    setPopupIdFeedbackModal(recordId);
    setShowFeedbackModal(true);
  };

  const checkAPICall = async (e) => {        
    try {
      const payload = {
        id_event: popupIdFeedbackModal,
        id_vendor: e.id_vendor,
        rating: e.rating,
        feedback: e.feedback,
      };
      const data = await EVENT_FEEDBACK(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        setShowFeedbackModal(false)
        const tempEventParentObject = eventsList.findIndex((event) => {
          return event.id == popupIdFeedbackModal;
        });
        const tempEventsListArray = [...eventsList];
        tempEventsListArray[tempEventParentObject].feedback_given = "1";  
        setEventsList(tempEventsListArray)
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
                    Past Events List
                  </h3>
                  <p className="text-white mb-0">List of Past Events</p>
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
                      onClick={(e) => getRefreshAllEvents()}
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
                                  Schedule From Date
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
                                  Schedule To Date
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
                  {eventsList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.event_name}</td>
                      <td>{item.vendor.restaurant_name}</td>
                      <td>
                        <Moment>{item.scheduled_date}</Moment>
                      </td>
                      <td>
                        <Moment>{item.cutoff_date}</Moment>
                      </td>
                      <td>
                        <img
                          className="cursor-pointer mr-2"
                          src={ViewResMenuIcon}
                          width="26"
                          alt="view"
                          title="View Menu"
                          onClick={(e) => viewPastEvent(item)}
                        />
                        <Link
                          to={`/school/organize?id=${item.id_vendor}&restaurantName=${item.vendor.restaurant_name}&organizeId=${item.id}&copyEvent=copyEvent`}
                        >
                          <img
                            className="cursor-pointer mr-2"
                            src={copyIcon}
                            width="24"
                            alt="copy"
                            title="Copy This Event"
                          />
                        </Link>
                        {item.feedback_given == 0 &&
                        <img
                          src={FeedbackIcon}
                          className="cursor-pointer"
                          width="24"
                          alt="feedback"
                          title="Give Feedback"
                          onClick={() => eventFeedbackOpen(item.id)}
                        />
                        }
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
                  {isloader === false && eventsList.length === 0 && (
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
                      changePage={getAllEvents}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showRestaurantMenuModal && (
        <RestaurantMenuModal
          closeModal={() => setShowRestaurantMenuModal(false)}
          restaurantId={popupIdRestaurantMenuModal}
          pathVariable={pathVariableRestaurantMenuModal}
        />
      )}
      {showFeedbackModal && (
        <EventFeedbackModal closeModal={() => setShowFeedbackModal(false)} popupIdFeedbackModal={popupIdFeedbackModal} title="school" checkAPICall={(e)=>checkAPICall(e)} />
      )}
    </React.Fragment>
  );
};
export default SchoolPastEvent;
