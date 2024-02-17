import {
  Box,
  Typography,
  CardHeader,
  IconButton,
  Card,
  Stack,
  CardContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { apiInstance } from "../../service/axios";

const AdminUsers = ({ users }) => {
  const removeUser = async (id) => {
    try {
      await apiInstance.delete(`/auth/removeuser?id=${id}`);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Box mt={1}>
        <Stack
          spacing={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {users.map((user, index) => (
            <Card key={user._id} sx={{ minWidth: 400 }}>
              <CardHeader
                sx={{ pb: 0 }}
                action={
                  <IconButton
                    aria-label="post-delete"
                    onClick={() => {
                      removeUser(user._id);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                }
                title={index + 1}
              />
              <CardContent>
                <Typography variant="body">
                  User: {user.firstname + " " + user.lastname}
                </Typography>
                <Typography variant="body2">Email: {user.email}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default AdminUsers;
