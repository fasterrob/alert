import {
  Box,
  Typography,
  CardHeader,
  Avatar,
  IconButton,
  Card,
  Stack,
  CardContent,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { apiInstance } from "../../service/axios";

const AdminPosts = ({ posts }) => {
  const convertTime = (time) => {
    let newDate = new Date(time).toISOString().split("T")[0];
    let splitDate = newDate.split("-");

    return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
  };

  const removePost = async (id) => {
    try {
      await apiInstance.delete(`/post/removepost?id=${id}`);
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
          {posts.map((feed) => (
            <Card
              key={feed._id}
              sx={{ minWidth: { xs: 300, sm: 400, md: 500, lg: 600, xl: 700 } }}
            >
              <CardHeader
                sx={{ pb: 0 }}
                avatar={<Avatar aria-label="recipe">{feed.avatar}</Avatar>}
                action={
                  <IconButton
                    aria-label="post-delete"
                    onClick={() => {
                      removePost(feed._id);
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                }
                title={feed.name}
                subheader={convertTime(feed.createdAt)}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {feed.content}
                </Typography>
              </CardContent>

              {feed.image !== "" && (
                <CardMedia
                  component="img"
                  height="500"
                  image={"http://localhost:4000/image/" + feed.image}
                />
              )}
              <CardActions sx={{ justifyContent: "center" }}>
                <Button size="small" onClick={() => seeComment(feed._id)}>
                  See comment
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default AdminPosts;
