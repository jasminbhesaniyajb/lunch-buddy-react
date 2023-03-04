import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import queryString from "query-string";
import { Link } from "react-router-dom";

import GradesPromotionModal from "./GradesPromotionModal";

import { history } from "../history";

import {
  GET_ALL_GRADES_LIST,
  FETCH_SCHOOL_GRADE_DIVISION_BY_GRADE_ID,
  GET_ALL_STUDENT_GRADE_PROMOTION,
  ADD_STUDENT_GRADE_PROMOTION,
} from "../services/ENDPOINT";

const StudentGradePromotion = (props) => {
  const [gradesList, setGradesList] = useState([]);
  const [showGradesPromotionModal, setShowGradesPromotionModal] =
    useState(false);
  const [fromGradeDivision, setFromGradeDivision] = useState([]);
  const [toGradeDivision, setToGradeDivision] = useState([]);
  const [gradePromotionStudentList, setGradePromotionStudentList] = useState(
    []
  );
  const [toSchoolGradeName, setToSchoolGradeName] = useState("");
  const [toGradeDivisionTableId, setToGradeDivisionTableId] = useState([]);
  const [toGradeDivisionName, setToGradeDivisionName] = useState("");
  const [toGradeDivisionNameTable, setToGradeDivisionNameTable] = useState("");
  const [checkAll, setCheckAll] = useState(false);
  const paramsId = queryString.parse(location.search).schoolId;
  const schoolName = queryString.parse(location.search).schoolName;
  let [selectValueFromGrade, setSelectValueFromGrade] = useState();
  let [selectValueTo, setSelectValueTo] = useState();
  let [selectValueFromGradeDivision, setSelectValueFromGradeDivision] = useState();
  let [selectValueDivisionName, setSelectValueDivisionName] = useState();
  let [selectValue, setSelectValue] = useState();

  const getAllSchoolGradesList = async () => {
    try {
      const data = await GET_ALL_GRADES_LIST();
      if (data.code === 200 || data.code === "200") {
        setGradesList(data.data);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getAllSchoolGradesList();
    return () => {
      setGradesList();
    };
  }, []);

  const getAllGradeDivision = async (recordId, fromToGrade) => {
    const payload = {
      schoolId: paramsId ? paramsId : props.data.loginInfo.id,
      gradeId: recordId,
    };
    var numberOrNot = isNaN(recordId);
    try {
      var data = {};
      if (numberOrNot == false) {
        data = await FETCH_SCHOOL_GRADE_DIVISION_BY_GRADE_ID(payload);
      } else if (fromToGrade == "fromGrade") {
        setFromGradeDivision([]);
        setGradePromotionStudentList([]);
      } else {
        setToGradeDivision([]);
      }
      if (data.code === 200 || data.code === "200") {
        if (fromToGrade == "fromGrade") {
          setFromGradeDivision(data.data);
        } else {
          setToGradeDivision(data.data);
        }
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const getStudentGradePromotion = async (e) => {
    const payload = {
      schoolId: paramsId ? paramsId : props.data.loginInfo.id,
      gradeDivisonId: e.target.value,
    };
    try {
      const data = await GET_ALL_STUDENT_GRADE_PROMOTION(payload);
      if (data.code === 200 || data.code === "200") {
        for (var i = 0; i < data.data.length; i++) {
          const record = {
            first_name: data.data[i].first_name,
            grade_division_name: data.data[i].grade_division_name,
            grade_name: data.data[i].grade_name,
            id_school_grade_division: data.data[i].id_school_grade_division,
            id_student: data.data[i].id_student,
            last_name: data.data[i].last_name,
            checked: true,
          };
          gradePromotionStudentList.push(record);
        }
        if (data.data.length !== 0) {
          setCheckAll(true);
        }
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  const handleInputChange = (e, fromToGrade) => {
    const value = parseInt(e.target.value);
    if (e.target.id == "id_grade_name_from") {
      setSelectValueFromGrade(value);
      selectValueFromGrade = value;
    }
    if (e.target.id == "id_grade_name_to") {
      setSelectValueTo(e.target.value);
      selectValueTo = value;
    }
    if (e.target.id == "id_from_grade_division_name") {
      setSelectValueFromGradeDivision(e.target.value);
      selectValueFromGradeDivision = value;
    }
    if (e.target.id == "id_to_grade_division_name") {
      setSelectValueDivisionName(e.target.value);
      selectValueDivisionName = value;
    }
    var toGradesDivisionName = e.target.value;
    setToGradeDivisionNameTable(e.target.value)

    setToGradeDivisionName(toGradesDivisionName);

    if (fromToGrade == "fromGrade") {
      setGradePromotionStudentList([]);
      getAllGradeDivision(value, fromToGrade);
    } else if (fromToGrade == "toGrade") {
      var gettext = e.target.options[e.target.selectedIndex].text;
      setToSchoolGradeName(gettext);
      setToGradeDivisionName("toGradeDivision");
      getAllGradeDivision(value, fromToGrade);
    }
    if (
      selectValueFromGrade == selectValueTo &&
      selectValueFromGradeDivision == selectValueDivisionName
    ) {
      setShowGradesPromotionModal(true);
    }
  };

  const toGradeDivisionTable = (e) => {
    var tempArray = [];
    for (var i = 0; i < gradePromotionStudentList.length; i++) {
      const record = {
        id: gradePromotionStudentList[i].id_student,
        toGradeDivisionId: e.target.value,
      };
      tempArray.push(record);
    }
    setToGradeDivisionTableId(tempArray);
  };

  const changeToGradeDivisionTable = (e, recordId) => {
    setSelectValue(e.target.value);
    selectValue= e.target.value
    var selectToGradesDivisionName = e.target.value;
    setToGradeDivisionNameTable(selectToGradesDivisionName);
    const tempToGradeDivisionTableIdObject = toGradeDivisionTableId.findIndex(
      (gradeDivision) => {
        return gradeDivision.id == recordId;
      }
    );

    if (
      tempToGradeDivisionTableIdObject != -1 ||
      tempToGradeDivisionTableIdObject == 0
    ) {
      const tempToGradeDivisionTableIdArray = [...toGradeDivisionTableId];
      tempToGradeDivisionTableIdArray[
        tempToGradeDivisionTableIdObject
      ].toGradeDivisionId = e.target.value;
      setToGradeDivisionTableId(tempToGradeDivisionTableIdArray);
    }
  };

  const uncheckAllStudent = (e) => {
    if (e.target.checked == true) {
      setCheckAll(true);
      const tempGradePromotionStudentListArray = [...gradePromotionStudentList];
      for (var i = 0; i < gradePromotionStudentList.length; i++) {
        tempGradePromotionStudentListArray[i].checked = true;
      }
      setGradePromotionStudentList(tempGradePromotionStudentListArray);
    } else {
      setCheckAll(false);
      const tempGradePromotionStudentListArray = [...gradePromotionStudentList];
      for (var i = 0; i < gradePromotionStudentList.length; i++) {
        tempGradePromotionStudentListArray[i].checked = false;
      }
      setGradePromotionStudentList(tempGradePromotionStudentListArray);
    }
  };
  const uncheckStudent = (e, recordId) => {
    let tempArr = JSON.parse(JSON.stringify(gradePromotionStudentList));
    const tempGradePromotionStudentListObject = gradePromotionStudentList.find(
      (i) => i.id_student == recordId
    );
    if (e.target.checked == true) {
      setCheckAll(false);
      tempArr.filter((i) => {
        if (i.id_student === recordId) {
          i.checked = true;
          return true;
        }
      });
    } else {
      setCheckAll(false);
      tempArr.filter((i) => {
        if (i.id_student === recordId) {
          i.checked = false;
          return true;
        }
      });
    }
    setGradePromotionStudentList(tempArr);
  };

  const checkAPICall = async () => {
    const studentsToPromote = [];
    for (var i = 0; i < gradePromotionStudentList.length; i++) {
      if (gradePromotionStudentList[i].checked == true) {
        const record = {
          id_student: gradePromotionStudentList[i].id_student,
          id_from_grade_divison:
            gradePromotionStudentList[i].id_school_grade_division,
          id_to_grade_divison:
            selectValue + gradePromotionStudentList[i].id_student,
        };
        studentsToPromote.push(record);
      }
    }
    try {
      const payload = {
        id_school: paramsId ? paramsId : props.data.loginInfo.id,
        students_to_promote: studentsToPromote,
      };
      const data = await ADD_STUDENT_GRADE_PROMOTION(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        if (paramsId) {
          history.push(`/admin/school-list`);
        } else {
          history.push(`/school/dashboard`);
        }
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const resetSelection = () => {
    let toGradeDivision = setSelectValueDivisionName("toGradeDivision");
    setToGradeDivisionName(toGradeDivision);
    setToGradeDivisionTableId([]);
    setShowGradesPromotionModal(false);
    setSelectValueDivisionName("toGradeDivision");
    selectValueDivisionName = "toGradeDivision";
  };

  const redirectPage = () => {
    if (paramsId) {
      history.push("/admin/school-list");
    } else {
      history.push(`/school/dashboard`);
    }
  };

  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 px-0 school-grade">
        <div className="row mx-auto">
          <div className="col-lg-12 col-md-12 col-sm-12 my-5">
            <div className="card-table">
              <div className="table-header-sec bg-dark-blue d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                    Student Grade Promotion
                  </h3>
                  {schoolName && (
                    <p className="text-color-tertiary font-weight-semibold text-4 mb-0">
                      {schoolName}
                    </p>
                  )}
                </div>
                <div>
                  {paramsId && (
                    <Link to="/admin/school-list">
                      <Button size="sm" variant="primary" className="px-4">
                        Back
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              <div className="row mx-auto mt-3">
                <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                  <div className="border-light-gray">
                    <div className="school-grade-header bg-dark-blue py-2 px-2">
                      <h4 className="text-4 text-white font-weight-semibold mb-0">
                        From Grade
                      </h4>
                    </div>
                    <div className="my-3 px-3">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="material-textfield">
                            <select
                              placeholder=" "
                              id="id_grade_name_from"
                              name="id_grade_name"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em`}
                              onChange={(e) =>
                                handleInputChange(e, "fromGrade")
                              }
                              autoFocus
                            >
                              <option value="fromGrade">Select</option>
                              {gradesList.map(({ id, grade_name }, index) => (
                                <option value={id} key={index}>
                                  {grade_name}
                                </option>
                              ))}
                            </select>
                            <label className="material-label text-uppercase text-1">
                              School Grades
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="material-textfield">
                            <select
                              placeholder=" "
                              name="id_grade_division_name"
                              id="id_from_grade_division_name"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em`}
                              onChange={(e) => {
                                getStudentGradePromotion(e);
                                handleInputChange(e, "fromGradeDivision");
                              }}
                            >
                              <option value="fromGradeDivision">Select</option>
                              {fromGradeDivision.map(
                                ({ id, grade_division_name }, index) => (
                                  <option value={id} key={index}>
                                    {grade_division_name}
                                  </option>
                                )
                              )}
                            </select>
                            <label className="material-label text-uppercase text-1">
                              Grade Divisions
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                  <div className="border-light-gray">
                    <div className="school-grade-header bg-dark-blue py-2 px-2">
                      <h4 className="text-4 text-white font-weight-semibold mb-0">
                        To Grade
                      </h4>
                    </div>
                    <div className="my-3 px-3">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="material-textfield">
                            <select
                              placeholder=" "
                              id="id_grade_name_to"
                              name="id_grade_name"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em`}
                              onChange={(e) => handleInputChange(e, "toGrade")}
                            >
                              <option value="fromGradeDivision">Select</option>
                              {gradesList.map(({ id, grade_name }, index) => (
                                <option value={id} key={index}>
                                  {grade_name}
                                </option>
                              ))}
                            </select>
                            <label className="material-label text-uppercase text-1">
                              School Grades
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="material-textfield">
                            <select
                              placeholder=" "
                              name="id_grade_division_name"
                              id="id_to_grade_division_name"
                              autoComplete="off"
                              className={`form-control eb-contact-input material-input h-3em`}
                              onChange={(e) => {
                                toGradeDivisionTable(e);
                                handleInputChange(e, "toGradeDivision");
                              }}
                              value={selectValueDivisionName}
                            >
                              <option value="toGradeDivision">Select</option>
                              {toGradeDivision.map(
                                ({ id, grade_division_name }, index) => (
                                  <option value={id} key={index}>
                                    {grade_division_name}
                                  </option>
                                )
                              )}
                            </select>
                            <label className="material-label text-uppercase text-1">
                              Grade Divisions
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* table header */}
              {gradePromotionStudentList.length !== 0 && (
                <div className="row mx-auto mt-3">
                  <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                    <div className="d-flex align-items-center">
                      <div>
                        <input
                          type="checkbox"
                          className="mr-3 lg-check-box"
                          id={"checkAll"}
                          // name={item.grade_name}
                          // value={item.id}
                          checked={checkAll}
                          onChange={(e) => uncheckAllStudent(e)}
                        />
                      </div>
                      <div>
                        <h2 className="font-weight-semibold mb-0 text-4">
                          Student Name
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1 col-md-4 col-sm-12 mb-3">
                    <h2 className="font-weight-semibold mb-0 text-4">Grade</h2>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-12 mb-3">
                    <h2 className="font-weight-semibold mb-0 text-4">
                      Division
                    </h2>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-12 mb-3">
                    <h2 className="font-weight-semibold color-dark-blue mb-0 text-4">
                      To Grade
                    </h2>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                    <h2 className="font-weight-semibold mb-0 color-dark-blue text-4">
                      To Division *
                    </h2>
                  </div>
                </div>
              )}
              {/* table data */}
              {gradePromotionStudentList.map((item, index) => (
                <div className="row mx-auto mt-2" key={index}>
                  <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
                    <div className="d-flex align-items-center">
                      <div>
                        <input
                          type="checkbox"
                          className="mr-3 lg-check-box"
                          id={"check" + item.id_student}
                          // name={item.grade_name}
                          // value={item.id}
                          // onChange={(e) => addGrades(e, item)}
                          checked={item.checked}
                          onChange={(e) => uncheckStudent(e, item.id_student)}
                        />
                      </div>
                      <div>
                        <h2 className="mb-0 text-3">
                          {item.first_name} {item.last_name}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-1 col-md-4 col-sm-12 mb-3">
                    <h2 className="mb-0 text-3">{item.grade_name}</h2>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-12 mb-3">
                    <h2 className="mb-0 text-3">{item.grade_division_name}</h2>
                  </div>
                  <div className="col-lg-2 col-md-4 col-sm-12 mb-3">
                    <h2 className="mb-0 color-dark-blue text-3">
                      {toSchoolGradeName == "Select" ? null : toSchoolGradeName}
                    </h2>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                    {toGradeDivisionTableId.map((item1, index1) =>
                      item.id_student == item1.id ? (
                        toSchoolGradeName == "Select" ? null : (
                          <select
                            key={index1}
                            placeholder=" "
                            id={"id_to_grade_divison" + item.id_student}
                            name="id_grade_division_name"
                            autoComplete="off"
                            className={`form-control eb-contact-input h-3em`}
                            value={item1.toGradeDivisionId}
                            onChange={(e) =>
                              changeToGradeDivisionTable(e, item.id_student)
                            }
                          >
                            <option value="toGradeDivision">Select</option>
                            {toGradeDivision.map(
                              ({ id, grade_division_name }, index) => (
                                <option value={id} key={index}>
                                  {grade_division_name}
                                </option>
                              )
                            )}
                          </select>
                        )
                      ) : (
                        ""
                      )
                    )}
                  </div>
                </div>
              ))}
              {gradePromotionStudentList.length !== 0 && (
                <div className="row mx-auto mt-3">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="d-flex justify-content-end">
                      {toGradeDivisionTableId == "" ||
                      toGradeDivisionName == "toGradeDivision" ||
                      toGradeDivisionNameTable == "toGradeDivision"  ? (
                        <Button
                          className="bg-dark-blue px-4 mr-2"
                          onClick={() => checkAPICall()}
                          disabled
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          className="bg-dark-blue px-4 mr-2"
                          onClick={() => checkAPICall()}
                        >
                          Save
                        </Button>
                      )}
                      <Button
                        className="bg-dark-blue px-4 mr-2"
                        onClick={() => redirectPage()}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showGradesPromotionModal && (
        <GradesPromotionModal resetSelection={(e) => resetSelection(e)} />
      )}
    </React.Fragment>
  );
};

export default StudentGradePromotion;
