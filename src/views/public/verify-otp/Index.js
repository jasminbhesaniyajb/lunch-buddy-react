import React, { useState} from "react";
import { Modal } from "react-bootstrap";
import OtpInput from "react-otp-input";
import { VERIFY_USER } from "../../../services/ENDPOINT";
import { toast } from "react-toastify";
import { useLocation } from "react-router";
import queryString from "query-string";

import { history } from "../../../history";
import { useTranslation } from "react-i18next";

const VerifyOtp = (props) => {
  const [otp, setOTP] = useState();
  const handleChange = (otp) => setOTP(otp);
  const location = useLocation();
  const { t } = useTranslation();
  const checkAPICall = async (e) => {
    try {
      const payload = {
        one_time_pass: otp ? otp : "0205",
        id: queryString.parse(location.search).id
          ? queryString.parse(location.search).id
          : "0205",
      };
      const data = await VERIFY_USER(payload);
      if (data.code === 200 || data.code === "200") {
        const approvalPendingSatus = localStorage.getItem(
          "eb-mums-lunch:approvalPendingStatus"
        );
        const approvalPendingMeassage = localStorage.getItem(
          "eb-mums-lunch:approvalPendingMeassage"
        );
        if (approvalPendingSatus == "Approval Pending") {
          toast.success(approvalPendingMeassage);
          localStorage.removeItem("eb-mums-lunch:approvalPendingStatus");
          localStorage.removeItem("eb-mums-lunch:approvalPendingMeassage");
          history.push("/");
        } else {
          if (data.data.loginInfo.user_type === 2) {
            toast.success(
              `Howdy ${data.data.loginInfo.first_name} ${data.data.loginInfo.last_name}, Welcome to the Mums Lunch!`
            );
          } else if (data.data.loginInfo.user_type === 3) {
            toast.success(
              `Howdy ${data.data.loginInfo.contact_person_name}, Welcome to the Mums Lunch!`
            );
          } else if (data.data.loginInfo.user_type === 4) {
            toast.success(
              `Howdy ${data.data.loginInfo.first_name} ${data.data.loginInfo.last_name}, Welcome to the Mums Lunch!`
            );
          }

          localStorage.setItem(
            "eb-mums-lunch:loginInfo",
            JSON.stringify(data.data.loginInfo)
          );
          localStorage.setItem("eb-mums-lunch:token", data.data.token);
          localStorage.setItem(
            "eb-mums-lunch:userType",
            data.data.loginInfo.user_type
          );

          props.addLoginInfoHandler(data.data.loginInfo);
          if (data.data.loginInfo.user_type === 1) {
            history.push("/admin/dashboard");
          } else if (data.data.loginInfo.user_type === 2) {
            history.push("/restaurant/dashboard");
          } else if (data.data.loginInfo.user_type === 3) {
            history.push("/school/dashboard");
          } else if (data.data.loginInfo.user_type === 4) {
            history.push("/parent/dashboard");
          } else {
            history.push("/");
          }
        }
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  return (
    <React.Fragment>
      <div className="footer-top-spacing"></div>
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>{t("verifyOtpVerifyemail")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-2">
            <div className="form-row text-center">
              <div className="text-center w-100">
                <h2 className="font-weight-semibold text-maven mb-1 text-6 text-color-primary">
                  {t("verifyOtpVerificationCode")}
                </h2>
                <p>{t("verifyOtpMessage")}</p>
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
                  value={t("verifyOtpVerifyemail")}
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

export default VerifyOtp;
