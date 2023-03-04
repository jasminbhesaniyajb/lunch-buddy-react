import React, { useState, useEffect } from "react";

import relaodSVG from "../../../assets/img/reload.svg";

import { Table } from "react-bootstrap";
import { toast } from "react-toastify";

import { GET_SCHOOL_LIST } from "../../../services/ENDPOINT";

import Pagination from "../../../components/Pagination";
import ShowingPagination from "../../../components/ShowingPagination";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../../../config";

const AdminDashboardSchoolTable = (props) => {
  const [isloader, setLoader] = useState(false);
  const [schoolsList, setSchoolsList] = useState([]);
  const [pagination, setPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    schoolName: "",
    provinceId: "",
    cityId: "",
    orderBy: "DESC",
    sortBy: "id",
  });
  const [perPageRowArray, setPerPageRowArray] = useState(PER_PAGE_ROWS_OPTIONS);

  const getSchoolList = async (e) => {
    try {
      setSchoolsList([]);
      setLoader(true);
      const payload = {
        currentPage: pagination.currentPage,
        perPageRows: pagination.perPageRows,
        schoolName: pagination.schoolName,
        provinceId: pagination.provinceId,
        cityId: pagination.cityId,
        orderBy: pagination.orderBy,
        sortBy: pagination.sortBy,
      };
      const data = await GET_SCHOOL_LIST(payload);
      if (data.code === 200 || data.code === "200") {
        setSchoolsList(data.data.schools);
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
    getSchoolList();
    return ()=>{
      setSchoolsList();
    }
  }, []);

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

  return (
    <React.Fragment>
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="parent-table-sec">
          <div className="table-header-sec bg-dark-blue d-flex justify-content-between align-items-center">
            <div>
              <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                School List
              </h3>
              <p className="text-white mb-0">
                List of new student registration
              </p>
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
                onClick={(e) => getRefreshSchoolList()}
                alt="Relaod Data"
                width="27px"
              />
            </div>
          </div>
          <div>
            <Table className="custom-table-sec" hover responsive>
              <thead>
                <tr>
                  <th>School Name</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Fax Number</th>
                  <th>Website</th>
                  <th>Postal Code</th>
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
                    <td>{item.fax_number}</td>
                    <td>
                      <a
                        href={item.web_site_address}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.web_site_address}
                      </a>
                    </td>
                    <td>{item.postal_code}</td>
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
    </React.Fragment>
  );
};
export default AdminDashboardSchoolTable;
