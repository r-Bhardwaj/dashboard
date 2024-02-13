import React, { useState } from "react";
import logo from "../../Logo/Logo.png";
import axios from "axios";
import styles from "./Login.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { TextField, Button, Box } from "@mui/material";
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    // Implement login functionality
    e.preventDefault();
    const postData = { username, password };
    login("");
    axios
      .post("http://localhost:8000/login/", postData)
      .then((res) => {
        login(res.data.token);
      })
      .catch((err) => {
        setMessage("Invalid username or password");
      });
  };

  const handleCreateAccount = () => {
    navigate("/createAccount");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={logo}></img>
        <h1>Kaizntree</h1>
      </div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "30%",
          margin: "auto",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          label="username"
          variant="outlined"
          required
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          required
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.button}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, mr: 2, width: "90%" }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2, ml: 2, width: "90%" }}
            onClick={handleCreateAccount}
          >
            Create Account
          </Button>
        </div>
      </Box>
      <p className={styles.err}>{message}</p>
      <Link to="/forgotPassword">Forgot Password?</Link>
    </div>
  );
};

export default Login;
