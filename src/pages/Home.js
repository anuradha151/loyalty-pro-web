import { TextField, Box, InputAdornment, IconButton, Card, CardContent, Typography, Modal, Avatar, Divider, Button } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { blue } from '@mui/material/colors';

import logo from '../assets/images/logo.png';


function Home() {

  const [searchText, setSearchText] = useState('');
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  function handleSearch() {
    try {
      axios.get(`http://localhost:8080/customer/search?page=0&size=100&query=${searchText}`)
        .then(response => {
          setCustomers(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleOpen = (customer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '100px 0 20px'
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{ width: '200px', height: 'auto' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          sx={{
            width: '50%',
            borderRadius: '50px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
            },
          }}
          id="txtSearch"
          label="Search Customer"
          variant="outlined"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            handleSearch();
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon sx={{ color: blue[500] }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{
          width: '50%', marginTop: 2, overflowY: 'auto',
          maxHeight: '70vh',
        }}>
          {searchText && customers.map((customer) => (
            <Card
              key={customer.uuid}
              sx={{ marginBottom: 2 }}
              onClick={() => handleOpen(customer)}
            >
              <CardContent>
                <Typography variant="h6">{customer.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Email: {customer.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Mobile: {customer.mobile}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Address: {customer.address}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="customer-modal-title"
        aria-describedby="customer-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: 'none',
            boxShadow: 24,
            p: 4,
            borderRadius: 2, // Rounded corners
          }}
        >
          {selectedCustomer && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: blue[500], mr: 2 }}>
                  {selectedCustomer.name.charAt(0)}
                </Avatar>
                <Typography id="customer-modal-title" variant="h6" component="h2">
                  {selectedCustomer.name}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography id="customer-modal-description" sx={{ mt: 2 }}>
                <strong>Email:</strong> {selectedCustomer.email}
              </Typography>
              <Typography id="customer-modal-description" sx={{ mt: 2 }}>
                <strong>Mobile:</strong> {selectedCustomer.mobile}
              </Typography>
              <Typography id="customer-modal-description" sx={{ mt: 2 }}>
                <strong>Address:</strong> {selectedCustomer.address}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                <Button variant="contained" color="primary" onClick={handleClose}>
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default Home;