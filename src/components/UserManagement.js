import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Alert,
  MenuItem,
} from "@mui/material";

const UserManagement = ({ users, roles, addUser, updateUser, deleteUser }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ id: "", name: "", role: "", status: true });
  const [deleteError, setDeleteError] = useState(""); 
  const [formTouched, setFormTouched] = useState(false); 

  const handleOpen = () => {
    setOpen(true);
    setFormTouched(false); 
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ id: "", name: "", role: "", status: true });
    setDeleteError(""); 
  };

  const handleSubmit = () => {
    setFormTouched(true); 
    if (!formData.name.trim() || !formData.role) {
      
      return;
    }

    if (formData.id) {
      updateUser(formData); 
    } else {
      addUser({ ...formData, id: Date.now().toString() }); 
    }

    handleClose();
  };

  const handleEdit = (user) => {
    setFormData(user);
    handleOpen();
  };

  const toggleStatus = (user) => {
    updateUser({ ...user, status: !user.status });
  };

  const handleDelete = (user) => {
    if (user.status) {
      setDeleteError("Active users cannot be deleted. Please deactivate the user first.");
      setTimeout(() => setDeleteError(""), 3000); 
      return;
    }
    deleteUser(user.id);
  };

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        User Management
      </Typography>
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
        Add User
      </Button>
      {deleteError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {deleteError}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.status}
                    onChange={() => toggleStatus(user)}
                    color="primary"
                  />
                  {user.status ? "Active" : "Inactive"}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(user)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(user)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            padding: 2,
            backgroundColor: "white",
            margin: "5% auto",
            width: "90%",
            maxWidth: 400,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {formData.id ? "Edit User" : "Add User"}
          </Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={formTouched && !formData.name}
            helperText={formTouched && !formData.name ? "Please enter a valid name." : ""}
          />
          <TextField
            select
            label="Role"
            fullWidth
            margin="normal"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            error={formTouched && !formData.role}
            helperText={formTouched && !formData.role ? "Please select a role." : ""}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.name}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ mt: 2 }}>
            <Switch
              checked={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
              color="primary"
            />
            {formData.status ? "Active" : "Inactive"}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
};

export default UserManagement;
