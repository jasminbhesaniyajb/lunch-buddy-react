import React, { useState, useEffect } from "react";

import relaodSVG from "../assets/img/reload.svg";
import SearchIcon from "../assets/img/icons/search-icon.svg";
import EditIcon from "../assets/img/icons/edit-circle.svg";
import Activeicon from "../assets/img/icons/active-icon.png";
import InActiveIcon from "../assets/img/icons/inactive-icon.png";
import DeleteIcon from "../assets/img/icons/delete-icon.svg";

import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import queryString from "query-string";

import Loader from "./Loader";

import Pagination from "./Pagination";
import ShowingPagination from "./ShowingPagination";
import ConformationMenuDeleteModal from "./ConformationMenuDeleteModal";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../config";

import {
  GET_TEACHER_LIST,
  TEACHER_IS_ACTIVE,
  DELETE_TEACHER
} from "../services/ENDPOINT";

const SchoolTeacher = (props) => {
  const [isloader, setLoader] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [perPageRowArray, setPerPageRowArray] = useState(PER_PAGE_ROWS_OPTIONS);
  const [teachersList, setTeachersList] = useState([]);
  const [popupIdConformationTeacherDeleteModal,setPopupIdConformationTeacherDeleteModal] = useState();
  const [showConformationTeacherDeleteModal, setShowConformationTeacherDeleteModal] = useState(false);
  const paramsId = queryString.parse(location.search).schoolId;
  const schoolName = queryString.parse(location.search).schoolName; 
  const [tablefields, setTablefields] = useState([
    { value: "teacher_name", key: "Teacher Name", sort: true },
    { value: "email_address", key: "Email", sort: true },
    { value: "contact_number", key: "Contact Number", sort: true },
    { value: "action", key: "Action", sort: false },
  ]);
  const [pagination, setPagination] = useState({
    currentPage:  1,
    perPageRows: PER_PAGE_ROWS,
    schoolId: paramsId ? paramsId : props.data.loginInfo.id,
    teacherName: "",
    orderBy: "DESC",
    sortBy: "id"
  });

  const showSearchBox = () => {
    setShowSearch(!showSearch);
  };

  const getTeacherList = async (e) => {
    try {
      setLoader(true);
      setTeachersList([]);
      const payload = {
        currentPage: pagination.currentPage,
        perPageRows: pagination.perPageRows,
        schoolId: pagination.schoolId,
        teacherName: pagination.teacherName,
        orderBy: pagination.orderBy,
        sortBy: pagination.sortBy
      };
      const data = await GET_TEACHER_LIST(payload);
      if (data.code === 200 || data.code === "200") {
        setTeachersList(data.data.menu_items);
        setPagination(data.data.pagination);
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
    getTeacherList();
    return ()=>{
      setTeachersList();
    }
  }, []);

  const changePerPage = async (e) => {
    pagination.perPageRows = parseInt(e.target.value);
    pagination.currentPage = 1;
    getTeacherList();
    setPagination(1);
  };

  const sortData = (data) => {
    if (data.sort) {
      pagination.sortBy = data.value
      pagination.orderBy = pagination.orderBy === 'DESC' ? 'ASC' : 'DESC'
      getTeacherList();
    }
  }
  const getRefreshTeacherList = async (e) => {
    pagination.perPageRows = pagination.perPageRows;
    pagination.currentPage = 1;
    getTeacherList();
    setPagination(1);
  };

  const changeActiveDeactive = async (userInfo) => {
    const activeDeactive = Number(userInfo.is_active) === 1 ? "0" : "1";
    const payload = { id: userInfo.id, is_active: activeDeactive };
    try {
      const data = await TEACHER_IS_ACTIVE(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempTeachersObject = teachersList.findIndex((teacher) => {
          return teacher.id == userInfo.id;
        });
        const tempTeachersArray = [...teachersList];
        if (activeDeactive == 1) {
          tempTeachersArray[tempTeachersObject].is_active = "1";
        } else if (activeDeactive == 0) {
          tempTeachersArray[tempTeachersObject].is_active = "0";
        }
        setTeachersList(tempTeachersArray);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const openPopupAndPassId = (recordId) => {
    setPopupIdConformationTeacherDeleteModal(recordId);
    setShowConformationTeacherDeleteModal(true);
  };
  const deleteMenuItem = async () => {
    const payload = { id: popupIdConformationTeacherDeleteModal };
    try {
      const data = await DELETE_TEACHER(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempTeacherListObject = teachersList.findIndex(
          (teacher) => {
            return teacher.id == popupIdConformationTeacherDeleteModal;
          }
        );
        const tempTeacherListArray = [...teachersList];
        tempTeacherListArray.splice(tempTeacherListObject, 1);
        const newObject = { ...pagination };
        newObject.totalItems = newObject.totalItems - 1;
        var minus = newObject.totalPages - 1;
        var multiply = newObject.perPageRows * minus;
        newObject.totalPages =
          multiply == newObject.totalItems
            ? newObject.totalPages - 1
            : newObject.totalPages;

        setPagination(newObject);
        setTeachersList(tempTeacherListArray);
        setShowConformationTeacherDeleteModal(false);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const handleInputChange = (e) => {
    let timer = handleInputChange.timer;
    if (timer) {
      clearTimeout(timer);
    }
    handleInputChange.timer = setTimeout(async () => {
      if(e.target.name == "search"){
        pagination.teacherName = e.target.value || "";
        getTeacherList();
      }
    }, 500)
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
                    Teacher List
                  </h3>
                  <p className="text-white mb-0">List of Teachers {paramsId && <span className="mx-1">|</span>} {paramsId && <span className="text-color-tertiary font-weight-semibold text-4">{schoolName}</span>}</p>
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      className="cursor-pointer mr-2"
                      src={SearchIcon}
                      width="27"
                      alt="search"
                      onClick={() => showSearchBox()}
                    />
                  </div>
                  <div className="mr-2">
                    <select
                      className="px-2 py-1"
                      name="perPage"
                      onChange={changePerPage}
                    >
                      {perPageRowArray.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mr-2">
                    {paramsId ?
                      <Link to={`/admin/add-teacher?schoolId=${paramsId}&schoolName=${schoolName}`}>
                        <Button size="sm" variant="primary">
                          Add Teacher
                        </Button>
                      </Link>
                      :
                      <Link to={`/school/add-teacher`}>
                        <Button size="sm" variant="primary">
                          Add Teacher
                        </Button>
                      </Link>
                    }
                  </div>
                  <div>
                    <img
                      className="cursor-pointer"
                      title="Relaod Data"
                      src={relaodSVG}
                      alt="Relaod Data"
                      width="27px"
                      onClick={(e) => getRefreshTeacherList()}
                    />
                  </div>
                </div>
              </div>
              <Table className="custom-table-sec" responsive hover>
                <thead>
                  {showSearch && (
                    <tr>
                      <th colSpan="100">
                        <form className="mb-0">
                          <div className="form-row mt-2">
                            <div className="form-group col-lg-4 col-md-6 col-sm-12">
                              <div className="material-textfield">
                                <input
                                  id="name"
                                  placeholder=" "
                                  name="search"
                                  autoComplete="off"
                                  className={`form-control eb-contact-input material-input h-3em`}
                                  onChange={(e) => handleInputChange(e)}
                                  autoFocus
                                />
                                <label className="material-label text-uppercase text-1">
                                  Teacher Name
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
                  {teachersList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.teacher_name}</td>
                      <td>{item.email_address}</td>
                      <td>{item.contact_number}</td>
                      <td>
                        {paramsId ?
                          <Link to={`/admin/update-teacher?id=${item.id}&schoolId=${paramsId}&schoolName=${item.school.school_name}`}>
                          <img
                            className="mr-2 cursor-pointer"
                            src={EditIcon}
                            width="26"
                            alt="edit"
                            title="Edit"
                          />
                          </Link>
                          :
                          <Link to={`/school/update-teacher?id=${item.id}`}>
                          <img
                            className="mr-2 cursor-pointer"
                            src={EditIcon}
                            width="26"
                            alt="edit"
                            title="Edit"
                          />
                        </Link>
                        }                        
                        {item && item.is_active && (
                          <span>
                            {Number(item.is_active) === 0 && (
                              <img
                                className="cursor-pointer mr-2"
                                title="Inactive"
                                src={InActiveIcon}
                                onClick={() => changeActiveDeactive(item)}
                                alt=""
                                width="35"
                              />
                            )}
                            {Number(item.is_active) === 1 && (
                              <img
                                className="cursor-pointer mr-2"
                                title="Active"
                                src={Activeicon}
                                onClick={() => changeActiveDeactive(item)}
                                alt=""
                                width="35"
                              />
                            )}
                          </span>
                        )}
                        <img
                          className="cursor-pointer mr-2"
                          src={DeleteIcon}
                          width="24"
                          alt="delete"
                          title="Remove Teacher"
                          onClick={(e) => openPopupAndPassId(item.id)}
                        />
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
                  {isloader === false && teachersList.length === 0 && (
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
                      changePage={getTeacherList}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showConformationTeacherDeleteModal && (
        <ConformationMenuDeleteModal
          closeModal={() => setShowConformationTeacherDeleteModal(false)}
          manageMenuId={popupIdConformationTeacherDeleteModal}
          deleteMessage={"You are about to delete teacher."}
          deleteMenuItem={() => deleteMenuItem()}
        />
      )}
    </React.Fragment>
  );
};
export default SchoolTeacher;
