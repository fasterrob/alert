import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import {
  APIProvider,
  Map,
  InfoWindow,
  Marker,
} from "@vis.gl/react-google-maps";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { apiInstance } from "../service/axios";

function MapBox({ isMap }) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    async function getMarkers() {
      const res = await apiInstance.get("/post");
      setMarkers(res);
    }
    getMarkers();
  }, []);

  // const markers = [
  //   {
  //     lat: 13.750755914801118,
  //     lng: 100.51398795776369,
  //     content: "This is marker 1",
  //   },
  //   {
  //     lat: 13.772181201133272,
  //     lng: 100.54832023315431,
  //     content: "This is marker 2",
  //   },
  //   {
  //     lat: 13.763575940989671,
  //     lng: 100.52038595745604,
  //     content: "This is marker 3",
  //   },
  //   {
  //     lat: 13.679868480698959,
  //     lng: 100.53871652038264,
  //     content: "This is marker 4",
  //   },
  // ];

  const position = { lat: 13.7563, lng: 100.5018 };
  const [selectedMarker, setSelectedMarker] = useState(null);
  const handleMarkerClick = (marker) => setSelectedMarker(marker);

  if (!isMap) {
    return (
      <>
        <Box
          sx={{
            position: "fixed",
            width: "350px",
            height: "600px",
            backgroundColor: "whitesmoke",
            borderRadius: "20px",
            margin: 3,
            padding: 2,
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: "3px" }}>
            What's happening? {isMap}
          </Typography>

          <APIProvider apiKey="AIzaSyAZ8mte6Bej6rxY27J5EBThAQYePrT0tDg">
            <div style={{ height: "95%" }}>
              <Map zoom={11} center={position} mapId={"168cb60ea2f2d43b"}>
                {markers.map((e, index) => (
                  <Marker
                    key={index}
                    position={{ lat: Number(e.lat), lng: Number(e.lng) }}
                    onClick={() => handleMarkerClick(e)}
                  />
                ))}
                {selectedMarker && (
                  <InfoWindow
                    position={selectedMarker}
                    onClose={() => setSelectedMarker(null)}
                  >
                    <p>{selectedMarker.content}</p>
                    <h6>post by: {selectedMarker.name.split()[0]}</h6>
                  </InfoWindow>
                )}
              </Map>
            </div>
          </APIProvider>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box
          sx={{
            width: "80vw",
            height: "90vh",
            backgroundColor: "whitesmoke",
            borderRadius: "20px",
            margin: 3,
            padding: 2,
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: "3px" }}>
            What's happening?
          </Typography>
          <APIProvider apiKey="AIzaSyAZ8mte6Bej6rxY27J5EBThAQYePrT0tDg">
            <div style={{ height: "95%" }}>
              <Map zoom={11} center={position} mapId={"168cb60ea2f2d43b"}>
                {markers.map((marker) => (
                  <Marker
                    key={marker.lat + marker.lng}
                    position={marker}
                    onClick={() => handleMarkerClick(marker)}
                  />
                ))}
                {selectedMarker && (
                  <InfoWindow
                    position={selectedMarker}
                    onClose={() => setSelectedMarker(null)}
                  >
                    <p>{selectedMarker.content}</p>
                    <br />
                    <h5 align="end">not verified</h5>
                    <h5 align="end">post by: {selectedMarker.name}</h5>
                  </InfoWindow>
                )}
              </Map>
            </div>
          </APIProvider>
        </Box>
      </>
    );
  }
}

export default MapBox;
