/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Stack, TextField, Typography, Snackbar, Alert, AlertTitle, Box, IconButton } from "@mui/material";

import { useNavigate } from 'react-router-dom';

const CustomerEdit = () => {

    const navigate = useNavigate();
    const params = useParams();
    const [customer, setCustomer] = useState({
        cardNumber: '',
        name: '',
        mobile: '',
        email: '',
        address: ''
    });
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/customer/${params.uuid}`);
            setCustomer(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8080/customer`, customer);
            setOpen(true);            
            setTimeout(() => {
                setOpen(false);
            }, 4000);
            navigate('/customer');
        } catch (error) {
            console.error('Error updating data:', error.response.data.message);
            setError(true);
            setErrorMessage(error.response.data.message);
            setTimeout(() => {
                setError(false);
                setErrorMessage('Error occured');
            }, 5000);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box mt={2} mx={4} display="flex" justifyContent="center">
            <Box width="100%" maxWidth="600px">
                <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <Box>
                            <IconButton variant="contained" component={Link} to="/customer" color="info" size="medium">
                                <ArrowBackIcon />
                            </IconButton>
                        </Box>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Customer Edit
                        </Typography>
                    </Stack>
                    <TextField
                        id="cardNumber"
                        name="cardNumber"
                        label="Card Number"
                        variant="outlined"
                        value={customer.cardNumber}
                        onChange={handleChange}
                    />
                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        variant="outlined"
                        value={customer.name}
                        onChange={handleChange}
                    />
                    <TextField
                        id="mobile"
                        name="mobile"
                        label="Mobile"
                        variant="outlined"
                        value={customer.mobile}
                        onChange={handleChange}
                    />
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        value={customer.email}
                        onChange={handleChange}
                    />
                    <TextField
                        id="address"
                        name="address"
                        label="Address"
                        variant="outlined"
                        value={customer.address}
                        onChange={handleChange}
                    />
                    <Stack direction="row" justifyContent='right' spacing={2}>
                        <Button sx={{ maxWidth: '100px' }} component={Link} to="/customer" variant="contained" color="error" >
                            Close
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleUpdate}>
                            Update
                        </Button>
                    </Stack>
                </Stack>
                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleClose} severity="success" action={
                        <Button color="inherit" size="small" onClick={handleClose}>
                            CLOSE
                        </Button>
                    }>
                        <AlertTitle>Success</AlertTitle>
                        Customer details updated successfully.
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={error}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleClose} severity="error" action={
                        <Button color="inherit" size="small" onClick={handleClose}>
                            CLOSE
                        </Button>
                    }>
                        <AlertTitle>Error</AlertTitle>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default CustomerEdit;