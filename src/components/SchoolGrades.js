import React, { useState, useEffect } from "react";

import DeleteIcon from "../assets/img/icons/delete-icon.svg";
import ActiveIcon from "../assets/img/icons/active-icon.png";
import InActiveIcon from "../assets/img/icons/inactive-icon.png";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import ConformationMenuDeleteModal from "../components/ConformationMenuDeleteModal";

const AddSchoolGrade = (props) => {  
  const [gradeDivisionId, setGradeDivisionId] = useState([]);
  const [idSchoolTeacher, setIdSchoolTeacher] = useState();
  const [
    showConformationMasterDeleteModal,
    setShowConformationMasterDeleteModal,
  ] = useState(false);
  const [schooGradeId, setSchooGradeId] = useState();
  const openConformationSchoolGradeDeleteModal = (recordId) => {
    setSchooGradeId(recordId);
    setShowConformationMasterDeleteModal(true);
  };

  const deleteMenuItem = () => {
    props.deleteSchoolGrade(schooGradeId);
    setShowConformationMasterDeleteModal(false);
  };

  return (
    <React.Fragment>
      {Object.keys(props.schoolGradesItems).length === 0 ? (
        <div className="row mx-auto">
          <div className="col-lg-10 col-md-9 col-sm-12">
            <Formik
              enableReinitialize
              initialValues={{
                id_school_teacher: idSchoolTeacher || "",
                grade: "",
              }}
              validationSchema={Yup.object().shape({
                id_school_teacher: Yup.string().required("Teacher is required"),
              })}
              onSubmit={async (fields) => {
                checkAPICall(fields);
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <div className="form-row">
                    <div className="form-group col-lg-6 col-md-8 col-sm-12">
                      <div className="material-textfield">
                        <Field
                          placeholder=" "
                          as="select"
                          id={"id_school_teacher" + props.count}
                          name="id_school_teacher"
                          autoComplete="off"
                          className={`form-control eb-contact-input material-input h-3em ${
                            errors.id_school_teacher &&
                            touched.id_school_teacher &&
                            "is-invalid input-box-error"
                          }`}
                          value={values.idSchoolTeacher}
                          onChange={(e) => props.handleEvent(e)}
                        >
                          <option value="">Select</option>
                          {props.teachersList.map(
                            ({ id, teacher_name }, index) => (
                              <option value={id} key={index}>
                                {teacher_name}
                              </option>
                            )
                          )}
                        </Field>
                        <label className="material-label required text-uppercase text-1">
                          Select Teacher
                        </label>
                      </div>
                      <ErrorMessage
                        name="id_school_teacher"
                        component="div"
                        className="field-error text-danger"
                      />
                    </div>
                    <div className="form-group col-lg-2 col-md-4 col-sm-12 mb-sm-0">
                      <div className="material-textfield">
                        <Field
                          id={"grade" + props.count}
                          placeholder=" "
                          name="grade"
                          autoComplete="off"
                          className={`form-control w-100 eb-contact-input material-input h-3em`}
                          value={values.grade}
                          onChange={(e) => props.handleGradeDivision(e)}
                        />
                        <label className="material-label text-uppercase text-1">
                          Grade
                        </label>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-12 pr-0 mb-3">
            <img className="mr-2" src={ActiveIcon} alt="" width="35" />
            <img src={DeleteIcon} title="Remove" alt="" width="24" />
          </div>
        </div>
      ) : (
        props.schoolGradesItems.school_grade_divisions.map((item, index) => (
          <div className="row mx-auto" key={index}>
            <div className="col-lg-10 col-md-9 col-sm-12">
              <Formik
                enableReinitialize
                initialValues={{
                  id_school_teacher: item.id_teacher || "",
                  grade: item.division_name || "",
                }}
                validationSchema={Yup.object().shape({
                  id_school_teacher: Yup.string().required(
                    "Teacher is required"
                  ),
                })}
                onSubmit={async (fields) => {
                  checkAPICall(fields);
                }}
              >
                {({ errors, touched, values }) => (
                  <Form>
                    <div className="form-row">
                      <div className="form-group col-lg-6 col-md-8 col-sm-12">
                        <div className="material-textfield">
                          <Field
                            placeholder=" "
                            as="select"
                            id={"id_school_teacher" + item.id}
                            name="id_school_teacher"
                            autoComplete="off"
                            className={`form-control eb-contact-input material-input h-3em ${
                              errors.id_school_teacher &&
                              touched.id_school_teacher &&
                              "is-invalid input-box-error"
                            }`}
                            value={values.id_school_teacher}
                            onChange={(e) => props.handleEvent(e)}
                          >
                            <option value="">Select</option>
                            {props.teachersList.map(
                              ({ id, teacher_name }, index) => (
                                <option value={id} key={index}>
                                  {teacher_name}
                                </option>
                              )
                            )}
                          </Field>
                          <label className="material-label required text-uppercase text-1">
                            Select Teacher
                          </label>
                        </div>
                        <ErrorMessage
                          name="id_school_teacher"
                          component="div"
                          className="field-error text-danger"
                        />
                      </div>
                      <div className="form-group col-lg-2 col-md-4 col-sm-12 mb-sm-0">
                        <div className="material-textfield">
                          <Field
                            id={"grade" + item.id}
                            placeholder=" "
                            name="grade"
                            autoComplete="off"
                            className={`form-control w-100 eb-contact-input material-input h-3em ${
                              errors.grade &&
                              touched.grade &&
                              "is-invalid input-box-error"
                            }`}
                            value={values.grade}
                            onChange={(e) => props.handleGradeDivision(e)}
                          />
                          <label className="material-label text-uppercase text-1">
                            Division
                          </label>
                        </div>
                        <ErrorMessage
                          name="grade"
                          component="div"
                          className="field-error text-danger"
                        />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-12 pr-0 mb-3">
              {item && item.is_active && (
                <span>
                  {Number(item.is_active) === 0 && (
                    <img
                      className="cursor-pointer mr-2"
                      title="Inactive"
                      src={InActiveIcon}
                      onClick={() => props.changeActiveDeactive(item)}
                      alt=""
                      width="35"
                    />
                  )}
                  {Number(item.is_active) === 1 && (
                    <img
                      className="cursor-pointer mr-2"
                      title="Active"
                      src={ActiveIcon}
                      onClick={() => props.changeActiveDeactive(item)}
                      alt=""
                      width="35"
                    />
                  )}
                </span>
              )}
              <img
                className="cursor-pointer"
                src={DeleteIcon}
                onClick={(e) => openConformationSchoolGradeDeleteModal(item.id)}
                title="Remove"
                alt=""
                width="24"
              />
            </div>
          </div>
        ))
      )}
      {showConformationMasterDeleteModal && (
        <ConformationMenuDeleteModal
          closeModal={() => setShowConformationMasterDeleteModal(false)}
          deleteMenuItem={() => deleteMenuItem()}
          deleteMessage={"You are about to delete school grade."}
        />
      )}
    </React.Fragment>
  );
};

export default AddSchoolGrade;
