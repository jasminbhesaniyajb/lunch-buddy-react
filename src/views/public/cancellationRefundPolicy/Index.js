import React from "react";
import { useTranslation } from "react-i18next";
const CancellationRefundPolicy = (props) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div role="main" className="main">
        <section className="Privacy-Policy-sec mrg-b-150">
          <div className="container">
            <h2 className="font-weight-normal text-maven text-color-primary text-7 text-center pb-2 mb-2">
              <strong className="font-weight-semibold text-maven">
              {t("cancellationAndRefundPolicy")}        
              </strong>
            </h2>
            <div className="row">
              <div>
                <div>
                  <p>
                  Parents can cancel any order they placed for the next week before the Friday midnight of the current week. For instance, if parents want to cancel the order of lunch for the second week of December then they have to cancel before Friday midnight of the first week of December. However parents will not be refunded the transaction and % of payment processing fee of that order.
                  </p>                  
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};
export default CancellationRefundPolicy;
