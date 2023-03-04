import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import queryString from "query-string";

import EditIcon from "../../../assets/img/icons/edit-circle.svg";
import DeleteIcon from "../../../assets/img/icons/delete-icon.svg";
import SearchIcon from "../../../assets/img/icons/search-icon.svg";
import Activeicon from "../../../assets/img/icons/active-icon.png";
import InActiveIcon from "../../../assets/img/icons/inactive-icon.png";
import PreviewIcon from "../../../assets/img/icons/preview.png";

import ConformationMenuDeleteModal from "../../../components/ConformationMenuDeleteModal";
import RestaurantMenuModal from "../../../components/RestaurantMenuModal";
import RestaurantMenuChangeRequestModal from "../../../components/RestaurantMenuChangeRequest";
import Pagination from "../../../components/Pagination";
import ShowingPagination from "../../../components/ShowingPagination";
import Loader from "../../../components/Loader";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../../../config";

import {
  GET_MANAGAE_MENU_LIST,
  GET_PRODUCT_CATEGORY_LIST,
  DELETE_MENU_ITEM,
  SUBMIT_MENU_APPROVAL,
  MENU_ITEM_IS_ACTIVE,
  SUBMIT_MENU_CHANGE_REQUEST,
} from "../../../services/ENDPOINT";

