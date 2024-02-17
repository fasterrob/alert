import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { apiInstance } from "../service/axios";

import AdminPosts from "../components/admin/AdminPosts";
import AdminUsers from "../components/admin/AdminUsers";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isPost, setIsPost] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const responseUsers = await apiInstance.get("/auth/alluser");
      setUsers(responseUsers);
      const responsePosts = await apiInstance.get("/post");
      setPosts(responsePosts);
      console.log(responsePosts);
    };
    fetch();
  }, []);

  const Seemore = () => {
    return <Typography variant="body1">More</Typography>;
  };
  const Close = () => {
    return <Typography variant="body1">Close</Typography>;
  };

  const handleMorePosts = () => {
    setIsPost(!isPost);
  };

  const handleMoreUsers = () => {
    setIsUser(!isUser);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#ff8080",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            ADMIN
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />

        <Box sx={{ display: "flex", justifyContent: "space-around", gap: 5 }}>
          <Box>
            <Card sx={{ minWidth: 200 }}>
              <CardHeader title="Users" />
              <CardContent>
                <Typography variant="h4" component="div" align="center">
                  {users.length}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  size="small"
                  onClick={() => {
                    handleMoreUsers();
                  }}
                >
                  {isUser ? <Close /> : <Seemore />}
                </Button>
              </CardActions>
            </Card>
            {isUser && <AdminUsers users={users} />}
          </Box>

          <Box>
            <Card sx={{ minWidth: 200 }}>
              <CardHeader title="Posts" />
              <CardContent>
                <Typography variant="h4" component="div" align="center">
                  {posts.length}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  size="small"
                  onClick={() => {
                    handleMorePosts();
                  }}
                >
                  {isPost ? <Close /> : <Seemore />}
                </Button>
              </CardActions>
            </Card>
            {isPost && <AdminPosts posts={posts} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminPage;
