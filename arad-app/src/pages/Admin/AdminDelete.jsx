import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../storageToken/storageToken";
const AdminDelete = ({
  userId = "650ae759db3813a6502fc2fc",
  onDeleteCallback,
}) => {
  const [deleteSuccess, setDeleteSuccess] = useState(undefined);
  const deleteUrl = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`;

  const onDelete = () => {
    const token = getToken();
    axios
      .delete(deleteUrl, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then(() => {
        // Successful deletion
        onDeleteCallback(userId);
        setDeleteSuccess(true);
        console.log("Success Delete");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <Box>
      {deleteSuccess === undefined ? null : deleteSuccess ? (
        <Typography variant="h6">User Deleted Successfully</Typography>
      ) : (
        <Typography variant="h6">Deleting User...</Typography>
      )}
      <button onClick={onDelete}>Click to delete</button>
    </Box>
  );
};

export default AdminDelete;
