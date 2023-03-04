import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

import DeleteIcon from "../../../assets/img/icons/delete-icon.svg";
import NoImgAvailable from "../../../assets/img/no-image.jpg";
import ToppingModal from "../../../components/ToppingModal";
import WarningMenuModal from "../../../components/warningMenuModal";
import Loader from "../../../components/Loader";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";
import { Multiselect } from "multiselect-react-dropdown";
import { history } from "../../../history";
import queryString from "query-string";
import ReactTagInput from "@pathofdev/react-tag-input";
import HmImage from "../../../components/core/image";

import {
  ALLOWED_IMAGE_TYPES,
  PRODUCT_IMAGE_ALLOWED_SIZE_KB,
  APP_IMAGE_BASE_URL,
} from "../../../config";
import { GenerateRandomString } from "../../../common";

import {
  GET_ALLERGENS_LIST,
  GET_NUTRITIONAL_LIST,
  GET_PRODUCT_CATEGORY_LIST,
  GET_RESTAURANT_MENU_ITEM_BY_ID,
  ADD_RESTAURANT_MENU_ITEM,
  UPDATE_RESTAURANT_MENU_ITEM,
  GET_TOPPING_LIST,
  ADD_IMAGE,
  GET_IMAGE,
  DELETE_IMAGE,
} from "../../../services/ENDPOINT";

