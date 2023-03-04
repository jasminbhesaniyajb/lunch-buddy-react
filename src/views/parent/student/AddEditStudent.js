import React, { useState, useEffect } from "react";

import Aos from "aos";
import "aos/dist/aos.css";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Multiselect } from "multiselect-react-dropdown";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { history } from "../../../history";
import Loader from "../../../components/Loader";

import {
  ADD_PARENT_STUDENT,
  UPDATE_PARENT_STUDENT,
  GET_SCHOOL_DROPDOWN_LIST,
  GET_PARENT_STUDENT_BY_ID,
  GET_SCHOOL_GRADE_DROPDOWN_LIST,
  GET_ALLERGENS_LIST,
} from "../../../services/ENDPOINT";

const ParentAddStudent = (props) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const paramsId = queryString.parse(location.search).id;
  const [isloader, setLoader] = useState(false);
  const [parentId, setParentId] = useState({});
  const [student, setStudent] = useState({});
  const [allergens, setAllergens] = useState([]);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [newAllergences, setNewAllergence] = useState([]);
  const [schoolsList, setSchoolsList] = useState([]);
  const [schoolGradesList, setSchoolGradesList] = useState([]);

  const checkLoginInfo = () => {
    setParentId(localStorage.getItem("eb-mums-lunch:loginInfo"));
  };
  useEffect(() => {
    checkLoginInfo();
  }, []);

  const state = {
    options: allergens,
  };
  const state1 = {
    options: selectedAllergens,
  };
  const getAllergensList = async (allergensrecord) => {
    try {
      const data = await GET_ALLERGENS_LIST();
      if (data.code === 200 || data.code === "200") {
        setAllergens(data.data);

        if (allergensrecord != 0) {
          if (allergensrecord && allergensrecord.student_allergens.length > 0) {
            const itemArray = [];
            const tempAllergenseArray = []
            setNewAllergence([])
            for (const a of allergensrecord.student_allergens) {
              const tempAllergenObject = data.data.find((i) => i.id == a);
              if (tempAllergenObject) {
                itemArray.push(tempAllergenObject);
                onSelect([...itemArray], tempAllergenObject);
                tempAllergenseArray.push(tempAllergenObject.id)
              }
            }
            setNewAllergence(tempAllergenseArray)
            setSelectedAllergens(itemArray);
          }
        }
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const checkStudentEditInfo = async () => {
    if (paramsId) {
      try {
        const payload = paramsId;
        setLoader(true);
        const data = await GET_PARENT_STUDENT_BY_ID(payload);
        if (data.code === 200 || data.code === "200") {
          setStudent(data.data);
          getSchoolGradeList(data.data.id_school);
          getAllergensList(data.data);
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
    checkStudentEditInfo();
  }, []);

  const checkMode = () => {
    if (paramsId) {
      checkStudentEditInfo();
    } else {
      getAllergensList([]);
    }
  };

  useEffect(() => {
    checkMode();
  }, []);

  const onSelect = (selectedList, selectedItem) => {
    const tempAllergenObject = selectedList.filter((parent) => {
      return parent.id == selectedItem.id;
    });
    newAllergences.push(tempAllergenObject[0].id);
  };
  const onRemove = (selectedList, removedItem) => {
    const tempAllergens = newAllergences.filter((item) => {
      return item != removedItem.id;
    });
    setNewAllergence([]);
    setNewAllergence(tempAllergens);
  };

  const getSchoolList = async () => {
    try {
      const data = await GET_SCHOOL_DROPDOWN_LIST();
      if (data.code === 200 || data.code === "200") {
        setSchoolsList(data.data);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getSchoolList();
  }, []);

  const getSchoolGradeList = async (e) => {
    const payload = e;
    try {
      const data = await GET_SCHOOL_GRADE_DROPDOWN_LIST(payload);
      if (data.code === 200 || data.code === "200") {
        setSchoolGradesList(data.data);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  const checkAPICall = async (e) => {
    if (paramsId == null) {
      try {
        setLoader(true);
        const payload = {
          first_name: e.first_name,
          id_parent: parentId.id,
          id_school: e.id_school,
          id_school_grade_dvisions: e.id_school_grade_dvisions,
          last_name: e.last_name,
          allergens: newAllergences,
        };
        const data = await ADD_PARENT_STUDENT(payload);
        if (data.code === 200 || data.code === "200") {
          if (data.data.id) {
            toast.success(data.message);
            history.push(`/parent/student-list`);
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
          first_name: e.first_name,
          id_parent: parentId.id,
          id_school: e.id_school,
          id_school_grade_dvisions: e.id_school_grade_dvisions,
          last_name: e.last_name,
          id: paramsId,
          allergens: newAllergences,
        };
        setLoader(true);
        const data = await UPDATE_PARENT_STUDENT(payload);
        if (data.code === 200 || data.code === "200") {
          toast.success(data.message);
          history.push(`/parent/student-list`);
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
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div role="main" className="main bg-light-blue padding-top-63 mt-2">
        {isloader ? <Loader /> : null}
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-lg-6 mx-auto">
              <Formik
                enableReinitialize
                initialValues={{
                  id_parent: student.id_parent || "",
                  first_name: student.first_name || "",
                  last_name: student.last_name || "",
                  id_school: student.id_school || "",
                  id_school_grade_dvisions: student.id_school_grade_dvisions,
                }}
                validationSchema={Yup.object().shape({
                  first_name: Yup.string()
                    .min(3, t("registerValidationFirstNameMin"))
                    .max(50, t("registerValidationFirstNameMax"))
                    .required(t("registerValidationFirstNameRequired")),
                  last_name: Yup.string()
                    .min(3, t("registerValidationLastNameMin"))
                    .max(50, t("registerValidationLastNameMax"))
                    .required(t("registerValidationLastNameRequired")),
                })}
                onSubmit={async (fields) => {
                  checkAPICall(fields);
                }}
              >
                {({ errors, touched, values }) => (
                  <Form className="contact-form border-radius-7 box-shadow-black">
                    <div className="col-lg-12 text-center">
                      <h2 className="font-weight-normal text-maven text-color-primary text-6 pb-2 mb-0">
                        {paramsId == null && (
                          <strong className="font-weight-semibold">
                            {t("studentAddAccountRegistration")}
                          </strong>
                        )}
                        {paramsId && (
                          <strong className="font-weight-semibold">
                            Edit - {student.first_name} {student.last_name}
                          </strong>
                        )}
                      </h2>
                    </div>
                    <div className="form-row mt-3">
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
                            autoFocus
                          />
                          <label className="material-label required text-uppercase">
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
                            id="lastName"
                            placeholder=" "
                            name="last_name"
                            autoComplete="off"
                            className={`form-control eb-contact-input material-input h-3em ${
                              errors.last_name &&
                              touched.last_name &&
                              "is-invalid input-box-error"
                            }`}
                          />
                          <label className="material-label required text-uppercase">
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
                      <div className="form-group  col-lg-6 col-md-6">
                        <div className="material-textfield">
                          <Field
                            as="select"
                            id="id_school"
                            placeholder=" "
                            name="id_school"
                            autoComplete="off"
                            className={`form-control eb-contact-input material-input h-3em ${
                              errors.id_school &&
                              touched.id_school &&
                              "is-invalid input-box-error"
                            }`}
                            value={values.id_school}
                            onChange={(e) => {
                              getSchoolGradeList(e.target.value);
                              const list = { ...values };
                              list["id_school"] = e.target.value;
                              setStudent(list);
                            }}
                          >
                            <option>select</option>
                            {schoolsList.map(({ id, school_name }, index) => (
                              <option
                                onClick={() => console.log("trr")}
                                value={id}
                                key={index}
                              >
                                {school_name}
                              </option>
                            ))}
                          </Field>
                          <label className="material-label required text-uppercase">
                            {t("studentSchoolId")}
                          </label>
                        </div>
                        <ErrorMessage
                          name="id_school"
                          component="div"
                          className="field-error text-danger"
                        />
                      </div>
                      <div className="form-group col-lg-6 col-md-6">
                        <div className="material-textfield">
                          <Field
                            as="select"
                            id="id_school_grade_dvisions"
                            placeholder=" "
                            name="id_school_grade_dvisions"
                            autoComplete="off"
                            className={`form-control eb-contact-input material-input h-3em ${
                              errors.id_school_grade_dvisions &&
                              touched.id_school_grade_dvisions &&
                              "is-invalid input-box-error"
                            }`}
                          >
                            <option>select</option>
                            {schoolGradesList.map(
                              ({ id, grade_division_name }, index) => (
                                <option value={id} key={index}>
                                  {grade_division_name}
                                </option>
                              )
                            )}
                          </Field>
                          <label className="material-label required text-uppercase">
                            {t("studentSchoolGrade")}
                          </label>
                        </div>
                        <ErrorMessage
                          name="id_school_grade_dvisions"
                          component="div"
                          className="field-error text-danger"
                        />
                      </div>
                    </div>
                    <div className="divider my-3">
                      <span className="bg-light w-40 px-3 mt-2 text-2 text-color-grey position-absolute allergens-divider">
                        Allergens
                      </span>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-lg-12 col-md-12">
                        <Multiselect
                          selectedValues={state1.options}
                          options={state.options}
                          showCheckbox={true}
                          placeholder="SELECT ALLERGEN(S)"
                          displayValue="allergen"
                          onSelect={onSelect}
                          onRemove={onRemove}
                          closeOnSelect={false}
                        />
                      </div>
                    </div>
                    <div className="form-row text-center">
                      <div className="form-group col mb-0 mt-2">
                        <input
                          type="submit"
                          value="Save"
                          className="btn btn-dark btn-modern text-capitalize bg-dark-blue mr-2"
                        />
                        <Link to={"/parent/student-list"}>
                          <input
                            type="button"
                            value="Cancel"
                            className="btn btn-dark text-capitalize btn-modern bg-dark-blue"
                          />
                        </Link>
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
export default ParentAddStudent;
