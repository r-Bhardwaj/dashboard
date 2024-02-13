import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", flex: 0.1 },
  { field: "sku", headerName: "SKU", flex: 0.15 },
  { field: "name", headerName: "Name", flex: 0.15 },
  {
    field: "category",
    headerName: "Category",
    flex: 0.15,
  },
  {
    field: "tags",
    headerName: "Tags",
    description: "This column has a value getter and is not sortable.",
    flex: 0.15,
  },
  {
    field: "stock_status",
    headerName: "Stock Status",
    type: "number",
    flex: 0.15,
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <span
          style={{
            color: params.value <= 0 ? "red" : "green",
            marginLeft: "3.5rem",
          }}
        >
          &#11044;
        </span>
        <span style={{ marginLeft: "4.5rem" }}>{params.value}</span>
      </div>
    ),
  },
  {
    field: "available_stock",
    headerName: "Available Stock",
    type: "number",
    flex: 0.15,
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <span
          style={{
            color: params.value <= 0 ? "red" : "green",
            marginLeft: "3.5rem",
          }}
        >
          &#11044;
        </span>
        <span style={{ marginLeft: "4.5rem" }}>{params.value}</span>
      </div>
    ),
  },
];

const Table = (props) => {
  const items = props.items.map((item) => {
    const resolvedCategory = props.categories.find(
      (category) => category.id === item.category
    )?.name;
    const resolvedTags = item.tags.map(
      (tagId) => props.tags.find((tag) => tag.id === tagId)?.name
    );
    return { ...item, category: resolvedCategory, tags: resolvedTags };
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={items}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default Table;
