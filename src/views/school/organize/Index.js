import React, { useState, useEffect } from "react";
import RestaurantMenuModal from "../../../components/RestaurantMenuModal";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { history } from "../../../history";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../../../components/Loader";

import {
  ADD_SCHOOL_EVENT,
  GET_EVENT_BY_ID,
  UPDATE_SCHOOL_EVENT,
  GET_SETTING_LIST,
} from "../../../services/ENDPOINT";

const SchoolOrganize = (props) => {
  const paramsId = queryString.parse(location.search).organizeId;
  const copyEvent = queryString.parse(location.search).copyEvent;
  const [showRestaurantMenuModal, setShowRestaurantMenuModal] = useState(false);
  const [selectScheduleDate, setSelectScheduleDate] = useState();
  const [selectTime,setSelectTime] = useState("11:30");
  const [OrderCutoffEndSpan, setOrderCutoffEndSpan] = useState();
  const [ScheduleDateSpan, setScheduleDateSpan] = useState();
  const [pathVariableRestaurantMenuModal, setPathvariableRestaurantMenuModal] = useState("organize");
  const [popupIdRestaurantMenuModal, setPopupIdRestaurantMenuModal] = useState({
    id: queryString.parse(location.search).id,
    restaurant_name: queryString.parse(location.search).restaurantName,
    organize_id:
      paramsId == null ? null : queryString.parse(location.search).organizeId,
  });

  const [eventMenuItems, setEventMenuItem] = useState([]);
  const [organize, setOrganize] = useState([]);
  const [isloader, setLoader] = useState(false);
  const [selectOneItemMessage,setSelectOneItemMessage] = useState("At least one item needs to be selected in order to create an event.")

  const onCancel = () => {
    if (paramsId) {
      history.push("/school/upcoming-event");
    } else {
      history.push("/school/organize-event");
    }
  };

  const getSettingList = async (e) => {
    try {
      const data = await GET_SETTING_LIST();
      if (data.code === 200 || data.code === "200") {
        setScheduleDateSpan(data.data.appSettings[7].config_value);
        setOrderCutoffEndSpan(data.data.appSettings[8].config_value);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    getSettingList();
  }, []);

  const closePopup = (record) => {
    if (pathVariableRestaurantMenuModal == "organize") {
      if (popupIdRestaurantMenuModal.organize_id == null) {
        setShowRestaurantMenuModal(false);
        history.push(
          "/school/organize?id=" +
          popupIdRestaurantMenuModal.id +
            "&restaurantName=" +
            popupIdRestaurantMenuModal.restaurant_name
        );
      } else {
        setShowRestaurantMenuModal(false);
        history.push(
          "/school/organize?id=" +
          popupIdRestaurantMenuModal.id +
            "&restaurantName=" +
            popupIdRestaurantMenuModal.restaurant_name +
            "&organizeId=" +
            popupIdRestaurantMenuModal.organize_id
        );
      }
    } else {
      setShowRestaurantMenuModal(false);
      history.push("/school/organize-event");
    }
  };
  const checkEventEditInfo = async () => {
    if(paramsId){
      try {
        const payload = paramsId;
        setLoader(true);
        const data = await GET_EVENT_BY_ID(payload);
        if (data.code === 200 || data.code === "200") {
          setOrganize(data.data[0]);
          var str = data.data[0].delivery_time;
          var res = str.split(':');
          var hours = res[0]
          var minutes = res[1]
          setSelectTime(hours+":"+minutes)
  
          if(copyEvent!="copyEvent"){
            let date = moment(data.data[0].scheduled_date).format("YYYY-MM-DD");
            setSelectScheduleDate(date);          
          }
          for (const event of data.data[0].event_menu_items) {
            eventMenuItems.push(event.id_vendor_menu_item);
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
    checkEventEditInfo();
  }, []);
  const checkAPICall = async (e) => {    
    if (paramsId == null || copyEvent=="copyEvent") {
      if (eventMenuItems.length == 0) {
        toast.error(
          selectOneItemMessage
        );
      } else {
        try {
          setLoader(true);
          const payload = {
            id_vendor: popupIdRestaurantMenuModal.id,
            id_school: props.data.loginInfo.id,
            event_name: e.event_name,
            event_description: e.event_description,
            scheduled_date: e.scheduled_date,
            cutoff_date: e.cutoff_date,
            event_menu_items: eventMenuItems,
            delivery_time: e.delivery_time=="" ? selectTime : e.delivery_time,
          };
          const data = await ADD_SCHOOL_EVENT(payload);
          if (data.code === 200 || data.code === "200") {
            if (data.data.eventId) {
              toast.success(data.message);
              history.push(`/school/upcoming-event`);
            } else {
              toast.error(data.message);
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
    } else {
      if (eventMenuItems.length == 0) {
        toast.error(
          selectOneItemMessage
        );
      } else {
        try {
          setLoader(true);
          const payload = {
            id: paramsId,
            id_vendor: popupIdRestaurantMenuModal.id,
            id_school: props.data.loginInfo.id,
            event_name: e.event_name,
            event_description: e.event_description,
            scheduled_date: e.scheduled_date,
            cutoff_date: e.cutoff_date,
            event_menu_items: eventMenuItems,
            delivery_time: e.delivery_time=="" ? selectTime : e.delivery_time,
          };
          const data = await UPDATE_SCHOOL_EVENT(payload);
          if (data.code === 200 || data.code === "200") {
            if (data.data.eventId) {
              toast.success(data.message);
              history.push(`/school/upcoming-event`);
            } else {
              toast.error(data.message);
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
    }
  };
  
  const okButtonClick = (items)=> {
    setEventMenuItem(items)
  }

  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 px-0">
      {isloader ? <Loader /> : null}
        <div className="row mx-auto mt-2">
          <div className="col-sm-12 col-lg-6 mx-auto">
            <Formik
              enableReinitialize
              initialValues={{
                event_name: organize.event_name || "",
                event_description: organize.event_description || "",
                scheduled_date: selectScheduleDate || "",
                cutoff_date: moment(selectScheduleDate, "YYYY-MM-DD")
                  .subtract(OrderCutoffEndSpan, "d")
                  .format("YYYY-MM-DD") || "",
                delivery_time: organize.delivery_time || "",
              }}
              validationSchema={Yup.object().shape({                
                event_name: Yup.string()
                  .min(2, "Menu Name must be 2 characters!")
                  .max(75, "Menu Name must be 75 characters!")                
                  .required("Menu name is required"),
                event_description: Yup.string()
                  .max(5000, "Description must be 5000 characters!"),
                scheduled_date: Yup.string().required(
                  "Schedule date is required"
                ),
                cutoff_date: Yup.string().required(
                  "Order cutoff date is required"
                ),
              })}
              onSubmit={async (fields) => {
                checkAPICall(fields);
              }}
            >
              {({ errors, touched, values }) => (
                <Form className="contact_number-form contact-form box-shadow-black">
                  <div className="form-row mt-3">
                    <div className="form-group col-lg-12 col-md-12">
                      <div className="material-textfield">
                        <Field
                          id="name"
                          placeholder=" "
                          name="event_name"
                          autoComplete="off"
                          className={`form-control eb-contact-input material-input h-3em ${
                            errors.event_name &&
                            touched.event_name &&
                            "is-invalid input-box-error"
                          }`}
                          value={organize.event_name || ""}
                          onChange={(e) => {
                            const list = { ...values };
                            list['event_name'] = e.target.value;
                            setOrganize(list);
                          }}
                          autoFocus
                        />
                        <label className="material-label required text-uppercase">
                          Menu Name
                        </label>
                      </div>
                      <ErrorMessage
                        name="event_name"
                        component="div"
                        className="field-error text-danger"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-lg-12 col-md-12">
                      <div className="material-textfield">
                        <Field
                          placeholder=" "
                          as="textarea"
                          name="event_description"
                          autoComplete="off"
                          className={`form-control eb-contact-input material-input ${
                            errors.event_description &&
                            touched.event_description &&
                            "is-invalid input-box-error"
                          }`}
                          value={organize.event_description || ""}
                          onChange={(e) => {
                            const list = { ...values };
                            list['event_description'] = e.target.value;
                            setOrganize(list);
                          }}
                        />
                        <label className="textarea-label text-uppercase text-1">
                          Description
                        </label>
                      </div>
                      <ErrorMessage
                        name="event_description"
                        component="div"
                        className="field-error text-danger"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-lg-6 col-md-6">
                      <div className="material-textfield">
                        <Field
                          type="date"
                          min={moment()
                            .add(ScheduleDateSpan, "d")
                            .format("YYYY-MM-DD")}
                          placeholder=" "
                          name="scheduled_date"
                          autoComplete="off"
                          value={values.scheduled_date || ""}
                          className={`form-control eb-contact-input material-input h-3em ${
                            errors.scheduled_date &&
                            touched.scheduled_date &&
                            "is-invalid input-box-error"
                          }`}
                          onChange={(e) => {
                            setSelectScheduleDate(e.target.value);
                          }}
                        />
                        <label className="material-label required text-uppercase text-1">
                          Schedule Date
                        </label>
                      </div>
                      <ErrorMessage
                        name="scheduled_date"
                        component="div"
                        className="field-error text-danger"
                      />
                    </div>
                    <div className="form-group col-lg-6 col-md-6">
                      <div className="material-textfield">
                        <Field
                          type="time"
                          placeholder=" "
                          id="delivery_time"
                          name="delivery_time"
                          autoComplete="off"
                          className={`form-control eb-contact-input material-input h-3em`}
                          onChange={(e) => {
                            const list = { ...values };
                            list['delivery_time'] = e.target.value;
                            setOrganize(list);
                            setSelectTime(e.target.value);
                          }}
                          value={selectTime || ""}
                        />
                        <label className="material-label text-uppercase text-1">
                          Delivery time
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-lg-12 col-md-12">
                      <div className="material-textfield">
                        <Field
                          type="date"
                          placeholder=" "
                          // min={moment(values.order_cutoff_date, "YYYY-MM-DD")
                          //   .subtract(OrderCutoffStartSpan, "d")
                          //   .format("YYYY-MM-DD")}
                          // max={moment(selectScheduleDate, "YYYY-MM-DD")
                          //   .subtract(OrderCutoffEndSpan, "d")
                          //   .format("YYYY-MM-DD")}
                          readOnly={true}
                          name="cutoff_date"
                          autoComplete="off"
                          className={`form-control eb-contact-input material-input h-3em ${
                            errors.cutoff_date &&
                            touched.cutoff_date &&
                            "is-invalid input-box-error"
                          }`}
                        />
                        <label className="material-label text-uppercase text-1">
                          Order Cutoff Date
                        </label>
                      </div>
                      <ErrorMessage
                        name="cutoff_date"
                        component="div"
                        className="field-error text-danger"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-lg-12 col-md-12 col-sm-12">
                      <div className="d-flex justify-content-between">
                        <div className="link-btn-hover">
                          <Link
                            className="text-color-primary"
                            onClick={(e) => setShowRestaurantMenuModal(true)}
                          >
                            Select Menu Item(s)
                          </Link>
                        </div>
                        <div>
                         Selected Menu Item(s)
                         <span className="ml-1">{eventMenuItems && eventMenuItems.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-row text-center">
                    <div className="form-group col-lg-12 col-md-12 col-sm-12 mb-0 mt-2">
                      <div className="d-flex justify-content-center">
                        <input
                          type="submit"
                          value="Save"
                          className="btn btn-dark btn-modern bg-dark-blue mx-3 border-0"
                        />
                        <input
                          type="button"
                          value="Cancel"
                          className="btn btn-danger btn-modern border-0"
                          onClick={onCancel}
                        />
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {showRestaurantMenuModal && (
        <RestaurantMenuModal
          closeModal={() => closePopup(eventMenuItems)}
          restaurantId={popupIdRestaurantMenuModal}
          pathVariable={pathVariableRestaurantMenuModal}
          eventMenuItem={eventMenuItems}
          okButtonClick={(e)=>okButtonClick(e)}
        />
      )}
    </React.Fragment>
  );
};
export default SchoolOrganize;
