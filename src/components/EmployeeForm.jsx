return (
  <Box sx={{ mt: 1 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      {initialData ? "Edit Employee" : "Add Employee"}
    </Typography>

    <Stack spacing={2}>
      <TextField
        label="Name"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
      />

      <TextField
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
      />

      <TextField
        label="Phone"
        value={form.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        error={!!errors.phone}
        helperText={errors.phone}
        inputProps={{ maxLength: 10 }}
        fullWidth
      />

      <TextField
        label="Department"
        value={form.department}
        onChange={(e) => handleChange("department", e.target.value)}
        error={!!errors.department}
        helperText={errors.department}
        fullWidth
      />

      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={onCancel}
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          Cancel
        </Button>

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          {submitting ? "Saving..." : initialData ? "Update" : "Create"}
        </Button>
      </Stack>
    </Stack>
  </Box>
);
