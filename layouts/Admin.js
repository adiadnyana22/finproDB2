import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routesAdmin from "../routesAdmin";
import routesFranchise from "../routesFranchise";
import routesBisnis from "../routesBisnis";
import routesKasir from "../routesKasir";
import routesInventaris from "../routesInventaris";
import routesAll from "../routes";
import Cookies from "js-cookie";

function Admin(props) {
  // used for checking current route
  const router = useRouter();
  const role = Cookies.get('role');
  const [routes, setRoutes] = useState(routesAll)
  useEffect(() => {
    if(!role) router.push('/auth/login');
    if(role === 'Kasir') setRoutes(routesKasir);
    else if(role === 'Inventaris') setRoutes(routesInventaris);
    else if(role === 'Admin') setRoutes(routesAdmin);
    else if(role === 'Pemilik Franchise') setRoutes(routesFranchise);
    else if(role === 'Pemilik Bisnis') setRoutes(routesBisnis);
  }, [role, routes])
  let mainContentRef = React.createRef();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, []);
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (router.route.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("assets/img/brand/nextjs_argon_black.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar {...props} brandText={getBrandText()} />
        {props.children}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
}

export default Admin;
