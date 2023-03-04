import React from "react";

import { Router, Switch, Route } from "react-router-dom";

import { history } from "./history";

import RestaurantPaymentDue from "./components/RestaurantPaymentDue";
import RestaurantPaymentHistory from "./components/RestaurantPaymentHistory";
import RestaurantReview from "./components/RestaurantReview";
import AdminTeacher from "./components/TeacherList";
import RestaurantAddEditMenu from "./containers/AddEditManageMenuContainer";
import AdminAddEditMenu from "./containers/AddEditManageMenuContainer";
import SchoolAddEditTeacher from "./containers/AddEditSchoolTeacher";
import SchoolOrganize from "./containers/AddSchoolEventOrganizeContainer";
import AdminProfile from "./containers/AdminProfile";
import PublicLogin from "./containers/LoginContainer";
import ParentCartDetails from "./containers/ParentCartDetails";
import ParentHome from "./containers/ParentHome";
import ParentOrderNow from "./containers/ParentOrderNow";
import ParentPastOrders from "./containers/ParentPastOrder";
import ParentProfile from "./containers/ParentProfile";
import ParentUpcomingOrders from "./containers/ParentUpcomingOrder";
import RestaurantEventOrderDetails from "./containers/RestaurantEventDetails";
import RestaurantManageMenu from "./containers/RestaurantManageMenuContainer";
import AdminManageMenu from "./containers/RestaurantManageMenuContainer";
import RestaurantPastEvent from "./containers/RestaurantPastEventsContainer";
import RestaurantProfile from "./containers/RestaurantProfile";
import RestaurantUpcomingEvent from "./containers/RestaurantUpcomingEvents";
import RestaurantViewGradeOrders from "./containers/RestaurantViewGradeOrders";
import SchoolGrades from "./containers/SchoolGrades";
import SchoolOrganizeEvent from "./containers/SchoolOrganizeEvent";
import SchoolPastEvent from "./containers/SchoolPastEventsContainer";
import SchoolProfile from "./containers/SchoolProfile";
import SchoolTeacher from "./containers/SchoolTeacherList";
import StudentGradePromotion from "./containers/StudentGradePromotion";
import TeacherCartDetails from "./containers/TeacherCartDetails";
import TeacherHome from "./containers/TeacherHome";
import TeacherOrderNow from "./containers/TeacherOrderNow";
import TeacherProfile from "./containers/TeacherProfile";
import SchoolUpcomingEvent from "./containers/UpcomingEvents";
import VerifyOTP from "./containers/VerifyOtpContainer";
import AdminLayout from "./layouts/AdminLayout";
import LoginLayout from "./layouts/LoginLayout";
import ParentLayout from "./layouts/ParentLayout";
import PublicLayout from "./layouts/PublicLayout";
import RestaurantsLayout from "./layouts/RestaurantsLayout";
import SchoolLayout from "./layouts/SchoolLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import PublicRegistration from "./views/public/registration";
import PublicTermsAndCondition from "./views/public/terms&condition/Index";
import AdminDashboard from "./views/admin/dashboard/Index";
import AdminError from "./views/admin/error/Index";
import AdminErrorDetail from "./views/admin/error/ViewErrorDetail";
import AdminInquiries from "./views/admin/inquery/Index";
import AdminMasters from "./views/admin/masters/Index";
import AdminMenuApproval from "./views/admin/menu-approval/Index";
import AdminMenuChangeRequest from "./views/admin/menu-change-request/Index";
import AdminEditParent from "./views/admin/parent-registration/EditParent";
import AdminParent from "./views/admin/parent-registration/Index";
import AdminEditRestaurant from "./views/admin/restaurant/EditRestaurant";
import AdminRestaurant from "./views/admin/restaurant/Index";
import AdminEditSchool from "./views/admin/school/EditSchool";
import AdminSchool from "./views/admin/school/Index";
import AdminSettings from "./views/admin/settings/Index";
import AdminStudent from "./views/admin/student/Index";
import ParentDashboard from "./views/parent/dashboard/Index";
import ParentSettings from "./views/parent/settings/Index";
import ParentAddEditStudent from "./views/parent/student/AddEditStudent";
import ParentStudent from "./views/parent/student/Index";
import PublicAbout from "./views/public/about/Index";
import PublicCancellationRefundPolicy from "./views/public/cancellationRefundPolicy/Index";
import PublicContactUs from "./views/public/contact-us/Index";
import PublicDemo from "./views/public/demo/Index";
import PublicHome from "./views/public/home/Index";
import RecoverPassword from "./views/public/login/RecoverPasswordModal";
import PublicParents from "./views/public/parents/Index";
import PublicPrivacyPolicy from "./views/public/privacyPolicy/Index";
import PublicRestaurantFaq from "./views/public/restaurantFaq/Index";
import PublicRestaurants from "./views/public/restaurants/Index";
import RestaurantsRegistration from "./views/public/restaurants/Register";
import PublicSchool from "./views/public/schools/Index";
import SchoolRegistration from "./views/public/schools/Register";
import RestaurantDashboard from "./views/restaurant/dashboard/Index";
import RestaurantSettings from "./views/restaurant/settings/Index";
import RestaurantViewOrder from "./views/restaurant/upcoming-event/ViewOrder";
import SchoolDashboard from "./views/school/dashboard/Index";
import SchoolSettings from "./views/school/settings/Index";
import SchoolStudent from "./views/school/student/Index";
import TeacherDashboard from "./views/teacher/dashboard/Index";
import TeacherPastOrders from "./views/teacher/past-orders/Index";
import TeacherSettings from "./views/teacher/settings/Index";
import TeacherUpcomingOrders from "./views/teacher/upcoming-orders/Index";

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      let currentType = localStorage.getItem("eb-mums-lunch:userType");
      let token = localStorage.getItem("eb-mums-lunch:token");
      if (rest.auth && !token) {
        localStorage.removeItem("eb-mums-lunch:userType");
        localStorage.removeItem("eb-mums-lunch:loginInfo");
        localStorage.removeItem("eb-mums-lunch:userType");
        toast.error("Unauthorized Access");
        history.push("/");
      }
      if (rest.auth && Number(currentType) !== rest.type) {
        toast.error("Unauthorized Access");
        history.push("/");
      }
      document.title = `Mums Lunch | ${rest.metaTitle}`;
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

