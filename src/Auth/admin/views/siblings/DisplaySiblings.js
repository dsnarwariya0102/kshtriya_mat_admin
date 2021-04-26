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
  putDataAxios,
  deleteDataAxios,
  postDataAxios,
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

export default function DisplaySiblings() {
  const classes = useStyles();

  const [getOpenModal, setOpenModal] = useState(false);
  const [getColumn, setColumn] = useState({
    columns: [
      { title: "Sibling Id", field: "siblings_id" },
      { title: "User Name", field: "username" },
      { title: "Name", field: "name" },
      { title: "Occupation", field: "occupation" },
      { title: "Realtion", field: "user_relation" },
    ],
  });
  const [getSiblingList, setSiblingList] = useState([]);

  const [getSiblingId, setSiblingId] = useState("");
  const [getUserId, setUserId] = useState("");
  const [getSiblingName, setSiblingName] = useState([]);
  const [getOccupation, setOccupation] = useState([]);
  const [getUserRelation, setUserRelation] = useState([]);
  const [getMessage, setMessage] = useState("");
  const [getUserList, setUserList] = useState([]);

  useEffect(function () {
    fetchSiblingData();
  }, []);

  const fetchSiblingData = async () => {
    let list = await getDataAxios("siblings/display");
    list.status && setSiblingList(list.data) && console.log(list.data);
  };

  const fetchUser = async () => {
    let list = await getDataAxios("users/display");
    console.log(list);
    if (list.data) {
      setUserList(list.data);
    }
  };

  const userItem = () => {
    return getUserList.map((item) => {
      return <option value={item.user_id}>{item.name}</option>;
    });
  };

  const handlUserId = (e) => {
    setUserId(e.target.value);
  };

  const handleSiblingDelete = async (oldData) => {
    let result = await deleteDataAxios(
      `siblings/delete/${oldData.siblings_id}`
    );
    result.status &&
      swal("Record Deleted", " ", "success", {
        buttons: false,
      });
    fetchSiblingData();
  };

  const handleDialogOpen = (rowData) => {
    fetchUser();
    setOpenModal(true);

    setSiblingId(rowData.siblings_id);
    setUserId(rowData.user_id);
    setSiblingName(rowData.name);
    setOccupation(rowData.occupation);
    setUserRelation(rowData.user_relation);
  };

  const siblingUpdate = async () => {
    let body = {
      user_id: getUserId,
      name: getSiblingName,
      occupation: getOccupation,
      user_relation: getUserRelation,
    };
    let result = await putDataAxios(`siblings/edit/${getSiblingId}`, body);
    result.status &&
      swal("Record Updated", " ", "success", {
        buttons: false,
      });
    setOpenModal(false);
  };

  const SiblingModal = () => {
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
            <div>
              <div className="container mt-4">
                <div style={style}>
                  <div class="card-header white">
                    <h6>ADD Siblings</h6>
                  </div>
                  <div
                    class="card-body"
                    style={{ padding: 10, marginLeft: 60, marginRight: 60 }}
                  >
                    <div class="form-row">
                      <div class="col-md-12 mb-3">
                        <label for="validationCustom02">User Name</label>
                        <select
                          class="form-control"
                          id="status"
                          placeholder="User Name"
                          value={getUserId}
                          onChange={handlUserId}
                        >
                          {userItem()}
                        </select>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="col-md-4 mb-2">
                        <label for="validationCustom01">siblings Name</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Sibling name"
                          value={getSiblingName}
                          onChange={(event) =>
                            setSiblingName(event.target.value)
                          }
                        />
                      </div>
                      <div class="col-md-4 mb-2">
                        <label for="validationCustom02">Occupation</label>
                        <select
                          class="form-control"
                          id="status"
                          placeholder="occupation"
                          value={getOccupation}
                          onChange={(event) =>
                            setOccupation(event.target.value)
                          }
                        >
                          <option value={"N/A"}>--N/A--</option>
                          <option value={"Farmer"}>Farmer</option>
                          <option value={"Govt Servent"}>Govt Servant</option>
                          <option value={"Defence"}>Defence</option>
                          <option value={"Engineer"}>Engineer</option>
                        </select>
                      </div>
                      <div class="col-md-4 mb-2">
                        <label for="validationCustom02">Realtion</label>
                        <select
                          class="form-control"
                          id="status"
                          placeholder="Qualification"
                          value={getUserRelation}
                          onChange={(event) =>
                            setUserRelation(event.target.value)
                          }
                        >
                          <option value={"N/A"}>--N/A--</option>
                          <option value={"Brother"}>Brother</option>
                          <option value={"Sister"}>Sister</option>
                        </select>
                      </div>
                    </div>
                    <div calss="form-row">
                      <center>
                        <button
                          class="btn btn-primary"
                          style={{
                            marginTop: 10,
                          }}
                          type="submit"
                          onClick={siblingUpdate}
                        >
                          Update
                        </button>
                      </center>
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
        data={getSiblingList}
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

                const data = [...getSiblingList];
                data.slice(data.indexOf(oldData), 1);
                setSiblingList(data);
                handleSiblingDelete(oldData);
              }, 600);
            }),
        }}
      />
      {SiblingModal()}
    </div>
  );
}
