import React from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Header from "components/Headers/Header.js";
import { useRouter } from "next/router";

export async function getServerSideProps() {
    const query = await fetch('http://localhost:3000/api/outlet');
    const outlets = await query.json();
    return {
      props: {
        outlets
      },
    };
}

function Outlet({ outlets }) {
  const router = useRouter();

  const deleteHandler = async (outletID) => {
    const res = await fetch(`http://localhost:3000/api/outlet/${outletID}`, {
        method: 'DELETE'
    })
    const data = await res.json();
    router.push('/admin/outlet');
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Outlet table</h3>
                  </div>
                  {/* <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={(e) => { router.push('/admin/outlet/add') }}
                      size="sm"
                    >
                      Add Outlet
                    </Button>
                  </div> */}
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Outlet Name</th>
                    <th scope="col">Outlet Address</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {outlets.map((outlet) => {
                    return (
                      <tr key={outlet.outletID}>
                        <th scope="row">{outlet.outletName}</th>
                        <td style={{ whiteSpace: 'normal'}}>{outlet.outletAddress}</td>
                        <td className="">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                onClick={(e) => { router.push(`/admin/outlet/${outlet.outletID}`) }}
                              >
                                Update
                              </DropdownItem>
                              {/* <DropdownItem
                                onClick={(e) => { deleteHandler(outlet.outletID) }}
                              >
                                Delete
                              </DropdownItem> */}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

Outlet.layout = Admin;

export default Outlet;