const AddEditMenu = (props) => {
  const paramsId = queryString.parse(location.search).id;
  const restaurantId = queryString.parse(location.search).restaurantId;
  const restaurantName = queryString.parse(location.search).restaurantName;

  const [isloader, setLoader] = useState(false);
  const [isImageLoader, setIsImageLoader] = useState(false);
  const [showToppingModal, setShowPopupToppingModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [nutritionals, setNutritionals] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [selectImg, setSelectImg] = useState(null);
  const [productCategorys, setProductCategorys] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [restaurantMenus, setRestaurantMenus] = useState({});
  const [toppingValues, setToppingValues] = useState([]);
  const [newAllergences, setNewAllergences] = useState([]);
  const [toppingIds, setToppingIds] = useState([]);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [selectedValues, setSelectedValues] = useState();
  const [toppingEdits, setToppingEdits] = useState([]);
  const [showWarningModal, setshowWarningModal] = useState(false);
  const [createOrExit, setCreateOrExit] = useState();
  const [reloadAllergens, setReloadAllergens] = useState(true);
  const [nutritionDatas, setnutritionDatas] = useState([]);
  const [recordData, setRecordData] = useState({});
  const [checkedUnchecked, setCheckedUnchecked] = useState(false);
  const [newProductImageName, setNewProductImageName] = useState();
  const [imageDetails, setImageDetails] = useState([]);
  const [originalImageName, setOriginalImageName] = useState();
  const [refresh, setRefresh] = useState(true);
  const [imgId, setimgId] = useState();
  const state = {
    options: allergens,
  };
  const state1 = {
    options: selectedAllergens,
  };

  const handleCheck = (e) => {
    const tempTagsArray = [];
    if (e.target.checked == true) {
      setCheckedUnchecked(true);
      tempTagsArray.push(e.target.value);
      setTags(tempTagsArray);
    } else {
      setCheckedUnchecked(false);
      setTags(tempTagsArray);
    }
  };
  const handleTagEvent = (e) => {
    setTags(e);
    const tempTagObject = tags.find((element) => element == "Veg-Friendly");
    if (tempTagObject == "Veg-Friendly") {
      setCheckedUnchecked(false);
    }
  };

  const handleKeyDown = (evt) => {
    var charCode = evt.which ? evt.which : evt.keyCode;
    var allowedKeys = [8, 9, 35, 36, 37, 39, 46, 110, 190];
    var isDecimalPlaceExist = evt.target.value.indexOf(".") > -1 ? 1 : 0;

    if (isDecimalPlaceExist && (charCode === 110 || charCode === 190)) {
      evt.preventDefault();
    }

    if (
      (charCode < 48 || (charCode > 57 && charCode < 96) || charCode > 105) &&
      allowedKeys.indexOf(charCode) < 0
    ) {
      evt.preventDefault();
    }
  };

  const handleNumberKey = (evt) => {
    var charCode = evt.which ? evt.which : evt.keyCode;
    var allowedKeys = [8, 9, 35, 36, 37, 39, 46];
    if (
      (charCode < 48 || (charCode > 57 && charCode < 96) || charCode > 105) &&
      allowedKeys.indexOf(charCode) < 0
    ) {
      evt.preventDefault();
    }
  };

  const editToppingList = (data) => {
    const tempToppingEditsArray = [...toppingEdits];
    let index = toppingEdits.findIndex(function (toppingArray) {
      return toppingArray.id === data.id;
    });
    tempToppingEditsArray[index].checked = data.checked;
    tempToppingEditsArray[index].freebie_qty = data.freebie_qty;
    setToppingEdits(tempToppingEditsArray);
    setRefresh(false);
  };

  const saveTopping = (data) => {
    setShowPopupToppingModal(false);
    for (var i = 0; i < toppingEdits.length; i++) {
      if (toppingEdits[i].checked == true) {
        const tempToppingObject = toppings.findIndex((tp) => {
          return tp.id == toppingEdits[i].id;
        });
        if (tempToppingObject == -1) {
          const record = {
            checked: toppingEdits[i].checked,
            freebie_qty: toppingEdits[i].freebie_qty,
            id: toppingEdits[i].id,
            product_name: toppingEdits[i].product_name,
          };
          toppings.push(record);
        } 
        else {          
          toppings[tempToppingObject].freebie_qty =
            toppingEdits[i].freebie_qty;          
        }
      }else if(toppingEdits[i].checked == false){
        const tempToppingObject = toppings.findIndex((tp) => {
          return tp.id == toppingEdits[i].id;
        });        
        const tempToppingsArray = [...toppings]
        if(tempToppingObject==0 || tempToppingObject!=-1){
          tempToppingsArray.splice(tempToppingObject, 1)
          toppings.splice(tempToppingObject, 1)
        }
        setToppings(tempToppingsArray)
      }
    }
    if (data.length !== 0) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].checked == true) {
          const tempToppingIdObject = toppingIds.findIndex((tp) => {
            return tp.id_topping_item == data[i].id;
          });
          if (tempToppingIdObject == -1) {
            toppingIds.push({
              id_topping_item: data[i].id,
              freebie_qty: data[i].freebie_qty,
            });
          } else {
            toppingIds[tempToppingIdObject].freebie_qty = data[i].freebie_qty;
          }
        }
      }
    } else {
      for (var i = 0; i < toppingEdits.length; i++) {
        if (toppingEdits[i].checked == true) {
          const tempToppingIdObject = toppingIds.findIndex((tp) => {
            return tp.id_topping_item == toppingEdits[i].id;
          });
          if (tempToppingIdObject == -1) {
            toppingIds.push({
              id_topping_item: toppingEdits[i].id,
              freebie_qty: toppingEdits[i].freebie_qty,
            });
          } else {
            toppingIds[tempToppingIdObject].freebie_qty =
              toppingEdits[i].freebie_qty;
          }
        }
      }
    }
  };

  const handleDeleteItem = (record) => {
    let index;
    index = toppings.indexOf(record);
    let toppingEditIndex = toppingEdits.findIndex(function (toppingArray) {
      return toppingArray.id === record.id;
    });
    const tempToppingEditsArray = [...toppingEdits];
    const tempToppingArray = [...toppings];
    const tempToppingValueArray = [...toppingValues];
    const tempToppingIdArray = [...toppingIds];
    tempToppingEditsArray[toppingEditIndex].checked = false;
    tempToppingEditsArray[toppingEditIndex].freebie_qty = "";
    toppings.splice(index, 1);
    tempToppingArray.splice(index, 1);
    toppingValues.splice(index, 1);
    tempToppingValueArray.splice(index, 1);
    toppingIds.splice(index, 1);
    tempToppingIdArray.splice(index, 1);
    setToppingEdits(tempToppingEditsArray);
    setToppings(tempToppingArray);
    setToppingValues(tempToppingValueArray);
    setToppingIds(tempToppingIdArray);
  };

  const getAllergensList = async (allergensrecord) => {
    try {
      const data = await GET_ALLERGENS_LIST();
      if (data.code === 200 || data.code === "200") {
        setAllergens(data.data);
        if (allergensrecord != 0) {
          if (allergensrecord && allergensrecord.allergens.length > 0) {
            const itemArray = [];
            for (const a of allergensrecord.allergens) {
              const tempAllergenObject = data.data.find((i) => i.id == a);
              if (tempAllergenObject) {
                itemArray.push(tempAllergenObject);
                onSelect([...itemArray], tempAllergenObject);
              }
            }
            setSelectedAllergens(itemArray);
          }
        }
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const getNutritionalList = async (nutritionalRecord) => {
    try {
      setLoader(true);
      const data = await GET_NUTRITIONAL_LIST();
      if (data.code === 200 || data.code === "200") {
        for (var i = 0; i < data.data.length; i++) {
          const record = {
            created_by: data.data[i].created_by,
            created_date: data.data[i].created_date,
            deleted: data.data[i].deleted,
            id: data.data[i].id,
            is_active: data.data[i].is_active,
            modified_by: data.data[i].modified_by,
            modified_date: data.data[i].modified_date,
            nutritional_name: data.data[i].nutritional_name,
            value: "",
          };
          nutritionals.push(record);
        }
        if (nutritionalRecord != 0) {
          if (
            nutritionalRecord &&
            nutritionalRecord.nutrition_values.length >= 0
          ) {
            const tempNutritionalArray = [...nutritionals];
            for (const nv of nutritionalRecord.nutrition_values) {
              const tempNutritionalObject = nutritionals.findIndex(
                (i) => i.id == nv.id
              );
              if (tempNutritionalObject === 0 || tempNutritionalObject != -1) {
                tempNutritionalArray[tempNutritionalObject].value = nv.value;
              }
            }
            setNutritionals(tempNutritionalArray);
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
  };
  const getProductCategoryList = async () => {
    try {
      const data = await GET_PRODUCT_CATEGORY_LIST();
      if (data.code === 200 || data.code === "200") {
        setProductCategorys(data.data);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getProductCategoryList();
  }, []);
  const getToppingList = async (toppingRecord) => {
    const payload = restaurantId ? restaurantId : props.data.loginInfo.id;
    try {
      const data = await GET_TOPPING_LIST(payload);
      if (data.code === 200 || data.code === "200") {
        // setToppingEdits(data.data);
        for (var i = 0; i < data.data.length; i++) {
          const record = {
            id: data.data[i].id,
            product_name: data.data[i].product_name,
            checked: false,
            freebie_qty: "",
          };
          toppingEdits.push(record);
        }
        if (toppingRecord != 0) {
          if (toppingRecord && toppingRecord.topping_items.length > 0) {
            const itemArray = [];
            for (const a of toppingRecord.topping_items) {
              const tempToppingObjectId = data.data.find(
                (i) => i.id == a.id_topping_item
              );
              const tempToppingObjectIndex = data.data.findIndex(
                (i) => i.id == a.id_topping_item
              );
              if (tempToppingObjectId) {
                itemArray.push({
                  id: tempToppingObjectId.id,
                  product_name: tempToppingObjectId.product_name,
                  freebie_qty:
                    toppingRecord.topping_items[tempToppingObjectIndex]
                      .freebie_qty,
                  checked: true,
                });
              }
            }
            saveTopping(itemArray);
            setToppingEdits(itemArray);
            setToppings(itemArray);
            setToppingValues(itemArray);
          }
        }
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  // const getImage = async () => {
  // const data = await GET_IMAGE();
  // console.log("data", data[1]);
  // const reader = new FileReader();
  // reader.readAsDataURL(data);
  // reader.onloadend = function() {
  // }
  // reader.readAsBinaryString(data[0]);
  // setImageSrc(reader.result);
  //   var blob = data.getAsFile();
  //   var reader = new FileReader();
  //  reader.readAsDataURL(blob);
  //  reader.onloadend = function() {
  //      var base64data = reader.result;
  //      console.log(base64data);
  //      setImageSrc(base64data);
  //  }
  // }

  // useEffect(() => {
  //   getImage();
  // }, []);

  const checkRestaurantMenuEditInfo = async () => {
    try {
      const payload = paramsId;
      setLoader(true);
      const data = await GET_RESTAURANT_MENU_ITEM_BY_ID(payload);
      if (data.code === 200 || data.code === "200") {
        setRestaurantMenus(data.data);
        getAllergensList(data.data);
        getToppingList(data.data);
        getNutritionalList(data.data);
        setSelectImg(
          data.data.image_path == null ? null : data.data.image_path
        );
        setimgId(data.data.id_image);
        var tag = data.data.tags;
        if (tag != null) {
          setTags(tag.split("|"));
          var tempTags = tag.split("|");

          for (var j = 0; j < tempTags.length; j++) {
            if (tempTags[j] == "Veg-Friendly") {
              setCheckedUnchecked(true);
            }
          }
          for (var j = 0; j < tags.length; j++) {
            tags[j] = tags[j].replace(/^\s*/, "").replace(/\s*$/, "");
            if (tags[j] == "Veg-Friendly") {
              setCheckedUnchecked(true);
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
  };

  const checkMode = () => {
    if (paramsId) {
      checkRestaurantMenuEditInfo();
    } else {
      getAllergensList([]);
      getToppingList([]);
      getNutritionalList([]);
    }
  };

  useEffect(() => {
    checkMode();
    return () => {
      checkMode();
    };
  }, []);

  const onSelect = (selectedList, selectedItem) => {
    const tempAllergenObject = selectedList.filter((parent) => {
      return parent.id == selectedItem.id;
    });
    newAllergences.push(tempAllergenObject[0].id);
  };
  const onRemove = (selectedList, removedItem) => {
    let index;
    index = selectedList.indexOf(removedItem);
    newAllergences.splice(index, 1);
  };

  const handleSelectedValue = (value) => {
    setSelectedValues(value.target.value);
  };

  const changeNutritionalvalue = (e, recordId) => {
    //let tempArr = JSON.parse(JSON.stringify(nutritionals));
    // const tempArr = [...nutritionals]
    // tempArr.filter((i) => {
    //   if (i.id === recordId) {
    //     i.value = e.target.value;
    //     return true;
    //   }
    // });
    // setNutritionals(tempArr)
    const tempArr = [...nutritionals];
    for (var i = 0; i < nutritionals.length; i++) {
      if (nutritionals[i].id == recordId) {
        tempArr[i].value = e.target.value;
      }
    }
    setNutritionals(tempArr);
  };

  const checkAPICall1 = (e) => {
    if (e.id_product_category != 4) {
      for (var i = 0; i < nutritionals.length; i++) {
        if (nutritionals[i].value != "") {
          nutritionDatas.push({
            id: nutritionals[i].id,
            value: nutritionals[i].value,
          });
        }
      }
    }

    if (newAllergences.length == 0 && nutritionDatas.length == 0) {
      setRecordData(e);
      setshowWarningModal(true);
    } else if (newAllergences.length == 0) {
      setRecordData(e);
      setshowWarningModal(true);
    } else if (nutritionDatas.length == 0 && e.id_product_category != 4) {
      setRecordData(e);
      setshowWarningModal(true);
    } else {
      checkAPICall(e);
    }
  };
  const checkAPICall = async (e) => {
    var changetag = tags.length == 0 ? null : tags.join("|");
    if (paramsId == null) {
      try {
        setLoader(true);
        const payload = {
          id_vendor: restaurantId ? restaurantId : props.data.loginInfo.id,
          id_vendor_menu: 0,
          product_name: e.product_name,
          product_description: e.product_description,
          id_product_category: e.id_product_category,
          item_price: e.item_price,
          ingredients: e.ingredients,
          tags: changetag,
          allergens: newAllergences,
          package_units: e.package_units || null,
          package_weight: e.package_weight || null,
          topping_items: toppingIds,
          nutrition_values: nutritionDatas,
          id_image: imageDetails.id,
        };
        const data = await ADD_RESTAURANT_MENU_ITEM(payload);
        if (data.code === 200 || data.code === "200") {
          toast.success(data.message);
        if (imgId !== null) {
          deleteImage(imgId);
        }
          if (createOrExit == "Save & Exit") {
            if (restaurantId) {
              history.push(
                "/admin/manage-menu?restaurantId=" +
                  restaurantId +
                  "&restaurantName=" +
                  restaurantName
              );
            } else {
              history.push(`/restaurant/manage-menu`);
            }
          } else if (createOrExit == "Save & Create Another") {
            const recordData = {
              product_name: "",
              product_description: "",
              id_product_category: "",
              item_price: "",
              ingredients: "",
              package_units: "",
              package_weight: "",
            };
            setRestaurantMenus(recordData);
            const tempTagObject = tags.find(
              (element) => element == "Veg-Friendly"
            );
            if (tempTagObject == "Veg-Friendly") {
              setCheckedUnchecked(false);
            }
            setReloadAllergens(false);
            setTags([]);
            setNewAllergences([]);
            setSelectedAllergens([]);
            state1.options = [];

            setToppingIds([]);
            setToppings([]);
            setToppingValues([]);
            if (e.id_product_category != 4) {
              for (var i = 1; i <= nutritionals.length; i++) {
                nutritionals[i].value = "";
              }
            }
            setnutritionDatas([]);
            setReloadAllergens(true);
            setshowWarningModal(false);
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
        const payload = {
          id: paramsId,
          id_vendor: restaurantId ? restaurantId : props.data.loginInfo.id,
          id_vendor_menu: 0,
          product_name: e.product_name,
          product_description: e.product_description,
          id_product_category: e.id_product_category,
          item_price: e.item_price,
          ingredients: e.ingredients,
          tags: changetag,
          allergens: newAllergences,
          package_units: e.package_units || null,
          package_weight: e.package_weight || null,
          topping_items: toppingIds,
          nutrition_values: nutritionDatas,
          id_image: imageDetails.id,
        };
        setLoader(true);
        const data = await UPDATE_RESTAURANT_MENU_ITEM(payload);
        if (data.code === 200 || data.code === "200") {
          toast.success(data.message);
        if (imgId !== null) {
          deleteImage(imgId);
        }
          if (restaurantId) {
            history.push(
              "/admin/manage-menu?restaurantId=" +
                restaurantId +
                "&restaurantName=" +
                restaurantName
            );
          } else {
            history.push(`/restaurant/manage-menu`);
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

  const handleDrop = async (acceptedFiles) => {
    for (var i = 0; i < ALLOWED_IMAGE_TYPES.length; i++) {
      for (var j = 0; j < acceptedFiles.length; j++) {
        if (acceptedFiles[j].size <= PRODUCT_IMAGE_ALLOWED_SIZE_KB) {
          if (acceptedFiles[j].type == ALLOWED_IMAGE_TYPES[i]) {
            setFileName(acceptedFiles[j].name);
            const reader = new FileReader();
            reader.onload = (e) => {
              const image = e.target.result;
            };
            reader.readAsDataURL(acceptedFiles[0]);
            var name = GenerateRandomString(15);
          }
        }
      }
    }
    let formData = new FormData();
    formData.append("image", acceptedFiles[0]);
    formData.append("vendorId", restaurantId ? restaurantId : "");
    formData.append("ftype", 2);
    try {
      setSelectImg(null);
      setIsImageLoader(true);
      const data = await ADD_IMAGE(formData);
      if (data.code === 200 || data.code === "200") {
        setImageDetails(data.data);
        setSelectImg(data.data.image_path);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    } finally {
      setIsImageLoader(false);
    }

    // setFileName(acceptedFiles.map((file) => file.name));
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   const image = e.target.result;
    //   setSelectImg(image);
    // };
    // reader.readAsDataURL(acceptedFiles[0]);
  };

  const deleteImage = async (recordId) => {
    const payload = { id: recordId };
    try {
      const data = await DELETE_IMAGE(payload);
      if (data.code === 200 || data.code === "200") {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };

  const onCancel = () => {
    if (restaurantId) {
      history.push(
        "/admin/manage-menu?restaurantId=" +
          restaurantId +
          "&restaurantName=" +
          restaurantName
      );
    } else {
      history.push(`/restaurant/manage-menu`);
    }
  };

  return (
    <React.Fragment>
      <div className="container-fluid bg-light-blue padding-top-63 px-0">
        {isloader ? <Loader /> : null}
        <div className="row mx-auto mt-5">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card-table">
              <div className="table-header-sec bg-dark-blue d-flex justify-content-between align-items-center">
                <div>
                  {paramsId == null ? (
                    <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                      Add a new item{" "}
                      {restaurantId && <span className="mx-1">|</span>}{" "}
                      {restaurantId && (
                        <span className="text-color-tertiary font-weight-semibold text-3">
                          {restaurantName}
                        </span>
                      )}
                    </h3>
                  ) : (
                    <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-5">
                      Edit {restaurantMenus.product_name}{" "}
                      {restaurantId && <span className="mx-1">|</span>}{" "}
                      {restaurantId && (
                        <span className="text-color-tertiary font-weight-semibold text-3">
                          {restaurantName}
                        </span>
                      )}
                    </h3>
                  )}
                </div>
              </div>
              <Formik
                enableReinitialize
                initialValues={{
                  product_name: restaurantMenus.product_name || "",
                  product_description:
                    restaurantMenus.product_description || "",
                  id_product_category:
                    restaurantMenus.id_product_category || "",
                  item_price: restaurantMenus.item_price || "",
                  ingredients: restaurantMenus.ingredients || "",
                  package_units: restaurantMenus.package_units || null || "",
                  package_weight: restaurantMenus.package_weight || null || "",
                }}
                validationSchema={Yup.object().shape({
                  product_name: Yup.string().required("Item name is required"),
                  product_description: Yup.string().required(
                    "Description is required"
                  ),
                  id_product_category:
                    Yup.string().required("Type is required"),
                  item_price: Yup.number()
                    .min(0.001, "price must be greater than zero")
                    .required("Price is required"),
                })}
                onSubmit={async (fields) => {
                  checkAPICall1(fields);
                }}
              >
                {({ errors, touched, values }) => (
                  <Form>
                    <div className="row mx-auto mt-3">
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="form-row mt-4">
                          <div className="form-group col-lg-12 col-md-12">
                            <div className="material-textfield">
                              <Field
                                placeholder=" "
                                name="product_name"
                                autoComplete="off"
                                className={`form-control eb-contact-input material-input h-3em ${
                                  errors.product_name &&
                                  touched.product_name &&
                                  "is-invalid input-box-error"
                                }`}
                                value={values.product_name || ""}
                                autoFocus
                              />
                              <label className="material-label required text-uppercase">
                                Item Name
                              </label>
                            </div>
                            <ErrorMessage
                              name="product_name"
                              component="div"
                              className="field-error text-danger"
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-lg-12 col-md-12">
                            <div className="material-textfield">
                              <Field
                                placeholder=" "
                                as="textarea"
                                name="product_description"
                                autoComplete="off"
                                className={`form-control eb-contact-input material-input  ${
                                  errors.product_description &&
                                  touched.product_description &&
                                  "is-invalid input-box-error"
                                }`}
                                value={values.product_description || ""}
                              />
                              <label className="textarea-label required text-uppercase">
                                Description
                              </label>
                            </div>
                            <ErrorMessage
                              name="product_description"
                              component="div"
                              className="field-error text-danger"
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-lg-12 col-md-12">
                            <div className="material-textfield">
                              <Field
                                placeholder=" "
                                as="select"
                                name="id_product_category"
                                autoComplete="off"
                                className={`form-control eb-contact-input material-input ${
                                  errors.id_product_category &&
                                  touched.id_product_category &&
                                  "is-invalid input-box-error"
                                }`}
                                value={values.id_product_category || ""}
                                onChange={(e) => {
                                  handleSelectedValue(e);
                                  const list = { ...values };
                                  list["id_product_category"] = e.target.value;
                                  setRestaurantMenus(list);
                                }}
                              >
                                <option value="">Select</option>
                                {productCategorys.map(
                                  ({ id, category_name }, index) => (
                                    <option key={index} value={id}>
                                      {category_name}
                                    </option>
                                  )
                                )}
                              </Field>
                              <label className="material-label required text-uppercase">
                                Type
                              </label>
                            </div>
                            <ErrorMessage
                              name="id_product_category"
                              component="div"
                              className="field-error text-danger"
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-lg-12 col-md-12">
                            <div className="material-textfield">
                              <Field
                                placeholder=" "
                                name="item_price"
                                autoComplete="off"
                                className={`form-control eb-contact-input material-input h-3em ${
                                  errors.item_price &&
                                  touched.item_price &&
                                  "is-invalid input-box-error"
                                }`}
                                value={values.item_price || ""}
                                onKeyDown={(e) => handleKeyDown(e)}
                              />
                              <label className="material-label required text-uppercase">
                                Price
                              </label>
                            </div>
                            <ErrorMessage
                              name="item_price"
                              component="div"
                              className="field-error text-danger"
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-lg-12 col-md-12">
                            <div className="material-textfield">
                              <Field
                                placeholder=" "
                                as="textarea"
                                name="ingredients"
                                autoComplete="off"
                                className={`form-control eb-contact-input material-input `}
                                value={values.ingredients || ""}
                              />
                              <label className="textarea-label text-uppercase">
                                Ingredients
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-lg-12 col-md-12">
                            <input
                              type="checkbox"
                              className="mr-2"
                              value="Veg-Friendly"
                              checked={checkedUnchecked}
                              onChange={(e) => handleCheck(e)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={"check"}
                            >
                              Veg-Friendly
                            </label>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-lg-12 col-md-12">
                            <ReactTagInput
                              tags={tags}
                              placeholder="ENTER TAGS"
                              onChange={(e) => handleTagEvent(e)}
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-lg-12 col-md-12">
                            {reloadAllergens && (
                              <Multiselect
                                selectedValues={state1.options}
                                options={state.options}
                                showCheckbox={true}
                                placeholder="SELECT ALLERGEN(S)"
                                displayValue="allergen"
                                onSelect={onSelect}
                                onRemove={onRemove}
                                closeOnSelect={false}
                              />
                            )}
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-lg-12 col-md-12">
                            <div className="material-textfield">
                              <Field
                                placeholder=" "
                                name="package_units"
                                autoComplete="off"
                                className={`form-control eb-contact-input material-input h-3em `}
                                value={values.package_units || null || ""}
                                onKeyDown={(e) => handleNumberKey(e)}
                              />
                              <label className="material-label text-uppercase">
                                Package Unit(s)
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-lg-12 col-md-12">
                            <div className="material-textfield">
                              <Field
                                placeholder=" "
                                name="package_weight"
                                autoComplete="off"
                                className={`form-control eb-contact-input material-input h-3em `}
                                value={values.package_weight || null || ""}
                                onKeyDown={(e) => handleNumberKey(e)}
                              />
                              <label className="material-label text-uppercase">
                                Weight gm/ml
                              </label>
                            </div>
                          </div>
                        </div>
                        {selectedValues == 4 ? null : (
                          <div className="form-row">
                            <div className="form-group col-lg-12 col-md-12 mt-2">
                              <Button
                                className="bg-dark-blue w-100"
                                onClick={(e) => setShowPopupToppingModal(true)}
                              >
                                Add Extra Topping Items
                              </Button>
                            </div>
                          </div>
                        )}
                        {selectedValues == 4 ? null : (
                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
                              {toppings == "" ? null : (
                                <div className="card-table">
                                  <Table
                                    className="custom-table-sec"
                                    hover
                                    responsive
                                  >
                                    <thead>
                                      <tr>
                                        <th>Topping Item</th>
                                        <th>Quantity</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {toppings.map((item, index) => (
                                        <tr key={index}>
                                          <td>{item.product_name}</td>
                                          <td>{item.freebie_qty}</td>
                                          <td>
                                            <img
                                              className="cursor-pointer"
                                              src={DeleteIcon}
                                              width="24"
                                              alt="delete"
                                              title="Remove item"
                                              onClick={() =>
                                                handleDeleteItem(item)
                                              }
                                            />
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 mt-4">
                        <div className="border-light-gray p-3 border-radius-7">
                          <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                              <div>
                                <Dropzone onDrop={handleDrop}>
                                  {({
                                    getRootProps,
                                    getInputProps,
                                    isDragAccept,
                                  }) => {
                                    const additionalClass = isDragAccept
                                      ? "isDragAccept"
                                      : null;

                                    return (
                                      <div
                                        {...getRootProps({
                                          className: `dropzone drag-drop-sec cursor-pointer ${additionalClass}`,
                                        })}
                                      >
                                        <input {...getInputProps()} />

                                        <p className="mb-0">
                                          Click to browse or <br /> drag and
                                          drop file here.
                                        </p>
                                      </div>
                                    );
                                  }}
                                </Dropzone>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 margin-top-sm-12">
                              <div>
                                {isImageLoader && (
                                  <div className="d-flex justify-content-center align-items-center w-100 h-100">
                                    <i className="fa fa-spinner fa-pulse fa-4x fa-fw color-admin-theme" />
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                )}
                                {isImageLoader === false && selectImg ? (
                                  <HmImage
                                    src={selectImg}
                                    width="100%"
                                    height="135px"
                                    className={"drag-drop-img"}
                                  />
                                ) : (
                                  isImageLoader === false && (
                                    <img
                                      src={NoImgAvailable}
                                      width="100%"
                                      className={"drag-drop-img"}
                                    />
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        {selectedValues == 4 ? null : (
                          <div className="row mt-4">
                            <div className="col-lg-12 col-md-12">
                              <div className="card-table mt-3">
                                <div className="table-header-single-sec bg-dark-blue d-flex justify-content-between align-items-center py-2">
                                  <div>
                                    <h3 className="text-white mb-0 text-capitalize font-weight-semibold text-4">
                                      Nutrition Values
                                    </h3>
                                  </div>
                                </div>
                                <div className="linear-activity-wrapper">
                                  {isloader && (
                                    <div className="linear-activity">
                                      <div className="indeterminate"></div>
                                    </div>
                                  )}
                                </div>
                                <div className="form-row mt-2">
                                  {nutritionals.map((item, index) => (
                                    <div
                                      className="form-group col-lg-12 col-md-12"
                                      key={index}
                                    >
                                      <div className="material-textfield">
                                        <input
                                          type="hidden"
                                          id={"hiddenid" + item.id}
                                          value={item.id || ""}
                                        />
                                        <Field
                                          type="text"
                                          placeholder=" "
                                          name={item.nutritional_name}
                                          id={"id" + item.id}
                                          autoComplete="off"
                                          className={`form-control eb-contact-input material-input h-3em`}
                                          value={
                                            values.nutrition_values ||
                                            item.value ||
                                            ""
                                          }
                                          onKeyDown={(e) => handleKeyDown(e)}
                                          onChange={(e) =>
                                            changeNutritionalvalue(e, item.id)
                                          }
                                        />
                                        <label className="material-label text-uppercase">
                                          {item.nutritional_name}
                                        </label>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="d-flex justify-content-center w-100 mt-4 flex-column-sm">
                        {!paramsId && (
                          <input
                            type="submit"
                            value="Save & Create Another"
                            name="Save & Create Another"
                            className="btn btn-dark btn-modern mr-md-4 mr-sm-0 bg-dark-blue"
                            onClick={(e) =>
                              setCreateOrExit("Save & Create Another")
                            }
                          />
                        )}
                        <input
                          type="submit"
                          value={paramsId ? "Save" : "Save & Exit"}
                          name="Save & Exit"
                          className="btn btn-dark btn-modern mr-md-4 mr-sm-0 bg-dark-blue margin-top-sm-12"
                          onClick={(e) => setCreateOrExit("Save & Exit")}
                        />
                        <input
                          type="button"
                          value="Cancel"
                          className="btn btn-dark btn-modern bg-dark-blue margin-top-sm-12"
                          onClick={onCancel}
                        />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      {showToppingModal && (
        <ToppingModal
          closeModal={() => setShowPopupToppingModal(false)}
          topping={toppings}
          submitTopping={() => saveTopping(toppingValues)}
          editToppingList={(e) => editToppingList(e)}
          toppingArray={toppingValues}
          getToppingList={toppingEdits}
          refresh={refresh}
        />
      )}
      {showWarningModal && (
        <WarningMenuModal
          closeModal={() => setshowWarningModal(false)}
          newAllergence={newAllergences}
          nutrition_data={nutritionDatas}
          recordData={recordData}
          checkAPICall={() => checkAPICall(recordData)}
        />
      )}
    </React.Fragment>
  );
};
export default AddEditMenu;
