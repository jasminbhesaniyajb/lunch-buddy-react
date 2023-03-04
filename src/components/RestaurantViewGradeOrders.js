import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Moment from "react-moment";
import { history } from "../history";

import Loader from "./Loader";

import {
  GET_EVENT_ORDERS_BY_GRADE,
  GET_EVENT_ORDER_LABELS,
  GET_ADMIN_EVENT_ORDERS_BY_GRADE,
  GET_ADMIN_EVENT_ORDER_LABELS
} from "../services/ENDPOINT";

const ViewGradeOrders = (props) => {
  const [isloader, setLoader] = useState(false);
  const [eventOrderGradeList, setEventOrderGradeList] = useState([]);
  const [selectTime, setSelectTime] = useState("00:00");
  const [eventOrderLabels, setEventOrderLabels] = useState([]);
  const [isPrintLabels, setIsPrintLabels] = useState(false);
  const eventDetails = props.data.eventOrderDetailsInfo;
  const eventOrderGrade = props.data.eventIdgradeIdInfo;

  const getEventordersGrade = async (e) => {
    if(props.data.eventIdgradeIdInfo.vendorId == null){
      try {
        setLoader(true);
        setEventOrderGradeList([]);
        const payload = {
          eventId: props.data.eventIdgradeIdInfo.eventId,
          gradeId: props.data.eventIdgradeIdInfo.gradeId,
        };
        const data = await GET_EVENT_ORDERS_BY_GRADE(payload);
        if (data.code === 200 || data.code === "200") {
          setEventOrderGradeList(data.data);
          var str = props.data.eventOrderDetailsInfo.delivery_time;
          var res = str.split(":");
          var hours = res[0];
          var minutes = res[1];
          setSelectTime(hours + ":" + minutes);
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
        setEventOrderGradeList([]);
        const payload = {
          eventId: props.data.eventIdgradeIdInfo.eventId,
          gradeId: props.data.eventIdgradeIdInfo.gradeId,
          id_vendor: props.data.eventIdgradeIdInfo.vendorId
        };
        const data = await GET_ADMIN_EVENT_ORDERS_BY_GRADE(payload);
        if (data.code === 200 || data.code === "200") {
          setEventOrderGradeList(data.data);
          var str = props.data.eventOrderDetailsInfo.delivery_time;
          var res = str.split(":");
          var hours = res[0];
          var minutes = res[1];
          setSelectTime(hours + ":" + minutes);
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
    getEventordersGrade();
  }, []);

  const getEventorderLabels = async () => {
    if(props.data.eventIdgradeIdInfo.vendorId == null){
      try {
        setEventOrderLabels([]);
        const payload = {
          eventId: props.data.eventIdgradeIdInfo.eventId,
          gradeId: eventOrderGrade.gradeId,
        };
        const data = await GET_EVENT_ORDER_LABELS(payload);
        if (data.code === 200 || data.code === "200") {
          setEventOrderLabels(data.data);
          setIsPrintLabels(true);
          handlePrintLabels();
          setIsPrintLabels(false);
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
          eventId: props.data.eventIdgradeIdInfo.eventId,
          gradeId: eventOrderGrade.gradeId,
          id_vendor: props.data.eventIdgradeIdInfo.vendorId
        };
        const data = await GET_ADMIN_EVENT_ORDER_LABELS(payload);
        if (data.code === 200 || data.code === "200") {
          setEventOrderLabels(data.data);
          setIsPrintLabels(true);
          handlePrintLabels();
          setIsPrintLabels(false);
        } else {
          toast.error(data.message);
        }
      } catch ({ data }) {
        toast.error(data.message);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };
  const handlePrintLabels = () => {
    window.print();
  };

  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 pl-inherit">
        {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          <div className="col-lg-12 col-md-12 col-sm-12 my-5 d-print-ml-100">
            <div className="card-table">
              <div className="table-header-sec d-print-none bg-dark-blue d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                    {eventOrderGrade.gradeName} - Orders
                  </h3>
                </div>
                <div>
                  {props.data.eventIdgradeIdInfo.eventName == "pastEvent" ? (
                    <Link
                      to={`/restaurant/past-event-order-details?id=${props.data.eventIdgradeIdInfo.eventId}&eventName=${props.data.eventIdgradeIdInfo.eventName}`}
                    >
                      <Button size="sm" variant="primary" className="px-4">
                        Back
                      </Button>
                    </Link>
                  ) : props.data.eventIdgradeIdInfo.eventName == "upcomingEvent" ?(
                    <Link
                      to={`/restaurant/upcoming-event-order-details?id=${props.data.eventIdgradeIdInfo.eventId}&eventName=${props.data.eventIdgradeIdInfo.eventName}`}
                    >
                      <Button size="sm" variant="primary" className="px-4">
                        Back
                      </Button>
                    </Link>
                  ): 
                  <Link
                      to={`/admin/event-order-details?id=${props.data.eventIdgradeIdInfo.eventId}&vendorId=${props.data.eventIdgradeIdInfo.vendorId}&eventName=${props.data.eventIdgradeIdInfo.eventName}`}
                    >
                      <Button size="sm" variant="primary" className="px-4">
                        Back
                      </Button>
                    </Link>
                  }
                </div>
              </div>
              <div
                className={
                  "row mt-3" +
                  " " +
                  (isPrintLabels == true ? "d-print-none" : " ")
                }
              >
                <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                  <div className="bg-white border-black min-h-160">
                    <div className="p-3">
                      <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12">
                          <h2 className="font-weight-semibold mb-2 text-3">
                            School Name:
                          </h2>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                          <h2 className="mb-2 text-3">
                            {eventDetails.school_name}
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
                          <h2 className="mb-2 text-3">
                            {eventDetails.address}
                          </h2>
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
                            {eventDetails.contact_person_name}
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
                            {eventDetails.contact_number}
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
                            {eventDetails.email_address}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                  <div className="bg-white border-black min-h-160">
                    <div className="p-3">
                      <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12">
                          <h2 className="font-weight-semibold mb-1 text-4">
                            Event Name:
                          </h2>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                          <h2 className="mb-1 text-4">
                            {eventDetails.event_name}
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
                            <Moment>{eventDetails.scheduled_date}</Moment>
                          </h2>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-lg-5 col-md-5 col-sm-12">
                          <h2 className="font-weight-semibold mb-1 text-4">
                            Delivery Time:
                          </h2>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-12">
                          <h2 className="mb-1 text-4">{selectTime}</h2>
                        </div>
                      </div>
                      <div className="row d-print-none">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="d-flex justify-content-end flex-lg-row flex-md-column flex-sm-column">
                            <Button
                              className="bg-dark-blue px-4 mr-lg-2 mr-md-0 mb-lg-0 mb-md-2 mb-sm-2"
                              onClick={() => handlePrint()}
                            >
                              Print Order Details
                            </Button>
                            {props.data.eventIdgradeIdInfo.eventName !==
                              "pastEvent" && props.data.eventIdgradeIdInfo.eventName !==
                              "admin" && (
                              <Button
                                className="bg-dark-blue px-4"
                                onClick={() => getEventorderLabels()}
                              >
                                Print Labels
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={
                  "row" + " " + (isPrintLabels == true ? "d-print-none" : " ")
                }
              >
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="border-black border-bottom-0">
                    <div className="text-center">
                      <h2 className="mb-0 text-4 bg-light-gray vendorListHeading font-weight-semibold border-bottom-black px-2 py-1">
                        {eventOrderGrade.gradeName}
                      </h2>
                    </div>
                    <div className="row mx-auto border-bottom-black px-2 py-1">
                      <div className="col-lg-3 col-md-3 col-sm-12">
                        <div>
                          <h2 className="text-4 mb-0 font-weight-semibold">
                          Student/Teacher
                          </h2>
                        </div>
                      </div>
                      <div className="col-lg-9 col-md-9 col-sm-12">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div>
                              <h2 className="text-4 mb-0 font-weight-semibold">
                                Item
                              </h2>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-2 col-sm-4 col-4">
                            <div className="text-right pr-5">
                              <h2 className="text-4 mb-0 font-weight-semibold">
                                Price
                              </h2>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-2 col-sm-4 col-4">
                            <div className="text-center">
                              <h2 className="text-4 mb-0 font-weight-semibold">
                                Quantity
                              </h2>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-2 col-sm-4 col-4">
                            <div className="text-right">
                              <h2 className="text-4 mb-0 font-weight-semibold">
                                Total
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {eventOrderGradeList.map((item, index) => (
                      <div
                        className="row mx-auto border-bottom-black px-2 py-1"
                        key={index}
                      >
                        <div className="col-lg-3 col-md-3 col-sm-12">
                          <div>
                            <h2 className="text-4 mb-0">{item.student_name === null ? item.teacher_name : item.student_name}</h2>
                          </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-12">
                          {item.order_line_items.map((item1, index1) => (
                            <div className="row" key={index1}>
                              <div className="col-lg-6 col-md-6 col-sm-12">
                                <div>
                                  <h2 className="text-4 mb-2">
                                    {item1.product_name}
                                  </h2>
                                  {item1.topping_items &&
                                    item1.topping_items.map((item2, index2) => (
                                      <h2
                                        className="text-4 mb-2 pl-5"
                                        key={index2}
                                      >
                                        {item2.product_name}
                                      </h2>
                                    ))}
                                </div>
                              </div>
                              <div className="col-lg-2 col-md-2 col-sm-4 col-4">
                                <div className="text-right pr-5">
                                  <h2 className="text-4 mb-2">
                                    ${item1.product_cost}
                                  </h2>
                                  {item1.topping_items &&
                                    item1.topping_items.map((item2, index2) => (
                                      <h2 className="text-4 mb-2" key={index2}>
                                        ${item2.product_cost}
                                      </h2>
                                    ))}
                                </div>
                              </div>
                              <div className="col-lg-2 col-md-2 col-sm-4 col-4">
                                <div className="text-center">
                                  <h2 className="text-4 mb-2">
                                    {item1.quantity}
                                  </h2>
                                  {item1.topping_items &&
                                    item1.topping_items.map((item2, index2) => (
                                      <h2 className="text-4 mb-2" key={index2}>
                                        {item2.quantity}
                                      </h2>
                                    ))}
                                </div>
                              </div>
                              <div className="col-lg-2 col-md-2 col-sm-4 col-4">
                                <div className="text-right">
                                  <h2 className="text-4 mb-2">
                                    ${item1.item_total}
                                  </h2>
                                  {item1.topping_items &&
                                    item1.topping_items.map((item2, index2) => (
                                      <h2 className="text-4 mb-2" key={index2}>
                                        ${item2.item_total}
                                      </h2>
                                    ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* start print area labels sec */}
      <section
        className={
          "bg-white d-none ml-5" +
          " " +
          (isPrintLabels == true ? "d-print-block" : " ")
        }
      >
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
      {/* end print area labels sec */}
    </React.Fragment>
  );
};

export default ViewGradeOrders;
