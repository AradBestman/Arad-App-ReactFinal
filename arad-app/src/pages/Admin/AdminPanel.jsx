import { Typography, Box } from "@mui/material";
import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import GetAllUsers from "../getAllUsers/GetAllUsers";
import AdminDelete from "./AdminDelete";

const AdminPanel = () => {
  return (
    <Fragment>
      <Typography sx={{ my: 2, padding: 4, textAlign: "center" }} variant="h3">
        Admin Panel
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            textAlign: "center",
          }}
          component={<GetAllUsers />}
          to="/admin/allUsers"
        >
          View All Users
        </Link>
      </Box>

      <Outlet />
    </Fragment>
  );
};
export default AdminPanel;
