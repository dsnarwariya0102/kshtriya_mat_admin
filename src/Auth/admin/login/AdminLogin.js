import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import swal from "sweetalert";
import { postData } from "../../../Auth/api/FetchServices";
import valvo from "./vback.png";
import loginwallpaper from "./login.jpg";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function AdminLogin(props) {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getMessage, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    chkToken();
  }, []);

  const chkToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(false);
      props.history.replace({ pathname: "/Dashboard" });
    } else {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = { username: getEmail, password: getPassword };
    let result = await postData("admin/signin", body);

    if (result.status) {
      localStorage.setItem("user", JSON.stringify(result.data));
      localStorage.setItem("token", result.access_token);
      props.history.replace({ pathname: "/Dashboard" });
    } else {
      swal(result.message, " ", "error", {
        buttons: false,
      });
    }
  };

  const renderLoginPage = () => {
    return (
      <div>
        <div id="app">
          <main>
            {/* //"background-image: url('vback.png');background-size: cover;background-repeat:no-repeat;" */}
            <div
              style={{
                backgroundImage: `url(${loginwallpaper})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              class="p-t-b-100 height-full "
            >
              <div class="container pt-5 mt-5">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="text-center text-white">
                      <h1
                        style={{
                          letterSpacing: 1,
                          marginBottom: 20,
                          fontWeight: "normal",
                        }}
                      >
                        ADMIN LOGIN
                      </h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div class="form-group has-icon">
                        <i class="icon-envelope-o"></i>
                        <input
                          required
                          type="email"
                          class="form-control form-control-lg"
                          placeholder="Email Address"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div class="form-group has-icon">
                        <i class="icon-user-secret"></i>
                        <input
                          required
                          type="password"
                          class="form-control form-control-lg"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <input
                        type="submit"
                        class="btn btn-success btn-lg btn-block"
                        value="Log In"
                        style={{
                          background: "#1e212d",
                          fontWeight: "bold",
                          padding: "12px 0",
                          borderRadius: 5,
                        }}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  const style = {
    padding: "300px 0",
    textAlign: "center",
    opacity: 1,
  };

  if (loading) {
    return (
      <div>
        <div style={style}>
          <CircularProgress color="secondary" />
        </div>
      </div>
    );
  }

  return <>{renderLoginPage()}</>;
}
