import React from "react";
import { useTranslation } from "react-i18next";

const TermsAndCondition = (props) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div role="main" className="main">
        <section className="Privacy-Policy-sec">
          <div className="container">
            <h2 className="font-weight-normal text-maven text-color-primary text-7 text-center pb-2 mb-2">
              <strong className="font-weight-semibold text-maven">
                {t("termsAndCondition")}
              </strong>
            </h2>
            <div className="row">
              <div>
                <div>
                  <p>
                    Terms of Services Mums Lunch Terms of Service Agreement are
                    the legal binding agreement between you and the Mums Lunch
                  </p>
                  <p>
                    By accessing the MomsLunch Platform (Website or Mobile App),
                    you are indicating that you have accepted the terms and
                    conditions of the MomsLunch platform. MomsLunch may change
                    the terms and conditions and disclaimer set out above from
                    time to time
                  </p>
                </div>
                <div>
                  <p>
                    Mums Lunch has all the rights to change the terms and
                    conditions in its sole discretion at any point of time
                    allowed by local governing laws.
                  </p>
                  <p>
                    Mums Lunch has the right to modify or change the parents
                    order or cancel the order any time depending upon
                    restaurants available food resources.
                  </p>
                </div>
                <div>
                  <p>
                    All the MomsLunch content on their platform including text,
                    photos, videos, messages or other materials is licensed by
                    MomsLunch and protected by copyright.
                  </p>
                  <p>
                    Mums Lunch has the right to stop the payments to restaurants
                    in the event of late delivery or food quality.
                  </p>
                </div>
                <div>
                  <p>
                    Mums Lunch will make sure with restaurants that they take
                    utmost precautions for the food quality however Mums Lunch
                    is not responsible for any allergy or any health issues
                    caused to the students due to the foods from restaurants.
                  </p>
                  <p>
                    Mums Lunch has the right to block the user or remove the
                    irrelevant comments in the event of any vested interests or
                    malicious intentions whichever may be the case.
                  </p>
                </div>
                <div>
                  <p>
                    Our website is not aimed at children under 13 years old and
                    we will not collect, use, provide or process in any other
                    form any personal information of children under the age of
                    13 deliberately.
                  </p>
                  <p>
                    We therefore also ask you, if you are under 13 years old,
                    please do not send us your personal information (for
                    example, your name, address and email address). If you are
                    under 13 years old and you nevertheless wish to ask a
                    question or use this website in any way which requires you
                    to submit your personal information please get your parent
                    or guardian to do so on your behalf.
                  </p>
                </div>
                <div>
                  <p>
                    Please do not hesitate to contact us if you have any
                    questions or concerns related to the processing of your
                    personal data – contact details are provided in the relevant
                    Privacy Notice below and from the Mums Lunch website for
                    your location.
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
export default TermsAndCondition;
