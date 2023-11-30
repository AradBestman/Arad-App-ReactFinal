import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import homePageNormalization from "../homePageNormalization";
import axios from "axios";
import { getToken } from "../../storageToken/storageToken";
import AdminDelete from "../Admin/AdminDelete";
import { DataGrid } from "@mui/x-data-grid";

const GetAllUsers = () => {
  const [dataFromServer, setDataFromServer] = useState([]);

  useEffect(() => {
    const token = getToken();

    axios
      .get("/users", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then(({ data }) => {
        console.log("dataa", data);

        setDataFromServer(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const handleDelete = (deletedUserId) => {
    setDataFromServer(
      dataFromServer.filter((user) => user._id !== deletedUserId)
    );
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "name",
      headerName: "FirstName",
      width: 150,
      valueGetter: (params) => params.row.name.first,
    },
    {
      field: "MiddleName",
      headerName: "Middle",
      width: 70,
      valueGetter: (params) => params.row.name.middle,
    },
    {
      field: "LastName",
      headerName: "LastName",
      width: 150,
      valueGetter: (params) => params.row.name.last,
    },
    {
      field: "Phone",
      headerName: "Phone",
      width: 150,
      valueGetter: (params) => params.row.phone,
    },
    {
      field: "Email",
      headerName: "Email",
      width: 175,
      valueGetter: (params) => params.row.email,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <AdminDelete userId={params.row._id} onDeleteCallback={handleDelete} />
      ),
    },
  ];

  return (
    <Box>
      <DataGrid
        getRowId={(row) => row._id}
        rows={dataFromServer}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Box>
  );
};

export default GetAllUsers;
