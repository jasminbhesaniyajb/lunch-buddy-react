import React, { useState } from "react";

import Activeicon from "../assets/img/icons/active-icon.png";
import InActiveIcon from "../assets/img/icons/inactive-icon.png";
import EditIcon from "../assets/img/icons/edit-circle.svg";
import DeleteIcon from "../assets/img/icons/delete-icon.svg";

import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import AddMasterModal from "../components/AddMaster";
import ConformationMenuDeleteModal from "../components/ConformationMenuDeleteModal";
import Pagination from "../components/Pagination";
import ShowingPagination from "../components/ShowingPagination";

import {
  ADD_GRADE,
  UPDATE_GRADE,
  GET_GRADE_BY_ID,
  ADD_MENU_TYPE,
  UPDATE_MENU_TYPE,
  GET_MENU_TYPE_BY_ID,
  ADD_FRANCHISE,
  UPDATE_FRANCHISE,
  GET_FRANCHISE_BY_ID,
  ADD_ALLERGEN,
  UPDATE_ALLERGEN,
  GET_ALLERGEN_BY_ID,
  ADD_NUTRITIONAL_TERM,
  UPDATE_NUTRITIONAL_TERM,
  GET_NUTRITIONAL_TERM_BY_ID,
  ADD_PAYMENT_FREQUENCY,
  UPDATE_PAYMENT_FREQUENCY,
  GET_PAYMENT_FREQUENCY_BY_ID,
  ADD_PAYMENT_METHOD,
  UPDATE_PAYMENT_METHOD,
  GET_PAYMENT_METHOD_BY_ID,
  ADD_PROVINCE,
  UPDATE_PROVINCE,
  GET_PROVINCE_BY_ID,
  ADD_CITY,
  UPDATE_CITY,
  GET_CITY_BY_ID,
  GRADE_IS_ACTIVE,
  MENU_TYPE_IS_ACTIVE,
  FRANCHISE_IS_ACTIVE,
  ALLERGEN_IS_ACTIVE,
  NUTRITIONAL_TERM_IS_ACTIVE,
  PAYMENT_FREQUENCY_IS_ACTIVE,
  PAYMENT_METHOD_IS_ACTIVE,
  PROVINCE_IS_ACTIVE,
  CITY_IS_ACTIVE,
  DELETE_GRADE,
  DELETE_MENU_TYPE,
  DELETE_FRANCHISE,
  DELETE_ALLERGEN,
  DELETE_NUTRITIONAL_TERM,
  DELETE_PAYMENT_FREQUENCY,
  DELETE_PAYMENT_METHOD,
  DELETE_PROVINCE,
  DELETE_CITY,
} from "../services/ENDPOINT";

