import React from "react";
import DisplayGotra from "./Auth/admin/views/gotra/DisplayGotra";

import GotraInterface from "./Auth/admin/views/gotra/GotraInterface";
import UserInterFace from "./Auth/admin/views/user/UserInterFace";
import DisplayInterface from "./Auth/admin/views/user/DisplayInterface";

import SiblingInterface from "./Auth/admin/views/siblings/SiblingInterface";
import MultipleImage from "./Auth/admin/views/multipleImage/MultipleImage";

import Dashboard from "./Auth/admin/dashboard/Dashboard";
import DisplayMultipleImage from "./Auth/admin/views/multipleImage/DisplayMultipleImage";
import AdminRouter from "./Auth/router/AdminRouter";
function App() {
  return (
    <div>
      <AdminRouter />
    </div>
  );
}

export default App;
