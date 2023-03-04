import React, { useState, useEffect } from "react";

import ChevronRight from "../assets/img/icons/chevron-right-white.svg";
import ChevronRightBlack from "../assets/img/icons/chevron-right.svg";
import CancelIcon from "../assets/img/icons/minus.svg";
import PlusIcon from "../assets/img/icons/plus-icon.svg";
import SubtractIcon from "../assets/img/icons/subtract.svg";
import {financial, dateFormate} from '../common';

import Loader from "../components/Loader";

import { Card, Button } from "react-bootstrap";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { toast } from "react-toastify";

import {
  GET_CART_BY_ID,
  REMOVE_CART_ITEMS,
  UPDATE_CART_ITEM_QTY,
  UPDATE_CART_TOPPING_ITEM_QTY,
  ADD_ORDER_NOW,
} from "../services/ENDPOINT";

const ParentCartDetails = (props) => {
  const [isloader, setLoader] = useState(false);
  const [arrowDirection, setArrowDirection] = useState(false);
  const [arrowId, setArrowId] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [childGrandTotals, setChildGrandTotals] = useState([]);
  const [childGrandItemTotals, setChildGrandItemTotals] = useState([]);
  const [eventGrandItemTotals, setEventGrandItemTotals] = useState([]);
  const [cartArrays, setCartArrays] = useState([]);
  const [parentId, setParentId] = useState();
  const [teacherId, setTeacherId] = useState();
  const [grandTotals, setGrandTotals] = useState(0);
  const [grandItemTotals, setGrandItemTotals] = useState(0);
  const [activeStudentCollapse, setActiveStudentCollapse] = useState([]);
  const [activeEventsCollapse, setActiveEventsCollapse] = useState([]);
  var orderLineItems = [];
  var orderLineToppingItems = [];

  const getCartItem = async (e) => {
    try {
      setLoader(true);
      setGrandTotals([]);
      setGrandItemTotals([]);
      setChildGrandTotals([]);
      setChildGrandItemTotals([]);
      setEventGrandItemTotals([]);
      setCartArrays([]);
      const payload = props.data.loginInfo.id;
      const data = await GET_CART_BY_ID(payload);
      if (data.code === 200 || data.code === "200") {
        if (props.data.loginInfo.user_type == 5) {
          setParentId(data.data.teacherId);
        } else {
          setParentId(data.data.parentId);
        }
        for (let i = 0; i < data.data.carts.length; i++) {
          for (let j = 0; j < data.data.carts[i].carts.length; j++){
            activeEventsCollapse.push(j+1);
          }
          activeStudentCollapse.push(i+1);
        }
        for (var i = 0; i < data.data.carts.length; i++) {
          var carts = [];
          for (var j = 0; j < data.data.carts[i].carts.length; j++) {
            var cart_Items = [];
            for (
              var k = 0;
              k < data.data.carts[i].carts[j].cart_items.length;
              k++
            ) {
              var cartToppingItems = [];
              for (
                var l = 0;
                l <
                data.data.carts[i].carts[j].cart_items[k].cart_topping_items
                  .length;
                l++
              ) {
                var free =
                  data.data.carts[i].carts[j].cart_items[k].cart_topping_items[
                    l
                  ].ordered_qty -
                  data.data.carts[i].carts[j].cart_items[k].cart_topping_items[
                    l
                  ].freebie_qty;
                var originalTotal = 0;
                if (free < 0) {
                  originalTotal = data.data.carts[i].carts[j].cart_items[k].cart_topping_items[l].product_cost * 0;
                } else {
                  originalTotal = data.data.carts[i].carts[j].cart_items[k].cart_topping_items[l].product_cost * free;
                }
                var twoDigitTotal = financial(originalTotal);
                var total = parseFloat(twoDigitTotal);
                const toppingItem = {
                  freebie_qty:
                    data.data.carts[i].carts[j].cart_items[k]
                      .cart_topping_items[l].freebie_qty,
                  id: data.data.carts[i].carts[j].cart_items[k]
                    .cart_topping_items[l].id,
                  id_topping_item:
                    data.data.carts[i].carts[j].cart_items[k]
                      .cart_topping_items[l].id_topping_item,
                  ordered_qty:
                    data.data.carts[i].carts[j].cart_items[k]
                      .cart_topping_items[l].ordered_qty,
                  product_cost:
                    data.data.carts[i].carts[j].cart_items[k]
                      .cart_topping_items[l].product_cost,
                  product_name:
                    data.data.carts[i].carts[j].cart_items[k]
                      .cart_topping_items[l].product_name,
                  toppingTotal: total,
                };
                cartToppingItems.push(toppingItem);
              }
              var toppingItemTotal = cartToppingItems.reduce(
                (a, topping) => a + topping.ordered_qty,
                0
              );
              var originalTotal = cartToppingItems.reduce(
                (a, topping) => a + topping.toppingTotal,
                0
              );
              var twoDigitTotal = financial(originalTotal);
              var toppingTotal = parseFloat(twoDigitTotal);

              var originalTotal =
                data.data.carts[i].carts[j].cart_items[k].quantity *
                data.data.carts[i].carts[j].cart_items[k].product_cost;
              var twoDigitTotal = financial(originalTotal);
              var total = parseFloat(twoDigitTotal);
              const mainItem = {
                cart_topping_items: cartToppingItems,
                category_name:
                  data.data.carts[i].carts[j].cart_items[k].category_name,
                id: data.data.carts[i].carts[j].cart_items[k].id,
                id_vendor_menu_items:
                  data.data.carts[i].carts[j].cart_items[k]
                    .id_vendor_menu_items,
                product_cost:
                  data.data.carts[i].carts[j].cart_items[k].product_cost,
                product_name:
                  data.data.carts[i].carts[j].cart_items[k].product_name,
                quantity: data.data.carts[i].carts[j].cart_items[k].quantity,
                total: total,
                toppingItemTotal: toppingItemTotal,
                toppingTotal: toppingTotal,
              };
              cart_Items.push(mainItem);
            }
            var mainItemTotal = cart_Items.reduce(
              (a, topping) => a + topping.quantity,
              0
            );
            var originalMainTotal = cart_Items.reduce(
              (a, topping) => a + topping.total,
              0
            );
            var twoDigitMainTotal = financial(originalMainTotal);
            var mainTotal = parseFloat(twoDigitMainTotal);
            var toppingItemTotal = cart_Items.reduce(
              (a, topping) => a + topping.toppingItemTotal,
              0
            );
            var toppingTotal = cart_Items.reduce(
              (a, topping) => a + topping.toppingTotal,
              0
            );
            var eventItemTotal = mainItemTotal + toppingItemTotal;
            var originalTotal = mainTotal + toppingTotal;
            var twoDigitTotal = financial(originalTotal);
            var eventTotal = parseFloat(twoDigitTotal);

            const event = {
              cart_items: cart_Items,
              event_name: data.data.carts[i].carts[j].event_name,
              id: data.data.carts[i].carts[j].id,
              id_event: data.data.carts[i].carts[j].id_event,
              id_vendor: data.data.carts[i].carts[j].id_vendor,
              restaurant_name: data.data.carts[i].carts[j].restaurant_name,
              scheduled_date: data.data.carts[i].carts[j].scheduled_date,
              eventTotal: eventTotal,
              eventItemTotal: eventItemTotal,
            };
            carts.push(event);
            cartArrays.push(data.data.carts[i].carts[j].cart_items.length);
          }
          var childItemTotal = carts.reduce(
            (a, topping) => a + topping.eventItemTotal,
            0
          );
          var originalTotal = carts.reduce(
            (a, topping) => a + topping.eventTotal,
            0
          );
          var twoDigitTotal = financial(originalTotal);
          var childTotal = parseFloat(twoDigitTotal);
          var child = {};
          if (data.data.teacherId) {
            child = {
              carts: carts,
              contact_number: data.data.carts[i].contact_number,
              grade_division_name: data.data.carts[i].grade_division_name,
              id: data.data.carts[i].id,
              school_name: data.data.carts[i].school_name,
              teacher_name: data.data.carts[i].teacher_name,
              childTotal: childTotal,
              childItemTotal: childItemTotal,
            };
          } else {
            child = {
              carts: carts,
              first_name: data.data.carts[i].first_name,
              grade_division_name: data.data.carts[i].grade_division_name,
              id: data.data.carts[i].id,
              last_name: data.data.carts[i].last_name,
              school_name: data.data.carts[i].school_name,
              childTotal: childTotal,
              childItemTotal: childItemTotal,
            };
          }
          cartItems.push(child);
        }
        var grandItemTotal = cartItems.reduce(
          (a, topping) => a + topping.childItemTotal,
          0
        );
        setGrandItemTotals(grandItemTotal);
        var originalTotal = cartItems.reduce(
          (a, topping) => a + topping.childTotal,
          0
        );
        var twoDigitTotal = financial(originalTotal);
        var grandTotal = parseFloat(twoDigitTotal);
        setGrandTotals(grandTotal);
        var cartItemTotal = cartArrays.reduce((a, b) => a + b, 0);
        localStorage.setItem("eb-mums-lunch:cartItemTotal", cartItemTotal);
        props.addCartInfoHandler(cartItemTotal);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      if (data) toast.error(data.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getCartItem();
  }, []);

  const deleteMenuItem = async (recordId, deleteName,flag) => {
    setGrandTotals([]);
    setGrandItemTotals([]);
    setChildGrandTotals([]);
    setChildGrandItemTotals([]);
    setEventGrandItemTotals([]);
    setCartArrays([]);
    const deleteCartArray = [];
    var payload = {};
    if (deleteName == "removeCart") {
      payload = {
        IDs: deleteCartArray,
        type: -1,
        parentId: props.data.loginInfo.id,
      };
    } else if (deleteName == "item") {
      for (var i = 0; i < cartItems.length; i++) {
        for (var j = 0; j < cartItems[i].carts.length; j++) {
          if (cartItems[i].carts[j].cart_items.length == 1) {
            payload = {
              IDs: [cartItems[i].carts[j].id],
              type: 1,
            };
          } else {
            payload = {
              IDs: [recordId],
              type: 2,
            };
          }
        }
      }
    } else {
      if (deleteName == "emptyCart") {
        for (var i = 0; i < recordId.carts.length; i++) {
          deleteCartArray.push(recordId.carts[i].id);
        }
      }
      payload = {
        IDs: deleteName == "emptyCart" ? deleteCartArray : [recordId],
        type:
          deleteName == "item"
            ? 2
            : deleteName == "emptyCart" || deleteName == "event"
            ? 1
            : 3,
      };
    }

    try {
      const data = await REMOVE_CART_ITEMS(payload);
      if (data.code === 200 || data.code === "200") {
        if(flag === false ){
          toast.success(data.message);
        }
        var tempCartItemsArray = [...cartItems];
        for (var i = 0; i < cartItems.length; i++) {
          if (deleteName == "removeCart") {
            tempCartItemsArray.splice(tempCartItemsArray[i], 1);
            cartItems.splice(cartItems[i], 1);
          } else {
            for (var j = 0; j < cartItems[i].carts.length; j++) {
              if (deleteName == "emptyCart") {
                for (var p = 0; p < deleteCartArray.length; p++) {
                  const tempCartItemObject = cartItems[i].carts.findIndex(
                    (cartItem) => {
                      return cartItem.id == deleteCartArray[p];
                    }
                  );
                  if (tempCartItemObject != -1) {
                    cartItems[i].carts.splice(tempCartItemObject, 1);
                  }
                }
              } else if (deleteName == "event") {
                const tempCartItemObject = cartItems[i].carts.findIndex(
                  (cartItem) => {
                    return cartItem.id == recordId;
                  }
                );
                if (tempCartItemObject != -1) {
                  cartItems[i].carts.splice(tempCartItemObject, 1);
                }
              } else if (
                deleteName == "item" &&
                cartItems[i].carts[j].cart_items.length == 1
              ) {
                cartItems[i].carts.splice(j, 1);
              } else {
                for (
                  var k = 0;
                  k < cartItems[i].carts[j].cart_items.length;
                  k++
                ) {
                  if (cartItems[i].carts[j].cart_items[k].id == recordId) {
                    const tempCartItemObject = cartItems[i].carts[
                      j
                    ].cart_items.findIndex((cartItem) => {
                      return cartItem.id == recordId;
                    });
                    cartItems[i].carts[j].cart_items.splice(
                      tempCartItemObject,
                      1
                    );
                    if (cartItems[i].carts[j].cart_items.length == 0) {
                      cartItems[i].carts.splice(j, 1);
                    }
                  } else {
                    for (
                      var l = 0;
                      l <
                      cartItems[i].carts[j].cart_items[k].cart_topping_items
                        .length;
                      l++
                    ) {
                      if (
                        cartItems[i].carts[j].cart_items[k].cart_topping_items[
                          l
                        ].id == recordId
                      ) {
                        const tempCartItemObject = cartItems[i].carts[
                          j
                        ].cart_items[k].cart_topping_items.findIndex(
                          (cartItem) => {
                            return cartItem.id == recordId;
                          }
                        );
                        cartItems[i].carts[j].cart_items[
                          k
                        ].cart_topping_items.splice(tempCartItemObject, 1);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        setCartItems(tempCartItemsArray);
        var tempArray = [...cartItems];
        for (var i = 0; i < tempArray.length; i++) {
          if (tempArray[i].carts.length == 0 || deleteName == "removeCart") {
            tempArray.splice(i, 1);
            cartItems.splice(i, 1);
          }
        }
        setCartItems(tempArray);
        const tempCartItemsObjectArray = [...cartItems];
        for (var i = 0; i < cartItems.length; i++) {
          for (var j = 0; j < cartItems[i]?.carts.length; j++) {
            for (var k = 0; k < cartItems[i].carts[j].cart_items.length; k++) {
              for (
                var l = 0;
                l <
                cartItems[i].carts[j].cart_items[k].cart_topping_items.length;
                l++
              ) {
                var free =
                  tempCartItemsObjectArray[i].carts[j].cart_items[k]
                    .cart_topping_items[l].ordered_qty -
                  tempCartItemsObjectArray[i].carts[j].cart_items[k]
                    .cart_topping_items[l].freebie_qty;                

                var originalTotal = 0;
                if (free < 0) {
                  originalTotal =
                  tempCartItemsObjectArray[i].carts[j].cart_items[k]
                      .cart_topping_items[l].product_cost *
                    0;
                } else {
                  originalTotal =
                  tempCartItemsObjectArray[i].carts[j].cart_items[k]
                      .cart_topping_items[l].product_cost *
                    free;
                }                    

                var twoDigitTotal = financial(originalTotal);
                var total = parseFloat(twoDigitTotal);
                tempCartItemsObjectArray[i].carts[j].cart_items[
                  k
                ].cart_topping_items[l].toppingTotal = total;
              }
              var toppingItemTotal = tempCartItemsObjectArray[i].carts[
                j
              ].cart_items[k].cart_topping_items.reduce(
                (a, topping) => a + topping.ordered_qty,
                0
              );
              var originalTotal = tempCartItemsObjectArray[i].carts[
                j
              ].cart_items[k].cart_topping_items.reduce(
                (a, topping) => a + topping.toppingTotal,
                0
              );
              var twoDigitTotal = financial(originalTotal);
              var toppingTotal = parseFloat(twoDigitTotal);

              var originalTotal =
                tempCartItemsObjectArray[i].carts[j].cart_items[k].quantity *
                tempCartItemsObjectArray[i].carts[j].cart_items[k].product_cost;
              var twoDigitTotal = financial(originalTotal);
              var total = parseFloat(twoDigitTotal);
              tempCartItemsObjectArray[i].carts[j].cart_items[k].total = total;
              tempCartItemsObjectArray[i].carts[j].cart_items[
                k
              ].toppingItemTotal = toppingItemTotal;
              tempCartItemsObjectArray[i].carts[j].cart_items[k].toppingTotal =
                toppingTotal;
            }
            var mainItemTotal = tempCartItemsObjectArray[i].carts[
              j
            ].cart_items.reduce((a, topping) => a + topping.quantity, 0);
            var originalMainTotal = tempCartItemsObjectArray[i].carts[
              j
            ].cart_items.reduce((a, topping) => a + topping.total, 0);
            var twoDigitMainTotal = financial(originalMainTotal);
            var mainTotal = parseFloat(twoDigitMainTotal);
            var toppingItemTotal = tempCartItemsObjectArray[i].carts[
              j
            ].cart_items.reduce(
              (a, topping) => a + topping.toppingItemTotal,
              0
            );
            var toppingTotal = tempCartItemsObjectArray[i].carts[
              j
            ].cart_items.reduce((a, topping) => a + topping.toppingTotal, 0);
            var eventItemTotal = mainItemTotal + toppingItemTotal;
            var originalTotal = mainTotal + toppingTotal;
            var twoDigitTotal = financial(originalTotal);
            var eventTotal = parseFloat(twoDigitTotal);

            tempCartItemsObjectArray[i].carts[j].eventTotal = eventTotal;
            tempCartItemsObjectArray[i].carts[j].eventItemTotal =
              eventItemTotal;
            cartArrays.push(cartItems[i].carts[j].cart_items.length);
          }
          var childItemTotal = tempCartItemsObjectArray[i].carts.reduce(
            (a, topping) => a + topping.eventItemTotal,
            0
          );
          var originalTotal = tempCartItemsObjectArray[i].carts.reduce(
            (a, topping) => a + topping.eventTotal,
            0
          );
          var twoDigitTotal = financial(originalTotal);
          var childTotal = parseFloat(twoDigitTotal);

          tempCartItemsObjectArray[i].childTotal = childTotal;
          tempCartItemsObjectArray[i].childItemTotal = childItemTotal;
        }
        setCartItems(tempCartItemsObjectArray);
        var grandItemTotal = cartItems.reduce(
          (a, topping) => a + topping.childItemTotal,
          0
        );
        setGrandItemTotals(grandItemTotal);
        var originalTotal = cartItems.reduce(
          (a, topping) => a + topping.childTotal,
          0
        );
        var twoDigitTotal = financial(originalTotal);
        var grandTotal = parseFloat(twoDigitTotal);
        setGrandTotals(grandTotal);
        var cartItemTotal = cartArrays.reduce((a, b) => a + b, 0);
        localStorage.setItem("eb-mums-lunch:cartItemTotal", cartItemTotal);
        props.addCartInfoHandler(cartItemTotal);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const updateCartItemQty = (e, recordId) => {
    const value = e;
    let timer = updateCartItemQty.timer;
    if (timer) {
      clearTimeout(timer);
    }
    updateCartItemQty.timer = setTimeout(async () => {
      setGrandTotals([]);
      setGrandItemTotals([]);
      setChildGrandTotals([]);
      setChildGrandItemTotals([]);
      setEventGrandItemTotals([]);
      const payload = {
        Id: recordId,
        qtyToUpdate: value,
      };
      const qtyValue = value;

      try {
        setLoader(true);
        var data = {};
        if (value >= 1) {
          data = await UPDATE_CART_ITEM_QTY(payload);
        }
        if (data.code === 200 || data.code === "200") {
          toast.success(data.message);
          var updateData = data.data;
          var tempCartItemsArray = [...cartItems];
          for (var i = 0; i < cartItems.length; i++) {
            for (var j = 0; j < cartItems[i].carts.length; j++) {
              for (
                var k = 0;
                k < cartItems[i].carts[j].cart_items.length;
                k++
              ) {
                if (cartItems[i].carts[j].cart_items[k].id == recordId) {
                  const tempCartItemObject = cartItems[i].carts[
                    j
                  ].cart_items.findIndex((cartItem) => {
                    return cartItem.id == recordId;
                  });
                  for (
                    var l = 0;
                    l <
                    cartItems[i].carts[j].cart_items[tempCartItemObject]
                      .cart_topping_items.length;
                    l++
                  ) {
                    for (
                      var m = 0;
                      m < updateData.cart_topping_items.length;
                      m++
                    ) {
                      if (
                        cartItems[i].carts[j].cart_items[tempCartItemObject]
                          .cart_topping_items[l].id_topping_item ===
                        updateData.cart_topping_items[m].id_topping_item
                      ) {
                        tempCartItemsArray[i].carts[j].cart_items[
                          tempCartItemObject
                        ].cart_topping_items[l].freebie_qty =
                          updateData.cart_topping_items[m].freebie_qty;
                        tempCartItemsArray[i].carts[j].cart_items[
                          tempCartItemObject
                        ].cart_topping_items[l].ordered_qty =
                          updateData.cart_topping_items[m].ordered_qty;
                        var free =
                          updateData.cart_topping_items[m].ordered_qty -
                          updateData.cart_topping_items[m].freebie_qty;
                        var originalTotal =
                          updateData.cart_topping_items[m].product_cost * free;
                        var twoDigitTotal = financial(originalTotal);
                        var total = parseFloat(twoDigitTotal);
                        tempCartItemsArray[i].carts[j].cart_items[
                          tempCartItemObject
                        ].cart_topping_items[l].toppingTotal = total;
                      }
                    }
                  }
                  var toppingItemTotal = tempCartItemsArray[i].carts[
                    j
                  ].cart_items[tempCartItemObject].cart_topping_items.reduce(
                    (a, topping) => a + topping.ordered_qty,
                    0
                  );
                  var originalTotal = tempCartItemsArray[i].carts[j].cart_items[
                    tempCartItemObject
                  ].cart_topping_items.reduce(
                    (a, topping) => a + topping.toppingTotal,
                    0
                  );
                  var twoDigitTotal = financial(originalTotal);
                  var toppingTotal = parseFloat(twoDigitTotal);

                  var originalTotal =
                    qtyValue *
                    tempCartItemsArray[i].carts[j].cart_items[
                      tempCartItemObject
                    ].product_cost;
                  var twoDigitTotal = financial(originalTotal);
                  var total = parseFloat(twoDigitTotal);
                  tempCartItemsArray[i].carts[j].cart_items[
                    tempCartItemObject
                  ].quantity = qtyValue;
                  tempCartItemsArray[i].carts[j].cart_items[
                    tempCartItemObject
                  ].total = total;
                  tempCartItemsArray[i].carts[j].cart_items[
                    tempCartItemObject
                  ].toppingItemTotal = toppingItemTotal;
                  tempCartItemsArray[i].carts[j].cart_items[
                    tempCartItemObject
                  ].toppingTotal = toppingTotal;
                }
              }
              var mainItemTotal = tempCartItemsArray[i].carts[
                j
              ].cart_items.reduce((a, topping) => a + topping.quantity, 0);
              var originalMainTotal = tempCartItemsArray[i].carts[
                j
              ].cart_items.reduce((a, topping) => a + topping.total, 0);
              var twoDigitMainTotal = financial(originalMainTotal);
              var mainTotal = parseFloat(twoDigitMainTotal);
              var toppingItemTotal = tempCartItemsArray[i].carts[
                j
              ].cart_items.reduce(
                (a, topping) => a + topping.toppingItemTotal,
                0
              );
              var toppingTotal = tempCartItemsArray[i].carts[
                j
              ].cart_items.reduce((a, topping) => a + topping.toppingTotal, 0);
              var eventItemTotal = mainItemTotal + toppingItemTotal;
              var originalTotal = mainTotal + toppingTotal;
              var twoDigitTotal = financial(originalTotal);
              var eventTotal = parseFloat(twoDigitTotal);

              tempCartItemsArray[i].carts[j].eventTotal = eventTotal;
              tempCartItemsArray[i].carts[j].eventItemTotal = eventItemTotal;
            }
            var childItemTotal = tempCartItemsArray[i].carts.reduce(
              (a, topping) => a + topping.eventItemTotal,
              0
            );
            var originalTotal = tempCartItemsArray[i].carts.reduce(
              (a, topping) => a + topping.eventTotal,
              0
            );
            var twoDigitTotal = financial(originalTotal);
            var childTotal = parseFloat(twoDigitTotal);

            tempCartItemsArray[i].childTotal = childTotal;
            tempCartItemsArray[i].childItemTotal = childItemTotal;
          }
          setCartItems(tempCartItemsArray);
          var grandItemTotal = cartItems.reduce(
            (a, topping) => a + topping.childItemTotal,
            0
          );
          setGrandItemTotals(grandItemTotal);
          var originalTotal = cartItems.reduce(
            (a, topping) => a + topping.childTotal,
            0
          );
          var twoDigitTotal = financial(originalTotal);
          var grandTotal = parseFloat(twoDigitTotal);
          setGrandTotals(grandTotal);
        } else {
          toast.error(data.message);
        }
      } catch ({ data }) {
        toast.error(data.message);
      } finally {
        setLoader(false);
      }
    }, 1000);
  };

  const updateCartToppingItemQty = (e, recordId) => {
    const value = e;
    let timer = updateCartToppingItemQty.timer;
    if (timer) {
      clearTimeout(timer);
    }
    updateCartToppingItemQty.timer = setTimeout(async () => {
      setGrandTotals([]);
      setGrandItemTotals([]);
      setChildGrandTotals([]);
      setChildGrandItemTotals([]);
      setEventGrandItemTotals([]);
      const payload = {
        Id: recordId,
        qtyToUpdate: value,
      };
      const toppingQtyValue = value;

      try {
        setLoader(true);
        var data = {};
        if (value >= 1) {
          data = await UPDATE_CART_TOPPING_ITEM_QTY(payload);
        }

        if (data.code === 200 || data.code === "200") {
          toast.success(data.message);
          var tempCartItemsArray = [...cartItems];
          for (var i = 0; i < cartItems.length; i++) {
            for (var j = 0; j < cartItems[i].carts.length; j++) {
              for (
                var k = 0;
                k < cartItems[i].carts[j].cart_items.length;
                k++
              ) {
                for (
                  var l = 0;
                  l <
                  cartItems[i].carts[j].cart_items[k].cart_topping_items.length;
                  l++
                ) {
                  if (
                    cartItems[i].carts[j].cart_items[k].cart_topping_items[l]
                      .id == recordId
                  ) {
                    const tempCartItemObject = cartItems[i].carts[j].cart_items[
                      k
                    ].cart_topping_items.findIndex((cartItem) => {
                      return cartItem.id == recordId;
                    });
                    tempCartItemsArray[i].carts[j].cart_items[
                      k
                    ].cart_topping_items[tempCartItemObject].ordered_qty =
                      toppingQtyValue;

                    var free =
                      toppingQtyValue -
                      tempCartItemsArray[i].carts[j].cart_items[k]
                        .cart_topping_items[tempCartItemObject].freebie_qty;
                    var originalTotal = 0;
                    if (free < 0) {
                      originalTotal =
                        tempCartItemsArray[i].carts[j].cart_items[k]
                          .cart_topping_items[tempCartItemObject].product_cost *
                        0;
                    } else {
                      originalTotal =
                        tempCartItemsArray[i].carts[j].cart_items[k]
                          .cart_topping_items[tempCartItemObject].product_cost *
                        free;
                    }
                    var twoDigitTotal = financial(originalTotal);
                    var total = parseFloat(twoDigitTotal);
                    tempCartItemsArray[i].carts[j].cart_items[
                      k
                    ].cart_topping_items[tempCartItemObject].toppingTotal =
                      total;
                  }
                }
                var toppingItemTotal = tempCartItemsArray[i].carts[
                  j
                ].cart_items[k].cart_topping_items.reduce(
                  (a, topping) => a + topping.ordered_qty,
                  0
                );
                var originalTotal = tempCartItemsArray[i].carts[j].cart_items[
                  k
                ].cart_topping_items.reduce(
                  (a, topping) => a + topping.toppingTotal,
                  0
                );
                var twoDigitTotal = financial(originalTotal);
                var toppingTotal = parseFloat(twoDigitTotal);

                var originalTotal =
                  tempCartItemsArray[i].carts[j].cart_items[k].quantity *
                  tempCartItemsArray[i].carts[j].cart_items[k].product_cost;
                var twoDigitTotal = financial(originalTotal);
                var total = parseFloat(twoDigitTotal);
                tempCartItemsArray[i].carts[j].cart_items[k].total = total;
                tempCartItemsArray[i].carts[j].cart_items[k].toppingItemTotal =
                  toppingItemTotal;
                tempCartItemsArray[i].carts[j].cart_items[k].toppingTotal =
                  toppingTotal;
              }
              var mainItemTotal = tempCartItemsArray[i].carts[
                j
              ].cart_items.reduce((a, topping) => a + topping.quantity, 0);
              var originalMainTotal = tempCartItemsArray[i].carts[
                j
              ].cart_items.reduce((a, topping) => a + topping.total, 0);
              var twoDigitMainTotal = financial(originalMainTotal);
              var mainTotal = parseFloat(twoDigitMainTotal);
              var toppingItemTotal = tempCartItemsArray[i].carts[
                j
              ].cart_items.reduce(
                (a, topping) => a + topping.toppingItemTotal,
                0
              );
              var toppingTotal = tempCartItemsArray[i].carts[
                j
              ].cart_items.reduce((a, topping) => a + topping.toppingTotal, 0);
              var eventItemTotal = mainItemTotal + toppingItemTotal;
              var originalTotal = mainTotal + toppingTotal;
              var twoDigitTotal = financial(originalTotal);
              var eventTotal = parseFloat(twoDigitTotal);

              tempCartItemsArray[i].carts[j].eventTotal = eventTotal;
              tempCartItemsArray[i].carts[j].eventItemTotal = eventItemTotal;
            }
            var childItemTotal = tempCartItemsArray[i].carts.reduce(
              (a, topping) => a + topping.eventItemTotal,
              0
            );
            var originalTotal = tempCartItemsArray[i].carts.reduce(
              (a, topping) => a + topping.eventTotal,
              0
            );
            var twoDigitTotal = financial(originalTotal);
            var childTotal = parseFloat(twoDigitTotal);

            tempCartItemsArray[i].childTotal = childTotal;
            tempCartItemsArray[i].childItemTotal = childItemTotal;
          }
          setCartItems(tempCartItemsArray);
          var grandItemTotal = cartItems.reduce(
            (a, topping) => a + topping.childItemTotal,
            0
          );
          setGrandItemTotals(grandItemTotal);
          var originalTotal = cartItems.reduce(
            (a, topping) => a + topping.childTotal,
            0
          );
          var twoDigitTotal = financial(originalTotal);
          var grandTotal = parseFloat(twoDigitTotal);
          setGrandTotals(grandTotal);
        } else {
          toast.error(data.message);
        }
      } catch ({ data }) {
        toast.error(data.message);
      } finally {
        setLoader(false);
      }
    }, 1000);
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

  const checkoutEventData = async (recordId) => {
    for (var i = 0; i < cartItems.length; i++) {
      for (var j = 0; j < cartItems[i].carts.length; j++) {
        if (cartItems[i].carts[j].id == recordId) {
          for (var k = 0; k < cartItems[i].carts[j].cart_items.length; k++) {
            orderLineToppingItems = [];
            for (
              var l = 0;
              l < cartItems[i].carts[j].cart_items[k].cart_topping_items.length;
              l++
            ) {
              const record = {
                id_topping_item:
                  cartItems[i].carts[j].cart_items[k].cart_topping_items[l]
                    .id_topping_item,
                freebie_qty:
                  cartItems[i].carts[j].cart_items[k].cart_topping_items[l]
                    .freebie_qty,
                ordered_qty:
                  cartItems[i].carts[j].cart_items[k].cart_topping_items[l]
                    .ordered_qty,
                product_cost:
                  cartItems[i].carts[j].cart_items[k].cart_topping_items[l]
                    .product_cost,
              };
              orderLineToppingItems.push(record);
            }
            const records = {
              id_vendor_menu_items:
                cartItems[i].carts[j].cart_items[k].id_vendor_menu_items,
              product_cost: cartItems[i].carts[j].cart_items[k].product_cost,
              quantity: cartItems[i].carts[j].cart_items[k].quantity,
              order_line_topping_items: orderLineToppingItems,
            };
            orderLineItems.push(records);
          }
          const payload = {
            id_student: cartItems[i].id,
            id_event: cartItems[i].carts[j].id_event,
            id_vendor: cartItems[i].carts[j].id_vendor,
            order_total_cost: cartItems[i].carts[j].eventTotal,
            order_line_items: orderLineItems,
          };
          try {
            const data = await ADD_ORDER_NOW(payload);
            if (data.code === 200 || data.code === "200") {
              toast.success(data.message);
              deleteMenuItem(recordId, "event",true);
            } else {
              toast.error(data.message);
            }
          } catch ({ data }) {
            toast.error(data.message);
          }
        }
      }
    }
  };

  const checkoutData = async (recordId) => {
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === recordId) {
        for (var j = 0; j < cartItems[i].carts.length; j++) {
          orderLineItems = [];
          for (var k = 0; k < cartItems[i].carts[j].cart_items.length; k++) {
            let a = cartItems[i].carts[j].cart_items[
              k
            ].cart_topping_items.filter(
              (f) => !cartItems[i].carts[j].cart_items.includes(f)
            );
            orderLineToppingItems = [];
            for (var l = 0; l < a.length; l++) {
              const record = {
                id_topping_item:
                  cartItems[i].carts[j].cart_items[k].cart_topping_items[l]
                    .id_topping_item,
                freebie_qty:
                  cartItems[i].carts[j].cart_items[k].cart_topping_items[l]
                    .freebie_qty,
                ordered_qty:
                  cartItems[i].carts[j].cart_items[k].cart_topping_items[l]
                    .ordered_qty,
                product_cost:
                  cartItems[i].carts[j].cart_items[k].cart_topping_items[l]
                    .product_cost,
              };
              orderLineToppingItems.push(record);
            }
            const records = {
              id_vendor_menu_items:
                cartItems[i].carts[j].cart_items[k].id_vendor_menu_items,
              product_cost: cartItems[i].carts[j].cart_items[k].product_cost,
              quantity: cartItems[i].carts[j].cart_items[k].quantity,
              order_line_topping_items: orderLineToppingItems,
            };
            orderLineItems.push(records);
          }
          const payload = {
            id_student: cartItems[i].id,
            id_event: cartItems[i].carts[j].id_event,
            id_vendor: cartItems[i].carts[j].id_vendor,
            order_total_cost: cartItems[i].carts[j].eventTotal,
            order_line_items: orderLineItems,
          };
          try {
            const data = await ADD_ORDER_NOW(payload);
            if (data.code === 200 || data.code === "200") {
              toast.success(data.message);
              deleteMenuItem(cartItems[i].carts[j].id, "event",true);
            } else {
              toast.error(data.message);
            }
          } catch ({ data }) {
            toast.error(data.message);
          }
        }
      }
    }
  };
  const checkoutAllData = async () => {
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].carts.length > 0) {
        for (var j = 0; j < cartItems[i]?.carts.length; j++) {
          orderLineItems = [];
          for (var k = 0; k < cartItems[i].carts[j].cart_items.length; k++) {
            let a = cartItems[i].carts[j].cart_items[
              k
            ].cart_topping_items.filter(
              (f) => !cartItems[i].carts[j].cart_items.includes(f)
            );
            orderLineToppingItems = [];
            for (var l = 0; l < a.length; l++) {
              const record = {
                id_topping_item:
                  cartItems[i].carts[j].cart_items[k].cart_topping_items[l]
                    .id_topping_item,
                freebie_qty:
                  cartItems[i].carts[j].cart_items[k].cart_topping_items[l]
                    .freebie_qty,
                ordered_qty:
                  cartItems[i].carts[j].cart_items[k].cart_topping_items[l]
                    .ordered_qty,
                product_cost:
                  cartItems[i].carts[j].cart_items[k].cart_topping_items[l]
                    .product_cost,
              };
              orderLineToppingItems.push(record);
            }
            const records = {
              id_vendor_menu_items:
                cartItems[i].carts[j].cart_items[k].id_vendor_menu_items,
              product_cost: cartItems[i].carts[j].cart_items[k].product_cost,
              quantity: cartItems[i].carts[j].cart_items[k].quantity,
              order_line_topping_items: orderLineToppingItems,
            };
            orderLineItems.push(records);
          }
          const payload = {
            id_student: cartItems[i].id,
            id_event: cartItems[i].carts[j].id_event,
            id_vendor: cartItems[i].carts[j].id_vendor,
            order_total_cost: cartItems[i].carts[j].eventTotal,
            order_line_items: orderLineItems,
          };
          var id = cartItems[i].carts[j].id;
          try {
            const data = await ADD_ORDER_NOW(payload);
            if (data.code === 200 || data.code === "200") {
              toast.success(data.message);
              deleteMenuItem(id, "event",true);
            } else {
              toast.error(data.message);
            }
          } catch ({ data }) {
            toast.error(data.message);
          }
        }
      }
    }
  };

  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 px-0">
        {isloader ? <Loader /> : null}
        <div className="row mx-auto">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <Accordion
              allowMultipleExpanded
              allowZeroExpanded={true}
              preExpanded={activeStudentCollapse}
            >
              {cartItems.map((item, index) => (
                <Card className="student-Header-sec mt-2" key={index}>
                  <AccordionItem uuid={index + 1}>
                    <AccordionItemHeading className="bg-dark-blue">
                      <AccordionItemButton>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex ml-4">
                            <div>
                              {item && (
                                <h2 className="text-maven text-5 text-white mb-0">
                                  {props.data.loginInfo.user_type == 5
                                    ? item.teacher_name
                                    : item.first_name +
                                      " " +
                                      item.last_name}{" "}
                                  -
                                  <span className="ml-2 text-color-tertiary text-white">
                                    {item.grade_division_name == " "
                                      ? "Unknown Grade Division"
                                      : item.grade_division_name}
                                  </span>
                                </h2>
                              )}
                              <div>
                                {item.student && (
                                  <p className="text-white mb-0">
                                    {item.school_name}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <Card.Body className="p-0">
                        <Accordion
                          allowMultipleExpanded
                          allowZeroExpanded={true}
                          preExpanded={activeEventsCollapse}
                        >
                          {item.carts.map((item1, index1) => (
                            <Card
                              className="student-Header-sec mt-2"
                              key={index1}
                            >
                              <AccordionItem uuid={index1 + 1}>
                                <AccordionItemHeading className="bg-dark-blue">
                                  <AccordionItemButton>
                                    <div className="d-flex justify-content-between flex-column-sm">
                                      <div className="d-flex ml-4">
                                        <div>
                                          <h2 className="text-maven text-5 text-white mb-0">
                                            {item1.event_name}
                                          </h2>
                                        </div>
                                      </div>
                                      <div className="margin-top-sm-12">
                                        <h2 className="text-maven text-5 text-white mb-0">
                                          {item1.restaurant_name}
                                        </h2>
                                      </div>
                                      <div className="margin-top-sm-12">
                                        <h2 className="text-maven text-5 text-color-tertiary text-white mb-0">
                                          {dateFormate(item1.scheduled_date)}
                                        </h2>
                                      </div>
                                    </div>
                                  </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="restaurant-menu-sec">
                                  <Card.Body>
                                    {/* first collapse */}
                                    <div>
                                      <div className="linear-activity-wrapper d-none">
                                        {isloader && (
                                          <div className="linear-activity">
                                            <div className="indeterminate"></div>
                                          </div>
                                        )}
                                      </div>
                                      <Accordion
                                        className="order-now-collapse-sec"
                                        allowMultipleExpanded
                                        allowZeroExpanded={true}
                                        preExpanded={[1, 2, 3]}
                                      >
                                        {item1.cart_items.filter(
                                          (item) => item.category_name == "Meal"
                                        ).length === 0 ? null : (
                                          <Card className="border-radius-7">
                                            <AccordionItem uuid={1}>
                                              <AccordionItemHeading>
                                                <AccordionItemButton>
                                                  <div
                                                    id="collaps1"
                                                    className="d-flex align-items-center ml-4"
                                                  >
                                                    <h2 className="text-maven text-6 mb-0">
                                                      Meal
                                                    </h2>
                                                  </div>
                                                </AccordionItemButton>
                                              </AccordionItemHeading>
                                              <AccordionItemPanel className="pt-0">
                                                <div className="res-Menu-body-sec">
                                                  <div className="row mx-auto pt-2">
                                                    <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                      <div>
                                                        <h2 className="text-maven text-6">
                                                          Item Name
                                                        </h2>
                                                      </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                      <div>
                                                        <h2 className="text-maven text-6">
                                                          Price
                                                        </h2>
                                                      </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                      <div>
                                                        <h2 className="text-maven text-6">
                                                          Quantity
                                                        </h2>
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
                                                  {item1.cart_items.map(
                                                    (item2, index2) => (
                                                      <div key={index2}>
                                                        {item2.category_name ==
                                                          "Meal" && (
                                                          <div className="row mx-auto">
                                                            <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                              <div className="d-flex align-items-center">
                                                                <div className="form-check mr-2 pl-0">
                                                                  <img
                                                                    src={
                                                                      CancelIcon
                                                                    }
                                                                    className="cursor-pointer"
                                                                    width="20"
                                                                    alt="removeItem"
                                                                    title="Remove Item"
                                                                    onClick={() =>
                                                                      deleteMenuItem(
                                                                        item2.id,
                                                                        "item",
                                                                        false
                                                                      )
                                                                    }
                                                                  />
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                  <h2 className="text-maven text-5 mr-2 mb-0">
                                                                    {
                                                                      item2.product_name
                                                                    }
                                                                  </h2>
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                              <div>
                                                                <h2 className="text-maven text-5 mb-0">
                                                                  $
                                                                  {
                                                                    item2.product_cost
                                                                  }
                                                                </h2>
                                                              </div>
                                                            </div>
                                                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                              {/* new box design */}
                                                              <div className="qty-box d-flex justify-content-center bg-light-gray border-light-gray border-radius-7">
                                                                {item2.quantity ==
                                                                1 ? (
                                                                  <div
                                                                    className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                                                    onClick={(
                                                                      e
                                                                    ) =>
                                                                      updateCartItemQty(
                                                                        item2.quantity -
                                                                          1,
                                                                        item2.id
                                                                      )
                                                                    }
                                                                  >
                                                                    <span>
                                                                      <img
                                                                        src={
                                                                          SubtractIcon
                                                                        }
                                                                        alt="Subtract"
                                                                        width="15"
                                                                        className="cursor-pointer"
                                                                      />
                                                                    </span>
                                                                  </div>
                                                                ) : (
                                                                  <div
                                                                    className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                                    onClick={(
                                                                      e
                                                                    ) =>
                                                                      updateCartItemQty(
                                                                        item2.quantity -
                                                                          1,
                                                                        item2.id
                                                                      )
                                                                    }
                                                                  >
                                                                    <span>
                                                                      <img
                                                                        src={
                                                                          SubtractIcon
                                                                        }
                                                                        alt="Subtract"
                                                                        width="15"
                                                                        className="cursor-pointer"
                                                                      />
                                                                    </span>
                                                                  </div>
                                                                )}
                                                                <div className="qty-label bg-white">
                                                                  <h2 className="text-maven text-5 mb-0">
                                                                    {
                                                                      item2.quantity
                                                                    }
                                                                  </h2>
                                                                </div>
                                                                <div
                                                                  className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                                  onClick={(
                                                                    e
                                                                  ) =>
                                                                    updateCartItemQty(
                                                                      item2.quantity +
                                                                        1,
                                                                      item2.id
                                                                    )
                                                                  }
                                                                >
                                                                  <span>
                                                                    <img
                                                                      src={
                                                                        PlusIcon
                                                                      }
                                                                      alt="Plus"
                                                                      width="15"
                                                                      className="cursor-pointer"
                                                                    />
                                                                  </span>
                                                                </div>
                                                              </div>
                                                              {/* end box design */}
                                                            </div>
                                                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                              <div>
                                                                <h2
                                                                  className="text-maven text-5 mb-0 text-right"
                                                                  id={
                                                                    "total" +
                                                                    item2.id
                                                                  }
                                                                >
                                                                  ${item2.total}
                                                                </h2>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )}
                                                        {item2.cart_topping_items.map(
                                                          (item3, index3) =>
                                                            item2.category_name ==
                                                              "Meal" && (
                                                              <div
                                                                className="row mx-auto"
                                                                key={index3}
                                                              >
                                                                <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                                  <div className="d-flex mrg-left-30 align-items-center">
                                                                    <div className="form-check mr-2 pl-0">
                                                                      <img
                                                                        src={
                                                                          CancelIcon
                                                                        }
                                                                        className="cursor-pointer"
                                                                        width="20"
                                                                        alt="removeItem"
                                                                        title="Remove Item"
                                                                        onClick={() =>
                                                                          deleteMenuItem(
                                                                            item3.id,
                                                                            "toppingItem",
                                                                            false
                                                                          )
                                                                        }
                                                                      />
                                                                    </div>
                                                                    <div className="d-flex align-items-center">
                                                                      <h2 className="text-maven text-5 mr-2 mb-0">
                                                                        {
                                                                          item3.product_name
                                                                        }
                                                                        <span className="ml-2 text-2 color-darkcyan">
                                                                          (Included
                                                                          Quantity:
                                                                          <span className="ml-1">
                                                                            {
                                                                              item3.freebie_qty
                                                                            }
                                                                          </span>
                                                                          )
                                                                        </span>
                                                                      </h2>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                                  <div>
                                                                    <h2 className="text-maven text-5 mb-0">
                                                                      $
                                                                      {
                                                                        item3.product_cost
                                                                      }
                                                                    </h2>
                                                                  </div>
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                                  {/* new box design */}
                                                                  <div className="qty-box d-flex justify-content-center bg-light-gray border-light-gray border-radius-7">
                                                                    {item3.ordered_qty ==
                                                                    1 ? (
                                                                      <div
                                                                        className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                                                        onClick={(
                                                                          e
                                                                        ) =>
                                                                          updateCartToppingItemQty(
                                                                            item3.ordered_qty -
                                                                              1,
                                                                            item3.id
                                                                          )
                                                                        }
                                                                      >
                                                                        <span>
                                                                          <img
                                                                            src={
                                                                              SubtractIcon
                                                                            }
                                                                            alt="Subtract"
                                                                            width="15"
                                                                            className="cursor-pointer"
                                                                          />
                                                                        </span>
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                                        onClick={(
                                                                          e
                                                                        ) =>
                                                                          updateCartToppingItemQty(
                                                                            item3.ordered_qty -
                                                                              1,
                                                                            item3.id
                                                                          )
                                                                        }
                                                                      >
                                                                        <span>
                                                                          <img
                                                                            src={
                                                                              SubtractIcon
                                                                            }
                                                                            alt="Subtract"
                                                                            width="15"
                                                                            className="cursor-pointer"
                                                                          />
                                                                        </span>
                                                                      </div>
                                                                    )}
                                                                    <div className="qty-label bg-white">
                                                                      <h2 className="text-maven text-5 mb-0">
                                                                        {
                                                                          item3.ordered_qty
                                                                        }
                                                                      </h2>
                                                                    </div>
                                                                    <div
                                                                      className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                                      onClick={(
                                                                        e
                                                                      ) =>
                                                                        updateCartToppingItemQty(
                                                                          item3.ordered_qty +
                                                                            1,
                                                                          item3.id
                                                                        )
                                                                      }
                                                                    >
                                                                      <span>
                                                                        <img
                                                                          src={
                                                                            PlusIcon
                                                                          }
                                                                          alt="Plus"
                                                                          width="15"
                                                                          className="cursor-pointer"
                                                                        />
                                                                      </span>
                                                                    </div>
                                                                  </div>
                                                                  {/* end box design */}
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                                  <div>
                                                                    <h2
                                                                      className="text-maven text-5 mb-0 text-right"
                                                                      id={
                                                                        "toppingTotal" +
                                                                        item2.id +
                                                                        item3.id_topping_item
                                                                      }
                                                                    >
                                                                      $
                                                                      {
                                                                        item3.toppingTotal
                                                                      }
                                                                    </h2>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            )
                                                        )}
                                                      </div>
                                                    )
                                                  )}
                                                </div>
                                              </AccordionItemPanel>
                                            </AccordionItem>
                                          </Card>
                                        )}
                                        {item1.cart_items.filter(
                                          (item) =>
                                            item.category_name == "Drink"
                                        ).length === 0 ? null : (
                                          <Card className="border-radius-7">
                                            <AccordionItem uuid={2}>
                                              <AccordionItemHeading>
                                                <AccordionItemButton>
                                                  <div
                                                    id="collaps1"
                                                    className="d-flex align-items-center ml-4"
                                                  >
                                                    <h2 className="text-maven text-6 mb-0">
                                                      Drink
                                                    </h2>
                                                  </div>
                                                </AccordionItemButton>
                                              </AccordionItemHeading>
                                              <AccordionItemPanel className="pt-0">
                                                <div className="res-Menu-body-sec">
                                                  <div className="row mx-auto pt-2">
                                                    <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                      <div>
                                                        <h2 className="text-maven text-6">
                                                          Item Name
                                                        </h2>
                                                      </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                      <div>
                                                        <h2 className="text-maven text-6">
                                                          Price
                                                        </h2>
                                                      </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                      <div>
                                                        <h2 className="text-maven text-6">
                                                          Quantity
                                                        </h2>
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
                                                  {item1.cart_items.map(
                                                    (item2, index2) => (
                                                      <div key={index2}>
                                                        {item2.category_name ==
                                                          "Drink" && (
                                                          <div className="row mx-auto">
                                                            <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                              <div className="d-flex align-items-center">
                                                                <div className="form-check mr-2 pl-0">
                                                                  <img
                                                                    src={
                                                                      CancelIcon
                                                                    }
                                                                    className="cursor-pointer"
                                                                    width="20"
                                                                    alt="removeItem"
                                                                    title="Remove Item"
                                                                    onClick={() =>
                                                                      deleteMenuItem(
                                                                        item2.id,
                                                                        "item",
                                                                        false
                                                                      )
                                                                    }
                                                                  />
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                  <h2 className="text-maven text-5 mr-2 mb-0">
                                                                    {
                                                                      item2.product_name
                                                                    }
                                                                  </h2>
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                              <div>
                                                                <h2 className="text-maven text-5 mb-0">
                                                                  $
                                                                  {
                                                                    item2.product_cost
                                                                  }
                                                                </h2>
                                                              </div>
                                                            </div>
                                                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                              {/* new box design */}
                                                              <div className="qty-box d-flex justify-content-center bg-light-gray border-light-gray border-radius-7">
                                                                {item2.quantity ==
                                                                1 ? (
                                                                  <div
                                                                    className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                                                    onClick={(
                                                                      e
                                                                    ) =>
                                                                      updateCartItemQty(
                                                                        item2.quantity -
                                                                          1,
                                                                        item2.id
                                                                      )
                                                                    }
                                                                  >
                                                                    <span>
                                                                      <img
                                                                        src={
                                                                          SubtractIcon
                                                                        }
                                                                        alt="Subtract"
                                                                        width="15"
                                                                        className="cursor-pointer"
                                                                      />
                                                                    </span>
                                                                  </div>
                                                                ) : (
                                                                  <div
                                                                    className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                                    onClick={(
                                                                      e
                                                                    ) =>
                                                                      updateCartItemQty(
                                                                        item2.quantity -
                                                                          1,
                                                                        item2.id
                                                                      )
                                                                    }
                                                                  >
                                                                    <span>
                                                                      <img
                                                                        src={
                                                                          SubtractIcon
                                                                        }
                                                                        alt="Subtract"
                                                                        width="15"
                                                                        className="cursor-pointer"
                                                                      />
                                                                    </span>
                                                                  </div>
                                                                )}
                                                                <div className="qty-label bg-white">
                                                                  <h2 className="text-maven text-5 mb-0">
                                                                    {
                                                                      item2.quantity
                                                                    }
                                                                  </h2>
                                                                </div>
                                                                <div
                                                                  className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                                  onClick={(
                                                                    e
                                                                  ) =>
                                                                    updateCartItemQty(
                                                                      item2.quantity +
                                                                        1,
                                                                      item2.id
                                                                    )
                                                                  }
                                                                >
                                                                  <span>
                                                                    <img
                                                                      src={
                                                                        PlusIcon
                                                                      }
                                                                      alt="Plus"
                                                                      width="15"
                                                                      className="cursor-pointer"
                                                                    />
                                                                  </span>
                                                                </div>
                                                              </div>
                                                              {/* end box design */}
                                                            </div>
                                                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                              <div>
                                                                <h2
                                                                  className="text-maven text-5 mb-0 text-right"
                                                                  id={
                                                                    "total" +
                                                                    item2.id
                                                                  }
                                                                >
                                                                  ${item2.total}
                                                                </h2>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )}
                                                        {item2.cart_topping_items.map(
                                                          (item3, index3) =>
                                                            item2.category_name ==
                                                              "Drink" && (
                                                              <div
                                                                className="row mx-auto"
                                                                key={index3}
                                                              >
                                                                <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                                  <div className="d-flex mrg-left-30 align-items-center">
                                                                    <div className="form-check mr-2 pl-0">
                                                                      <img
                                                                        src={
                                                                          CancelIcon
                                                                        }
                                                                        className="cursor-pointer"
                                                                        width="20"
                                                                        alt="removeItem"
                                                                        title="Remove Item"
                                                                        onClick={() =>
                                                                          deleteMenuItem(
                                                                            item3.id,
                                                                            "toppingItem",
                                                                            false
                                                                          )
                                                                        }
                                                                      />
                                                                    </div>
                                                                    <div className="d-flex align-items-center">
                                                                      <h2 className="text-maven text-5 mr-2 mb-0">
                                                                        {
                                                                          item3.product_name
                                                                        }
                                                                        <span className="ml-2 text-2 color-darkcyan">
                                                                          (Included
                                                                          Quantity:
                                                                          <span className="ml-1">
                                                                            {
                                                                              item3.freebie_qty
                                                                            }
                                                                          </span>
                                                                          )
                                                                        </span>
                                                                      </h2>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                                  <div>
                                                                    <h2 className="text-maven text-5 mb-0">
                                                                      $
                                                                      {
                                                                        item3.product_cost
                                                                      }
                                                                    </h2>
                                                                  </div>
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                                  {/* new box design */}
                                                                  <div className="qty-box d-flex justify-content-center bg-light-gray border-light-gray border-radius-7">
                                                                    {item3.ordered_qty ==
                                                                    1 ? (
                                                                      <div
                                                                        className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                                                        onClick={(
                                                                          e
                                                                        ) =>
                                                                          updateCartToppingItemQty(
                                                                            item3.ordered_qty -
                                                                              1,
                                                                            item3.id
                                                                          )
                                                                        }
                                                                      >
                                                                        <span>
                                                                          <img
                                                                            src={
                                                                              SubtractIcon
                                                                            }
                                                                            alt="Subtract"
                                                                            width="15"
                                                                            className="cursor-pointer"
                                                                          />
                                                                        </span>
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                                        onClick={(
                                                                          e
                                                                        ) =>
                                                                          updateCartToppingItemQty(
                                                                            item3.ordered_qty -
                                                                              1,
                                                                            item3.id
                                                                          )
                                                                        }
                                                                      >
                                                                        <span>
                                                                          <img
                                                                            src={
                                                                              SubtractIcon
                                                                            }
                                                                            alt="Subtract"
                                                                            width="15"
                                                                            className="cursor-pointer"
                                                                          />
                                                                        </span>
                                                                      </div>
                                                                    )}
                                                                    <div className="qty-label bg-white">
                                                                      <h2 className="text-maven text-5 mb-0">
                                                                        {
                                                                          item3.ordered_qty
                                                                        }
                                                                      </h2>
                                                                    </div>
                                                                    <div
                                                                      className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                                      onClick={(
                                                                        e
                                                                      ) =>
                                                                        updateCartToppingItemQty(
                                                                          item3.ordered_qty +
                                                                            1,
                                                                          item3.id
                                                                        )
                                                                      }
                                                                    >
                                                                      <span>
                                                                        <img
                                                                          src={
                                                                            PlusIcon
                                                                          }
                                                                          alt="Plus"
                                                                          width="15"
                                                                          className="cursor-pointer"
                                                                        />
                                                                      </span>
                                                                    </div>
                                                                  </div>
                                                                  {/* end box design */}
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                                  <div>
                                                                    <h2
                                                                      className="text-maven text-5 text-right mb-0"
                                                                      id={
                                                                        "toppingTotal" +
                                                                        item2.id +
                                                                        item3.id_topping_item
                                                                      }
                                                                    >
                                                                      $
                                                                      {
                                                                        item3.toppingTotal
                                                                      }
                                                                    </h2>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            )
                                                        )}
                                                      </div>
                                                    )
                                                  )}
                                                </div>
                                              </AccordionItemPanel>
                                            </AccordionItem>
                                          </Card>
                                        )}
                                        {item1.cart_items.filter(
                                          (item) =>
                                            item.category_name == "Snack"
                                        ).length === 0 ? null : (
                                          <Card className="border-radius-7">
                                            <AccordionItem uuid={3}>
                                              <AccordionItemHeading>
                                                <AccordionItemButton>
                                                  <div
                                                    id="collaps1"
                                                    className="d-flex align-items-center ml-4"
                                                  >
                                                    <h2 className="text-maven text-6 mb-0">
                                                      Snacks
                                                    </h2>
                                                  </div>
                                                </AccordionItemButton>
                                              </AccordionItemHeading>
                                              <AccordionItemPanel className="pt-0">
                                                <div className="res-Menu-body-sec">
                                                  <div className="row mx-auto pt-2">
                                                    <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                      <div>
                                                        <h2 className="text-maven text-6">
                                                          Item Name
                                                        </h2>
                                                      </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                      <div>
                                                        <h2 className="text-maven text-6">
                                                          Price
                                                        </h2>
                                                      </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                      <div>
                                                        <h2 className="text-maven text-6">
                                                          Quantity
                                                        </h2>
                                                      </div>
                                                    </div>
                                                    <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                      <div>
                                                        <h2 className="text-maven text-right text-6">
                                                          Total
                                                        </h2>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  {item1.cart_items.map(
                                                    (item2, index2) => (
                                                      <div key={index2}>
                                                        {item2.category_name ==
                                                          "Snack" && (
                                                          <div className="row mx-auto">
                                                            <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                              <div className="d-flex align-items-center">
                                                                <div className="form-check mr-2 pl-0">
                                                                  <img
                                                                    src={
                                                                      CancelIcon
                                                                    }
                                                                    className="cursor-pointer"
                                                                    width="20"
                                                                    alt="removeItem"
                                                                    title="Remove Item"
                                                                    onClick={() =>
                                                                      deleteMenuItem(
                                                                        item2.id,
                                                                        "item",
                                                                        false
                                                                      )
                                                                    }
                                                                  />
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                  <h2 className="text-maven text-5 mr-2 mb-0">
                                                                    {
                                                                      item2.product_name
                                                                    }
                                                                  </h2>
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                              <div>
                                                                <h2 className="text-maven text-5 mb-0">
                                                                  $
                                                                  {
                                                                    item2.product_cost
                                                                  }
                                                                </h2>
                                                              </div>
                                                            </div>
                                                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                              {/* new box design */}
                                                              <div className="qty-box d-flex justify-content-center bg-light-gray border-light-gray border-radius-7">
                                                                {item2.quantity ==
                                                                1 ? (
                                                                  <div
                                                                    className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                                                    onClick={(
                                                                      e
                                                                    ) =>
                                                                      updateCartItemQty(
                                                                        item2.quantity -
                                                                          1,
                                                                        item2.id
                                                                      )
                                                                    }
                                                                  >
                                                                    <span>
                                                                      <img
                                                                        src={
                                                                          SubtractIcon
                                                                        }
                                                                        alt="Subtract"
                                                                        width="15"
                                                                        className="cursor-pointer"
                                                                      />
                                                                    </span>
                                                                  </div>
                                                                ) : (
                                                                  <div
                                                                    className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                                    onClick={(
                                                                      e
                                                                    ) =>
                                                                      updateCartItemQty(
                                                                        item2.quantity -
                                                                          1,
                                                                        item2.id
                                                                      )
                                                                    }
                                                                  >
                                                                    <span>
                                                                      <img
                                                                        src={
                                                                          SubtractIcon
                                                                        }
                                                                        alt="Subtract"
                                                                        width="15"
                                                                        className="cursor-pointer"
                                                                      />
                                                                    </span>
                                                                  </div>
                                                                )}
                                                                <div className="qty-label bg-white">
                                                                  <h2 className="text-maven text-5 mb-0">
                                                                    {
                                                                      item2.quantity
                                                                    }
                                                                  </h2>
                                                                </div>
                                                                <div
                                                                  className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                                  onClick={(
                                                                    e
                                                                  ) =>
                                                                    updateCartItemQty(
                                                                      item2.quantity +
                                                                        1,
                                                                      item2.id
                                                                    )
                                                                  }
                                                                >
                                                                  <span>
                                                                    <img
                                                                      src={
                                                                        PlusIcon
                                                                      }
                                                                      alt="Plus"
                                                                      width="15"
                                                                      className="cursor-pointer"
                                                                    />
                                                                  </span>
                                                                </div>
                                                              </div>
                                                              {/* end box design */}
                                                            </div>
                                                            <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                              <div>
                                                                <h2
                                                                  className="text-maven text-5 text-right mb-0"
                                                                  id={
                                                                    "total" +
                                                                    item2.id
                                                                  }
                                                                >
                                                                  ${item2.total}
                                                                </h2>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        )}
                                                        {item2.cart_topping_items.map(
                                                          (item3, index3) =>
                                                            item2.category_name ==
                                                              "Snack" && (
                                                              <div
                                                                className="row mx-auto"
                                                                key={index3}
                                                              >
                                                                <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                                  <div className="d-flex mrg-left-30 align-items-center">
                                                                    <div className="form-check mr-2 pl-0">
                                                                      <img
                                                                        src={
                                                                          CancelIcon
                                                                        }
                                                                        className="cursor-pointer"
                                                                        width="20"
                                                                        alt="removeItem"
                                                                        title="Remove Item"
                                                                        onClick={() =>
                                                                          deleteMenuItem(
                                                                            item3.id,
                                                                            "toppingItem",
                                                                            false
                                                                          )
                                                                        }
                                                                      />
                                                                    </div>
                                                                    <div className="d-flex align-items-center">
                                                                      <h2 className="text-maven text-5 mr-2 mb-0">
                                                                        {
                                                                          item3.product_name
                                                                        }
                                                                        <span className="ml-2 text-2 color-darkcyan">
                                                                          (Included
                                                                          Quantity:
                                                                          <span className="ml-1">
                                                                            {
                                                                              item3.freebie_qty
                                                                            }
                                                                          </span>
                                                                          )
                                                                        </span>
                                                                      </h2>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                                  <div>
                                                                    <h2 className="text-maven text-5 mb-0">
                                                                      $
                                                                      {
                                                                        item3.product_cost
                                                                      }
                                                                    </h2>
                                                                  </div>
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                                  {/* new box design */}
                                                                  <div className="qty-box d-flex justify-content-center bg-light-gray border-light-gray border-radius-7">
                                                                    {item3.ordered_qty ==
                                                                    1 ? (
                                                                      <div
                                                                        className="d-flex justify-content-center align-items-center w-100 cursor-pointer disabled"
                                                                        onClick={(
                                                                          e
                                                                        ) =>
                                                                          updateCartToppingItemQty(
                                                                            item3.ordered_qty -
                                                                              1,
                                                                            item3.id
                                                                          )
                                                                        }
                                                                      >
                                                                        <span>
                                                                          <img
                                                                            src={
                                                                              SubtractIcon
                                                                            }
                                                                            alt="Subtract"
                                                                            width="15"
                                                                            className="cursor-pointer"
                                                                          />
                                                                        </span>
                                                                      </div>
                                                                    ) : (
                                                                      <div
                                                                        className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                                        onClick={(
                                                                          e
                                                                        ) =>
                                                                          updateCartToppingItemQty(
                                                                            item3.ordered_qty -
                                                                              1,
                                                                            item3.id
                                                                          )
                                                                        }
                                                                      >
                                                                        <span>
                                                                          <img
                                                                            src={
                                                                              SubtractIcon
                                                                            }
                                                                            alt="Subtract"
                                                                            width="15"
                                                                            className="cursor-pointer"
                                                                          />
                                                                        </span>
                                                                      </div>
                                                                    )}
                                                                    <div className="qty-label bg-white">
                                                                      <h2 className="text-maven text-5 mb-0">
                                                                        {
                                                                          item3.ordered_qty
                                                                        }
                                                                      </h2>
                                                                    </div>
                                                                    <div
                                                                      className="d-flex justify-content-center align-items-center w-100 cursor-pointer"
                                                                      onClick={(
                                                                        e
                                                                      ) =>
                                                                        updateCartToppingItemQty(
                                                                          item3.ordered_qty +
                                                                            1,
                                                                          item3.id
                                                                        )
                                                                      }
                                                                    >
                                                                      <span>
                                                                        <img
                                                                          src={
                                                                            PlusIcon
                                                                          }
                                                                          alt="Plus"
                                                                          width="15"
                                                                          className="cursor-pointer"
                                                                        />
                                                                      </span>
                                                                    </div>
                                                                  </div>
                                                                  {/* end box design */}
                                                                </div>
                                                                <div className="col-lg-2 col-md-2 col-4 mb-2">
                                                                  <div>
                                                                    <h2
                                                                      className="text-maven text-right text-5 mb-0"
                                                                      id={
                                                                        "toppingTotal" +
                                                                        item2.id +
                                                                        item3.id_topping_item
                                                                      }
                                                                    >
                                                                      $
                                                                      {
                                                                        item3.toppingTotal
                                                                      }
                                                                    </h2>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            )
                                                        )}
                                                      </div>
                                                    )
                                                  )}
                                                </div>
                                              </AccordionItemPanel>
                                            </AccordionItem>
                                          </Card>
                                        )}
                                      </Accordion>
                                    </div>
                                    {/* end first collapse */}
                                    <div className="mt-3">
                                      <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="d-flex justify-content-between flex-lg-row flex-md-column flex-sm-column flex-column">
                                          <div>
                                            <div>
                                              <Button
                                                className="bg-dark-blue mr-2"
                                                onClick={() =>
                                                  checkoutEventData(item1.id)
                                                }
                                              >
                                                <i
                                                  className="fa fa-shopping-cart mr-2"
                                                  aria-hidden="true"
                                                ></i>
                                                Checkout
                                              </Button>
                                              <Button
                                                className="bg-dark-blue my-lg-0 my-md-0 my-sm-2 my-2"
                                                onClick={() =>
                                                  deleteMenuItem(
                                                    item1.id,
                                                    "event",
                                                    false
                                                  )
                                                }
                                              >
                                                Remove items from the cart for
                                                this event
                                              </Button>
                                            </div>
                                          </div>
                                          <div className="d-flex align-items-center mt-lg-0 mt-md-2 mt-sm-2">
                                            <div>
                                              <h2 className="text-5 font-weight-semibold">
                                                {item1.event_name}
                                                <span className="mx-1">-</span>
                                                Total
                                              </h2>
                                            </div>
                                            <div>
                                              <h2
                                                className="text-6 ml-4 mr-3 bg-dark-blue text-white px-4 py-1"
                                                id={
                                                  "eventTotalItem" +
                                                  item.id +
                                                  item1.id
                                                }
                                              >
                                                {item1.eventItemTotal}
                                              </h2>
                                            </div>
                                            <div>
                                              <h2
                                                className="text-6 bg-dark-blue text-white px-4 py-1"
                                                id={
                                                  "eventTotal" +
                                                  item.id +
                                                  item1.id
                                                }
                                              >
                                                ${item1.eventTotal}
                                              </h2>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Card.Body>
                                </AccordionItemPanel>
                              </AccordionItem>
                            </Card>
                          ))}
                        </Accordion>
                        <div className="row mx-auto mt-5">
                          <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <div className="d-flex justify-content-end">
                              <div className="d-flex align-items-center">
                                <div>
                                  <h2 className="text-5 font-weight-semibold">
                                    {item.first_name} {item.last_name}
                                    <span className="mx-1">-</span>Total
                                  </h2>
                                </div>
                                <div>
                                  <h2
                                    className="text-6 ml-4 mr-3 bg-dark-blue text-white px-4 py-1"
                                    id={"childGrandTotalItem" + item.id}
                                  >
                                    {item.childItemTotal}
                                  </h2>
                                </div>
                                <div>
                                  <h2
                                    className="text-6 bg-dark-blue text-white px-4 py-1"
                                    id={"childGrandTotal" + item.id}
                                  >
                                    ${item.childTotal}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="d-flex justify-content-end">
                              <Button
                                className="bg-dark-blue mr-2"
                                onClick={() =>
                                  deleteMenuItem(item, "emptyCart",false)
                                }
                              >
                                <i
                                  className="fa fa-shopping-cart mr-2"
                                  aria-hidden="true"
                                ></i>
                                Empty Cart
                              </Button>
                              <Button
                                className="bg-dark-blue"
                                onClick={() => checkoutData(item.id)}
                              >
                                <i
                                  className="fa fa-shopping-cart mr-2"
                                  aria-hidden="true"
                                ></i>
                                Checkout
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </AccordionItemPanel>
                  </AccordionItem>
                </Card>
              ))}
            </Accordion>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 my-3">
            {cartItems.length > 0 && (
              <div className="grand-total-sec">
                <div className="d-flex justify-content-end">
                  <div className="d-flex align-items-center">
                    <div>
                      <h2 className="text-5 font-weight-semibold">
                        Grand Total
                      </h2>
                    </div>
                    <div>
                      <h2
                        className="text-6 ml-4 mr-3 bg-dark-blue text-white px-4 py-1"
                        id="grandTotalItem"
                      >
                        {grandItemTotals}
                      </h2>
                    </div>
                    <div>
                      <h2
                        className="text-6 bg-dark-blue text-white px-4 py-1"
                        id="grandTotal"
                      >
                        ${grandTotals}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  {cartItems.length == 0 ? null : (
                    <Button
                      className="bg-dark-blue mr-2"
                      onClick={() => deleteMenuItem(0, "removeCart",false)}
                    >
                      <i
                        className="fa fa-shopping-cart mr-2"
                        aria-hidden="true"
                      ></i>
                      Empty Cart
                    </Button>
                  )}
                  {cartItems.length == 0 ? null : (
                    <Button
                      className="bg-dark-blue"
                      onClick={() => checkoutAllData()}
                    >
                      <i
                        className="fa fa-shopping-cart mr-2"
                        aria-hidden="true"
                      ></i>
                      Checkout
                    </Button>
                  )}
                </div>
              </div>
            )}
            {isloader === false && cartItems.length === 0 && (
              <div className="grand-total-sec">
                <div className="d-flex align-items-center justify-content-center">
                  <h2 className="text-5 font-weight-semibold">
                    There is no item added to the the cart.
                  </h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ParentCartDetails;
