import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = (props) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div role="main" className="main">
        <section className="Privacy-Policy-sec">
          <div className="container">
            <h2 className="font-weight-normal text-maven text-color-primary text-7 text-center pb-2 mb-2">
              <strong className="font-weight-semibold text-maven">
                {t("privacyPolicy")}
              </strong>
            </h2>
            <div className="row">
              <div>                  
                  <p>
                  Mums Lunch takes privacy and data security seriously. We collect your name, phone number, email address, the date and time of account creation, IP address, a hashed password of your selection,   and the device used for account creation. We collect the IP address of the user while creating the user login to help us protect against any potential threat, fraud and unauthorized acess. You may choose to register with social media sites like facebook and google in line with their privacy settings. 
                  </p>
                  <p>
                  We may collect your order history in case to resolve any issues between parents and schools. We use this information for administration purposes and make certain reports to help restaurants to deliver the food. 
                  </p>
              </div>
              <div>                  
                  <p>
                  Your payment details such as credit card number, name, CVV and expiry details will be transmitted using third party secured payment gateway and payment services. We do not Save the credit card information on our server. 
                  </p>
                  <p>
                  These datas will only be shared with school authority in order to organize the daily meals and restaurants will only see students name, students class and teacher name only.
                  </p>
              </div>
              <div>                  
                  <p>
                  Restaurants’ menu will be shared with parents, students if not minor and school authorities to facilitate the lunch.
                  </p>
                  <p>
                  We are not sharing any of the parents’ data with any third party company in Canada or any other part of the World.
                  </p>
              </div>
              <div>                  
                  <p>
                  We strongly recommend parents to create an alphanumeric password to have a secured account.
                  </p>
              </div>              
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};
export default PrivacyPolicy;
