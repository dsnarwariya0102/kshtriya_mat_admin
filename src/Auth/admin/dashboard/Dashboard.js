import React, { useState, useEffect } from "react";
import ListItems from "./ListItems";
import CircularProgress from "@material-ui/core/CircularProgress";
/*-----------Import Views------------- */
import UserInterface from "../views/user/UserInterFace";
import DisplayInterface from "../views/user/DisplayInterface";
import SiblingInterface from "../views/siblings/SiblingInterface";
import DisplaySiblings from "../views/siblings/DisplaySiblings";
import GotraInterface from "../views/gotra/GotraInterface";
import DisplayGotra from "../views/gotra/DisplayGotra";
import MultipleImage from "../views/multipleImage/MultipleImage";
import DisplayMultipleImage from "../views/multipleImage/DisplayMultipleImage";

export default function Dashboard(props) {
  const [getContainerView, setContainerView] = useState("");
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    chkToken();
  }, []);

  const chkToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      props.history.replace({ pathname: "/AdminLogin" });
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleComponent = (opt) => {
    // alert(opt);
    switch (opt) {
      case 1:
        setContainerView(<UserInterface />);
        break;
      case 2:
        setContainerView(<DisplayInterface />);
        break;
      case 3:
        setContainerView(<SiblingInterface />);
        break;
      case 4:
        setContainerView(<DisplaySiblings />);
        break;
      case 5:
        setContainerView(<GotraInterface />);
        break;
      case 6:
        setContainerView(<DisplayGotra />);
        break;
      case 7:
        setContainerView(<MultipleImage />);
        break;
      case 8:
        setContainerView(<DisplayMultipleImage />);
        break;
      default:
    }
  };

  const handleLogout = async () => {
    localStorage.clear();
    props.history.replace({ pathname: "/AdminLogin" });
  };
  const style = {
    padding: "300px 0",
    textAlign: "center",
    opacity: 1,
  };

  if (Loading) {
    return (
      <div>
        <div style={style}>
          <CircularProgress color="secondary" />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <aside
          class="main-sidebar fixed offcanvas shadow"
          data-toggle="offcanvas"
        >
          <section class="sidebar">
            <ListItems handleDashComponents={handleComponent} />
          </section>
        </aside>

        <div class="has-sidebar-left">
          <div class="pos-f-t">
            <div class="collapse" id="navbarToggleExternalContent">
              <div class="bg-dark pt-2 pb-2 pl-4 pr-2">
                <div class="search-bar">
                  <input
                    class="transparent s-24 text-white b-0 font-weight-lighter w-128 height-50"
                    type="text"
                    placeholder="start typing..."
                  />
                </div>
                <a
                  href="#"
                  data-toggle="collapse"
                  data-target="#navbarToggleExternalContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  class="paper-nav-toggle paper-nav-white active "
                >
                  <i></i>
                </a>
              </div>
            </div>
          </div>
          <div class="sticky">
            <div class="navbar navbar-expand navbar-dark d-flex justify-content-between bd-navbar blue accent-3">
              <div class="relative">
                <a
                  href="#"
                  data-toggle="push-menu"
                  class="paper-nav-toggle pp-nav-toggle"
                >
                  <i></i>
                </a>
              </div>
              <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                  {/* User Account*/}
                  <li class="dropdown custom-dropdown notifications-menu">
                    <a href="#" class="nav-link" data-toggle="dropdown">
                      {/* <img
                      src="/admintheme/assets/img/dummy/u8.png"
                      class="user-image"
                      alt="User Image"
                      style={{ height: 30 }}
                    /> */}
                      <i class="icon-more_vert "></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right">
                      {/* <li class="header">You have 10 notifications</li> */}
                      <li>
                        {/* inner menu: contains the actual data */}
                        <ul class="menu">
                          {/* <li>
                          <a href="#" style={{fontSize: 15, fontWeight: 'bold' }}>
                            <i class="icon icon-data_usage text-success"></i>{" "}
                            Profile
                          </a>
                        </li> */}
                          <li>
                            <a
                              // href="#"
                              onClick={handleLogout}
                              style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                cursor: "pointer",
                              }}
                            >
                              <i class="icon icon-data_usage text-danger"></i>{" "}
                              Logout
                            </a>
                          </li>
                          {/* <li>
                          <a href="#">
                            <i class="icon icon-data_usage text-yellow"></i> 5
                            new members joined today
                          </a>
                        </li> */}
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          class="page has-sidebar-left"
          style={{ textAlign: "-webkit-auto" }}
        >
          <header class="my-3">
            <div class="container-fluid">
              {getContainerView}
              {/* <div class="row">
              <div class="col">
                <h1 class="s-24">
                  <i class="icon-pages"></i>
                  Blank <span class="s-14">Get Started</span>
                </h1>
              </div> */}
              {/* </div> */}
            </div>
          </header>
          <div class="container-fluid my-3">
            <center>
              <a>
                © Copyright 2021. All Rights Reserved by @Dharmenddra Singh
                Narwariya
              </a>
            </center>
          </div>
        </div>
      </>
    );
  }
}
