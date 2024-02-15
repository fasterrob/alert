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
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";

function FeedPost() {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [commentId, setCommentID] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        setPosts(posts);
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

  const handleCommentPost = (e) => {
    setComment(e);
  };

  const seeComment = (id) => {
    handleClose();
    console.log(id);
    setCommentID(id);
  };

  const handleClose = () => {
    setOpen(!open);
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Comment</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={{
              width: "500px",
              height: "600px",
            }}
          ></Box>
        </DialogContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            justifyItems: "start",
            gap: 2,
            p: 2,
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
        </Box>
      </Dialog>
    </Box>
  );
}

export default FeedPost;
