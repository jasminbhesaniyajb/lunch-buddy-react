import React, { useState, useEffect } from "react";

import { Table, Button, Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import queryString from "query-string";
import Moment from "react-moment";
import { history } from "../history";
import {financial} from '../common';

import Loader from "./Loader";

import { GET_EVENT_ORDERS, GET_EVENT_ORDER_LABELS, GET_ADMIN_EVENT_ORDER_LABELS, GET_ADMIN_EVENT_ORDERS } from "../services/ENDPOINT";

const EventOrderDetails = (props) => {
  const [isloader, setLoader] = useState(false);
  const [eventDetail, setEventDetail] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderSummary, setOrderSummary] = useState([]);
  const [grandTotal, setGrandTotal] = useState([]);
  const [eventOrderLabels, setEventOrderLabels] = useState([]);
  const eventId = queryString.parse(location.search).id;
  const eventName = queryString.parse(location.search).eventName;
  const vendorId = queryString.parse(location.search).vendorId;
  const [selectTime, setSelectTime] = useState("00:00");
  
  const getEventOrderDetails = async (e) => {
    if(vendorId == null){
      try {
        setLoader(true);
        setEventDetail([]);
        setOrderDetails([]);
        setOrderSummary([]);
        const payload = eventId;
        const data = await GET_EVENT_ORDERS(payload);
        if (data.code === 200 || data.code === "200") {
          setEventDetail(data.data.event_detail);
          setOrderDetails(data.data.order_details);
          setOrderSummary(data.data.order_summary);
          var str = data.data.event_detail.delivery_time;
          var res = str.split(":");
          var hours = res[0];
          var minutes = res[1];
          setSelectTime(hours + ":" + minutes);
          for (var i = 0; i < data.data.order_details.length; i++) {
            var quantityTotal = [];
            var itemTotal = [];
  
            for (var j = 0; j < data.data.order_details[i].orders.length; j++) {
              quantityTotal.push(
                parseInt(data.data.order_details[i].orders[j].quantity)
              );
              itemTotal.push(parseFloat(data.data.order_details[i].orders[j].item_total));
            }
            var grandQuantityItemTot = quantityTotal.reduce((a, b) => a + b, 0);
            var fixDigit = itemTotal.reduce((a, b) => a + b, 0)
            var grandItemTot = financial(fixDigit);
            const recordData = {
              id: data.data.order_details[i].id_school_grade_divisions,
              qunatityTotal: grandQuantityItemTot,
              itemTotal: grandItemTot,
            };
            grandTotal.push(recordData);
          }
        } else {
          toast.error(data.message);
        }
      } catch ({ data }) {
        toast.error(data.message);
      } finally {
        setLoader(false);
      }
    }else {
      try {
        setLoader(true);
        setEventDetail([]);
        setOrderDetails([]);
        setOrderSummary([]);
        const payload = {
          eventId: eventId,
          vendorId: vendorId
        };
        const data = await GET_ADMIN_EVENT_ORDERS(payload);
        if (data.code === 200 || data.code === "200") {
          setEventDetail(data.data.event_detail);
          setOrderDetails(data.data.order_details);
          setOrderSummary(data.data.order_summary);
          var str = data.data.event_detail.delivery_time;
          var res = str.split(":");
          var hours = res[0];
          var minutes = res[1];
          setSelectTime(hours + ":" + minutes);
          for (var i = 0; i < data.data.order_details.length; i++) {
            var quantityTotal = [];
            var itemTotal = [];
  
            for (var j = 0; j < data.data.order_details[i].orders.length; j++) {
              quantityTotal.push(
                parseInt(data.data.order_details[i].orders[j].quantity)
              );
              itemTotal.push(parseFloat(data.data.order_details[i].orders[j].item_total));
            }
            var grandQuantityItemTot = quantityTotal.reduce((a, b) => a + b, 0);
            var fixDigit = itemTotal.reduce((a, b) => a + b, 0)
            var grandItemTot = financial(fixDigit);
            const recordData = {
              id: data.data.order_details[i].id_school_grade_divisions,
              qunatityTotal: grandQuantityItemTot,
              itemTotal: grandItemTot,
            };
            grandTotal.push(recordData);
          }
        } else {
          toast.error(data.message);
        }
      } catch ({ data }) {
        toast.error(data.message);
      } finally {
        setLoader(false);
      }
    }
  };
  useEffect(() => {
    getEventOrderDetails();
  }, []);

  const getEventorderLabels = async (value) => {
      if(vendorId == null){
        try {
          setEventOrderLabels([]);
          const payload = {
            eventId,
            gradeId: value ? value : "",
          };
          const data = await GET_EVENT_ORDER_LABELS(payload);
          if (data.code === 200 || data.code === "200") {
            if(data.data !== null){
              setEventOrderLabels(data.data);
              handlePrint();
            }
          } else {
            toast.error(data.message);
          }
        } catch ({ data }) {
          toast.error(data.message);
        }
      } else {
        try {
          setEventOrderLabels([]);
          const payload = {
            eventId,
            gradeId: value ? value : "",
            id_vendor: vendorId
          };
          const data = await GET_ADMIN_EVENT_ORDER_LABELS(payload);
          if (data.code === 200 || data.code === "200") {
            if(data.data !== null){
            setEventOrderLabels(data.data);
            handlePrint();
            }
          } else {
            toast.error(data.message);
          }
        } catch ({ data }) {
          toast.error(data.message);
        }
      }
  };

  const eventDetailsPassData = (eventId, gradeId, gradeName, vendorId) => {
    const recordData = {
      eventId: eventId,
      gradeId: gradeId,
      gradeName: gradeName,
      eventName: eventName == "pastEvent" ? "pastEvent" : eventName == "upcomingEvent" ? "upcomingEvent" : "admin",
      vendorId: vendorId
    };
    localStorage.setItem(
      "eb-mums-lunch:eventDetailsPassData",
      JSON.stringify(eventDetail)
    );
    localStorage.setItem(
      "eb-mums-lunch:eventIdgradeIdPassData",
      JSON.stringify(recordData)
    );

    props.addEventOrderDetailsHandler(eventDetail);
    props.addEventIdgradeIdHandler(recordData);
    if (eventName == "pastEvent") {
      history.push("/restaurant/past-view-grade-orders");
    } else if (eventName == "upcomingEvent") {
      history.push("/restaurant/upcoming-view-grade-orders");
    }else if(eventName == "admin"){
      history.push("/admin/view-grade-orders");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 px-0 d-print-none">
        {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          <div className="col-lg-12 col-md-12 col-sm-12 my-5">
            <div className="card-table">
              <div className="table-header-sec bg-dark-blue d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                    Event Order Details
                  </h3>
                </div>
                <div>
                  {eventName == "pastEvent" ? (
                    <Link to="/restaurant/past-event">
                      <Button size="sm" variant="primary" className="px-4">
                        Back
                      </Button>
                    </Link>
                  ) : eventName == "upcomingEvent" ? (
                    <Link to="/restaurant/upcoming-event">
                      <Button size="sm" variant="primary" className="px-4">
                        Back
                      </Button>
                    </Link>
                  ):
                    <Link to="/admin/restaurnt-payment">
                      <Button size="sm" variant="primary" className="px-4">
                        Back
                      </Button>
                    </Link>
                  }
                </div>
              </div>
              <div className="row mx-auto mt-3">
                <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                  <div className="bg-white border-black event-order-details">
                    <div className="p-3">
                      <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12">
                          <h2 className="font-weight-semibold mb-2 text-3">
                            School Name:
                          </h2>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                          <h2 className="mb-2 text-3">
                            {eventDetail.school_name}
                          </h2>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12">
                          <h2 className="font-weight-semibold mb-2 text-3">
                            Address:
                          </h2>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                          <h2 className="mb-2 text-3">{eventDetail.address}</h2>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12">
                          <h2 className="font-weight-semibold mb-2 text-3">
                            School Coordinator:
                          </h2>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                          <h2 className="mb-2 text-3">
                            {eventDetail.contact_person_name}
                          </h2>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12">
                          <h2 className="font-weight-semibold mb-2 text-3">
                            Contact Number:
                          </h2>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                          <h2 className="mb-2 text-3">
                            {eventDetail.contact_number}
                          </h2>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12">
                          <h2 className="font-weight-semibold mb-2 text-3">
                            Email Address:
                          </h2>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                          <h2 className="mb-2 text-3">
                            {eventDetail.email_address}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                  <div className="bg-white border-black event-order-details">
                    <div className="p-3">
                      <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12">
                          <h2 className="font-weight-semibold mb-1 text-4">
                            Event Name:
                          </h2>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                          <h2 className="mb-1 text-4">
                            {eventDetail.event_name}
                          </h2>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12">
                          <h2 className="font-weight-semibold mb-1 text-4">
                            Event Date:
                          </h2>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                          <h2 className="mb-1 text-4">
                            <Moment>{eventDetail.scheduled_date}</Moment>
                          </h2>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12">
                          <h2 className="font-weight-semibold mb-1 text-4">
                            Delivery Time:
                          </h2>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                          <h2 className="mb-1 text-4">{selectTime}</h2>
                        </div>
                      </div>
                      {eventName !== "pastEvent" && eventName !== "admin" && (
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="d-flex justify-content-end">
                              <Button
                                className="bg-dark-blue px-4 mt-2"
                                onClick={() => getEventorderLabels(0)}
                              >
                                Print All Order Labels
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mx-auto">
                <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                  <Tabs
                    defaultActiveKey="orderSummary"
                    id="uncontrolled-tab-example"
                  >
                    <Tab eventKey="orderSummary" title="Order Summary">
                      <div className="event-details-table-sec">
                        <div className="my-2">
                          <Table bordered hover responsive>
                            <thead>
                              <tr>
                                <th>Item</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-right">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orderSummary.map(
                                (item, index) =>
                                  item.product_name !== null && (
                                    <tr key={index}>
                                      <td>{item.product_name}</td>
                                      <td className="text-center">
                                        ${item.product_cost}
                                      </td>
                                      <td className="text-center">
                                        {item.quantity}
                                      </td>
                                      <td className="text-right">
                                        ${item.item_total}
                                      </td>
                                    </tr>
                                  )
                              )}
                              {orderSummary.map(
                                (item1, index1) =>
                                  item1.product_name == null && (
                                    <tr key={index1}>
                                      <td className="font-weight-semibold">
                                        Total
                                      </td>
                                      <td className="text-center font-weight-semibold">
                                        -
                                      </td>
                                      <td className="text-center font-weight-semibold">
                                        {item1.quantity}
                                      </td>
                                      <td className="text-right font-weight-semibold">
                                        ${item1.item_total}
                                      </td>
                                    </tr>
                                  )
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </Tab>
                    <Tab
                      eventKey="gradeWiseOrderDetails"
                      title="Grade Wise Order Details"
                    >
                      <div className="event-details-table-sec">
                        <div className="my-2">
                          {orderDetails.map((item, index) => (
                            <Table bordered hover responsive key={index}>
                              <thead>
                                <tr>
                                  <th
                                    colSpan="2"
                                    className="text-color-tertiary"
                                  >
                                    {item.grade_division_name}
                                  </th>
                                  <th className="text-center">
                                    {eventName !== "pastEvent" && eventName !== "admin" && (
                                      <Button className="bg-dark-blue px-4" onClick={() => getEventorderLabels(item.id_school_grade_divisions)}>
                                        Print Labels
                                      </Button>
                                    )}
                                  </th>
                                  <th className="text-center text-color-primary">
                                      <Button className="bg-dark-blue px-4" title="View Order Details" onClick={() =>
                                        eventDetailsPassData(
                                          eventId,
                                          item.id_school_grade_divisions,
                                          item.grade_division_name,
                                          vendorId
                                        )
                                      }>
                                        View
                                      </Button>
                                  </th>
                                </tr>
                                <tr>
                                  <th>Item</th>
                                  <th className="text-center">Price</th>
                                  <th className="text-center">Quantity</th>
                                  <th className="text-center">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {item.orders.map((item1, index1) => (
                                  <tr key={index1}>
                                    <td>{item1.product_name}</td>
                                    <td className="text-center">
                                      ${item1.product_cost}
                                    </td>
                                    <td className="text-center">
                                      {item1.quantity}
                                    </td>
                                    <td className="text-center">
                                      ${item1.item_total}
                                    </td>
                                  </tr>
                                ))}
                                <tr>
                                  <td className="font-weight-semibold">
                                    Total
                                  </td>
                                  <td className="text-center font-weight-semibold">
                                    -
                                  </td>
                                  <td className="text-center font-weight-semibold">
                                    {grandTotal.map(
                                      (item2, index2) =>
                                        item.id_school_grade_divisions ==
                                          item2.id && item2.qunatityTotal
                                    )}
                                  </td>
                                  <td className="text-center font-weight-semibold">
                                    ${grandTotal.map(
                                      (item2, index2) =>
                                        item.id_school_grade_divisions ==
                                          item2.id && item2.itemTotal
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          ))}
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* start print area */}
      <section className="bg-white d-print-block d-none ml-5">
          <div className="container">
            <div className="row mx-auto py-3">
              {eventOrderLabels.map((item, index) => (
                <div className="col-lg-6 col-md-6 col-sm-6 mb-3" key={index}>
                  <div>
                    <div className="d-flex mb-3">
                      <div>
                        <h3 className="mb-0 text-capitalize font-weight-semibold text-4">
                          {item.student_name === null ? item.teacher_name : item.student_name}
                        </h3>
                      </div>
                      <div className="ml-5">
                        <h3 className="mb-0 text-capitalize font-weight-semibold text-4">
                          {item.grade_division_name}
                        </h3>
                      </div>
                    </div>
                    <div>
                      {item.order_line_items.map((item1, index1) => (
                        <div key={index1} className="mb-2">
                          <h3 className="mb-1 text-capitalize font-weight-semibold text-3">
                            {item1.product_name}
                          </h3>
                          {item1.topping_items && (
                            <span className="mb-0 text-capitalize text-2">
                              {item1.topping_items}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* end print area */}
    </React.Fragment>
  );
};

export default EventOrderDetails;
