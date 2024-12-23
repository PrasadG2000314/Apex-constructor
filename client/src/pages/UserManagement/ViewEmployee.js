import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, FormControlLabel, Radio, RadioGroup, useTheme } from "@mui/material";
import axios from "axios";
import { CREATE_EMPLOYEE, GET_EMPLOYEE_ID, SEARCH_EMPLOYEE } from "../../EndPoints";
import { timedSuccessAlert, userTypes } from "../../utils.js";
import { useSelector } from 'react-redux';

function ViewEmployee() {

    const navigate = useNavigate();
    const theme = useTheme();

    const [searchData, setsearchData] = useState({
        value: "",
        searchBy: "",
    });

    const [employeeDetails, setEmployeeDetails] = useState({
        employeeId: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        nic: "",
        no: "",
        street: "",
        city: "",
        mobileNo: "",
        email: "",
        role: "",
    });

    const handleChange = (field, value) => {
        setsearchData((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .get(SEARCH_EMPLOYEE + searchData.value + "/" + searchData.searchBy, {})
            .then((response) => {
                console.log(response);
                setEmployeeDetails(response.data);
                console.log(employeeDetails.lastName);
            })
            .catch((error) => {
                console.log(error);
                //navigate("/error");
            });
    };

    return (
        <Grid
            container
            spacing={2}
            component="form"
            sx={theme.palette.gridBody}
            noValidate
            onSubmit={handleSubmit}
        >
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    View Employee
                </Typography>
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="search"
                    label="Search"
                    name="search"
                    autoComplete="search"
                    autoFocus
                    onChange={(e) => handleChange('value', e.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <RadioGroup aria-label="searchBy" name="searchBy" onChange={(e) => handleChange('searchBy', e.target.value)}>
                    <FormControlLabel value="employeeId" control={<Radio />} label="Employee ID" />
                    <FormControlLabel value="email" control={<Radio />} label="Email" />
                </RadioGroup>
            </Grid>

            <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                Search Employee
            </Button>
        </Grid>
    );

}

export default ViewEmployee;