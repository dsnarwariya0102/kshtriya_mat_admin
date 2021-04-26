import { MenuItem } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core/styles";

import {
  getDataAxios,
  postDataAndImageAxios,
  putDataAxios,
} from "../../../api/FetchServices";

const style = {
  maxWidth: 800,
  padding: 16,
  margin: "0 auto",
  backgroundColor: "#FFF",
  borderRadius: 5,
  boxShadow: "0 0 10px -1px #ccc",
};
export default function UserInterFace(props) {
  const [getUserName, setUserName] = useState("");
  const [getDOB, setDOB] = useState();
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
    fetchQualificationList();
    fetchState();
    fetchGotraList();
  }, []);

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
    console.log(`${s_id}`);
    let list = await putDataAxios(`statecity/city/${s_id}`);
    if (list.status) {
      // console.log(list.data);
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

  const handleDateChange = (event) => {
    setDOB(event.target.value);
    // setDOB(date);
    // var date = new Date().getDate();
    // var month = new Date().getMonth() + 1;
    // var year = new Date().getFullYear();

    // setDOB(month + "/" + date + "/" + year);
    // alert(`${getDOB}`);
  };

  const handleGenderChange = (event) => {
    console.log(event.target.value);
    setGender(event.target.value);
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleMarriageStatus = (event) => {
    setMarriageStatus(event.target.value);
  };

  const userSubmit = async () => {
    // var date = new Date(getDOB);

    // let dob =
    //   date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

    var formData = new FormData();
    formData.append("name", getUserName);
    // formData.append("dob", dob);
    formData.append("dob", getDOB);
    formData.append("gender", getGender);
    formData.append("qualification", getQualification);
    formData.append("occupation", getOccupation);
    formData.append("mobile_no", getMobileNo);
    formData.append("email_id", getEmailId);
    formData.append("father_name", getFatherName);
    formData.append("father_occupation", getFatherOccupation);
    formData.append("mother_name", getMotherName);
    formData.append("grand_father_name", getGrandFatherName);
    formData.append("grand_mother_name", getGrandMotherName);
    formData.append("self_gotra", getSelfGotra);
    formData.append("mama_gotra", getMamaGotra);
    formData.append("mother_mama_gotra", getMamaGotra);
    formData.append("father_mama_gotra", getFatherMamaGotra);
    formData.append("address", getAddress);
    formData.append("state", getState);
    formData.append("city", getCity);
    formData.append("country", getCountry);
    formData.append("user_image", getIcon.file);
    formData.append("status", getStatus);
    formData.append("marriage_status", getMarriageStatus);

    var config = { header: { "content-type": "multipart/form-data" } };
    let result = await postDataAndImageAxios("users/add", formData, config);
    if (result.status) {
      setMessage("Record Submitted");
    } else {
      setMessage("Record Not Submitted");
    }
    setUserName("");
    setDOB("");
    setGender("");
    setQualification("");
    setOccupation("");
    setMobileNo("");
    setEmailId("");
    setFatherName("");
    setFatherOccupation("");
    setMotherName("");
    setGrandFatherName("");
    setGrandMotherName("");
    setSelfGotra("");
    setMamaGotra("");
    setMotherMamaGotra("");
    setFatherMamaGotra("");
    setAddress("");
    setState("");
    setCity("");
    setCountry("");
    setIcon("");
    setStatus("");
    setMarriageStatus("");
  };

  return (
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
                <label for="validationCustomUsername">Father Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="father_name"
                  placeholder="Father Name"
                  onChange={(event) => setFatherName(event.target.value)}
                  value={getFatherName}
                />
              </div>
            </div>

            <div class="form-row">
              <div class="col-md-3 mb-3">
                <label for="validationCustom02">Father Occupation</label>
                <select
                  // type="text"
                  class="form-control"
                  id="status"
                  placeholder="Qualification"
                  value={getFatherOccupation}
                  onChange={(event) => setFatherOccupation(event.target.value)}
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
                  onChange={(event) => setMotherName(event.target.value)}
                  value={getMotherName}
                />
              </div>
              <div class="col-md-3 mb-3">
                <label for="validationCustom02">Grand Father Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="GrandFatherName"
                  placeholder="GrandFatherName"
                  value={getGrandFatherName}
                  onChange={(event) => setGrandFatherName(event.target.value)}
                />
              </div>
              <div class="col-md-3 mb-3">
                <label for="validationCustomUsername">Grand Mother Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="grandMotherName"
                  placeholder="Grand Mother Name"
                  onChange={(event) => setGrandMotherName(event.target.value)}
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
                <label for="validationCustom02">Mother Mama Gotra</label>
                <select
                  // type="text"
                  class="form-control"
                  id="status"
                  placeholder="Mother Mama Gotra"
                  value={getMotherMamaGotra}
                  onChange={(event) => setMotherMamaGotra(event.target.value)}
                >
                  <option value="">--Select--</option>
                  {fetchGotraItem()}
                </select>
              </div>
              <div class="col-md-3 mb-3">
                <label for="validationCustom02">Father Mama Gotra</label>
                <select
                  // type="text"
                  class="form-control"
                  id="status"
                  placeholder="Father Mama Gotra"
                  onChange={(event) => setFatherMamaGotra(event.target.value)}
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

            <center>
              <button
                class="btn btn-primary"
                style={{
                  marginTop: 10,
                }}
                type="submit"
                onClick={userSubmit}
              >
                Submit
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}
