import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../utils/auth";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar position="fixed" elevation={1} sx={{ bgcolor: "white", color: "text.primary" }}>
        <Toolbar>
          <TaskIcon sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Todo App
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              onClick={() => navigate("/dashboard")}
              startIcon={<DashboardIcon />}
              sx={{
                color: isActive("/dashboard") ? "primary.main" : "text.primary",
                fontWeight: isActive("/dashboard") ? 600 : 400,
              }}
            >
              Dashboard
            </Button>
            <Button
              onClick={() => navigate("/tasks")}
              startIcon={<TaskIcon />}
              sx={{
                color: isActive("/tasks") ? "primary.main" : "text.primary",
                fontWeight: isActive("/tasks") ? 600 : 400,
              }}
            >
              Tasks
            </Button>
            <Button
              onClick={() => setLogoutDialogOpen(true)}
              startIcon={<LogoutIcon />}
              color="error"
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLogout} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
