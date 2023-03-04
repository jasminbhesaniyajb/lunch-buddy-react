import React, { useState, useEffect } from "react";

import { Table, Button, OverlayTrigger, Popover } from "react-bootstrap";
import Moment from "react-moment";
import moment from "moment";
import { toast } from "react-toastify";

import SearchIcon from "../assets/img/icons/search-icon.svg";

import RestaurantPaymentModal from "../components/RestaurantPaymentModal";
import Loader from "./Loader";

import { GET_ALL_RESTAURANT_PAYMENT_DUES } from "../services/ENDPOINT";

const RestaurantPaymentDue = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isloader, setLoader] = useState(false);
  const [showRestaurantPaymentModal, setShowRestaurantPaymentModal] =
    useState(false);
  const [restaurantPaymentDuesList, setRestaurantPaymentDuesList] = useState(
    []
  );
  const [popupRestaurantPaymentId, setPopupRestaurantPaymentId] = useState();
  const [eventWisePaymentDetailsList, setEventWisePaymentDetailsList] =
    useState([]);
  var searchRestaurantName = "";

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
        searchRestaurantName = e.target.value || "";
        getAllRestaurantPaymentDues();
      }
    }, 500);
  };

  const getAllRestaurantPaymentDues = async () => {
    try {
      setLoader(true);
      setRestaurantPaymentDuesList([]);
      const payload = { restaurant_name: searchRestaurantName };
      const data = await GET_ALL_RESTAURANT_PAYMENT_DUES(payload);
      if (data.code === 200 || data.code === "200") {
        if (data.data.vendor_payment_dues !== null) {
          var tempEventWisePaymentDetailsArr = [];
          for (var i = 0; i < data.data.vendor_payment_dues.length; i++) {
            var tempEventWisePaymentDetails = [];
            for (
              var j = 0;
              j <
              data.data.vendor_payment_dues[i].event_wise_payment_details
                .length;
              j++
            ) {
              const eventRecord = {
                event_date:
                  data.data.vendor_payment_dues[i].event_wise_payment_details[j]
                    .event_date,
                event_name:
                  data.data.vendor_payment_dues[i].event_wise_payment_details[j]
                    .event_name,
                gst: data.data.vendor_payment_dues[i]
                  .event_wise_payment_details[j].gst,
                id_event:
                  data.data.vendor_payment_dues[i].event_wise_payment_details[j]
                    .id_event,
                payment_due:
                  data.data.vendor_payment_dues[i].event_wise_payment_details[j]
                    .payment_due,
                payment_due_exc_gst:
                  data.data.vendor_payment_dues[i].event_wise_payment_details[j]
                    .payment_due_exc_gst,
                checked: false,
              };
              tempEventWisePaymentDetails.push(eventRecord);
            }
            const record = {
              emergency_contact_number:
                data.data.vendor_payment_dues[i].emergency_contact_number,
              event_wise_payment_details: tempEventWisePaymentDetails,
              frequency: data.data.vendor_payment_dues[i].frequency,
              gst: data.data.vendor_payment_dues[i].gst,
              id_vendor: data.data.vendor_payment_dues[i].id_vendor,
              last_payment_date:
                data.data.vendor_payment_dues[i].last_payment_date,
              payment_due: data.data.vendor_payment_dues[i].payment_due,
              payment_due_date:
                data.data.vendor_payment_dues[i].payment_due_date,
              payment_due_exc_gst:
                data.data.vendor_payment_dues[i].payment_due_exc_gst,
              primary_contact_number:
                data.data.vendor_payment_dues[i].primary_contact_number,
              vendor_address: data.data.vendor_payment_dues[i].vendor_address,
              vendor_name: data.data.vendor_payment_dues[i].vendor_name,
            };
            tempEventWisePaymentDetailsArr.push(record);
          }
          setRestaurantPaymentDuesList(tempEventWisePaymentDetailsArr);
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
    getAllRestaurantPaymentDues();
  }, []);

  const handlePaymentDetails = (recordId, eventWisePaymentDetails) => {
    setShowRestaurantPaymentModal(true);
    setPopupRestaurantPaymentId(recordId);
    setEventWisePaymentDetailsList(eventWisePaymentDetails);
  };

  const handleChecked = (record) => {
    var tempEventWisePaymentDetailsArray = [...eventWisePaymentDetailsList];
    const tempEventWisePaymentDetailsObject =
      eventWisePaymentDetailsList.findIndex((item) => {
        return item.id_event == record.id;
      });
    tempEventWisePaymentDetailsArray[
      tempEventWisePaymentDetailsObject
    ].checked = record.check;
    setEventWisePaymentDetailsList(tempEventWisePaymentDetailsArray);
  };

  const handleAllChecked = (e) => {
    var tempEventWisePaymentDetailsArray = [...eventWisePaymentDetailsList];
    if (e.target.checked == true) {
      for (var i = 0; i < eventWisePaymentDetailsList.length; i++) {
        tempEventWisePaymentDetailsArray[i].checked = true;
      }
    } else {
      for (var i = 0; i < eventWisePaymentDetailsList.length; i++) {
        tempEventWisePaymentDetailsArray[i].checked = false;
      }
    }
    setEventWisePaymentDetailsList(tempEventWisePaymentDetailsArray);
  };

  const handleAllUnChecked = () => {
    var tempEventWisePaymentDetailsArray = [...eventWisePaymentDetailsList];
    for (var i = 0; i < eventWisePaymentDetailsList.length; i++) {
        tempEventWisePaymentDetailsArray[i].checked = false;
    }
    setEventWisePaymentDetailsList(tempEventWisePaymentDetailsArray);
    setShowRestaurantPaymentModal(false)
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
                    Vendor Payment Dues
                  </h3>
                  <p className="text-white mb-0">List of Vendor Payment Dues</p>
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
                          </div>
                        </form>
                      </th>
                    </tr>
                  )}
                  <tr>
                    <th>Vendor</th>
                    <th>Last Payment Date</th>
                    <th>Payment Due Date</th>
                    <th className="text-right">
                      Payment Due
                      <span className="text-color-tertiary"> (inc GST)</span>
                    </th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurantPaymentDuesList.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div>
                          <div className="font-weight-semibold">
                            {item.vendor_name}
                          </div>
                          <div className="text-1">{item.vendor_address}</div>
                          <div className="text-1">
                            <a href={`tel:${item.primary_contact_number}`}>
                              {item.primary_contact_number}
                            </a>
                          </div>
                          <div
                            className="text-1 text-color-tertiary"
                            title="Payment Frequency"
                          >
                            {item.frequency}
                          </div>
                        </div>
                      </td>
                      <td>
                        {item.last_payment_date && (
                          <Moment>{item.last_payment_date}</Moment>
                        )}
                      </td>
                      <td>
                        {moment(new Date()).add(2, "d").format("YYYY-MM-DD") >=
                        moment(item.payment_due_date).format("YYYY-MM-DD") ? (
                          <Moment className="text-danger">
                            {item.payment_due_date}
                          </Moment>
                        ) : (
                          <Moment>{item.payment_due_date}</Moment>
                        )}
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
                                    Amount Due (exc GST): <strong className="font-weight-semibold">$
                                    {item.payment_due_exc_gst}</strong>
                                  </p>
                                </div>
                                <div>
                                  <p className="mb-0">GST: <strong className="font-weight-semibold">${item.gst}</strong></p>
                                </div>
                              </Popover.Content>
                            </Popover>
                          }
                        >
                          <span className="cursor-pointer">
                            ${item.payment_due}
                          </span>
                        </OverlayTrigger>
                      </td>
                      <td className="text-center">
                        <Button
                          className="px-2"
                          size="sm"
                          variant="primary"
                          onClick={(e) =>
                            handlePaymentDetails(
                              item.id_vendor,
                              item.event_wise_payment_details
                            )
                          }
                        >
                          View Payment Details
                        </Button>
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
                  {isloader === false &&
                    restaurantPaymentDuesList.length === 0 && (
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
      {showRestaurantPaymentModal && (
        <RestaurantPaymentModal
          closeModal={() => handleAllUnChecked()}
          handleChecked={(e) => handleChecked(e)}
          handleAllChecked={(e) => handleAllChecked(e)}
          getAllRestaurantPaymentDues={() => getAllRestaurantPaymentDues()}
          popupRestaurantPaymentId={popupRestaurantPaymentId}
          eventWisePaymentDetails={eventWisePaymentDetailsList}
        />
      )}
    </React.Fragment>
  );
};

export default RestaurantPaymentDue;
