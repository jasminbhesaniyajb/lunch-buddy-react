import React, { useState } from "react";

import TeacherProfiles from "../../../containers/AddEditSchoolTeacher";

import { history } from "../../../history";

const TeacherSettings = (props) => {
  
  const [showProfile, setShowProfile] = useState(false);

  const closeEditProfile= () => {
    setShowProfile(false);
    history.push("/teacher/dashboard");
  };

  return (
    <React.Fragment>
      <section className="container-fluid bg-light-blue padding-top-63 px-0">        
      <div className="row mx-auto">            
          <div className="col-sm-12 col-lg-12 col-md-12 mb-3 mt-2">
            <TeacherProfiles closeEditProfile={()=> closeEditProfile()} profile="profile" />
          </div>
      </div>
      </section>
    </React.Fragment>
  );
};
export default TeacherSettings;
