import React, { useState } from "react";
import Cookies from "js-cookie";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
import router from "next/router";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(false);
  const loginHandler = async (e) => {
    e.preventDefault();

    const list = {
      username,
      password
    }
    
    const res = await fetch(`http://localhost:3000/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(list)
    })
    const data = await res.json();
    if(data.message){
      setAlert(true);
    } else {
      Cookies.set('outletID', data.outletID)
      Cookies.set('username', data.username)
      Cookies.set('role', data.role)
      if(data.employeeID) Cookies.set('employeeID', data.employeeID)
      if(data.employeeGender) Cookies.set('employeeGender', data.employeeGender)

      const role = data.role;
      if(role === 'Kasir') router.push('/admin/order');
      else if(role === 'Inventaris') router.push('/admin/inventory');
      else if(role === 'Admin') router.push('/admin/franchise');
      else if(role === 'Pemilik Franchise') router.push('/admin/dashboard');
      else if(role === 'Pemilik Bisnis') router.push('/admin/dashboard');
    }
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h1>Sign In</h1>
            </div>
            <Form role="form" onSubmit={loginHandler}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    type="text"
                    autoComplete="new-username"
                    name="usename"
                    value={username}
                    onChange={e => {setUsername(e.target.value); setAlert(false)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    value={password}
                    onChange={e => {setPassword(e.target.value); setAlert(false)}}
                  />
                </InputGroup>
              </FormGroup>
              { alert && <Alert
                color="danger"
              >
                Wrong Username or Password.
              </Alert> }
              <div className="text-center">
                <Button className="my-4" color="primary">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        {/* <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row> */}
      </Col>
    </>
  );
}

Login.layout = Auth;

export default Login;
