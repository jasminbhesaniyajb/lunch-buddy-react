import React, { useState, useEffect } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Moment from "react-moment";
import { GET_ORDER_BY_ID } from "../services/ENDPOINT";

const OrderDetailsReseipt = (props) => {
  const paramsId = props.orderId;
  const paramsName = props.orderBy;
  const [orderDetails, setOrderDetails] = useState({});
  const [orderDetailsTable, setOrderDetailsTable] = useState([]);
  const [orderDetailsSE, setOrderDetailsSE] = useState({});
  const [orderDetailsStudent, setOrderDetailsStudent] = useState({});
  const [orderDetailsVendor, setOrderDetailsVendor] = useState({});

  const getOrderById = async () => {
    try {
      const payload = paramsId;
      const data = await GET_ORDER_BY_ID(payload);
      if (data.code === 200 || data.code === "200") {
        setOrderDetails(data.data);
        setOrderDetailsSE(data.data.SE);
        if (paramsName == "teacher") {
          setOrderDetailsStudent(data.data.teacher);
        } else {
          setOrderDetailsStudent(data.data.student);
        }
        setOrderDetailsTable(data.data.order_line_items);
        setOrderDetailsVendor(data.data.vendor);
      } else {
        toast.error(data.message);
      }
    } catch ({ data }) {
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getOrderById();
  }, []);

  const printPopUp = (divName) => {
    window.print();
  };

  return (
    <React.Fragment>
      <Modal
        show={true}
        size="lg"
        onHide={() => props.closeModal(false)}
        centered
        className="border-none-print"
      >
        <Modal.Header closeButton className="no-printme">
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2">
          <div id="print-area">
            <div className="order-receipt-card">
              <div className="bg-dark-blue vendorListHeading">
                <h2 className="mb-1 text-4 font-weight-semibold text-white px-3 py-1">
                  Order Details
                </h2>
              </div>
              <div className="row mx-auto mt-3">
                <div className="col-lg-7 col-md-7 col-sm-12">
                  <div className="row mx-auto">
                    <div className="col-lg-5 col-md-5 col-sm-12">
                      <h2 className="font-weight-semibold mb-1 text-4">
                        {paramsName == "teacher"
                          ? "Teacher Name:"
                          : "Student Name:"}
                      </h2>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-12">
                      {paramsName == "teacher" ? (
                        <h2 className="mb-1 text-4">
                          <span className="mr-1">
                            {orderDetailsStudent.teacher_name}
                          </span>
                        </h2>
                      ) : (
                        <h2 className="mb-1 text-4">
                          <span className="mr-1">
                            {orderDetailsStudent.first_name}
                          </span>
                          <span>{orderDetailsStudent.last_name}</span>
                        </h2>
                      )}
                    </div>
                  </div>
                  <div className="row mx-auto">
                    <div className="col-lg-5 col-md-5 col-sm-12">
                      <h2 className="font-weight-semibold mb-1 text-4">
                        Grade:
                      </h2>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-12">
                      <h2 className="mb-1 text-4">
                        {orderDetailsStudent.grade_division_name}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-12">
                  <div className="row mx-auto">
                    <div className="col-lg-5 col-md-5 col-sm-12">
                      <h2 className="font-weight-semibold mb-1 text-4">
                        Order Date:
                      </h2>
                    </div>
                    <div className="col-lg-7 col-md-7 col-sm-12">
                      <h2 className="mb-1 text-4">
                        <Moment>{orderDetails.order_date}</Moment>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-receipt-card mt-3 mx-3">
                <div>
                  <h2 className="mb-1 text-4 bg-light-gray vendorListHeading font-weight-semibold border-bottom-black px-2 py-1">
                    Event Details
                  </h2>
                </div>
                <div className="row mx-auto mt-3">
                  <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5 col-md-5 col-sm-12">
                        <h2 className="font-weight-semibold mb-1 text-4">
                          Event Name:
                        </h2>
                      </div>
                      <div className="col-lg-7 col-md-7 col-sm-12">
                        <h2 className="mb-1 text-4">
                          {orderDetailsSE.event_name}
                        </h2>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-5 col-md-5 col-sm-12">
                        <h2 className="font-weight-semibold mb-1 text-4">
                          Event Date:
                        </h2>
                      </div>
                      <div className="col-lg-7 col-md-7 col-sm-12">
                        <h2 className="mb-1 text-4">
                          <Moment>{orderDetailsSE.scheduled_date}</Moment>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h2 className="font-weight-semibold mb-1 text-4">
                          Restaurant Name:
                        </h2>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h2 className="mb-1 text-4">
                          {orderDetailsVendor.restaurant_name}
                        </h2>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h2 className="font-weight-semibold mb-1 text-4">
                          Restaurant Address:
                        </h2>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h2 className="mb-1 text-4">
                          {orderDetailsVendor.address}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-receipt-card mt-3 mx-3">
                <div>
                  <h2 className="mb-1 text-4 bg-light-gray vendorListHeading font-weight-semibold border-bottom-black px-2 py-1">
                    Payment Details
                  </h2>
                </div>
                <div className="row mx-auto mt-3">
                  <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                    <div className="row">
                      <div className="col-lg-5 col-md-5 col-sm-12">
                        <h2 className="font-weight-semibold mb-1 text-4">
                          Transaction ID:
                        </h2>
                      </div>
                      <div className="col-lg-7 col-md-7 col-sm-12">
                        <h2 className="mb-1 text-4"></h2>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-5 col-md-5 col-sm-12">
                        <h2 className="font-weight-semibold mb-1 text-4">
                          Invoice Number:
                        </h2>
                      </div>
                      <div className="col-lg-7 col-md-7 col-sm-12">
                        <h2 className="mb-1 text-4"></h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h2 className="font-weight-semibold mb-1 text-4">
                          Payment Date:
                        </h2>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h2 className="mb-1 text-4">
                          <Moment>{orderDetails.order_date}</Moment>
                        </h2>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h2 className="font-weight-semibold mb-1 text-4">
                          Payment Mode:
                        </h2>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h2 className="mb-1 text-4"></h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mx-auto my-3">
                  <div className="d-flex justify-content-center w-100">
                    <h2 className="border-black font-weight-semibold mb-0 text-4 p-2">
                      Amount Paid: $ {orderDetails.order_total_cost}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="order-receipt-card my-3 mx-3">
                <div>
                  <h2 className="mb-1 text-4 bg-light-gray vendorListHeading font-weight-semibold border-bottom-black px-2 py-1">
                    Order Details
                  </h2>
                </div>
                <div className="row mx-auto">
                  <div className="col-lg-12 col-md-12 col-sm-12 mx-auto">
                    <div className="my-2">
                      <Table
                        bordered
                        className="order-details-table"
                        responsive
                      >
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th className="text-right">Price</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderDetailsTable.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td className="print-border-none p-0">
                                        {item.item_name}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                {item.order_line_topping_items.map(
                                  (item1, index1) => (
                                    <table key={index1}>
                                      <tbody>
                                        <tr>
                                          <td className="print-border-none p-0 pl-3 pt-1">
                                            {item1.VP.product_name}
                                            <span className="text-2 ml-2">
                                              (Included Quantity: {item1.freebie_qty}
                                              )
                                            </span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  )
                                )}
                              </td>
                              <td className="text-align-right">
                                <table>
                                  <tbody>
                                    <tr>
                                      <td className="print-border-none p-0">
                                        $ {item.product_cost}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                {item.order_line_topping_items.map(
                                  (item1, index1) => (
                                    <table key={index1}>
                                      <tbody>
                                        <tr>
                                          <td className="print-border-none p-0 pt-1">
                                            $ {item1.product_cost}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  )
                                )}
                              </td>
                              <td className="text-align-center">
                                <table>
                                  <tbody>
                                    <tr>
                                      <td className="print-border-none p-0">
                                        {item.quantity}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                {item.order_line_topping_items.map(
                                  (item1, index1) => (
                                    <table key={index1}>
                                      <tbody>
                                        <tr>
                                          <td className="print-border-none p-0 pt-1">
                                            {item1.ordered_qty}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  )
                                )}
                              </td>
                              <td className="text-align-right">
                                <table>
                                  <tbody>
                                    <tr>
                                      <td className="print-border-none p-0">
                                        $ {item.item_total}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                {item.order_line_topping_items.map(
                                  (item1, index1) => (
                                    <table key={index1}>
                                      <tbody>
                                        <tr>
                                          <td className="print-border-none p-0 pt-1">
                                            $ {item1.topping_item_total}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  )
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3 no-printme">
            <Button
              className="px-4 mr-2"
              onClick={() => printPopUp("print-area")}
              variant="primary"
            >
              Print
            </Button>
            <Button
              className="px-4"
              onClick={() => props.closeModal(false)}
              variant="danger"
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default OrderDetailsReseipt;
