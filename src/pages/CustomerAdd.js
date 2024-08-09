import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Stack, TextField, Typography, Snackbar, Alert, AlertTitle, Box, IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function CustomerAdd() {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        cardNumber: '',
        name: '',
        email: '',
        mobile: '',
        address: ''
    });
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAdd = async () => {
        try {
            const response = await axios.post('http://localhost:8080/customer', customer, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                setOpen(true);
                navigate('/customer');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'An error occurred');
            setError(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setError(false);
    };

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
                            Customer Add
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
                        <Button  component={Link} to="/customer" variant="contained" color="error" >
                            Close
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleAdd}>
                            Save
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
                        Customer crated successfully.
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
}

export default CustomerAdd;