import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import { Box, TextField, Container, Typography, Stack } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function Customer() {

    const [searchText, setSearchText] = useState('');
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/customer/all")
            .then(response => {
                setCustomers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    function handleSearch() {
        try {
            axios.get(`http://localhost:8080/customer/search?page=0&size=100&query=${searchText}`)
                .then(response => {
                    setCustomers(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };


    return (
        <Container>

            <Box sx={{ width: '100%', margin: 'auto' }}>
                <Stack direction="row" m={2} spacing={1} justifyContent='space-between'>
                    <Typography variant="h4">Valued Customer Finder</Typography>
                    <TextField
                        id="txtSearch"
                        label="Search"
                        variant="outlined"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            handleSearch();
                        }}
                    />
                </Stack>


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Full Name</StyledTableCell>
                                <StyledTableCell align="right">Mobile</StyledTableCell>
                                <StyledTableCell align="right">Email</StyledTableCell>
                                <StyledTableCell align="right">Address</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {customers.length > 0 &&
                            <TableBody>
                                {customers.map((row) => (
                                    <StyledTableRow key={row.uuid}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.mobile}</StyledTableCell>
                                        <StyledTableCell align="right">{row.email}</StyledTableCell>
                                        <StyledTableCell align="right">{row.address}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        }
                    </Table>
                </TableContainer>

            </Box>
        </Container>
    );
}


export default Customer;