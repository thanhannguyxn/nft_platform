import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Mocked user credentials for demo purpose
  const mockedUser = {
    email: 'demo@example.com',
    password: 'password123',
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    // Mock sign-in check (using hardcoded credentials)
    if (email === mockedUser.email && password === mockedUser.password) {
      setIsAuthenticated(true);
      localStorage.setItem('user_id', 'demoUser123');
      alert('Successfully logged in!');
      navigate('/');
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <Box sx={{width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", py: 4 }}>
      <Container maxWidth="sm">
        <Paper elevation={10} sx={{ p: 4, borderRadius: 3, bgcolor: "#1e1e1e", color: "white", boxShadow: "0px 8px 20px rgba(255, 204, 0, 0.5)" }}>
          <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: "bold", color: "#FFCC00" }}>
            Sign In
          </Typography>

          {errorMessage && (
            <Typography align="center" sx={{ color: "#FF5555", mb: 2, fontWeight: "bold" }}>
              {errorMessage}
            </Typography>
          )}

          <form onSubmit={handleSignIn}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "gray" },
                  "&:hover fieldset": { borderColor: "#FFCC00" },
                  "&.Mui-focused fieldset": { borderColor: "#FFCC00" },
                },
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "gray" },
                  "&:hover fieldset": { borderColor: "#FFCC00" },
                  "&.Mui-focused fieldset": { borderColor: "#FFCC00" },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                bgcolor: "#FFCC00",
                color: "black",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "black",
                  color: "#FFCC00",
                },
              }}
            >
              Sign In
            </Button>
          </form>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography component="a" href="/signup" variant="body2" sx={{ color: "#FFCC00", mt: 2, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
                {"Don't have an account? Sign Up"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignIn;

