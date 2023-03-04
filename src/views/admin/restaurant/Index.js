import React, { useState, useEffect } from "react";

import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Activeicon from "../../../assets/img/icons/active-icon.png";
import InActiveIcon from "../../../assets/img/icons/inactive-icon.png";
import EditIcon from "../../../assets/img/icons/edit-circle.svg";
import SearchIcon from "../../../assets/img/icons/search-icon.svg";
import ApproveIcon from "../../../assets/img/icons/active-icon.svg";
import ViewResMenuIcon from "../../../assets/img/icons/view-res-menu.svg";
import MenuIcon from "../../../assets/img/icons/menu.svg";
import relaodSVG from "../../../assets/img/reload.svg";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import ShowingPagination from "../../../components/ShowingPagination";
import { RenderUserStatus } from "../../../common";
import RestaurantMenuModal from "../../../components/RestaurantMenuModal";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../../../config";

import {
  GET_RESTAURANT_LIST,
  RESTAURANT_IS_ACTIVE,
  RESTAURANT_IS_APPROVED,
  GET_CITY,
  GET_PROVINCE,
} from "../../../services/ENDPOINT";

const AdminRestaurant = (props) => {
  const { t } = useTranslation();
  const [isloader, setLoader] = useState(false);
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [tablefields, setTablefields] = useState([
    { value: "first_name", key: "First Name", sort: true },
    { value: "last_name", key: "Last Name", sort: true },
    { value: "email_address", key: "Email", sort: true },
    { value: "primary_contact_number", key: "Primary Contact Number", sort: true },
    { value: "emergency_contact_number", key: "Emergency Contact Number", sort: true },
    { value: "distance", key: "Distance", sort: true },
    { value: "status", key: "Status", sort: false },
    { value: "action", key: "Action", sort: false },
  ]);
  const [pagination, setPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    restaurantName: "",
    provinceId: "",
    cityId: "",
    orderBy: "DESC",
    sortBy: "id"
  });
  const [citys, setCitys] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showRestaurantMenuPopup, setShowRestaurantMenuPopup] = useState(false);
  const [pathVariableRestaurantMenu, setPathVariable] = useState("manage-menu");
  const [popupIdRestaurantMenu, setPopupIdRestaurantMenu] = useState();
  const [perPageRowArray, setPerPageRowArray] = useState(PER_PAGE_ROWS_OPTIONS);
  const showSearchBox = () => {
    setShowSearch(!showSearch);
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

  const handleInputChange = (e) => {
    let timer = handleInputChange.timer;
    if (timer) {
      clearTimeout(timer);
    }
    handleInputChange.timer = setTimeout(async () => {
      if (e.target.name == "search") {
        pagination.restaurantName = e.target.value || "";
        pagination.provinceId = pagination.provinceId ? pagination.provinceId : "";
        pagination.cityId = pagination.cityId ? pagination.cityId : "";
        getRestaurantList()
      } else if (e.target.name == "id_province") {
        pagination.restaurantName = pagination.restaurantName ? pagination.restaurantName : "";
        pagination.provinceId = e.target.value;
        pagination.cityId = pagination.cityId ? pagination.cityId : "";
        getRestaurantList()
      } else if (e.target.name == "id_city") {
        pagination.restaurantName = pagination.restaurantName ? pagination.restaurantName : "";
        pagination.provinceId = pagination.provinceId ? pagination.provinceId : "";
        pagination.cityId = e.target.value;
        getRestaurantList()
      }
    }, 500)
  };

  const getRestaurantList = async (e) => {
    try {
      setLoader(true);
      setRestaurantsList([]);
      const data = await GET_RESTAURANT_LIST(pagination);
      if (data.code === 200 || data.code === "200") {
        setRestaurantsList(data.data.restaurants);
        const recordData = {
          currentPage: data.data.pagination.currentPage,
          orderBy: data.data.pagination.orderBy,
          perPageRows: data.data.pagination.perPageRows,
          sortBy: data.data.pagination.sortBy,
          totalItems: data.data.pagination.totalItems,
          totalPages: data.data.pagination.totalPages,
          provinceId: pagination.provinceId,
          cityId: pagination.cityId,
          restaurantName: pagination.restaurantName,
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
    getRestaurantList();
  }, []);
  const changePerPage = async (e) => {
    pagination.perPageRows = parseInt(e.target.value);
    pagination.currentPage = 1;
    getRestaurantList();
    setPagination(1);
  };
  const getRefreshRestaurantList = async (e) => {
    pagination.perPageRows = pagination.perPageRows;
    pagination.currentPage = 1;
    getRestaurantList();
    setPagination(1);
  };
  const sortData = (data) => {
    if (data.sort) {
      pagination.sortBy = data.value
      pagination.orderBy = pagination.orderBy === 'DESC' ? 'ASC' : 'DESC'
      getRestaurantList();
    }
  }

  const changeActiveDeactive = async (userInfo) => {
    const activeDeactive = Number(userInfo.is_active) === 1 ? 0 : 1;
    const payload = { id: userInfo.id, is_active: activeDeactive };
    try {
      const data = await RESTAURANT_IS_ACTIVE(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempRestaurantObject = restaurantsList.findIndex((restaurant) => {
          return restaurant.user.id == userInfo.id;
        });
        const tempRestaurantsArray = [...restaurantsList];
        if (activeDeactive == 1) {
          tempRestaurantsArray[tempRestaurantObject].user.is_active = "1";
        } else if (activeDeactive == 0) {
          tempRestaurantsArray[tempRestaurantObject].user.is_active = "0";
        }
        setRestaurantsList(tempRestaurantsArray);
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
      const data = await RESTAURANT_IS_APPROVED(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempRestaurantObject = restaurantsList.findIndex((restaurant) => {
          return restaurant.user.id == userInfo.id;
        });
        const tempRestaurantsArray = [...restaurantsList];
        if (appoveDisappove == true) {
          tempRestaurantsArray[tempRestaurantObject].user.user_status = 2;
          tempRestaurantsArray[tempRestaurantObject].user.approved_date = new Date();
          tempRestaurantsArray[tempRestaurantObject].user.is_active = "1";
        } else if (appoveDisappove == false) {
          tempRestaurantsArray[tempRestaurantObject].user.user_status = 1;
          tempRestaurantsArray[tempRestaurantObject].user.approved_date = null;
          tempRestaurantsArray[tempRestaurantObject].user.is_active = "0";
        }
        setRestaurantsList(tempRestaurantsArray);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  const viewRestaurantMenu = (recordId) => {
    setPopupIdRestaurantMenu(recordId);
    setShowRestaurantMenuPopup(true);
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
                    Restaurant List
                  </h3>
                  <p className="text-white mb-0">
                    List of Registered Restaurants
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
                      onClick={(e) => getRefreshRestaurantList()}
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
                                  Search restaurant name
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
                      <th className={item.sort ? "cursor-pointer" : ""} onClick={() => sortData(item)} key={index}>
                        {item.key} {pagination.sortBy === item.value && <i className={pagination.orderBy === "ASC" ? "fa fa-caret-up" : "fa fa-caret-down"} />}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {restaurantsList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>
                        <a href={`mailto:${item.email_address}`}>
                          {item.email_address}
                        </a>
                      </td>
                      <td>
                        <a href={`tel:${item.primary_contact_number}`}>
                          {item.primary_contact_number}
                        </a>
                      </td>
                      <td>{item.emergency_contact_number}</td>
                      <td>{item.distance}</td>
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
                          to={`/admin/update-restaurant?id=${item.id}`}
                        >
                          <img
                            className="mx-2"
                            src={EditIcon}
                            width="26"
                            alt="edit"
                            title="Edit"
                          />
                        </Link>
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
                        {item.user && item.user.approved_date !== null && (
                          <img
                            className="cursor-pointer"
                            src={ViewResMenuIcon}
                            width="26"
                            alt="view"
                            title="View Restaurant Menu"
                            onClick={(e) => viewRestaurantMenu(item)}
                          />
                        )}
                        {item.user && item.user.approved_date !== null && (
                          <Link to={`/admin/manage-menu?restaurantId=${item.id}&restaurantName=${item.restaurant_name}`}>
                            <img
                              className="cursor-pointer ml-1 mr-2"
                              src={MenuIcon}
                              alt=""
                              width="24"
                              title="Manage Menu"
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
                  {isloader === false && restaurantsList.length === 0 && (
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
                      changePage={getRestaurantList}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showRestaurantMenuPopup && (
        <RestaurantMenuModal
          closeModal={() => setShowRestaurantMenuPopup(false)}
          vendorId={popupIdRestaurantMenu}
          pathVariable={pathVariableRestaurantMenu}
          mlVariable={"mlVariable"}
        />
      )}
    </React.Fragment>
  );
};

export default AdminRestaurant;
