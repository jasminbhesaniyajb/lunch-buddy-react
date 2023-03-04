import React, { useState } from "react";
import Loader from "../../../components/Loader";
import Avatar from 'react-avatar';
import Moment from "react-moment";
const AdminProfile = (props) => {
  const [isloader, setLoader] = useState(false);
  return (
    <React.Fragment>
      <section className="container-fluid bg-light-blue padding-top-63 mt-2 px-0">
        {isloader ? <Loader /> : null}
          <div className="row mx-auto">
            <div className="col-lg-4 col-md-8 col-sm-12 mx-auto">
              <div className="profile-card-sec">
                <div className="profile-card-img text-center">
                  <Avatar textSizeRatio={2} size={60} round name={props.data.loginInfo.email_address} />
                </div>
                <div className="profile-card-body mt-4">
                  <h3 className="text-center text-capitalize text-color-primary font-weight-semibold mt-1">
                    {props.data.loginInfo.user_name}
                  </h3>
                  <p className="text-capitalize text-4 details-box">
                    Email Address : {props.data.loginInfo.email_address}
                  </p>
                  <p className="text-capitalize text-4 details-box">
                    Last Login Date : <Moment>{props.data.loginInfo.last_login_date}</Moment>
                  </p>
                </div>
              </div>
            </div>
          </div>
        
      </section>
    </React.Fragment>
  );
};
export default AdminProfile;
