import * as React from "react";
import Grid from "@mui/material/Grid";

import LeftSideBar from "./components/LeftSideBar";
import NewPost from "./components/NewPost";
import FeedPost from "./components/FeedPost";
import MapBox from "./components/MapBox";
import PostsHistory from "./components/PostsHistory";
import { useState } from "react";

function App() {
  const [isMap, setIsMap] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  

  const handleOpenMap = () => {
    setIsHistory(false);
    setIsMap(true);
  };

  const handleCloseMap = () => {
    setIsHistory(false);
    setIsMap(false);
  };

  const handleOpenHistory = () => {
    setIsHistory(true);
    setIsMap(false);
  };

  function FullMap() {
    return (
      <Grid item xs={6}>
        <MapBox isMap={isMap} />
      </Grid>
    );
  }

  const Post = () => {
    return (
      <>
        <NewPost />
        <FeedPost />
      </>
    );
  };

  const History = () => {
    return (
      <>
        <PostsHistory />
      </>
    );
  };

  function HalfMap() {
    return (
      <>
        <Grid item xs={9} md={9} lg={6} xl={6.6}>
          {isHistory ? <History /> : <Post />}
        </Grid>
        <Grid item sx={{ display: { xs: "none", lg: "block" } }} lg={3}>
          <MapBox isMap={isMap} />
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid
        sx={{ flexGrow: 1 }}
        container
        spacing={2}
        // justifyContent="space-between"
      >
        <Grid item xs={3} md={3} lg={2}>
          <LeftSideBar
            onTick={handleOpenMap}
            closeMap={handleCloseMap}
            onTickHistory={handleOpenHistory}
          />
        </Grid>
        {isMap ? <FullMap /> : <HalfMap />}
      </Grid>
    </>
  );
}

export default App;
