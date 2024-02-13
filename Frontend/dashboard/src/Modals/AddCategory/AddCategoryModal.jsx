import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import styles from "./AddCategoryModal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddCategoryModal = (props) => {
  const [category, setCategory] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { name: category };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${window.localStorage
        .getItem("token")
        .replace(/["']/g, "")}`,
    };
    axios
      .post("http://localhost:8000/category/", postData, { headers })
      .then((res) => {
        setMessage(`"${category}" category added`);
      })
      .catch((error) => {
        setMessage("Try Again");
      });
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          sx={style}
          onSubmit={handleSubmit}
          className={styles.modal}
        >
          <TextField
            label="category"
            variant="outlined"
            required
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {message}
          <Button type="submit" variant="contained" fullWidth>
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddCategoryModal;
