import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { VERIFY_USER } from "../services/ENDPOINT";
import { toast } from "react-toastify";

import { history } from "../history";

const VerifyEmailModal = (props) => {
  const [otp, setOTP] = useState();
  const handleChange = (otp) => setOTP(otp);
  
  const checkAPICall = async (e) => {
    try {
      const payload = {
        one_time_pass: otp ? otp : '0205',
        id: props.registerId
      }
      const data = await VERIFY_USER(payload);

      if (data.code == 200) {
        toast.success("Vefify successfully");
        history.push("/login");
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  return (
    <React.Fragment>
        <Modal
          show={props.show}
          onHide={props.handleClose}
          onClick={props.handleShow}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Verify email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mt-2">
              <div className="form-row text-center">
                <div className="text-center w-100">
                  <h2 className="font-weight-semibold text-maven mb-1 text-6 text-color-primary">
                    Verification Code
                  </h2>
                  <p>Please type the verification code sent to email</p>
                </div>
                <div className="d-flex justify-content-center  w-100">
                  <OtpInput
                    inputStyle="cutom-otp py-1"
                    value={otp}
                    onChange={handleChange}
                    numInputs={6}
                    otpType="number"
                    separator={<span className="px-1">-</span>}
                  />
                </div>
                <div className="form-group col">
                  <input
                    onClick={checkAPICall}
                    type="submit"
                    value="Verify email"
                    className="btn btn-dark btn-modern d-block w-100 mt-4"
                    data-loading-text="Loading..."
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
    </React.Fragment>
  );
};

export default VerifyEmailModal;
