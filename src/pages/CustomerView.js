/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from 'react-router-dom';
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";


const CustomerView = () => {

    const params = useParams();
    const [customer, setCustomer] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/customer/${params.uuid}`);
            setCustomer(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container>

            <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                    <Box>
                        <IconButton variant="contained" component={Link} to="/" color="info" size="medium">
                            <ArrowBackIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Customer Details
                    </Typography>
                </Stack>
                <Typography variant="h6" component="h2" gutterBottom>
                    Name:  {customer.name}
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    Mobile: {customer.mobile}
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    Email: {customer.email}
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    Address: {customer.address}
                </Typography>



            </Stack>
        </Container>
    );
}

export default CustomerView;