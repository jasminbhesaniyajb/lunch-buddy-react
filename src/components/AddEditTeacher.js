import React, { useState, useEffect } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import queryString from "query-string";
import { Link } from "react-router-dom";

import { history } from "../history";
import Loader from "../components/Loader";

import InputMask from "react-input-mask";
import { PHONE_MASK } from "../config";

import {
  ADD_TEACHER,
  UPDATE_TEACHER,
  GET_TEACHER_BY_ID,
} from "../services/ENDPOINT";

const SchoolAddEditTeacher = (props) => {
  const paramsId = queryString.parse(location.search).id;
  const [isloader, setLoader] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const schoolId = queryString.parse(location.search).schoolId;
  const schoolName = queryString.parse(location.search).schoolName;
  const profile = props.profile;

  const checkAPICall = async (e) => {
    if (paramsId == null && profile == null) {
      try {
        setLoader(true);
        const payload = {
          teacher_name: e.teacher_name,
          contact_number: e.contact_number,
          email_address: e.email_address,
          id_school: schoolId ? schoolId : props.data.loginInfo.id,
        };
        const data = await ADD_TEACHER(payload);
        if (data.code === 200 || data.code === "200") {
          if (data.data.id) {
            toast.success(data.message);
            if (schoolId) {
              history.push(
                `/admin/teacher-list?schoolId=${schoolId}&schoolName=${schoolName}`
              );
            } else {
              history.push(`/school/teacher-list`);
            }
          } else {
            toast.error(data.message);
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
        const payload = {
          id: paramsId ? paramsId : props.data.loginInfo.id,
          teacher_name: e.teacher_name,
          contact_number: e.contact_number,
          email_address: e.email_address,
          id_school: schoolId ? schoolId : teachers.id_school,
        };
        setLoader(true);
        const data = await UPDATE_TEACHER(payload);
        if (data.code === 200 || data.code === "200") {
          toast.success(data.message);
          if (schoolId) {
            history.push(
              `/admin/teacher-list?schoolId=${schoolId}&schoolName=${schoolName}`
            );
          } else if (profile) {
            history.push(`/teacher/dashboard`);
          } else {
            history.push(`/school/teacher-list`);
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

  const checkTeacherEditInfo = async () => {
    if (paramsId || profile) {
      try {
        const payload = paramsId ? paramsId : props.data.loginInfo.id;
        setLoader(true);
        const data = await GET_TEACHER_BY_ID(payload);
        if (data.code === 200 || data.code === "200") {
          setTeachers(data.data);
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
    checkTeacherEditInfo();
  }, []);

  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div
        className={
          "container-fluid bg-light-blue" +
          " " +
          (schoolId ? "padding-top-63 px-0" : " ") +
          " " +
          (paramsId ? "padding-top-63 px-0" : "padding-top-63 px-0") +
          " " +
          (profile ? "pt-0 px-0" : "")
        }
      >
        {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          <div
            className={
              "col-sm-12 col-md-12 col-lg-12" +
              " " +
              (profile ? "px-0" : "mt-5")
            }
          >
            <div className={profile == null ? "card-table" : null}>
              {profile == null && (
                <div className="table-header-sec bg-dark-blue d-flex justify-content-between align-items-center">
                  <div>
                    {paramsId == null ? (
                      <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                        Add Teacher
                        {schoolId && <span className="mx-1">|</span>}
                        {schoolId && (
                          <span className="text-color-tertiary font-weight-semibold text-3">
                            {schoolName}
                          </span>
                        )}
                      </h3>
                    ) : (
                      <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                        Edit {teachers.teacher_name}
                        {schoolId && <span className="mx-1">|</span>}
                        <span className="text-color-tertiary font-weight-semibold text-3">{schoolName}</span>
                      </h3>
                    )}
                  </div>
                </div>
              )}
              <Formik
                enableReinitialize
                initialValues={{
                  teacher_name: teachers.teacher_name || "",
                  email_address: teachers.email_address || "",
                  contact_number: teachers.contact_number || null,
                }}
                validationSchema={Yup.object().shape({
                  teacher_name: Yup.string()
                    .min(3, "Teacher Name must be 3 characters!")
                    .max(75, "Teacher Name must be 75 characters!")
                    .required("Teacher name is required"),
                  email_address: Yup.string()
                    .max(75, "Email must be 75 characters!")
                    .email(t("loginvalidationEmail"))
                    .required("Email Address is required"),
                  contact_number: Yup.string()
                    .min(8, t("registerValidationContactMin"))
                    .max(20, t("registerValidationContactMax"))
                })}
                onSubmit={async (fields) => {
                  checkAPICall(fields);
                }}
              >
                {({ errors, touched, values }) => (
                  <Form
                    className={
                      profile == null
                        ? null
                        : "contact_number-form contact-form border-radius-7 box-shadow-black"
                    }
                  >
                    <div className="col-lg-12 text-center">
                      <h2 className="font-weight-normal text-maven text-color-primary text-6 pb-2 mb-0">
                        {profile && (
                          <strong className="font-weight-semibold">
                            Edit - {teachers.teacher_name}
                          </strong>
                        )}
                      </h2>
                    </div>
                    <div className="form-row mt-3">
                      <div className="form-group col-lg-6 col-md-6">
                        <div className="material-textfield">
                          <Field
                            id="teacher_name"
                            placeholder=" "
                            name="teacher_name"
                            autoComplete="off"
                            className={`form-control eb-contact-input material-input h-3em ${
                              errors.teacher_name &&
                              touched.teacher_name &&
                              "is-invalid input-box-error"
                            }`}
                            autoFocus
                          />
                          <label className="material-label required text-uppercase">
                            Teacher Name
                          </label>
                        </div>
                        <ErrorMessage
                          name="teacher_name"
                          component="div"
                          className="field-error text-danger"
                        />
                      </div>
                      <div className="form-group col-lg-6 col-md-6">
                        <div className="material-textfield">
                          <Field
                            id="email_address"
                            placeholder=" "
                            name="email_address"
                            autoComplete="off"
                            className={`form-control eb-contact-input material-input h-3em ${
                              errors.email_address &&
                              touched.email_address &&
                              "is-invalid input-box-error"
                            }`}
                            readOnly={paramsId || profile ? true : false}
                          />
                          <label className="material-label required text-uppercase">
                            Email Address
                          </label>
                        </div>
                        <ErrorMessage
                          name="email_address"
                          component="div"
                          className="field-error text-danger"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-lg-6 col-md-6">
                        <div className="material-textfield">
                          <InputMask
                            mask={PHONE_MASK}
                            maskChar={null}
                            value={teachers.contact_number || null}
                            placeholder=" "
                            name="contact_number"
                            autoComplete="off"
                            className={`form-control eb-contact-input material-input h-3em`}
                            onChange={(e) => {
                              const list = { ...values };
                              list["contact_number"] = e.target.value == "" ? null : e.target.value;
                              setTeachers(list);
                            }}
                          />
                          <label className="material-label text-uppercase">
                            Contact Number
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-row text-center">
                      <div className="form-group col mb-0 mt-2">
                        <input
                          type="submit"
                          value="Save"
                          className="btn btn-dark btn-modern bg-dark-blue mr-2"
                        />
                        {profile ? (
                          <input
                            type="button"
                            value="Cancel"
                            className="btn btn-dark btn-modern bg-dark-blue"
                            onClick={() => props.closeEditProfile(false)}
                          />
                        ) : (
                          <Link
                            to={
                              schoolId
                                ? `/admin/teacher-list?schoolId=${schoolId}&schoolName=${schoolName}`
                                : `/school/teacher-list`
                            }
                          >
                            <input
                              type="button"
                              value="Cancel"
                              className="btn btn-dark btn-modern bg-dark-blue"
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default SchoolAddEditTeacher;
