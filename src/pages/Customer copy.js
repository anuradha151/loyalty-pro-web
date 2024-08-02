import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import { Box, Container, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import {
    TablePagination,
    tablePaginationClasses as classes,
} from '@mui/base/TablePagination';


function Customer() {

    const [data, setData] = useState([]); // State to store fetched data
    const [page, setPage] = useState(0); // Current page index
    const [rowsPerPage, setRowsPerPage] = useState(10); // Number of rows per page
    const [isLoading, setIsLoading] = useState(false); // Loading state for data fetching

    // API endpoint URL (replace with your actual API URL)
    const apiUrl = 'http://localhost:8080/customer';

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${apiUrl}?page=${page}&size=${rowsPerPage}`);
                console.log('Data fetched:', response.data.data);
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

    }, [page, rowsPerPage, apiUrl]); // Re-fetch data on page/rowsPerPage change

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        // Reset page to the first page when rows per page changes
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;


    return (
        <Container>

            <Box sx={{ width: '100%', margin: 'auto', paddingTop: '10pt' }}>

                <Typography variant="h4">Valued Customer Finder</Typography>

                <Root sx={{ maxWidth: '100%'}}>
                    {isLoading ? (
                        <p>Loading data...</p>
                    ) : (
                        <table aria-label="custom pagination table">
                            <thead>
                                <tr>
                                    <th>FullName</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(rowsPerPage > 0
                                    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : data
                                ).map((row) => (
                                    <tr key={row.uuid}>                            
                                        <td style={{ width: 400 }} align="right">
                                            {row.name}

                                        </td>
                                        <td style={{ width: 400 }} align="right">
                                        {row.mobile}
                                        </td>
                                        
                                        <td style={{ width: 500 }} align="right">
                                            {row.email}
                                        </td>
                                        <td style={{ width: 800 }} align="right">
                                            {row.address}
                                        </td>
                                    </tr>
                                ))}
                                {emptyRows > 0 && (
                                    <tr style={{ height: 41 * emptyRows }}>
                                        <td colSpan={3} aria-hidden />
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <CustomTablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={4}
                                        count={data.length}
                                        // Total count based on API response (if available)
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        slotProps={{
                                            select: {
                                                'aria-label': 'rows per page',
                                            },
                                            actions: {
                                                showFirstButton: true,
                                                showLastButton: true,
                                            },
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </tr>
                            </tfoot>
                        </table>
                    )}
                </Root>

            </Box>
        </Container>
    );
}

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Root = styled('div')(
    ({ theme }) => `
    table {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.875rem;
      border-collapse: collapse;
      width: 100%;
    }
  
    td,
    th {
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
      text-align: left;
      padding: 8px;
    }
  
    th {
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    }
    `,
);

const CustomTablePagination = styled(TablePagination)`
    & .${classes.toolbar} {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  
    & .${classes.selectLabel} {
      margin: 0;
    }
  
    & .${classes.displayedRows} {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
  
    & .${classes.spacer} {
      display: none;
    }
  
    & .${classes.actions} {
      display: flex;
      gap: 0.25rem;
    }
  `;

export default Customer;