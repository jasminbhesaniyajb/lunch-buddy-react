import React, { useState, useEffect } from "react";

import relaodSVG from "../../../assets/img/reload.svg";

import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import Moment from "react-moment";
import queryString from "query-string";

import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";

import { GET_ALL_PAST_ORDERS } from "../../../services/ENDPOINT";

const RestaurantViewOrder = (props) => {
  const [isloader, setLoader] = useState(false);
  const [OrdersList, setOrdersList] = useState([]);
  const [tablefields, setTablefields] = useState([
    { value: "order_date", key: "Order Date", sort: true },
    { value: "item.student.first_name", key: "Student Name", sort: false },
    { value: "item.student.grade_division_name", key: "Student Grade", sort: false },
    { value: "cutoff_date", key: "Order Cost", sort: false },
  ]);
    const [pagination, setPagination] = useState({
        perPageRows: 10,
        currentPage: 1,
        parentId: "",
        orderStartDate: "",
        orderEndDate: "",
        cancelledOrder: "",
        orderBy: "DESC",
        sortBy: "id"
      });
      const eventId = queryString.parse(location.search).eventId;
      const vendorId = queryString.parse(location.search).vendorId;
      const schoolName = queryString.parse(location.search).schoolName;
      
      const getAllOrders = async (e) => {
        try {
          setLoader(true);
          setOrdersList([]);
          const payload = {
            currentPage: pagination.currentPage,
            perPageRows: pagination.perPageRows,
            parentId: pagination.parentId,
            eventId: eventId,
            vendorId: vendorId,
            schoolName: schoolName,
            orderStartDate: pagination.orderStartDate,
            orderEndDate: pagination.orderEndDate,
            cancelledOrder: pagination.cancelledOrder,
            orderBy: pagination.orderBy,
            sortBy: pagination.sortBy
          };
          const data = await GET_ALL_PAST_ORDERS(payload);
          if (data.code === 200 || data.code === "200") {
            setOrdersList(data.data.orders);
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
        getAllOrders();
      }, []);

      const changePerPage = async (e) => {
        pagination.perPageRows = parseInt(e.target.value);
        pagination.currentPage = 1;
        getAllOrders();
        setPagination(1);
      };
      const sortData = (data) => {
        if (data.sort) {
          pagination.sortBy = data.value;
          pagination.orderBy = pagination.orderBy === "DESC" ? "ASC" : "DESC";
          getAllOrders();
        }
      };

  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 pl-inherit">
      {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          <div className="col-lg-12 col-md-12 col-sm-12 mt-5">
            <div className="card-table">
              <div className="table-header-sec bg-dark-blue d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                  Event Orders
                  </h3>
                  <p className="text-white mb-0">List of event orders from {schoolName}</p>
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <select
                      className="px-2 py-1"
                      name="perPage"
                      onChange={changePerPage}
                    >
                      <option value="15">15</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                  <div>
                    <img
                      className="ml-2 cursor-pointer"
                      title="Relaod Data"
                      src={relaodSVG}
                      onClick={(e) => getAllOrders()}
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
                  {OrdersList.map((item, index) => (
                    <tr key={index}>
                      <td><Moment>{item.order_date}</Moment></td>
                      <td>{item.student.first_name} {item.student.last_name}</td>
                      <td>
                        {item.student.grade_division_name}
                      </td>
                      <td>
                        
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
                  {isloader === false && OrdersList.length === 0 && (
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
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <p>
                    <i className="fa fa-list mr-1"></i>Showing
                    <strong className="mx-1">{pagination.currentPage}</strong>to
                    <strong className="mx-1">
                      {pagination.currentPage * pagination.perPageRows}
                    </strong>
                    of {pagination.totalItems} Entries
                  </p>
                </div>
                <div>
                  {pagination && pagination.totalPages > 0 && (
                    <Pagination
                      pagination={pagination}
                      changePage={getAllOrders}
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

export default RestaurantViewOrder;
