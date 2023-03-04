import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useTranslation } from "react-i18next";

import Loader from "./Loader";

import {
  GET_ADMIN_PROFILE,
  UPDATE_PARENT_PROFILE,
  GET_PARENT_BY_ID,
  UPDATE_PARENT,
} from "../services/ENDPOINT";

import InputMask from 'react-input-mask';
import { PHONE_MASK } from "../config";
import queryString from 'query-string';
import { history } from "../history";

const ParentProfile = (props) => {
  const paramsId = queryString.parse(location.search).id;
  const [isloader, setLoader] = useState(false);
  const [profileData, setProfileData] = useState({});
   
  const getParentProfile = async (e) => {
    if (paramsId == null) {
      try {
        setLoader(true);
        const data = await GET_ADMIN_PROFILE();
        if (data.code === 200 || data.code === "200") {
          setProfileData(data.data);        
        } else {
          toast.error(data.message);
        }
      } catch ({ data }) {
        toast.error(data.message);
      } finally {
        setLoader(false);
      }
    }else{
      try {
        const payload = paramsId;
        setLoader(true);
        const data = await GET_PARENT_BY_ID(payload);
        if (data.code === 200 || data.code === "200") {
          setProfileData(data.data[0]);        
        } else {
          toast.error(data.message);
        }
      } catch ({ data }) {
        toast.error(data.message);
      } finally {
        setLoader(false);
      }
    }
  };
  useEffect(() => {
    getParentProfile();
    return ()=>{
      setProfileData();
    }
  }, []);
  const checkAPICall = async (e) => {
    if (paramsId == null) {
      try {
        setLoader(true);
        const data = await UPDATE_PARENT_PROFILE(e);
        if (data.code === 200 || data.code === "200") {
          props.addMainLoginInfoHandler(data.data);
          toast.success(data.message);
          setShowProfile(!showProfile);
          history.push("/parent/profile");
        } else {
          toast.error(data.message);
        }
      } catch ({ data }) {
        toast.error(data.message);
      } finally {
        setLoader(false);
      }
    }else{
      try {
        const payload = {
          id: paramsId,
          first_name: e.first_name,
          last_name: e.last_name,
          contact_number: e.contact_number,
          user_id: e.user_id,
        };
        setLoader(true);
        const data = await UPDATE_PARENT(payload);
        if (data.code === 200 || data.code === "200") {
          toast.success(data.message);
          history.push("/admin/parent-list");
        } else {
          toast.error(data.message);
        }
      } catch ({ data }) {
        toast.error(data.message);
      } finally {
        setLoader(false);
      }
    }
  };

  const [showProfile, setShowProfile] = useState(false);

  const { t } = useTranslation();
  return (
    <React.Fragment>
      <section className="container-fluid bg-light-blue px-0">
        {isloader ? <Loader /> : null}                     
          <div>
            <Formik
              enableReinitialize
              initialValues={{
                first_name: profileData.first_name || "",
                last_name: profileData.last_name || "",
                contact_number: profileData.contact_number || null,
                user_id: profileData.user_id || "",
              }}
              validationSchema={Yup.object().shape({
                first_name: Yup.string()
                  .max(30, t("registerValidationFirstNameMax"))
                  .required(t("registerValidationFirstNameRequired")),
                last_name: Yup.string()
                  .max(30, t("registerValidationFirstNameMax"))
                  .required(t("registerValidationLastNameRequired")),
              })}
              onSubmit={async (fields) => {
                checkAPICall(fields);
              }}
            >
              {({ errors, touched, values }) => (
                <Form className="contact_number-form contact-form border-radius-7 box-shadow-black">
                  <div
                    className="col-lg-12 text-center"
                  >
                    <h2 className="font-weight-normal text-maven text-color-tertiary text-6 pb-2 mb-0">
                      <strong className="font-weight-semibold">
                        Edit {paramsId == null ? "Profile" : profileData.first_name +" "+ profileData.last_name}
                      </strong>
                    </h2>
                  </div>
                  <div className="form-row mt-4">
                    <div className="form-group col-lg-6 col-md-6">
                      <div className="material-textfield">
                        <Field
                          id="name"
                          placeholder=" "
                          name="first_name"
                          autoComplete="off"
                          className={`form-control eb-contact-input material-input h-3em ${
                            errors.first_name &&
                            touched.first_name &&
                            "is-invalid input-box-error"
                          }`}
                          value={values.first_name || ""}
                          autoFocus
                        />
                        <label className="material-label required text-uppercase text-1">
                          {t("registerFirstName")}
                        </label>
                      </div>
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="field-error text-danger"
                      />
                    </div>
                    <div className="form-group  col-lg-6 col-md-6">
                      <div className="material-textfield">
                        <Field
                          id="lastName"
                          placeholder=" "
                          name="last_name"
                          autoComplete="off"
                          className={`form-control eb-contact-input material-input h-3em ${
                            errors.last_name &&
                            touched.last_name &&
                            "is-invalid input-box-error"
                          }`}
                          value={values.last_name || ""}
                        />
                        <label className="material-label required text-uppercase text-1">
                          {t("registerLastName")}
                        </label>
                      </div>
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="field-error text-danger"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-lg-12 col-md-12">
                      <div className="material-textfield">
                        <InputMask
                          mask={PHONE_MASK}
                          maskChar={null}
                          id="number"
                          placeholder=" "
                          name="contact_number"
                          autoComplete="off"
                          className={`form-control eb-contact-input material-input h-3em`}
                          value={values.contact_number || ""}
                          onChange={(e) => {
                            const list = { ...values };
                            list['contact_number'] = e.target.value;
                            setProfileData(list);
                          }}
                        />
                        <label className="material-label text-uppercase text-1">
                          {t("registerContactNumber")}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-row text-center">
                    <div className="form-group col-lg-12 col-md-12 col-sm-12 mb-0 mt-2">
                      <input
                        type="submit"
                        value="Save"
                        className="btn btn-dark btn-modern bg-dark-blue mr-2"
                      />
                      <input
                      type="button"
                      value="Cancel"
                      className="btn btn-dark btn-modern bg-dark-blue"
                      onClick={()=> props.closeEditProfile(false)}
                    />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
      </section>
    </React.Fragment>
  );
};
export default ParentProfile;
