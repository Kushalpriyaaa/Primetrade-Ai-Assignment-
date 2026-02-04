import { useState } from "react";
import ProfileCard from "./ProfileCard";
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
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

          {/* Desktop Nav */}
          {!isMobile && (
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
          )}

          {/* Mobile Nav */}
          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 260, pt: 2 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          {/* ProfileCard for mobile */}
          {user && (
            <Box sx={{ mb: 2 }}>
              <ProfileCard user={user} />
            </Box>
          )}
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/dashboard")}
                selected={isActive("/dashboard")}
              >
                <ListItemIcon>
                  <DashboardIcon color={isActive("/dashboard") ? "primary" : "inherit"} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/tasks")}
                selected={isActive("/tasks")}
              >
                <ListItemIcon>
                  <TaskIcon color={isActive("/tasks") ? "primary" : "inherit"} />
                </ListItemIcon>
                <ListItemText primary="Tasks" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setLogoutDialogOpen(true)}>
                <ListItemIcon>
                  <LogoutIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ color: "error.main" }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

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
