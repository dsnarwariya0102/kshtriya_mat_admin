import axios from "axios";
import swal from "sweetalert";
var ServerURL = "http://localhost:3001";

const token = async () => {
  try {
    var url = `${ServerURL}/authenticate`;

    var config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const response = await axios.post(url, {}, config);

    var result = response.data;

    return result.access_token;
  } catch (error) {
    return { status: false };
  }
};

const postData = async (Url, body, config) => {
  try {
    var url = `${ServerURL}/${Url}`;
    config = { "content-type": "application/json;charset=utf-8" };
    const response = await axios.post(url, body, config);
    var result = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

const postDataAxios = async (Url, body, config) => {
  try {
    var url = `${ServerURL}/${Url}`;
    var config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await axios.post(url, body, config);
    if (response.data.message == "Invalid Token") {
      swal("session Expired!", "Please Login again", "error", {
        buttons: false,
      });
      setTimeout(() => window.location.replace("/AdminLogin"), 2000);
    } else {
      var result = response.data;
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

const getDataAxios = async (Url) => {
  try {
    var url = `${ServerURL}/${Url}`;

    var config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${await token()}`,
      },
    };

    var response = await axios.get(url, config);
    if (response.data.message == "Invalid Token") {
      swal("session Expired!", "Please Login again", "error", {
        buttons: false,
      });
      setTimeout(() => window.location.replace("/AdminLogin"), 2000);
    } else {
      var result = response.data;
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

const postDataAndImageAxios = async (Url, body) => {
  try {
    var url = `${ServerURL}/${Url}`;
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    var response = await axios.post(url, body, config);
    if (response.data.message == "Invalid Token") {
      swal("session Expired!", "Please Login again", "error", {
        buttons: false,
      });
      setTimeout(() => window.location.replace("/AdminLogin"), 2000);
    } else {
      var result = response.data;
      return result;
    }
  } catch (e) {
    console.log(e);
  }
};

const putDataAxios = async (Url, body) => {
  try {
    var url = `${ServerURL}/${Url}`;
    const config = {
      headers: {
        "content-type": "application/json;charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await axios.put(url, body, config);
    if (response.data.message == "Invalid Token") {
      swal("session Expired!", "Please Login again", "error", {
        buttons: false,
      });
      setTimeout(() => window.location.replace("/AdminLogin"), 2000);
    } else {
      var result = response.data;
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

const patchDataAxios = async (Url, body) => {
  try {
    var url = `${ServerURL}/${Url}`;
    const config = {
      headers: {
        "content-type": "application/json;charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await axios.patch(url, body, config);
    if (response.data.message == "Invalid Token") {
      swal("session Expired!", "Please Login again", "error", {
        buttons: false,
      });
      setTimeout(() => window.location.replace("/AdminLogin"), 2000);
    } else {
      var result = response.data;
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteDataAxios = async (Url) => {
  try {
    var url = `${ServerURL}/${Url}`;
    const config = {
      headers: {
        "content-type": "application/json;charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await axios.delete(url, config);
    if (response.data.message == "Invalid Token") {
      swal("session Expired!", "Please Login again", "error", {
        buttons: false,
      });
      setTimeout(() => window.location.replace("/AdminLogin"), 2000);
    } else {
      var result = response.data;
      console.log(result);
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  ServerURL,
  getDataAxios,
  postDataAxios,
  postDataAndImageAxios,
  putDataAxios,
  patchDataAxios,
  deleteDataAxios,
  postData,
};
