import React,{useState} from 'react'
import logo from "../../Logo/Logo.png";
import styles from "./ResetPassword.module.css";
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      const postData={password}
      axios
      .post("http://localhost:8000/resetPassword/",postData)
      .then((res) => {
        navigate("/");
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
      '& .MuiTextField-root': { m: 1 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width:'30%',
      margin:'auto'
    }}
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit}
  >
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
      Confirm
    </Button>
  </Box>
     </div>
  )
}

export default ResetPassword