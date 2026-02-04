import { useEffect, useState } from "react";
import API from "../Services/api";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Grid,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, tasksRes] = await Promise.all([
          API.get("/me"),
          API.get("/tasks"),
        ]);
        setUser(userRes.data);
        setTasks(tasksRes.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <Box 
          sx={{ 
            minHeight: "100vh", 
            width: "100%", 
            bgcolor: "#f5f5f5", 
            pt: 10, 
            pb: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Loader />
        </Box>
      </>
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const recentTasks = tasks.slice(0, 4);

  return (
    <>
      <Navbar />
      <Box 
        sx={{ 
          minHeight: "100vh", 
          width: "100%", 
          bgcolor: "#f5f5f5", 
          pt: 10, 
          pb: 6,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start"
        }}
      >
        <Box sx={{ width: "100%", display: "flex", gap: 4, px: 4 }}>
          
          {/* Left Side - Profile Card */}
          <Box sx={{ width: "300px", flexShrink: 0 }}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                position: "sticky",
                top: "80px"
              }}
            >
              <Typography variant="h6" fontWeight={600} mb={3}>
                Profile
              </Typography>
              
              <Stack spacing={2} alignItems="center" mb={3}>
                <Avatar
                  sx={{
                    width: 90,
                    height: 90,
                    bgcolor: "primary.main",
                    fontSize: 36,
                    fontWeight: 600,
                  }}
                >
                  {getInitials(user?.name)}
                </Avatar>
                <Box textAlign="center">
                  <Typography variant="h6" fontWeight={600} mb={0.5}>
                    {user?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user?.email}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>
                    Member Since
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {formatDate(user?.createdAt)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>
                    Account Status
                  </Typography>
                  <Typography variant="body2" color="success.main" fontWeight={500}>
                    Active
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Box>

          {/* Right Side - Main Content */}
          <Box sx={{ flex: 1, maxWidth: "900px", margin: "0 auto" }}>
            
            {/* Welcome Section */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                mb: 4,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                textAlign: "center",
                bgcolor: "#fff"
              }}
            >
              <Typography variant="h4" fontWeight={500} color="text.primary" mb={1}>
                {getGreeting()}, {user?.name?.split(" ")[0]}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Stay focused and organized
              </Typography>
            </Paper>

            {/* Stats Section */}
            <Grid container spacing={3} mb={4}>
              <Grid item xs={12} sm={4}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3.5, 
                    textAlign: "center",
                    border: "1px solid #e0e0e0",
                    borderRadius: 2
                  }}
                >
                  <Typography variant="body2" color="text.secondary" mb={1} fontWeight={500}>
                    Total Tasks
                  </Typography>
                  <Typography variant="h2" fontWeight={600} color="text.primary">
                    {totalTasks}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3.5, 
                    textAlign: "center",
                    border: "1px solid #e0e0e0",
                    borderRadius: 2
                  }}
                >
                  <Typography variant="body2" color="text.secondary" mb={1} fontWeight={500}>
                    Completed
                  </Typography>
                  <Typography variant="h2" fontWeight={600} color="#2e7d32">
                    {completedTasks}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3.5, 
                    textAlign: "center",
                    border: "1px solid #e0e0e0",
                    borderRadius: 2
                  }}
                >
                  <Typography variant="body2" color="text.secondary" mb={1} fontWeight={500}>
                    Pending
                  </Typography>
                  <Typography variant="h2" fontWeight={600} color="#ed6c02">
                    {pendingTasks}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Recent Tasks Card */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 3,
                border: "1px solid #e0e0e0",
                borderRadius: 2
              }}
            >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={3}
                >
                  <Typography variant="h6" fontWeight={600}>
                    Recent Tasks
                  </Typography>
                  <Typography
                    component="button"
                    variant="body2"
                    onClick={() => navigate("/tasks")}
                    sx={{ 
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 500,
                      color: "primary.main",
                      "&:hover": {
                        textDecoration: "underline"
                      }
                    }}
                  >
                    View all →
                  </Typography>
                </Stack>

                {recentTasks.length === 0 ? (
                  <Box 
                    sx={{ 
                      textAlign: "center", 
                      py: 6,
                      color: "text.secondary"
                    }}
                  >
                    <Typography variant="body2">
                      No tasks yet. Create your first task to get started.
                    </Typography>
                  </Box>
                ) : (
                  <Stack spacing={2}>
                    {recentTasks.map((task) => (
                      <Box
                        key={task._id}
                        sx={{
                          p: 2,
                          border: "1px solid #e0e0e0",
                          borderRadius: 1.5,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          bgcolor: "#fafafa",
                          transition: "all 0.2s",
                          "&:hover": {
                            bgcolor: "#f5f5f5",
                            borderColor: "#d0d0d0"
                          }
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: task.completed ? "line-through" : "none",
                            color: task.completed ? "text.secondary" : "text.primary",
                            fontWeight: task.completed ? 400 : 500
                          }}
                        >
                          {task.title}
                        </Typography>
                        <Chip
                          label={task.completed ? "Done" : "Pending"}
                          size="small"
                          sx={{
                            bgcolor: task.completed ? "#e8f5e9" : "#fff3e0",
                            color: task.completed ? "#2e7d32" : "#ed6c02",
                            fontWeight: 500,
                            border: "none"
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                )}
              </Paper>
          </Box>

        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
