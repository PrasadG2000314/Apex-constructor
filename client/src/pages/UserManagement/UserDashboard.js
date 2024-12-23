import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { TextField, Typography, Button, Grid, useTheme } from "@mui/material";
import axios from "axios";
import ProfileSidebar from "../../components/ProfileSidebar";
import { CHANGE_PASSWORD, SEARCH_EMPLOYEE, UPDATE_EMPLOYEE, SEARCH_CUSTOMER_BY_USER, UPDATE_CUSTOMER } from "../../EndPoints";
import AddEmployee from "./AddEmployee";
import { errorAlert, timedSuccessAlert, userTypes } from "../../utils.js";
import { BorderAll } from "@mui/icons-material";
import ViewEmployee from "./ViewEmployee";
import AddSiteDetails from "../SiteManagement/SiteDetails.js";

export default function UserDashboard() {

    const navigate = useNavigate();
    const loggedUser = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [selectedContent, setSelectedContent] = useState("profile");

    const handleSidebarItemClick = (content) => {
        setSelectedContent(content);
    };

    useEffect(() => {
        if (!loggedUser || !token) {
            navigate('/login');
        }else{
            console.log(loggedUser.userType);
        }
    }, []);

    return (
        <Grid container spacing={3} style={{ marginTop: 60 }}>
            <Grid item xs={3}>
                <ProfileSidebar onItemClick={handleSidebarItemClick} />
            </Grid>
            <Grid item xs={9}>
                <main>
                    {(selectedContent === "profile" && loggedUser.userType == userTypes.CUSTOMER) && <CustomerProfile />}
                    {(selectedContent === "profile" && loggedUser.userType != userTypes.CUSTOMER) && <EmployeeProfile />}
                    {selectedContent === "addEmployee" && <AddEmployee />}
                    {selectedContent === "viewEmployee" && <ViewEmployee />}
                    {selectedContent === "siteDetails" && <AddSiteDetails />}
                    {selectedContent === "changePassword" && <ChangePassword setSelectedContent={setSelectedContent} />}
                </main>
            </Grid>
        </Grid>
    );
}

