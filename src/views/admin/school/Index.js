import React, { useState, useEffect } from "react";

import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import ShowingPagination from "../../../components/ShowingPagination";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../../../config";

import {
  GET_SCHOOL_LIST,
  SCHOOL_IS_ACTIVE,
  SCHOOL_IS_APPROVED,
  GET_CITY,
  GET_PROVINCE,
} from "../../../services/ENDPOINT";

import relaodSVG from "../../../assets/img/reload.svg";
import Activeicon from "../../../assets/img/icons/active-icon.png";
import ApproveIcon from "../../../assets/img/icons/active-icon.svg";
import EditIcon from "../../../assets/img/icons/edit-circle.svg";
import InActiveIcon from "../../../assets/img/icons/inactive-icon.png";
import SearchIcon from "../../../assets/img/icons/search-icon.svg";
import TeachersIcon from "../../../assets/img/icons/teachers.svg";
import GradeIcon from "../../../assets/img/icons/grade.svg";
import GradePromotionIcon from "../../../assets/img/icons/grade-promtion-black.svg";

import { RenderUserStatus } from "../../../common";

const AdminSchool = (props) => {
  const [isloader, setLoader] = useState(false);
  const [schoolsList, setSchoolsList] = useState([]);
  const [citys, setCitys] = useState([]);
  const [tablefields, setTablefields] = useState([
    { value: "school_name", key: "School Name", sort: true },
    { value: "email_address", key: "Email", sort: true },
    { value: "contact_number", key: "Contact Number", sort: true },
    { value: "postal_code", key: "Postal Code", sort: true },
    { value: "status", key: "Status", sort: false },
    { value: "action", key: "Action", sort: false },
  ]);
  const [pagination, setPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    schoolName: "",
    provinceId: "",
    cityId: "",
    orderBy: "DESC",
    sortBy: "id",
  });
  const [showSearch, setShowSearch] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [perPageRowArray, setPerPageRowArray] = useState(PER_PAGE_ROWS_OPTIONS);

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
      if (e.target.name == "search") {
        pagination.schoolName = e.target.value || "";
        pagination.provinceId = pagination.provinceId
          ? pagination.provinceId
          : "";
        pagination.cityId = pagination.cityId ? pagination.cityId : "";
        getSchoolList();
      } else if (e.target.name == "id_province") {
        pagination.schoolName = pagination.schoolName
          ? pagination.schoolName
          : "";
        pagination.provinceId = e.target.value;
        pagination.cityId = pagination.cityId ? pagination.cityId : "";
        getSchoolList();
      } else if (e.target.name == "id_city") {
        pagination.schoolName = pagination.schoolName
          ? pagination.schoolName
          : "";
        pagination.provinceId = pagination.provinceId
          ? pagination.provinceId
          : "";
        pagination.cityId = e.target.value;
        getSchoolList();
      }
    }, 500);
  };

  const getSchoolList = async (e) => {
    try {
      setLoader(true);
      setSchoolsList([]);
      const data = await GET_SCHOOL_LIST(pagination);
      if (data.code === 200 || data.code === "200") {
        setSchoolsList(data.data.schools);
        const recordData = {
          currentPage: data.data.pagination.currentPage,
          orderBy: data.data.pagination.orderBy,
          perPageRows: data.data.pagination.perPageRows,
          sortBy: data.data.pagination.sortBy,
          totalItems: data.data.pagination.totalItems,
          totalPages: data.data.pagination.totalPages,
          provinceId: pagination.provinceId,
          cityId: pagination.cityId,
          schoolName: pagination.schoolName,
        };
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
    getSchoolList();
    return () =>{
      setSchoolsList();
    }
  }, []);

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

  const changePerPage = async (e) => {
    pagination.perPageRows = parseInt(e.target.value);
    pagination.currentPage = 1;
    getSchoolList();
    setPagination(1);
  };
  const getRefreshSchoolList = async (e) => {
    pagination.perPageRows = pagination.perPageRows;
    pagination.currentPage = 1;
    getSchoolList();
    setPagination(1);
  };

  const sortData = (data) => {
    if (data.sort) {
      pagination.sortBy = data.value;
      pagination.orderBy = pagination.orderBy === "DESC" ? "ASC" : "DESC";
      getSchoolList();
    }
  };

  const changeActiveDeactive = async (userInfo) => {
    const activeDeactive = Number(userInfo.is_active) === 1 ? 0 : 1;
    const payload = { id: userInfo.id, is_active: activeDeactive };
    try {
      const data = await SCHOOL_IS_ACTIVE(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempSchoolObject = schoolsList.findIndex((schools) => {
          return schools.user.id == userInfo.id;
        });
        const tempSchoolsArray = [...schoolsList];
        if (activeDeactive == 1) {
          tempSchoolsArray[tempSchoolObject].user.is_active = "1";
        } else if (activeDeactive == 0) {
          tempSchoolsArray[tempSchoolObject].user.is_active = "0";
        }
        setSchoolsList(tempSchoolsArray);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  const changeAappoveDisappove = async (userInfo) => {
    const appoveDisappove = userInfo.approved_date ? false : true;
    const payload = { id: userInfo.id, isAppoved: appoveDisappove };
    try {
      const data = await SCHOOL_IS_APPROVED(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempSchoolObject = schoolsList.findIndex((schools) => {
          return schools.user.id == userInfo.id;
        });
        const tempSchoolsArray = [...schoolsList];
        if (appoveDisappove == true) {
          tempSchoolsArray[tempSchoolObject].user.user_status = 2;
          tempSchoolsArray[tempSchoolObject].user.approved_date = new Date();
          tempSchoolsArray[tempSchoolObject].user.is_active = "1";
        } else if (appoveDisappove == false) {
          tempSchoolsArray[tempSchoolObject].user.user_status = 1;
          tempSchoolsArray[tempSchoolObject].user.approved_date = null;
          tempSchoolsArray[tempSchoolObject].user.is_active = "0";
        }
        setSchoolsList(tempSchoolsArray);
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
                    School List
                  </h3>
                  <p className="text-white mb-0">
                    List of Registered Schools
                  </p>
                </div>
                <div>
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
                      value={pagination.perPageRows}
                    >
                      {perPageRowArray.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <div>
                      <img
                        className="ml-2 cursor-pointer"
                        title="Relaod Data"
                        src={relaodSVG}
                        onClick={(e) => getRefreshSchoolList()}
                        alt="Relaod Data"
                        width="27px"
                      />
                    </div>
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
                            <div className="form-group col-lg-4 col-md-6 col-sm-12">
                              <div className="material-textfield">
                                <input
                                  placeholder=" "
                                  name="search"
                                  autoComplete="off"
                                  className={`form-control eb-contact-input material-input h-3em`}
                                  onChange={(e) => handleInputChange(e)}
                                  autoFocus
                                />
                                <label className="material-label text-uppercase text-1">
                                  Search school name
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-sm-12">
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
                            <div className="form-group col-lg-4 col-md-6 col-sm-12">
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
                        </form>
                      </th>
                    </tr>
                  )}
                  <tr>
                    {tablefields.map((item, index) => (
                      <th
                        className={item.sort ? "cursor-pointer" : ""}
                        onClick={() => sortData(item)}
                        key={index}
                      >
                        {item.key}{" "}
                        {pagination.sortBy === item.value && (
                          <i
                            className={
                              pagination.orderBy === "ASC"
                                ? "fa fa-caret-up"
                                : "fa fa-caret-down"
                            }
                          />
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schoolsList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.school_name}</td>
                      <td>
                        <a href={`mailto:${item.email_address}`}>
                          {item.email_address}
                        </a>
                      </td>
                      <td>
                        <a href={`tel:${item.contact_number}`}>
                          {item.contact_number}
                        </a>
                      </td>
                      <td>{item.postal_code}</td>
                      {item.user && (
                        <td>
                          <span
                            className={
                              "mr-2 w-90 mt-1 badge badge-pill " +
                              (item.user.user_status === 2
                                ? "badge-success"
                                : "badge-warning")
                            }
                          >
                            {RenderUserStatus(item.user.user_status)}
                          </span>
                        </td>
                      )}
                      <td>
                        <Link
                          to={`/admin/update-school?id=${item.id}`}
                          className="mr-1"
                        >
                          <img
                            src={EditIcon}
                            width="26"
                            alt="edit"
                            title="Edit"
                          />
                        </Link>
                        {item.user && item.user.approved_date === null && (
                          <img
                            className="cursor-pointer mr-2"
                            title="Approve"
                            src={ApproveIcon}
                            onClick={() => changeAappoveDisappove(item.user)}
                            alt=""
                            width="24"
                          />
                        )}
                        {item.user &&
                          item.user.approved_date &&
                          item.user.is_active && (
                            <span>
                              {Number(item.user.is_active) === 0 && (
                                <img
                                  className="cursor-pointer mr-2"
                                  title="Inactive"
                                  src={InActiveIcon}
                                  onClick={() =>
                                    changeActiveDeactive(item.user)
                                  }
                                  alt=""
                                  width="35"
                                />
                              )}
                              {Number(item.user.is_active) === 1 && (
                                <img
                                  className="cursor-pointer mr-2"
                                  title="Active"
                                  src={Activeicon}
                                  onClick={() =>
                                    changeActiveDeactive(item.user)
                                  }
                                  alt=""
                                  width="35"
                                />
                              )}
                            </span>
                          )}
                          {item.user && item.user.approved_date !== null && (
                        <Link
                          to={`/admin/teacher-list?schoolId=${item.id}&schoolName=${item.school_name}`}
                        >
                          <img
                            className="cursor-pointer mr-2"
                            src={TeachersIcon}
                            width="24"
                            title="Manage Teacher"
                            alt=""
                          />
                        </Link>
                          )}
                          {item.user && item.user.approved_date !== null && (
                        <Link
                          to={`/admin/school-grades?schoolId=${item.id}&schoolName=${item.school_name}`}
                          >
                        <img
                          className="cursor-pointer mr-2"
                          src={GradeIcon}
                          width="24"
                          title="Manage Grade"
                          alt=""
                        />
                        </Link>
                        )}
                        {item.user && item.user.approved_date !== null && (
                        <Link
                          to={`/admin/grade-promotion?schoolId=${item.id}&schoolName=${item.school_name}`}
                        >
                        <img
                          className="cursor-pointer"
                          src={GradePromotionIcon}
                          width="24"
                          title="Manage Grade Promotion"
                          alt=""
                        />
                        </Link>
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
                  {isloader === false && schoolsList.length === 0 && (
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
                  <ShowingPagination pagination={pagination} />
                </div>
                <div>
                  {pagination && pagination.totalPages > 0 && (
                    <Pagination
                      pagination={pagination}
                      changePage={getSchoolList}
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
export default AdminSchool;
