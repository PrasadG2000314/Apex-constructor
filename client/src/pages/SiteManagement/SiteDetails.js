import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, MenuItem, useTheme } from "@mui/material";
import axios from "axios";
import { CREATE_EMPLOYEE, GET_EMPLOYEE_ID } from "../../EndPoints";
import { timedSuccessAlert, userTypes } from "../../utils.js";
import { useSelector } from 'react-redux';

function AddSiteDetails() {

    const navigate = useNavigate();
    const theme = useTheme();
    const loggedUser = useSelector((state) => state.user);

    const [employeeDetails, setEmployeeDetails] = useState({
        custId:"",
        siteId: "",
        dateOfBirth: "",
        siteState: "",
        start: "",
        PhoneNo: "",
        email:"",
       
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
                    handleChange('', response.data)
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
                    Add Site Details
                </Typography>
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id=""
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
                    margin="normal"
                    required
                    fullWidth
                    id="custId"
                    label="custId"
                    name="custId"
                    autoComplete="custId"
                    autoFocus
                    onChange={(e) => handleChange('custId', e.target.value)}
                />
            </Grid>
            <Grid item md={4}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="siteId "
                    name="siteId "
                    label="siteId "
                    autoComplete="siteId "
                    onChange={(e) => handleChange('siteId ', e.target.value)}
                />
            </Grid>
            <Grid item md={4}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="location"
                    label="location"
                    name="location"
                    autoComplete="location"
                    onChange={(e) => handleChange('nic', e.target.value)}
                />
            </Grid>
            <Grid item md={4}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="date"
                    id="start"
                    label="start"
                    name="start"
                    autoComplete="start"
                    onChange={(e) => handleChange('start', e.target.value)}
                />
            </Grid>

            <Grid item md={3}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="date"
                    id="end"
                    label="end"
                    name="end"
                    autoComplete="end"
                    onChange={(e) => handleChange('end', e.target.value)}
                />
            </Grid>
            <Grid item md={5}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id=" notes"
                    label=" notes"
                    name=" notes"
                    autoComplete=" notes"
                    onChange={(e) => handleChange(' notes', e.target.value)}
                />
            </Grid>
        
            
            <Button type="submit" variant="contained" sx={{ mt: 3, width: "20%" }}>
                Cancel
            </Button>

            <Button type="submit" variant="contained" sx={{ mt: 3, width: "20%" }}>
                Conform Site Details 
            </Button>
        </Grid>
    );

}

export default AddSiteDetails;