import React, { useState, useEffect } from "react";
import { Modal, Button, OverlayTrigger, Popover } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import NoImgAvailable from "../assets/img/no-image.jpg";
import InfoIcon from "../assets/img/icons/information-icon.svg";
import NutritionIcon from "../assets/img/icons/nutrition.svg";
import VegIcon from "../assets/img/icons/veg.png";
import ChevronRight from "../assets/img/icons/chevron-right.svg";

import MenuItemIconDescription from "../components/MenuItemIconDescription";
import HmImage from "../components/core/image";

import { Accordion, Card } from "react-bootstrap";

import {
  GET_RESTAURANT_MENU_ID,
  GET_RESTAURANT_PREVIEW_MENU,
} from "../services/ENDPOINT";

import { toast } from "react-toastify";
const RestaurantMenuModal = (props) => {
  const [isloader, setLoader] = useState(false);
  const [restaurantMenuItem, setRestaurantMenuItem] = useState([]);
  const [selectCollapse, setSelectCollapse] = useState("0");

  const getRestaurantMenuList = async (e) => {
    if (props.pathVariable == "manage-menu") {
      try {
        setLoader(true);
        const payload = props.vendorId.id_vendor
          ? {
              id_vendor: props.vendorId.id_vendor,
              eventId: props.vendorId.id ? props.vendorId.id : "",
            }
          : {
              id_vendor: props.vendorId.id,
              eventId: "",
            };
        const data = await GET_RESTAURANT_PREVIEW_MENU(payload);
        if (data.code === 200 || data.code === "200") {
          for(var i=0;i<data.data.length;i++){
            const record = {
              allergens: data.data[i].allergens,
              id: data.data[i].id,
              id_image: data.data[i].id_image,
              id_product_category: data.data[i].id_product_category,
              id_vendor: data.data[i].id_vendor,
              id_vendor_menu: data.data[i].id_vendor_menu,
              image_path: data.data[i].image_path,
              ingredients: data.data[i].ingredients,
              item_price: data.data[i].item_price,
              ml_item_price: data.data[i].ml_item_price,
              nutrition_values: data.data[i].nutrition_values,
              original_name: data.data[i].original_name,
              package_units: data.data[i].package_units,
              package_weight: data.data[i].package_weight,
              product_category_name: data.data[i].product_category_name,
              product_description: data.data[i].product_description,
              product_name: data.data[i].product_name,
              product_topping_items: data.data[i].product_topping_items,
              tags: data.data[i].tags,
              veg_friendly: data.data[i].veg_friendly,
              checked: false,
            }
            restaurantMenuItem.push(record)
          }

          if (props.pathVariable == "organize") {
            if (props.eventMenuItem != 0) {
              for (const evmi of props.eventMenuItem) {
                const tempData = restaurantMenuItem.find((i) => i.id == evmi);
                if (tempData) {
                  tempData.checked = true;
                } else {
                  restaurantMenuItem[i].checked = false;
                }
              }
            } else {
              for (var i = 0; i < restaurantMenuItem.length; i++) {
                restaurantMenuItem[i].checked = true;
              }
            }
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
        setLoader(true);
        const payload = props.restaurantId.id_vendor
          ? {
              id_vendor: props.restaurantId.id_vendor,
              eventId: props.restaurantId.id ? props.restaurantId.id : "",
            }
          : {
              id_vendor: props.restaurantId.id,
              eventId: "",
            };
        const data = await GET_RESTAURANT_MENU_ID(payload);
        if (data.code === 200 || data.code === "200") {
          for(var i=0;i<data.data.length;i++){
            const record = {
              allergens: data.data[i].allergens,
              id: data.data[i].id,
              id_image: data.data[i].id_image,
              id_product_category: data.data[i].id_product_category,
              id_vendor: data.data[i].id_vendor,
              id_vendor_menu: data.data[i].id_vendor_menu,
              image_path: data.data[i].image_path,
              ingredients: data.data[i].ingredients,
              item_price: data.data[i].item_price,
              ml_item_price: data.data[i].ml_item_price,
              nutrition_values: data.data[i].nutrition_values,
              original_name: data.data[i].original_name,
              package_units: data.data[i].package_units,
              package_weight: data.data[i].package_weight,
              product_category_name: data.data[i].product_category_name,
              product_description: data.data[i].product_description,
              product_name: data.data[i].product_name,
              product_topping_items: data.data[i].product_topping_items,
              tags: data.data[i].tags,
              veg_friendly: data.data[i].veg_friendly,
              checked: false,
            }
            restaurantMenuItem.push(record)
          }
          if (props.pathVariable == "organize") {
            if (props.eventMenuItem != 0) {
              for (const evmi of props.eventMenuItem) {
                const tempData = restaurantMenuItem.find((i) => i.id == evmi);
                if (tempData) {
                  tempData.checked = true;
                } else {
                  restaurantMenuItem[i].checked = false;
                }
              }
            } else {
              for (var i = 0; i < restaurantMenuItem.length; i++) {
                restaurantMenuItem[i].checked = true;
              }
            }
          }
        } else {
          toast.error(data.message);
        }
      } catch ( data ) {
        toast.error(data.message);
      } finally {
        setLoader(false);
      }
    }
  };
  useEffect(() => {
    getRestaurantMenuList();
  }, []);

  const okRestaurantModal = () => {
    const tempEventMenuItem = [];
    for (var i = 0; i < restaurantMenuItem.length; i++) {
      if (
        restaurantMenuItem[i].checked == true
      ) {
        tempEventMenuItem.push(restaurantMenuItem[i].id);
      }
    }
    props.okButtonClick(tempEventMenuItem);
    props.closeModal();
  };

  const closeRestaurantModal = () => {
    if (props.pathVariable == "organize") {
      props.closeModal(false, props.eventMenuItem);
    } else {
      props.closeModal(false);
    }
  };

  const addTopping = (e, record) => {
    let index;
    let index1;
    if (e.target.checked == true) {
      const tempRestaurantMenuItem = [...restaurantMenuItem]
      index1 = restaurantMenuItem.indexOf(record);
      tempRestaurantMenuItem[index1].checked = true;
      setRestaurantMenuItem(tempRestaurantMenuItem)
      index = props.eventMenuItem.indexOf(record.id);
      if (props.eventMenuItem[index] != record.id) {
        props.eventMenuItem.push(record.id);
      }
    } else {
      const tempRestaurantMenuItem = [...restaurantMenuItem]
      index1 = restaurantMenuItem.indexOf(record);
      tempRestaurantMenuItem[index1].checked = false;
      setRestaurantMenuItem(tempRestaurantMenuItem)
      index = props.eventMenuItem.indexOf(record.id);
    }
  };
  return (
    <React.Fragment>
      <Modal
        size="lg"
        show={true}
        onHide={() => props.closeModal(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {props.pathVariable == "manage-menu"
              ? props.vendorId.vendor
                ? props.vendorId.vendor.restaurant_name
                : props.vendorId.restaurant_name
              : props.restaurantId.vendor
              ? props.restaurantId.vendor.restaurant_name
              : props.restaurantId.restaurant_name}
            - Menu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="restaurant-menu-sec pt-0">
          <div className="linear-activity-wrapper my-2">
            {isloader && (
              <div className="linear-activity">
                <div className="indeterminate"></div>
              </div>
            )}
          </div>
          <div className="mb-2">
            <MenuItemIconDescription />
          </div>
          <Accordion
            defaultActiveKey="0"
            onSelect={(e) => setSelectCollapse(e)}
          >
            {isloader === false &&
              restaurantMenuItem.filter((item) => item).length === 0 && (
                <div className="d-flex justify-content-center">
                  <h2 className="text-maven text-6">
                    There is no menu item available for this restaurant
                  </h2>
                </div>
              )}
            {restaurantMenuItem.filter(
              (item) => item.product_category_name == "Meal"
            ).length === 0 ? null : (
              <Card className="res-Menu-Header-card">
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <div className="res-Menu-Header-sec d-flex justify-content-between cursor-pointer">
                    <div id="collaps1" className="d-flex align-items-center">
                      <img
                        id="c1"
                        src={ChevronRight}
                        className={`mr-1 cursor-pointer ${
                          selectCollapse === "0" ? "arrowDirectionDown" : null
                        }`}
                        alt="arrow1"
                        width="15"
                      />
                      <h2 className="text-maven text-6 mb-0">Meal</h2>
                    </div>
                    {props.mlVariable == "mlVariable" && (
                      <div className="d-flex">
                        <h2 className="text-maven text-6 mb-0">Res. Price</h2>
                        <h2 className="text-maven text-6 mb-0 ml-4">
                          ML Price
                        </h2>
                      </div>
                    )}
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <div className="res-Menu-body-sec">
                    {restaurantMenuItem.map((item, index) => (
                      <div key={index}>
                        {item.product_category_name == "Meal" && (
                          <div className="row mx-auto border-bottom-gray p-2">
                            <div className="col-lg-3 col-md-12 col-sm-12">
                              <div className="d-flex">
                                {props.pathVariable == "organize" && (
                                  <div className="form-check mt-3 mr-4">
                                    <input
                                      type="checkbox"
                                      className="form-check-input lg-check-box"
                                      id={"check" + item.id}
                                      value={item.id}
                                      onChange={(e) => addTopping(e, item)}
                                      checked={item.checked}
                                    />
                                  </div>
                                )}
                                <div>
                                  {item.image_path ?
                                  <HmImage
                                    src={item.image_path}
                                    width="125"
                                    height="80"
                                    className={"menu-img-border"}
                                  />
                                  :
                                  <img
                                    src={NoImgAvailable}
                                    className="menu-img-border"
                                    width="125"
                                    alt=""
                                  />
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12">
                              <div className="d-flex align-items-center">
                                <h2 className="font-weight-semibold text-maven text-5 mr-2 mb-0">
                                  {item.product_name}
                                </h2>
                                <OverlayTrigger
                                  trigger="click"
                                  rootClose
                                  placement="bottom"
                                  overlay={
                                    <Popover id={`popover-positioned-bottom`}>
                                      <Popover.Content>
                                        <strong>Product Description :</strong>
                                        <p className="mb-0">
                                          {item.product_description}
                                        </p>
                                      </Popover.Content>
                                      {item.ingredients && (
                                        <Popover.Content>
                                          <strong>Ingrediants :</strong>
                                          <p className="mb-0">
                                            {item.ingredients}
                                          </p>
                                        </Popover.Content>
                                      )}
                                      {item.tags && (
                                        <Popover.Content>
                                          <strong>Tags :</strong>
                                          <p className="mb-0">{item.tags}</p>
                                        </Popover.Content>
                                      )}
                                    </Popover>
                                  }
                                >
                                  <img
                                    src={InfoIcon}
                                    className="cursor-pointer"
                                    width="24"
                                    title="Product Info"
                                  />
                                </OverlayTrigger>
                                <OverlayTrigger
                                  trigger="click"
                                  rootClose
                                  placement="bottom"
                                  overlay={
                                    <Popover id={`popover-positioned-bottom`}>
                                      <Popover.Content>
                                        <strong>Nutritional Info :</strong>
                                        {item.nutrition_values.map(
                                          (item1, index1) => (
                                            <div key={index1}>
                                              <div className="d-flex justify-content-between">
                                                <div className="mr-3">
                                                  <p className="mb-0">
                                                    {item1.nutritional_name}:
                                                  </p>
                                                </div>
                                                <div className="">
                                                  <p className="mb-0">
                                                    {item1.nutrition_term_value}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </Popover.Content>
                                    </Popover>
                                  }
                                >
                                  <img
                                    className="mx-2 cursor-pointer"
                                    src={NutritionIcon}
                                    width="24"
                                    title="Nutrition Facts"
                                  />
                                </OverlayTrigger>
                                {item.product_topping_items.length ==
                                0 ? null : (
                                  <OverlayTrigger
                                    trigger="click"
                                    rootClose
                                    placement="bottom"
                                    overlay={
                                      <Popover id={`popover-positioned-bottom`}>
                                        <Popover.Content>
                                          <strong>Topping Item(s) :</strong>
                                          {item.product_topping_items.map(
                                            (item1, index1) => (
                                              <div key={index1}>
                                                <div className="row">
                                                  <div className="col-lg-12">
                                                    <p className="mb-0">
                                                      Topping item name:
                                                      <span className="ml-1">
                                                        {
                                                          item1.topping_item_name
                                                        }
                                                      </span>
                                                    </p>
                                                  </div>
                                                  <div className="col-lg-12">
                                                    <p className="mb-0">
                                                      (Included Quantity:
                                                      <span className="ml-1">
                                                        {item1.freebie_qty}
                                                      </span>
                                                      )
                                                    </p>
                                                  </div>
                                                  <div className="col-lg-12">
                                                    <p className="mb-0">
                                                      Price: {item1.item_price}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </Popover.Content>
                                      </Popover>
                                    }
                                  >
                                    <h2 className="text-maven mr-2 mt-2 font-weight-semibold cursor-pointer color-admin-theme link-btn-hover text-4">
                                      Topping Item(s)
                                    </h2>
                                  </OverlayTrigger>
                                )}
                                {item.tags == "Veg-Friendly" ? (
                                  <img
                                    src={VegIcon}
                                    className="cursor-pointer"
                                    width="24"
                                    title="Veg Friendly"
                                  />
                                ) : null}
                              </div>
                              {item.allergens.length == 0 ? null : (
                                <h2 className="text-maven color-dark-red mt-2 text-4 mb-0">
                                  Allergens : {item.allergens.join(", ")}
                                </h2>
                              )}
                            </div>
                            <div className="col-lg-3 col-md-12 col-sm-12">
                              <div className="d-flex justify-content-end">
                                <h2 className="text-maven text-6 text-right mrg-top-sm">
                                  {item.item_price}
                                </h2>
                                {props.mlVariable == "mlVariable" && (
                                  <h2 className="text-maven text-6 text-right mrg-top-sm ml-5">
                                    {item.ml_item_price}
                                  </h2>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {isloader === false &&
                      restaurantMenuItem.filter(
                        (item) => item.product_category_name == "Meal"
                      ).length === 0 && (
                        <div className="d-flex justify-content-center">
                          <h2 className="text-maven text-6">
                            No items available
                          </h2>
                        </div>
                      )}
                  </div>
                </Accordion.Collapse>
              </Card>
            )}
            {restaurantMenuItem.filter(
              (item) => item.product_category_name == "Drink"
            ).length === 0 ? null : (
              <Card className="res-Menu-Header-card">
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  <div className="res-Menu-Header-sec d-flex justify-content-between">
                    <div id="collaps2" className="d-flex align-items-center">
                      <img
                        id="c2"
                        src={ChevronRight}
                        className={`mr-1 cursor-pointer ${
                          selectCollapse === "1" ? "arrowDirectionDown" : null
                        }`}
                        alt="arrow2"
                        width="15"
                      />
                      <h2 className="text-maven text-6 mb-0">Drink</h2>
                    </div>
                    {props.mlVariable == "mlVariable" && (
                      <div className="d-flex">
                        <h2 className="text-maven text-6 mb-0">Res. Price</h2>
                        <h2 className="text-maven text-6 mb-0 ml-4">
                          ML Price
                        </h2>
                      </div>
                    )}
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <div className="res-Menu-body-sec pt-0">
                    {restaurantMenuItem.map((item, index) => (
                      <div key={index}>
                        {item.product_category_name == "Drink" && (
                          <div className="row mx-auto border-bottom-gray p-2">
                            <div className="col-lg-3 col-md-4 col-sm-12">
                              <div className="d-flex">
                                {props.pathVariable == "organize" && (
                                  <div className="form-check mt-3 mr-4">
                                    <input
                                      type="checkbox"
                                      className="form-check-input lg-check-box"
                                      id={"check" + item.id}
                                      value={item.id}
                                      onChange={(e) => addTopping(e, item)}
                                      checked={item.checked}
                                    />
                                  </div>
                                )}
                                <div>
                                {item.image_path ?
                                  <HmImage
                                    src={item.image_path}
                                    width="125"
                                    height="80"
                                    className={"menu-img-border"}
                                  />
                                  :
                                  <img
                                    src={NoImgAvailable}
                                    className="menu-img-border"
                                    width="125"
                                    alt=""
                                  />
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                              <div className="d-flex align-items-center">
                                <h2 className="font-weight-semibold text-maven text-6 mr-2 mb-0">
                                  {item.product_name}
                                </h2>
                                <OverlayTrigger
                                  trigger="click"
                                  rootClose
                                  placement="bottom"
                                  overlay={
                                    <Popover id={`popover-positioned-bottom`}>
                                      <Popover.Content>
                                        <strong>Product Description :</strong>
                                        <p>{item.product_description}</p>
                                      </Popover.Content>
                                      {item.ingredients && (
                                        <Popover.Content>
                                          <strong>Ingrediants :</strong>
                                          <p>{item.ingredients}</p>
                                        </Popover.Content>
                                      )}
                                      {item.tags && (
                                        <Popover.Content>
                                          <strong>Tags :</strong>
                                          <p className="mb-0">{item.tags}</p>
                                        </Popover.Content>
                                      )}
                                    </Popover>
                                  }
                                >
                                  <img
                                    src={InfoIcon}
                                    className="cursor-pointer"
                                    width="24"
                                    title="Product Info"
                                  />
                                </OverlayTrigger>
                                <OverlayTrigger
                                  trigger="click"
                                  rootClose
                                  placement="bottom"
                                  overlay={
                                    <Popover id={`popover-positioned-bottom`}>
                                      <Popover.Content>
                                        <strong>Nutritional Info :</strong>
                                        {item.nutrition_values.map(
                                          (item1, index1) => (
                                            <div key={index1}>
                                              <div className="d-flex justify-content-between">
                                                <div className="mr-3">
                                                  <p className="mb-0">
                                                    {item1.nutritional_name}:
                                                  </p>
                                                </div>
                                                <div className="">
                                                  <p className="mb-0">
                                                    {item1.nutrition_term_value}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </Popover.Content>
                                    </Popover>
                                  }
                                >
                                  <img
                                    className="mx-2 cursor-pointer"
                                    src={NutritionIcon}
                                    width="24"
                                    title="Nutrition Facts"
                                  />
                                </OverlayTrigger>
                                {item.product_topping_items.length ==
                                0 ? null : (
                                  <OverlayTrigger
                                    trigger="click"
                                    rootClose
                                    placement="bottom"
                                    overlay={
                                      <Popover id={`popover-positioned-bottom`}>
                                        <Popover.Content>
                                          <strong>Topping Item(s) :</strong>
                                          {item.product_topping_items.map(
                                            (item1, index1) => (
                                              <div key={index1}>
                                                <div className="row">
                                                  <div className="col-lg-12">
                                                    <p className="mb-0">
                                                      topping item name:
                                                      <span className="ml-1">
                                                        {
                                                          item1.topping_item_name
                                                        }
                                                      </span>
                                                    </p>
                                                  </div>
                                                  <div className="col-lg-12">
                                                    <p className="mb-0">
                                                      (Included Quantity:
                                                      <span className="ml-1">
                                                        {item1.freebie_qty}
                                                      </span>
                                                      )
                                                    </p>
                                                  </div>
                                                  <div className="col-lg-12">
                                                    <p className="mb-0">
                                                      Price: {item1.item_price}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </Popover.Content>
                                      </Popover>
                                    }
                                  >
                                    <h2 className="text-maven mr-2 mt-2 font-weight-semibold color-admin-theme cursor-pointer text-4">
                                      Topping Item(s)
                                    </h2>
                                  </OverlayTrigger>
                                )}
                                {item.tags == "Veg-Friendly" ? (
                                  <img
                                    src={VegIcon}
                                    className="cursor-pointer"
                                    width="24"
                                    title="Veg Friendly"
                                  />
                                ) : null}
                              </div>
                              {item.allergens.length == 0 ? null : (
                                <h2 className="text-maven color-dark-red mt-2 text-4 mb-0">
                                  Allergens : {item.allergens.join(", ")}
                                </h2>
                              )}
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12">
                              <div className="d-flex justify-content-end">
                                <h2 className="text-maven text-6 text-right mrg-top-sm">
                                  {item.item_price}
                                </h2>
                                {props.mlVariable == "mlVariable" && (
                                  <h2 className="text-maven text-6 text-right mrg-top-sm ml-5">
                                    {item.ml_item_price}
                                  </h2>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {isloader === false &&
                      restaurantMenuItem.filter(
                        (item) => item.product_category_name == "Drink"
                      ).length === 0 && (
                        <div className="d-flex justify-content-center">
                          <h2 className="text-maven text-6">
                            No items available
                          </h2>
                        </div>
                      )}
                  </div>
                </Accordion.Collapse>
              </Card>
            )}
            {restaurantMenuItem.filter(
              (item) => item.product_category_name == "Snack"
            ).length === 0 ? null : (
              <Card className="res-Menu-Header-card">
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  <div className="res-Menu-Header-sec d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <img
                        id="c3"
                        src={ChevronRight}
                        className={`mr-1 cursor-pointer ${
                          selectCollapse === "2" ? "arrowDirectionDown" : null
                        }`}
                        alt="arrow3"
                        width="15"
                      />
                      <h2 className="text-maven text-6 mb-0">Snack</h2>
                    </div>
                    {props.mlVariable == "mlVariable" && (
                      <div className="d-flex">
                        <h2 className="text-maven text-6 mb-0">Res. Price</h2>
                        <h2 className="text-maven text-6 mb-0 ml-4">
                          ML Price
                        </h2>
                      </div>
                    )}
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <div className="res-Menu-body-sec">
                    {restaurantMenuItem.map((item, index) => (
                      <div key={index}>
                        {item.product_category_name == "Snack" && (
                          <div className="row mx-auto border-bottom-gray p-2">
                            <div className="col-lg-3 col-md-4 col-sm-12 mb-0">
                              <div className="d-flex">
                                {props.pathVariable == "organize" && (
                                  <div className="form-check mt-3 mr-4">
                                    <input
                                      type="checkbox"
                                      className="form-check-input lg-check-box"
                                      id={"check" + item.id}
                                      value={item.id}
                                      onChange={(e) => addTopping(e, item)}
                                      checked={item.checked}
                                    />
                                  </div>
                                )}
                                <div>
                                {item.image_path ?
                                  <HmImage
                                    src={item.image_path}
                                    width="125"
                                    height="80"
                                    className={"menu-img-border"}
                                  />
                                  :
                                  <img
                                    src={NoImgAvailable}
                                    className="menu-img-border"
                                    width="125"
                                    alt=""
                                  />
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 mb-0">
                              <div className="d-flex align-items-center">
                                <h2 className="font-weight-semibold text-maven text-6 mr-2 mb-0">
                                  {item.product_name}
                                </h2>
                                <OverlayTrigger
                                  trigger="click"
                                  rootClose
                                  placement="bottom"
                                  overlay={
                                    <Popover id={`popover-positioned-bottom`}>
                                      <Popover.Content>
                                        <strong>Product Description :</strong>
                                        <p>{item.product_description}</p>
                                      </Popover.Content>
                                      {item.ingredients && (
                                        <Popover.Content>
                                          <strong>Ingrediants :</strong>
                                          <p>{item.ingredients}</p>
                                        </Popover.Content>
                                      )}
                                      {item.tags && (
                                        <Popover.Content>
                                          <strong>Tags :</strong>
                                          <p className="mb-0">{item.tags}</p>
                                        </Popover.Content>
                                      )}
                                    </Popover>
                                  }
                                >
                                  <img
                                    src={InfoIcon}
                                    className="cursor-pointer"
                                    width="24"
                                    title="Product Info"
                                  />
                                </OverlayTrigger>
                                <OverlayTrigger
                                  trigger="click"
                                  rootClose
                                  placement="bottom"
                                  overlay={
                                    <Popover id={`popover-positioned-bottom`}>
                                      <Popover.Content>
                                        <strong>Nutritional Info :</strong>
                                        {item.nutrition_values.map(
                                          (item1, index1) => (
                                            <div key={index1}>
                                              <div className="d-flex justify-content-between">
                                                <div className="mr-3">
                                                  <p className="mb-0">
                                                    {item1.nutritional_name}:
                                                  </p>
                                                </div>
                                                <div className="">
                                                  <p className="mb-0">
                                                    {item1.nutrition_term_value}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </Popover.Content>
                                    </Popover>
                                  }
                                >
                                  <img
                                    className="mx-2 cursor-pointer"
                                    src={NutritionIcon}
                                    width="24"
                                    title="Nutrition Facts"
                                  />
                                </OverlayTrigger>
                                {item.product_topping_items.length ==
                                0 ? null : (
                                  <OverlayTrigger
                                    trigger="click"
                                    rootClose
                                    placement="bottom"
                                    overlay={
                                      <Popover id={`popover-positioned-bottom`}>
                                        <Popover.Content>
                                          <strong>Topping Item(s) :</strong>
                                          {item.product_topping_items.map(
                                            (item1, index1) => (
                                              <div key={index1}>
                                                <div className="row">
                                                  <div className="col-lg-12">
                                                    <p className="mb-0">
                                                      topping item name:
                                                      <span className="ml-1">
                                                        {
                                                          item1.topping_item_name
                                                        }
                                                      </span>
                                                    </p>
                                                  </div>
                                                  <div className="col-lg-12">
                                                    <p className="mb-0">
                                                      (Included Quantity:
                                                      <span className="ml-1">
                                                        {item1.freebie_qty}
                                                      </span>
                                                      )
                                                    </p>
                                                  </div>
                                                  <div className="col-lg-12">
                                                    <p className="mb-0">
                                                      Price: {item1.item_price}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </Popover.Content>
                                      </Popover>
                                    }
                                  >
                                    <h2 className="text-maven mr-2 mt-2 font-weight-semibold color-admin-theme cursor-pointer text-4">
                                      Topping Item(s)
                                    </h2>
                                  </OverlayTrigger>
                                )}
                                {item.tags == "Veg-Friendly" ? (
                                  <img
                                    src={VegIcon}
                                    className="cursor-pointer"
                                    width="24"
                                    title="Veg Friendly"
                                  />
                                ) : null}
                              </div>
                              {item.allergens.length == 0 ? null : (
                                <h2 className="text-maven color-dark-red mt-2 text-4 mb-0">
                                  Allergens : {item.allergens.join(", ")}
                                </h2>
                              )}
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 mb-0">
                              <div className="d-flex justify-content-end">
                                <h2 className="text-maven text-6 text-right mrg-top-sm">
                                  {item.item_price}
                                </h2>
                                {props.mlVariable == "mlVariable" && (
                                  <h2 className="text-maven text-6 text-right mrg-top-sm ml-5">
                                    {item.ml_item_price}
                                  </h2>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {isloader === false &&
                      restaurantMenuItem.filter(
                        (item) => item.product_category_name == "Snack"
                      ).length === 0 && (
                        <div className="d-flex justify-content-center">
                          <h2 className="text-maven text-6">
                            No items available
                          </h2>
                        </div>
                      )}
                  </div>
                </Accordion.Collapse>
              </Card>
            )}
          </Accordion>

          <div className="d-flex justify-content-end mt-4">
            {props.pathVariable == "organize" && (
              <Button
                className="mr-2 px-4"
                variant="primary"
                onClick={() => okRestaurantModal()}
              >
                Ok
              </Button>
            )}
            <Button
              className="px-3"
              onClick={() => closeRestaurantModal()}
              variant="danger"
            >
              cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default RestaurantMenuModal;
