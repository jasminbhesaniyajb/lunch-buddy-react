import React, { useState, useEffect } from "react";

import viewIcon from "../assets/img/icons/eye.svg";

import { Modal, Button, OverlayTrigger, Popover } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import {
  ADD_RESTAURANT_DUES,
  GET_ALL_PAYMENT_METHODS,
} from "../services/ENDPOINT";

const RestaurantPaymentModal = (props) => {
  const [paymentMethodsList, setPaymentMethodsList] = useState([]);
  let [isChecked, setIsChecked] = useState(false);
  const [clearDue, setClearDue] = useState(false);

  const handleCheckUncheck = (e, recordId) => {
    const record = {
      check: e.target.checked,
      id: recordId,
    };
    props.handleChecked(record);
  };

  const getAllPaymentMethods = async () => {
    try {
      const payload = {
        perPageRows: "",
        currentPage: "",
        orderBy: "",
        sortBy: "",
      };
      const data = await GET_ALL_PAYMENT_METHODS(payload);
      if (data.code === 200 || data.code === "200") {
        setPaymentMethodsList(data.data.data);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getAllPaymentMethods();
  }, []);

  const checkAPICall = async (e) => {
    setClearDue(true);
    var tempEventWisePaymentDetails = [];
    for (var i = 0; i < props.eventWisePaymentDetails.length; i++) {
      if (props.eventWisePaymentDetails[i].checked == true) {
        const record = {
          eventId: props.eventWisePaymentDetails[i].id_event,
          amountPaid: props.eventWisePaymentDetails[i].payment_due,
          gst: props.eventWisePaymentDetails[i].gst,
        };
        tempEventWisePaymentDetails.push(record);
      }
    }
    try {
      const payload = {
        id_vendor: props.popupRestaurantPaymentId,
        payment_method: e.payment_method,
        transaction_number: e.transaction_number,
        event_dues_to_clear: tempEventWisePaymentDetails,
      };
      const data = await ADD_RESTAURANT_DUES(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        setClearDue(false);
        props.closeModal(false);
        props.getAllRestaurantPaymentDues();
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const isCheckedRecord = (e) => {
    var count = 0;
    for (var i = 0; i < props.eventWisePaymentDetails.length; i++) {
      if (props.eventWisePaymentDetails[i].checked == true) {
        count++;
      }
    }
    if (count === 0) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  return (
    <React.Fragment>
      <Modal
        size="lg"
        show={true}
        onHide={() => props.closeModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2">
          <div className="row">
            <div className="col-lg-1 col-md-1 col-sm-1 col-1">
              <input
                type="checkbox"
                className="lg-check-box"
                onChange={(e) => {
                  props.handleAllChecked(e);
                  isCheckedRecord(e);
                }}
              />
            </div>
            <div className="col-lg-11 col-md-11 col-sm-11 col-11">
              <div className="row mx-auto py-1">
                <div className="col-lg-2 col-md-2 col-sm-12 col-12">
                  <h6 className="mb-0 font-weight-bold">Event Date</h6>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                  <h6 className="mb-0 font-weight-bold">Event Name</h6>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                  <h6 className="mb-0 font-weight-bold text-right">
                    Payment Due
                    <span className="text-color-tertiary"> (inc GST)</span>
                  </h6>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                  <h6 className="mb-0 font-weight-bold text-center">Action</h6>
                </div>
              </div>
            </div>
          </div>
          {props.eventWisePaymentDetails.map((item, index) => (
            <div className="row mt-2" key={index}>
              <div className="col-lg-1 col-md-1 col-sm-1 col-1">
                <input
                  type="checkbox"
                  className="lg-check-box"
                  checked={item.checked}
                  onChange={(e) => {
                    handleCheckUncheck(e, item.id_event);
                    isCheckedRecord(e);
                  }}
                />
              </div>
              <div className="col-lg-11 col-md-11 col-sm-11 col-11">
                <div className="row mx-auto py-1">
                  <div className="col-lg-2 col-md-2 col-sm-12 col-12">
                    <h6 className="mb-0">
                      <Moment>{item.event_date}</Moment>
                    </h6>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                    <h6 className="mb-0">{item.event_name}</h6>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12 text-right">
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
                                  ${item.payment_due_exc_gst}
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
                      <h6 className="mb-0  cursor-pointer d-inline-block">
                        ${item.payment_due}
                      </h6>
                    </OverlayTrigger>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 col-12 text-center">
                    <Link
                      to={`/admin/event-order-details?id=${item.id_event}&vendorId=${props.popupRestaurantPaymentId}&eventName=admin`}
                    >
                      <img
                        src={viewIcon}
                        className="cursor-pointer"
                        width="24"
                        title="View Order Details"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Formik
            enableReinitialize
            initialValues={{
              payment_method: "",
              transaction_number: "",
            }}
            validationSchema={Yup.object().shape({
              payment_method: Yup.string().required(
                "Payment Method is required"
              ),
              transaction_number: Yup.string()
              .max(50, "Transaction Number must be 50 characters!")
              .required("Transaction Number is required"),
            })}
            onSubmit={async (fields) => {
              checkAPICall(fields);
            }}
          >
            {({ errors, touched, values }) => (
              <Form>
                {/* {isChecked === true && ( */}
                  <fieldset className="pricing-sec mt-4">
                    <legend>
                      <span className="px-2 font-weight-semibold text-1">
                        Transaction Details
                      </span>
                    </legend>
                    <div className="form-row">
                      <div className="form-group col-lg-6 col-md-6">
                        <div className="material-textfield">
                          <Field
                            placeholder=" "
                            as="select"
                            name="payment_method"
                            autoComplete="off"
                            className={`form-control eb-contact-input material-input h-3em ${
                              errors.payment_method &&
                              touched.payment_method &&
                              "is-invalid input-box-error"
                            }`}
                            readOnly={isChecked === true ? false : true}
                          >
                            <option value="">Select</option>
                            {paymentMethodsList.map(
                              ({ id, item_name }, index) => (
                                <option value={id} key={index}>
                                  {item_name}
                                </option>
                              )
                            )}
                          </Field>
                          <label className="material-label required text-uppercase text-1">
                            Payment Method
                          </label>
                        </div>
                        <ErrorMessage
                          name="payment_method"
                          component="div"
                          className="field-error text-danger"
                        />
                      </div>
                      <div className="form-group  col-lg-6 col-md-6">
                        <div className="material-textfield">
                          <Field
                            id="transaction_number"
                            placeholder=" "
                            name="transaction_number"
                            autoComplete="off"
                            className={`form-control eb-contact-input material-input h-3em ${
                              errors.transaction_number &&
                              touched.transaction_number &&
                              "is-invalid input-box-error"
                            }`}
                            value={values.transaction_number || ""}
                            readOnly={isChecked === true ? false : true}
                          />
                          <label className="material-label required text-uppercase text-1">
                            Transaction Number
                          </label>
                        </div>
                        <ErrorMessage
                          name="transaction_number"
                          component="div"
                          className="field-error text-danger"
                        />
                      </div>
                    </div>
                  </fieldset>
                {/* )} */}
                <div className="row mt-4">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-right">
                    {clearDue === true || isChecked === false  ? (
                      <Button
                        type="submit"
                        className="mr-2 px-4"
                        variant="primary"
                        disabled
                      >
                        Clear Due
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="mr-2 px-4"
                        variant="primary"
                      >
                        Clear Due
                      </Button>
                    )}
                    <Button
                      onClick={() => props.closeModal(false)}
                      className="mr-2 px-4"
                      variant="danger"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default RestaurantPaymentModal;
