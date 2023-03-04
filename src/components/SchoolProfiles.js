import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useTranslation } from "react-i18next";

import Loader from "./Loader";

import InputMask from "react-input-mask";

import { PHONE_MASK, POSTAL_CODE_MASK } from "../config";
import {
  GET_ADMIN_PROFILE,
  UPDATE_SCHOOL_PROFILE,
  GET_CITY,
  GET_PROVINCE,
  GET_SCHOOL_BY_ID,
  UPDATE_SCHOOL,
} from "../services/ENDPOINT";
import queryString from "query-string";
import { history } from "../history";

const SchoolProfile = (props) => {
  const paramsId = queryString.parse(location.search).id;
  const [isloader, setLoader] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [city, setCity] = useState([]);
  const [province, setProvince] = useState([]);
  const [toggleValue, setToggleValue] = useState(false);

  const getSchoolProfile = async (e) => {
    if (paramsId == null) {
      try {
        setLoader(true);
        const data = await GET_ADMIN_PROFILE();
        if (data.code === 200 || data.code === "200") {
          setProfileData(data.data);
          getAllCity(data.data.id_province)
          if(data.data.is_visible == "0" ){
            setToggleValue(false);
          }else{
            setToggleValue(true);
          }
        } else {
          toast.error(data.message);
        }
      } catch ({ data }) {
        toast.error(data.message);
      } finally {
        setLoader(false);
      }
    } else {
      try {
        const payload = paramsId;
        setLoader(true);
        const data = await GET_SCHOOL_BY_ID(payload);
        if (data.code === 200 || data.code === "200") {
          setProfileData(data.data[0]);
          getAllCity(data.data[0].id_province)
          if(data.data[0].is_visible == "0" ){
            setToggleValue(false);
          }else{
            setToggleValue(true);
          }
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
    getSchoolProfile();
    return ()=>{
      setProfileData();
    }
  }, []);
  const checkAPICall = async (e) => {
    if (paramsId == null) {
      try {
        const payload = {
          school_name: e.school_name ,
          address: e.address ,
          id_city: e.id_city ,
          id_province: e.id_province ,
          user_id: e.user_id ,
          postal_code: e.postal_code ,
          fax_number: e.fax_number ,
          contact_person_name: e.contact_person_name ,
          contact_number: e.contact_number ,
          web_site_address: e.web_site_address ,
          is_visible: toggleValue === false ? "0" : "1" ,
        };
        setLoader(true);
        const data = await UPDATE_SCHOOL_PROFILE(payload);
        if (data.code === 200 || data.code === "200") {
          props.addMainLoginInfoHandler(data.data);
          toast.success(data.message);
          setShowProfile(false);
          getSchoolProfile();
        } else {
          toast.error(data.message);
        }
      } catch ({ data }) {
        toast.error(data.message);
      } finally {
        setLoader(false);
      }
    } else {
      try {
        const payload = {
          id: paramsId ,
          school_name: e.school_name ,
          address: e.address ,
          id_city: e.id_city ,
          id_province: e.id_province ,
          user_id: e.user_id ,
          postal_code: e.postal_code ,
          fax_number: e.fax_number ,
          contact_person_name: e.contact_person_name ,
          contact_number: e.contact_number ,
          web_site_address: e.web_site_address ,
          is_visible: toggleValue === false ? "0" : "1" ,

        };
        setLoader(true);
        const data = await UPDATE_SCHOOL(payload);
        if (data.code === 200 || data.code === "200") {
          toast.success(data.message);
          history.push("/admin/school-list");
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
  const getAllProvince = async () => {
    try {
      const data = await GET_PROVINCE();
      if (data.code === 200 || data.code === "200") {
        setProvince(data.data);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getAllProvince();
  }, []);
  const getAllCity = async (e) => {
    const payload = e;
    try {
      const data = await GET_CITY(payload);
      if (data.code === 200 || data.code === "200") {
        setCity(data.data);
      }
    } catch ({ data }) {
      toast.error(data.message);
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
              school_name: profileData.school_name || "",
              address: profileData.address || "",
              id_province: profileData.id_province || "",
              id_city: profileData.id_city || "",
              user_id: profileData.user_id || "",
              postal_code: profileData.postal_code || "",
              fax_number: profileData.fax_number || "",
              contact_person_name: profileData.contact_person_name || "",
              contact_number: profileData.contact_number || "",
              web_site_address: profileData.web_site_address || "",
              is_visible: toggleValue || "",
            }}
            validationSchema={Yup.object().shape({
              school_name: Yup.string()
                .min(2, t("schoolValidationSchoolNameMin"))
                .max(75, t("schoolValidationSchoolNameMax"))
                .required(t("schoolValidationSchoolNameRequired")),
              address: Yup.string()
                .min(5, t("restaurantValidationAddressMin"))
                .max(200, t("restaurantValidationAddressMax"))
                .required(t("restaurantValidationAddressRequired")),
              id_city: Yup.string().required(
                t("restaurantValidationCityRequired")
              ),
              id_province: Yup.string().required(
                t("restaurantValidationProvinceRequired")
              ),
              contact_person_name: Yup.string()
                .min(5, t("schoolValidationContactPersonNameMin"))
                .max(50, t("schoolValidationContactPersonNameMax"))
                .required(t("schoolValidationContactPersonNameRequired")),
              contact_number: Yup.string()
                .min(8, t("registerValidationContactMin"))
                .max(20, t("registerValidationContactMax"))
                .required(t("registerValidationContactRequired")),
              web_site_address: Yup.string()
                .min(7, t("restaurantValidationWebsiteMin"))
                .max(100, t("restaurantValidationWebsiteMax"))
                .matches(
                  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                  t("restaurantValidationWebsiteMatches")
                ),
              fax_number: Yup.string()
                .min(5, t("schoolValidationFaxNumberMin"))
                .max(15, t("schoolValidationFaxNumberMax")),
            })}
            onSubmit={async (fields) => {
              checkAPICall(fields);
            }}
          >
            {({ errors, touched, values }) => (
              <Form className="contact-form border-radius-7 box-shadow-black">
                <div className="d-flex justify-content-between">
                  <div>
                    <h2 className="font-weight-normal text-maven text-color-tertiary text-6 pb-2 mb-0">
                      <strong className="font-weight-semibold">
                       <span className="mr-1">Edit</span>
                        {paramsId == null ? "Profile" : profileData.school_name}
                      </strong>
                    </h2>
                  </div>
                  <div className="d-flex">
                    <h2 className="text-maven text-5 mr-2 mt-1">Visible:</h2>
                    { 
                      <label className="switch">
                        <input
                          className="switch-input"
                          type="checkbox"
                          checked={toggleValue}
                          name="is_visible"
                          onChange={() =>   setToggleValue(!toggleValue)}
                        />
                        <span
                          className="switch-label"
                          data-on="Yes"
                          data-off="No"
                        ></span>
                        <span className="switch-handle"></span>
                      </label>
                    }
                  </div>
                </div>
                <div className="form-row mt-2">
                  <div className="form-group col-lg-12 col-md-12">
                    <div className="material-textfield">
                      <Field
                        placeholder=" "
                        name="school_name"
                        autoComplete="off"
                        className={`form-control eb-contact-input material-input h-3em ${
                          errors.school_name &&
                          touched.school_name &&
                          "is-invalid input-box-error"
                        }`}
                        autoFocus={true}
                      />
                      <label className="required  material-label text-uppercase text-1">
                        {t("schoolSchoolName")}
                      </label>
                    </div>
                    <ErrorMessage
                      name="school_name"
                      component="div"
                      className="field-error text-danger"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-lg-12 col-md-12">
                    <div className="material-textfield">
                      <Field
                        placeholder=" "
                        name="address"
                        autoComplete="off"
                        className={`form-control eb-contact-input material-input h-3em ${
                          errors.address &&
                          touched.address &&
                          "is-invalid input-box-error"
                        }`}
                      />
                      <label className="required  material-label text-uppercase text-1">
                        {t("restaurantAddress")}
                      </label>
                    </div>
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="field-error text-danger"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-lg-6 col-md-12">
                    <div className="material-textfield">
                      <Field
                        placeholder=" "
                        as="select"
                        name="id_province"
                        autoComplete="off"
                        className={`form-control eb-contact-input material-input h-3em ${
                          errors.id_province &&
                          touched.id_province &&
                          "is-invalid input-box-error"
                        }`}
                        value={values.id_province || ""}
                        onChange={(e) => {
                          getAllCity(e.target.value);
                          const list = { ...values };
                          list['id_province'] = e.target.value;
                          setProfileData(list);
                        }}
                      >
                        <option>select</option>
                        {province.map(({ id, province_name }, index) => (
                          <option value={id} key={index}>
                            {province_name}
                          </option>
                        ))}
                      </Field>
                      <label className="required material-label text-uppercase text-1">
                        {t("restaurantProvince")}
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-lg-6 col-md-12">
                    <div className="material-textfield">
                      <Field
                        as="select"
                        id="id_city"
                        placeholder=" "
                        name="id_city"
                        autoComplete="off"
                        className={`form-control eb-contact-input material-input h-3em ${
                          errors.id_city &&
                          touched.id_city &&
                          "is-invalid input-box-error"
                        }`}
                        value={values.id_city || ""}
                      >
                        <option>select</option>
                        {city.map(({ id, city_name }, index) => (
                          <option value={id} key={index}>
                            {city_name}
                          </option>
                        ))}
                      </Field>
                      <label className="required material-label text-uppercase text-1">
                        {t("restaurantCity")}
                      </label>
                    </div>
                    <ErrorMessage
                      name="id_city"
                      component="div"
                      className="field-error text-danger"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-lg-6 col-md-6">
                    <div className="material-textfield">
                      <Field
                        placeholder=" "
                        name="contact_person_name"
                        autoComplete="off"
                        className={`form-control eb-contact-input material-input h-3em ${
                          errors.contact_person_name &&
                          touched.contact_person_name &&
                          "is-invalid input-box-error"
                        }`}
                      />
                      <label className="required material-label text-uppercase text-1">
                        {t("schoolContactPersonName")}
                      </label>
                    </div>
                    <ErrorMessage
                      name="contact_person_name"
                      component="div"
                      className="field-error text-danger"
                    />
                  </div>

                  <div className="form-group col-lg-6 col-md-6">
                    <div className="material-textfield">
                      <InputMask
                        mask={PHONE_MASK}
                        maskChar={null}
                        placeholder=" "
                        name="contact_number"
                        autoComplete="off"
                        className={`form-control eb-contact-input material-input h-3em ${
                          errors.contact_number &&
                          touched.contact_number &&
                          "is-invalid input-box-error"
                        }`}
                        value={values.contact_number || ""}
                        onChange={(e) => {
                          const list = { ...values };
                          list['contact_number'] = e.target.value;
                          setProfileData(list);
                        }}
                      />
                      <label className="required material-label text-uppercase text-1">
                        {t("restaurantContactNumber")}
                      </label>
                    </div>
                    <ErrorMessage
                      name="contact_number"
                      component="div"
                      className="field-error text-danger"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-lg-6 col-md-6">
                    <div className="material-textfield">
                      <InputMask
                        mask={POSTAL_CODE_MASK}
                        maskChar={null}
                        value={profileData.postal_code || ""}
                        placeholder=" "
                        name="postal_code"
                        autoComplete="off"
                        className={`form-control eb-contact-input material-input h-3em ${
                          errors.postal_code &&
                          touched.postal_code &&
                          "is-invalid input-box-error"
                        }`}
                        readOnly
                      />
                      <label className="required text-uppercase material-label text-1">
                        {t("restaurantPostalCode")}
                      </label>
                    </div>
                    <ErrorMessage
                      name="postal_code"
                      component="div"
                      className="field-error text-danger"
                    />
                  </div>

                  <div className="form-group col-lg-6 col-md-6">
                    <div className="material-textfield">
                      <Field
                        placeholder=" "
                        name="fax_number"
                        autoComplete="off"
                        className={`form-control eb-contact-input material-input h-3em`}
                      />
                      <label className="material-label text-uppercase text-1">
                        {t("schoolFaxNumber")}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-lg-12 col-md-12">
                    <div className="material-textfield">
                      <Field
                        placeholder=" "
                        name="web_site_address"
                        autoComplete="off"
                        className={`form-control eb-contact-input material-input h-3em`}
                      />
                      <label className="material-label text-uppercase text-1">
                        {t("restaurantWebsite")}
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
export default SchoolProfile;
