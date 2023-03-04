import React from "react";
import NutritionIcon from "../assets/img/icons/nutrition.svg";
import VegIcon from "../assets/img/icons/veg.png";
import InfoIcon from "../assets/img/icons/information-icon.svg";
import WarningIcon from "../assets/img/icons/warning-icon.svg";

function MenuItemIconDescription() {
  return (
    <React.Fragment>
      <div className="row mx-auto">
        <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
          <div className="d-flex">
            <img src={InfoIcon} width="20" title="Product Info" />
            <h2 className="text-maven text-4 mb-0 ml-2">Product Information</h2>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
          <div className="d-flex">
            <img src={NutritionIcon} width="20" title="Nutrition Facts" />
            <h2 className="text-maven text-4 mb-0 ml-2">Nutrition Facts</h2>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
          <div className="d-flex">
            <img src={VegIcon} width="20" title="Veg Friendly" />
            <h2 className="text-maven text-4 mb-0 ml-2">Veg Friendly</h2>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 mb-2">
          <div className="d-flex">
            <img src={WarningIcon} width="20" title="Allergen Conflict" />
            <h2 className="text-maven text-4 mb-0 ml-2">Allergen Conflict</h2>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MenuItemIconDescription;
