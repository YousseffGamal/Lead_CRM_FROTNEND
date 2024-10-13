import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Layout from '../../component/Layout/Layout';

const statesList = [
  { code: 'CA', name: 'California' },
  { code: 'NY', name: 'New York' },
  { code: 'TX', name: 'Texas' },
  { code: 'FL', name: 'Florida' },
  // Add more states as needed
];

const AddLead = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [sellerAddress, setSellerAddress] = useState(''); // State for Seller Address

  return (
    <Layout>
      <Box sx={{ p: 3, backgroundColor: '#F1F1F1', color: '#e0e0e0', marginTop: '65px' }}>
        <Box sx={{
          display: 'flex',
          gap: '25px',
          flexDirection: { xs: 'column', sm: 'row' },
        }}>
          <Box sx={{ flex: 1, position: 'relative' }}>
            <InputLabel
              htmlFor="first-name"
              sx={{
                position: 'absolute',
                left: '10px',
                top: '15px',
                backgroundColor: '#FFFFFF',
                padding: '0 5px',
                zIndex: 1,
                color: '#191919',
                fontFamily: 'LufgaMedium !important',
              }}
              shrink={!!firstName}
            >
              First Name:
            </InputLabel>
            <TextField
              id="first-name"
              variant="outlined"
              sx={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                height: '63px',
                '& .MuiOutlinedInput-root': {
                  border: 'none',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
              }}
              inputProps={{
                style: { textAlign: 'center', paddingTop: '15px' },
              }}
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Box>

          <Box sx={{ flex: 1, position: 'relative' }}>
            <InputLabel
              htmlFor="last-name"
              sx={{
                position: 'absolute',
                left: '10px',
                top: '15px',
                backgroundColor: '#FFFFFF',
                padding: '0 5px',
                zIndex: 1,
                color: '#191919',
                fontFamily: 'LufgaMedium !important',
              }}
              shrink={!!lastName}
            >
              Last Name:
            </InputLabel>
            <TextField
              id="last-name"
              variant="outlined"
              sx={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                height: '63px',
                '& .MuiOutlinedInput-root': {
                  border: 'none',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
              }}
              inputProps={{
                style: { textAlign: 'center', paddingTop: '15px' },
              }}
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
        </Box>

        {/* New row for email input */}
        <Box sx={{ marginTop: '25px', position: 'relative' }}>
          <InputLabel
            htmlFor="email"
            sx={{
              position: 'absolute',
              left: '10px',
              top: '15px',
              backgroundColor: '#FFFFFF',
              padding: '0 5px',
              zIndex: 1,
              color: '#191919',
              fontFamily: 'LufgaMedium !important',
            }}
            shrink={!!email}
          >
            Email:
          </InputLabel>
          <TextField
            id="email"
            variant="outlined"
            sx={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              height: '63px',
              '& .MuiOutlinedInput-root': {
                border: 'none',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
            }}
            inputProps={{
              style: { textAlign: 'center', paddingTop: '15px' },
            }}
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        {/* New row for Phone Number and State input */}
        <Box sx={{
          display: 'flex',
          gap: '25px',
          flexDirection: { xs: 'column', sm: 'row' },
          marginTop: '25px',
        }}>
          <Box sx={{ flex: 1, position: 'relative' }}>
            <InputLabel
              htmlFor="phone-number"
              sx={{
                position: 'absolute',
                left: '10px',
                top: '15px',
                backgroundColor: '#FFFFFF',
                padding: '0 5px',
                zIndex: 1,
                color: '#191919',
                fontFamily: 'LufgaMedium !important',
              }}
              shrink={!!phoneNumber}
            >
              Phone Number:
            </InputLabel>
            <TextField
              id="phone-number"
              variant="outlined"
              sx={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                height: '63px',
                '& .MuiOutlinedInput-root': {
                  border: 'none',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
              }}
              inputProps={{
                style: { textAlign: 'center', paddingTop: '15px' },
              }}
              placeholder="(123) 456-7890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Box>

          <Box sx={{ flex: 1, position: 'relative' }}>
            <InputLabel
              htmlFor="states"
              sx={{
                position: 'absolute',
                left: '10px',
                top: '15px',
                backgroundColor: '#FFFFFF',
                padding: '0 5px',
                zIndex: 1,
                color: '#191919',
                fontFamily: 'LufgaMedium !important',
              }}
              shrink={!!selectedState}
            >
              States:
            </InputLabel>
            <Select
              id="states"
              variant="outlined"
              sx={{
                width: '100%',
                backgroundColor: '#FFFFFF !important',
                borderRadius: '20px !important',
                height: '63px',
                '& .MuiSelect-select': {
                  textAlign: 'center',
                  paddingTop: '15px',
                  backgroundColor: '#FFFFFF !important',
                },
                '&:before, &:after': {
                  border: 'none',
                },
                '&.Mui-focused .MuiSelect-select': {
                  border: 'none',
                },
                '&:hover .MuiSelect-select': {
                  backgroundColor: '#FFFFFF !important',
                  border: 'none',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <MenuItem value="" disabled>Select a state</MenuItem>
              {statesList.map((state) => (
                <MenuItem key={state.code} value={state.code}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        {/* New row for Seller Address */}
        <Box sx={{ marginTop: '25px', position: 'relative' }}>
          <InputLabel
            htmlFor="seller-address"
            sx={{
              position: 'absolute',
              left: '10px',
              top: '15px',
              backgroundColor: '#FFFFFF',
              padding: '0 5px',
              zIndex: 1,
              color: '#191919',
              fontFamily: 'LufgaMedium !important',
            }}
            shrink={!!sellerAddress}
          >
            Seller Address:
          </InputLabel>
          <TextField
            id="seller-address"
            variant="outlined"
            sx={{
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              height: '63px',
              '& .MuiOutlinedInput-root': {
                border: 'none',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
            }}
            inputProps={{
              style: { textAlign: 'center', paddingTop: '15px' },
            }}
            placeholder="123 Main St, City, State"
            value={sellerAddress}
            onChange={(e) => setSellerAddress(e.target.value)}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default AddLead;
