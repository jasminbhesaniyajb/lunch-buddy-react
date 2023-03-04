import React, { useEffect, useState } from "react";

import {
  Card,
  OverlayTrigger,
  Popover,
  Button,
} from "react-bootstrap";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

import { toast } from "react-toastify";

import Moment from "react-moment";

import { history } from "../history";
import Loader from "../components/Loader";
import MenuItemIconDescription from "../components/MenuItemIconDescription";
import {
  GET_RESTAURANT_MENU_ID,
  ADD_ORDER_NOW,
  ADD_TO_CART,
  GET_STUDENT_ALLERGENS,
} from "../services/ENDPOINT";
import ChevronRight from "../assets/img/icons/chevron-right.svg";
import InfoIcon from "../assets/img/icons/information-icon.svg";
import NutritionIcon from "../assets/img/icons/nutrition.svg";
import VegIcon from "../assets/img/icons/veg.png";
import WarningIcon from "../assets/img/icons/warning-icon.svg";
import PlusIcon from "../assets/img/icons/plus-icon.svg";
import SubtractIcon from "../assets/img/icons/subtract.svg";
import { financial, dateFormate } from "../common";

const ParentOrderNow = (props) => {
  const id_vendor = props.homeOrderNowData.homeOrderNowEventInfo.vendor.id;
  const eventId = props.homeOrderNowData.homeOrderNowEventInfo.id;
  const eventDate = props.homeOrderNowData.homeOrderNowEventInfo.scheduled_date;

  var finalTotal = 0;
  const [isloader, setLoader] = useState(false);
  const [restaurantEventsList, setRestaurantEventsList] = useState([]);
  const [restaurantOrderEventsList, setRestaurantOrderEventsList] = useState(
    []
  );
  const [orderToppingItemTotals, setOrderToppingItemsTotal] = useState([]);
  const [childGrandTotals, setChildGrandTotals] = useState([]);
  const [grandTotals, setGrandTotals] = useState([]);
  const [orderLineItems, setOrderLineItems] = useState([]);
  const [orderLineIToppingtems, setOrderLineToppingItems] = useState([]);
  const [toppingChildGrandTotals, setToppingChildGrandTotals] = useState([]);
  const [toppingGrandTotals, setToppingGrandTotals] = useState([]);
  const [studentAllergensList, setStudentAllergensList] = useState([]);
  const [grandItemTotals, setGrandItemTotals] = useState([]);
  const [grandItemToppingTotals, setGrandItemToppingTotals] = useState([]);
  const [grandToppingItemTotals, setGrandToppingItemTotals] = useState([]);
  const [selectCollapse, setSelectCollapse] = useState("0");

  const [restaurantEventsDataList, setRestaurantEventsDataList] = useState([]);
  const [finalGrandTotal, setFinalGrandTotal] = useState(0);
  const [finalGrandItemTotal, setFinalGrandItemTotal] = useState(0);

  const getRestaurantEventList = async (e) => {
    try {
      setLoader(true);
      const payload = { id_vendor: id_vendor, eventId: eventId };
      const data = await GET_RESTAURANT_MENU_ID(payload);
      if (data.code === 200 || data.code === "200") {
        setRestaurantEventsList(data.data);
        var newData = data.data;
        for (var i = 0; i < newData.length; i++) {
          let tempProductToppingItemArray = [];
          for (var j = 0; j < newData[i].product_topping_items.length; j++) {
            const toppingItems = {
              toppingValue: "",
              toppingTotal: 0,
              toppingChecked: false,
              freebie_qty: newData[i].product_topping_items[j].freebie_qty,
              id_topping_item:
                newData[i].product_topping_items[j].id_topping_item,
              item_price: newData[i].product_topping_items[j].item_price,
              ml_item_price: newData[i].product_topping_items[j].ml_item_price,
              topping_item_name:
                newData[i].product_topping_items[j].topping_item_name,
            };
            tempProductToppingItemArray.push(toppingItems);
          }
          const eventData = {
            value: "",
            total: 0,
            checked: false,
            allergens: newData[i].allergens,
            id: newData[i].id,
            id_image: newData[i].id_image,
            id_product_category: newData[i].id_product_category,
            id_vendor: newData[i].id_vendor,
            id_vendor_menu: newData[i].id_vendor_menu,
            image_path: newData[i].image_path,
            ingredients: newData[i].ingredients,
            item_price: newData[i].item_price,
            ml_item_price: newData[i].ml_item_price,
            nutrition_values: newData[i].nutrition_values,
            original_name: newData[i].original_name,
            package_units: newData[i].package_units,
            package_weight: newData[i].package_weight,
            product_category_name: newData[i].product_category_name,
            product_description: newData[i].product_description,
            product_name: newData[i].product_name,
            product_topping_items: tempProductToppingItemArray,
            tags: newData[i].tags,
            veg_friendly: newData[i].veg_friendly,
          };
          restaurantEventsDataList.push(eventData);
        }
        setRestaurantOrderEventsList(JSON.stringify(data.data));
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
    getRestaurantEventList();
  }, []);

  const checkAllergens = (allergens, studAllergens) => {
    const findData = studAllergens.find((i) =>
      allergens.includes(i.allergen_name)
    );
    return findData ? true : false;
  };

  const getStudentAllergensList = async () => {
    try {
      setLoader(true);
      const payload = props.homeOrderNowData.homeOrderNowInfo.id;
      const data = await GET_STUDENT_ALLERGENS(payload);
      if (data.code === 200 || data.code === "200") {
        setStudentAllergensList(data.data);
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
    getStudentAllergensList();
  }, []);

  const arrayTotal = (arrayTot, value) => {
    return arrayTot.reduce((a, { value }) => a + value, 0);
  };

  const addOrderItem = (e, record) => {
    if (e.target.checked == true) {
      let tempArr = JSON.parse(JSON.stringify(restaurantEventsDataList));
      tempArr.filter((i) => {
        if (i.id === record.id) {
          i.checked = e.target.checked;
          i.value = 1;
          i.total = parseFloat(record.item_price);
          return true;
        }
      });
      const tempRestaurantEventsDataListObject = restaurantEventsDataList.find(
        (i) => i.id == record.id
      );
      const newProductToppingItemsArray =
        tempRestaurantEventsDataListObject.product_topping_items;
      for (var i = 0; i < newProductToppingItemsArray.length; i++) {
        newProductToppingItemsArray[i].toppingChecked = true;
        newProductToppingItemsArray[i].toppingValue =
          newProductToppingItemsArray[i].freebie_qty;
        newProductToppingItemsArray[i].toppingTotal = 0;
      }
      tempRestaurantEventsDataListObject.product_topping_items.filter((i) => {
        if (i.id == record.id) {
          i.product_topping_items = newProductToppingItemsArray;
          return true;
        }
      });
      tempArr.filter((i) => {
        if (i.id == tempRestaurantEventsDataListObject.id) {
          i.product_topping_items =
            tempRestaurantEventsDataListObject.product_topping_items;
          return true;
        }
      });

      setRestaurantEventsDataList(tempArr);

      var grandTotal = 0;
      var grandItemTotal = 0;
      var grandToppingItemTotal = 0;
      var grandToppingTotal = 0;
      for (var i = 0; i < tempArr.length; i++) {
        if (tempArr[i].checked == true) {
          for (var j = 0; j < tempArr[i].product_topping_items.length; j++) {
            if (tempArr[i].product_topping_items[j].toppingChecked == true) {
              grandToppingTotal =
                grandToppingTotal +
                tempArr[i].product_topping_items[j].toppingTotal;
              grandToppingItemTotal =
                grandToppingItemTotal +
                tempArr[i].product_topping_items[j].toppingValue;
            }
          }
          grandTotal = grandTotal + tempArr[i].total;
          grandItemTotal = grandItemTotal + tempArr[i].value;
        }
      }

      var total = grandTotal + grandToppingTotal;
      var finalTotal = financial(total);
      setFinalGrandTotal(finalTotal);
      var finalItemTotal = grandItemTotal + grandToppingItemTotal;
      setFinalGrandItemTotal(finalItemTotal);
    } else {
      let tempArr = JSON.parse(JSON.stringify(restaurantEventsDataList));
      tempArr.filter((i) => {
        if (i.id === record.id) {
          i.checked = e.target.checked;
          i.value = "";
          i.total = 0;
          return true;
        }
      });

      const tempRestaurantEventsListObject = restaurantEventsList.find(
        (i) => i.id == record.id
      );
      const tempProductToppingItemsArray =
        tempRestaurantEventsListObject.product_topping_items;
      const tempRestaurantEventsDataListObject = restaurantEventsDataList.find(
        (i) => i.id == record.id
      );
      const newProductToppingItemsArray =
        tempRestaurantEventsDataListObject.product_topping_items;
      for (var i = 0; i < newProductToppingItemsArray.length; i++) {
        newProductToppingItemsArray[i].freebie_qty =
          tempProductToppingItemsArray[i].freebie_qty;
        newProductToppingItemsArray[i].toppingChecked = false;
        newProductToppingItemsArray[i].toppingValue = "";
        newProductToppingItemsArray[i].toppingTotal = 0;
      }
      tempRestaurantEventsDataListObject.product_topping_items.filter((i) => {
        if (i.id == record.id) {
          i.product_topping_items = newProductToppingItemsArray;
          return true;
        }
      });
      tempArr.filter((i) => {
        if (i.id == tempRestaurantEventsDataListObject.id) {
          i.product_topping_items =
            tempRestaurantEventsDataListObject.product_topping_items;
          return true;
        }
      });

      setRestaurantEventsDataList(tempArr);
      var grandTotal = 0;
      var grandItemTotal = 0;
      var grandToppingItemTotal = 0;
      var grandToppingTotal = 0;
      for (var i = 0; i < tempArr.length; i++) {
        if (tempArr[i].checked == true) {
          for (var j = 0; j < tempArr[i].product_topping_items.length; j++) {
            if (tempArr[i].product_topping_items[j].toppingChecked == true) {
              grandToppingTotal =
                grandToppingTotal +
                tempArr[i].product_topping_items[j].toppingTotal;
              grandToppingItemTotal =
                grandToppingItemTotal +
                tempArr[i].product_topping_items[j].toppingValue;
            }
          }
          grandTotal = grandTotal + tempArr[i].total;
          grandItemTotal = grandItemTotal + tempArr[i].value;
        }
      }

      var total = grandTotal + grandToppingTotal;
      var finalTotal = financial(total);
      setFinalGrandTotal(finalTotal);
      var finalItemTotal = grandItemTotal + grandToppingItemTotal;
      setFinalGrandItemTotal(finalItemTotal);
    }
  };
  const addOrderItemQuantity = (e, record) => {
    let tempArr = JSON.parse(JSON.stringify(restaurantEventsDataList));
    const tempRestaurantEventsDataListObject = restaurantEventsDataList.find(
      (i) => i.id == record.id
    );
    const tempValue = tempRestaurantEventsDataListObject.value;
    if(e>=1){
      if (tempRestaurantEventsDataListObject.checked == true) {        
        tempArr.filter((i) => {
          if (i.id === record.id) {
            i.value = parseInt(e);
            var total1 = parseInt(e) * parseFloat(record.item_price);
            var total2 = financial(total1);
            i.total = parseFloat(total2);
            return true;
          }
        });
      }
    }
    const newProductToppingItemsArray =
      tempRestaurantEventsDataListObject.product_topping_items;

    let tempRestaurantOrderEventsListArr = JSON.parse(
      restaurantOrderEventsList
    );
    const tempRestaurantOrderEventsDataListObject =
      tempRestaurantOrderEventsListArr.find((i) => i.id == record.id);
    const tempProductToppingItemsArray =
      tempRestaurantOrderEventsDataListObject.product_topping_items;

    if(e>=1){
      for (var i = 0; i < newProductToppingItemsArray.length; i++) {
        if (tempValue < e) {
          if(newProductToppingItemsArray[i].toppingChecked==true){
            newProductToppingItemsArray[i].freebie_qty =
              newProductToppingItemsArray[i].freebie_qty +
              tempProductToppingItemsArray[i].freebie_qty;
            newProductToppingItemsArray[i].toppingValue =
              newProductToppingItemsArray[i].freebie_qty;
            newProductToppingItemsArray[i].toppingTotal = 0;
          }
        } else {
          if(newProductToppingItemsArray[i].toppingChecked==true){
            newProductToppingItemsArray[i].freebie_qty =
              newProductToppingItemsArray[i].freebie_qty -
              tempProductToppingItemsArray[i].freebie_qty;
            newProductToppingItemsArray[i].toppingValue =
              newProductToppingItemsArray[i].freebie_qty;
            newProductToppingItemsArray[i].toppingTotal = 0;
          }
        }
      }
    }
    tempRestaurantEventsDataListObject.product_topping_items.filter((i) => {
      if (i.id == record.id) {
        i.product_topping_items = newProductToppingItemsArray;
        return true;
      }
    });
    tempArr.filter((i) => {
      if (i.id == tempRestaurantEventsDataListObject.id) {
        i.product_topping_items =
          tempRestaurantEventsDataListObject.product_topping_items;
        return true;
      }
    });

    setRestaurantEventsDataList(tempArr);
    var grandTotal = 0;
    var grandItemTotal = 0;
    var grandToppingItemTotal = 0;
    var grandToppingTotal = 0;
    for (var i = 0; i < tempArr.length; i++) {
      if (tempArr[i].checked == true) {
        for (var j = 0; j < tempArr[i].product_topping_items.length; j++) {
          if (tempArr[i].product_topping_items[j].toppingChecked == true) {
            grandToppingTotal =
              grandToppingTotal +
              tempArr[i].product_topping_items[j].toppingTotal;
            grandToppingItemTotal =
              grandToppingItemTotal +
              tempArr[i].product_topping_items[j].toppingValue;
          }
        }
        grandTotal = grandTotal + tempArr[i].total;
        grandItemTotal = grandItemTotal + tempArr[i].value;
      }
    }

    var total = grandTotal + grandToppingTotal;
    var finalTotal = financial(total);
    setFinalGrandTotal(finalTotal);
    var finalItemTotal = grandItemTotal + grandToppingItemTotal;
    setFinalGrandItemTotal(finalItemTotal);
  };
  const addOrderToppingItemQuantity = (
    e,
    record,
    toppingId,
    toppingFreebieQty
  ) => {
    let tempArr = JSON.parse(JSON.stringify(restaurantEventsDataList));
    const tempRestaurantEventsDataListObject = restaurantEventsDataList.find(
      (i) => i.id == record.id
    );
    const newProductToppingItemsArray =
      tempRestaurantEventsDataListObject.product_topping_items;
    if(e>=1){
      if (e > toppingFreebieQty) {
        if (tempRestaurantEventsDataListObject.checked == true) {
          newProductToppingItemsArray.filter((i) => {
            if (i.id_topping_item === toppingId) {
              i.toppingValue = parseInt(e);
              var minus = parseInt(e) - i.freebie_qty;
              var total1 = parseInt(minus) * parseFloat(i.item_price);
              var total2 = financial(total1);
              i.toppingTotal = parseFloat(total2);
              return true;
            }
          });
        }
      } else if (e < toppingFreebieQty) {
        if (tempRestaurantEventsDataListObject.checked == true) {
          newProductToppingItemsArray.filter((i) => {
            if (i.id_topping_item === toppingId) {
              i.toppingValue = parseInt(e);
              i.toppingTotal = 0;
              return true;
            }
          });
        }
      } else if (e <= toppingFreebieQty) {
        if (tempRestaurantEventsDataListObject.checked == true) {
          newProductToppingItemsArray.filter((i) => {
            if (i.id_topping_item === toppingId) {
              i.toppingValue = parseInt(e);
              i.toppingTotal = 0;
              return true;
            }
          });
        }
      }
    }  
    tempRestaurantEventsDataListObject.product_topping_items.filter((i) => {
      if (i.id == record.id) {
        i.product_topping_items = newProductToppingItemsArray;
        return true;
      }
    });
    tempArr.filter((i) => {
      if (i.id == tempRestaurantEventsDataListObject.id) {
        i.product_topping_items =
          tempRestaurantEventsDataListObject.product_topping_items;
        return true;
      }
    });
    setRestaurantEventsDataList(tempArr);
    var grandTotal = 0;
    var grandItemTotal = 0;
    var grandToppingItemTotal = 0;
    var grandToppingTotal = 0;
    for (var i = 0; i < tempArr.length; i++) {
      if (tempArr[i].checked == true) {
        for (var j = 0; j < tempArr[i].product_topping_items.length; j++) {
          if (tempArr[i].product_topping_items[j].toppingChecked == true) {
            grandToppingTotal =
              grandToppingTotal +
              tempArr[i].product_topping_items[j].toppingTotal;
            grandToppingItemTotal =
              grandToppingItemTotal +
              tempArr[i].product_topping_items[j].toppingValue;
          }
        }
        grandTotal = grandTotal + tempArr[i].total;
        grandItemTotal = grandItemTotal + tempArr[i].value;
      }
    }

    var total = grandTotal + grandToppingTotal;
    var finalTotal = financial(total);
    setFinalGrandTotal(finalTotal);
    var finalItemTotal = grandItemTotal + grandToppingItemTotal;
    setFinalGrandItemTotal(finalItemTotal);
  };
  const toppingItemChecked = (e, record, record1) => {
    let tempArr = JSON.parse(JSON.stringify(restaurantEventsDataList));
    const tempRestaurantEventsDataListObject = restaurantEventsDataList.find(
      (i) => i.id == record.id
    );
    const newProductToppingItemsArray =
      tempRestaurantEventsDataListObject.product_topping_items;
    
    let tempRestaurantOrderEventsListArr = JSON.parse(
      restaurantOrderEventsList
    );
    const tempRestaurantOrderEventsDataListObject =
      tempRestaurantOrderEventsListArr.find((i) => i.id == record.id);
    const tempProductToppingItemsArray = 
      tempRestaurantOrderEventsDataListObject.product_topping_items;
    const tempProductToppingItemsObject = tempProductToppingItemsArray.find((i) => i.id_topping_item == record1.id_topping_item); 
    if (tempRestaurantEventsDataListObject.checked == true) {
      if (e.target.checked == true) {
        newProductToppingItemsArray.filter((i) => {
          if (i.id_topping_item === record1.id_topping_item) {
            i.freebie_qty = tempProductToppingItemsObject.freebie_qty * tempRestaurantEventsDataListObject.value;
            i.toppingChecked = true;
            i.toppingValue = i.freebie_qty;
            i.toppingTotal = 0;
            return true;
          }
        });
      } else {
        newProductToppingItemsArray.filter((i) => {
          if (i.id_topping_item === record1.id_topping_item) {
            i.toppingChecked = false;
            i.toppingValue = "";
            i.toppingTotal = 0;
            return true;
          }
        });
      }
    }
    tempRestaurantEventsDataListObject.product_topping_items.filter((i) => {
      if (i.id == record.id) {
        i.product_topping_items = newProductToppingItemsArray;
        return true;
      }
    });
    tempArr.filter((i) => {
      if (i.id == tempRestaurantEventsDataListObject.id) {
        i.product_topping_items =
          tempRestaurantEventsDataListObject.product_topping_items;
        return true;
      }
    });
    setRestaurantEventsDataList(tempArr);
    var grandTotal = 0;
    var grandItemTotal = 0;
    var grandToppingItemTotal = 0;
    var grandToppingTotal = 0;
    for (var i = 0; i < tempArr.length; i++) {
      if (tempArr[i].checked == true) {
        for (var j = 0; j < tempArr[i].product_topping_items.length; j++) {
          if (tempArr[i].product_topping_items[j].toppingChecked == true) {
            grandToppingTotal =
              grandToppingTotal +
              tempArr[i].product_topping_items[j].toppingTotal;
            grandToppingItemTotal =
              grandToppingItemTotal +
              tempArr[i].product_topping_items[j].toppingValue;
          }
        }
        grandTotal = grandTotal + tempArr[i].total;
        grandItemTotal = grandItemTotal + tempArr[i].value;
      }
    }

    var total = grandTotal + grandToppingTotal;
    var finalTotal = financial(total);
    setFinalGrandTotal(finalTotal);
    var finalItemTotal = grandItemTotal + grandToppingItemTotal;
    setFinalGrandItemTotal(finalItemTotal);
  };
  const checkAPICall = async (record) => {
    for (var i = 0; i < restaurantEventsDataList.length; i++) {
      if (restaurantEventsDataList[i].checked == true) {
        var orderLineToppingtems = [];
        for (
          var j = 0;
          j < restaurantEventsDataList[i].product_topping_items.length;
          j++
        ) {
          if (
            restaurantEventsDataList[i].product_topping_items[j]
              .toppingChecked == true
          ) {
            const lineItem = {
              id_topping_item:
                restaurantEventsDataList[i].product_topping_items[j]
                  .id_topping_item,
              freebie_qty:
                restaurantEventsDataList[i].product_topping_items[j]
                  .freebie_qty,
              ordered_qty:
                restaurantEventsDataList[i].product_topping_items[j]
                  .toppingValue,
              product_cost:
                restaurantEventsDataList[i].product_topping_items[j].item_price,
            };
            orderLineToppingtems.push(lineItem);
          }
        }
        const record1 = {
          id_vendor_menu_items: restaurantEventsDataList[i].id,
          product_cost: restaurantEventsDataList[i].item_price,
          quantity: restaurantEventsDataList[i].value,
          order_line_topping_items: orderLineToppingtems,
        };
        orderLineItems.push(record1);
      }
    }
    const childGrandTotals = finalGrandTotal;
    const payload = {
      id_student: props.homeOrderNowData.homeOrderNowInfo.id,
      id_event: eventId,
      id_vendor: id_vendor,
      order_total_cost: childGrandTotals,
      order_line_items: orderLineItems,
    };
    const payload1 = {
      id_teacher: props.homeOrderNowData.homeOrderNowInfo.id,
      id_event: eventId,
      id_vendor: id_vendor,
      order_total_cost: childGrandTotals,
      order_line_items: orderLineItems,
    };
    if (record == "buyNow") {
      try {
        setLoader(true);
        var data = {};
        if (props.loginInfo.loginInfo.user_type == 5) {
          data = await ADD_ORDER_NOW(payload1);
        } else {
          data = await ADD_ORDER_NOW(payload);
        }
        if (data.code === 200 || data.code === "200") {
          toast.success(data.message);
          if (props.loginInfo.loginInfo.user_type == 5) {
            history.push(`/teacher/upcoming-orders`);
          } else {
            history.push(`/parent/upcoming-orders`);
          }
        } else {
          toast.error(data.message);
        }
      } catch ({ data }) {
        toast.error(data.message);
      } finally {
        setLoader(false);
      }
    } else if (record == "addToCart") {
      try {
        setLoader(true);
        var data = {};
        if (props.loginInfo.loginInfo.user_type == 5) {
          data = await ADD_TO_CART(payload1);
        } else {
          data = await ADD_TO_CART(payload);
        }
        if (data.code === 200 || data.code === "200") {
          toast.success(data.message);
          localStorage.setItem(
            "eb-mums-lunch:cartItemTotal",
            orderLineItems.length
          );
          props.addCartInfoHandler(orderLineItems.length);
          if (props.loginInfo.loginInfo.user_type == 5) {
            history.push(`/teacher/cart-details`);
          } else {
            history.push(`/parent/cart-details`);
          }
        } else {
          toast.error(data.message);
        }
      } catch ({ data }) {
        toast.error(data.message);
      } finally {
        setLoader(false);
      }
    }
  };
  const handleNumberKey = (evt) => {
    var charCode = evt.which ? evt.which : evt.keyCode;
    var allowedKeys = [8, 9, 35, 36, 37, 38, 39, 40, 46];
    if (
      (charCode < 48 || (charCode > 57 && charCode < 96) || charCode > 105) &&
      allowedKeys.indexOf(charCode) < 0
    ) {
      evt.preventDefault();
    }
  };



  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 px-0">
        {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          <div className="col-lg-12 col-md-12 col-sm-12 mt-5">
            <div className="card-table restaurant-menu-sec">
              <div className="table-header-sec p-15 bg-dark-blue border-radius-7 d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                    {props.loginInfo.loginInfo.user_type == 5
                      ? props.loginInfo.loginInfo.teacher_name
                      : props.homeOrderNowData.homeOrderNowInfo.first_name +
                        " " +
                        props.homeOrderNowData.homeOrderNowInfo.last_name}{" "}
                    -
                    <span className="ml-2 text-color-tertiary">
                      {props.homeOrderNowData.homeOrderNowInfo
                        .grade_division_name == " "
                        ? "Unknown Grade Division"
                        : props.homeOrderNowData.homeOrderNowInfo
                            .grade_division_name}
                    </span>
                  </h3>
                  <p className="text-white mb-0">
                    {props.homeOrderNowData.homeOrderNowInfo.school.school_name}{" "}
                    | {dateFormate(eventDate)}
                  </p>
                </div>
              </div>

              {/* first collapse */}
              <div>
                <div className="linear-activity-wrapper">
                  {isloader && (
                    <div className="linear-activity">
                      <div className="indeterminate"></div>
                    </div>
                  )}
                </div>
                <div className="mb-2">
                  <MenuItemIconDescription />
                </div>
                <Accordion className="order-now-collapse-sec" allowMultipleExpanded allowZeroExpanded={true} preExpanded={[1, 2, 3]}
            >
                  {restaurantEventsDataList.filter(
                    (item) => item.product_category_name == "Meal"
                  ).length === 0 ? null : (
                    <Card className="border-radius-7">
                    <AccordionItem uuid={1}
                  >
                  <AccordionItemHeading>
                      <AccordionItemButton>
                        <div
                          id="collaps1"
                          className="d-flex align-items-center ml-4"
                        >
                          <h2 className="text-maven text-6 mb-0">Meal</h2>
                        </div>
                      </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className="pt-0">
                        <div className="res-Menu-body-sec">
                          <div className="row mx-auto pt-2">
                            <div className="col-lg-6 col-md-6 col-12 mb-2">
                              <div>
                                <h2 className="text-maven text-6">Item Name</h2>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                              <div>
                                <h2 className="text-maven text-6">Price</h2>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                              <div>
                                <h2 className="text-maven text-6">Quantity</h2>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                              <div>
                                <h2 className="text-maven text-6 text-right">
                                  Total
                                </h2>
                              </div>
                            </div>
                          </div>
                          {restaurantEventsDataList.map((item, index) => (
                            <div key={index}>
                              {item.product_category_name == "Meal" && (
                                <div className="row mx-auto">
                                  <div className="col-lg-6 col-md-6 col-12 mb-2">
                                    <div className="d-flex">
                                      <div className="form-check mr-3">
                                        <input
                                          type="checkbox"
                                          className="form-check-input lg-check-box mt-0"
                                          id={"check" + item.id}
                                          onChange={(e) =>
                                            addOrderItem(e, item)
                                          }
                                          checked={item.checked}
                                        />
                                      </div>
                                      <div className="d-flex align-items-center">
                                        <h2 className="text-maven text-5 mr-2 mb-0">
                                          {item.product_name}
                                        </h2>
                                        <OverlayTrigger
                                          trigger="click"
                                          rootClose
                                          placement="bottom"
                                          overlay={
                                            <Popover
                                              id={`popover-positioned-bottom`}
                                            >
                                              <Popover.Content>
                                                <strong>
                                                  Product Description :
                                                </strong>
                                                <p>
                                                  {item.product_description}
                                                </p>
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
                                                  <p className="mb-0">
                                                    {item.tags}
                                                  </p>
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
                                            <Popover
                                              id={`popover-positioned-bottom`}
                                            >
                                              <Popover.Content>
                                                <strong>
                                                  Nutritional Info :
                                                </strong>
                                                {item.nutrition_values.map(
                                                  (item1, index1) => (
                                                    <div key={index1}>
                                                      <div className="d-flex justify-content-between">
                                                        <div className="mr-3">
                                                          <p className="mb-0">
                                                            {
                                                              item1.nutritional_name
                                                            }
                                                            :
                                                          </p>
                                                        </div>
                                                        <div className="">
                                                          <p className="mb-0">
                                                            {
                                                              item1.nutrition_term_value
                                                            }
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
                                        {item.tags == "Veg-Friendly" ? (
                                          <img
                                            src={VegIcon}
                                            className="mr-2 cursor-pointer"
                                            width="24"
                                            title="Veg Friendly"
                                          />
                                        ) : null}

                                        <OverlayTrigger
                                          trigger="click"
                                          rootClose
                                          placement="bottom"
                                          overlay={
                                            <Popover
                                              id={`popover-positioned-bottom`}
                                            >
                                              <Popover.Content>
                                                <strong>Allergens :</strong>
                                                {item.allergens.map(
                                                  (
                                                    allergensitem,
                                                    allergensindex
                                                  ) =>
                                                    studentAllergensList.map(
                                                      (
                                                        studentallergensitem,
                                                        studentallergensindex
                                                      ) =>
                                                        allergensitem ==
                                                          studentallergensitem.allergen_name && (
                                                          <p
                                                            className="mb-0"
                                                            key={
                                                              studentallergensindex
                                                            }
                                                          >
                                                            {allergensitem}
                                                          </p>
                                                        )
                                                    )
                                                )}
                                              </Popover.Content>
                                            </Popover>
                                          }
                                        >
                                          <div>
                                            {checkAllergens(
                                              item.allergens,
                                              studentAllergensList
                                            ) && (
                                              <img
                                                className="cursor-pointer"
                                                src={WarningIcon}
                                                width="25"
                                                title="Allergen Conflict"
                                              />
                                            )}
                                          </div>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-4 mb-2">
                                    <div>
                                      <h2 className="text-maven text-5 mb-0">
                                        ${item.item_price}
                                      </h2>
                                    </div>
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-4 mb-2">
                                    {/* <div>
                                      <div className="form-group mb-0">
                                        <input
                                          type="number"
                                          placeholder=" "
                                          name={""}
                                          id={"qty" + item.id}
                                          autoComplete="off"
                                          min={1}
                                          className={`form-control eb-contact-input h-3em`}
                                          onChange={(e) =>
                                            addOrderItemQuantity(e, item)
                                          }
                                          value={item.value}
                                          onKeyDown={(e) => handleNumberKey(e)}
                                        />
                                      </div>
                                    </div> */}
                                    {/* new box design */}
                                    <div className="qty-box d-flex bg-light-gray border-light-gray border-radius-7">
                                      {item.value==1 || item.value=="" && item.checked==false
                                        ?
                                          <div
                                            className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                            onClick={(e) =>
                                              addOrderItemQuantity(
                                                item.value - 1,
                                                item
                                              )
                                            }
                                          >
                                            <span>
                                              <img
                                                src={SubtractIcon}
                                                alt="Subtract"
                                                width="15"
                                                className="cursor-pointer"
                                              />
                                            </span>
                                          </div>
                                        :
                                          <div
                                            className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                            onClick={(e) =>
                                              addOrderItemQuantity(
                                                item.value - 1,
                                                item
                                              )
                                            }
                                          >
                                            <span>
                                              <img
                                                src={SubtractIcon}
                                                alt="Subtract"
                                                width="15"
                                                className="cursor-pointer"
                                              />
                                            </span>
                                          </div>
                                      }
                                      <div className="qty-label bg-white">
                                        <h2 className="text-maven text-5 mb-0">
                                          {item.value}
                                        </h2>
                                      </div>
                                      {item.checked==false
                                        ?
                                        <div
                                          className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                          onClick={(e) =>
                                            addOrderItemQuantity(
                                              item.value + 1,
                                              item
                                            )
                                          }
                                        >
                                          <span>
                                            <img
                                              src={PlusIcon}
                                              alt="Plus"
                                              width="15"
                                              className="cursor-pointer"
                                            />
                                          </span>
                                        </div>
                                        :  
                                          <div
                                            className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                            onClick={(e) =>
                                              addOrderItemQuantity(
                                                item.value + 1,
                                                item
                                              )
                                            }
                                          >
                                            <span>
                                              <img
                                                src={PlusIcon}
                                                alt="Plus"
                                                width="15"
                                                className="cursor-pointer"
                                              />
                                            </span>
                                          </div>
                                      }
                                      </div>
                                    {/* end box design */}
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-4 mb-2">
                                    <div>
                                      <h2
                                        className="text-maven text-5 mb-0 text-right"
                                        id={"total" + item.id}
                                      >
                                        ${item.total}
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {item.product_topping_items.map(
                                (item1, index1) =>
                                  item.product_category_name == "Meal" && (
                                    <div className="row mx-auto" key={index1}>
                                      <div className="col-lg-6 col-md-6 col-12 mb-2">
                                        <div className="d-flex mrg-left-37">
                                          <div className="form-check mr-3">
                                            <input
                                              type="checkbox"
                                              className="form-check-input lg-check-box mt-0"
                                              id={
                                                "toppingCheck" +
                                                item.id +
                                                item1.id_topping_item
                                              }
                                              onChange={(e) =>
                                                toppingItemChecked(
                                                  e,
                                                  item,
                                                  item1
                                                )
                                              }
                                              checked={item1.toppingChecked}
                                            />
                                          </div>
                                          <div className="d-flex align-items-center">
                                            <h2 className="text-maven text-5 mr-2 mb-0">
                                              {item1.topping_item_name}
                                              <span className="ml-2 text-2 color-darkcyan">
                                                (Included Quantity:
                                                {item1.freebie_qty})
                                              </span>
                                            </h2>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-2 col-md-2 col-4 mb-2">
                                        <div>
                                          <h2 className="text-maven text-5 mb-0">
                                            ${item1.item_price}
                                          </h2>
                                        </div>
                                      </div>
                                      <div className="col-lg-2 col-md-2 col-4 mb-2">
                                        {/* <div>
                                          <div className="form-group mb-0">
                                            <input
                                              type="number"
                                              placeholder=" "
                                              name={""}
                                              id={
                                                "toppingQty" +
                                                item.id +
                                                item1.id_topping_item
                                              }
                                              autoComplete="off"
                                              min={1}
                                              className={`form-control eb-contact-input h-3em`}
                                              onChange={(e) =>
                                                addOrderToppingItemQuantity(
                                                  e,
                                                  item,
                                                  item1.id_topping_item,
                                                  item1.freebie_qty
                                                )
                                              }
                                              value={item1.toppingValue}
                                              onKeyDown={(e) =>
                                                handleNumberKey(e)
                                              }
                                            />
                                          </div>
                                        </div> */}
                                        {/* new box design */}
                                        <div className="qty-box d-flex justify-content-center bg-light-gray border-light-gray border-radius-7">
                                          {item1.toppingValue==1 || item1.toppingValue=="" && item1.toppingChecked==false
                                            ?
                                              <div
                                                className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                                onClick={
                                                  (e) => addOrderToppingItemQuantity(
                                                    item1.toppingValue - 1,
                                                    item,
                                                    item1.id_topping_item,
                                                    item1.freebie_qty
                                                  )
                                                }
                                              >
                                                <span>
                                                  <img
                                                    src={SubtractIcon}
                                                    alt="Subtract"
                                                    width="15"
                                                    className="cursor-pointer"
                                                  />
                                                </span>
                                              </div>
                                            :
                                              <div
                                                className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                onClick={
                                                  (e) => addOrderToppingItemQuantity(
                                                    item1.toppingValue - 1,
                                                    item,
                                                    item1.id_topping_item,
                                                    item1.freebie_qty
                                                  )
                                                }
                                              >
                                                <span>
                                                  <img
                                                    src={SubtractIcon}
                                                    alt="Subtract"
                                                    width="15"
                                                    className="cursor-pointer"
                                                  />
                                                </span>
                                              </div>
                                          }
                                          <div className="qty-label bg-white">
                                            <h2 className="text-maven text-5 mb-0">
                                              {item1.toppingValue}
                                            </h2>
                                          </div>
                                          {item1.toppingChecked==false
                                            ?
                                            <div
                                              className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                              onClick={
                                                (e) => addOrderToppingItemQuantity(
                                                  item1.toppingValue + 1,
                                                  item,
                                                  item1.id_topping_item,
                                                  item1.freebie_qty
                                                )
                                              }
                                            >
                                              <span>
                                                <img
                                                  src={PlusIcon}
                                                  alt="Plus"
                                                  width="15"
                                                  className="cursor-pointer"
                                                />
                                              </span>
                                            </div>
                                            :
                                              <div
                                                className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                onClick={
                                                  (e) => addOrderToppingItemQuantity(
                                                    item1.toppingValue + 1,
                                                    item,
                                                    item1.id_topping_item,
                                                    item1.freebie_qty
                                                  )
                                                }
                                              >
                                                <span>
                                                  <img
                                                    src={PlusIcon}
                                                    alt="Plus"
                                                    width="15"
                                                    className="cursor-pointer"
                                                  />
                                                </span>
                                              </div>
                                          }
                                          </div>
                                        {/* end box design */}
                                      </div>
                                      <div className="col-lg-2 col-md-2 col-4 mb-2">
                                        <div>
                                          <h2
                                            className="text-maven text-5 mb-0 text-right"
                                            id={
                                              "toppingTotal" +
                                              item.id +
                                              item1.id_topping_item
                                            }
                                          >
                                            ${item1.toppingTotal}
                                          </h2>
                                        </div>
                                      </div>
                                    </div>
                                  )
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionItemPanel>
                      </AccordionItem>
                    </Card>
                  )}
                  {restaurantEventsDataList.filter(
                    (item) => item.product_category_name == "Drink"
                  ).length === 0 ? null : (
                    <Card className="border-radius-7 mt-2">
                    <AccordionItem uuid={2}
                  >
                   <AccordionItemHeading>
                      <AccordionItemButton>
                        <div
                          id="collaps2"
                          className="d-flex align-items-center ml-4"
                        >
                          <h2 className="text-maven text-6 mb-0">Drink</h2>
                        </div>
                      </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className="pt-0">
                        <div className="res-Menu-body-sec">
                          <div className="row mx-auto pt-2">
                            <div className="col-lg-6 col-md-6 col-12 mb-2">
                              <div>
                                <h2 className="text-maven text-6">Item Name</h2>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                              <div>
                                <h2 className="text-maven text-6">Price</h2>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                              <div>
                                <h2 className="text-maven text-6">Quantity</h2>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                              <div>
                                <h2 className="text-maven text-6 text-right">
                                  Total
                                </h2>
                              </div>
                            </div>
                          </div>
                          {restaurantEventsDataList.map((item, index) => (
                            <div key={index}>
                              {item.product_category_name == "Drink" && (
                                <div className="row mx-auto">
                                  <div className="col-lg-6 col-md-6 col-12 mb-2">
                                    <div className="d-flex">
                                      <div className="form-check mr-3">
                                        <input
                                          type="checkbox"
                                          className="form-check-input lg-check-box mt-0"
                                          id={"check" + item.id}
                                          onChange={(e) =>
                                            addOrderItem(e, item)
                                          }
                                          checked={item.checked}
                                        />
                                      </div>
                                      <div className="d-flex align-items-center">
                                        <h2 className="text-maven text-5 mr-2 mb-0">
                                          {item.product_name}
                                        </h2>
                                        <OverlayTrigger
                                          trigger="click"
                                          rootClose
                                          placement="bottom"
                                          overlay={
                                            <Popover
                                              id={`popover-positioned-bottom`}
                                            >
                                              <Popover.Content>
                                                <strong>
                                                  Product Description :
                                                </strong>
                                                <p>
                                                  {item.product_description}
                                                </p>
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
                                                  <p className="mb-0">
                                                    {item.tags}
                                                  </p>
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
                                            <Popover
                                              id={`popover-positioned-bottom`}
                                            >
                                              <Popover.Content>
                                                <strong>
                                                  Nutritional Info :
                                                </strong>
                                                {item.nutrition_values.map(
                                                  (item1, index1) => (
                                                    <div key={index1}>
                                                      <div className="d-flex justify-content-between">
                                                        <div className="mr-3">
                                                          <p className="mb-0">
                                                            {
                                                              item1.nutritional_name
                                                            }
                                                            :
                                                          </p>
                                                        </div>
                                                        <div className="">
                                                          <p className="mb-0">
                                                            {
                                                              item1.nutrition_term_value
                                                            }
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
                                        {item.tags == "Veg-Friendly" ? (
                                          <img
                                            src={VegIcon}
                                            className="mr-2 cursor-pointer"
                                            width="24"
                                            title="Veg Friendly"
                                          />
                                        ) : null}
                                        <OverlayTrigger
                                          trigger="click"
                                          rootClose
                                          placement="bottom"
                                          overlay={
                                            <Popover
                                              id={`popover-positioned-bottom`}
                                            >
                                              <Popover.Content>
                                                <strong>Allergens :</strong>
                                                {item.allergens.map(
                                                  (
                                                    allergensitem,
                                                    allergensindex
                                                  ) =>
                                                    studentAllergensList.map(
                                                      (
                                                        studentallergensitem,
                                                        studentallergensindex
                                                      ) =>
                                                        allergensitem ==
                                                          studentallergensitem.allergen_name && (
                                                          <p
                                                            className="mb-0"
                                                            key={
                                                              studentallergensindex
                                                            }
                                                          >
                                                            {allergensitem}
                                                          </p>
                                                        )
                                                    )
                                                )}
                                              </Popover.Content>
                                            </Popover>
                                          }
                                        >
                                          <div>
                                            {checkAllergens(
                                              item.allergens,
                                              studentAllergensList
                                            ) && (
                                              <img
                                                className="cursor-pointer"
                                                src={WarningIcon}
                                                width="25"
                                                title="Allergen Conflict"
                                              />
                                            )}
                                          </div>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-4 mb-2">
                                    <div>
                                      <h2 className="text-maven text-5 mb-0">
                                        ${item.item_price}
                                      </h2>
                                    </div>
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-4 mb-2">
                                    {/* <div>
                                      <div className="form-group mb-0">
                                        <input
                                          type="number"
                                          placeholder=" "
                                          name={""}
                                          id={"qty" + item.id}
                                          autoComplete="off"
                                          min={1}
                                          className={`form-control eb-contact-input h-3em`}
                                          onChange={(e) =>
                                            addOrderItemQuantity(e, item)
                                          }
                                          value={item.value}
                                          onKeyDown={(e) => handleNumberKey(e)}
                                        />
                                      </div>
                                    </div> */}
                                    {/* new box design */}
                                    <div className="qty-box d-flex bg-light-gray border-light-gray border-radius-7">
                                      {item.value==1 || item.value=="" && item.checked==false
                                        ?
                                          <div
                                            className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                            onClick={
                                              (e) => addOrderItemQuantity(item.value - 1,
                                              item)
                                            }
                                          >
                                            <span>
                                              <img
                                                src={SubtractIcon}
                                                alt="Subtract"
                                                width="15"
                                                className="cursor-pointer"
                                              />
                                            </span>
                                          </div>
                                        :
                                          <div
                                            className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                            onClick={
                                              (e) => addOrderItemQuantity(item.value - 1,
                                              item)
                                            }
                                          >
                                            <span>
                                              <img
                                                src={SubtractIcon}
                                                alt="Subtract"
                                                width="15"
                                                className="cursor-pointer"
                                              />
                                            </span>
                                          </div>
                                      }
                                      <div className="qty-label bg-white">
                                        <h2 className="text-maven text-5 mb-0">
                                          {item.value}
                                        </h2>
                                      </div>
                                      {item.checked==false
                                        ?
                                        <div
                                          className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                          onClick={
                                            (e) => addOrderItemQuantity(item.value + 1,
                                            item)
                                          }
                                        >
                                          <span>
                                            <img
                                              src={PlusIcon}
                                              alt="Plus"
                                              width="15"
                                              className="cursor-pointer"
                                            />
                                          </span>
                                        </div>
                                        :
                                          <div
                                            className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                            onClick={
                                              (e) => addOrderItemQuantity(item.value + 1,
                                              item)
                                            }
                                          >
                                            <span>
                                              <img
                                                src={PlusIcon}
                                                alt="Plus"
                                                width="15"
                                                className="cursor-pointer"
                                              />
                                            </span>
                                          </div>
                                      }
                                    </div>
                                    {/* end box design */}
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-4 mb-2">
                                    <div>
                                      <h2
                                        className="text-maven text-5 mb-0 text-right"
                                        id={"total" + item.id}
                                      >
                                        ${item.total}
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {item.product_topping_items &&
                                item.product_topping_items.map(
                                  (item1, index1) =>
                                    item.product_category_name == "Drink" && (
                                      <div className="row mx-auto" key={index1}>
                                        <div className="col-lg-6 col-md-6 col-12 mb-2">
                                          <div className="d-flex mrg-left-37">
                                            <div className="form-check mr-3">
                                              <input
                                                type="checkbox"
                                                className="form-check-input lg-check-box mt-0"
                                                id={
                                                  "toppingCheck" +
                                                  item.id +
                                                  item1.id_topping_item
                                                }
                                                onChange={(e) =>
                                                  toppingItemChecked(
                                                    e,
                                                    item,
                                                    item1
                                                  )
                                                }
                                                checked={item1.toppingChecked}
                                              />
                                            </div>
                                            <div className="d-flex align-items-center">
                                              <h2 className="text-maven text-5 mr-2 mb-0">
                                                {item1.topping_item_name}
                                                <span className="ml-2 text-2 color-darkcyan">
                                                  (Included Quantity:
                                                  {item1.freebie_qty})
                                                </span>
                                              </h2>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-4 mb-2">
                                          <div>
                                            <h2 className="text-maven text-5 mb-0">
                                              ${item1.item_price}
                                            </h2>
                                          </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-4 mb-2">
                                          {/* <div>
                                            <div className="form-group mb-0">
                                              <input
                                                type="number"
                                                placeholder=" "
                                                name={""}
                                                id={
                                                  "toppingQty" +
                                                  item.id +
                                                  item1.id_topping_item
                                                }
                                                autoComplete="off"
                                                min={1}
                                                className={`form-control eb-contact-input h-3em`}
                                                onChange={(e) =>
                                                  addOrderToppingItemQuantity(
                                                    e,
                                                    item,
                                                    item1.id_topping_item,
                                                    item1.freebie_qty
                                                  )
                                                }
                                                value={item1.toppingValue}
                                                onKeyDown={(e) =>
                                                  handleNumberKey(e)
                                                }
                                              />
                                            </div>
                                          </div> */}

                                          {/* new box design */}
                                          <div className="qty-box d-flex justify-content-center bg-light-gray border-light-gray border-radius-7">
                                            {item1.toppingValue==1 || item1.toppingValue=="" && item1.toppingChecked==false
                                              ?
                                                <div
                                                  className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                                  onClick={
                                                    (e) => addOrderToppingItemQuantity(
                                                      item1.toppingValue - 1,
                                                      item,
                                                      item1.id_topping_item,
                                                      item1.freebie_qty
                                                    )
                                                  }
                                                >
                                                  <span>
                                                    <img
                                                      src={SubtractIcon}
                                                      alt="Subtract"
                                                      width="15"
                                                      className="cursor-pointer"
                                                    />
                                                  </span>
                                                </div>
                                              :
                                                <div
                                                  className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                  onClick={
                                                    (e) => addOrderToppingItemQuantity(
                                                      item1.toppingValue - 1,
                                                      item,
                                                      item1.id_topping_item,
                                                      item1.freebie_qty
                                                    )
                                                  }
                                                >
                                                  <span>
                                                    <img
                                                      src={SubtractIcon}
                                                      alt="Subtract"
                                                      width="15"
                                                      className="cursor-pointer"
                                                    />
                                                  </span>
                                                </div>
                                            }
                                            <div className="qty-label bg-white">
                                              <h2 className="text-maven text-5 mb-0">
                                                {item1.toppingValue}
                                              </h2>
                                            </div>
                                            {item1.toppingChecked==false
                                              ?
                                              <div
                                                className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                                onClick={
                                                  (e) => addOrderToppingItemQuantity(
                                                    item1.toppingValue + 1,
                                                    item,
                                                    item1.id_topping_item,
                                                    item1.freebie_qty
                                                  )
                                                }
                                              >
                                                <span>
                                                  <img
                                                    src={PlusIcon}
                                                    alt="Plus"
                                                    width="15"
                                                    className="cursor-pointer"
                                                  />
                                                </span>
                                              </div>
                                              :
                                                <div
                                                  className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                  onClick={
                                                    (e) => addOrderToppingItemQuantity(
                                                      item1.toppingValue + 1,
                                                      item,
                                                      item1.id_topping_item,
                                                      item1.freebie_qty
                                                    )
                                                  }
                                                >
                                                  <span>
                                                    <img
                                                      src={PlusIcon}
                                                      alt="Plus"
                                                      width="15"
                                                      className="cursor-pointer"
                                                    />
                                                  </span>
                                                </div>
                                            }
                                          </div>
                                          {/* end box design */}
                                        </div>
                                        <div className="col-lg-2 col-md-2 col-4 mb-2">
                                          <div>
                                            <h2
                                              className="text-maven text-5 mb-0 text-right"
                                              id={
                                                "toppingTotal" +
                                                item.id +
                                                item1.id_topping_item
                                              }
                                            >
                                              ${item1.toppingTotal}
                                            </h2>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                )}
                            </div>
                          ))}
                        </div>
                      </AccordionItemPanel>
                      </AccordionItem>
                    </Card>
                  )}
                  {restaurantEventsDataList.filter(
                    (item) => item.product_category_name == "Snack"
                  ).length === 0 ? null : (
                    <Card className="border-radius-7 mt-2">
                    <AccordionItem uuid={3}
                  >
                   <AccordionItemHeading>
                      <AccordionItemButton>
                        <div
                          id="collaps3"
                          className="d-flex align-items-center ml-4"
                        >
                          <h2 className="text-maven text-6 mb-0">Snacks</h2>
                        </div>
                      </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className="pt-0">
                        <div className="res-Menu-body-sec">
                          <div className="row mx-auto pt-2">
                            <div className="col-lg-6 col-md-6 col-12 mb-2">
                              <div>
                                <h2 className="text-maven text-6">Item Name</h2>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                              <div>
                                <h2 className="text-maven text-6">Price</h2>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                              <div>
                                <h2 className="text-maven text-6">Quantity</h2>
                              </div>
                            </div>
                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                              <div>
                                <h2 className="text-maven text-6 text-right">Total</h2>
                              </div>
                            </div>
                          </div>
                          {restaurantEventsDataList.map((item, index) => (
                            <div key={index}>
                              {item.product_category_name == "Snack" && (
                                <div className="row mx-auto">
                                  <div className="col-lg-6 col-md-6 col-12 mb-2">
                                    <div className="d-flex">
                                      <div className="form-check mr-3">
                                        <input
                                          type="checkbox"
                                          className="form-check-input lg-check-box mt-0"
                                          id={"check" + item.id}
                                          onChange={(e) =>
                                            addOrderItem(e, item)
                                          }
                                          checked={item.checked}
                                        />
                                      </div>
                                      <div className="d-flex align-items-center">
                                        <h2 className="text-maven text-5 mr-2 mb-0">
                                          {item.product_name}
                                        </h2>
                                        <OverlayTrigger
                                          trigger="click"
                                          rootClose
                                          placement="bottom"
                                          overlay={
                                            <Popover
                                              id={`popover-positioned-bottom`}
                                            >
                                              <Popover.Content>
                                                <strong>
                                                  Product Description :
                                                </strong>
                                                <p>
                                                  {item.product_description}
                                                </p>
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
                                                  <p className="mb-0">
                                                    {item.tags}
                                                  </p>
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
                                            <Popover
                                              id={`popover-positioned-bottom`}
                                            >
                                              <Popover.Content>
                                                <strong>
                                                  Nutritional Info :
                                                </strong>
                                                {item.nutrition_values.map(
                                                  (item1, index1) => (
                                                    <div key={index1}>
                                                      <div className="d-flex justify-content-between">
                                                        <div className="mr-3">
                                                          <p className="mb-0">
                                                            {
                                                              item1.nutritional_name
                                                            }
                                                            :
                                                          </p>
                                                        </div>
                                                        <div className="">
                                                          <p className="mb-0">
                                                            {
                                                              item1.nutrition_term_value
                                                            }
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
                                        {item.tags == "Veg-Friendly" ? (
                                          <img
                                            src={VegIcon}
                                            className="mr-2 cursor-pointer"
                                            width="24"
                                            title="Veg Friendly"
                                          />
                                        ) : null}
                                        <OverlayTrigger
                                          trigger="click"
                                          rootClose
                                          placement="bottom"
                                          overlay={
                                            <Popover
                                              id={`popover-positioned-bottom`}
                                            >
                                              <Popover.Content>
                                                <strong>Allergens :</strong>
                                                {item.allergens.map(
                                                  (
                                                    allergensitem,
                                                    allergensindex
                                                  ) =>
                                                    studentAllergensList.map(
                                                      (
                                                        studentallergensitem,
                                                        studentallergensindex
                                                      ) =>
                                                        allergensitem ==
                                                          studentallergensitem.allergen_name && (
                                                          <p
                                                            className="mb-0"
                                                            key={
                                                              studentallergensindex
                                                            }
                                                          >
                                                            {allergensitem}
                                                          </p>
                                                        )
                                                    )
                                                )}
                                              </Popover.Content>
                                            </Popover>
                                          }
                                        >
                                          <div>
                                            {checkAllergens(
                                              item.allergens,
                                              studentAllergensList
                                            ) && (
                                              <img
                                                className="cursor-pointer"
                                                src={WarningIcon}
                                                width="25"
                                                title="Allergen Conflict"
                                              />
                                            )}
                                          </div>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-4 mb-2">
                                    <div>
                                      <h2 className="text-maven text-5 mb-0">
                                        ${item.item_price}
                                      </h2>
                                    </div>
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-4 mb-2">
                                    {/* <div>
                                      <div className="form-group mb-0">
                                        <input
                                          type="number"
                                          placeholder=" "
                                          name={""}
                                          id={"qty" + item.id}
                                          autoComplete="off"
                                          min={1}
                                          className={`form-control eb-contact-input h-3em`}
                                          onChange={(e) =>
                                            addOrderItemQuantity(e, item)
                                          }
                                          value={item.value}
                                          onKeyDown={(e) => handleNumberKey(e)}
                                        />
                                      </div>
                                    </div> */}

                                    {/* new box design */}
                                    <div className="qty-box d-flex bg-light-gray border-light-gray border-radius-7">
                                      {item.value==1 || item.value=="" && item.checked==false
                                        ?
                                          <div
                                            className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                            onClick={
                                              (e) => addOrderItemQuantity(item.value - 1,
                                              item)
                                            }
                                          >
                                            <span>
                                              <img
                                                src={SubtractIcon}
                                                alt="Subtract"
                                                width="15"
                                                className="cursor-pointer"
                                              />
                                            </span>
                                          </div>
                                        :
                                          <div
                                            className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                            onClick={
                                              (e) => addOrderItemQuantity(item.value - 1,
                                              item)
                                            }
                                          >
                                            <span>
                                              <img
                                                src={SubtractIcon}
                                                alt="Subtract"
                                                width="15"
                                                className="cursor-pointer"
                                              />
                                            </span>
                                          </div>
                                      }
                                      <div className="qty-label bg-white">
                                        <h2 className="text-maven text-5 mb-0">
                                          {item.value}
                                        </h2>
                                      </div>
                                      {item.checked==false
                                        ?
                                          <div
                                            className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                            onClick={
                                              (e) => addOrderItemQuantity(item.value + 1,
                                              item)
                                            }
                                          >
                                            <span>
                                              <img
                                                src={PlusIcon}
                                                alt="Plus"
                                                width="15"
                                                className="cursor-pointer"
                                              />
                                            </span>
                                          </div>
                                        :
                                          <div
                                            className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                            onClick={
                                              (e) => addOrderItemQuantity(item.value + 1,
                                              item)
                                            }
                                          >
                                            <span>
                                              <img
                                                src={PlusIcon}
                                                alt="Plus"
                                                width="15"
                                                className="cursor-pointer"
                                              />
                                            </span>
                                          </div>
                                      }
                                    </div>
                                    {/* end box design */}
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-4 mb-2">
                                    <div>
                                      <h2
                                        className="text-maven text-5 mb-0 text-right"
                                        id={"total" + item.id}
                                      >
                                        ${item.total}
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {item.product_topping_items.map(
                                (item1, index1) =>
                                  item.product_category_name == "Snack" && (
                                    <div className="row mx-auto" key={index1}>
                                      <div className="col-lg-6 col-md-6 col-12 mb-2">
                                        <div className="d-flex mrg-left-37">
                                          <div className="form-check mr-3">
                                            <input
                                              type="checkbox"
                                              className="form-check-input lg-check-box mt-0"
                                              id={
                                                "toppingCheck" +
                                                item.id +
                                                item1.id_topping_item
                                              }
                                              onChange={(e) =>
                                                toppingItemChecked(
                                                  e,
                                                  item,
                                                  item1
                                                )
                                              }
                                              checked={item1.toppingChecked}
                                            />
                                          </div>
                                          <div className="d-flex align-items-center">
                                            <h2 className="text-maven text-5 mr-2 mb-0">
                                              {item1.topping_item_name}
                                              <span className="ml-2 text-2 color-darkcyan">
                                                (Included Quantity:
                                                {item1.freebie_qty})
                                              </span>
                                            </h2>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-2 col-md-2 col-4 mb-2">
                                        <div>
                                          <h2 className="text-maven text-5 mb-0">
                                            ${item1.item_price}
                                          </h2>
                                        </div>
                                      </div>
                                      <div className="col-lg-2 col-md-2 col-4 mb-2">
                                        {/* <div>
                                          <div className="form-group mb-0">
                                            <input
                                              type="number"
                                              placeholder=" "
                                              name={""}
                                              id={
                                                "toppingQty" +
                                                item.id +
                                                item1.id_topping_item
                                              }
                                              autoComplete="off"
                                              min={1}
                                              className={`form-control eb-contact-input h-3em`}
                                              onChange={(e) =>
                                                addOrderToppingItemQuantity(
                                                  e,
                                                  item,
                                                  item1.id_topping_item,
                                                  item1.freebie_qty
                                                )
                                              }
                                              value={item1.toppingValue}
                                              onKeyDown={(e) =>
                                                handleNumberKey(e)
                                              }
                                            />
                                          </div>
                                        </div> */}

                                        {/* new box design */}
                                        <div className="qty-box d-flex justify-content-center bg-light-gray border-light-gray border-radius-7">
                                          {item1.toppingValue==1 || item1.toppingValue=="" && item1.toppingChecked==false
                                            ?
                                              <div
                                                className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                                onClick={
                                                  (e) => addOrderToppingItemQuantity(
                                                    item1.toppingValue - 1,
                                                    item,
                                                    item1.id_topping_item,
                                                    item1.freebie_qty
                                                  )
                                                }
                                              >
                                                <span>
                                                  <img
                                                    src={SubtractIcon}
                                                    alt="Subtract"
                                                    width="15"
                                                    className="cursor-pointer"
                                                  />
                                                </span>
                                              </div>
                                            :
                                              <div
                                                className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                onClick={
                                                  (e) => addOrderToppingItemQuantity(
                                                    item1.toppingValue - 1,
                                                    item,
                                                    item1.id_topping_item,
                                                    item1.freebie_qty
                                                  )
                                                }
                                              >
                                                <span>
                                                  <img
                                                    src={SubtractIcon}
                                                    alt="Subtract"
                                                    width="15"
                                                    className="cursor-pointer"
                                                  />
                                                </span>
                                              </div>
                                          }
                                          <div className="qty-label bg-white">
                                            <h2 className="text-maven text-5 mb-0">
                                              {item1.toppingValue}
                                            </h2>
                                          </div>
                                          {item1.toppingChecked==false
                                            ?
                                              <div
                                                className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                                onClick={
                                                  (e) => addOrderToppingItemQuantity(
                                                    item1.toppingValue + 1,
                                                    item,
                                                    item1.id_topping_item,
                                                    item1.freebie_qty
                                                  )
                                                }
                                              >
                                                <span>
                                                  <img
                                                    src={PlusIcon}
                                                    alt="Plus"
                                                    width="15"
                                                    className="cursor-pointer"
                                                  />
                                                </span>
                                              </div>
                                            :
                                              <div
                                                className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                onClick={
                                                  (e) => addOrderToppingItemQuantity(
                                                    item1.toppingValue + 1,
                                                    item,
                                                    item1.id_topping_item,
                                                    item1.freebie_qty
                                                  )
                                                }
                                              >
                                                <span>
                                                  <img
                                                    src={PlusIcon}
                                                    alt="Plus"
                                                    width="15"
                                                    className="cursor-pointer"
                                                  />
                                                </span>
                                              </div>
                                          }
                                        </div>
                                        {/* end box design */}
                                      </div>
                                      <div className="col-lg-2 col-md-2 col-4 mb-2">
                                        <div>
                                          <h2
                                            className="text-maven text-5 mb-0 text-right"
                                            id={
                                              "toppingTotal" +
                                              item.id +
                                              item1.id_topping_item
                                            }
                                          >
                                            ${item1.toppingTotal}
                                          </h2>
                                        </div>
                                      </div>
                                    </div>
                                  )
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionItemPanel>
                      </AccordionItem>
                    </Card>
                  )}
                </Accordion>
              </div>
              <div className="mt-3">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="d-flex justify-content-end align-items-center">
                    <div>
                      <h2 className="text-5 font-weight-semibold">Total</h2>
                    </div>
                    <div>
                      <h2
                        className="text-6 ml-4 mr-3 bg-dark-blue text-white px-4 py-1"
                        id={"grandItemTotal"}
                      >
                        {finalGrandItemTotal}
                      </h2>
                    </div>
                    <div>
                      <h2
                        className="text-6 bg-dark-blue text-white px-4 py-1"
                        id={"grandTotal"}
                      >
                        ${finalGrandTotal}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="d-flex justify-content-end">
                    <div className="mr-2">
                      {finalGrandTotal > 0 ? (
                        <Button
                          className="bg-dark-blue"
                          onClick={() => checkAPICall("addToCart")}
                        >
                          <i
                            className="fa fa-shopping-cart mr-2"
                            aria-hidden="true"
                          ></i>
                          Add to Cart
                        </Button>
                      ) : (
                        <Button
                          className="bg-dark-blue"
                          onClick={() => checkAPICall("addToCart")}
                          disabled
                        >
                          <i
                            className="fa fa-shopping-cart mr-2"
                            aria-hidden="true"
                          ></i>
                          Add to Cart
                        </Button>
                      )}
                    </div>
                    <div>
                      {finalGrandTotal > 0 ? (
                        <Button
                          className="bg-dark-blue"
                          onClick={() => checkAPICall("buyNow")}
                        >
                          Buy Now
                        </Button>
                      ) : (
                        <Button
                          className="bg-dark-blue"
                          onClick={() => checkAPICall("buyNow")}
                          disabled
                        >
                          Buy Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ParentOrderNow;
