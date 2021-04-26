import React, {
  createRef,
  useRef,
  useCallback,
  useState,
  useEffect,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import DropzoneComponent from "react-dropzone-component";
import swal from "sweetalert";

import {
  getDataAxios,
  postDataAndImageAxios,
  postDataAxios,
  ServerURL,
} from "../../../api/FetchServices";
const style = {
  maxWidth: 800,
  padding: 16,
  margin: "0 auto",
  backgroundColor: "#FFF",
  borderRadius: 5,
  boxShadow: "0 0 10px -1px #ccc",
};

export default function MultipleImage() {
  var dref = createRef();

  const [getUserName, setUserName] = useState("");
  const [getUserList, setUserList] = useState([]);

  useEffect(function () {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    let list = await getDataAxios("users/display");
    console.log(list);
    list.status && setUserList(list.data);
  };

  const userItem = () => {
    return getUserList.map((item) => {
      return <option value={item.user_id}>{item.name}</option>;
    });
  };

  const multipleImageSubmit = async () => {
    const formData = new FormData();
    formData.append("users_id", getUserName);

    dref.current.state.files.map((file, index) => {
      //alert(file+","+index)
      formData.append("pictures" + index, file);
    });

    const config = { header: { "content-type": "multipart/form-data" } };
    let react_result = await postDataAndImageAxios(
      "multipleimage/add",
      formData,
      config
    );

    if (react_result.status) {
      swal("image upload Successfully", " ", "success", {
        buttons: false,
      });
    } else {
      swal("Image not Uploaded", " ", "warning", {
        buttons: false,
      });
    }
  };

  /*-------------Drop Zone Files------------*/

  var djsConfig = {
    addRemoveLinks: true,
    acceptedFiles: "image/jpeg,image/png,image/gif/jpg,image/bmp,image",
    autoProcessQueue: false,
    uploadMultiple: true,
  };

  /* This time we are not use a these function this is just because show how we call and use*/
  const sending = async (file, x, formData) => {};
  const success = (file) => {};

  const removedfile = (file) => console.log("removing...", file);
  const callback = () => console.log("Hello!");

  var callbackArray = [
    function () {
      console.log("Look Ma, I'm a callback in an array!");
    },
    function () {
      console.log("Wooooow!");
    },
  ];

  var componentConfig = {
    iconFiletypes: [".jpg", ".jpeg", ".png", ".gif", ".bmp"],
    showFiletypeIcon: true,
    /*--------Action------/------Call Node Router to send Images--------- */
    postUrl: `${ServerURL}/multipleimage/add`,
  };

  const eventHandlers = {
    // init:dz =>dropzone = dz,
    drop: callbackArray,
    addedfile: callback,
    success: success,
    removedfile: removedfile,
    sending: sending,
  };

  return (
    <div className="container mt-4">
      <div style={style}>
        <div class="card-header white">
          <h6>Upload User Image</h6>
        </div>

        <div class="card-body">
          <div class="needs-validation">
            <div class="form-row">
              <div class="col-md-12">
                <label for="validationCustom02">User Name</label>
                <select
                  // type="text"
                  class="form-control"
                  id="status"
                  placeholder="UserName"
                  value={getUserName}
                  onChange={(e) => setUserName(e.target.value)}
                >
                  {userItem()}
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 mb-3">
                <DropzoneComponent
                  config={componentConfig}
                  ref={dref}
                  eventHandlers={eventHandlers}
                  djsConfig={djsConfig}
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-12 mb-3">
                <center>
                  <button
                    class="btn btn-primary"
                    style={{
                      marginTop: 10,
                      width: 150,
                    }}
                    type="submit"
                    onClick={multipleImageSubmit}
                  >
                    Submit
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
