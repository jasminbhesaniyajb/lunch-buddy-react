import React, { useState, useEffect } from "react";

import { Table } from "react-bootstrap";
import relaodSVG from "../../../assets/img/reload.svg";
import EditIcon from "../../../assets/img/icons/edit-circle.svg";
import DeleteIcon from "../../../assets/img/icons/delete-icon.svg";
import ViewResMenuIcon from "../../../assets/img/icons/view-res-menu.svg";
import ApproveIcon from "../../../assets/img/icons/active-icon.svg";
import InfoIcon from "../../../assets/img/icons/information-icon.svg";
import copyIcon from "../../../assets/img/icons/copy.svg";

import RejectionReasonModal from "../../../components/RejectionReasonModal";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";

import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import ShowingPagination from "../../../components/ShowingPagination";
import ConformationMenuDeleteModal from "../../../components/ConformationMenuDeleteModal";
import AcceptanceEventModal from "../../../components/AcceptanceEventModal";
import RestaurantMenuModal from "../../../components/RestaurantMenuModal";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../../../config";

import {
  GET_ALL_UPCOMING_EVENTS,
  SUBMIT_EVENT_FOR_RESTAURANT_APPROVAL,
  DELETE_SCHOOL_EVENT,
} from "../../../services/ENDPOINT";

