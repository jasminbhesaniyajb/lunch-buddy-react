import React from "react";
import { useTranslation } from "react-i18next";

const RestaurantFaq = (props) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div role="main" className="main">
        <section className="Privacy-Policy-sec">
          <div className="container">
            <h2 className="font-weight-normal text-maven text-color-primary text-7 text-center pb-2 mb-2">
              <strong className="font-weight-semibold text-maven">
              {t("restaurantRelatedFaqs")}
              </strong>
            </h2>
            <div className="row">
              <div>
                <div>
                  <h2 className="font-weight-normal text-maven text-color-primary text-5 pb-2 mb-2">
                    <strong className="font-weight-semibold text-maven">
                      How many days before parents have to place an order for
                      their kids Daily Lunch?
                    </strong>
                  </h2>
                  <p>
                    Parents need to book the lunch one week in advance for the
                    upcoming week. For instance, if parents want to order the
                    lunch for a let’s say third week of May then the deadline to
                    order the lunch will be the midnight Friday of the second
                    week of May. (Admin has to prepare the list of Saturday
                    Morning and send the list to restaurants.
                  </p>
                </div>
                <div>
                  <h2 className="font-weight-normal text-maven text-color-primary text-5 pb-2 mb-2">
                    <strong className="font-weight-semibold text-maven">
                      Can parents order lunch from a different restaurant in
                      Particular week?
                    </strong>
                  </h2>
                  <p>
                    Yes Parents can order lunch from a different restaurant in
                    that week however parents are given only one restaurant to
                    choose for that particular day. For instance, parents can
                    order lunch from only one restaurant. Let's say Tim Hortons
                    on Monday with different menu options offered by the
                    restaurant. On Tuesday they can order from a different
                    restaurant lets say A&W. Parents can select different menu
                    items based on the available options that restaurants offer.
                  </p>
                  <p>
                    (We need to design restaurant menu items in such a way that
                    owners can select menu items which they can offer next week.
                    I mean they can also hide the menu items if they want.)
                  </p>
                </div>
                <div>
                  <h2 className="font-weight-normal text-maven text-color-primary text-5 pb-2 mb-2">
                    <strong className="font-weight-semibold text-maven">
                      When Restaurants will get the Order list with grade wise
                      for schools?
                    </strong>
                  </h2>
                  <p>
                    Restaurants will get the list from our admin side (or we can
                    make provision that restaurants can see the list based on
                    the grade wise by Saturday midnight to have all the
                    resources prepared for the next week)
                  </p>
                </div>
                <div>
                  <h2 className="font-weight-normal text-maven text-color-primary text-5 pb-2 mb-2">
                    <strong className="font-weight-semibold text-maven">
                      When Restaurants will get paid for the orders?
                    </strong>
                  </h2>
                  <p>
                    Restaurants will be paid the next week Thursday for the
                    orders served in the current week. For instance restaurants
                    served the order for a second week of July, he will be able
                    to get the payment in the third week of Thursday.
                  </p>
                </div>
                <div>
                  <h2 className="font-weight-normal text-maven text-color-primary text-5 pb-2 mb-2">
                    <strong className="font-weight-semibold text-maven">
                      How restaurants will be paid?
                    </strong>
                  </h2>
                  <p>
                    Restaurants will be paid through automatic payment or
                    interac or credit card depending on the preference of both
                    the parties.
                  </p>
                </div>
                <div>
                  <h2 className="font-weight-normal text-maven text-color-primary text-5 pb-2 mb-2">
                    <strong className="font-weight-semibold text-maven">
                      What if Restaurants could not serve that menu that was
                      ordered by parents?
                    </strong>
                  </h2>
                  <p>
                    Restaurants are given the option to choose the available
                    menu a week in advance so in that case restaurants have to
                    manage that menu item which was on the list and ordered by
                    the . A few exceptions can be made however restaurants have
                    to immediately notify Mums Lunch coordinator.
                  </p>
                </div>
                <div>
                  <h2 className="font-weight-normal text-maven text-color-primary text-5 pb-2 mb-2">
                    <strong className="font-weight-semibold text-maven">
                      Why do I need to Pay the payment processing fee and fixed
                      transaction amount in every order?
                    </strong>
                  </h2>
                  <p>
                    For using third party payment services to secure the parents
                    card details, third party levy additional processing fees on
                    every order which is why we take additional processing fees
                    to show up on every order when parents pay the money. Fixed
                    transaction amount is taken to account for the GST payment
                    that we have to pay to restaurants.
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
export default RestaurantFaq;
