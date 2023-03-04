import React, { useState, useEffect } from "react";

import SearchIcon from "../assets/img/icons/search-icon.svg";
import relaodSVG from "../assets/img/reload.svg";

import { Table, OverlayTrigger, Popover } from "react-bootstrap";
import Moment from "react-moment";
import { toast } from "react-toastify";

import Pagination from "../components/Pagination";
import ShowingPagination from "../components/ShowingPagination";
import Loader from "./Loader";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../config";

import { GET_ALL_RESTAURANT_PAYMENT_HISTORY } from "../services/ENDPOINT";

const RestaurantPaymentHistory = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isloader, setLoader] = useState(false);
  const [restaurantPaymentHistoryList, setRestaurantPaymentHistoryList] =
    useState([]);
  const [perPageRowArray, setPerPageRowArray] = useState(PER_PAGE_ROWS_OPTIONS);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPageRows: PER_PAGE_ROWS,
    restaurant_name: "",
    payment_from: "",
    payment_to: "",
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
      if (e.target.name == "search") {
        pagination.restaurant_name = e.target.value || "";
        pagination.payment_from = pagination.payment_from
          ? pagination.payment_from
          : "";
        pagination.payment_to = pagination.payment_to
          ? pagination.payment_to
          : "";
        getRestaurantPaymentHistroy();
      } else if (e.target.name == "searchFromDate") {
        pagination.restaurant_name = pagination.restaurant_name
          ? pagination.restaurant_name
          : "";
        pagination.payment_from = e.target.value;
        pagination.payment_to = pagination.payment_to
          ? pagination.payment_to
          : "";
        getRestaurantPaymentHistroy();
      } else if (e.target.name == "searchToDate") {
        pagination.restaurant_name = pagination.restaurant_name
          ? pagination.restaurant_name
          : "";
        pagination.payment_from = pagination.payment_from
          ? pagination.payment_from
          : "";
        pagination.payment_to = e.target.value;
        getRestaurantPaymentHistroy();
      }
    }, 500);
  };

  const getRestaurantPaymentHistroy = async (e) => {
    try {
      setLoader(true);
      setRestaurantPaymentHistoryList([]);
      const data = await GET_ALL_RESTAURANT_PAYMENT_HISTORY(pagination);
      if (data.code === 200 || data.code === "200") {
        setRestaurantPaymentHistoryList(data.data.payment_history);
        const recordData = {
          currentPage: data.data.pagination.currentPage,
          perPageRows: data.data.pagination.perPageRows,
          totalPages: data.data.pagination.totalPages,
          totalItems: data.data.pagination.totalItems,
          restaurant_name: pagination.restaurant_name,
          payment_from: pagination.payment_from,
          payment_to: pagination.payment_to,
        };
        setPagination(recordData);
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
    getRestaurantPaymentHistroy();
  }, []);

  const changePerPage = async (e) => {
    pagination.perPageRows = parseInt(e.target.value);
    pagination.currentPage = 1;
    getRestaurantPaymentHistroy();
    setPagination(1);
  };

  const getRefreshRestaurantPaymentHistroy = async (e) => {
    pagination.perPageRows = pagination.perPageRows;
    pagination.currentPage = 1;
    getRestaurantPaymentHistroy();
    setPagination(1);
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
                    Vendor Payment History
                  </h3>
                  <p className="text-white mb-0">
                    List of Vendor Payment History
                  </p>
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
                    <div>
                      <select
                        className="px-2 py-1 ml-2"
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
                        onClick={(e) => getRefreshRestaurantPaymentHistroy()}
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
                            <div className="form-group col-lg-4 col-md-6 col-sm-12 col-12">
                              <div className="material-textfield">
                                <input
                                  placeholder=" "
                                  name="search"
                                  autoComplete="off"
                                  className={`form-control eb-contact-input material-input h-3em`}
                                  autoFocus
                                  onChange={(e) => handleInputChange(e)}
                                />
                                <label className="material-label text-uppercase text-1">
                                  Search by Restaurant Name
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-sm-12">
                              <div className="material-textfield">
                                <input
                                  type="date"
                                  placeholder=" "
                                  name="searchFromDate"
                                  autoComplete="off"
                                  className={`form-control eb-contact-input material-input h-3em`}
                                  onChange={(e) => handleInputChange(e)}
                                />
                                <label className="material-label text-uppercase text-1">
                                  Payment From-Date
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
                                  Payment To-Date
                                </label>
                              </div>
                            </div>
                          </div>
                        </form>
                      </th>
                    </tr>
                  )}
                  <tr>
                    <th>Restaurant Name</th>
                    <th>Contact Number</th>
                    <th className="text-right">
                      Amount Paid
                      <span className="text-color-tertiary"> (inc GST)</span>
                    </th>
                    <th>Payment Date</th>
                    <th>Payment Mode</th>
                    <th>Transaction No</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurantPaymentHistoryList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.restaurant_name}</td>
                      <td>
                        <a href={`tel:${item.primary_contact_number}`}>
                          {item.primary_contact_number}
                        </a>
                      </td>
                      <td className="text-right">
                        <OverlayTrigger
                          trigger={["hover", "hover"]}
                          rootClose
                          placement="bottom"
                          overlay={
                            <Popover id={`popover-positioned-bottom`}>
                              <Popover.Content>
                                <strong>Payment Due:</strong>
                                <div>
                                  <p className="mb-0">
                                    Amount Due (exc GST):{" "}
                                    <strong className="font-weight-semibold">
                                      ${item.amount_exc_gst}
                                    </strong>
                                  </p>
                                </div>
                                <div>
                                  <p className="mb-0">
                                    GST:{" "}
                                    <strong className="font-weight-semibold">
                                      ${item.gst}
                                    </strong>
                                  </p>
                                </div>
                              </Popover.Content>
                            </Popover>
                          }
                        >
                          <span className="cursor-pointer">
                            ${item.amount_paid}
                          </span>
                        </OverlayTrigger>
                      </td>
                      <td>
                        <Moment>{item.payment_date}</Moment>
                      </td>
                      <td>{item.payment_mode}</td>
                      <td>{item.tran_number}</td>
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
                  {isloader === false &&
                    restaurantPaymentHistoryList.length === 0 && (
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
                      changePage={getRestaurantPaymentHistroy}
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
export default RestaurantPaymentHistory;
