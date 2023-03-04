import React, { useState, useEffect } from "react";

import relaodSVG from "../../../assets/img/reload.svg";
import RemoveCartIcon from "../../../assets/img/icons/remove-cart.svg";
import EyeIcon from "../../../assets/img/icons/eye.svg";

import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import Moment from "react-moment";
import moment from "moment";

import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import ShowingPagination from "../../../components/ShowingPagination";
import ConformationMenuDeleteModal from "../../../components/ConformationMenuDeleteModal";
import OrderDetailsReseiptModal from "../../../components/OrderDetailsReceiptModal";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../../../config";

import { GET_ALL_PAST_ORDERS, CANCEL_ORDER_NOW } from "../../../services/ENDPOINT";

const TeachersUpcomingOrders = (props) => {
  const [isloader, setLoader] = useState(false);
  const [upcomingOrdersList, setUpcomingOrdersList] = useState([]);
  const [tablefields, setTablefields] = useState([
    { value: "SE.scheduled_date", key: "Event Date", sort: false },
    { value: "teacher_name", key: "Teacher Name", sort: true },
    { value: "student_grade", key: "Grade", sort: true },
    { value: "restaurant", key: "Restaurant", sort: true },
    { value: "order_status", key: "Order Status", sort: true },
    { value: "action", key: "Action", sort: false },
  ]);
  const [pagination, setPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    eventId: "",
    vendorId: "",
    orderStartDate: "",
    orderEndDate: "",
    cancelledOrder: "",
    orderBy: "DESC",
    sortBy: "id"
  });
  const [showPopupConformationMenuDeleteModal, setShowPopupConformationMenuDeleteModal] = useState(false);
  const [popupIdConformationMenuDeleteModal, setPopupIdConformationMenuDeleteModal] = useState();
  const [popupIdReceiptPopup, setPopupIdReceiptPopup] = useState();
  const [showReceiptPopup, setShowReceiptPopup] = useState(false);
  const [perPageRowArray, setPerPageRowArray] = useState(PER_PAGE_ROWS_OPTIONS);
  
  const getAllUpcomingOrders = async (e) => {
    let currentDate = new Date();
    let upComingDate = moment(currentDate).format("YYYY-MM-DD");
    try {
      setLoader(true);
      setUpcomingOrdersList([]);
      const payload = {
        currentPage: pagination.currentPage,
        perPageRows: pagination.perPageRows,
        parentId: "",
        eventId: pagination.eventId,
        vendorId: pagination.vendorId,
        orderStartDate: upComingDate,
        orderEndDate: pagination.orderEndDate,
        cancelledOrder: pagination.cancelledOrder,
        orderBy: pagination.orderBy,
        sortBy: pagination.sortBy
      };
      const data = await GET_ALL_PAST_ORDERS(payload);
      if (data.code === 200 || data.code === "200") {
        setUpcomingOrdersList(data.data.orders);
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
    getAllUpcomingOrders();
  }, []);

  const changePerPage = async (e) => {
    pagination.perPageRows = parseInt(e.target.value);
    pagination.currentPage = 1;
    getAllUpcomingOrders();
    setPagination(1);
  };
  const sortData = (data) => {
    if (data.sort) {
      pagination.sortBy = data.value
      pagination.orderBy = pagination.orderBy === 'DESC' ? 'ASC' : 'DESC'
      getAllUpcomingOrders();
    }
  }
  const getRefreshAllUpcomingOrders = async (e) => {
    pagination.perPageRows = pagination.perPageRows;
    pagination.currentPage = 1;
    getAllUpcomingOrders();
    setPagination(1);
  };
  const openPopupAndPassId = (recordId) => {
    setPopupIdConformationMenuDeleteModal(recordId);
    setShowPopupConformationMenuDeleteModal(true);
  };

  const deleteMenuItem = async () => {
    const payload = { id: popupIdConformationMenuDeleteModal };
    try {
      const data = await CANCEL_ORDER_NOW(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempUpcomingOrderObject = upcomingOrdersList.findIndex((upcomingOrder) => {
          return upcomingOrder.id == popupIdConformationMenuDeleteModal;
        });
        const tempUpcomingOrderArray = [...upcomingOrdersList];
        tempUpcomingOrderArray.splice(tempUpcomingOrderObject, 1);

        const tempPaginationObject = {...pagination}
        tempPaginationObject.totalItems = tempPaginationObject.totalItems-1
        var minus = tempPaginationObject.totalPages - 1
        var multiply = tempPaginationObject.perPageRows * minus        
        tempPaginationObject.totalPages = multiply==tempPaginationObject.totalItems ? tempPaginationObject.totalPages - 1 : tempPaginationObject.totalPages
        
        setPagination(tempPaginationObject)
        setUpcomingOrdersList(tempUpcomingOrderArray)
        setShowPopupConformationMenuDeleteModal(false)
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  const openPopupAndPassId1 = (recordId) => {
    setPopupIdReceiptPopup(recordId);
    setShowReceiptPopup(true);
  };
  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 px-0 no-printme">
      {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          <div className="col-lg-12 col-md-12 col-sm-12 mt-5">
            <div className="card-table">
              <div className="table-header-sec bg-dark-blue d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                    Upcoming Orders
                  </h3>
                  <p className="text-white mb-0">List of Upcoming Orders</p>
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
                      onClick={(e) => getRefreshAllUpcomingOrders()}
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
                      <th className={item.sort ? "cursor-pointer" : ""} onClick={() => sortData(item)} key={index}>
                        {item.key} {pagination.sortBy === item.value && <i className={pagination.orderBy === "ASC" ? "fa fa-caret-up" : "fa fa-caret-down"} />}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {upcomingOrdersList.map((item, index) => (
                    <tr key={index}>
                      <td><Moment>{item.SE.scheduled_date}</Moment></td>
                      <td>{item.teacher.teacher_name}</td>
                      <td>{item.teacher.grade_division_name}</td>
                      <td>{item.vendor.restaurant_name}</td>
                      <td>{item.order_status}</td>
                      <td>
                        <img
                          className="mr-2 cursor-pointer"
                          src={EyeIcon}
                          width="24"
                          alt="vieworder"
                          title="View Order Details"
                          onClick={(e) => openPopupAndPassId1(item.id)}
                        />
                        {(moment(new Date()).format("YYYY-MM-DD") <= moment(item.SE.cutoff_date).format("YYYY-MM-DD")) &&
                          <img
                            src={RemoveCartIcon}
                            className="cursor-pointer"
                            width="24"
                            alt="cancel order"
                            title="Cancel Order"
                            onClick={(e) => openPopupAndPassId(item.id)}
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
                  {isloader === false && upcomingOrdersList.length === 0 && (
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
                      changePage={getAllUpcomingOrders}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopupConformationMenuDeleteModal && (
        <ConformationMenuDeleteModal
          closeModal={() => setShowPopupConformationMenuDeleteModal(false)}
          manageMenuId={popupIdConformationMenuDeleteModal}
          deleteMessage={"You are about to cancel the order."}
          cancelOrderTitle={"Cancel Order"}
          deleteMenuItem={() => deleteMenuItem()}
        />
      )}
      {showReceiptPopup &&
        <OrderDetailsReseiptModal closeModal={() => setShowReceiptPopup(false)} orderId={popupIdReceiptPopup} orderBy="teacher" />
      }
    </React.Fragment>
  );
};

export default TeachersUpcomingOrders;
