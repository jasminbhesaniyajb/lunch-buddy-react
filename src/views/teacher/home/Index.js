import React, { useState, useEffect } from "react";

import { Table, Button } from "react-bootstrap";
import RemoveCartIcon from "../../../assets/img/icons/remove-cart.svg";
import EyeIcon from "../../../assets/img/icons/eye.svg";
import OrderNowIcon from "../../../assets/img/icons/view-order.svg";
import relaodSVG from "../../../assets/img/reload.svg";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Moment from "react-moment";
import moment from "moment";

import { history } from "../../../history";
import Loader from "../../../components/Loader";
import ConformationMenuDeleteModal from "../../../components/ConformationMenuDeleteModal";
import OrderDetailsReseiptModal from "../../../components/OrderDetailsReceiptModal";

import {
  GET_TEACHER_EVENT_LIST,
  CANCEL_ORDER_NOW
} from "../../../services/ENDPOINT";

const TeachersHome = (props) => {
  
  const [isloader, setLoader] = useState(false);
  const [perPageRowArray, setPerPageRowArray] = useState([10, 15, 25, 50, 100]);
  const [teacherEventsList, setTeacherEventsList] = useState([]);
  const [teacherEventDatesList, setTeacherEventDatesList] =
  useState([]);
  const [popupIdReceiptPopup, setPopupIdReceiptPopup] = useState();
  const [showReceiptPopup, setShowReceiptPopup] = useState(false);
  const [
    popupIdConformationMenuDeleteModal,
    setPopupIdConformationMenuDeleteModal,
  ] = useState();
  const [showConformationMenuDeleteModal, setShowConformationMenuDeleteModal] =
    useState(false);

  const getTeacherEventList = async (e) => {
    try {
      setLoader(true);
      const data = await GET_TEACHER_EVENT_LIST();
      if (data.code === 200 || data.code === "200") {
        setTeacherEventsList(data.data);

        for (const recordData of data.data) {
          for (const recordData1 of recordData.school.events) {
            var today = new Date();
            let todayDate = moment(today).format("YYYY-MM-DD");
            let cutoffDate = moment(recordData1.cutoff_date).format(
              "YYYY-MM-DD"
            );
            const todayDate1 = new Date(todayDate);
            const cutoffDate1 = new Date(cutoffDate);
            const diffTime = Math.abs(cutoffDate1 - todayDate1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const tempTeacherEventDatesListObject =
              teacherEventDatesList.find(
                (x) => x.cutoffDate == cutoffDate
              );
            if (tempTeacherEventDatesListObject) {
              console.log("inner if");
            } else {
              teacherEventDatesList.push({
                cutoffDate: cutoffDate,
                day: diffDays,
              });
            }
          }
        }
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
    getTeacherEventList();
  }, []);

  const deleteMenuItem = async () => {
    const payload = { id: popupIdConformationMenuDeleteModal };
    try {
      const data = await CANCEL_ORDER_NOW(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempTeacherEventsArray = [...teacherEventsList];

        for (var i = 0; i < tempTeacherEventsArray.length; i++) {
          for (
            var j = 0;
            j < tempTeacherEventsArray[i].school.events.length;
            j++
          ) {
            if (
              tempTeacherEventsArray[i].school.events[j].id_order ==
              popupIdConformationMenuDeleteModal
            ) {
              tempTeacherEventsArray[i].school.events[j].id_order = null;
            }
          }
        }
        setTeacherEventsList(tempTeacherEventsArray);
        setShowConformationMenuDeleteModal(false);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const openPopupAndPassId = (recordId) => {
    setPopupIdConformationMenuDeleteModal(recordId);
    setShowConformationMenuDeleteModal(true);
  };

  const openPopupAndPassId1 = (recordId) => {
    setPopupIdReceiptPopup(recordId);
    setShowReceiptPopup(true);
  };

  const orderNowPassData = (recordData, recordData1) => {
    localStorage.setItem(
      "eb-mums-lunch:orderNowPassData",
      JSON.stringify(recordData)
    );
    localStorage.setItem(
      "eb-mums-lunch:orderNowEventPassData",
      JSON.stringify(recordData1)
    );
    props.addHomeOrderNowInfoHandler(recordData);
    props.addHomeOrderNowEventInfoHandler(recordData1);
    history.push(`/teacher/order-now`);
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
                    Teachers
                  </h3>
                  <p className="text-white mb-0">List of Registered Teachers</p>
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      className="ml-2 cursor-pointer"
                      title="Relaod Data"
                      src={relaodSVG}
                      alt="Relaod Data"
                      width="27px"
                      onClick={(e) => getTeacherEventList()}
                    />
                  </div>
                </div>
              </div>
              <Table className="custom-table-sec" hover responsive>
                <thead>
                  <tr>
                    <th>Event Date</th>
                    <th>Event Name</th>
                    <th>Restaurant Name</th>
                    <th>Cutoff Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherEventsList.map((item,index)=>(
                    item.school.events.map((item1, index1) => ( 
                      <tr key={index1}>
                        <td>
                          <Moment>{item1.scheduled_date}</Moment>
                        </td>
                        <td>{item1.event_name}</td>
                        <td>{item1.vendor.restaurant_name}</td>
                        <td>
                          <Moment>{item1.cutoff_date}</Moment>
                        </td>                        
                        <td>
                          {item1.id_order === null &&
                            moment(new Date()).format("YYYY-MM-DD") <=
                              moment(item1.cutoff_date).format("YYYY-MM-DD") && (
                              <img
                                className="cursor-pointer mr-2"
                                src={OrderNowIcon}
                                width="24"
                                alt="orderNow"
                                title="Order Now"
                                onClick={() => orderNowPassData(item, item1)}
                              />
                            )}
                          {item1.id_order > 0 && (
                            <img
                              className="cursor-pointer mr-2"
                              src={EyeIcon}
                              width="26"
                              alt="viewOrder"
                              title="View Order Details"
                              onClick={(e) => openPopupAndPassId1(item1.id_order)}
                            />
                          )}
                          {item1.id_order > 0 &&
                            moment(new Date()).format("YYYY-MM-DD") <=
                              moment(item1.cutoff_date).format("YYYY-MM-DD") && (
                              <img
                                className="cursor-pointer mr-2"
                                src={RemoveCartIcon}
                                width="24"
                                alt="Cancel"
                                title="Cancel Order"
                                onClick={(e) =>
                                  openPopupAndPassId(item1.id_order)
                                }
                              />
                            )}
                        </td>
                      </tr>
                    ))
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
                  {isloader === false && teacherEventsList.length === 0 && (
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
            </div>
          </div>
        </div>
      </div>
      {showConformationMenuDeleteModal && (
        <ConformationMenuDeleteModal
          closeModal={() => setShowConformationMenuDeleteModal(false)}
          manageMenuId={popupIdConformationMenuDeleteModal}
          deleteMessage={"You are about to cancel the order."}
          cancelOrderTitle={"Cancel Order"}
          deleteMenuItem={() => deleteMenuItem()}
        />
      )}
      {showReceiptPopup && (
        <OrderDetailsReseiptModal
          closeModal={() => setShowReceiptPopup(false)}
          orderId={popupIdReceiptPopup}
          orderBy="teacher"
        />
      )}
    </React.Fragment>
  );
};
export default TeachersHome;
