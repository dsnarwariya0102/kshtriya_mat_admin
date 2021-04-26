import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import EditIcon from "@material-ui/icons/Edit";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import swal from "sweetalert";
import MaterialTable from "material-table";
import {
  ServerURL,
  getDataAxios,
  deleteDataAxios,
  postDataAndImageAxios,
} from "../../../api/FetchServices";
const style = {
  maxWidth: 900,
  // height: 700,
  borderRadius: 5,
  background: "#fff",
  boxShadow: "0 0 10px -1px #ccc",
};
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function DisplayMultipleImage() {
  const classes = useStyles();

  const [getOpenModal, setOpenModal] = useState(false);
  const [getColumn, setColumn] = useState({
    columns: [
      { title: "Transction Id", field: "transaction_id" },
      { title: "User Name", field: "username" },
      {
        title: "Image",
        render: (rowData) => (
          <img
            src={`${ServerURL}/images/${rowData.multiple_image}`}
            style={{ height: 50, width: 70, borderRadius: "30%" }}
          />
        ),
      },
    ],
  });
  const [getUserPicList, setuserPicList] = useState([]);
  const [getTransactionId, setTransactionId] = useState("");
  const [getUserName, setUserName] = useState("");
  const [getIcon, setIcon] = useState({ icon: "", file: "" });
  const [getUserList, setUserList] = useState([]);

  useEffect(() => {
    fetchUserPic();
  }, []);

  const fetchUserPic = async () => {
    let list = await getDataAxios("multipleimage/display");
    setuserPicList(list.data);
  };

  const handleUserMultiPicDelete = async (oldData) => {
    let result = await deleteDataAxios(
      `multipleimage/delete/${oldData.transaction_id}`
    );
    result.status &&
      swal(`${result.message}`, " ", "success", {
        buttons: false,
      });
    fetchUserPic();
  };

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

  const handleDialogOpen = (rowData) => {
    fetchUser();
    setOpenModal(true);

    setTransactionId(rowData.transaction_id);
    setUserName(rowData.users_id);
    setIcon({
      icon: `${ServerURL}/images/${rowData.multiple_image}`,
      file: "",
    });
  };

  const multipleImageSubmit = async () => {
    var formData = new FormData();
    formData.append("users_id", getUserName);
    formData.append("multiple_image", getIcon.file);

    var config = { header: { "content-type": "multipart/form-data" } };
    let result = await postDataAndImageAxios(
      `multipleimage/edit/${getTransactionId}`,
      formData,
      config
    );
    result.status &&
      swal(`${result.message}`, " ", "success", {
        buttons: false,
      });
    setOpenModal(false);
    fetchUserPic();
  };

  const userMultPicModal = () => {
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={getOpenModal}
          onClose={handleClose}
        >
          <Fade in={getOpenModal}>
            <div className="container mt-4">
              <div
                style={{
                  maxWidth: 600,
                  borderRadius: 5,
                  background: "#fff",
                  boxShadow: "0 0 10px -1px #ccc",
                }}
              >
                <div class="card-header white">
                  <h6>Upload User Image</h6>
                </div>

                <div class="card-body">
                  <div class="needs-validation">
                    <div class="form-row">
                      <div class="col-md-12 mb-3">
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
                      <div class="col-md-6 mb-3">
                        <Avatar
                          alt="Remy Sharp"
                          variant="rounded"
                          src={getIcon.icon}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: 15,
                            height: 180,
                            width: 250,
                          }}
                        />
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={(event) =>
                            setIcon({
                              icon: URL.createObjectURL(event.target.files[0]),
                              file: event.target.files[0],
                            })
                          }
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="contained"
                            component="span"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginTop: 75,
                              marginLeft: 70,
                            }}
                            startIcon={<CloudUploadIcon />}
                          >
                            Upload
                          </Button>
                        </label>
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
          </Fade>
        </Modal>
      </div>
    );
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <MaterialTable
        title="User List"
        columns={getColumn.columns}
        data={getUserPicList}
        options={{
          headerStyle: {
            backgroundColor: "#2979ff",
            color: "#FFF",
          },
          actionsCellStyle: {
            padding: "0 50px",
          },
        }}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit",
            onClick: (event, rowData) => handleDialogOpen(rowData),
          },
        ]}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();

                const data = [...getUserPicList];
                data.slice(data.indexOf(oldData), 1);
                setuserPicList(data);
                handleUserMultiPicDelete(oldData);
              }, 600);
            }),
        }}
      />
      {userMultPicModal()}
    </div>
  );
}
