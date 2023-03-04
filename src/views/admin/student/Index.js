import React, { useState, useEffect } from "react";

import { Table } from "react-bootstrap";
import Activeicon from "../../../assets/img/icons/active-icon.png";
import InActiveIcon from "../../../assets/img/icons/inactive-icon.png";
import SearchIcon from "../../../assets/img/icons/search-icon.svg";
import ApproveIcon from "../../../assets/img/icons/active-icon.svg";

import { toast } from "react-toastify";

import { useTranslation } from "react-i18next";

import Loader from "../../../components/Loader";

import Pagination from "../../../components/Pagination";
import ShowingPagination from "../../../components/ShowingPagination";
import relaodSVG from "../../../assets/img/reload.svg";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../../../config";

import {
  GET_ALL_STUDENT,
  STUDENT_IS_ACTIVE,
  STUDENT_IS_APPROVED,
  GET_CITY,
  GET_PROVINCE,
  GET_ALL_GRADE_DIVISIONS
} from "../../../services/ENDPOINT";

const AdminStudent = (props) => {
  const [isloader, setLoader] = useState(false);
  const [studentsList, setStudentsList] = useState([]);
  const [tablefields, setTablefields] = useState([
    { value: "first_name", key: "First Name", sort: true },
    { value: "last_name", key: "Last Name", sort: true },
    { value: "school_name", key: "School Name", sort: true },
    { value: "student_grade", key: "School Grade", sort: true },
    { value: "parent_name", key: "Parent Name", sort: true },
    { value: "status", key: "Status", sort: false },
    { value: "action", key: "Action", sort: false },
  ]);
  const [pagination, setPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    studentName: "",
    schoolName: "",
    provinceId: "",
    cityId: "",
    gradeDivisionId: "",
    orderBy: "DESC",
    sortBy: "id"
  });
  const [citys, setCitys] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [perPageRowArray, setPerPageRowArray] = useState(PER_PAGE_ROWS_OPTIONS);
  const [gradeDivisions, setGradeDivisions] = useState([]);

  const { t } = useTranslation();


  const showSearchBox = () => {
    setShowSearch(!showSearch);
  };

  const handleInputChange = (e) => {
    let timer = handleInputChange.timer;
    if (timer) {
      clearTimeout(timer);
    }
    handleInputChange.timer = setTimeout(async () => {
      if(e.target.name == "searchStudentName"){
        pagination.studentName = e.target.value || "";
        pagination.schoolName = pagination.schoolName ? pagination.schoolName : "";
        pagination.provinceId = pagination.provinceId ? pagination.provinceId : "";
        pagination.cityId = pagination.cityId ? pagination.cityId : "";
        pagination.gradeDivisionId = pagination.gradeDivisionId ? pagination.gradeDivisionId : "";
        getStudentList()
      }else if(e.target.name == "searchSchoolName"){
        pagination.studentName = pagination.studentName ? pagination.studentName : "";
        pagination.schoolName = e.target.value
        pagination.provinceId = pagination.provinceId ? pagination.provinceId : "";
        pagination.cityId = pagination.cityId ? pagination.cityId : "";
        pagination.gradeDivisionId = pagination.gradeDivisionId ? pagination.gradeDivisionId : "";
        getStudentList()
      }else if(e.target.name == "id_province"){      
        pagination.studentName = pagination.studentName ? pagination.studentName : "";
        pagination.schoolName = pagination.schoolName ? pagination.schoolName : "";
        pagination.provinceId = e.target.value
        pagination.cityId = pagination.cityId ? pagination.cityId : "";
        pagination.gradeDivisionId = pagination.gradeDivisionId ? pagination.gradeDivisionId : "";
        getStudentList()
      }else if(e.target.name == "id_city"){
        pagination.studentName = pagination.studentName ? pagination.studentName : "";
        pagination.schoolName = pagination.schoolName ? pagination.schoolName : "";
        pagination.provinceId = pagination.provinceId ? pagination.provinceId : "";
        pagination.cityId = e.target.value
        pagination.gradeDivisionId = pagination.gradeDivisionId ? pagination.gradeDivisionId : "";
        getStudentList()
      }else if(e.target.name=="id_grade_division_name"){
        pagination.studentName = pagination.studentName ? pagination.studentName : "";
        pagination.schoolName = pagination.schoolName ? pagination.schoolName : "";
        pagination.provinceId = pagination.provinceId ? pagination.provinceId : "";
        pagination.cityId = pagination.cityId ? pagination.cityId : "";
        pagination.gradeDivisionId = e.target.value;
        getStudentList()
      }
    }, 500)
  };


  const getAllProvince = async () => {
    try {
      const data = await GET_PROVINCE();
      if (data.code === 200 || data.code === "200") {
        setProvinces(data.data);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getAllProvince();
    return ()=>{
      setProvinces();
    }
  }, []);

  const getAllCity = async (e) => {
    const payload = e;
    try {
      const data = await GET_CITY(payload);
      if (data.code === 200 || data.code === "200") {
        setCitys(data.data);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const getAllGradeDivision = async (e) => {
    const payload = {schoolName: e ? e : ""};
    try {
      const data = await GET_ALL_GRADE_DIVISIONS(payload);
      if (data.code === 200 || data.code === "200") {
        setGradeDivisions(data.data);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  }
  useEffect(() => {
    getAllGradeDivision();
  }, []);

  const getStudentList = async (e) => {
    const payload = {
      perPageRows:  pagination.perPageRows || 15,
      currentPage:  pagination.currentPage || 1,
      studentName: pagination.studentName || "",
      schoolName: pagination.schoolName || "",
      provinceId: pagination.provinceId || "",
      cityId: pagination.cityId || "",
      gradeDivisionId: pagination.gradeDivisionId || "",
      orderBy: pagination.orderBy || "DESC",
      sortBy: pagination.sortBy || "id"
    }
    try {
      setLoader(true);
      setStudentsList([]);
      const data = await GET_ALL_STUDENT(payload);
      if (data.code === 200 || data.code === "200") {
        setStudentsList(data.data.studens);
        const recordData = {
          currentPage: data.data.pagination.currentPage,
          orderBy: data.data.pagination.orderBy,
          perPageRows: data.data.pagination.perPageRows,
          sortBy: data.data.pagination.sortBy,
          totalItems: data.data.pagination.totalItems,
          totalPages: data.data.pagination.totalPages,
          provinceId: pagination.provinceId,
          cityId: pagination.cityId,
          gradeDivisionId: pagination.gradeDivisionId,
          schoolName: pagination.schoolName,
          studentName: pagination.studentName,
        }
        setPagination(recordData);
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
    getStudentList();
  }, []);
  const changePerPage = async (e) => {
    pagination.perPageRows = parseInt(e.target.value);
    pagination.currentPage = 1;
    getStudentList();
    setPagination(1);
  };
  const getRefreshStudentList = async (e) => {
    pagination.perPageRows = pagination.perPageRows;
    pagination.currentPage = 1;
    getStudentList();
    setPagination(1);
  };
  const sortData = (data) => {
    if (data.sort) {
      pagination.sortBy = data.value
      pagination.orderBy = pagination.orderBy === 'DESC' ? 'ASC' : 'DESC'
      getStudentList();
    }
  }
  
  const changeActiveDeactive = async (userInfo) => {
    const activeDeactive = Number(userInfo.is_active) === 1 ? '0' : '1';
    const payload = { id: userInfo.id, is_active: activeDeactive };
    try {
      const data = await STUDENT_IS_ACTIVE(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempStudentObject = studentsList.findIndex((student) => {
          return student.id == userInfo.id;
        });
        const tempStudentArray = [...studentsList];
        if (activeDeactive == 1) {
          tempStudentArray[tempStudentObject].is_active = "1";
        } else if (activeDeactive == 0) {
          tempStudentArray[tempStudentObject].is_active = "0";
        }
        setStudentsList(tempStudentArray);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  const changeAappoveDisappove = async (userInfo) => {
    const payload = { id: userInfo.id, isAppoved: true };
    try {
      const data = await STUDENT_IS_APPROVED(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        getStudentList();
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 px-0">
      {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          <div className="col-lg-12 col-md-12 col-sm-12 mt-5">
            <div className="card-table">
              <div className="table-header-sec bg-dark-blue d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                    Student List
                  </h3>
                  <p className="text-white mb-0">
                    List of Enrolled Students 
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      className="cursor-pointer"
                      src={SearchIcon}
                      width="27"
                      onClick={() => showSearchBox()}
                      alt="search"
                    />
                  </div>
                  <select
                    className="px-2 py-1 ml-2"
                    name="perPage"
                    onChange={changePerPage}
                  >
                    {perPageRowArray.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        )
                      )}
                  </select>
                  <div>
                    <img
                      className="ml-2 cursor-pointer"
                      title="Relaod Data"
                      src={relaodSVG}
                      onClick={(e) => getRefreshStudentList()}
                      alt="Relaod Data"
                      width="27px"
                    />
                  </div>
                </div>
              </div>
              <Table className="custom-table-sec" hover responsive>
                <thead>
                {showSearch && (
                    <tr>
                      <th colSpan="100">
                        <form className="mb-0">
                          <div className="form-row mt-2">
                          <div className="form-group col-lg-3 col-md-6 col-sm-12">
                              <div className="material-textfield">
                                <input
                                  placeholder=" "
                                  name="searchStudentName"
                                  autoComplete="off"
                                  className={`form-control eb-contact-input material-input h-3em`}
                                  onChange={(e) => handleInputChange(e)}
                                  autoFocus
                                />
                                <label className="material-label text-uppercase text-1">
                                  Search student name
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-lg-3 col-md-6 col-sm-12">
                              <div className="material-textfield">
                                <input
                                  id="name"
                                  placeholder=" "
                                  name="searchSchoolName"
                                  autoComplete="off"
                                  className={`form-control eb-contact-input material-input h-3em`}
                                  onChange={(e) => handleInputChange(e)}
                                />
                                <label className="material-label text-uppercase text-1">
                                  Search school name
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-lg-3 col-md-6 col-sm-12">
                              <div className="material-textfield">
                                <select
                                  placeholder=" "
                                  name="id_province"
                                  autoComplete="off"
                                  className={`form-control eb-contact-input material-input h-3em`}
                                  onChange={(e) => {
                                    getAllCity(e.target.value);
                                    handleInputChange(e);
                                  }}
                                >
                                  <option value="">Select</option>
                                  {provinces.map(
                                    ({ id, province_name }, index) => (
                                      <option value={id} key={index}>
                                        {province_name}
                                      </option>
                                    )
                                  )}
                                </select>
                                <label className="material-label text-uppercase text-1">
                                  {t("restaurantProvince")}
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-lg-3 col-md-6 col-sm-12">
                              <div className="material-textfield">
                                <select
                                  placeholder=" "
                                  name="id_city"
                                  autoComplete="off"
                                  className={`form-control eb-contact-input material-input h-3em`}
                                  onChange={(e) => handleInputChange(e)}
                                >
                                  <option value="">Select</option>
                                  {citys.map(({ id, city_name }, index) => (
                                    <option value={id} key={index}>
                                      {city_name}
                                    </option>
                                  ))}
                                </select>
                                <label className="material-label text-uppercase text-1">
                                  {t("restaurantCity")}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="form-row mt-2">
                          <div className="form-group col-lg-6 col-md-6 col-sm-12">
                              <div className="material-textfield">
                                <select
                                  placeholder=" "
                                  name="id_grade_division_name"
                                  autoComplete="off"
                                  className={`form-control eb-contact-input material-input h-3em`}
                                  onChange={(e) => handleInputChange(e)}
                                >
                                  <option value="">Select</option>
                                  {gradeDivisions.map(({ id, grade_division_name }, index) => (
                                    <option value={id} key={index}>
                                      {grade_division_name}
                                    </option>
                                  ))}
                                </select>
                                <label className="material-label text-uppercase text-1">
                                  School Grades
                                </label>
                              </div>
                            </div>
                          </div>
                        </form>
                      </th>
                    </tr>
                  )}
                  <tr>
                    {tablefields.map((item, index) => (
                      <th className={item.sort ? "cursor-pointer" : ""} onClick={() => sortData(item)} key={index}>
                        {item.key} {pagination.sortBy === item.value &&  <i className={pagination.orderBy === "ASC" ? "fa fa-caret-up" : "fa fa-caret-down"} />}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {studentsList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.school.school_name}</td>
                      <td>{item.grade_division_name}</td>
                      <td>
                        {item.parent.first_name} {item.parent.last_name}
                      </td>
                      {item && (
                        <td>
                          <span
                            className={
                              "w-90 badge badge-pill " +
                              (item.approved_date
                                ? "badge-success"
                                : "badge-warning")
                            }
                          >
                            {item.approved_date ? "Approved" : "Pending Approval"}
                          </span>
                        </td>
                      )}
                      <td>
                        {item && item.approved_date && item.is_active && (
                          <span>
                            {Number(item.is_active) === 0 && (
                              <img
                                className="cursor-pointer"
                                title="Inactive"
                                src={InActiveIcon}
                                onClick={() => changeActiveDeactive(item)}
                                alt=""
                                width="35"
                              />
                            )}
                            {Number(item.is_active) === 1 && (
                              <img
                                className="cursor-pointer"
                                title="Active"
                                src={Activeicon}
                                onClick={() => changeActiveDeactive(item)}
                                alt=""
                                width="35"
                              />
                            )}
                          </span>
                        )}
                        {item && item.approved_date === null && (
                          <img
                            className="cursor-pointer mr-2"
                            title="Approve"
                            src={ApproveIcon}
                            onClick={() => changeAappoveDisappove(item)}
                            alt=""
                            width="24"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                  {isloader && (
                    <tr>
                      <td colSpan="100">
                        <div className="d-flex justify-content-center">
                          <i className="fa fa-spinner fa-pulse fa-4x fa-fw color-admin-theme" />
                          <span className="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {isloader === false && studentsList.length === 0 && (
                    <tr>
                      <td colSpan="100">
                        <div className="d-flex justify-content-center">
                          Record Not Found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <div className="d-lg-flex justify-content-lg-between d-md-flex justify-content-md-between mt-3">
                <div>
                  <ShowingPagination
                    pagination={pagination}
                  />
                </div>
                <div>
                  {pagination && pagination.totalPages > 0 && (
                    <Pagination
                      pagination={pagination}
                      changePage={getStudentList}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AdminStudent;
