import React, { useState } from "react";
import logo from "../../Logo/Logo.png";
import styles from "./CreateAccount.module.css";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message,setMessage]=useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = { email, username, password };
    axios
      .post("http://localhost:8000/signup/", postData)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        setMessage("Username and email should be unique. Try Again!")
      });
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
        label="email"
        type="email"
        variant="outlined"
        required
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
       <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        required
        fullWidth
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Create Account
      </Button>
    </Box>
    <p className={styles.err}>{message}</p>
    </div>
  );
};

export default CreateAccount;
