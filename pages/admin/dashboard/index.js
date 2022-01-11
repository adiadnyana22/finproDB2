import React, { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import DashboardHeader from "components/Headers/DashboardHeader.js";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/dashboard`)
  const dashboard = await res.json()
  const outletSummary = dashboard.outletSummary.salesAndOrder.map((element, index) => {
    const productSold = dashboard.outletSummary.productSold[index].ProductSold;
    const employeeCount = dashboard.outletSummary.employeeCount[index].EmployeeCount;

    return {
      ...element,
      productSold,
      employeeCount
    }
  })

  return {
    props: {
      dashboard,
      outletSummary
    },
  };
}

const Dashboard = ({ dashboard, outletSummary }) => {
  const router = useRouter();
  const outletID = Cookies.get('outletID');
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if(outletID === 'null') router.push(`/admin/dashboard`);
    else router.push(`/admin/dashboard/${outletID}`);
  }, [])

  useEffect(() => {
    const chartD = dashboard.orderDetail.reduce((prevVal, curEl) => {
      const date = new Date(curEl.orderDate);
      const month = date.getMonth();
      if(month < 3) prevVal.order[0]++;
      else if(month < 6) prevVal.order[1]++;
      else if(month < 9) prevVal.order[2]++;
      else prevVal.order[3]++;
      prevVal.sales[month] += curEl.totalPrice / 1000;

      return prevVal;
    }, { sales: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], order: [0, 0, 0, 0] })
    setChartData(chartD);
  }, [])

  const chartHandler = () => {
    const dataChart = chartExample1[chartExample1Data]();
    dataChart.datasets[0].data = chartData.sales;

    return dataChart;
  }

  const chartHandler2 = () => {
    const dataChart = chartExample2.data;
    dataChart.datasets[0].data = chartData.order;

    return dataChart;
  }

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      <DashboardHeader dashboard={dashboard} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartHandler}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={chartHandler2()}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Outlet Summary</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Outlet Name</th>
                    <th scope="col">Number of Employee</th>
                    <th scope="col">Number of Order</th>
                    <th scope="col">Product Sold</th>
                    <th scope="col">Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {outletSummary.map((outlet, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{outlet.outletName}</th>
                        <td>{outlet.employeeCount}</td>
                        <td>{outlet.Order}</td>
                        <td>{outlet.productSold}</td>
                        <td>{`Rp. ${outlet.Sales / 1000}k`}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Dashboard.layout = Admin;

export default Dashboard;