const AppRouter = () => {
  return (
    <Router history={history}>
      <Route path="/parent/:path?" exact>
        <ParentLayout>
          <Switch>
            <Route
              path="/parent/update-student"
              component={ParentAddEditStudent}
            />
            <Route
              path="/parent/add-student"
              component={ParentAddEditStudent}
            />
            <Route path="/parent/student-list" component={ParentStudent} />
            <Route path="/parent/profile" component={ParentProfile} />
            <Route path="/parent/dashboard" component={ParentDashboard} />
            <Route path="/parent/home" component={ParentHome} />
            <Route path="/parent/order-now" component={ParentOrderNow} />
            <Route path="/parent/past-orders" component={ParentPastOrders} />
            <Route
              path="/parent/upcoming-orders"
              component={ParentUpcomingOrders}
            />
            <Route
              path="/parent/cart-details"
              component={ParentCartDetails}
            />
            <Route
              path="/parent/settings"
              component={ParentSettings}
            />
          </Switch>
        </ParentLayout>
      </Route>

      <Route path="/teacher/:path?" exact>
        <TeacherLayout>
          <Switch>
            <Route path="/teacher/dashboard" component={TeacherDashboard} />            
            <Route path="/teacher/home" component={TeacherHome} />            
            <Route path="/teacher/past-orders" component={TeacherPastOrders} />            
            <Route path="/teacher/upcoming-orders" component={TeacherUpcomingOrders} />            
            <Route path="/teacher/profile" component={TeacherProfile} />
            <Route path="/teacher/settings" component={TeacherSettings} />  
            <Route path="/teacher/order-now" component={TeacherOrderNow} />
            <Route path="/teacher/cart-details" component={TeacherCartDetails} />          
            </Switch>          
        </TeacherLayout>
      </Route>

      <Route path="/school/:path?" exact>
        <SchoolLayout>
          <Switch>
            <Route
              path="/school/upcoming-event"
              component={SchoolUpcomingEvent}
            />
            <Route path="/school/past-event" component={SchoolPastEvent} />
            <Route path="/school/organize" component={SchoolOrganize} />
            <Route
              path="/school/organize-event"
              component={SchoolOrganizeEvent}
            />
            <Route path="/school/student-list" component={SchoolStudent} />
            <Route path="/school/profile" component={SchoolProfile} />
            <Route path="/school/dashboard" component={SchoolDashboard} />
            <Route path="/school/settings" component={SchoolSettings} />
            <Route path="/school/teacher-list" component={SchoolTeacher} />
            <Route path="/school/school-grades" component={SchoolGrades} />
            <Route path="/school/add-teacher" component={SchoolAddEditTeacher} />
            <Route path="/school/update-teacher" component={SchoolAddEditTeacher} />
            <Route path="/school/grade-promotion" component={StudentGradePromotion} />
            <Route path="/school/restaurant-review" component={RestaurantReview} />
          </Switch>
        </SchoolLayout>
      </Route>

      <Route path="/login/:path?" exact>
        <LoginLayout>
          <Switch>
            <Route path="/login" exact component={PublicLogin} />
          </Switch>
        </LoginLayout>
      </Route>

      <Route path="/admin/:path?" exact>
        <AdminLayout>
          <Switch>
            <Route path="/admin/settings" component={AdminSettings} />
            <Route
              path="/admin/error-detail"
              component={AdminErrorDetail}
              exact
            />
            <Route path="/admin/error-list" component={AdminError} />
            <Route path="/admin/inquiries" component={AdminInquiries} />
            <Route path="/admin/profile" component={AdminProfile} />
            <Route path="/admin/menu-approval" component={AdminMenuApproval} />
            <Route path="/admin/student-list" component={AdminStudent} />
            <Route
              path="/admin/update-restaurant"
              component={AdminEditRestaurant}
            />
            <Route path="/admin/restaurant-list" component={AdminRestaurant} />
            <Route path="/admin/update-parent" component={AdminEditParent} />
            <Route path="/admin/parent-list" component={AdminParent} />
            <Route path="/admin/update-school" component={AdminEditSchool} />
            <Route path="/admin/school-list" component={AdminSchool} />
            <Route path="/admin/dashboard" component={AdminDashboard} />
            <Route path="/admin" exact component={AdminDashboard} />
            <Route
              path="/admin/manage-menu"
              component={AdminManageMenu}
            />
            <Route
              path="/admin/add-menu"
              component={AdminAddEditMenu}
            />
            <Route
              path="/admin/update-menu"
              component={AdminAddEditMenu}
            />
            <Route
              path="/admin/menu-change-request"
              component={AdminMenuChangeRequest}
            />
            <Route path="/admin/teacher-list" component={AdminTeacher} />
            <Route path="/admin/add-teacher" component={SchoolAddEditTeacher} />
            <Route path="/admin/update-teacher" component={SchoolAddEditTeacher} />
            <Route path="/admin/masters" component={AdminMasters} />
            <Route path="/admin/grade-promotion" component={StudentGradePromotion} />
            <Route path="/admin/school-grades" component={SchoolGrades} />
            <Route path="/admin/restaurnt-payment" component={RestaurantPaymentDue} />
            <Route path="/admin/restaurant-payment-history" component={RestaurantPaymentHistory} />
            <Route
              path="/admin/event-order-details"
              component={RestaurantEventOrderDetails}
            />
            <Route
              path="/admin/view-grade-orders"
              component={RestaurantViewGradeOrders}
            />
          </Switch>
        </AdminLayout>
      </Route>

      <Route path="/restaurant/:path?" exact>
        <RestaurantsLayout>
          <Switch>
            <Route
              path="/restaurant/update-menu"
              component={RestaurantAddEditMenu}
            />
            <Route
              path="/restaurant/add-menu"
              component={RestaurantAddEditMenu}
            />
            <Route
              path="/restaurant/manage-menu"
              component={RestaurantManageMenu}
            />
            <Route path="/restaurant/profile" component={RestaurantProfile} />
            <Route
              path="/restaurant/dashboard"
              component={RestaurantDashboard}
            />
            <Route path="/restaurant" exact component={RestaurantDashboard} />
            <Route
              path="/restaurant/past-event"
              component={RestaurantPastEvent}
            />
            <Route
              path="/restaurant/upcoming-event"
              component={RestaurantUpcomingEvent}
            />
            <Route
              path="/restaurant/view-order"
              component={RestaurantViewOrder}
            />
            <Route
              path="/restaurant/past-event-order-details"
              component={RestaurantEventOrderDetails}
            />
            <Route
              path="/restaurant/upcoming-event-order-details"
              component={RestaurantEventOrderDetails}
            />
            <Route
              path="/restaurant/past-view-grade-orders"
              component={RestaurantViewGradeOrders}
            />
            <Route
              path="/restaurant/upcoming-view-grade-orders"
              component={RestaurantViewGradeOrders}
            />
            <Route
              path="/restaurant/settings"
              component={RestaurantSettings}
            />
          </Switch>
        </RestaurantsLayout>
      </Route>

      <Route path="/:path?" exact>
        <PublicLayout>
          <Switch>
            <Route path="/restaurant-faq" component={PublicRestaurantFaq} />
            <Route
              path="/cancellation-refund-policy"
              component={PublicCancellationRefundPolicy}
            />
            <Route
              path="/terms-and-condition"
              component={PublicTermsAndCondition}
            />
            <Route path="/privacy-policy" component={PublicPrivacyPolicy} />
            <Route path="/recover-password" component={RecoverPassword} />
            <Route path="/verify-otp" component={VerifyOTP} />
            <Route path="/school-registration" component={SchoolRegistration} />
            <Route
              path="/restaurants-registration"
              component={RestaurantsRegistration}
            />
            <Route path="/registration" component={PublicRegistration} />
            <Route path="/schools" component={PublicSchool} />
            <Route path="/restaurants" component={PublicRestaurants} />
            <Route path="/parents" component={PublicParents} />

            <Route path="/contact-us" component={PublicContactUs} />
            <Route path="/about" component={PublicAbout} state={"harsh"} />
            <Route path="/demo" component={PublicDemo} state={"harsh"} />
            <Route path="/" exact component={PublicHome} />
          </Switch>
        </PublicLayout>
      </Route>
    </Router>
  );
};

export default AppRouter;
