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
  const outletID = params.outletId;
  const query = await fetch(`http://localhost:3000/api/inventory/getSelect/${outletID}`);
  const products = await query.json();
  return {
    props: {
      products
    },
  };
}

function AddInventory({ products }) {
  const router = useRouter();
  // Add effect no products
  useEffect(() => {
    if(products[0] === undefined) router.push('/admin/inventory');
  }, [])
  const outletID = Cookies.get('outletID');
  const [name, setName] = useState(products[0] ? products[0].productID : 'No Product');
  const [quantity, setQuantity] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const list = {
        productID: name,
        outletID: outletID,
        quantity: quantity
    }
    const res = await fetch(`http://localhost:3000/api/inventory`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(list)
    })
    const data = await res.json();
    router.push('/admin/inventory');
  }

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          {/* <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    Jessica Jones
                    <span className="font-weight-light">, 27</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <p>
                    Ryan ??? the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy ??? writes, performs and records all of his own
                    music.
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col> */}
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Add Inventory Data</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submitHandler}>
                  <h6 className="heading-small text-muted mb-4">
                    Inventory information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Product Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-name"
                            type="select"
                            name="name"
                            value={name}
                            onChange={e => {setName(e.target.value)}}
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
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-quantity"
                          >
                            Product Quantity
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-quantity"
                            placeholder="Product Quantity"
                            type="number"
                            min={0}
                            name="quantity"
                            value={quantity}
                            onChange={e => {setQuantity(e.target.value)}}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Button */}
                  <Row>
                      <Col className="text-right">
                        <Button className="bg-blue text-white">Add Inventory</Button>
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

AddInventory.layout = Admin;

export default AddInventory;
