import React, { useState } from "react";
import { Grid, Typography, AppBar, Toolbar, Box, Button } from "@mui/material";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import LoginPage from "./components/LoginPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [roles, setRoles] = useState([
    { id: "1", name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: "2", name: "Editor", permissions: ["Read", "Write"] },
    { id: "3", name: "Viewer", permissions: ["Read"] },
  ]);

  const [users, setUsers] = useState([
    { id: "101", name: "John Doe", role: "Admin", status: true },
    { id: "102", name: "Jane Smith", role: "Editor", status: false },
    { id: "103", name: "Alice Brown", role: "Viewer", status: true },
  ]);

  const addUser = (user) => setUsers([...users, user]);
  const updateUser = (updatedUser) =>
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  const deleteUser = (id) => setUsers(users.filter((user) => user.id !== id));

  const addRole = (role) => setRoles([...roles, role]);
  const updateRole = (updatedRole) =>
    setRoles(roles.map((role) => (role.id === updatedRole.id ? updatedRole : role)));
  const deleteRole = (id) => setRoles(roles.filter((role) => role.id !== id));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RBAC Management
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, padding: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Role-Based Access Control (RBAC) UI
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <UserManagement
              users={users}
              roles={roles}
              addUser={addUser}
              updateUser={updateUser}
              deleteUser={deleteUser}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RoleManagement
              roles={roles}
              addRole={addRole}
              updateRole={updateRole}
              deleteRole={deleteRole}
              users={users}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          width: "100%",
          backgroundColor: "primary.main",
          color: "white",
          textAlign: "center",
          py: 2,
          mt: "auto",
        }}
      >
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} Role-Based Access Control Management
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
