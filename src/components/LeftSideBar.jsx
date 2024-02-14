import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import CampaignIcon from "@mui/icons-material/Campaign";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { auth } from "../service/api/request";

function LeftSideBar({ isMap, onTick, closeMap }) {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    async function fetchUser() {
      try {
        const user = {
          email: email,
          password: password,
        };
        const aftauth = await auth(user);
        if (aftauth.status !== 404) {
          setIsLoggedIn(true);
        }
        console.log(aftauth);
        localStorage.setItem("id", aftauth._id);
        localStorage.setItem("firstname", aftauth.firstname);
        localStorage.setItem("lastname", aftauth.lastname);
        setUser(aftauth);
      } catch (error) {
        console.log(error);
      }
    }
    if (email) {
      fetchUser();
    }
  }, []);

  function LoginButton() {
    function login() {
      useNavigate("/login");
    }
    return (
      <Button
        variant="text"
        sx={{
          backgroundColor: "#ff8080",
          color: "#fff",
          padding: "12px",
          borderRadius: "30px",
          width: { xs: "150px", xl: "250px" },
        }}
        component={RouterLink}
        to="/login"
      >
        LOGIN
      </Button>
    );
  }

  function Profile() {
    function LogOut() {
      localStorage.clear();
      setIsLoggedIn(false);
    }
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            margin: 1,
            width: { xs: "150px", xl: "250px" },
          }}
        >
          <Avatar
            sx={{
              width: { xs: "40px", xl: "60px" },
              height: { xs: "40px", xl: "60px" },
              fontSize: { xs: "15px", xl: "30px" },
              mr: 1,
            }}
          >
            T
          </Avatar>
          <Box>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: { xs: "15", xl: "25px" },
                fontWeight: "600",
              }}
            >
              {user.firstname}
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: { xs: "15", xl: "25px" },
                fontWeight: "600",
              }}
            >
              {user.lastname}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="text"
          sx={{
            backgroundColor: "#ff8080",
            color: "#fff",
            padding: "12px",
            borderRadius: "30px",
            width: { xs: "150px", xl: "250px" },
          }}
          onClick={LogOut}
        >
          LOG OUT
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          ml: 5,
          mt: 2,
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <CampaignIcon sx={{ color: "black", fontSize: "50px" }} />
        <Button
          variant="text"
          sx={{ mt: 2, color: "#000", justifyContent: "flex-start" }}
          size="large"
          onClick={closeMap}
          startIcon={<HomeIcon />}
        >
          <Typography
            sx={{
              color: "#000",
              fontWeight: "600",
              fontSize: "25px",
            }}
          >
            Home
          </Typography>
        </Button>

        <Button
          variant="text"
          sx={{ mt: 2, color: "#000", justifyContent: "flex-start" }}
          size="large"
          onClick={onTick}
          startIcon={<MapIcon />}
        >
          <Typography
            sx={{
              color: "#000",
              fontWeight: "600",
              fontSize: "25px",
            }}
          >
            Map
          </Typography>
        </Button>
        <Button
          variant="text"
          sx={{ mt: 2, color: "#000", justifyContent: "flex-start" }}
          size="large"
          startIcon={<VerifiedUserIcon />}
        >
          <Typography
            sx={{
              color: "#000",
              fontWeight: "600",
              fontSize: "25px",
            }}
          >
            Verified
          </Typography>
        </Button>

        <Box sx={{ position: "absolute", bottom: "40px" }}>
          {isLoggedIn && <Profile />}
          {!isLoggedIn && <LoginButton />}
        </Box>
      </Box>
    </>
  );
}

export default LeftSideBar;
