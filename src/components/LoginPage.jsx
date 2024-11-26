import React, { useState } from "react";
import { Box, Button, TextField, Typography, CircularProgress, Alert } from "@mui/material";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "Admin" && password === "Admin") {
      setLoading(true);
      setError("");
      
      setTimeout(() => {
        onLogin();
      }, 3000);
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin(); 
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: 4,
          borderRadius: 2,
          backgroundColor: "white",
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login to RBAC Management
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown} 
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown} 
        />
        <Box sx={{ textAlign: "center", mt: 3 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              fullWidth
              size="large"
            >
              Login
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
