import { Paper, Typography, Stack, Avatar, Box, Divider } from "@mui/material";

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

const ProfileCard = ({ user }) => {
  if (!user) return null;
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        minWidth: 0,
        maxWidth: 320,
        mx: "auto",
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
  );
};

export default ProfileCard;
