import { useEffect, useState } from "react";
import API from "../Services/api";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Checkbox,
  ButtonGroup,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    setActionLoading(true);
    try {
      await API.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error("Failed to add task:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const updateTask = async (id) => {
    if (!editTitle.trim()) return;
    setActionLoading(true);
    try {
      await API.put(`/tasks/${id}`, { title: editTitle });
      setEditId(null);
      setEditTitle("");
      fetchTasks();
    } catch (err) {
      console.error("Failed to update task:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const toggleComplete = async (id, completed) => {
    setActionLoading(true);
    try {
      await API.put(`/tasks/${id}`, { completed: !completed });
      fetchTasks();
    } catch (err) {
      console.error("Failed to toggle task:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setActionLoading(true);
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (search && !task.title.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (filter === "completed" && !task.completed) return false;
    if (filter === "pending" && task.completed) return false;
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

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
          justifyContent: "center"
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "900px", px: 3 }}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              My Tasks
            </Typography>
            <Stack direction="row" spacing={2} mt={2}>
              <Typography variant="body2" color="text.secondary">
                Total: {stats.total}
              </Typography>
              <Typography variant="body2" color="success.main">
                Completed: {stats.completed}
              </Typography>
              <Typography variant="body2" color="warning.main">
                Pending: {stats.pending}
              </Typography>
            </Stack>
          </Paper>

          <Paper elevation={2} sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <TextField
                fullWidth
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={actionLoading}
                onKeyPress={(e) => {
                  if (e.key === "Enter") addTask();
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                onClick={addTask}
                disabled={actionLoading || !title.trim()}
                sx={{ minWidth: 100 }}
              >
                {actionLoading ? <Loader size={24} /> : "Add"}
              </Button>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
              <TextField
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="small"
                sx={{ flex: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <ButtonGroup size="small">
                <Button
                  variant={filter === "all" ? "contained" : "outlined"}
                  onClick={() => setFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={filter === "pending" ? "contained" : "outlined"}
                  onClick={() => setFilter("pending")}
                >
                  Pending
                </Button>
                <Button
                  variant={filter === "completed" ? "contained" : "outlined"}
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </Button>
              </ButtonGroup>
            </Stack>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <Loader />
              </Box>
            ) : filteredTasks.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  {search || filter !== "all" ? "No tasks found" : "No tasks yet. Add one to get started!"}
                </Typography>
              </Box>
            ) : (
              <List sx={{ p: 0 }}>
                {filteredTasks.map((task) => (
                  <ListItem
                    key={task._id}
                    sx={{
                      borderBottom: "1px solid #e0e0e0",
                      "&:last-child": { borderBottom: "none" },
                    }}
                    secondaryAction={
                      editId === task._id ? (
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            onClick={() => updateTask(task._id)}
                            color="primary"
                            size="small"
                          >
                            <SaveIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setEditId(null);
                              setEditTitle("");
                            }}
                            size="small"
                          >
                            <CloseIcon />
                          </IconButton>
                        </Stack>
                      ) : (
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            onClick={() => {
                              setEditId(task._id);
                              setEditTitle(task.title);
                            }}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => deleteTask(task._id)}
                            color="error"
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      )
                    }
                  >
                    <Checkbox
                      checked={task.completed}
                      onChange={() => toggleComplete(task._id, task.completed)}
                      disabled={editId === task._id || actionLoading}
                    />
                    {editId === task._id ? (
                      <TextField
                        fullWidth
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        size="small"
                        autoFocus
                        onKeyPress={(e) => {
                          if (e.key === "Enter") updateTask(task._id);
                        }}
                      />
                    ) : (
                      <ListItemText
                        primary={task.title}
                        primaryTypographyProps={{
                          sx: {
                            textDecoration: task.completed ? "line-through" : "none",
                            color: task.completed ? "text.secondary" : "text.primary",
                          },
                        }}
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Tasks;
