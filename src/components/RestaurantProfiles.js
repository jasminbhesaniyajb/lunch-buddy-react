import React, { useState, useEffect } from "react";
import NoImgAvailable from "../assets/img/no-image.jpg";

import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import Dropzone from "react-dropzone";
import { useTranslation } from "react-i18next";
import queryString from "query-string";
import { history } from "../history";

import Loader from "./Loader";
import HmImage from "../components/core/image";

import {
  GET_ADMIN_PROFILE,
  UPDATE_RESTAURANT_PROFILE,
  GET_CITY,
  GET_PROVINCE,
  GET_RESTAURANT,
  GET_RESTAURANT_BY_ID,
  UPDATE_RESTAURANT,
  GET_PAYMENT_FREQUENCY,
  ADD_IMAGE,
  DELETE_IMAGE,
} from "../services/ENDPOINT";

import {
  PHONE_MASK,
  POSTAL_CODE_MASK,
  ALLOWED_IMAGE_TYPES,
  PROFILE_IMAGE_ALLOWED_SIZE_KB,
  APP_IMAGE_BASE_URL,
} from "../config";
import { GenerateRandomString } from "../common";

const RestaurantProfile = (props) => {
  const { t } = useTranslation();
  const paramsId = queryString.parse(location.search).id;
  const [isloader, setLoader] = useState(false);
  const [isImageLoader, setIsImageLoader] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [city, setCity] = useState([]);
  const [province, setProvince] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [toggleValue, setToggleValue] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [fileNames, setFileNames] = useState([]);
  const [paymentFrequency, setPaymentFrequency] = useState([]);
  const [selectImg, setSelectImg] = useState(null);
  const [imageDetails, setImageDetails] = useState({});
  const [imgId, setimgId] = useState();

  const getRestaurantProfile = async (e) => {
    if (paramsId == null) {
      try {
        setLoader(true);
        const data = await GET_ADMIN_PROFILE();
        if (data.code === 200 || data.code === "200") {
          setProfileData(data.data);
          getAllCity(data.data.id_province);
          setSelectImg(data.data.restaurant_image?.image_path);
          setimgId(data.data.id_image);
          if (data.data.is_visible == "0") {
            setToggleValue(false);
          } else {
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
        const data = await GET_RESTAURANT_BY_ID(payload);
        if (data.code === 200 || data.code === "200") {
          setProfileData(data.data[0]);
          getAllCity(data.data[0].id_province);
          setSelectImg(data.data[0].restaurant_image?.image_path);
          setimgId(data.data[0].id_image);
          if (data.data[0].is_visible == "0") {
            setToggleValue(false);
          } else {
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
    getRestaurantProfile();
    return () => {
      setProfileData();
    };
  }, []);
  const checkAPICall = async (e) => {
    if (paramsId == null) {
      try {
        const payload = {
          user_id: e.user_id,
          id_franchise: e.id_franchise,
          restaurant_name: e.restaurant_name,
          first_name: e.first_name,
          last_name: e.last_name,
          address: e.address,
          id_province: e.id_province,
          id_city: e.id_city,
          id_payment_frequency: e.id_payment_frequency,
          postal_code: e.postal_code,
          distance: e.distance,
          web_site_address: e.web_site_address,
          primary_contact_number: e.primary_contact_number,
          emergency_contact_number: e.emergency_contact_number,
          is_visible: toggleValue === false ? "0" : "1",
          id_image: imageDetails.id,
        };
        setLoader(true);
        const data = await UPDATE_RESTAURANT_PROFILE(payload);
        if (data.code === 200 || data.code === "200") {
          props.addMainLoginInfoHandler(data.data);
          toast.success(data.message);
          if (imgId !== null) {
            deleteImage(imgId);
          }
          setShowProfile(false);
          getRestaurantProfile();
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
          id: paramsId,
          user_id: e.user_id,
          id_franchise: e.id_franchise,
          restaurant_name: e.restaurant_name,
          first_name: e.first_name,
          last_name: e.last_name,
          address: e.address,
          id_province: e.id_province,
          id_city: e.id_city,
          id_payment_frequency: e.id_payment_frequency,
          postal_code: e.postal_code,
          distance: e.distance,
          web_site_address: e.web_site_address,
          primary_contact_number: e.primary_contact_number,
          emergency_contact_number: e.emergency_contact_number,
          is_visible: toggleValue === false ? "0" : "1",
          id_image: imageDetails.id,
        };
        setLoader(true);
        const data = await UPDATE_RESTAURANT(payload);
        if (data.code === 200 || data.code === "200") {
          toast.success(data.message);
          if (imgId !== null) {
            deleteImage(imgId);
          }
          history.push("/admin/restaurant-list");
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

  const getAllPaymentFrequency = async () => {
    try {
      const data = await GET_PAYMENT_FREQUENCY();
      if (data.code === 200 || data.code === "200") {
        setPaymentFrequency(data.data);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const getAllRestaurant = async () => {
    try {
      const data = await GET_RESTAURANT();
      if (data.code === 200 || data.code === "200") {
        setRestaurant(data.data);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getAllProvince();
  }, []);
  useEffect(() => {
    getAllRestaurant();
  }, []);
  useEffect(() => {
    getAllPaymentFrequency();
  }, []);

  const handleDrop = async (acceptedFiles) => {
    for (var i = 0; i < ALLOWED_IMAGE_TYPES.length; i++) {
      for (var j = 0; j < acceptedFiles.length; j++) {
        if (acceptedFiles[j].size <= PROFILE_IMAGE_ALLOWED_SIZE_KB) {
          if (acceptedFiles[j].type == ALLOWED_IMAGE_TYPES[i]) {
            setFileNames(acceptedFiles[j].name);
            const reader = new FileReader();
            reader.onload = (e) => {
              const image = e.target.result;
            };
            reader.readAsDataURL(acceptedFiles[0]);
            var name = GenerateRandomString(15);
          }
        }
      }
    }

    let formData = new FormData();
    formData.append("image", acceptedFiles[0]);
    formData.append("vendorId", profileData.id);
    formData.append("ftype", 1);
    try {
      setSelectImg(null);
      setIsImageLoader(true);
      const data = await ADD_IMAGE(formData);
      if (data.code === 200 || data.code === "200") {
        setImageDetails(data.data);
        setSelectImg(data.data.image_path);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    } finally {
      setIsImageLoader(false);
    }
  };

  const deleteImage = async (recordId) => {
    const payload = { id: recordId };
    try {
      const data = await DELETE_IMAGE(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  return (
    <React.Fragment>
      <section className="container-fluid bg-light-blue px-0">
        {isloader ? <Loader /> : null}
        <div>
          <Formik
            enableReinitialize
            initialValues={{
              user_id: profileData.user_id || "",
              id_franchise: profileData.id_franchise || null,
              restaurant_name: profileData.restaurant_name || "",
              first_name: profileData.first_name || "",
              last_name: profileData.last_name || "",
              address: profileData.address || "",
              id_province: profileData.id_province || "",
              id_city: profileData.id_city || "",
              id_payment_frequency: profileData.id_payment_frequency || null,
              postal_code: profileData.postal_code || "",
              distance: 100 || "",
              web_site_address: profileData.web_site_address || "",
              primary_contact_number: profileData.primary_contact_number || "",
              emergency_contact_number:
                profileData.emergency_contact_number || "",
              is_visible: toggleValue || "",
            }}
            validationSchema={Yup.object().shape({
              id_province: Yup.string().required(
                t("restaurantValidationProvinceRequired")
              ),
              id_city: Yup.string().required(
                t("restaurantValidationCityRequired")
              ),
              first_name: Yup.string()
                .max(30, t("registerValidationFirstNameMax"))
                .required(t("registerValidationFirstNameRequired")),
              last_name: Yup.string()
                .max(30, t("registerValidationFirstNameMax"))
                .required(t("registerValidationLastNameRequired")),
              address: Yup.string()
                .min(5, t("restaurantValidationAddressMin"))
                .max(100, t("restaurantValidationAddressMax"))
                .required(t("restaurantValidationAddressRequired")),
              postal_code: Yup.string()
                .min(3, t("restaurantValidationPostalCodeMin"))
                .max(10, t("restaurantValidationPostalCodeMax"))
                .required(t("restaurantValidationPostalCodeRequired")),
              // distance: Yup.number()
              //   .min(1, t("restaurantValidationDistanceMin"))
              //   .max(200, t("restaurantValidationDistanceMax"))
              //   .required(t("restaurantValidationDistanceRequired")),
              primary_contact_number: Yup.string()
                .min(7, t("restaurantValidationContactNumberMin"))
                .max(17, t("restaurantValidationContactNumberMax"))
                .required(t("restaurantValidationContactNumberRequired")),
              emergency_contact_number: Yup.string()
                .min(7, t("restaurantValidationContactNumberMin"))
                .max(17, t("restaurantValidationContactNumberMax"))
                .required(
                  t("restaurantValidationEmergencyContactNumberRequired")
                ),
              restaurant_name: Yup.string().required(
                t("restaurantValidationRestaurantNameRequired")
              ),
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
                        {paramsId == null
                          ? "Profile"
                          : profileData.restaurant_name}
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
                          onChange={() => setToggleValue(!toggleValue)}
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
                <div className="form-row">
                  <div className="form-group col-lg-12 col-md-12">
                    <div className="material-textfield">
                      <Field
                        placeholder=" "
                        as="select"
                        name="id_franchise"
                        autoComplete="off"
                        className={`form-control eb-contact-input material-input h-3em ${
                          errors.id_franchise &&
                          touched.id_franchise &&
                          "is-invalid input-box-error"
                        }`}
                        autoFocus
                        value={values.id_franchise || ""}
                        onChange={(e) => {
                          const list = { ...values };
                          list["id_franchise"] =
                            e.target.value == "Select" ? null : e.target.value;
                          setProfileData(list);
                        }}
                      >
                        <option value={null}>Select</option>
                        {restaurant.map(({ id, franchise_name }, index) => (
                          <option value={id} key={index}>
                            {franchise_name}
                          </option>
                        ))}
                      </Field>
                      <label className="material-label text-uppercase text-1">
                        {t("restaurantFranchiseName")}
                      </label>
                    </div>
                    <ErrorMessage
                      name="id_franchise"
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
                        name="restaurant_name"
                        autoComplete="off"
                        className={`form-control eb-contact-input material-input h-3em ${
                          errors.restaurant_name &&
                          touched.restaurant_name &&
                          "is-invalid input-box-error"
                        }`}
                      />
                      <label className="required material-label text-uppercase text-1">
                        {t("restaurantRestaurantName")}
                      </label>
                    </div>
                    <ErrorMessage
                      name="restaurant_name"
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
                        name="first_name"
                        autoComplete="off"
                        className={`form-control eb-contact-input material-input h-3em ${
                          errors.first_name &&
                          touched.first_name &&
                          "is-invalid input-box-error"
                        }`}
                      />
                      <label className="required material-label text-uppercase text-1">
                        {t("registerFirstName")}
                      </label>
                    </div>
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="field-error text-danger"
                    />
                  </div>
                  <div className="form-group col-lg-6 col-md-6">
                    <div className="material-textfield">
                      <Field
                        placeholder=" "
                        name="last_name"
                        autoComplete="off"
                        className={`form-control eb-contact-input material-input h-3em ${
                          errors.last_name &&
                          touched.last_name &&
                          "is-invalid input-box-error"
                        }`}
                      />
                      <label className="required material-label text-uppercase text-1">
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
                  <div className="form-group col-lg-6 col-md-6 col-sm-12">
                    <div className="material-textfield">
                      <InputMask
                        mask={PHONE_MASK}
                        maskChar={null}
                        value={profileData.primary_contact_number || ""}
                        placeholder=" "
                        name="primary_contact_number"
                        autoComplete="off"
                        className={`form-control eb-contact-input material-input h-3em ${
                          errors.primary_contact_number &&
                          touched.primary_contact_number &&
                          "is-invalid input-box-error"
                        }`}
                        onChange={(e) => {
                          const list = { ...values };
                          list["primary_contact_number"] = e.target.value;
                          setProfileData(list);
                        }}
                      />
                      <label className="required material-label text-uppercase text-1">
                        {t("restaurantContactNumber")}
                      </label>
                    </div>
                    <ErrorMessage
                      name="primary_contact_number"
                      component="div"
                      className="field-error text-danger"
                    />
                  </div>
                  <div className="form-group col-lg-6 col-md-6 col-sm-12">
                    <div className="material-textfield">
                      <InputMask
                        mask={PHONE_MASK}
                        maskChar={null}
                        value={profileData.emergency_contact_number || ""}
                        placeholder=" "
                        name="emergency_contact_number"
                        autoComplete="off"
                        className={`form-control eb-contact-input material-input h-3em ${
                          errors.emergency_contact_number &&
                          touched.emergency_contact_number &&
                          "is-invalid input-box-error"
                        }`}
                        onChange={(e) => {
                          const list = { ...values };
                          list["emergency_contact_number"] = e.target.value;
                          setProfileData(list);
                        }}
                      />
                      <label className="required material-label text-uppercase text-1">
                        {t("restaurantEmergencyContactNumber")}
                      </label>
                    </div>
                    <ErrorMessage
                      name="emergency_contact_number"
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
                      <label className="required material-label text-uppercase text-1">
                        {t("restaurant Adress")}
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
                  <div className="form-group col-lg-6 col-md-6">
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
                          list["id_province"] = e.target.value;
                          setProfileData(list);
                        }}
                      >
                        <option>Select</option>
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
                    <ErrorMessage
                      name="id_province"
                      component="div"
                      className="field-error text-danger"
                    />
                  </div>
                  <div className="form-group col-lg-6 col-md-6">
                    <div className="material-textfield">
                      <Field
                        placeholder=" "
                        as="select"
                        name="id_city"
                        autoComplete="off"
                        className={`form-control eb-contact-input material-input h-3em ${
                          errors.id_city &&
                          touched.id_city &&
                          "is-invalid input-box-error"
                        }`}
                        value={values.id_city || ""}
                      >
                        <option>Select</option>
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
                      <label className="required material-label text-uppercase text-1">
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
                        as="select"
                        name="id_payment_frequency"
                        autoComplete="off"
                        className={`form-control eb-contact-input material-input h-3em`}
                        value={values.id_payment_frequency || ""}
                        onChange={(e) => {
                          const list = { ...values };
                          list["id_payment_frequency"] =
                            e.target.value == "Select" ? null : e.target.value;
                          setProfileData(list);
                        }}
                      >
                        <option value={null}>Select</option>
                        {paymentFrequency.map(({ id, frequency }, index) => (
                          <option value={id} key={index}>
                            {frequency}
                          </option>
                        ))}
                      </Field>
                      <label className="material-label text-uppercase text-1">
                        Payment Frequency
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
                <div className="form-row">
                  <div className="form-group col-lg-12 col-md-12">
                    <div className="border-light-gray p-3 border-radius-7">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div>
                            <Dropzone onDrop={handleDrop}>
                              {({
                                getRootProps,
                                getInputProps,
                                isDragAccept,
                              }) => {
                                const additionalClass = isDragAccept
                                  ? "isDragAccept"
                                  : null;

                                return (
                                  <div
                                    {...getRootProps({
                                      className: `dropzone drag-drop-sec cursor-pointer d-flex justify-content-center align-items-center ${additionalClass}`,
                                    })}
                                  >
                                    <input {...getInputProps()} />

                                    <p className="mb-0">
                                      Click to browse or <br /> drag and drop
                                      file here.
                                    </p>
                                  </div>
                                );
                              }}
                            </Dropzone>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 margin-top-sm-12">
                          <div>
                            {isImageLoader && (
                              <div className="d-flex justify-content-center align-items-center w-100 h-100">
                                <i className="fa fa-spinner fa-pulse fa-4x fa-fw color-admin-theme" />
                                <span className="sr-only">Loading...</span>
                              </div>
                            )}
                            {isImageLoader === false && selectImg ? (
                              <HmImage
                                src={selectImg}
                                width="100%"
                                height="135px"
                                className={"drag-drop-img"}
                              />
                            ) : (
                              isImageLoader === false && (
                                <img
                                  src={NoImgAvailable}
                                  width="100%"
                                  className={"drag-drop-img"}
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>
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
                      onClick={() => props.closeEditProfile(false)}
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
export default RestaurantProfile;
