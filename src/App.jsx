import * as React from "react";
import Grid from "@mui/material/Grid";

import LeftSideBar from "./components/LeftSideBar";
import NewPost from "./components/NewPost";
import FeedPost from "./components/FeedPost";
import MapBox from "./components/MapBox";
import { useState } from "react";

function App() {
  const [isMap, setIsMap] = useState(false);

  function handleOpenMap() {
    setIsMap(true);
  }

  function handleCloseMap(){
    setIsMap(false);
  }

  function FullMap() {
    return (
      <Grid item xs={6}>
        <MapBox isMap={isMap} />
      </Grid>
    );
  }

  function HalfMap() {
    return (
      <>
        <Grid item xs={9} md={9} lg={6} xl={6.6}>
          <NewPost />
          <FeedPost />
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
          <LeftSideBar isMap={isMap} onTick={handleOpenMap} closeMap={handleCloseMap} />
        </Grid>
        {isMap ? <FullMap /> : <HalfMap />}
      </Grid>
    </>
  );
}

export default App;
