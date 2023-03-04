import React, { useState } from "react";

import { Button } from "react-bootstrap";
import Avatar from 'react-avatar';
import Moment from "react-moment";

import SchoolProfiles from "../../../containers/SchoolProfileEdit";

const SchoolProfile = (props) => {
  const [profileData, setProfileData] = useState({});
  const [showEditProfile, setShowEditProfile] = useState(false);

  const openCloseEditProdile = () => {
    setShowEditProfile(true);
  };
  return (
    <React.Fragment>
      <section className="container-fluid bg-light-blue padding-top-63 mt-2 px-0">
        <div className="row mx-auto">
          <div className="col-lg-5 col-md-12 col-sm-12 mb-3 pr-lg-0">
            <div className="profile-card-sec">
              <div className="profile-card-img text-center">
              <Avatar textSizeRatio={3} size={100} round name={props.data.loginInfo.school_name} />
              </div>
              <div className="profile-card-body mt-4">
                <h3 className="text-center text-capitalize text-color-primary font-weight-semibold mt-1">
                  {props.data.loginInfo.user_name}
                </h3>
                <p className="text-capitalize text-4 details-box">
                  <span className="font-weight-semibold">School Name :</span> {props.data.loginInfo.school_name}
                </p>
                <p className="text-capitalize text-4 details-box">
                <span className="font-weight-semibold">Contact Person Name :</span> {props.data.loginInfo.contact_person_name}
                </p>
                <p className="text-capitalize text-4 details-box">
                <span className="font-weight-semibold">Email Address :</span> {props.data.loginInfo.email_address}
                </p>
                <p className="text-capitalize text-4 details-box">
                <span className="font-weight-semibold">Contact Number :</span> {props.data.loginInfo.contact_number}
                </p>
                <p className="text-capitalize text-4 details-box">
                <span className="font-weight-semibold"> Modified Date :</span>
                  {props.data.loginInfo.modified_date && (
                    <Moment>{props.data.loginInfo.modified_date}</Moment>
                  )}
                </p>
                <p className="text-capitalize text-4 details-box">
                <span className="font-weight-semibold">Last Login Date :</span>
                  {props.data.loginInfo.last_login_date && (
                    <Moment>{props.data.loginInfo.last_login_date}</Moment>
                  )}
                </p>
              </div>
              <div className="text-center">
                <Button className="rest-primary-btn border-0 px-4" onClick={openCloseEditProdile}>
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-7 col-md-12 mb-3">
            {showEditProfile && (
                <SchoolProfiles closeEditProfile={()=> setShowEditProfile(false)} />
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default SchoolProfile;
