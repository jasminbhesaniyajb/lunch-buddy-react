import React, { useState, useEffect } from "react";

import Loader from "../../../components/Loader";
import MasterTable from "../../../components/MastersTable";
import { PER_PAGE_ROWS_OPTIONS, PER_PAGE_ROWS } from "../../../config";

import { Tabs, Tab } from "react-bootstrap";
import { toast } from "react-toastify";

import {
  GET_ALL_GRADES,
  GET_ALL_MENU_TYPES,
  GET_ALL_FRANCHISES,
  GET_ALL_ALLERGENS,
  GET_ALL_NUTRITIONAL_TERMS,
  GET_ALL_PAYMENT_FREQUENCY,
  GET_ALL_PAYMENT_METHODS,
  GET_ALL_PROVINCES,
  GET_ALL_CITIES,
} from "../../../services/ENDPOINT";

const AdminMasters = (props) => {
  const [isloader, setLoader] = useState(false);
  const [mastersList, setMastersList] = useState([]);
  const [masterId, setMasterId] = useState({});  
  const [perPageRowArray, setPerPageRowArray] = useState(PER_PAGE_ROWS_OPTIONS);  
  const [gradePagination, setGradePagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    orderBy: "DESC",
    sortBy: "item_name",
  });
  const [menuTypesPagination, setMenuTypesPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    orderBy: "DESC",
    sortBy: "item_name",
  });
  const [franchisesPagination, setFranchisesPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    orderBy: "DESC",
    sortBy: "item_name",
  });
  const [allergensPagination, setAllergensPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    orderBy: "DESC",
    sortBy: "item_name",
  });
  const [nutritionalTermsPagination, setNutritionalTermsPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    orderBy: "DESC",
    sortBy: "item_name",
  });
  const [paymentFrequenciesPagination, setPaymentFrequenciesPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    orderBy: "DESC",
    sortBy: "item_name",
  });
  const [paymentMethodsPagination, setPaymentMethodsPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    orderBy: "DESC",
    sortBy: "item_name",
  });
  const [provincesPagination, setProvincesPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    orderBy: "DESC",
    sortBy: "item_name",
  });
  const [citiesPagination, setCitiesPagination] = useState({
    perPageRows: PER_PAGE_ROWS,
    currentPage: 1,
    orderBy: "DESC",
    sortBy: "item_name",
  });
  const getMastersList = async (event) => {
    try {
      setLoader(true);
      setMastersList([]);
      var data = {};
      switch (event) {
        case "Menu Types":
          data = await GET_ALL_MENU_TYPES(menuTypesPagination);
          break;
        case "Franchises":
          data = await GET_ALL_FRANCHISES(franchisesPagination);
          break;
        case "Allergens":
          data = await GET_ALL_ALLERGENS(allergensPagination);
          break;
        case "Nutritional Terms":
          data = await GET_ALL_NUTRITIONAL_TERMS(nutritionalTermsPagination);
          break;
        case "Payment Frequencies":
          data = await GET_ALL_PAYMENT_FREQUENCY(paymentFrequenciesPagination);
          break;
        case "Payment Methods":
          data = await GET_ALL_PAYMENT_METHODS(paymentMethodsPagination);
          break;
        case "Provinces":
          data = await GET_ALL_PROVINCES(provincesPagination);
          break;
        case "Cities":
          data = await GET_ALL_CITIES(citiesPagination);
          break;
        default:
          data = await GET_ALL_GRADES(gradePagination);
      }
      if (data.code === 200 || data.code === "200") {
        setMastersList(data.data.data);        
        switch (event) {
          case "Menu Types":
            setMenuTypesPagination(data.data.pagination);
            break;
          case "Franchises":
            setFranchisesPagination(data.data.pagination);
            break;
          case "Allergens":
            setAllergensPagination(data.data.pagination);
            break;
          case "Nutritional Terms":
            setNutritionalTermsPagination(data.data.pagination);
            break;
          case "Payment Frequencies":
            setPaymentFrequenciesPagination(data.data.pagination);
            break;
          case "Payment Methods":
            setPaymentMethodsPagination(data.data.pagination);
            break;
          case "Provinces":
            setProvincesPagination(data.data.pagination);
            break;
          case "Cities":
            setCitiesPagination(data.data.pagination);
            break;
          default:
            setGradePagination(data.data.pagination);
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
    getMastersList("Grades");
    return ()=>{
      setMastersList();
    }
  }, []);

  const activeDeactive = (recordData) => {
    setMastersList(recordData);
  };  

  const sortData = (data) => {
    if (data.sort) {
      switch (data.key) {
        case "Menu Types":
          menuTypesPagination.sortBy = data.value
          menuTypesPagination.orderBy = menuTypesPagination.orderBy === 'DESC' ? 'ASC' : 'DESC'
          break;
        case "Franchises":
          franchisesPagination.sortBy = data.value
          franchisesPagination.orderBy = franchisesPagination.orderBy === 'DESC' ? 'ASC' : 'DESC'
          break;
        case "Allergens":
          allergensPagination.sortBy = data.value
          allergensPagination.orderBy = allergensPagination.orderBy === 'DESC' ? 'ASC' : 'DESC'
          break;
        case "Nutritional Terms":
          nutritionalTermsPagination.sortBy = data.value
          nutritionalTermsPagination.orderBy = nutritionalTermsPagination.orderBy === 'DESC' ? 'ASC' : 'DESC'
          break;
        case "Payment Frequencies":
          paymentFrequenciesPagination.sortBy = data.value
          paymentFrequenciesPagination.orderBy = paymentFrequenciesPagination.orderBy === 'DESC' ? 'ASC' : 'DESC'
          break;
        case "Payment Methods":
          paymentMethodsPagination.sortBy = data.value
          paymentMethodsPagination.orderBy = paymentMethodsPagination.orderBy === 'DESC' ? 'ASC' : 'DESC'
          break;
        case "Provinces":
          provincesPagination.sortBy = data.value
          provincesPagination.orderBy = provincesPagination.orderBy === 'DESC' ? 'ASC' : 'DESC'
          break;
        case "Cities":
          citiesPagination.sortBy = data.value
          citiesPagination.orderBy = citiesPagination.orderBy === 'DESC' ? 'ASC' : 'DESC'
          break;
        default:
          gradePagination.sortBy = data.value
          gradePagination.orderBy = gradePagination.orderBy === 'DESC' ? 'ASC' : 'DESC'    
      }  
      if(data.value=="province_name"){
        citiesPagination.sortBy = data.value
        citiesPagination.orderBy = citiesPagination.orderBy === 'DESC' ? 'ASC' : 'DESC'
        getMastersList("Cities");
      }else{
        getMastersList(data.key);
      }
    }
  }

  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 mt-2 px-0">
        {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          <div className="col-lg-12 col-md-12 col-sm-12 mx-auto">
            <div className="setting-card-sec">
              <Tabs
                defaultActiveKey="Grades"
                id="uncontrolled-tab-example"
                onSelect={(e) => getMastersList(e)}
              >
                <Tab eventKey="Grades" title="Grades">
                  <MasterTable
                    title="Grades"
                    isloader={isloader}
                    mastersList={mastersList}
                    activeDeactive={(e) => activeDeactive(e)}
                    masterId={masterId}
                    getMastersList={(e) => getMastersList(e)}
                    sortData={(e)=> sortData(e)}
                    pagination={gradePagination}
                    perPageRowArray={perPageRowArray}
                    setGradePagination={setGradePagination}
                  />
                </Tab>
                <Tab eventKey="Menu Types" title="Menu Types">
                  <MasterTable
                    title="Menu Types"
                    isloader={isloader}
                    mastersList={mastersList}
                    activeDeactive={(e) => activeDeactive(e)}
                    masterId={masterId}
                    getMastersList={(e) => getMastersList(e)}
                    sortData={(e)=> sortData(e)}
                    pagination={menuTypesPagination}
                    perPageRowArray={perPageRowArray}
                    setMenuTypesPagination={setMenuTypesPagination}
                  />
                </Tab>
                <Tab eventKey="Franchises" title="Franchises">
                  <MasterTable
                    title="Franchises"
                    isloader={isloader}
                    mastersList={mastersList}
                    activeDeactive={(e) => activeDeactive(e)}
                    masterId={masterId}
                    getMastersList={(e) => getMastersList(e)}
                    sortData={(e)=> sortData(e)}
                    pagination={franchisesPagination}
                    perPageRowArray={perPageRowArray}
                    setFranchisesPagination={setFranchisesPagination}
                  />
                </Tab>
                <Tab eventKey="Allergens" title="Allergens">
                  <MasterTable
                    title="Allergens"
                    isloader={isloader}
                    mastersList={mastersList}
                    activeDeactive={(e) => activeDeactive(e)}
                    masterId={masterId}
                    getMastersList={(e) => getMastersList(e)}
                    sortData={(e)=> sortData(e)}
                    pagination={allergensPagination}
                    perPageRowArray={perPageRowArray}
                    setAllergensPagination={setAllergensPagination}
                  />
                </Tab>
                <Tab eventKey="Nutritional Terms" title="Nutritional Terms">
                  <MasterTable
                    title="Nutritional Terms"
                    isloader={isloader}
                    mastersList={mastersList}
                    activeDeactive={(e) => activeDeactive(e)}
                    masterId={masterId}
                    getMastersList={(e) => getMastersList(e)}
                    sortData={(e)=> sortData(e)}
                    pagination={nutritionalTermsPagination}
                    perPageRowArray={perPageRowArray}
                    setNutritionalTermsPagination={setNutritionalTermsPagination}
                  />
                </Tab>
                <Tab eventKey="Payment Frequencies" title="Payment Frequencies">
                  <MasterTable
                    title="Payment Frequencies"
                    isloader={isloader}
                    mastersList={mastersList}
                    activeDeactive={(e) => activeDeactive(e)}
                    masterId={masterId}
                    getMastersList={(e) => getMastersList(e)}
                    sortData={(e)=> sortData(e)}
                    pagination={paymentFrequenciesPagination}
                    perPageRowArray={perPageRowArray}
                    setPaymentFrequenciesPagination={setPaymentFrequenciesPagination}
                  />
                </Tab>
                <Tab eventKey="Payment Methods" title="Payment Methods">
                  <MasterTable
                    title="Payment Methods"
                    isloader={isloader}
                    mastersList={mastersList}
                    activeDeactive={(e) => activeDeactive(e)}
                    masterId={masterId}
                    getMastersList={(e) => getMastersList(e)}
                    sortData={(e)=> sortData(e)}
                    pagination={paymentMethodsPagination}
                    perPageRowArray={perPageRowArray}
                    setPaymentMethodsPagination={setPaymentMethodsPagination}
                  />
                </Tab>
                <Tab eventKey="Provinces" title="Provinces">
                  <MasterTable
                    title="Provinces"
                    isloader={isloader}
                    mastersList={mastersList}
                    activeDeactive={(e) => activeDeactive(e)}
                    masterId={masterId}
                    getMastersList={(e) => getMastersList(e)}
                    sortData={(e)=> sortData(e)}
                    pagination={provincesPagination}
                    perPageRowArray={perPageRowArray}
                    setProvincesPagination={setProvincesPagination}
                  />
                </Tab>
                <Tab eventKey="Cities" title="Cities">
                  <MasterTable
                    title="Cities"
                    isloader={isloader}
                    mastersList={mastersList}
                    activeDeactive={(e) => activeDeactive(e)}
                    masterId={masterId}
                    getMastersList={(e) => getMastersList(e)}
                    sortData={(e)=> sortData(e)}
                    pagination={citiesPagination}
                    perPageRowArray={perPageRowArray}
                    setCitiesPagination={setCitiesPagination}
                  />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminMasters;
