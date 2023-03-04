import React, { useState } from "react";

import Loader from "../../../components/Loader";

import BarChart from "../../../components/chart/BarChart";
import LineChart from "../../../components/chart/LineChart";
import dollarIcon from "../../../assets/img/icons/dollar.svg";
import fileCopyIcon from "../../../assets/img/icons/file-copy.svg";
import homeIcon from "../../../assets/img/icons/home.svg";
import warningIcon from "../../../assets/img/icons/warning.svg";

import AdminDashboardParentTable from './ParentTable'
import AdminDashboardSchoolTable from './SchoolTable'
import AdminDashboardRestaurantTable from './RestaurantTable'
const AdminDashboard = () => {
  const [isloader, setLoader] = useState(false);

  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-120 px-0">
      {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          {/* start single card */}
          <div className="col-lg-3 col-md-6 col-sm-12 mb-5">
            <div className="dashboard-card-sec position-relative">
              <div className="dashboard-card-header card-header-info">
                <div>
                  <div className="dashboard-card-icon position-absolute">
                    <img src={fileCopyIcon} width="35" alt="icon" />
                  </div>
                </div>
                <div className="dashboard-card-category d-flex flex-column align-items-end">
                  <p className="mb-0">Used Space</p>
                  <h3 className="dashboard-card-title text-6">
                    49/50
                    <span>GB</span>
                  </h3>
                </div>
              </div>
              <div className="border-bottom-gray"></div>
              <div className="dashboard-card-footer">
                <div className="d-flex align-items-center mt-2">
                  <i
                    className="fa fa-exclamation-triangle mr-1"
                    aria-hidden="true"
                  ></i>
                  <p className="mb-0">Get More Space...</p>
                </div>
              </div>
            </div>
          </div>
          {/* end single card */}
          {/* start single card */}
          <div className="col-lg-3 col-md-6 col-sm-12 mb-5">
            <div className="dashboard-card-sec position-relative">
              <div className="dashboard-card-header card-header-success">
                <div>
                  <div className="dashboard-card-icon position-absolute">
                    <img src={homeIcon} width="35" alt="icon" />
                  </div>
                </div>
                <div className="dashboard-card-category d-flex flex-column align-items-end">
                  <p className="mb-0">Revenue</p>
                  <h3 className="dashboard-card-title text-6">$34,245</h3>
                </div>
              </div>
              <div className="border-bottom-gray"></div>
              <div className="dashboard-card-footer">
                <div className="d-flex align-items-center mt-2">
                  <i
                    className="fa fa-calendar-check mr-1"
                    aria-hidden="true"
                  ></i>
                  <p className="mb-0">Last 24 Hours</p>
                </div>
              </div>
            </div>
          </div>
          {/* end single card */}
          {/* start single card */}
          <div className="col-lg-3 col-md-6 col-sm-12 mb-5">
            <div className="dashboard-card-sec position-relative">
              <div className="dashboard-card-header card-header-danger">
                <div>
                  <div className="dashboard-card-icon position-absolute">
                    <img src={warningIcon} width="35" alt="icon" />
                  </div>
                </div>
                <div className="dashboard-card-category d-flex flex-column align-items-end">
                  <p className="mb-0">Fixed Issues</p>
                  <h3 className="dashboard-card-title text-6">73</h3>
                </div>
              </div>
              <div className="border-bottom-gray"></div>
              <div className="dashboard-card-footer">
                <div className="d-flex align-items-center mt-2">
                  <i className="fa fa-tag mr-1" aria-hidden="true"></i>
                  <p className="mb-0">Tracked from Github</p>
                </div>
              </div>
            </div>
          </div>
          {/* end single card */}
          {/* start single card */}
          <div className="col-lg-3 col-md-6 col-sm-12 mb-5">
            <div className="dashboard-card-sec position-relative">
              <div className="dashboard-card-header card-header-warning">
                <div>
                  <div className="dashboard-card-icon position-absolute">
                    <img src={dollarIcon} width="35" alt="icon" />
                  </div>
                </div>
                <div className="dashboard-card-category d-flex flex-column align-items-end">
                  <p className="mb-0">Total Earning</p>
                  <h3 className="dashboard-card-title text-6">$25698</h3>
                </div>
              </div>
              <div className="border-bottom-gray"></div>
              <div className="dashboard-card-footer">
                <div className="d-flex align-items-center mt-2">
                  <i className="fa fa-tag mr-1" aria-hidden="true"></i>
                  <p className="mb-0">Higher Then Last Month</p>
                </div>
              </div>
            </div>
          </div>
          {/* end single card */}
        </div>
        {/* start chart section */}
        <div className="row mx-auto">
          <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
            <div className="chart-sec-card">
              <div>
                <h3 className="text-capitalize text-color-primary font-weight-semibold text-6">
                  Students Survay
                </h3>
              </div>
              <LineChart />
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 mb-5">
            <div className="chart-sec-card">
              <div>
                <h3 className="text-capitalize text-color-primary font-weight-semibold text-6">
                  Restaurant Survay
                </h3>
              </div>
              <BarChart />
            </div>
          </div>
        </div>
        {/* end chart section */}
        <div className="row mt-5 mx-auto">
          <AdminDashboardParentTable />
          <AdminDashboardRestaurantTable />
          <AdminDashboardSchoolTable />
        </div>
      </div>
    </React.Fragment>
  );
};
export default AdminDashboard;