const MastersTable = (props) => {
  const [isloader, setLoader] = useState(false);
  const [addMasterId, setAddMasterId] = useState();
  const [showAddMasterModal, setShowAddMasterModal] = useState(false);
  const [addMasterItemName, setAddMasterItemName] = useState("");
  const [paramsId, setParamsId] = useState(null);
  
  const [
    showConformationMasterDeleteModal,
    setShowConformationMasterDeleteModal,
  ] = useState(false);
  const [
    popupIdConformationMasterDeleteModal,
    setPopupIdConformationMasterDeleteModal,
  ] = useState();
  const [tablefields, setTablefields] = useState([    
    { value: "item_name", key: props.title, sort: true },
    { value: "action", key: "Action", sort: false },
  ]);
  const [cityTablefields, setCityTablefields] = useState([    
      { value: "province_name", key: "Provinces", sort: true },
      { value: "item_name", key: props.title, sort: true },
      { value: "action", key: "Action", sort: false }    
  ]);
  const addMasterData = (recordId, recordName, titleName, provinceId) => {
    if (recordId == 0 && titleName == "Cities") {
      const payload = {
        id_province: 0,
        item_name: "",
      };
      setAddMasterId(payload);
      setShowAddMasterModal(true);
    } else if (recordId == 0) {
      const payload = { item_name: "" };
      setAddMasterId(payload);
      setShowAddMasterModal(true);
    } else if (titleName == "Cities") {
      const payload = {
        id: recordId,
        id_province: provinceId,
        item_name: recordName,
      };
      setAddMasterId(payload);
      setShowAddMasterModal(true);
    } else {
      const payload = {
        id: recordId,
        item_name: recordName,
      };
      setAddMasterId(payload);
      setShowAddMasterModal(true);
    }
  };

  const checkAPICall = async (event) => {
    if (paramsId == null) {
      try {
        const payload = addMasterId;
        var data = {};
        switch (event) {
          case "Menu Types":
            data = await ADD_MENU_TYPE(payload);
            break;
          case "Franchises":
            data = await ADD_FRANCHISE(payload);
            break;
          case "Allergens":
            data = await ADD_ALLERGEN(payload);
            break;
          case "Nutritional Terms":
            data = await ADD_NUTRITIONAL_TERM(payload);
            break;
          case "Payment Frequencies":
            data = await ADD_PAYMENT_FREQUENCY(payload);
            break;
          case "Payment Methods":
            data = await ADD_PAYMENT_METHOD(payload);
            break;
          case "Provinces":
            data = await ADD_PROVINCE(payload);
            break;
          case "Cities":
            data = await ADD_CITY(payload);
            break;
          default:
            data = await ADD_GRADE(payload);
        }
        if (data.code === 200 || data.code === "200") {
          if (data.data) {
            toast.success(data.message);
            setShowAddMasterModal(false);
            props.getMastersList(props.title);
          } else {
            toast.error(data.message);
          }
        } else {
          toast.error(data.message);
        }
      } catch ({ data }) {
        toast.error(data.message);
      } finally {
        setLoader(false);
      }
    } else {
      try {
        const payload = addMasterId;
        setLoader(true);
        var data = {};
        switch (event) {
          case "Menu Types":
            data = await UPDATE_MENU_TYPE(payload);
            break;
          case "Franchises":
            data = await UPDATE_FRANCHISE(payload);
            break;
          case "Allergens":
            data = await UPDATE_ALLERGEN(payload);
            break;
          case "Nutritional Terms":
            data = await UPDATE_NUTRITIONAL_TERM(payload);
            break;
          case "Payment Frequencies":
            data = await UPDATE_PAYMENT_FREQUENCY(payload);
            break;
          case "Payment Methods":
            data = await UPDATE_PAYMENT_METHOD(payload);
            break;
          case "Provinces":
            data = await UPDATE_PROVINCE(payload);
            break;
          case "Cities":
            data = await UPDATE_CITY(payload);
            break;
          default:
            data = await UPDATE_GRADE(payload);
        }
        if (data.code === 200 || data.code === "200") {
          toast.success(data.message);
          setShowAddMasterModal(false);
          setParamsId(null)
          props.getMastersList(props.title);
        } else {
          toast.error(data.message);
        }
      } catch ({ data }) {
        toast.error(data.message);
      }
    }
  };

  const checkMasterDataEditInfo = async (event, recordId) => {
    setParamsId(recordId);
    try {
      const payload = recordId;
      var data = {};      
      switch (event) {
        case "Menu Types":
          data = await GET_MENU_TYPE_BY_ID(payload);
          break;
        case "Franchises":
          data = await GET_FRANCHISE_BY_ID(payload);
          break;
        case "Allergens":
          data = await GET_ALLERGEN_BY_ID(payload);
          break;
        case "Nutritional Terms":
          data = await GET_NUTRITIONAL_TERM_BY_ID(payload);
          break;
        case "Payment Frequencies":
          data = await GET_PAYMENT_FREQUENCY_BY_ID(payload);
          break;
        case "Payment Methods":
          data = await GET_PAYMENT_METHOD_BY_ID(payload);
          break;
        case "Provinces":
          data = await GET_PROVINCE_BY_ID(payload);
          break;
        case "Cities":
          data = await GET_CITY_BY_ID(payload);
          break;
        default:
          data = await GET_GRADE_BY_ID(payload);
      }
      if (data.code === 200 || data.code === "200") {
        switch (event) {
          case "Menu Types":
            setParamsId(data.data.id);
          setAddMasterItemName(data.data.menu_type_name);
          addMasterData(data.data.id, data.data.menu_type_name, props.title, 0);
          data = await GET_MENU_TYPE_BY_ID(payload);
            break;
          case "Franchises":
            setParamsId(data.data.id);
          setAddMasterItemName(data.data.franchise_name);
          addMasterData(data.data.id, data.data.franchise_name, props.title, 0);
          data = await GET_FRANCHISE_BY_ID(payload);
            break;
          case "Allergens":
            setParamsId(data.data.id);
            setAddMasterItemName(data.data.allergen);
            addMasterData(data.data.id, data.data.allergen, props.title, 0);
            data = await GET_ALLERGEN_BY_ID(payload);
            break;
          case "Nutritional Terms":
            setParamsId(data.data.id);
            setAddMasterItemName(data.data.nutritional_name);
            addMasterData(data.data.id, data.data.nutritional_name, props.title, 0);
            data = await GET_NUTRITIONAL_TERM_BY_ID(payload);
            break;
          case "Payment Frequencies":
            setParamsId(data.data.id);
            setAddMasterItemName(data.data.frequency);
            addMasterData(data.data.id, data.data.frequency, props.title, 0);
            data = await GET_PAYMENT_FREQUENCY_BY_ID(payload);
            break;
          case "Payment Methods":
            setParamsId(data.data.id);
            setAddMasterItemName(data.data.method_name);
            addMasterData(data.data.id, data.data.method_name, props.title, 0);
            data = await GET_PAYMENT_METHOD_BY_ID(payload);
            break;
          case "Provinces":
            setParamsId(data.data.id);
            setAddMasterItemName(data.data.province_name);
            addMasterData(data.data.id, data.data.province_name, props.title, 0);
            data = await GET_PROVINCE_BY_ID(payload);
            break;
          case "Cities":
            setParamsId(data.data.id);
            setAddMasterItemName(data.data.city_name);
            addMasterData( data.data.id, data.data.city_name, props.title, data.data.id_province);
            data = await GET_CITY_BY_ID(payload);
            break;
          default:
            setParamsId(data.data.id);
          setAddMasterItemName(data.data.grade_name);
          addMasterData(data.data.id, data.data.grade_name, props.title, 0);
          data = await GET_GRADE_BY_ID(payload);
        }
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const changeActiveDeactive = async (userInfo) => {
    const activeDeactive = Number(userInfo.is_active) === 1 ? 0 : 1;
    const payload = { id: userInfo.id, is_active: activeDeactive };
    try {
      var data = {};
      switch (props.title) {
        case "Menu Types":
          data = await MENU_TYPE_IS_ACTIVE(payload);
          break;
        case "Franchises":
          data = await FRANCHISE_IS_ACTIVE(payload);
          break;
        case "Allergens":
          data = await ALLERGEN_IS_ACTIVE(payload);
          break;
        case "Nutritional Terms":
          data = await NUTRITIONAL_TERM_IS_ACTIVE(payload);
          break;
        case "Payment Frequencies":
          data = await PAYMENT_FREQUENCY_IS_ACTIVE(payload);
          break;
        case "Payment Methods":
          data = await PAYMENT_METHOD_IS_ACTIVE(payload);
          break;
        case "Provinces":
          data = await PROVINCE_IS_ACTIVE(payload);
          break;
        case "Cities":
          data = await CITY_IS_ACTIVE(payload);
          break;
        default:
          data = await GRADE_IS_ACTIVE(payload);
      }      
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempMastersObject = props.mastersList.findIndex((master) => {
          return master.id == userInfo.id;
        });
        const tempMastersArray = [...props.mastersList];
        if (activeDeactive == 1) {
          tempMastersArray[tempMastersObject].is_active = "1";
        } else if (activeDeactive == 0) {
          tempMastersArray[tempMastersObject].is_active = "0";
        }
        props.activeDeactive(tempMastersArray);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const openPopupAndPassId = (recordId) => {
    setPopupIdConformationMasterDeleteModal(recordId);
    setShowConformationMasterDeleteModal(true);
  };

  const deleteMenuItem = async () => {
    const payload = { id: popupIdConformationMasterDeleteModal };
    try {
      var data = {};
      switch (props.title) {
        case "Menu Types":
          data = await DELETE_MENU_TYPE(payload);
          break;
        case "Franchises":
          data = await DELETE_FRANCHISE(payload);
          break;
        case "Allergens":
          data = await DELETE_ALLERGEN(payload);
          break;
        case "Nutritional Terms":
          data = await DELETE_NUTRITIONAL_TERM(payload);
          break;
        case "Payment Frequencies":
          data = await DELETE_PAYMENT_FREQUENCY(payload);
          break;
        case "Payment Methods":
          data = await DELETE_PAYMENT_METHOD(payload);
          break;
        case "Provinces":
          data = await DELETE_PROVINCE(payload);
          break;
        case "Cities":
          data = await DELETE_CITY(payload);
          break;
        default:
          data = await DELETE_GRADE(payload);
      }      
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
        const tempMastersListObject = props.mastersList.findIndex(
          (mastersList) => {
            return mastersList.id == popupIdConformationMasterDeleteModal;
          }
        );
        const tempMastersListArray = [...props.mastersList];
        tempMastersListArray.splice(tempMastersListObject, 1);
        setShowConformationMasterDeleteModal(false);
        props.activeDeactive(tempMastersListArray);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const changePerPage = async (e) => {
    switch (props.title) {
      case "Menu Types":
        props.pagination.perPageRows = parseInt(e.target.value);
        props.pagination.currentPage = 1;
        props.getMastersList(e.target.id);
        props.setMenuTypesPagination(1);
        break;
      case "Franchises":
        props.pagination.perPageRows = parseInt(e.target.value);
        props.pagination.currentPage = 1;
        props.getMastersList(e.target.id);
        props.setFranchisesPagination(1);
        break;
      case "Allergens":
        props.pagination.perPageRows = parseInt(e.target.value);
        props.pagination.currentPage = 1;
        props.getMastersList(e.target.id);
        props.setAllergensPagination(1);
        break;
        case "Nutritional Terms":
          props.pagination.perPageRows = parseInt(e.target.value);
          props.pagination.currentPage = 1;
          props.getMastersList(e.target.id);
          props.setNutritionalTermsPagination(1);
        break;
      case "Payment Frequencies":
        props.pagination.perPageRows = parseInt(e.target.value);
        props.pagination.currentPage = 1;
        props.getMastersList(e.target.id);
        props.setPaymentFrequenciesPagination(1);
        break;
      case "Payment Methods":
        props.pagination.perPageRows = parseInt(e.target.value);
        props.pagination.currentPage = 1;
        props.getMastersList(e.target.id);
        props.setPaymentMethodsPagination(1);
        break;
      case "Provinces":
        props.pagination.perPageRows = parseInt(e.target.value);
        props.pagination.currentPage = 1;
        props.getMastersList(e.target.id);
        props.setProvincesPagination(1);
        break;
      case "Cities":
        props.pagination.perPageRows = parseInt(e.target.value);
        props.pagination.currentPage = 1;
        props.getMastersList(e.target.id);
        props.setCitiesPagination(1);
        break;
      default:
        props.pagination.perPageRows = parseInt(e.target.value);
        props.pagination.currentPage = 1;
        props.getMastersList(e.target.id);
        props.setGradePagination(1);
    }    
  };

  return (
    <React.Fragment>
      <div className="row mt-5">
        <div className="col-lg-8 col-md-12 col-sm-12 mx-auto">
          <div className="card-table">
            <div className="table-header-sec bg-dark-blue d-flex justify-content-between align-items-center">
              <div>
                <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                  {props.title}
                </h3>
                <p className="text-white mb-0">List of {props.title}</p>
              </div>
              <div>
                <div className="d-flex align-items-center">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={(e) =>
                      addMasterData(0, addMasterItemName, props.title, 0)
                    }
                  >
                    + Add New&nbsp;
                    {props.title == "Franchise" ||
                    props.title == "Payment Frequencies"
                      ? "Payment Frequency"
                      : props.title == "Cities"
                      ? "City"
                      : props.title.slice(0, -1)}
                  </Button>
                  <select
                    className="px-2 py-1 ml-2"
                    name="perPage"
                    id={props.title}
                    onChange={(e)=>changePerPage(e)}
                    value={props.pagination.perPageRows}
                  >
                    {props.perPageRowArray.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </div>
            <Table className="custom-table-sec" hover responsive>
              <thead>
                <tr>
                  {props.title=="Cities" ? 
                  
                    cityTablefields.map((item, index) => (
                      <th className={item.sort ? "cursor-pointer" : item.key == "Action" ? "text-right" : ""} onClick={() => props.sortData(item)} key={index}>
                        {item.key} {props.pagination.sortBy === item.value &&  <i className={props.pagination.orderBy === "ASC" ? "fa fa-caret-up" : "fa fa-caret-down"} />}
                      </th>
                    ))
                  :
                    tablefields.map((item, index) => (
                      <th className={item.sort ? "cursor-pointer" : item.key == "Action" ? "text-right" : "" } onClick={() => props.sortData(item)} key={index}>
                        {item.key} {props.pagination.sortBy === item.value &&  <i className={props.pagination.orderBy === "ASC" ? "fa fa-caret-up" : "fa fa-caret-down"} />}
                      </th>
                    ))  
                  }                  
                </tr>
              </thead>
              <tbody>
                {props.mastersList.map((item, index) => (
                  <tr key={index}>
                  {props.title == "Cities" &&
                    <td>
                       {item.province_name}
                    </td>
                  }  
                    <td>
                       {item.item_name}
                    </td>
                    <td className="text-right">
                      <img
                        className="mr-2 cursor-pointer"
                        src={EditIcon}
                        width="26"
                        alt="edit"
                        title="Edit"
                        onClick={() =>
                          checkMasterDataEditInfo(props.title, item.id)
                        }
                      />
                      <img
                        className="cursor-pointer mr-2"
                        src={DeleteIcon}
                        width="24"
                        alt="delete"
                        title="Remove"
                        onClick={(e) => openPopupAndPassId(item.id)}
                      />
                      {item && item.is_active && (
                        <span>
                          {Number(item.is_active) === 0 && (
                            <img
                              className="cursor-pointer mr-2"
                              title="Inactive"
                              src={InActiveIcon}
                              alt=""
                              width="35"
                              onClick={() => changeActiveDeactive(item)}
                            />
                          )}
                          {Number(item.is_active) === 1 && (
                            <img
                              className="cursor-pointer mr-2"
                              title="Active"
                              src={Activeicon}
                              alt=""
                              width="35"
                              onClick={() => changeActiveDeactive(item)}
                            />
                          )}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {props.isloader && (
                  <tr>
                    <td colSpan="100">
                      <div className="d-flex justify-content-center">
                        <i className="fa fa-spinner fa-pulse fa-4x fa-fw color-admin-theme" />
                        <span className="sr-only">Loading...</span>
                      </div>
                    </td>
                  </tr>
                )}
                {props.isloader === false && props.mastersList.length === 0 && (
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
                <ShowingPagination pagination={props.pagination} />
              </div>
              <div>
                {props.pagination && props.pagination.totalPages > 0 && (
                  <Pagination
                    pagination={props.pagination}
                    changePage={()=>props.getMastersList(props.title)}
                  />
                )}
              </div>
            </div> 
          </div>
        </div>
      </div>
      {showAddMasterModal && (
        <AddMasterModal
          closeModal={() => setShowAddMasterModal(false)}
          addMasterId={addMasterId}
          addMasterItemName={addMasterItemName}
          title={props.title}
          checkAPICall={(e) => checkAPICall(e)}
        />
      )}
      {showConformationMasterDeleteModal && (
        <ConformationMenuDeleteModal
          closeModal={() => setShowConformationMasterDeleteModal(false)}
          manageMenuId={popupIdConformationMasterDeleteModal}
          deleteMessage={`You are about to delete ${props.title}.`}
          deleteMenuItem={() => deleteMenuItem()}
        />
      )}
    </React.Fragment>
  );
};

export default MastersTable;
