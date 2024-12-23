import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, MenuItem, useTheme } from "@mui/material";
import axios from "axios";
import { CREATE_EMPLOYEE, GET_EMPLOYEE_ID } from "../../EndPoints";
import { timedSuccessAlert, userTypes } from "../../utils.js";
import { useSelector } from 'react-redux';

function AddEmployee() {

    const navigate = useNavigate();
    const theme = useTheme();
    const loggedUser = useSelector((state) => state.user);

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
        role: userTypes.WORKER,
    });

    const handleChange = (field, value) => {
        setEmployeeDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    useEffect(() => {
        const loadEmployeeId = async () => {
            axios
                .get(GET_EMPLOYEE_ID, {})
                .then((response) => {
                    console.log(response);
                    handleChange('employeeId', response.data)
                })
                .catch((error) => {
                    console.log(error);
                    //navigate("/error");
                });
        };

        loadEmployeeId();
    }, [navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(CREATE_EMPLOYEE, employeeDetails)
            .then((response) => {
                console.log("sucess response - " + response);
                timedSuccessAlert("Employee Created successfully");
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
                    Add Employee
                </Typography>
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="employeeId"
                    label="Employee Id"
                    name="employeeId"
                    autoComplete="employeeId"
                    value={employeeDetails.employeeId}
                    autoFocus
                    disabled
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    select
                    margin="normal"
                    required
                    fullWidth
                    id="role"
                    label="Role"
                    name="role"
                    autoComplete="role"
                    autoFocus
                    value={employeeDetails.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                > 
                    {loggedUser.userType === userTypes.ADMIN && (
                        <MenuItem key={userTypes.ADMIN} value={userTypes.ADMIN}>
                            {userTypes.ADMIN.toUpperCase()}
                        </MenuItem>
                    )}
                    
                    {Object.values(userTypes)
                        .filter(type => type !== 'admin' && type !== 'customer')
                        .map((type) => (
                            <MenuItem key={type} value={type}>
                                {type.toUpperCase()}
                            </MenuItem>
                        ))}
                </TextField>
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fname"
                    label="First Name"
                    name="fname"
                    autoComplete="fname"
                    autoFocus
                    onChange={(e) => handleChange('firstName', e.target.value)}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lname"
                    label="Last name"
                    name="lname"
                    autoComplete="lname"
                    onChange={(e) => handleChange('lastName', e.target.value)}
                />
            </Grid>

            <Grid item md={4}>
                <TextField
                    margin="normal"
                    type="date"
                    required
                    fullWidth
                    id="dob"
                    name="dob"
                    label="Date of Birth"
                    autoComplete="dob"
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                />
            </Grid>
            <Grid item md={4}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nic"
                    label="NIC"
                    name="nic"
                    autoComplete="nic"
                    onChange={(e) => handleChange('nic', e.target.value)}
                />
            </Grid>
            <Grid item md={4}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="gender"
                    label="Gender"
                    name="gender"
                    autoComplete="gender"
                    onChange={(e) => handleChange('gender', e.target.value)}
                />
            </Grid>

            <Grid item md={3}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="no"
                    label="No"
                    name="no"
                    autoComplete="no"
                    onChange={(e) => handleChange('no', e.target.value)}
                />
            </Grid>
            <Grid item md={5}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="street"
                    label="Street"
                    name="street"
                    autoComplete="street"
                    onChange={(e) => handleChange('street', e.target.value)}
                />
            </Grid>
            <Grid item md={4}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="city"
                    onChange={(e) => handleChange('city', e.target.value)}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="mobileNo"
                    label="Mobile No"
                    name="mobileNo"
                    autoComplete="mobileNo"
                    onChange={(e) => handleChange('mobileNo', e.target.value)}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => handleChange('email', e.target.value)}
                />
            </Grid>

            <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                Add Employee
            </Button>
        </Grid>
    );

}

export default AddEmployee;