import React, { useState, useEffect } from "react";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { Tabs, Tab } from "react-bootstrap";

import { GET_SETTING_LIST, UPDATE_SETTING } from "../../../services/ENDPOINT";

const Setting = () => {
  const [isloader, setLoader] = useState(false);
  const [appSettings, setAppSettings] = useState([]);

  const changeToogle = (id) => {
    const tempAppSettingObject = appSettings.findIndex((appSettings) => {
      return appSettings.id == id;
    });
    const tempAppSettingsArray = [...appSettings];
    const truefalse = tempAppSettingsArray[tempAppSettingObject].config_value == "true" ? "false" : "true";
    tempAppSettingsArray[tempAppSettingObject].config_value = truefalse;
    setAppSettings(tempAppSettingsArray);
  };

  const changeText = (e, id) => {
    const tempAppSettingObject = appSettings.findIndex((appSettings) => {
      return appSettings.id == id;
    });
    const tempAppSettingsArray = [...appSettings];
    tempAppSettingsArray[tempAppSettingObject].config_value = e.target.value;
    setAppSettings(tempAppSettingsArray);
  };

  const [appSettingData, setAppSettingData] = useState([]);

  const saveData = async (e) => {
    for (var i = 0; i < appSettings.length; i++) {
      appSettingData.push({
        id: appSettings[i].id,
        config_value: appSettings[i].config_value,
      });
    }
    const payload = appSettingData
    try {
      setLoader(true);
      const data = await UPDATE_SETTING(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        getSettingList();
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    } finally {
      setLoader(false);
    }
  };
  const getSettingList = async (e) => {
    try {
      setLoader(true);
      const data = await GET_SETTING_LIST();
      if (data.code === 200 || data.code === "200") {
        setAppSettings(data.data.appSettings);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getSettingList();
    return ()=>{
      setAppSettings();
    }
  }, []);
  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 mt-2 px-0">
      {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          <div className="col-lg-6 col-md-12 col-sm-12 mx-auto">
            <div className="setting-card-sec">
              <Tabs defaultActiveKey="general" id="uncontrolled-tab-example">
                <Tab eventKey="general" title="General">
                  <div className="mt-2">
                  <fieldset className="pricing-sec">
                    <legend>
                      <span className="px-2 font-weight-semibold text-1">
                      Registration Auto Approval
                      </span>
                    </legend>
                    {appSettings.map((item, index) => (
                      <div className="row" key={index}>
                        <div className="col-lg-8 col-md-8 col-sm-8">
                          {item.config_value == "true" && (
                            <div>
                              <input
                                type="hidden"
                                id={"hiddenid" + item.id}
                                value={item.id}
                              />
                              <h2 className="text-4">
                                {item.user_friendly_name}
                              </h2>
                            </div>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                          {item.config_value == "true" && (
                            <div>
                              <label className="switch">
                                <input
                                  className="switch-input"
                                  type="checkbox"
                                  id={"id" + item.id}
                                  value={item.config_value}
                                  checked
                                  onChange={() => changeToogle(item.id)}
                                />
                                <span
                                  className="switch-label"
                                  data-on="Yes"
                                  data-off="No"
                                ></span>
                                <span className="switch-handle"></span>
                              </label>
                            </div>
                          )}
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-8">
                          {item.config_value == "false" && (
                            <div>
                              <input
                                type="hidden"
                                id={"hiddenid" + item.id}
                                value={item.id}
                              />
                              <h2 className="text-4">
                                {item.user_friendly_name}
                              </h2>
                            </div>
                          )}
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4">
                          {item.config_value == "false" && (
                            <div>
                              <label className="switch">
                                <input
                                  className="switch-input"
                                  type="checkbox"
                                  id={"id" + item.id}
                                  value={item.config_value}
                                  onChange={() => changeToogle(item.id)}
                                />
                                <span
                                  className="switch-label"
                                  data-on="Yes"
                                  data-off="No"
                                ></span>
                                <span className="switch-handle"></span>
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    </fieldset>
                  </div>
                  <fieldset className="pricing-sec mt-2">
                    <legend>
                      <span className="px-2 font-weight-semibold text-1">
                        Pricing Parameters (%)
                      </span>
                    </legend>
                    {appSettings.map((item, index) => (
                      <div className="form-row" key={index}>
                        {item.config_value != "true" &&
                          item.config_value != "false" &&
                          item.config_group == 1 && (
                            <div className="col-lg-8 col-md-8 col-sm-8">
                              <div>
                                <input
                                  type="hidden"
                                  id={"hiddenid" + item.id}
                                  value={item.id}
                                />
                                <h2 className="text-4">
                                  {item.user_friendly_name}
                                </h2>
                              </div>
                            </div>
                          )}
                        {item.config_value != "true" &&
                          item.config_value != "false" &&
                          item.config_group == 1 && (
                            <div className="form-group col-lg-4 col-md-4">
                              <div className="d-flex align-items-center">
                                <div>
                                  <input
                                    type="number"
                                    name="donation"
                                    autoComplete="off"
                                    pattern="^\d*(\.\d{0,2})?$"
                                    className="form-control eb-contact-input h-3em"
                                    id={"id" + item.id}
                                    value={item.config_value}
                                    onChange={(e) => changeText(e, item.id)}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    ))}
                  </fieldset>
                  <div className="form-row">
                    <div className="form-group col-lg-12 col-md-12">
                      <div className="d-flex justify-content-center">
                        <input
                          type="submit"
                          value="Save"
                          className="btn btn-dark btn-modern bg-dark-blue mt-3 mr-2"
                          onClick={(e) => saveData(e)}
                        />
                        <input
                          type="button"
                          value="Cancel"
                          className="btn btn-dark btn-modern bg-dark-blue mt-3"
                        />
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="profile" title="Restaurant">
                  <p>No settings available</p>
                </Tab>
                <Tab eventKey="school" title="School">
                  <div className="mt-2">
                    {appSettings.map((item, index) => (
                      <div className="form-row" key={index}>
                        {item.config_value != "true" &&
                          item.config_value != "false" &&
                          item.config_group == 2 && (
                            <div className="col-lg-8 col-md-8 col-sm-8">
                              <div>
                                <input
                                  type="hidden"
                                  id={"hiddenid" + item.id}
                                  value={item.id}
                                />
                                <h2 className="text-4">
                                  {item.user_friendly_name}
                                </h2>
                              </div>
                            </div>
                          )}
                        {item.config_value != "true" &&
                          item.config_value != "false" &&
                          item.config_group == 2 && (
                            <div className="form-group col-lg-4 col-md-4">
                              <div className="d-flex align-items-center">
                                <div>
                                  <input
                                    type="number"
                                    name="donation"
                                    autoComplete="off"
                                    pattern="^\d*(\.\d{0,2})?$"
                                    className="form-control eb-contact-input h-3em"
                                    id={"id" + item.id}
                                    value={item.config_value}
                                    onChange={(e) => changeText(e, item.id)}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                      </div>
                    ))}
                    <div className="form-row">
                      <div className="form-group col-lg-12 col-md-12">
                        <div className="d-flex justify-content-center">
                          <input
                            type="submit"
                            value="Save"
                            className="btn btn-dark btn-modern bg-dark-blue mt-3 mr-2"
                            onClick={(e) => saveData(e)}
                          />
                          <input
                          type="button"
                          value="Cancel"
                          className="btn btn-dark btn-modern bg-dark-blue mt-3"
                        />
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="parent" title="Parent">
                  <p>No settings available</p>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Setting;
