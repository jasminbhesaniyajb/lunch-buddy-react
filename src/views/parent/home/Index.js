import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Card, Table } from "react-bootstrap";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { toast } from "react-toastify";
import Moment from "react-moment";
import moment from "moment";

import queryString from "query-string";

import { history } from "../../../history";
import ConformationMenuDeleteModal from "../../../components/ConformationMenuDeleteModal";
import Loader from "../../../components/Loader";
import OrderDetailsReseiptModal from "../../../components/OrderDetailsReceiptModal";
import {
  GET_PARENT_STUDENT_EVENT_LIST,
  CANCEL_ORDER_NOW,
} from "../../../services/ENDPOINT";
import RemoveCartIcon from "../../../assets/img/icons/remove-cart.svg";
import ChevronRight from "../../../assets/img/icons/chevron-right-white.svg";
import EyeIcon from "../../../assets/img/icons/eye.svg";
import OrderNowIcon from "../../../assets/img/icons/view-order.svg";

const ParentHome = (props) => {
  const [isloader, setLoader] = useState(false);
  const [parentStudentEventsList, setParentStudentEventsList] = useState([]);
  const [parentStudentEventDatesList, setParentStudentEventDatesList] =
    useState([]);
  const [showReceiptPopup, setShowReceiptPopup] = useState(false);
  const [popupIdReceiptPopup, setPopupIdReceiptPopup] = useState();
  const [
    popupIdConformationMenuDeleteModal,
    setPopupIdConformationMenuDeleteModal,
  ] = useState();
  const [showConformationMenuDeleteModal, setShowConformationMenuDeleteModal] =
    useState(false);
  const [selectCollapse, setSelectCollapse] = useState(`parent${0}`);
  const paramsId = queryString.parse(location.search).id;
  const [activeCollapse, setActiveCollapse] = useState([]);
  const getParentStudentEventList = async (e) => {
    try {
      setLoader(true);
      const payload = props.data.loginInfo.id;
      const data = await GET_PARENT_STUDENT_EVENT_LIST(payload);
      if (data.code === 200 || data.code === "200") {
        setParentStudentEventsList(data.data);

        for (let i = 0; i < data.data.length; i++) {
          activeCollapse.push(i + 1);
        }
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
            const tempParentStudentEventDatesListObject =
              parentStudentEventDatesList.find(
                (x) => x.cutoffDate == cutoffDate
              );
            if (tempParentStudentEventDatesListObject) {
              console.log("inner if");
            } else {
              parentStudentEventDatesList.push({
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
    getParentStudentEventList();
    return () => {
      setParentStudentEventsList();
    };
  }, []);

  const deleteMenuItem = async () => {
    const payload = { id: popupIdConformationMenuDeleteModal };
    try {
      const data = await CANCEL_ORDER_NOW(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempParentStudentEventsArray = [...parentStudentEventsList];

        for (var i = 0; i < tempParentStudentEventsArray.length; i++) {
          for (
            var j = 0;
            j < tempParentStudentEventsArray[i].school.events.length;
            j++
          ) {
            if (
              tempParentStudentEventsArray[i].school.events[j].id_order ==
              popupIdConformationMenuDeleteModal
            ) {
              tempParentStudentEventsArray[i].school.events[j].id_order = null;
            }
          }
        }
        setParentStudentEventsList(tempParentStudentEventsArray);
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
    history.push(`/parent/order-now`);
  };

  const handleScrollToTop = () => {
    const myId = "event" + paramsId;
    const elem = document.getElementById(myId);
    console.log(window)
    if (elem) {
      // elem.scrollIntoView({
      //   top: document.getElementById(myId).offsetTop + 8,
      //   behavior: "smooth",
      // });
      window.scrollTo({
        behavior: "smooth",
        top: document.getElementById(myId).offsetTop +8,
      });
    }
  };

  useEffect(() => {
    handleScrollToTop();
  });

  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 px-0 mt-2">
        {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <Accordion
              allowMultipleExpanded
              allowZeroExpanded={true}
              preExpanded={activeCollapse}
            >
              {parentStudentEventsList.map((item, index) => (
                <Card
                  className="border-radius-7"
                  key={index}
                  id={"event" + item.id}
                >
                  <AccordionItem uuid={index + 1}>
                    <AccordionItemHeading className="bg-dark-blue">
                      <AccordionItemButton>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex ml-4">
                            <div>
                              <h2 className="text-maven text-5 text-white mb-0">
                                {item.first_name} {item.last_name}
                              </h2>
                              <div>
                                <p className="text-white mb-0">
                                  {item.school.school_name}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h2 className="text-maven text-5 text-color-tertiary text-white mb-0">
                              {item.grade_division_name}
                            </h2>
                          </div>
                        </div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <Card.Body>
                        <div className="event-details-table-sec">
                          <div className="card-table pt-0">
                            <Table
                              className="custom-table-sec"
                              hover
                              responsive
                            >
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
                                {item.school.events.map((item1, index1) => (
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
                                        moment(new Date()).format(
                                          "YYYY-MM-DD"
                                        ) <=
                                          moment(item1.cutoff_date).format(
                                            "YYYY-MM-DD"
                                          ) && (
                                          <img
                                            className="cursor-pointer mr-2"
                                            src={OrderNowIcon}
                                            width="24"
                                            alt="orderNow"
                                            title="Order Now"
                                            onClick={() =>
                                              orderNowPassData(item, item1)
                                            }
                                          />
                                        )}
                                      {item1.id_order > 0 && (
                                        <img
                                          className="cursor-pointer mr-2"
                                          src={EyeIcon}
                                          width="26"
                                          alt="viewOrder"
                                          title="View Order Details"
                                          onClick={(e) =>
                                            openPopupAndPassId1(item1.id_order)
                                          }
                                        />
                                      )}
                                      {item1.id_order > 0 &&
                                        moment(new Date()).format(
                                          "YYYY-MM-DD"
                                        ) <=
                                          moment(item1.cutoff_date).format(
                                            "YYYY-MM-DD"
                                          ) && (
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
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </Card.Body>
                    </AccordionItemPanel>
                  </AccordionItem>
                </Card>
              ))}
            </Accordion>
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
          orderBy="parent"
        />
      )}
    </React.Fragment>
  );
};

export default ParentHome;
