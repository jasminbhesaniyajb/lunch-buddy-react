import React, { useState, useEffect,useRef } from "react";

import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import {
  ADD_SCHOOL_GRADE_DIVISION,
} from "../services/ENDPOINT";

const AddGradeDivisionModal = (props) => {
  const [value,setValue] = useState(props.selectedValue)
  const [idSchoolTeacher, setIdSchoolTeacher] = useState({
    id_teacher: value,
    division_name: "",
  });
  
  const checkAPICall = async (e) => {
    if(e.id_teacher !== "0"){
      try {
        const payload = {
          id_school: props.data.loginInfo.id,
          id_school_grade: props.gradeDivisionIdModal,
          id_teacher: e.id_teacher,
          division_name: e.division_name,
        };
        const data = await ADD_SCHOOL_GRADE_DIVISION(payload);
        if (data.code === 200 || data.code === "200") {
            toast.success(data.message);
            props.closeModal(false)
            props.addNewGradeDivision(data.data);
        } else {
          toast.error(data.message);
        }
      } catch ({ data }) {
        toast.error(data.message);
      }
    }
  };  

  const inputReference = useRef(null);
  const getFocus = () =>{
    inputReference.current && inputReference.current?.focus()
  }

  useEffect(() => {
    setTimeout(() => {
      getFocus();
    }, 1);
  }, [])

  return (
    <React.Fragment>
      <Modal show={true} onHide={() => props.closeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Division</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2">
          <Formik
            enableReinitialize
            initialValues={{
              id_teacher: idSchoolTeacher.id_teacher || "",
              division_name: idSchoolTeacher.division_name || "",
            }}
            validationSchema={Yup.object().shape({
              id_teacher: Yup.string().required("Teacher is required"),
              division_name: Yup.string().max(75, "Division Name must be 75 characters!"),
            })}
            onSubmit={async (fields) => {
              checkAPICall(fields);
            }}
          >
            {({ errors, touched, values }) => (
              <Form>
                <div className="form-row">
                  <div className="form-group col-lg-9 col-md-7 col-sm-12">
                    <div className="material-textfield">
                      <Field
                        placeholder=" "
                        as="select"
                        name="id_teacher"
                        autoComplete="off"
                        id="id_school_teacher"
                        className={`form-control eb-contact-input material-input h-3em ${
                          errors.id_teacher &&
                          touched.id_teacher &&
                          "is-invalid input-box-error"
                        }`}
                        value={idSchoolTeacher.id_teacher}
                        onChange={(e) => {
                          const list = { ...values };
                          list['id_teacher'] = e.target.value;
                          setIdSchoolTeacher(list);
                          props.handleEvent(e)
                        }}
                        innerRef={inputReference} 
                      >
                        <option value="">Select</option>
                        {props.teachersList.map(({ id, teacher_name }, index) => (
                          <option value={id} key={index}>
                            {teacher_name}
                          </option>
                        ))}
                      </Field>
                      <label className="material-label required text-uppercase text-1">
                        Select Teacher
                      </label>
                    </div>
                    <ErrorMessage
                      name="id_teacher"
                      component="div"
                      className="field-error text-danger"
                    />
                  </div>
                  <div className="form-group col-lg-3 col-md-5 col-sm-12 mb-sm-0">
                    <div className="material-textfield">
                      <Field
                        placeholder=" "
                        name="division_name"
                        autoComplete="off"
                        className={`form-control w-100 eb-contact-input material-input h-3em`}
                        value={values.grade}
                      />
                      <label className="material-label text-uppercase text-1">
                        Divison
                      </label>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-4">
                  <Button
                    type="submit"
                    className="mr-2 px-4 btn btn-dark"
                    variant="primary"
                  >
                    Save
                  </Button>
                  <Button
                    className="px-4"
                    onClick={() => props.closeModal(false)}
                    variant="danger"
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default AddGradeDivisionModal;
