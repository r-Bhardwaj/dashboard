import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import styles from "./AddItemModal.module.css";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddItemModal = (props) => {
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState([]);
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [stockStatus, setStockStatus] = useState(null);
  const [availableStock, setAvailableStock] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      sku,
      name,
      category,
      tags: tag,
      stock_status: stockStatus,
      available_stock: availableStock,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${window.localStorage
        .getItem("token")
        .replace(/["']/g, "")}`,
    };
    axios
      .post("http://localhost:8000/items/", postData, { headers })
      .then((res) => setMessage("Item added"))
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
            label="sku"
            variant="outlined"
            required
            fullWidth
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
          <TextField
            label="name"
            variant="outlined"
            required
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              required
              onChange={handleChange}
            >
              {props.categories.map((x) => (
                <MenuItem key={x.id} value={x.id}>
                  {x.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={tag}
              onChange={handleTagChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {props.tags.map((x) => (
                <MenuItem key={x.id} value={x.id}>
                  <Checkbox checked={tag.indexOf(x) > -1} />
                  <ListItemText primary={x.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="stock status"
            variant="outlined"
            required
            fullWidth
            type="number"
            value={stockStatus}
            onChange={(e) => setStockStatus(parseInt(e.target.value))}
          />
          <TextField
            label="available stock"
            variant="outlined"
            required
            fullWidth
            type="number"
            value={availableStock}
            onChange={(e) => setAvailableStock(parseInt(e.target.value))}
          />
          {message}
          <Button type="submit" variant="contained" fullWidth>
            Add Item
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddItemModal;
