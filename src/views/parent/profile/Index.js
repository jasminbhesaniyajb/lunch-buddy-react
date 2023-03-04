import React, { useState} from "react";

import { Button } from "react-bootstrap";
import Moment from 'react-moment';
import Avatar from 'react-avatar';
import Loader from "../../../components/Loader";

import ParentProfiles from "../../../containers/ParentProfileEdit";

const ParentProfile = (props) => {
  const [isloader, setLoader] = useState(false);
  const [profileData, setProfileData] = useState({});
     
  const [showProfile, setShowProfile] = useState(false);

  const openCloseEditProdile= () => {
    setShowProfile(!showProfile);
  };

  return (
    <React.Fragment>
      <section className="container-fluid bg-light-blue padding-top-63 mt-2 px-0">
        {isloader ? <Loader /> : null} 
          <div className="row mx-auto">
            <div className="col-lg-5 col-md-12 col-sm-12 mb-3 pr-lg-0">
              <div className="profile-card-sec">
                <div className="profile-card-img text-center">
                <Avatar textSizeRatio={2} size={100} round name={`${props.data.loginInfo.first_name} ${props.data.loginInfo.last_name}`} />
                </div>
                <div className="profile-card-body mt-4">
                  <h3 className="text-center text-capitalize text-color-primary font-weight-semibold mt-1">
                    {profileData.user_name}
                  </h3>
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
                  <span className="font-weight-semibold">Modified Date :</span> {props.data.loginInfo.modified_date && <Moment>{props.data.loginInfo.modified_date}</Moment>}
                  </p>
                  <p className="text-capitalize text-4 details-box">
                  <span className="font-weight-semibold">Last Login Date :</span> {props.data.loginInfo.last_login_date && <Moment>{props.data.loginInfo.last_login_date}</Moment>}
                  </p>
                </div>
                <div className="profile-card-img text-center">
                  <Button className="bg-dark-blue" onClick={openCloseEditProdile}>Edit Profile</Button>
                </div>
              </div>
            </div>
          { showProfile && 
          <div className="col-sm-12 col-lg-7 col-md-12 mb-3">
            <ParentProfiles closeEditProfile={()=> setShowProfile(false)} />
          </div>
          }
      </div>
      </section>
    </React.Fragment>
  );
};
export default ParentProfile;