function EmployeeProfile() {

    const navigate = useNavigate();
    const theme = useTheme();

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

    const loggedUser = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    useEffect(() => {
        if (!loggedUser || !token) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const loadProfile = async () => {
            axios
                .get(SEARCH_EMPLOYEE + loggedUser._id + "/userId", {})
                .then((response) => {
                    console.log(response);
                    const employee = response.data;
                    setEmployeeDetails({
                        employeeId: employee.employeeId,
                        firstName: employee.firstName,
                        lastName: employee.lastName,
                        dateOfBirth: employee.dateOfBirth,
                        gender: employee.gender,
                        nic: employee.nic,
                        no: employee.no,
                        street: employee.street,
                        city: employee.city,
                        mobileNo: employee.mobileNo,
                        email: employee.email,
                        role: employee.role
                    });
                })
                .catch((error) => {
                    console.log(error);
                    //navigate("/error");
                });
        };

        loadProfile();
    }, [navigate]);

    const handleChange = (field, value) => {
        setEmployeeDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .put(UPDATE_EMPLOYEE, employeeDetails)
            .then((response) => {
                console.log("sucess response - " + response);
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
                    Personal Profile
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
                    margin="normal"
                    required
                    fullWidth
                    id="role"
                    label="Role"
                    name="role"
                    autoComplete="role"
                    value={employeeDetails.role}
                    autoFocus
                    disabled
                />
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
                    value={employeeDetails.firstName}
                    autoFocus
                    disabled
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
                    value={employeeDetails.lastName}
                    disabled
                />
            </Grid>

            <Grid item md={4}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="dob"
                    name="dob"
                    label="Date of Birth"
                    autoComplete="dob"
                    value={employeeDetails.dateOfBirth.substring(0, 10)}
                    disabled
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
                    value={employeeDetails.nic}
                    disabled
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
                    value={employeeDetails.gender}
                    disabled
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
                    value={employeeDetails.no}
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
                    value={employeeDetails.street}
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
                    value={employeeDetails.city}
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
                    value={employeeDetails.mobileNo}
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
                    value={employeeDetails.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                />
            </Grid>

            <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                Edit
            </Button>
        </Grid>
    );
}

function CustomerProfile() {

    const navigate = useNavigate();
    const theme = useTheme();

    const [customerDetails, setCustomerDetails] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        nic: "",
        no: "",
        street: "",
        city: "",
        companyName: "",
        businessType: "",
        mobileNo: "",
        email: "",
    });

    const loggedUser = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    useEffect(() => {

        if (!loggedUser || !token) {
            navigate('/login');
        }

    }, []);

    useEffect(() => {
        const loadProfile = async () => {
            axios
                .get(SEARCH_CUSTOMER_BY_USER + loggedUser._id, {})
                .then((response) => {
                    console.log(response);
                    const customer = response.data;
                    setCustomerDetails({
                        firstName: customer.firstName,
                        lastName: customer.lastName,
                        dateOfBirth: customer.dateOfBirth,
                        nic: customer.nic,
                        no: customer.no,
                        street: customer.street,
                        city: customer.city,
                        companyName: customer.companyName,
                        businessType: customer.businessType,
                        mobileNo: customer.mobileNo,
                        email: customer.email,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    //navigate("/error");
                });
        };

        loadProfile();
    }, [navigate]);

    const handleChange = (field, value) => {
        setCustomerDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(UPDATE_CUSTOMER, customerDetails)
            .then((response) => {
                console.log("sucess response - " + response);
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
                    Personal Profile
                </Typography>
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
                    value={customerDetails.firstName}
                    autoFocus
                    disabled
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
                    value={customerDetails.lastName}
                    disabled
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="dob"
                    name="dob"
                    label="Date of Birth"
                    autoComplete="dob"
                    value={customerDetails.dateOfBirth.substring(0, 10)}
                    disabled
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nic"
                    label="NIC"
                    name="nic"
                    autoComplete="nic"
                    value={customerDetails.nic}
                    disabled
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
                    value={customerDetails.no}
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
                    value={customerDetails.street}
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
                    value={customerDetails.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="companyName"
                    label="Company Name"
                    name="companyName"
                    autoComplete="companyName"
                    value={customerDetails.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="businessType"
                    label="Business Type"
                    name="businessType"
                    autoComplete="businessType"
                    value={customerDetails.businessType}
                    onChange={(e) => handleChange('businessType', e.target.value)}
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
                    value={customerDetails.mobileNo}
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
                    value={customerDetails.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                />
            </Grid>

            <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                Edit
            </Button>
        </Grid>
    );
}

function ChangePassword(props) {

    const theme = useTheme();
    const loggedUser = useSelector((state) => state.user);

    const [userDetails, setUserDetails] = useState({
        email: loggedUser.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (field, value) => {
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (userDetails.newPassword.length < 8) {
            errorAlert("Password must be at least 8 characters long.");
            return;
        }

        if (userDetails.newPassword !== userDetails.confirmPassword) {
            errorAlert("New Password and password confirmation does not match");
            return;
        }

        axios
            .put(CHANGE_PASSWORD, userDetails)
            .then((response) => {
                console.log("sucess response - " + response);
                timedSuccessAlert("Password Changed successfully");
                props.setSelectedContent("profile");
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
                    Change Password
                </Typography>
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
                    value={loggedUser.email}
                    disabled
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="current-password"
                    label="Current Password"
                    type="password"
                    id="current-password"
                    autoComplete="current-password"
                    onChange={(e) => handleChange('currentPassword', e.target.value)}
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="new-password"
                    label="New Password"
                    type="password"
                    id="new-password"
                    autoComplete="new-password"
                    onChange={(e) => handleChange('newPassword', e.target.value)}
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    autoComplete="confirm-password"
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                />
            </Grid>

            <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                Change Password
            </Button>
        </Grid>
    );

}