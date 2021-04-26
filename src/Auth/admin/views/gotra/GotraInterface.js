import React, { useState } from "react";
import { postDataAxios } from "../../../api/FetchServices";

/**
 * @author
 * @function GotraInterface
 **/

const style = {
  maxWidth: 500,
  borderRadius: 5,
  background: "#fff",
  boxShadow: "0 0 10px -1px #ccc",
};
export default function GotraInterface(props) {
  const [GotraName, setGotraName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = { gotra_name: GotraName };
    let result = await postDataAxios("gotra/add", body);
    if (result.status) {
      alert(result.message);
      setGotraName("");
    }
  };

  return (
    <div className="container mt-4">
      <div style={style}>
        <div class="card-header white">
          <h6>Add New Gotra </h6>
        </div>

        <div class="card-body">
          <div class="needs-validation">
            <form className="body mt-3" onSubmit={handleSubmit}>
              <div className="row clearfix mb-3">
                <div className="col">
                  <input
                    type="text"
                    value={GotraName}
                    placeholder="Name"
                    className="form-control"
                    onChange={(e) => setGotraName(e.target.value)}
                  />
                </div>
              </div>

              <button className="btn btn-primary btn-block">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