const SchoolUpcomingEvent = (props) => {
  const [isloader, setLoader] = useState(false);
  const [upComingEventsList, setUpComingEventsList] = useState([]);
  const [tablefields, setTablefields] = useState([
    { value: "event_name", key: "Event Name", sort: true },
    { value: "restaurant", key: "Vendor Name", sort: true },
    { value: "scheduled_date", key: "Schedule Date", sort: true },
    { value: "cutoff_date", key: "Order Cutoff Date", sort: true },
    { value: "acceptance_date", key: "Acceptance Date", sort: true },
    { value: "action", key: "Action", sort: false },
  ]);
  const [pagination, setPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    scheduleStartDate: "",
    orderBy: "DESC",
    sortBy: "id",
  });
  const [showConformationMenuDeleteModal, setShowConformationMenuDeleteModal] = useState(false);
  const [popupIdConformationMenuDeleteModal, setPopupIdConformationMenuDeleteModal] = useState();
  const [showAcceptanceEventModal, setShowAcceptanceEventModal] = useState(false);
  const [popupIdSubmitEventApproval, setPopupIdSubmitEventApproval] = useState();
  const [acceptanceEventName, setAcceptanceEventName] = useState();
  const [pathVariableAcceptanceEventModal, setPathVariableAcceptanceEventModal] = useState();
  const [showRestaurantMenuPopup, setShowRestaurantMenuPopup] = useState(false);
  const [pathVariableRestaurantMenuModal, setPathVariableRestaurantMenuModal] = useState("upcoming-menu");
  const [popupIdRestaurantMenuModal, setPopupIdRestaurantMenuModal] = useState();
  const [showRejectionPopup, setRejectionShowPopup] = useState(false);
  const [rejectionReason, setRejectionReason] = useState();
  const [popupRejectionId, setPopupRejectionId] = useState();
  const [perPageRowArray, setPerPageRowArray] = useState(PER_PAGE_ROWS_OPTIONS)
  const getUpcomingEvents = async (e) => {
    let currentDate = new Date();
    let upComingDate = moment(currentDate).format("YYYY-MM-DD");
    try {
      setLoader(true);
      setUpComingEventsList([]);
      const payload = {
        currentPage: pagination.currentPage,
        perPageRows: pagination.perPageRows,
        schoolId: props.data.loginInfo.id,
        scheduleStartDate: upComingDate,
        orderBy: pagination.orderBy,
        sortBy: pagination.sortBy,
      };
      const data = await GET_ALL_UPCOMING_EVENTS(payload);
      if (data.code === 200 || data.code === "200") {
        setUpComingEventsList(data.data.menu_items);
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
    getUpcomingEvents();
    return () =>{
      setUpComingEventsList();
    }
  }, []);

  const changePerPage = async (e) => {
    pagination.perPageRows = parseInt(e.target.value);
    pagination.currentPage = 1;
    getUpcomingEvents();
    setPagination(1);
  };
  const sortData = (data) => {
    if (data.sort) {
      pagination.sortBy = data.value;
      pagination.orderBy = pagination.orderBy === "DESC" ? "ASC" : "DESC";
      getUpcomingEvents();
    }
  };
  const getRefreshUpcomingEvents = async (e) => {
    pagination.perPageRows = pagination.perPageRows;
    pagination.currentPage = 1;
    getUpcomingEvents();
    setPagination(1);
  };
  const openPopupAndPassId = (recordId) => {
    setPopupIdConformationMenuDeleteModal(recordId);
    setShowConformationMenuDeleteModal(true);
  };
  const acceptanceEvent = (recordId, recordEventName) => {
    setPopupIdSubmitEventApproval(recordId);
    setAcceptanceEventName(recordEventName);
    setPathVariableAcceptanceEventModal("school");
    setShowAcceptanceEventModal(true);
  };
  const submitEventApproval = async () => {
    const payload = { id: popupIdSubmitEventApproval };
    try {
      const data = await SUBMIT_EVENT_FOR_RESTAURANT_APPROVAL(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        setShowAcceptanceEventModal(false);
        getUpcomingEvents();
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  const deleteMenuItem = async () => {
    const payload = { id: popupIdConformationMenuDeleteModal };
    try {
      const data = await DELETE_SCHOOL_EVENT(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempUpComingEventsListObject = upComingEventsList.findIndex((eventMenu) => {
          return eventMenu.id == popupIdConformationMenuDeleteModal;
        });
        const tempUpComingEventsListArray = [...upComingEventsList];
        tempUpComingEventsListArray.splice(tempUpComingEventsListObject, 1);
        const newObject = { ...pagination };
        newObject.totalItems = newObject.totalItems - 1;
        var minus = newObject.totalPages - 1;
        var multiply = newObject.perPageRows * minus;
        newObject.totalPages =
          multiply == newObject.totalItems
            ? newObject.totalPages - 1
            : newObject.totalPages;

        setPagination(newObject);
        setUpComingEventsList(tempUpComingEventsListArray);
        setShowConformationMenuDeleteModal(false);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
      setShowConformationMenuDeleteModal(false);
    }
  };
  const viewUpcomingEvent = (recordId) => {
    setPopupIdRestaurantMenuModal(recordId);
    setShowRestaurantMenuPopup(true);
  };

  const handleRejection = (recordId, rejectionReason) => {
    setPopupRejectionId(recordId);
    setRejectionShowPopup(true);
    setRejectionReason(rejectionReason);
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
                    Upcoming Events List
                  </h3>
                  <p className="text-white mb-0">List of Upcoming Events</p>
                </div>
                <div className="d-flex align-items-center">
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
                        )
                      )}
                    </select>
                  </div>
                  <div>
                    <img
                      className="ml-2 cursor-pointer"
                      title="Relaod Data"
                      src={relaodSVG}
                      onClick={(e) => getRefreshUpcomingEvents()}
                      alt="Relaod Data"
                      width="27px"
                    />
                  </div>
                </div>
              </div>
              <Table className="custom-table-sec" responsive hover>
                <thead>
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
                  {upComingEventsList.map((item, index) => (
                    <tr
                      key={index}
                      className={
                        (item.rejected_date !== null &&
                        item.acceptance_request_date === null ? 
                        "bg-light-red" : null )
                      }
                    >
                      <td>{item.event_name}</td>
                      <td>{item.vendor.restaurant_name}</td>
                      <td>
                        <Moment>{item.scheduled_date}</Moment>
                      </td>
                      <td>
                        <Moment>{item.cutoff_date}</Moment>
                      </td>
                      <td>
                        {item.acceptance_date && (
                          <Moment>{item.acceptance_date}</Moment>
                        )}
                      </td>
                      <td>
                        <img
                          className="cursor-pointer mr-2"
                          src={ViewResMenuIcon}
                          width="26"
                          alt="view"
                          title="View Menu"
                          onClick={(e) => viewUpcomingEvent(item)}
                        />
                        {item.acceptance_request_date !== null ? null : (
                          <Link
                            to={`/school/organize?id=${item.id_vendor}&restaurantName=${item.vendor.restaurant_name}&organizeId=${item.id}`}
                          >
                            <img
                              className="mr-2"
                              src={EditIcon}
                              width="26"
                              alt="edit"
                              title="Edit"
                            />
                          </Link>
                        )}
                        <img
                          className="cursor-pointer mr-2"
                          src={DeleteIcon}
                          width="24"
                          alt="delete"
                          title="Delete This Event"
                          onClick={(e) => openPopupAndPassId(item.id)}
                        />
                        {item.acceptance_request_date == null && (
                          <img
                            className="mr-2 cursor-pointer"
                            src={ApproveIcon}
                            width="24"
                            alt="Approve"
                            title="Submit For Acceptance"
                            onClick={(e) =>
                              acceptanceEvent(item.id, item.event_name)
                            }
                          />
                        )}
                        {item.rejected_date !== null &&
                          item.acceptance_request_date === null && (
                            <img
                              className="mr-2 cursor-pointer"
                              src={InfoIcon}
                              width="24"
                              alt="Info"
                              title="View Rejection Reason"
                              onClick={(e) =>
                                handleRejection(item.id, item.rejection_reason)
                              }
                            />
                          )}
                          <Link
                            to={`/school/organize?id=${item.id_vendor}&restaurantName=${item.vendor.restaurant_name}&organizeId=${item.id}&copyEvent=copyEvent`}
                          >
                            <img
                              className="cursor-pointer"
                              src={copyIcon}
                              width="24"
                              alt="copy"
                              title="Copy This Event"
                            />
                          </Link>
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
                  {isloader === false && upComingEventsList.length === 0 && (
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
                      changePage={getUpcomingEvents}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showConformationMenuDeleteModal && (
        <ConformationMenuDeleteModal
          closeModal={() => setShowConformationMenuDeleteModal(false)}
          deleteMessage={"You are about to delete upcoming event."}
          eventId={popupIdConformationMenuDeleteModal}
          deleteMenuItem={() => deleteMenuItem()}
        />
      )}
      {showAcceptanceEventModal && (
        <AcceptanceEventModal
          closeModal={() => setShowAcceptanceEventModal(false)}
          eventName={acceptanceEventName}
          pathVariable={pathVariableAcceptanceEventModal}
          acceptanceEventItem={() => submitEventApproval()}
        />
      )}
      {showRestaurantMenuPopup && (
        <RestaurantMenuModal
          closeModal={() => setShowRestaurantMenuPopup(false)}
          restaurantId={popupIdRestaurantMenuModal}
          pathVariable={pathVariableRestaurantMenuModal}
        />
      )}
      {showRejectionPopup && (
        <RejectionReasonModal
          closeModal={() => setRejectionShowPopup(false)}
          rejectionReason={rejectionReason}
        />
      )}
    </React.Fragment>
  );
};
export default SchoolUpcomingEvent;
