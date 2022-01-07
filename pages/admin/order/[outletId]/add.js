import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export async function getServerSideProps({ params }) {
  const { outletId } = params;
  const queryCustomer = await fetch(`http://localhost:3000/api/customer`);
  const customers = await queryCustomer.json();
  const queryPayment = await fetch(`http://localhost:3000/api/payment`);
  const payments = await queryPayment.json();
  const queryProduct = await fetch(`http://localhost:3000/api/order/getSelect/${outletId}`);
  const products = await queryProduct.json();
  return {
    props: {
      customers,
      payments,
      products
    },
  };
}

function AddOrder({ customers, payments, products }) {
  const router = useRouter();
  const outletID = Cookies.get('outletID');
  const employeeID = Cookies.get('employeeID');
  const [customer, setCustomer] = useState(customers[0].customerID);
  const [order, setOrder] = useState([
    {
      productID: products[0].productID,
      quantity: 0
    }
  ]);
  const [payment, setPayment] = useState(payments[0].paymentID);

  const submitHandler = async (e) => {
    e.preventDefault();
    const totalPrice = order.reduce((prevVal, curEl) => {
      const product = products.filter((el) => el.productID == curEl.productID);

      return prevVal + (parseFloat(product[0].productPrice) * parseInt(curEl.quantity));
    }, 0)
    const list = {
        outletID,
        employeeID,
        customerID: customer,
        paymentID: payment,
        totalPrice,
        order
    }

    const res = await fetch(`http://localhost:3000/api/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(list)
    })
    const data = await res.json();
    router.push('/admin/order');
  }

  const handleAddFields = () => {
    const values = [...order];
    values.push({
      productID: products[0].productID,
      quantity: 0
    });
    setOrder(values);
  };

  const handleRemoveFields = index => {
    let values = [...order];
    if(values.length === 1) values = [{
      productID: products[0].productID,
      quantity: 0
    }];
    else values.splice(index, 1);
    setOrder(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...order];
    if (event.target.name === "product") {
      values[index].productID = event.target.value;
    } else {
      values[index].quantity = event.target.value;
    }

    setOrder(values);
  };

  const getQuantity = (index) => {
    const element = products.find((el) => {
      return el.productID == order[index].productID
    })

    return element.quantity;
  }

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Add Order Data</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submitHandler}>
                  <h6 className="heading-small text-muted mb-4">
                    Customer information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-customer"
                          >
                            Customer Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-customer"
                            type="select"
                            name="customer"
                            value={customer}
                            onChange={e => {setCustomer(e.target.value)}}
                            required
                          >
                            { customers.map((customer) => {
                              return (
                                <option key={customer.customerID} value={customer.customerID}>
                                  {customer.customerName}
                                </option>
                              )
                            }) }
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <Row className="align-items-center mb-4">
                    <div className="col">
                      <h6 className="heading-small text-muted">Order information</h6>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        onClick={(e) => { handleAddFields() }}
                        size="sm"
                      >
                        Add Product
                      </Button>
                    </div>
                  </Row>
                  <div className="pl-lg-4">
                    { order.map((odr, index) => {
                      return (
                      <Row key={index}>
                        <Col lg="9">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-order"
                            >
                              Product Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-product"
                              type="select"
                              name="product"
                              value={odr.productID}
                              onChange={e => { handleInputChange(index, e) }}
                              required
                            >
                              { products.map((product) => {
                                return (
                                  <option key={product.productID} value={product.productID}>
                                    {product.productName}
                                  </option>
                                )
                              }) }
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg="2">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-quantity"
                            >
                              Quantity
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-quantity"
                              type="number"
                              name="quantity"
                              value={odr.quantity}
                              max={ getQuantity(index) }
                              min={0}
                              onChange={e => { handleInputChange(index, e) }}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="1">
                          <FormGroup>
                            <label
                              className="form-control-label"
                            >
                              Delete
                            </label>
                            <div>
                              <Button className="bg-danger text-white" type="button" onClick={(e) => { handleRemoveFields(index) }}>X</Button>
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      )
                    }) }
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Payment information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-payment"
                          >
                            Payment Type
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-payment"
                            type="select"
                            name="payment"
                            value={payment}
                            onChange={e => {setPayment(e.target.value)}}
                            required
                          >
                            { payments.map((payment) => {
                              return (
                                <option key={payment.paymentID} value={payment.paymentID}>
                                  {payment.paymentName}
                                </option>
                              )
                            }) }
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Button */}
                  <Row>
                      <Col className="text-right">
                        <Button className="bg-blue text-white">Add Order</Button>
                      </Col>
                    </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

AddOrder.layout = Admin;

export default AddOrder;
