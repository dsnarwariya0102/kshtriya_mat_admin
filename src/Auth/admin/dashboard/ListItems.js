import React from "react";

export default function ListItems(props) {
  const handleClick = (option) => {
    props.handleDashComponents(option);
  };

  return (
    <>
      <aside
        class="main-sidebar fixed offcanvas shadow"
        data-toggle="offcanvas"
      >
        <div
          class="slimScrollDiv"
          style={{
            position: "relative",
            overflow: "hidden",
            width: "auto",
            height: 667,
          }}
        >
          <section
            class="sidebar"
            style={{ height: 667, overflow: "hidden", width: "auto" }}
          >
            <div class="w-80px mt-3 mb-3 ml-3">
              <img src="assets/img/basic/logo.png" alt="" />
            </div>
            <div class="relative">
              <a
                data-toggle="collapse"
                href="#userSettingsCollapse"
                role="button"
                aria-expanded="false"
                aria-controls="userSettingsCollapse"
                class="btn-fab btn-fab-sm absolute fab-right-bottom fab-top btn-primary shadow1 "
              >
                <i class="icon icon-cogs"></i>
              </a>
              <div class="user-panel p-3 light mb-2">
                <div>
                  <div class="float-left image">
                    <img
                      class="user_avatar"
                      src="assets/img/dummy/u2.png"
                      alt="User Image"
                    />
                  </div>
                  <div class="float-left info">
                    <h6 class="font-weight-light mt-2 mb-1">
                      Alexander Pierce
                    </h6>
                    <a href="#">
                      <i class="icon-circle text-primary blink"></i> Online
                    </a>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
            <ul class="sidebar-menu" style={{ textAlign: "initial" }}>
              <li class="header">
                <strong>Dashboard</strong>
              </li>
              <li class="treeview">
                <a href="#">
                  <i class="icon icon-sailing-boat-water purple-text s-18"></i>{" "}
                  <span>User</span>{" "}
                  <i class="icon icon-angle-left s-18 pull-right"></i>
                </a>
                <ul class="treeview-menu">
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick(1)}
                    >
                      <i class="icon icon-folder5"></i>Add User
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick(2)}
                    >
                      <i class="icon icon-folder5"></i>Display User
                    </a>
                  </li>
                </ul>
              </li>
              <li class="treeview">
                <a href="#">
                  <i class="icon icon-sailing-boat-water purple-text s-18"></i>{" "}
                  <span>Siblings</span>{" "}
                  <i class="icon icon-angle-left s-18 pull-right"></i>
                </a>
                <ul class="treeview-menu">
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick(3)}
                    >
                      <i class="icon icon-folder5"></i>Add Siblings
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick(4)}
                    >
                      <i class="icon icon-folder5"></i>Display Siblings
                    </a>
                  </li>
                </ul>
              </li>
              <li class="treeview">
                <a href="#">
                  <i class="icon icon-sailing-boat-water purple-text s-18"></i>{" "}
                  <span>Gotra</span>{" "}
                  <i class="icon icon-angle-left s-18 pull-right"></i>
                </a>
                <ul class="treeview-menu">
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick(5)}
                    >
                      <i class="icon icon-folder5"></i>Add Gotra
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick(6)}
                    >
                      <i class="icon icon-folder5"></i>Display Gotra
                    </a>
                  </li>
                </ul>
              </li>
              <li class="treeview">
                <a href="#">
                  <i class="icon icon-sailing-boat-water purple-text s-18"></i>{" "}
                  <span>Multiple Image</span>{" "}
                  <i class="icon icon-angle-left s-18 pull-right"></i>
                </a>
                <ul class="treeview-menu">
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick(7)}
                    >
                      <i class="icon icon-folder5"></i>Add multipleImage
                    </a>
                  </li>
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => handleClick(8)}
                    >
                      <i class="icon icon-folder5"></i>Display multipleImage
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </section>
          <div
            class="slimScrollBar"
            style={{
              background: "rgba(0, 0, 0, 0.3)",
              width: "5px",
              position: "absolute",
              top: "0px",
              opacity: "0.4px",
              display: "none",
              borderRadius: "7px",
              zIndex: "99px",
              right: "1px",
              height: 645.702,
            }}
          ></div>
          <div
            class="slimScrollRail"
            style={{
              width: "5px",
              height: "100%",
              position: "absolute",
              top: "0px",
              display: "none",
              borderRadius: "7px",
              background: "rgb(51, 51, 51)",
              opacity: "0.2",
              zIndex: "90px",
              right: "1px",
            }}
          ></div>
        </div>
      </aside>
    </>
  );
}
