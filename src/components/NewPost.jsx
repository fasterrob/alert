import React, { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { apiInstance } from "../service/axios";

function NewPost() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLogin, setIsLogin] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [id, setId] = useState("");
  const [content, setContent] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 13.7563,
    lng: 100.5018,
  });

  useEffect(() => {
    function getUser() {
      setId(localStorage.getItem("id"));
      setFirstname(localStorage.getItem("firstname"));
      setLastname(localStorage.getItem("lastname"));
    }
    getUser();
  }, []);

  const handleClickOpen = () => {
    if (isLogin) {
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleContentOnChange = (e) => {
    setContent(e);
  };

  const handlePost = async () => {
    try {
      const data = {
        userId: id,
        avatar: firstname[0],
        name: firstname + " " + lastname,
        content: content,
        image: "",
        lat: Number(selectedLocation.lat),
        lng: Number(selectedLocation.lng),
      };
      console.log(data);
      const res = await apiInstance.post("/post/newpost", data);
      console.log(res);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.detail.latLng.lat,
      lng: event.detail.latLng.lng,
    });
  };

  return (
    <>
      <Box
        sx={{
          padding: " 0px 30px",
          border: 1,
          borderTop: 0,
          borderColor: "gray",
        }}
      >
        <Box
          sx={{
            padding: "10px 20px",
            borderColor: "black",
            borderWidth: "5px",
          }}
        >
          <Typography variant="h4" color="initial" sx={{ fontWeight: 600 }}>
            Home
          </Typography>
          <TextField
            sx={{ width: "100%", margin: "10px 0 0 0" }}
            id="outlined-basic"
            label="What is happening?"
            variant="outlined"
            multiline
            onChange={(e) => {
              handleContentOnChange(e.target.value);
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: "10px 20px",
            borderColor: "black",
            borderWidth: "5px",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="text"
            sx={{
              backgroundColor: "#ff8080",
              borderRadius: "30px",
              color: "white",
              padding: "12px",
              width: "150px",
            }}
          >
            Upload Photo
          </Button>

          <Button
            variant="text"
            sx={{
              backgroundColor: "#ff8080",
              borderRadius: "30px",
              color: "white",
              padding: "12px",
              width: "80px",
            }}
            onClick={handleClickOpen}
          >
            POST
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Location</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={{
              width: "500px",
              height: "600px",
            }}
          >
            <APIProvider apiKey="AIzaSyAZ8mte6Bej6rxY27J5EBThAQYePrT0tDg">
              <div style={{ height: "100%" }}>
                <Map
                  zoom={13}
                  center={selectedLocation}
                  onClick={handleMapClick}
                  mapId={"168cb60ea2f2d43b"}
                >
                  <Marker position={selectedLocation} />
                </Map>
              </div>
            </APIProvider>
          </Box>
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
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outlined" onClick={handlePost}>
            POST
          </Button>
        </Box>
        {selectedLocation.lat !== 0 && selectedLocation.lng !== 0 && (
          <div>
            Selected Latitude: {selectedLocation.lat}
            <br />
            Selected Longitude: {selectedLocation.lng}
          </div>
        )}
      </Dialog>
    </>
  );
}

export default NewPost;
