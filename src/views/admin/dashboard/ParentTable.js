import React, { useState, useEffect } from "react";

import { Table } from "react-bootstrap";

import { toast } from "react-toastify";

import { GET_PARENT_LIST } from "../../../services/ENDPOINT";

import relaodSVG from "../../../assets/img/reload.svg";

import Pagination from "../../../components/Pagination";
import ShowingPagination from "../../../components/ShowingPagination";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../../../config";

const AdminDashboardParentTable = (props) => {
  const [isloader, setLoader] = useState(false);
  const [parentsList, setParentsList] = useState([]);
  const [pagination, setPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    parentName: "",
    orderBy: "DESC",
    sortBy: "id",
  });
  const [perPageRowArray, setPerPageRowArray] = useState(PER_PAGE_ROWS_OPTIONS);
  const getParentList = async (e) => {
    try {
      setParentsList([]);
      setLoader(true);
      const payload = {
        currentPage: pagination.currentPage,
        perPageRows: pagination.perPageRows,
        parentName: "",
        orderBy: pagination.orderBy,
        sortBy: pagination.sortBy,
      };
      const data = await GET_PARENT_LIST(payload);
      if (data.code === 200 || data.code === "200") {
        setParentsList(data.data.parents);
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
    getParentList();
    return ()=>{
      setParentsList();
    }
  }, []);
  const changePerPage = async (e) => {
    pagination.perPageRows = parseInt(e.target.value);
    pagination.currentPage = 1;
    getParentList();
    setPagination(1);
  };
  const getRefreshParentList = async (e) => {
    pagination.perPageRows = pagination.perPageRows;
    pagination.currentPage = 1;
    getParentList();
    setPagination(1);
  };
  return (
    <React.Fragment>
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="parent-table-sec">
          <div className="table-header-sec bg-dark-blue d-flex justify-content-between align-items-center">
            <div>
              <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                Parent List
              </h3>
              <p className="text-white mb-0">List of new parent registration</p>
            </div>
            <div className="d-flex align-items-center">
              <select
                className="px-2 py-1 mr-2"
                name="perPage"
                onChange={changePerPage}
              >
                {perPageRowArray.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
              <img
                className="ml-2 cursor-pointer"
                title="Relaod Data"
                src={relaodSVG}
                onClick={(e) => getRefreshParentList()}
                alt="Relaod Data"
                width="27px"
              />
            </div>
          </div>
          <div>
            <Table className="custom-table-sec" hover responsive>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                </tr>
              </thead>
              <tbody>
                {parentsList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
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
                {isloader === false && parentsList.length === 0 && (
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
                    changePage={getParentList}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AdminDashboardParentTable;
