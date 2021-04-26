import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import EditIcon from "@material-ui/icons/Edit";
import swal from "sweetalert";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import MaterialTable from "material-table";
import {
  ServerURL,
  getDataAxios,
  putDataAxios,
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

export default function DisplayInterface() {
  const classes = useStyles();

  const [getOpenModal, setOpenModal] = useState(false);

  const [getColumn, setColumn] = useState({
    columns: [
      { title: "UserId", field: "user_id" },
      { title: "Name", field: "name" },
      { title: "D.O.B", field: "dob" },
      { title: "Gender", field: "gender" },
      { title: "Qualification", field: "qualification" },
      { title: "Occupation", field: "occupation" },
      { title: "Mobile No.", field: "mobile_no" },
      { title: "Email Id", field: "email_id" },
      {
        title: "Image",
        render: (rowData) => (
          <img
            src={`${ServerURL}/images/${rowData.user_image}`}
            style={{ height: 40, width: 40, borderRadius: "30%" }}
          />
        ),
      },
    ],
  });
  const [getUserList, setUserList] = useState([]);

  const [getUserId, setUserId] = useState("");
  const [getUserName, setUserName] = useState("");
  const [getDOB, setDOB] = useState("");
  const [getGender, setGender] = useState("");
  const [getQualification, setQualification] = useState("");
  const [getOccupation, setOccupation] = useState("");
  const [getMobileNo, setMobileNo] = useState("");
  const [getEmailId, setEmailId] = useState("");
  const [getFatherName, setFatherName] = useState("");
  const [getFatherOccupation, setFatherOccupation] = useState("");
  const [getMotherName, setMotherName] = useState("");
  const [getGrandFatherName, setGrandFatherName] = useState("");
  const [getGrandMotherName, setGrandMotherName] = useState("");
  const [getSelfGotra, setSelfGotra] = useState("");
  const [getMamaGotra, setMamaGotra] = useState("");
  const [getMotherMamaGotra, setMotherMamaGotra] = useState("");
  const [getFatherMamaGotra, setFatherMamaGotra] = useState("");
  const [getAddress, setAddress] = useState("");
  const [getState, setState] = useState("");
  const [getCity, setCity] = useState("");
  const [getCountry, setCountry] = useState("");
  const [getIcon, setIcon] = useState({ icon: "", file: "" });
  const [getStatus, setStatus] = useState("");
  const [getMarriageStatus, setMarriageStatus] = useState("");
  const [getMessage, setMessage] = useState("");
  const [getQualificationList, setQualificationList] = useState([]);
  const [getStateList, setStateList] = useState([]);
  const [getCityList, setCityList] = useState([]);
  const [getGotraList, setGotraList] = useState([]);

  useEffect(function () {
    fetchUserData();
    fetchState();
  }, []);

  const fetchUserData = async () => {
    let list = await getDataAxios("users/display");
    // console.log(list);
    if (list.status) {
      setUserList(list.data);
    }
  };

  const handleUserDelete = async (oldData) => {
    var result = await deleteDataAxios(`users/delete/${oldData.user_id}`);
    result.status &&
      swal("Record Deleted", " ", "success", {
        buttons: false,
      });
    fetchUserData();
  };

  const fetchQualificationList = async () => {
    let list = await getDataAxios("qualification/display");
    // console.log(list.data);
    if (list.status) {
      setQualificationList(list.data);
    }
  };

  const qualificationListItem = () => {
    return getQualificationList.map((item) => {
      return (
        <option value={item.qualification_id}>{item.qualification_name}</option>
      );
    });
  };

  const fetchState = async () => {
    let list = await getDataAxios("statecity/state");
    // console.log(list);
    if (list.status) {
      setStateList(list.data);
    }
  };

  const stateItem = () => {
    return getStateList.map((item) => {
      return <option value={item.state_id}>{item.statename}</option>;
    });
  };

  const handleState = (event) => {
    setState(event.target.value);
    fetchCity(event.target.value);
  };

  const fetchCity = async (s_id) => {
    // alert(`${s_id}`);
    // let body = { state_id: s_id };
    let list = await putDataAxios(`statecity/city/${s_id}`);
    if (list.status) {
      setCityList(list.data);
    }
  };

  const cityItem = () => {
    return getCityList.map((item) => {
      return <option value={item.city_id}>{item.cityname}</option>;
    });
  };

  const handleCity = (event) => {
    setCity(event.target.value);
  };

  const fetchGotraList = async () => {
    let list = await getDataAxios("gotra/display");
    if (list.status) {
      setGotraList(list.data);
    }
  };

  const fetchGotraItem = () => {
    return getGotraList.map((item) => {
      return <option value={item.gotra_id}>{item.gotra_name}</option>;
    });
  };

  const handleDateChange = (event) => {
    setDOB(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleMarriageStatus = (event) => {
    setMarriageStatus(event.target.value);
  };

  const userUpdateImage = async () => {
    var formData = new FormData();
    formData.append("user_image", getIcon.file);

    var config = { header: { "content-type": "multipart/form-Data" } };
    var result = await postDataAndImageAxios(
      `users/editImage/${getUserId}`,
      formData,
      config
    );

    if (result.status) {
      swal("Image Updated", " ", "success", {
        buttons: false,
      });
    }
    fetchUserData();
    setOpenModal(false);
  };

  const userUpdateData = async () => {
    // var date = new Date(getDOB);

    // let dob =
    //   date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

    let body = {
      name: getUserName,
      dob: getDOB,
      gender: getGender,
      qualification: getQualification,
      occupation: getOccupation,
      mobile_no: getMobileNo,
      email_id: getEmailId,
      father_name: getFatherName,
      father_occupation: getFatherOccupation,
      mother_name: getMotherName,
      grand_father_name: getGrandFatherName,
      grand_mother_name: getGrandMotherName,
      self_gotra: getSelfGotra,
      mama_gotra: getMamaGotra,
      mother_mama_gotra: getMamaGotra,
      father_mama_gotra: getFatherMamaGotra,
      address: getAddress,
      state: getState,
      city: getCity,
      country: getCountry,
      status: getStatus,
      marriage_status: getMarriageStatus,
    };

    let result = await putDataAxios(`users/edit/${getUserId}`, body);
    if (result.status) {
      swal("Record Updated", " ", "success", {
        buttons: false,
      });
    }
    fetchUserData();
    setOpenModal(false);
  };

  const handleDialogOpen = (rowData) => {
    setMessage("");
    // setOpen(true);
    setOpenModal(true);
    fetchQualificationList();
    fetchGotraList();
    fetchCity(rowData.state);
    // console.log(rowData.state);

    setUserId(rowData.user_id);
    setUserName(rowData.name);
    setDOB(rowData.dob);
    setGender(rowData.gender);
    setQualification(rowData.qualification);
    setOccupation(rowData.occupation);
    setMobileNo(rowData.mobile_no);
    setEmailId(rowData.email_id);
    setFatherName(rowData.father_name);
    setFatherOccupation(rowData.father_occupation);
    setMotherName(rowData.mother_name);
    setGrandFatherName(rowData.grand_father_name);
    setGrandMotherName(rowData.grand_mother_name);
    setSelfGotra(rowData.self_gotra);
    setMamaGotra(rowData.mama_gotra);
    setMotherMamaGotra(rowData.mother_mama_gotra);
    setFatherMamaGotra(rowData.father_mama_gotra);
    setAddress(rowData.address);
    setState(rowData.state);
    setCity(rowData.city);
    setCountry(rowData.country);
    setIcon(rowData.name);
    setStatus(rowData.status);
    setMarriageStatus(rowData.marriage_status);
    setIcon({ icon: `${ServerURL}/images/${rowData.user_image}`, file: "" });
  };

  const userModal = () => {
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
              <div style={style}>
                <div class="card-header white">
                  <h6>Add User Deatils</h6>
                </div>

                <div class="card-body">
                  <div class="needs-validation">
                    <div class="form-row">
                      <div class="col-md-3 mb-3">
                        <label for="validationCustom02">Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="distributor_erp_id"
                          placeholder="Name"
                          value={getUserName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                      <div class="col-md-3 mb-3">
                        <label for="validationCustomUsername">D.O.B:</label>
                        <input
                          type="date"
                          class="form-control"
                          id="customer_erp_id"
                          placeholder="customer_erp_id"
                          value={getDOB}
                          onChange={handleDateChange}
                        />
                      </div>
                      <div class="col-md-3 mb-3">
                        <label for="validationCustom01">Gender:</label>
                        <div style={{ marginTop: 8 }}>
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="Male"
                            onChange={handleGenderChange}
                          />{" "}
                          <label for="male">Male</label>
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="Female"
                            onChange={handleGenderChange}
                          />
                          <label for="female">Female</label>
                        </div>
                      </div>
                      <div class="col-md-3 mb-3">
                        <label for="validationCustom02">Qualification</label>
                        <select
                          // type="text"
                          class="form-control"
                          id="status"
                          placeholder="Qualification"
                          value={getQualification}
                          onChange={(e) => setQualification(e.target.value)}
                        >
                          {qualificationListItem()}
                        </select>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="col-md-3 mb-3">
                        <label for="validationCustom02">Occupation</label>
                        <select
                          // type="text"
                          class="form-control"
                          id="status"
                          placeholder="Qualification"
                          value={getOccupation}
                          onChange={(e) => setOccupation(e.target.value)}
                        >
                          <option value="">--select--</option>
                          <option value={"Farmer"}>Farmer</option>
                          <option value={"Govt Servent"}>Govt Servant</option>
                          <option value={"Defence"}>Defence</option>
                          <option value={"Engineer"}>Engineer</option>
                        </select>
                      </div>
                      <div class="col-md-3 mb-3 focused">
                        <label for="validationCustom01">Mobile No.</label>
                        <input
                          type="text"
                          class="form-control"
                          id="Mobile no"
                          placeholder="Mobile No."
                          onChange={(event) => setMobileNo(event.target.value)}
                          value={getMobileNo}
                        />
                      </div>
                      <div class="col-md-3 mb-3">
                        <label for="validationCustom02">Email Id.</label>
                        <input
                          type="text"
                          class="form-control"
                          id="email id"
                          placeholder="Email Id"
                          value={getEmailId}
                          onChange={(event) => setEmailId(event.target.value)}
                        />
                      </div>
                      <div class="col-md-3 mb-3">
                        <label for="validationCustomUsername">
                          Father Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="father_name"
                          placeholder="Father Name"
                          onChange={(event) =>
                            setFatherName(event.target.value)
                          }
                          value={getFatherName}
                        />
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="col-md-3 mb-3">
                        <label for="validationCustom02">
                          Father Occupation
                        </label>
                        <select
                          // type="text"
                          class="form-control"
                          id="status"
                          placeholder="Qualification"
                          value={getFatherOccupation}
                          onChange={(event) =>
                            setFatherOccupation(event.target.value)
                          }
                        >
                          <option value="">--select--</option>
                          <option value={"Farmer"}>Farmer</option>
                          <option value={"Govt Servent"}>Govt Servant</option>
                          <option value={"Defence"}>Defence</option>
                          <option value={"Engineer"}>Engineer</option>
                        </select>
                      </div>
                      <div class="col-md-3 mb-3 focused">
                        <label for="validationCustom01">Mother Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="Mobile no"
                          placeholder="Mother Name."
                          onChange={(event) =>
                            setMotherName(event.target.value)
                          }
                          value={getMotherName}
                        />
                      </div>
                      <div class="col-md-3 mb-3">
                        <label for="validationCustom02">
                          Grand Father Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="GrandFatherName"
                          placeholder="GrandFatherName"
                          value={getGrandFatherName}
                          onChange={(event) =>
                            setGrandFatherName(event.target.value)
                          }
                        />
                      </div>
                      <div class="col-md-3 mb-3">
                        <label for="validationCustomUsername">
                          Grand Mother Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="grandMotherName"
                          placeholder="Grand Mother Name"
                          onChange={(event) =>
                            setGrandMotherName(event.target.value)
                          }
                          value={getGrandMotherName}
                        />
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="col-md-3 mb-3">
                        <label for="validationCustom02">Self Gotra</label>
                        <select
                          // type="text"
                          class="form-control"
                          id="status"
                          placeholder="Qualification"
                          value={getSelfGotra}
                          onChange={(event) => setSelfGotra(event.target.value)}
                        >
                          <option value="">--Select--</option>
                          {fetchGotraItem()}
                        </select>
                      </div>
                      <div class="col-md-3 mb-3 focused">
                        <label for="validationCustom02">Mama Gotra</label>
                        <select
                          // type="text"
                          class="form-control"
                          id="status"
                          placeholder="Mama Gotra"
                          onChange={(event) => setMamaGotra(event.target.value)}
                          value={getMamaGotra}
                        >
                          <option value="">--Select--</option>
                          {fetchGotraItem()}
                        </select>
                      </div>
                      <div class="col-md-3 mb-3">
                        <label for="validationCustom02">
                          Mother Mama Gotra
                        </label>
                        <select
                          // type="text"
                          class="form-control"
                          id="status"
                          placeholder="Mother Mama Gotra"
                          value={getMotherMamaGotra}
                          onChange={(event) =>
                            setMotherMamaGotra(event.target.value)
                          }
                        >
                          <option value="">--Select--</option>
                          {fetchGotraItem()}
                        </select>
                      </div>
                      <div class="col-md-3 mb-3">
                        <label for="validationCustom02">
                          Father Mama Gotra
                        </label>
                        <select
                          // type="text"
                          class="form-control"
                          id="status"
                          placeholder="Father Mama Gotra"
                          onChange={(event) =>
                            setFatherMamaGotra(event.target.value)
                          }
                          value={getFatherMamaGotra}
                        >
                          <option value="">--Select--</option>
                          {fetchGotraItem()}
                        </select>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="col-md-9 mb-3">
                        <label for="validationCustom02">Address</label>
                        <input
                          type="text"
                          class="form-control"
                          id="Address"
                          placeholder="Address"
                          onChange={(event) => setAddress(event.target.value)}
                          value={getAddress}
                        ></input>
                      </div>

                      <div class="col-md-3 mb-3">
                        <label for="validationCustom02">State</label>
                        <select
                          // type="text"
                          class="form-control"
                          id="status"
                          placeholder="State"
                          value={getState}
                          onChange={handleState}
                        >
                          <option value="">--State--</option>
                          {stateItem()}
                        </select>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="col-md-3 mb-3">
                        <label for="validationCustom02">City</label>
                        <select
                          // type="text"
                          class="form-control"
                          id="status"
                          placeholder="City"
                          value={getCity}
                          onChange={handleCity}
                        >
                          <option value="">--City--</option>
                          {cityItem()}
                        </select>
                      </div>

                      <div class="col-md-3 mb-3">
                        <label for="validationCustom02">Country</label>
                        <input
                          type="text"
                          class="form-control"
                          id="country"
                          placeholder="Country"
                          onChange={(event) => setCountry(event.target.value)}
                          value={getCountry}
                        ></input>
                      </div>

                      <div class="col-md-3 mb-3">
                        <label for="validationCustom02">Status</label>
                        <select
                          // type="text"
                          class="form-control"
                          id="marriage status"
                          value={getStatus}
                          onChange={handleStatus}
                          placeholder="Status"
                        >
                          <option value="">--status--</option>
                          <option value={"Verify"}>Verify</option>
                          <option value={"Not Verify"}>not Verify</option>
                        </select>
                      </div>
                      <div class="col-md-3 mb-3">
                        <label for="validationCustom02">Marriage Status</label>
                        <select
                          // type="text"
                          class="form-control"
                          id="marriage status"
                          placeholder="Marriage Status"
                          value={getMarriageStatus}
                          onChange={handleMarriageStatus}
                        >
                          <option value="">--status--</option>
                          <option value={"Married"}>Married</option>
                          <option value={"Un Married"}>UnMarried</option>
                          <option value={"Divorce"}>Divorce</option>
                          <option value={"War Widow"}>War Widow</option>
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
                            marginLeft: 135,
                            height: 80,
                            width: 100,
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
                              marginTop: 25,
                            }}
                            startIcon={<CloudUploadIcon />}
                          >
                            Upload
                          </Button>
                        </label>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="col-md-6 mb-3">
                        <center>
                          <Button
                            variant="contained"
                            component="span"
                            className={classes.button}
                            startIcon={<EditIcon />}
                            onClick={() => userUpdateData()}
                          >
                            Update Data
                          </Button>
                        </center>
                      </div>
                      <div class="col-md-6 mb-3">
                        <Button
                          variant="contained"
                          component="span"
                          className={classes.button}
                          startIcon={<EditIcon />}
                          onClick={() => userUpdateImage()}
                        >
                          Update Image
                        </Button>
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
        data={getUserList}
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

                const data = [...getUserList];
                data.slice(data.indexOf(oldData), 1);
                setUserList(data);
                handleUserDelete(oldData);
              }, 600);
            }),
        }}
      />

      {userModal()}
    </div>
  );
}
