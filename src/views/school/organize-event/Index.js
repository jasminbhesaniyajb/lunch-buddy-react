import React, { useState, useEffect } from "react";
import NoImgAvailable from "../../../assets/img/no-image.jpg";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Rating from "react-rating";

import Loader from "../../../components/Loader";
import RestaurantMenuModal from "../../../components/RestaurantMenuModal";
import RestaurantReview from "../../../components/RestaurantReview";
import HmImage from "../../../components/core/image";

import {
  GET_SCHOOL_RESTAURANT_LIST,
  GET_CITY,
  GET_PROVINCE,
} from "../../../services/ENDPOINT";

const SchoolOrganizeEvent = (props) => {
  const [isloader, setLoader] = useState(false);
  const [shcoolRestaurantsList, setShcoolRestaurantsList] = useState([]);
  const [showRestaurantMenuModal, setShowRestaurantMenuModal] = useState(false);
  const { t } = useTranslation();
  const [popupIdRestaurantMenuModal, setPopupIdRestaurantMenuModal] =
    useState();
  const [city, setCity] = useState([]);
  const [province, setProvince] = useState([]);
  const [pathVariableRestaurantMenuModal, setPathvariableRestaurantMenuModal] =
    useState("organize-event");
  const [search, setSearch] = useState({
    restaurantName: "",
    provinceId: props.data.loginInfo.id_province,
    cityId: props.data.loginInfo.id_city,
  });

  const handleInputChange = (e) => {
    let timer = handleInputChange.timer;
    if (timer) {
      clearTimeout(timer);
    }
    handleInputChange.timer = setTimeout(async () => {
      if (e.target.name == "search") {
        search.restaurantName = e.target.value || "";
        search.provinceId = search.provinceId;
        search.cityId = search.cityId;
        getShoolRestaurantList();
      }
    }, 500);
  };

  const getAllProvince = async () => {
    try {
      const data = await GET_PROVINCE();
      if (data.code === 200 || data.code === "200") {
        setProvince(data.data);
        getAllCity(props.data.loginInfo.id_province);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getAllProvince();
    return () => {
      setProvince();
    };
  }, []);

  const getAllCity = async (e) => {
    const payload = e;
    try {
      const data = await GET_CITY(payload);
      if (data.code === 200 || data.code === "200") {
        search.provinceId = e;
        setCity(data.data);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  const selectCity = (e) => {
    search.restaurantName = search.restaurantName;
    search.provinceId = search.provinceId;
    search.cityId = e;
    getShoolRestaurantList();
  };
  const selectProvience = (e) => {
    search.restaurantName = search.restaurantName;
    search.provinceId = e;
    search.cityId = search.cityId;
    getShoolRestaurantList();
  };
  const getShoolRestaurantList = async (e) => {
    try {
      setLoader(true);
      const payload = {
        restaurantName: search.restaurantName,
        provinceId: search.provinceId,
        cityId: search.cityId,
        orderBy: "DESC",
        sortBy: "id",
      };
      const data = await GET_SCHOOL_RESTAURANT_LIST(payload);
      if (data.code === 200 || data.code === "200") {
        setShcoolRestaurantsList(data.data.restaurants);
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
    getShoolRestaurantList();
  }, []);

  const openPopupAndPassId = (recordId) => {
    setPopupIdRestaurantMenuModal(recordId);
    setShowRestaurantMenuModal(true);
  };
  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 px-0">
        {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          <div className="col-lg-12 col-md-12 col-sm-12 mt-2">
            <div className="res-search-sec box-shadow-black">
              <div className="row mt-3">
                <div className="form-group col-lg-4 col-md-6 col-sm-12">
                  <div className="material-textfield">
                    <select
                      placeholder=" "
                      name="id_province"
                      autoComplete="off"
                      className={`form-control eb-contact-input material-input h-3em`}
                      onChange={(e) => {
                        getAllCity(e.target.value);
                        selectProvience(e.target.value);
                        handleInputChange(e);
                      }}
                      value={search.provinceId}
                      autoFocus
                    >
                      <option value="">Select</option>
                      {province.map(({ id, province_name }, index) => (
                        <option value={id} key={index}>
                          {province_name}
                        </option>
                      ))}
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
                      onChange={(e) => {
                        selectCity(e.target.value);
                        handleInputChange(e);
                      }}
                      value={search.cityId}
                    >
                      <option value="">Select</option>
                      {city.map(({ id, city_name }, index) => (
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
                <div className="form-group col-lg-4 col-md-6 col-sm-12">
                  <div className="position-relative">
                    <input
                      type="search"
                      name="search"
                      className="input-search"
                      placeholder="Search"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <i className="fa fa-search input-search-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mx-auto mt-4">
          {shcoolRestaurantsList.map((item, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={index}>
              <div className="restaurant-card">
                <div className="restaurat-img">
                  {item.restaurant_image ? (
                    <HmImage
                      src={item.restaurant_image.image_path}
                      width="100%"
                      height="208px"
                      className={"menu-img-border"}
                    />
                  ) : (
                    <img
                      src={NoImgAvailable}
                      className="menu-img-border"
                      width="100%"
                      height="208px"
                      alt=""
                    />
                  )}
                </div>
                <div className="restaurant-card-body">
                  <div className="mt-1">
                    <h5 className="font-weight-semibold text-capitalize text-4 mb-0">
                      {item.restaurant_name}
                    </h5>
                    <div className="d-flex justify-content-between">
                      <Rating
                        initialRating={item.rating}
                        emptySymbol="far fa-star star-reating-size mr-1"
                        fullSymbol="fas fa-star star-reating-size mr-1"
                        className="star-color-yellow my-2"
                        readonly
                      />
                      {item.rating > 0 && (
                        <div className="link-btn-hover">
                          <Link
                            to={`/school/restaurant-review?vendorId=${item.id}`}
                            className="text-color-primary"
                          >
                            See all reviews
                          </Link>
                        </div>
                      )}
                    </div>
                    <p className="text-capitalize text-3 mb-0">
                      <i className="fas fa-map-marker-alt mr-1"></i>
                      {item.address} {item.postal_code}
                    </p>
                  </div>
                  <div className="row mt-2">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <span
                        onClick={(e) => openPopupAndPassId(item)}
                        className="btn rest-primary-btn text-white text-capitalize d-block btn-modern py-2 mb-2"
                      >
                        View Menu
                      </span>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <Link
                        to={`/school/organize?id=${item.id}&restaurantName=${item.restaurant_name}`}
                      >
                        <span className="btn d-block rest-secondary-btn text-capitalize btn-modern py-2 mb-2">
                          Organize
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showRestaurantMenuModal && (
        <RestaurantMenuModal
          closeModal={() => setShowRestaurantMenuModal(false)}
          restaurantId={popupIdRestaurantMenuModal}
          pathVariable={pathVariableRestaurantMenuModal}
        />
      )}
    </React.Fragment>
  );
};
export default SchoolOrganizeEvent;
