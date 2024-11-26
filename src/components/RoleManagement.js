import React, { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material";

const RoleManagement = ({ roles, addRole, updateRole, deleteRole, users }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ id: "", name: "", permissions: [] });
  const [availablePermissions] = useState(["Read", "Write", "Delete"]);
  const [error, setError] = useState(""); 
  const [formError, setFormError] = useState(""); 

  const handleOpen = () => {
    setOpen(true);
    setFormError("");
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ id: "", name: "", permissions: [] });
    setFormError("");
  };

  const handleSubmit = () => {
    if (!formData.name || formData.permissions.length === 0) {
      setFormError("Both Role Name and Permissions are required.");
      return;
    }

    if (formData.id) {
      updateRole(formData); 
    } else {
      addRole({ ...formData, id: Date.now().toString() }); 
    }

    handleClose();
  };

  const togglePermission = (permission) => {
    const updatedPermissions = formData.permissions.includes(permission)
      ? formData.permissions.filter((perm) => perm !== permission)
      : [...formData.permissions, permission];
    setFormData({ ...formData, permissions: updatedPermissions });
  };

  const handleEdit = (role) => {
    setFormData(role);
    handleOpen();
  };

  const handleDelete = (roleId) => {
    const roleInUse = users.some((user) => user.role === roles.find((r) => r.id === roleId).name);
    if (roleInUse) {
      setError("This role is currently assigned to a user and cannot be deleted.");
      setTimeout(() => setError(""), 3000); 
      return;
    }
    deleteRole(roleId);
  };

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Role Management
      </Typography>
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
        Add Role
      </Button>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  {role.permissions.map((perm) => (
                    <Chip key={perm} label={perm} sx={{ mr: 1 }} />
                  ))}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(role)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(role.id)}>
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
            {formData.id ? "Edit Role" : "Add Role"}
          </Typography>
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}
          <TextField
            label="Role Name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={!formData.name && formError}
            helperText={!formData.name && formError ? "Role Name is required." : ""}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              Permissions
            </Typography>
            {availablePermissions.map((perm) => (
              <Chip
                key={perm}
                label={perm}
                onClick={() => togglePermission(perm)}
                color={formData.permissions.includes(perm) ? "primary" : "default"}
                sx={{ mr: 1, mb: 1, cursor: "pointer" }}
              />
            ))}
            {formError && formData.permissions.length === 0 && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                At least one permission is required.
              </Typography>
            )}
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

export default RoleManagement;
