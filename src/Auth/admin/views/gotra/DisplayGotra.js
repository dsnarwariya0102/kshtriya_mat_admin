import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import MaterialTable from "material-table";
import {
  getDataAxios,
  putDataAxios,
  deleteDataAxios,
} from "../../../api/FetchServices";
// import { RestoreOutlined } from "@material-ui/icons";
const style = {
  maxWidth: 500,
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
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export default function DisplayGotra() {
  const classes = useStyles();

  const [getOpenModal, setOpenModal] = useState(false);

  const [getColumn, setColumn] = useState({
    columns: [
      { title: "Id", field: "gotra_id" },
      { title: "Name", field: "gotra_name" },
    ],
  });

  const [getGotraList, setGotraList] = useState([]);
  const [getGotraId, setGotraId] = useState("");
  const [GotraName, setGotraName] = useState("");

  useEffect(function () {
    fetchGotraData();
  }, []);

  const fetchGotraData = async () => {
    let list = await getDataAxios("gotra/display");
    if (list.status) {
      console.log(list);
      setGotraList(list.data);
    }
  };

  const handleOrderDelete = async (oldData) => {
    let result = await deleteDataAxios(`gotra/delete/${oldData.gotra_id}`);
    if (result.status) {
      fetchGotraData();
    }
  };

  const handleModalOpen = (rowData) => {
    setOpenModal(true);
    setGotraId(rowData.gotra_id);
    setGotraName(rowData.gotra_name);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    let body = { gotra_name: GotraName };
    let result = await putDataAxios(`gotra/edit/${getGotraId}`, body);
    if (result.status) {
      alert(result.message);
      setOpenModal(false);
      fetchGotraData();
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const editGotra = () => {
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
                  <h6>Edit Gotra </h6>
                </div>

                <div class="card-body">
                  <div class="needs-validation">
                    <form className="body mt-3" onSubmit={handleEdit}>
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

                      <button className="btn btn-primary btn-block">
                        Edit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  };

  return (
    <div>
      <MaterialTable
        title="Gotra List"
        columns={getColumn.columns}
        data={getGotraList}
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
            onClick: (event, rowData) => handleModalOpen(rowData),
          },
        ]}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();

                const data = [...getGotraList];
                data.slice(data.indexOf(oldData), 1);
                setGotraList(data);
                handleOrderDelete(oldData);
              }, 600);
            }),
        }}
      />
      {editGotra()}
    </div>
  );
}
