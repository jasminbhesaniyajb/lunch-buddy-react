import React, { useState } from "react";

import ParentProfiles from "../../../containers/AdminParentProfileEdit";

import { history } from "../../../history";

const EditParentProfile = (props) => {
  const [showProfile, setShowProfile] = useState(false);

  const closeEditProfile= () => {
    setShowProfile(false);
    history.push("/admin/parent-list");
  };
  return (
    <React.Fragment>
      <section className="container-fluid bg-light-blue padding-top-63 px-0">
        <div className="row mx-auto">
          <div className="col-sm-12 col-lg-12 col-md-12 mb-3 mt-2">
            <ParentProfiles closeEditProfile={()=> closeEditProfile()} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default EditParentProfile;
