import React, { useState, useEffect } from "react";

import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import SearchIcon from "../../../assets/img/icons/search-icon.svg";
import Loader from "../../../components/Loader";
import Moment from "react-moment";
import Pagination from "../../../components/Pagination";
import ShowingPagination from "../../../components/ShowingPagination";
import relaodSVG from "../../../assets/img/reload.svg";
import EyeIcon from "../../../assets/img/icons/eye.svg";
import AcknowledgeThisRequestModal from "../../../components/AcknowledgeThisRequestModal";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../../../config";

import { GET_ALL_MENU_CHANGE_REQUEST } from "../../../services/ENDPOINT";

const AdminMenuChangeRequest = (props) => {
  const [isloader, setLoader] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [menuChangeRequestsList, setMenuChangeRequestsList] = useState([]);
  const [showAllPastRequest, setShowAllPastRequest] = useState(false);
  const [showAcknowledgeThisRequestModal, setShowAcknowledgeThisRequestModal] = useState(false);
  const [tablefields, setTablefields] = useState([
    { value: "restaurant_name", key: "Restaurant Name", sort: true },
    { value: "first_name", key: "First Name", sort: true },
    { value: "last_name", key: "Last Name", sort: true },
    { value: "primary_contact_number", key: "Contact Number", sort: true },
    { value: "email_address", key: "Email Address", sort: true },
    { value: "requested_date", key: "Requested Date", sort: true },
    { value: "action", key: "Action", sort: false },
  ]);
  const [pagination, setPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    requestFromDate: "",
    requestToDate: "",
    orderBy: "DESC",
    sortBy: "id",
  });
  const [recordId, setRecordId] = useState();
  const [changeRequestDetail, setChangeRequestDetail] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [restaurantName, setRestaurantName] = useState();
  const [primaryContactNumber, setPrimaryContactNumber] = useState();
  const [vendorId, setVendorId] = useState();
  const [addressedDate, setAddressedDate] = useState();
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
        pagination.requestFromDate = e.target.value || "";
        pagination.requestToDate = "";
        getAllMenuChangeRequest();
      } else if (e.target.name == "searchToDate") {
        pagination.requestFromDate = "";
        pagination.requestToDate = e.target.value;
        getAllMenuChangeRequest();
      }
    }, 500);
  };

  const getAllMenuChangeRequest = async (value) => {
    try {
      setLoader(true);
      setMenuChangeRequestsList([]);
      const payload = {
        currentPage: pagination.currentPage,
        perPageRows: pagination.perPageRows,
        requestFromDate: pagination.requestFromDate,
        requestToDate: pagination.requestToDate,
        showAllRequests: value ? 1 : 0,
        orderBy: pagination.orderBy,
        sortBy: pagination.sortBy,
      };
      const data = await GET_ALL_MENU_CHANGE_REQUEST(payload);
      if (data.code === 200 || data.code === "200") {
        setMenuChangeRequestsList(data.data.menu_items);
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
    getAllMenuChangeRequest(showAllPastRequest);
    return ()=>{
      setMenuChangeRequestsList();
    }
  }, []);

  const getRefreshInquiryList = async (e) => {
    pagination.perPageRows = pagination.perPageRows;
    pagination.currentPage = 1;
    getAllMenuChangeRequest(showAllPastRequest);
    setPagination(1);
  };

  const changePerPage = async (e) => {
    pagination.perPageRows = parseInt(e.target.value);
    pagination.currentPage = 1;
    getAllMenuChangeRequest(showAllPastRequest);
    setPagination(1);
  };

  const showAll = () => {
    setShowAllPastRequest(!showAllPastRequest);
    getAllMenuChangeRequest(!showAllPastRequest);
  };

  const sortData = (data) => {
    if (data.sort) {
      pagination.sortBy = data.value;
      pagination.orderBy = pagination.orderBy === "DESC" ? "ASC" : "DESC";
      getAllMenuChangeRequest(showAllPastRequest);
    }
  };

  const handleAcknowledgeRequest = (
    recordId,
    changeRequestDetail,
    emailAddress,
    restaurantName,
    primaryContactNumber,
    vendorId,
    addressedDate
  ) => {
    setRecordId(recordId);
    setShowAcknowledgeThisRequestModal(true);
    setChangeRequestDetail(changeRequestDetail);
    setEmailAddress(emailAddress);
    setRestaurantName(restaurantName);
    setPrimaryContactNumber(primaryContactNumber);
    setVendorId(vendorId);
    setAddressedDate(addressedDate);
  };

  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 px-0">
        {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          <div className="col-lg-12 col-md-12 col-sm-12 mt-5">
            <div className="card-table">
              <div className="table-header-sec bg-dark-blue d-flex justify-content-between align-items-md-center align-items-sm-start flex-column-sm">
                <div>
                  <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                    Menu Change Request List
                  </h3>
                  <p className="text-white mb-0">List of Restaurant Menu Change Requests</p>
                </div>
                <div>
                  <div className="d-flex align-items-center margin-top-sm-12">
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
                      )
                      )}
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
                                  Request-From-Date
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
                                  Request-To-Date
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-sm-12">
                              <div className="form-check ml-2 mt-2">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="exampleCheck1"
                                  value={showAllPastRequest}
                                  onChange={() => showAll()}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="exampleCheck1"
                                >
                                  Show All Change Requests
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
                  {menuChangeRequestsList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.restaurant_name}</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.primary_contact_number}</td>
                      <td>{item.email_address}</td>
                      <td>
                        <Moment>{item.requested_date}</Moment>
                      </td>
                      <td>
                        {item.addressed_date == null && (
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={(e) =>
                              handleAcknowledgeRequest(
                                item.id,
                                item.change_request_detail,
                                item.email_address,
                                item.restaurant_name,
                                item.primary_contact_number,
                                item.vendorId,
                                item.addressed_date
                              )
                            }
                          >
                            Acknowledge this request
                          </Button>
                        )}
                        {item.addressed_date !== null &&
                          <img
                            className="cursor-pointer"
                            src={EyeIcon}
                            width="26"
                            alt="view"
                            title="View Menu Change Request"
                            onClick={(e) =>
                              handleAcknowledgeRequest(
                                item.id,
                                item.change_request_detail,
                                item.email_address,
                                item.restaurant_name,
                                item.primary_contact_number,
                                item.vendorId,
                                item.addressed_date
                              )
                            }
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
                  {isloader === false && menuChangeRequestsList.length === 0 && (
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
                      changePage={() =>
                        getAllMenuChangeRequest(showAllPastRequest)
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAcknowledgeThisRequestModal && (
        <AcknowledgeThisRequestModal
          closeModal={() => setShowAcknowledgeThisRequestModal(false)}
          recordId={recordId}
          changeRequestDetail={changeRequestDetail}
          emailAddress={emailAddress}
          restaurantName={restaurantName}
          primaryContactNumber={primaryContactNumber}
          vendorId={vendorId}
          addressedDate={addressedDate}
        />
      )}
    </React.Fragment>
  );
};
export default AdminMenuChangeRequest;
