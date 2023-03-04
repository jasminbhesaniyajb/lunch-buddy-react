import React, { useState, useEffect } from "react";

import { Tabs, Tab, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import queryString from "query-string";
import { Link } from "react-router-dom";

import PlusIcon from "../../../assets/img/icons/plus-icon.svg";

import AddSchoolGrade from "../../../components/SchoolGrades";
import SchoolGradeModal from "../../../components/SchoolGradesModal";
import Loader from "../../../components/Loader";
import AddGradeDivisionModal from "../../../containers/AddGradeDivision";
import TeacherConformationModal from "../../../components/TeacherConformationModal";
import GradeDivisionWarningModal from "../../../components/GradeDivisionWarningModal";

import {
  GET_ALL_GRADES_LIST,
  GET_ALL_SCHOOL_GRADES,
  ADD_MANAGE_SCHOOL_GRADES,
  ADD_MANAGE_SCHOOL_GRADE_DIVISION,
  FETCH_TEACHERS_LIST,
  DELETE_SCHOOL_GRADE,
  SCHOOL_GRADES_IS_ACTIVE,
} from "../../../services/ENDPOINT";

const SchoolGrades = (props) => {
  const [isloader, setLoader] = useState(false);
  const [add, setAdd] = useState([]);
  const [gradesList, setGradesList] = useState([]);
  const [schoolGradesList, setSchoolGradesList] = useState([]);
  const [selectedGradesList, setSelectedGradesList] = useState([]);
  const [selectTab, setSelectTab] = useState("School Grades");
  const [selectGrades, setSelectGrades] = useState([]);
  const [showSchoolGradeModal, setShowSchoolGradeModal] = useState(false);
  var gradeDivision = [];
  var division = [];
  const [addNewSchoolGrade, setAddNewSchoolGrade] = useState({});
  const [count, setCount] = useState(0);
  const [gradeDivisionId, setGradeDivisionId] = useState([]);
  const [gradeName, setGradeName] = useState("");
  const [uncheckGrade, setUncheckGrade] = useState({});
  const [showAddGradeDivisionModal, setShowAddGradeDivisionModal] =
    useState(false);
  const [gradeDivisionIdModal, setGradeDivisionIdModal] = useState();
  const [teachersList, setTeachersList] = useState([]);
  const [showTeacherConformationModal, setshowTeacherConformationModal] =
    useState(false);
  const [teacherId, setTeacherId] = useState({});
  const paramsId = queryString.parse(location.search).schoolId;
  const schoolName = queryString.parse(location.search).schoolName;
  const [resetSelectValue, setResetSelectValue] = useState({});
  const [selectedValue, setSelectedValue] = useState("0");
  const [schoolGradesListArr, setSchoolGradesListArr] = useState([]);
  const [schoolGradesListLength, setSchoolGradesListLength] = useState();
  const [gradesCheckedList, setGradesCheckedList] = useState([]);
  const [gradesCheckedId, setGradesCheckedId] = useState();
  const [showGradeDivisionWarningModal, setShowGradeDivisionWarningModal] =
    useState(false);

  const getAllTeachersList = async (e) => {
    const payload = { schoolId: paramsId ? paramsId : props.data.loginInfo.id };
    try {
      setTeachersList([]);
      const data = await FETCH_TEACHERS_LIST(payload);
      if (data.code === 200 || data.code === "200") {
        setTeachersList(data.data);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getAllTeachersList();
    return () => {
      setTeachersList();
    };
  }, []);

  const getAllGradesList = async () => {
    try {
      setLoader(true);
      setGradesList([]);
      const data = await GET_ALL_GRADES_LIST();
      if (data.code === 200 || data.code === "200") {
        for(var i=0;i<data.data.length;i++){
          const record = {
            grade_name: data.data[i].grade_name,
            id: data.data[i].id,
            checked: false
          }
          gradesList.push(record)
        }
        getAllSchoolGradesList(gradesList);
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
    getAllGradesList();
  }, []);

  const getAllSchoolGradesList = async (recordData) => {
    const payload = { schoolId: paramsId ? paramsId : props.data.loginInfo.id };
    try {
      setSchoolGradesList([]);
      const data = await GET_ALL_SCHOOL_GRADES(payload);
      if (data.code === 200 || data.code === "200") {
        const tempGradesList = [...recordData]
        for (var i = 0; i < data.data.length; i++) {
          for (var j = 0; j < recordData.length; j++) {
            if (data.data[i].id_grade == recordData[j].id) {
              tempGradesList[j].checked = true;
            }
          }
        }
        setGradesList(tempGradesList)
        setSchoolGradesList(data.data);
        var tempArray = [];
        for (var i = 0; i < recordData.length; i++) {
          if (
            recordData[i].checked == true
          ) {
            tempArray.push(recordData[i].id);
          }
        }
        setGradesCheckedList(tempArray);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getAllSchoolGradesList(gradesList);
    return () => {
      setGradesCheckedList();
    };
  }, []);

  const getAddManageSchoolGrades = async (e) => {
    try {
      const payload = {
        id_school: paramsId ? paramsId : props.data.loginInfo.id,
        school_grades: selectGrades,
      };
      const data = await ADD_MANAGE_SCHOOL_GRADES(payload);
      if (data.code === 200 || data.code === "200") {
        setSchoolGradesList(data.data);
        setSchoolGradesListArr(JSON.stringify(data.data));
        var total = 0;
        for (var i = 0; i < data.data.length; i++) {
          const tempArrLength = data.data[i].school_grade_divisions.length;
          total += tempArrLength;
        }
        setSchoolGradesListLength(total);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const getAddManageSchoolGradesDivision = async (e) => {
    for (var i = 0; i < schoolGradesList.length; i++) {
      division = [];
      for (
        var j = 0;
        j < schoolGradesList[i].school_grade_divisions.length;
        j++
      ) {
        const record = {
          id: schoolGradesList[i].school_grade_divisions[j].id,
          division_name: schoolGradesList[i].school_grade_divisions[j].division_name,
          id_teacher: schoolGradesList[i].school_grade_divisions[j].id_teacher
        };
        division.push(record);
      }
      const record = {
        id_school_grades: schoolGradesList[i].id,
        divisions: division,
      };
      gradeDivision.push(record);
    }
    
    try {
      const payload = {
        id_school: paramsId ? paramsId : props.data.loginInfo.id,
        grade_divisions: gradeDivision,
      };
      const data = await ADD_MANAGE_SCHOOL_GRADE_DIVISION(payload);
      if (data.code === 200 || data.code === "200") {
        setSchoolGradesList(data.data);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const changeActiveDeactive = async (userInfo) => {
    const activeDeactive = Number(userInfo.is_active) === 1 ? "0" : "1";
    const payload = { id: userInfo.id, is_active: activeDeactive };
    try {
      const data = await SCHOOL_GRADES_IS_ACTIVE(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempSchoolGradesListArray = [...schoolGradesList];
        for (var i = 0; i < schoolGradesList.length; i++) {
          for (
            var j = 0;
            j < schoolGradesList[i].school_grade_divisions.length;
            j++
          ) {
            const tempSchoolGradeObject = schoolGradesList[
              i
            ].school_grade_divisions.findIndex((schooGrade) => {
              return schooGrade.id == userInfo.id;
            });
            if (activeDeactive == 1) {
              tempSchoolGradesListArray[i].school_grade_divisions[
                tempSchoolGradeObject
              ].is_active = "1";
            } else if (activeDeactive == 0) {
              tempSchoolGradesListArray[i].school_grade_divisions[
                tempSchoolGradeObject
              ].is_active = "0";
            }
          }
        }
        setSchoolGradesList(tempSchoolGradesListArray);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const deleteSchoolGrade = async (recordId) => {
    try {
      const payload = { id: recordId };
      const data = await DELETE_SCHOOL_GRADE(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempSchoolGradesListArray = [...schoolGradesList];
        for (var i = 0; i < schoolGradesList.length; i++) {
          for (
            var j = 0;
            j < schoolGradesList[i].school_grade_divisions.length;
            j++
          ) {
            const tempSchoolGradesListObject = schoolGradesList[
              i
            ].school_grade_divisions.findIndex((schoolGradesList) => {
              return schoolGradesList.id == recordId;
            });
            if (tempSchoolGradesListObject != -1) {
              tempSchoolGradesListArray[i].school_grade_divisions.splice(
                tempSchoolGradesListObject,
                1
              );
            }
          }
        }
        setSchoolGradesList(tempSchoolGradesListArray);
        var total = 0;
        for (var i = 0; i < schoolGradesList.length; i++) {
          const tempArrLength =
            schoolGradesList[i].school_grade_divisions.length;
          total += tempArrLength;
        }
        setSchoolGradesListLength(total);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const handleSelect = (GradesDivisions) => {
    setSelectGrades([]);
    if (gradesCheckedList.length == 0) {
      setShowGradeDivisionWarningModal(true);
    } else {
      setSelectTab(GradesDivisions);
    }
    for (var i = 0; i < gradesList.length; i++) {
      if (gradesList[i].checked == true) {
        selectGrades.push(gradesList[i].id);
      }
    }
    getAddManageSchoolGrades();
  };

  const handleCheckbox = (e, record) => {
    setGradesCheckedId(record.id);
    let index1;
    const tempGradesListArray = [...gradesList]
    const tempGradesListObject = gradesList.findIndex((grades) => {
      return grades.id == record.id;
    });
    if(e.target.checked == true) {
      tempGradesListArray[tempGradesListObject].checked = true
    }else{
      tempGradesListArray[tempGradesListObject].checked = false
    }
    setGradesList(tempGradesListArray)
    if (e.target.checked == false) {
      index1 = gradesList.indexOf(record);
      setUncheckGrade(record);
      setGradeName(record.grade_name);
      for (var i = 0; i < schoolGradesList.length; i++) {
        if (record.id == schoolGradesList[i].id) {
          if (schoolGradesList[i].school_grade_divisions.length != 0) {
            setShowSchoolGradeModal(true);
          }
        }
      }
    }
    setGradesCheckedList([]);
    var tempArray = [];
    for (var i = 0; i < gradesList.length; i++) {
      if (gradesList[i].checked == true) {
        tempArray.push(gradesList[i].id);
      }
    }
    setGradesCheckedList(tempArray);
  };

  const addGradeDivision = () => {
    const tempGradesList = [...gradesList];
    const tempGradesObject = gradesList.findIndex((grade) => {
      return grade.id == uncheckGrade.id;
    });
    tempGradesList[tempGradesObject].checked = false
    setGradesList(tempGradesList)
    setShowSchoolGradeModal(false);
  };

  const handleCheckGradeDivision = () => {
    gradesCheckedList.push(gradesCheckedId);
    const tempGradesList = [...gradesList]
    for (var i = 0; i < gradesList.length; i++) {
      for (var j = 0; j < gradesCheckedList.length; j++) {
        if (gradesList[i].id == gradesCheckedList[j]) {
          tempGradesList[i].checked = true;
        }
      }
    }
    setGradesList(tempGradesList)
    setShowSchoolGradeModal(false);
  };

  const openPopupAndPassId = (recordId) => {
    setGradeDivisionIdModal(recordId);
    setShowAddGradeDivisionModal(true);
  };

  const addNewGradeDivision = (recordData) => {
    setSchoolGradesList([]);
    setSchoolGradesList(recordData);
    var total = 0;
    for (var i = 0; i < recordData.length; i++) {
      const tempArrLength = recordData[i].school_grade_divisions.length;
      total += tempArrLength;
    }
    setSchoolGradesListLength(total);
  };

  const handleGradeDivision = (e) => {
    const tempSchoolGradesList = [...schoolGradesList];
    for (var i = 0; i < schoolGradesList.length; i++) {
      for (var j = 0; j < schoolGradesList[i].school_grade_divisions.length; j++) {
        if (e.target.id == "grade"+schoolGradesList[i].school_grade_divisions[j].id) {
          tempSchoolGradesList[i].school_grade_divisions[j].division_name = e.target.value
        }
      }
    }
    setSchoolGradesList(tempSchoolGradesList)
  };

  const handleEvent = (e) => {
    const record1 = {
      id: e.target.id,
      name: e.target.name,
    };
    var gettext = ""
    setResetSelectValue(record1);
    const tempSchoolGradesList = [...schoolGradesList];
    for (var i = 0; i < schoolGradesList.length; i++) {
      for (
        var j = 0;
        j < schoolGradesList[i].school_grade_divisions.length;
        j++
      ) {
        if (
          e.target.id != "id_school_teacher"+schoolGradesList[i].school_grade_divisions[j].id
        ) {
          if (
            e.target.value == schoolGradesList[i].school_grade_divisions[j].id_teacher
          ) {
            setshowTeacherConformationModal(true);
          } else {
            gettext = schoolGradesList[i].school_grade_divisions[j].teacher_name;
            var str = e.target.id;
            var res = str.split("id_school_teacher");
            var strtoint = parseInt(res[1]);
            const tempSchoolGradeObject = schoolGradesList[
              i
            ].school_grade_divisions.findIndex((schooGrade) => {
              return schooGrade.id == strtoint;
            });
            if (tempSchoolGradeObject != -1) {
              tempSchoolGradesList[i].school_grade_divisions[
                tempSchoolGradeObject
              ].id_teacher = e.target.value;
              tempSchoolGradesList[i].school_grade_divisions[
                tempSchoolGradeObject
              ].teacher_name = gettext;
            }
          }
        }
      }
    }
    setSchoolGradesList(tempSchoolGradesList);
    const record = {
      id: e.target.id,
      value: e.target.value,
      name: gettext,
    };
    setTeacherId(record);
  };

  const selectTeacher = () => {
    const tempSchoolGradesList = [...schoolGradesList];
    for (var i = 0; i < schoolGradesList.length; i++) {
      for (
        var j = 0;
        j < schoolGradesList[i].school_grade_divisions.length;
        j++
      ) {
        if (
          teacherId.id == "id_school_teacher" +schoolGradesList[i].school_grade_divisions[j].id
        ) {
          tempSchoolGradesList[i].school_grade_divisions[j].id_teacher =
            teacherId.value;
          tempSchoolGradesList[i].school_grade_divisions[j].teacher_name =
            teacherId.name;
        }
      }
    }
    setSchoolGradesList(tempSchoolGradesList);
    setshowTeacherConformationModal(false);
  };

  const resetSelection = () => {
    const tempArr = [...JSON.parse(schoolGradesListArr)];
    if (resetSelectValue.name == "id_teacher") {
      setSelectedValue("0");
    } else {
      const tempSchoolGradesList = [...schoolGradesList];
      for (var i = 0; i < schoolGradesList.length; i++) {
        for (
          var j = 0;
          j < schoolGradesList[i].school_grade_divisions.length;
          j++
        ) {
          if (
            resetSelectValue.id == "id_school_teacher" + schoolGradesList[i].school_grade_divisions[j].id
          ) {
            tempSchoolGradesList[i].school_grade_divisions[j].id_teacher =
              tempArr[i].school_grade_divisions[j].id_teacher;
            tempSchoolGradesList[i].school_grade_divisions[j].teacher_name =
              tempArr[i].school_grade_divisions[j].teacher_name;
          }
        }
      }
      setSchoolGradesList(tempSchoolGradesList);
    }
    setshowTeacherConformationModal(false);
  };

  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 px-0">
        {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          <div className="col-lg-12 col-md-12 col-sm-12 my-5">
          <div className="card-table">
            <div className="table-header-sec bg-dark-blue d-flex justify-content-between align-items-center">
              <div>
                <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                  School Grades
                </h3>
                {schoolName && 
                  <p className="text-color-tertiary font-weight-semibold text-4 mb-0">
                    {schoolName}
                  </p>
                }
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
            <div className="mt-3">
              <Tabs
                defaultActiveKey={"School Grades"}
                id="uncontrolled-tab-example"
                activeKey={selectTab}
                onSelect={(e) => handleSelect(e)}
              >
                {/* tab 1 */}
                <Tab eventKey="School Grades" title="School Grades">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 mx-auto">
                      <div className="border-light-gray">
                        <div className="school-grade-header bg-dark-blue py-2 px-2">
                          <h4 className="text-4 text-white font-weight-semibold mb-0">
                            Grades
                          </h4>
                        </div>
                        <div className="school-grade-all-checkbox my-3 px-2">
                          {gradesList.map((item, index) => (
                            <div
                              className="mb-2 d-flex align-items-center"
                              key={index}
                            >
                              <input
                                type="checkbox"
                                className="mr-3 lg-check-box"
                                id={"check" + item.id}
                                name={item.grade_name}
                                value={item.id}
                                onChange={(e) => handleCheckbox(e, item)}
                                checked={item.checked}
                              />
                              <label
                                className="mb-0"
                                htmlFor={"check" + item.id}
                              >
                                {item.grade_name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
                      <div className="text-center d-flex justify-content-end">
                        {gradesCheckedList.length > 0 ? (
                          <Button
                            className="bg-dark-blue px-4 mr-2"
                            onClick={() => handleSelect("GradesDivisions")}
                          >
                            Next
                          </Button>
                        ) : (
                          <Button
                            className="bg-dark-blue px-4 mr-2"
                            onClick={() => handleSelect("GradesDivisions")}
                            disabled
                          >
                            Next
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="GradesDivisions" title="Grade Divisions">
                  <div className="row">
                    <div className="col-lg-10 col-md-12 col-sm-12 mx-auto">
                      <div className="border-light-gray">
                        <div className="school-grade-header bg-dark-blue py-2 px-2">
                          <h4 className="mb-0 text-4 text-white font-weight-semibold">
                            Grade Divisions
                          </h4>
                        </div>
                        {schoolGradesList.map((item, index) => (
                          <div className="select mx-4 mt-3" key={index}>
                            <div
                              className="select-header bg-light-gray px-2 d-flex py-2 text-center"
                              id={"rowId" + item.id}
                              value={item.id}
                            >
                              <div className="d-flex justify-content-between w-100 align-items-center">
                                <h4 className="text-4 font-weight-semibold mb-0">
                                  {item.grade_name}
                                </h4>
                                <div
                                  className="cursor-pointer"
                                  //  onClick={(e) => createDiv(item.id)}
                                  onClick={(e) => openPopupAndPassId(item.id)}
                                >
                                  <img
                                    src={PlusIcon}
                                    alt="PlusIcon"
                                    width="15"
                                    className="mr-2 cursor-pointer"
                                    title="Add Division"
                                  />
                                  <span>Add Division</span>
                                </div>
                              </div>
                            </div>
                            <div className="select-list mt-3">
                              <AddSchoolGrade
                                schoolGradesItems={item}
                                handleEvent={(e) => handleEvent(e)}
                                deleteSchoolGrade={(e) => deleteSchoolGrade(e)}
                                changeActiveDeactive={(e) =>
                                  changeActiveDeactive(e)
                                }
                                handleGradeDivision={(e) => handleGradeDivision(e)}
                                schoolGradesList={schoolGradesList}
                                teachersList={teachersList}
                              />
                            </div>
                            {add.map(
                              (item1, index1) =>
                                item.id == item1.id && (
                                  <div className="select-list">
                                    {item1.addGrade}
                                  </div>
                                )
                            )}
                          </div>
                        ))}
                        <div className="text-center d-flex justify-content-end my-2 px-2">
                          {schoolGradesListLength > 0 ? (
                            <Button
                              type="submit"
                              className="bg-dark-blue px-4 mr-2"
                              onClick={() => getAddManageSchoolGradesDivision()}
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              type="submit"
                              className="bg-dark-blue px-4 mr-2"
                              onClick={() => getAddManageSchoolGradesDivision()}
                              disabled
                            >
                              Save
                            </Button>
                          )}
                          <Link
                            to={
                              paramsId
                                ? "/admin/school-list"
                                : "/school/dashboard"
                            }
                          >
                            <Button className="bg-dark-blue px-4 mr-2">
                              Cancel
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
          </div>
        </div>
      </div>
      {showSchoolGradeModal && (
        <SchoolGradeModal
          closeModal={() => handleCheckGradeDivision()}
          addGradeDivision={() => addGradeDivision()}
          gradeName={gradeName}
        />
      )}
      {showAddGradeDivisionModal && (
        <AddGradeDivisionModal
          closeModal={() => setShowAddGradeDivisionModal(false)}
          handleEvent={(e) => handleEvent(e)}
          addNewGradeDivision={(e) => addNewGradeDivision(e)}
          gradeDivisionIdModal={gradeDivisionIdModal}
          teachersList={teachersList}
          selectedValue={selectedValue}
        />
      )}
      {showTeacherConformationModal && (
        <TeacherConformationModal
          closeModal={() => setshowTeacherConformationModal(false)}
          selectTeacher={() => selectTeacher()}
          resetSelection={(e) => resetSelection(e)}
        />
      )}
      {showGradeDivisionWarningModal && (
        <GradeDivisionWarningModal
          closeModal={() => setShowGradeDivisionWarningModal(false)}
        />
      )}
    </React.Fragment>
  );
};
export default SchoolGrades;
