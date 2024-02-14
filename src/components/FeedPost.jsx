import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { getPosts } from "../service/api/request";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { apiInstance } from "../service/axios";

function FeedPost() {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        setPosts(posts);
        console.log(posts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  function convertTime(time) {
    const newDate = new Date(time).toISOString();
    return newDate.split("T")[0];
  }
  const sendComment = async (id) => {
    const postId = id;
    const userId = localStorage.getItem("id");
    const firstname = localStorage.getItem("firstname");
    const lastname = localStorage.getItem("lastname");
    const name = firstname + " " + lastname;
    const commentContent = comment;
    try {
      const res = await apiInstance.post("/comment", {
        postId: postId,
        userId: userId,
        name: name,
        commentContent: commentContent,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const Comments = async () => {
    const id = "65cce599350595fae1c846dd";
    let data = await apiInstance.get(`/comment?id=${id}`);
    console.log(data);
    return (
      <>
        {/* {data.map((content) => {
          <div>
            <div>{content.name}</div>
            <div>{content.commentContent}</div>
          </div>;
        })} */}
      </>
    );
  }

  const handleCommentPost = (e) => {
    setComment(e);
  };

  return (
    <Box
      sx={{
        padding: 2,
        borderLeft: 1,
        borderRight: 1,
        borderColor: "gray",
        height: "100%",
      }}
    >
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
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {feed.avatar}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={feed.name}
              subheader={feed.createdAt}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {feed.content}
              </Typography>
            </CardContent>

            {feed.image !== "" && (
              <CardMedia component="img" height="500" image={feed.image} />
            )}
            <Comments />
            <CardActions
              disableSpacing
              sx={{
                alignSelf: "stretch",
                display: "flex",
                alignItems: "flex-start",
                p: 1,
              }}
            >
              <TextField
                sx={{ width: "100%" }}
                id="comment"
                label="Comment"
                onChange={(e) => {
                  handleCommentPost(e.target.value);
                }}
              />

              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="sent-comment"
                onClick={() => {
                  sendComment(feed._id);
                }}
              >
                <SendIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

export default FeedPost;
