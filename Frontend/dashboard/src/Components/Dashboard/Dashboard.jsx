import React, { useState, useEffect } from "react";
import Table from "../Table/Table";
import axios from "axios";
import { useAuth } from "../../Hooks/useAuth";
import styles from "./Dashboard.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddCategoryModal from "../../Modals/AddCategory/AddCategoryModal";
import AddItemModal from "../../Modals/AddItem/AddItemModal";
import LogoutIcon from "@mui/icons-material/Logout";
import ListIcon from "@mui/icons-material/List";

const drawerWidth = 200;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Token ${window.localStorage
    .getItem("token")
    .replace(/["']/g, "")}`,
};

const Dashboard = () => {
  const { logout } = useAuth();
  const [searchValue, setSearchValue] = useState(null);
  const [items, setItems] = useState([]);
  const [categoryModal, setCategoryModal] = useState(false);
  const [itemModal, setItemModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    console.log(headers)
    axios
      .get("http://localhost:8000/tag/", {
        headers,
      })
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/items/", {
        headers,
      })
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [itemModal]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/category/", {
        headers,
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categoryModal]);

  const handleLogout = () => {
    logout();
  };

  const handleAddNewCategory = (e) => {
    e.preventDefault();
    setCategoryModal(true);
  };

  const handleAddNewItem = (e) => {
    e.preventDefault();
    setItemModal(true);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        ></AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <List sx={{ flexGrow: 1 }}>
            {["Items"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListIcon />
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />

          <List>
            {["Log Out"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <LogoutIcon />
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <div>
            <div className={styles.total}>
              <div className={styles.header}>
                <h3>Item Dashboard</h3>
                <p>All Items</p>
              </div>

              <div className={styles.list}>
                <div className={styles.item}>
                  <p>Total Categories</p>
                  <p>{categories.length}</p>
                </div>
                <div className={styles.item}>
                  <p>Total Items</p>
                  <p>{items.length}</p>
                </div>
              </div>
            </div>

            <div className={styles.addItems}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddNewCategory}
                className={styles.addCategory}
              >
                NEW ITEM CATEGORY
              </Button>
              <div className={styles.search}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddNewItem}
                  className={styles.newButton}
                >
                  NEW ITEM
                </Button>

                <Autocomplete
                  className={styles.auto}
                  id="search"
                  freeSolo
                  options={items.map((option) => option.name)}
                  renderInput={(params) => (
                    <TextField {...params} label="Search" />
                  )}
                  onChange={(event, value) => {
                    setSearchValue(value);
                  }}
                />
              </div>
            </div>
            <Table
              items={
                searchValue
                  ? items.filter((item) => item.name === searchValue)
                  : items
              }
              categories={categories}
              tags={tags}
            />
          </div>
        </Box>
      </Box>
      <AddCategoryModal
        open={categoryModal}
        close={() => {
          setCategoryModal(false);
        }}
      />
      <AddItemModal
        open={itemModal}
        close={() => {
          setItemModal(false);
        }}
        categories={categories}
        tags={tags}
      />
    </>
  );
};

export default Dashboard;
