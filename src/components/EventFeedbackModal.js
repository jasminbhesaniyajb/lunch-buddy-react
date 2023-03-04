import React, { useState, useEffect } from "react";

import { Modal, Button } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import Rating from "react-rating";
import Moment from "react-moment";
import { toast } from "react-toastify";

import { SCHOOL_EVENT_DETAIL, EVENT_DETAIL } from "../services/ENDPOINT";

const EventFeedbackModal = (props) => {
  const [ratingStarValue, setRatingStarValue] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [eventDetails, setEventDetails] = useState([]);
  console.log("setEventDetails", eventDetails);

  const ratingStar = (value) => {
    setRatingStarValue(value);
    setShowErrorMessage(false);
  };

  const getEventDetails = async (e) => {
    try {
      setEventDetails([]);
      const payload = props.popupIdFeedbackModal;
      var data = {};
      if (props.title == "school") {
        data = await SCHOOL_EVENT_DETAIL(payload);
      } else {
        data = await EVENT_DETAIL(payload);
      }
      if (data.code === 200 || data.code === "200") {
        setEventDetails(data.data[0]);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getEventDetails();
  }, []);

  const checkAPICall = async (e) => {
    const payload = {
      id_event: eventDetails.event_id,
      id_vendor: eventDetails.id_vendor,
      rating: ratingStarValue,
      feedback: e.feedback,
    };
    props.checkAPICall(payload);
  };

  const validateRating = () => {
    if (ratingStarValue === 0) {
      setShowErrorMessage(true);
    }
  };

  return (
    <React.Fragment>
      <Modal show={true} onHide={() => props.closeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Event Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="row">
                <div className="col-lg-4 col-md-5 col-sm-12">
                  <h2 className="font-weight-semibold mb-1 text-4">
                    Event Name:
                  </h2>
                </div>
                <div className="col-lg-8 col-md-7 col-sm-12">
                  <h2 className="mb-1 text-4 mr-1">
                    {eventDetails.event_name}
                  </h2>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-5 col-sm-12">
                  <h2 className="font-weight-semibold mb-1 text-4">
                    Event Date:
                  </h2>
                </div>
                <div className="col-lg-8 col-md-7 col-sm-12">
                  <h2 className="mb-1 text-4">
                    <Moment>{eventDetails.event_date}</Moment>
                  </h2>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-5 col-sm-12">
                  <h2 className="font-weight-semibold mb-1 text-4">
                    Restaurant:
                  </h2>
                </div>
                <div className="col-lg-8 col-md-7 col-sm-12">
                  <h2 className="mb-1 text-4">
                    {eventDetails.restaurant_name}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h2 className="text-4 font-weight-semibold">
                How to satisfied are you with the restaurant service ?
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <Rating
                initialRating={ratingStarValue}
                emptySymbol="far fa-star fa-2x"
                fullSymbol="fas fa-star fa-2x"
                fractions={2}
                className="star-color-yellow"
                onChange={(e) => ratingStar(e)}
              />
              <span className="text-4 font-weight-semibold ml-3 text-info">
                {showErrorMessage && "Please rate your overall experience."}
              </span>
            </div>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              message_content: "",
            }}
            onSubmit={async (fields) => {
              validateRating();
              {
                ratingStarValue !== 0 && checkAPICall(fields);
              }
            }}
          >
            <Form>
              <div className="form-row mt-3">
                <div className="form-group col-lg-12 col-md-12 col-sm-12 mb-0">
                  <div className="material-textfield">
                    <Field
                      placeholder=" "
                      as="textarea"
                      name="feedback"
                      autoComplete="off"
                      className="form-control eb-contact-input material-input h-200"
                    />
                    <label className="textarea-label text-uppercase text-1">
                      Feedback
                    </label>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <Button
                  type="submit"
                  className="mr-2 px-4 btn btn-dark"
                  variant="primary"
                >
                  Submit
                </Button>
                <Button
                  className="px-4"
                  onClick={() => props.closeModal(false)}
                  variant="danger"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default EventFeedbackModal;
