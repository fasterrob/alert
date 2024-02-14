import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CampaignIcon from "@mui/icons-material/Campaign";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { auth } from "../service/api/request";

const defaultTheme = createTheme();

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSuccess(false);
      setLoading(true);
      const user = { email, password };
      const response = await auth(user);

      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      navigate("/");
    } catch (error) {
      setErrorMessage("Error : " + error.message);
    } finally {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              borderRadius: 5,
              flexDirection: "column",
              backgroundColor: "#FCFFFD",
              padding: 5,
              boxShadow: 2,
              alignItems: "center",
            }}
          >
            <Avatar sx={{ width: 70, height: 70, m: 1, bgcolor: "#FFBE98" }}>
              <CampaignIcon sx={{ fontSize: "50px" }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleChangeEmail}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChangePassword}
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="initial">
                    {errorMessage}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#FFBE98" }}
              >
                Login
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "#00FF00",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="body2"
                    sx={{ color: "#FFBE98" }}
                  >
                    Don't have an account Sign up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default LoginForm;
