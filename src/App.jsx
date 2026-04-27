import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  Edit,
  Delete,
  Add,
} from "@mui/icons-material";

import EmployeeService from "./services/EmployeeService";
import EmployeeForm from "./components/EmployeeForm";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const loadEmployees = useCallback(async () => {
    const data = await EmployeeService.getAll();
    setEmployees(data);
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const handleSave = async (emp) => {
    if (editingEmployee) {
      await EmployeeService.update(editingEmployee.id, emp);
    } else {
      await EmployeeService.create(emp);
    }
    setOpen(false);
    setEditingEmployee(null);
    loadEmployees();
    setToast("Saved successfully");
  };

  const handleDelete = async (id) => {
    await EmployeeService.delete(id);
    loadEmployees();
    setToast("Deleted successfully");
  };

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Employee Manager</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Add Employee
        </Button>
      </Box>

      <TextField
        fullWidth
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Department</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.phone}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => {
                    setEditingEmployee(emp);
                    setOpen(true);
                  }}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(emp.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Form Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editingEmployee ? "Edit Employee" : "Add Employee"}
        </DialogTitle>
        <DialogContent>
          <EmployeeForm
            initialData={editingEmployee}
            onSubmit={handleSave}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Toast */}
      <Snackbar
        open={!!toast}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
      >
        <Alert severity="success">{toast}</Alert>
      </Snackbar>
    </Container>
  );
}
