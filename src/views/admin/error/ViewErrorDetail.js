import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Moment from "react-moment";
import queryString from "query-string";
import ReactJson from "react-json-view";

import Loader from "../../../components/Loader";

import { GET_ERROR_DETAIL_BY_ID } from "../../../services/ENDPOINT";

const AdminViewErrorDetail = (props) => {
  
  const paramsId = queryString.parse(location.search).id;
  const [isloader, setLoader] = useState(false);
  const [errorDetail, setErrorDetail] = useState({});
  const [errorMessageDetail, setErrorMessageDetail] = useState({});
  const [errorPayloadDetail, setErrorPayloadDetail] = useState({});
  const checkViewErrorInfo = async () => {
    try {
      const payload = paramsId;
      setLoader(true);
      const data = await GET_ERROR_DETAIL_BY_ID(payload);
      if (data.code === 200 || data.code === "200") {
        setErrorDetail(data.data.error);
        try {
          setErrorMessageDetail(JSON.parse(data.data.error.error));
        } catch {}
        try {
          setErrorPayloadDetail(JSON.parse(data.data.error.Payload));
        } catch {}
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
    checkViewErrorInfo();
  }, []);

  return (
    <React.Fragment>
        <div className="container-fluid bg-light-blue padding-top-63 px-0 mt-2">
        {isloader ? <Loader /> : null}
          <div className="row mx-auto">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="profile-card-sec word-break">
                <div className="profile-card-body">
                  <p className="text-capitalize text-4">
                    Id : {errorDetail.id}
                  </p>
                  <p className="text-capitalize text-4">
                    User Id: {errorDetail.user_id}
                  </p>
                  <p className="text-capitalize text-4">
                    Api Path: {errorDetail.api_path}
                  </p>
                  <p className="text-capitalize text-4">
                    Method: {errorDetail.method}
                  </p>
                  <p className="text-capitalize text-4">
                    Error Code: {errorDetail.error_code}
                  </p>
                  <p className="text-capitalize text-4">
                    Action: {errorDetail.action}
                  </p>
                  <p className="text-capitalize text-4">
                    Created_date: <Moment>{errorDetail.created_date}</Moment>
                  </p>
                  <p className="text-capitalize text-4">
                   <span className="mr-1">User Email Address:</span>
                    {errorDetail.user &&
                      errorDetail.user.email_address &&
                      errorDetail.user.email_address}
                  </p>
                  <div className="text-capitalize text-4 mb-3">
                    <ReactJson src={errorMessageDetail}/>
                  </div>
                  <div className="text-capitalize text-4">
                    <ReactJson src={errorPayloadDetail} />
                  </div>
                </div>
                <div className="text-center">
                  <Link to={"/admin/error-list"}>
                    <Button className="btn btn-dark btn-modern bg-dark-blue">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    </React.Fragment>
  );
};
export default AdminViewErrorDetail;
