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
import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function NewPost() {
  const [id, setId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const [isLogin, setIsLogin] = useState(false);
  const [content, setContent] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 13.7563,
    lng: 100.5018,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    async function getUser() {
      const localId = localStorage.getItem("id");
      setId(localId);
      setFirstname(localStorage.getItem("firstname"));
      setLastname(localStorage.getItem("lastname"));
      if (localId != "") {
        setIsLogin(true);
      }
    }
    getUser();
  }, [isLogin]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    // create the preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const handleClickOpen = () => {
    if (isLogin || content === "") {
      handleSnackbarOpen();
      return;
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

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = () => {
    setOpenSnackbar(true);
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      const data = {
        userId: id,
        avatar: firstname[0],
        name: firstname + " " + lastname,
        content: content,
        image: "",
        lat: Number(selectedLocation.lat),
        lng: Number(selectedLocation.lng),
      };
      if (selectedFile === undefined) {
        await apiInstance.post("post/newpost", data);
      } else {
        formData.append("image", selectedFile);
        formData.append("data", JSON.stringify(data));
        console.log(formData);

        await apiInstance.post("/post/newpost", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      window.location.reload(false);
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
          padding: "0px 30px",
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
            sx={{ width: "100%", margin: "10px 0 " }}
            id="outlined-basic"
            label="What is happening?"
            variant="outlined"
            multiline
            onChange={(e) => {
              handleContentOnChange(e.target.value);
            }}
          />
          {selectedFile && <img src={preview} height={200} />}
        </Box>

        <Box
          gap={2}
          sx={{
            display: "flex",
            padding: "10px 20px",
            borderColor: "black",
            borderWidth: "5px",
            justifyContent: "space-between",
          }}
        >
          <TextField
            sx={{ borderRadius: "50px" }}
            type="file"
            onChange={onSelectFile}
          />
          <Button
            variant="text"
            sx={{
              backgroundColor: "#ff8080",
              borderRadius: "30px",
              color: "white",
              padding: "12px",
              width: "100px",
            }}
            onClick={() => {
              handleClickOpen();
            }}
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
      <Snackbar
        anchorOrigin={{ vertical: "buttom", horizontal: "right" }}
        autoHideDuration={6000}
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message="Please Login"
      />
    </>
  );
}

export default NewPost;
