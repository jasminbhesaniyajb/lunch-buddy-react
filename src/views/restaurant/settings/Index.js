import React, { useState } from "react";

import RestaurantProfiles from "../../../containers/AdminRestaurantProfileEdit";

import { history } from "../../../history";

const RestaurantSettings = (props) => {
  
  const [showProfile, setShowProfile] = useState(false);

  const closeEditProfile= () => {
    setShowProfile(false);
    history.push("/restaurant/dashboard");
  };

  return (
    <React.Fragment>
      <section className="container-fluid bg-light-blue padding-top-63 px-0">        
      <div className="row mx-auto">            
          <div className="col-sm-12 col-lg-12 col-md-12 mb-3 mt-2">
            <RestaurantProfiles closeEditProfile={()=> closeEditProfile()} />
          </div>
      </div>
      </section>
    </React.Fragment>
  );
};
export default RestaurantSettings;