const ManageMenu = (props) => {
  const restaurantId = queryString.parse(location.search).restaurantId;
  const restaurantName = queryString.parse(location.search).restaurantName;
  const [isloader, setLoader] = useState(false);
  const [manageMenusList, setManageMenusList] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [productCategory1, setProductCategory1] = useState([]);
  const [tablefields, setTablefields] = useState([
    { value: "item_name", key: "Item Name", sort: false },
    { value: "description", key: "Description", sort: false },
    { value: "type", key: "Type", sort: false },
    { value: "tags", key: "Tags", sort: false },
    { value: "price", key: "Price", sort: false },
    { value: "action", key: "Action", sort: false },
  ]);
  const [pagination, setPagination] = useState({
    perPageRows:  PER_PAGE_ROWS,
    currentPage: 1,
    productName: "",
    productType: "",
    orderBy: "DESC",
    sortBy: "id",
  });
  const [showSearch, setShowSearch] = useState(false);
  const [submitMenuApproval, setSubmitMenuApproval] = useState({});
  const [showConformationMenuDeleteModal, setShowConformationMenuDeleteModal] =
    useState(false);
  const [showApprovalButton, setShowApprovalButton] = useState(false);
  const [
    popupIdConformationMenuDeleteModal,
    setPopupIdConformationMenuDeleteModal,
  ] = useState();
  const [showRestaurantMenuPopup, setShowRestaurantMenuPopup] = useState(false);
  const [showMenuChangeRequestModal, setShowMenuChangeRequestModal] =
    useState(false);
  const [pathVariableRestaurantMenuModal, setPathVariableRestaurantMenuModal] =
    useState("manage-menu");
  const [popupIdRestaurantMenuModal, setPopupIdRestaurantMenuModal] =
    useState();
  const [menuChangeRequest, setMenuChangeRequest] = useState();
  const [changeRequestDetail, setChangeRequestDetail] = useState("");
  const [perPageRowArray, setPerPageRowArray] = useState(PER_PAGE_ROWS_OPTIONS);
  const setData = () => {
    const vendor = {
      id: restaurantId,
      restaurant_name: restaurantName,
    };

    if (restaurantId) {
      setPopupIdRestaurantMenuModal(vendor);
    } else {
      setPopupIdRestaurantMenuModal(props.data.loginInfo);
    }
  };
  useEffect(() => {
    setData();
  }, []);

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
        if (e.target.value.length >= 3 || e.target.value.length == 0) {
          e.target.value.length == 0
            ? (pagination.productName = "")
            : (pagination.productName = e.target.value);
          pagination.productType = pagination.productType ? pagination.productType : "";
          setTimeout(getManageMenuList, 1000);
        }
      } else if (e.target.name == "productType") {
        pagination.productName = pagination.productName ? pagination.productName : "";
        pagination.productType = e.target.value;
        setTimeout(getManageMenuList, 0);
      }
    }, 500);
  };

  const getManageMenuList = async (e) => {
    try {
      setLoader(true);
      setManageMenusList([]);
      const payload = {
        currentPage: pagination.currentPage,
        perPageRows: pagination.perPageRows,
        vendorId: restaurantId ? restaurantId : props.data.loginInfo.id,
        menuTypeId: 1,
        productName: pagination.productName ? pagination.productName : "",
        productType: pagination.productType ? pagination.productType : "",
        orderBy: pagination.orderBy,
        sortBy: pagination.sortBy,
      };
      const data = await GET_MANAGAE_MENU_LIST(payload);
      if (data.code === 200 || data.code === "200") {
        if (data.data.menu_items.length != 0) {
          setManageMenusList(data.data.menu_items);
          const recordData = {
            currentPage: data.data.pagination.currentPage,
            orderBy: data.data.pagination.orderBy,
            perPageRows: data.data.pagination.perPageRows,
            sortBy: data.data.pagination.sortBy,
            totalItems: data.data.pagination.totalItems,
            totalPages: data.data.pagination.totalPages,
            productName: pagination.productName,
            productType: pagination.productType,
          }
          setPagination(recordData);
          setSubmitMenuApproval(data.data.menu_items[0].vendor_menu);
        }
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
    getManageMenuList();
  }, []);
  const changePerPage = async (e) => {
    pagination.perPageRows = parseInt(e.target.value);
    pagination.currentPage = 1;
    getManageMenuList();
    setPagination(1);
  };
  const sortData = (data) => {
    if (data.sort) {
      pagination.sortBy = data.value;
      pagination.orderBy = pagination.orderBy === "DESC" ? "ASC" : "DESC";
      getManageMenuList();
    }
  };
  const getProductCategoryList = async () => {
    try {
      setLoader(true);
      const data = await GET_PRODUCT_CATEGORY_LIST();
      if (data.code === 200 || data.code === "200") {
        setProductCategory(data.data);
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
    getProductCategoryList();
  }, []);

  const changeSubmitApproval = async () => {
    const payload = { id: submitMenuApproval.id };    
    try {
      const data = await SUBMIT_MENU_APPROVAL(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        if (data.status == "success") {
          setShowApprovalButton(true);
          const newObject = { ...submitMenuApproval };
          newObject.is_menu_submitted = 1;
          setSubmitMenuApproval(newObject);
          const tempManageMenuListArray = [...manageMenusList];
          for(var i=0;i<manageMenusList.length;i++){
            tempManageMenuListArray[i].vendor_menu.is_menu_submitted = 1;
          }
          setManageMenusList(tempManageMenuListArray);
        }
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
      const data = await DELETE_MENU_ITEM(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempmanageMenusListObject = manageMenusList.findIndex(
          (manageMenu) => {
            return manageMenu.id == popupIdConformationMenuDeleteModal;
          }
        );
        const tempmanageMenusListArray = [...manageMenusList];
        tempmanageMenusListArray.splice(tempmanageMenusListObject, 1);
        const newObject = { ...pagination };
        newObject.totalItems = newObject.totalItems - 1;
        var minus = newObject.totalPages - 1;
        var multiply = newObject.perPageRows * minus;
        newObject.totalPages =
          multiply == newObject.totalItems
            ? newObject.totalPages - 1
            : newObject.totalPages;

        setPagination(newObject);
        setManageMenusList(tempmanageMenusListArray);
        setShowConformationMenuDeleteModal(false);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  const changeActiveDeactive = async (userInfo) => {
    const activeDeactive = Number(userInfo.is_active) === 1 ? "0" : "1";
    const payload = { id: userInfo.id, isActive: activeDeactive };
    try {
      const data = await MENU_ITEM_IS_ACTIVE(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempmanageMenusListObject = manageMenusList.findIndex(
          (manageMenu) => {
            return manageMenu.id == userInfo.id;
          }
        );
        const tempmanageMenusListArray = [...manageMenusList];
        if (activeDeactive == 1) {
          tempmanageMenusListArray[tempmanageMenusListObject].is_active = "1";
        } else if (activeDeactive == 0) {
          tempmanageMenusListArray[tempmanageMenusListObject].is_active = "0";
        }
        setManageMenusList(tempmanageMenusListArray);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  const changeRequestDetailPopup = () => {
    const payload = {
      change_request_detail: changeRequestDetail,
    };
    setMenuChangeRequest(payload);
    setShowMenuChangeRequestModal(true);
  };
  const checkAPICall = async () => {
    try {
      setLoader(true);
      const payload = menuChangeRequest;
      const data = await SUBMIT_MENU_CHANGE_REQUEST(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    } finally {
      setLoader(false);
    }
    setShowMenuChangeRequestModal(false);
  };
  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 px-0">
      {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          <div className="col-lg-12 col-md-12 col-sm-12 mt-5">
            <div className="card-table">
              <div className="table-header-sec bg-dark-blue d-flex justify-content-between flex-lg-row flex-md-column flex-sm-column align-items-lg-center align-items-md-star">
                <div>
                  <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                    Manage Menu List
                  </h3>
                  <p className="text-white mb-0">List of Manage Menu {restaurantId && <span className="mx-1">|</span>} {restaurantId && <span className="text-color-tertiary font-weight-semibold text-4">{restaurantName}</span>}</p>
                </div>
                <div className="mt-lg-0 mt-md-2 mt-sm-2">
                  <div className="d-flex align-items-center">
                    <div>
                      {manageMenusList.length !== 0 &&
                        <img
                          className="cursor-pointer"
                          src={PreviewIcon}
                          width="27"
                          alt="preview"
                          title="Preview Menu"
                          onClick={(e) => setShowRestaurantMenuPopup(true)}
                        />
                      }
                      <img
                        className="cursor-pointer mx-2"
                        src={SearchIcon}
                        width="27"
                        onClick={() => showSearchBox()}
                        alt="search"
                      />
                    </div>
                    <select
                      className="px-2 py-1"
                      name="perPage"
                      onChange={changePerPage}
                      value={pagination.perPageRows}
                    >
                      {perPageRowArray.map((item, index) => (
                          <option value={item} key={index}>
                            {item}
                          </option>
                        )
                      )}
                    </select>
                    <div className="ml-2">
                      <Link to={"/restaurant/manage-menu"}>
                        {submitMenuApproval.is_menu_submitted == 0 &&
                          showApprovalButton == false && (
                            <Button
                              size="sm"
                              variant="success"
                              id="submitForApproval"
                              onClick={() => changeSubmitApproval()}
                            >
                              Submit for Approval
                            </Button>
                          )}
                      </Link>
                    </div>
                    {!restaurantId &&
                      submitMenuApproval.is_menu_submitted == 1 && (
                        <div className="ml-2">
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={(e) => changeRequestDetailPopup()}
                          >
                            Menu Change Request
                          </Button>
                        </div>
                      )}
                    {restaurantId && (
                      <div className="ml-2">
                        <Link to="/admin/menu-change-request">
                          <Button size="sm" variant="primary">
                            View Change Request
                          </Button>
                        </Link>
                      </div>
                    )}
                    
                      <div className="ml-2">
                        {restaurantId ? (
                          <Link
                            to={`/admin/add-menu?restaurantId=${restaurantId}&restaurantName=${restaurantName}`}
                          >
                            <Button size="sm" variant="primary">
                              + Add New Menu Items
                            </Button>
                          </Link>
                        ) : (
                          (submitMenuApproval.is_menu_submitted == 0 ||
                            manageMenusList.length === 0) && (
                          <Link to={"/restaurant/add-menu"}>
                            <Button size="sm" variant="primary">
                              + Add New Menu Items
                            </Button>
                          </Link>
                        )
                        )}
                      </div>                   
                  </div>
                </div>
              </div>
              <div>
                {submitMenuApproval.is_menu_submitted == 1 && !restaurantId && (
                  <h2 className="text-3 mt-2 ml-2 text-danger">
                    Note: Kindly contact Mums Lunch to modify the menu.
                  </h2>
                )}
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
                                  Search by item name
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-lg-4 col-md-6 col-sm-12">
                              <div className="material-textfield">
                                <select
                                  className={`form-control eb-contact-input material-input h-3em`}
                                  name="productType"
                                  onChange={(e) => handleInputChange(e)}
                                  value={productCategory1.id}
                                >
                                  <option value="">Select</option>
                                  {productCategory.map(
                                    ({ id, category_name }, index) => (
                                      <option key={index} value={id}>
                                        {category_name}
                                      </option>
                                    )
                                  )}
                                </select>
                                <label className="material-label text-uppercase text-1">
                                  Select item type
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
                        {item.key}
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
                  {manageMenusList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.vendor_product.product_name}</td>
                      <td>{item.vendor_product.product_description}</td>
                      <td>
                        {item.vendor_product.product_category.category_name}
                      </td>
                      <td>{item.vendor_product.tags}</td>
                      <td>{item.item_price}</td>
                      <td>
                        
                        {restaurantId ? (
                          <Link
                            to={`/admin/update-menu?id=${item.id}&restaurantId=${restaurantId}&restaurantName=${item.vendor_product.vendor.restaurant_name}`}
                          >
                            <img
                              src={EditIcon}
                              className="mr-2"
                              width="26"
                              alt="edit"
                              title="Edit"
                            />
                          </Link>
                        ) : (
                            item.vendor_menu.is_menu_submitted == 0 && (
                            <Link to={`/restaurant/update-menu?id=${item.id}`}>
                              <img
                                src={EditIcon}
                                className="mr-2"
                                width="26"
                                alt="edit"
                                title="Edit"
                              />
                            </Link>
                          )
                        )}
                        {restaurantId ? (
                          <img
                          className="cursor-pointer mr-2"
                          src={DeleteIcon}
                          width="24"
                          alt="delete"
                          title="Remove item"
                          onClick={(e) => openPopupAndPassId(item.id)}
                        />)
                        :
                          (item.vendor_menu.is_menu_submitted == 0 && (
                            <img
                              className="cursor-pointer mr-2"
                              src={DeleteIcon}
                              width="24"
                              alt="delete"
                              title="Remove item"
                              onClick={(e) => openPopupAndPassId(item.id)}
                            />
                        ))}
                        {item.is_active && (
                          <span>
                            {Number(item.is_active) === 1 && (
                              <img
                                className="cursor-pointer"
                                title="Activate"
                                src={Activeicon}
                                onClick={() => changeActiveDeactive(item)}
                                alt=""
                                width="35"
                              />
                            )}
                            {Number(item.is_active) === 0 && (
                              <img
                                className="cursor-pointer"
                                title="Inactivate"
                                src={InActiveIcon}
                                onClick={() => changeActiveDeactive(item)}
                                alt=""
                                width="35"
                              />
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
                  {isloader === false && manageMenusList.length === 0 && (
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
                      changePage={getManageMenuList}
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
          manageMenuId={popupIdConformationMenuDeleteModal}
          deleteMessage={"You are about to delete menu item."}
          deleteMenuItem={() => deleteMenuItem()}
        />
      )}
      {showRestaurantMenuPopup && (
        <RestaurantMenuModal
          closeModal={() => setShowRestaurantMenuPopup(false)}
          vendorId={popupIdRestaurantMenuModal}
          pathVariable={pathVariableRestaurantMenuModal}
        />
      )}
      {showMenuChangeRequestModal && (
        <RestaurantMenuChangeRequestModal
          closeModal={() => setShowMenuChangeRequestModal(false)}
          menuChangeRequest={menuChangeRequest}
          changeRequestDetail={changeRequestDetail}
          checkAPICall={() => checkAPICall()}
        />
      )}
    </React.Fragment>
  );
};
export default ManageMenu;
