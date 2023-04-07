import React, { useState } from "react";
import { Button, MenuItem, Select, TextField } from "@mui/material";

export function MyForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    gender: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        label="First Name"
        sx={{ m: 1 }}
      />

      <TextField
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        label="Last Name"
        sx={{ m: 1 }}
      />

      <Select
        name="country"
        value={formData.country}
        onChange={handleChange}
        label="Country"
        sx={{ m: 1 }}
      >
        <MenuItem value="usa">USA</MenuItem>
        <MenuItem value="canada">Canada</MenuItem>
        <MenuItem value="mexico">Mexico</MenuItem>
      </Select>

      <Select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        label="Gender"
        sx={{ m: 1 }}
      >
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="nonbinary">Non-binary</MenuItem>
      </Select>

      <Button type="submit" variant="contained" sx={{ m: 1 }}>
        Submit
      </Button>
    </form>
  );
}
