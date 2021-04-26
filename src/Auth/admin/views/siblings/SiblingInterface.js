import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import swal from "sweetalert";

import { getDataAxios, postDataAxios } from "../../../api/FetchServices";

const style = {
  maxWidth: 800,
  padding: 16,
  margin: "0 auto",
  backgroundColor: "#FFF",
  borderRadius: 5,
  boxShadow: "0 0 10px -1px #ccc",
};
const useStyles = makeStyles((theme) => ({
  large: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: theme.spacing(15),
    height: theme.spacing(15),
  },

  input: {
    display: "none",
  },
}));

export default function SiblingInterface() {
  /*--------------------------------------------------------------------- */
  const [getUserId, setUserId] = useState("");
  const [getSiblingName, setSiblingName] = useState([]);
  const [getOccupation, setOccupation] = useState([]);
  const [getUserRelation, setUserRelation] = useState([]);
  const [getMessage, setMessage] = useState("");
  const [getUserList, setUserList] = useState([]);

  useEffect(function () {
    fetchUser();
  }, []);

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

  function handleSiblingsName(i, event) {
    const values = [...getSiblingName];
    values[i] = event.target.value;
    setSiblingName(values);
  }

  function handleOccupation(i, event) {
    const values = [...getOccupation];
    values[i] = event.target.value;
    setOccupation(values);
  }

  const handleRelation = (i, event) => {
    const values = [...getUserRelation];
    values[i] = event.target.value;
    setUserRelation(values);
  };

  const handlUserId = (e) => {
    setUserId(e.target.value);
    // console.log(e.target.value);
  };

  /*---------------------------------------------------------------------- */

  const [getName, setName] = useState([]);
  const [getCity, setCity] = useState([]);
  const [getAddress, setAddress] = useState([]);

  function handleName(i, event) {
    const values = [...getName];
    values[i] = event.target.value;
    setName(values);
  }

  function handleCity(i, event) {
    const values = [...getCity];
    values[i] = event.target.value;
    setCity(values);
  }

  const handleAddress = (i, event) => {
    const values = [...getAddress];
    values[i] = event.target.value;
    setAddress(values);
  };

  function handleAdd() {
    const values = [...getSiblingName];
    values.push({ value: null });
    setSiblingName(values);
  }

  function handleRemove(i) {
    const values = [...getSiblingName];
    values.splice(i, 1);
    setSiblingName(values);
  }

  // const handleSubmit = () => {
  //   alert(JSON.stringify({ getSiblingName, getOccupation, getUserRelation }));
  // };

  const siblingSubmit = async () => {
    // alert(
    //   JSON.stringify({
    //     getUserId,
    //     getSiblingName,
    //     getOccupation,
    //     getUserRelation,
    //   })
    // );
    let body = {
      user_id: getUserId,
      name: getSiblingName,
      occupation: getOccupation,
      user_relation: getUserRelation,
    };

    let result = await postDataAxios("siblings/addMultiplePerson", body);
    if (result.status) {
      swal("Record Inserted", " ", "success", {
        buttons: false,
      });
    } else {
      swal("Record Not Inserted", " ", "warning", {
        buttons: false,
      });
    }
    // setUserId("");
    // setSiblingName("");
    // setOccupation("");
    // setUserRelation("");
  };

  return (
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

            {getSiblingName.map(
              ({ getSiblingName, getOccupation, getUserRelation }, idx) => {
                return (
                  <div class="form-row">
                    <div class="col-md-3 mb-2">
                      <label for="validationCustom01">siblings Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Sibling name"
                        value={getSiblingName}
                        onChange={(event) => handleSiblingsName(idx, event)}
                      />
                    </div>
                    <div class="col-md-3 mb-2">
                      <label for="validationCustom02">Occupation</label>
                      <select
                        class="form-control"
                        id="status"
                        placeholder="occupation"
                        value={getOccupation}
                        onChange={(event) => handleOccupation(idx, event)}
                      >
                        <option value={"N/A"}>--N/A--</option>
                        <option value={"Farmer"}>Farmer</option>
                        <option value={"Govt Servent"}>Govt Servant</option>
                        <option value={"Defence"}>Defence</option>
                        <option value={"Engineer"}>Engineer</option>
                      </select>
                    </div>
                    <div class="col-md-3 mb-2">
                      <label for="validationCustom02">Realtion</label>
                      <select
                        class="form-control"
                        id="status"
                        placeholder="Qualification"
                        value={getUserRelation}
                        onChange={(event) => handleRelation(idx, event)}
                      >
                        <option value={"N/A"}>--N/A--</option>
                        <option value={"Brother"}>Brother</option>
                        <option value={"Sister"}>Sister</option>
                      </select>
                    </div>
                    <div class="col-md-3 mb-2">
                      <IconButton
                        aria-label="delete"
                        style={{ marginTop: 20, marginLeft: 50 }}
                        onClick={() => handleRemove(idx)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                );
              }
            )}

            <div class="form-row">
              <div class="col-md-3 mb-3">
                <IconButton aria-label="Add" onClick={() => handleAdd()}>
                  <AddIcon />
                </IconButton>
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
                  onClick={siblingSubmit}
                >
                  Submit
                </button>
              </center>
              {/* <button type="button" onClick={() => handleSubmit()}>
                Submit
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
