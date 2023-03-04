import React, { useState, useEffect } from "react";

import {Table, Button} from "react-bootstrap";
import EditIcon from "../../../assets/img/icons/edit-circle.svg";
import Activeicon from "../../../assets/img/icons/active-icon.png";
import InActiveIcon from "../../../assets/img/icons/inactive-icon.png";
import DeleteIcon from "../../../assets/img/icons/delete-icon.svg";
import OrderNowIcon from "../../../assets/img/icons/view-order.svg";
import relaodSVG from "../../../assets/img/reload.svg";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import ShowingPagination from "../../../components/ShowingPagination";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../../../config";

import ConformationMenuDeleteModal from "../../../components/ConformationMenuDeleteModal";

import {
  GET_PARENT_STUDENT_LIST,
  GET_SCHOOL_DROPDOWN_LIST,
  STUDENT_IS_ACTIVE,
  DELETE_PARENT_STUDENT
} from "../../../services/ENDPOINT";

const ParentStudent = () => {
  const [isloader, setLoader] = useState(false);
  const [studentsList, setStudentsList] = useState([]);
  const [showConformationMenuDeleteModal, setShowConformationMenuDeleteModal] = useState(false);
  const [popupIdConformationMenuDeleteModal, setPopupIdConformationMenuDeleteModal] = useState();
  const [schoolsList, setSchoolsList] = useState([]);
  const [tablefields, setTablefields] = useState([
    { value: "first_name", key: "First Name", sort: true },
    { value: "last_name", key: "Last Name", sort: true },
    { value: "school_name", key: "School Name", sort: true },
    { value: "student_grade", key: "School Grade", sort: true },
    { value: "status", key: "Status", sort: false },
    { value: "action", key: "Action", sort: false },
  ]);  
  const [pagination, setPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    orderBy: "DESC",
    sortBy: "id"
  });
  const [perPageRowArray, setPerPageRowArray] = useState(PER_PAGE_ROWS_OPTIONS);
  const getStudentList = async (e) => {
    try {
      setLoader(true);
      setStudentsList([]);
      const data = await GET_PARENT_STUDENT_LIST(pagination);
      if (data.code === 200 || data.code === "200") {
        setStudentsList(data.data.studens);
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
    getStudentList();
    return () =>{
    setStudentsList();
    }
  }, []);
  
  const getSchoolList = async () => {
    try {
      setLoader(true);
      const data = await GET_SCHOOL_DROPDOWN_LIST();
      if (data.code === 200 || data.code === "200") {
        setSchoolsList(data.data);
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
  }, []);

  const changePerPage = async (e) => {
    pagination.perPageRows = parseInt(e.target.value);
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
  const getRefreshStudentList = async (e) => {
    pagination.perPageRows = pagination.perPageRows;
    pagination.currentPage = 1;
    getStudentList();
    setPagination(1);
  };
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

  const openPopupAndPassId = (recordId) => {
    setPopupIdConformationMenuDeleteModal(recordId);
    setShowConformationMenuDeleteModal(true);
  };
  const deleteMenuItem = async () => {
    const payload = { id: popupIdConformationMenuDeleteModal };
    try {
      const data = await DELETE_PARENT_STUDENT(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempStudentObject = studentsList.findIndex((student) => {
          return student.id == popupIdConformationMenuDeleteModal;
        });
        const tempStudentArray = [...studentsList];
        tempStudentArray.splice(tempStudentObject, 1);
        
        const tempPaginationObject = {...pagination}
        tempPaginationObject.totalItems = tempPaginationObject.totalItems-1
        
        var minus = tempPaginationObject.totalPages - 1
        var multiply = tempPaginationObject.perPageRows * minus        
        tempPaginationObject.totalPages = multiply==tempPaginationObject.totalItems ? tempPaginationObject.totalPages - 1 : tempPaginationObject.totalPages
        setStudentsList(tempStudentArray)
        setPagination(tempPaginationObject)
        setShowConformationMenuDeleteModal(false)
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
                  My Child 
                  </h3>
                  <p className="text-white mb-0">
                    List of Registered Children
                  </p>
                </div>
                <div className="d-flex align-items-center margin-top-sm-12">
                  <div className="mr-2">
                    <Link to={"/parent/add-student"}>
                      <Button size="sm" variant="primary">
                        Add Child
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <select
                      className="px-2 py-1"
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
                  </div>
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
              <Table className="custom-table-sec" responsive hover>
                <thead>
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
                      <td>
                        {item.school &&
                          item.school.school_name &&
                          item.school.school_name}
                      </td>
                      <td>{item.grade_division_name}</td>
                        {item && (
                          <td>
                            <span className={
                              "mr-2 w-90 badge badge-pill " +
                              (item.approved_date
                                ? "badge-success"
                                : "badge-warning")
                              }
                            >
                            {item.approved_date ? "Approved" : "Not Approved"}
                            </span>
                          </td>
                        )}
                      <td>
                      <Link
                          to={`/parent/update-student?id=${item.id}`}
                          className="mr-2"
                        >
                          <img src={EditIcon} width="26" alt="edit" title="Edit" />
                        </Link>
                        
                        <img
                          className="cursor-pointer mr-2"
                          src={DeleteIcon}
                          width="24"
                          alt="delete"
                          title="Remove Child"
                          onClick={(e) => openPopupAndPassId(item.id)}
                        />
                        {item && item.approved_date && item.is_active && (
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
                        {item && item.approved_date && item.is_active && (
                          <span>
                          {Number(item.is_active) === 1 && (
                        <Link
                          to={`/parent/home?id=${item.id}`}
                        >
                          <img
                            className="cursor-pointer"
                            src={OrderNowIcon}
                            width="24"
                            alt="orderNow"
                            title="Order Now"
                          />
                        </Link>
                        )}
                          </span>
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
      {showConformationMenuDeleteModal && (
        <ConformationMenuDeleteModal
          closeModal={() => setShowConformationMenuDeleteModal(false)}
          deleteMessage={"You are about to delete child."}
          eventId={popupIdConformationMenuDeleteModal}
          deleteMenuItem={() => deleteMenuItem()}
        />
      )}
    </React.Fragment>
  );
};
export default ParentStudent;
