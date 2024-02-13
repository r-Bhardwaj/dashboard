import React, { useState } from "react";
import logo from "../../Logo/Logo.png";
import styles from "./ForgotPassword.module.css";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message,setMessage]=useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData={email}
    axios
      .post("http://localhost:8000/forgotPassword/",postData)
      .then((res) => {
        setMessage(res.data)
      })
      .catch((err) => {});
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
      {message}
      <TextField
        label="Email Address"
        type="email"
        variant="outlined"
        required
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Send
      </Button>
    </Box>
    </div>
  );
};

export default ForgotPassword;
