import React, { useState } from "react";

import { Button } from "react-bootstrap";
import Avatar from 'react-avatar';
import Moment from 'react-moment';

import RestaurantProfiles from "../../../containers/RestaurantProfileEdit";
import Loader from "../../../components/Loader";

const RestaurantProfile = (props) => {
  const [isloader, setLoader] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const openCloseEditProfile= () => {
    setShowEditProfile(true);
  };

  return (
    <React.Fragment>
      <section className="container-fluid bg-light-blue padding-top-63 mt-2 px-0">
        {isloader ? <Loader /> : null}
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12 col-sm-12 mb-3 pr-lg-0">
              <div className="profile-card-sec">
                <div className="profile-card-img text-center">
                <Avatar textSizeRatio={2} size={40} round name={props.data.loginInfo.first_name} />
                </div>
                <div className="profile-card-body">
                  <h3 className="text-center text-capitalize text-color-primary font-weight-semibold mt-1">
                    {props.data.loginInfo.user_name}
                  </h3>
                  <p className="text-capitalize text-4 details-box">
                  <span className="font-weight-semibold">Restaurant Name :</span> {props.data.loginInfo.restaurant_name}
                  </p>
                  <p className="text-capitalize text-4 details-box">
                  <span className="font-weight-semibold">First Name :</span> {props.data.loginInfo.first_name}
                  </p>
                  <p className="text-capitalize text-4 details-box">
                  <span className="font-weight-semibold">Last Name :</span> {props.data.loginInfo.last_name}
                  </p>
                  <p className="text-capitalize text-4 details-box">
                  <span className="font-weight-semibold">Email Address :</span> {props.data.loginInfo.email_address}
                  </p>
                  <p className="text-capitalize text-4 details-box">
                  <span className="font-weight-semibold">Primary Contact Number :</span> {props.data.loginInfo.primary_contact_number}
                  </p>
                  <p className="text-capitalize text-4 details-box">
                  <span className="font-weight-semibold">Emergency Contact Number :</span> {props.data.loginInfo.emergency_contact_number}
                  </p>
                  <p className="text-capitalize text-4 details-box">
                  <span className="font-weight-semibold">Distance(Km) :</span> {props.data.loginInfo.distance}
                  </p>
                  <p className="text-capitalize text-4 details-box">
                  <span className="font-weight-semibold">Website Address :</span> {props.data.loginInfo.web_site_address && props.data.loginInfo.web_site_address}
                  </p>
                  <p className="text-capitalize text-4 details-box">
                  <span className="font-weight-semibold">Modified Date :</span> {props.data.loginInfo.modified_date && <Moment>{ props.data.loginInfo.modified_date}</Moment>}
                  </p>
                  <p className="text-capitalize text-4 details-box">
                  <span className="font-weight-semibold">Last Login Date :</span> {props.data.loginInfo.last_login_date && <Moment>{props.data.loginInfo.last_login_date}</Moment>}
                  </p>
                </div>
                <div className="profile-card-img text-center">
                  <Button className="rest-primary-btn border-0 px-4" onClick={openCloseEditProfile}>Edit Profile</Button>
                </div>
              </div>
            </div>
            {showEditProfile &&
            <div className="col-sm-12 col-lg-7 col-md-12 mb-3 ">
            <RestaurantProfiles closeEditProfile={()=> setShowEditProfile(false)} />
            </div>
            }
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default RestaurantProfile;
