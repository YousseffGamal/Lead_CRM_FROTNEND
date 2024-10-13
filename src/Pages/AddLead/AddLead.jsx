import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button, // Ensure Button is imported

} from '@mui/material';
import Layout from '../../component/Layout/Layout';

const statesList = [
  { code: 'CA', name: 'California' },
  { code: 'NY', name: 'New York' },
  { code: 'TX', name: 'Texas' },
  { code: 'FL', name: 'Florida' },
  // Add more states as needed
];

const listingOptions = [
  { value: 'for_sale', label: 'For Sale' },
  { value: 'for_rent', label: 'For Rent' },
  { value: 'sold', label: 'Sold' },
  // Add more listing options as needed
];

const occupancyOptions = [
  { value: 'occupied', label: 'Occupied' },
  { value: 'vacant', label: 'Vacant' },
  { value: 'under_contract', label: 'Under Contract' },
  // Add more occupancy options as needed
];

const leadTemperatureOptions = [
  { value: 'hot', label: 'Hot' },
  { value: 'warm', label: 'Warm' },
  { value: 'cold', label: 'Cold' },
  // Add more temperature options as needed
];

const closingOptions = [
  { value: 'closed', label: 'Closed' },
  { value: 'pending', label: 'Pending' },
  { value: 'open', label: 'Open' },
  // Add more closing options as needed
];

const AddLead = () => {
  const [askingPrice, setAskingPrice] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [sellerAddress, setSellerAddress] = useState('');
  const [selectedListing, setSelectedListing] = useState(''); // State for Listing
  const [selectedOccupancy, setSelectedOccupancy] = useState(''); // State for Occupancy
  const [selectedLeadTemperature, setSelectedLeadTemperature] = useState(''); // State for Lead Temperature
  const [selectedClosing, setSelectedClosing] = useState(''); // State for Closing
  const [zillowEstimate, setZillowEstimate] = useState('');
  const [bestCallbackTime, setBestCallbackTime] = useState('');
  const [reasonForSelling, setReasonForSelling] = useState('');
  const [zillowUrl, setZillowUrl] = useState('');
  const [callUrl, setCallUrl] = useState('');
  
  return (
    <Layout>
      <Box sx={{ p: 3, backgroundColor: '#F1F1F1', color: '#e0e0e0', marginTop: '65px' }}>
{/* New row for Asking Price input */}
<Box sx={{
  display: 'flex',
  gap: '25px',
  flexDirection: { xs: 'column', sm: 'row' },
  marginTop: '25px',
}}>
  <Box sx={{ flex: 1, position: 'relative' }}>
    <InputLabel
      htmlFor="asking-price"
      sx={{
        position: 'absolute',
        left: '10px',
        top: '15px',
        backgroundColor: '#0177FB', // Changed background color
        padding: '0 5px',
        zIndex: 1,
        color: '#FFFFFF', // Changed text color
        fontFamily: 'LufgaMedium !important',
      }}
      shrink={!!askingPrice}
    >
      Asking Price:
    </InputLabel>
    <TextField
      id="asking-price"
      variant="outlined"
      sx={{
        width: '100%',
        backgroundColor: '#0177FB', // Changed background color
        borderRadius: '20px',
        height: '77px',
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
        '& input': {
          color: '#FFFFFF', // Changed input text color
          textAlign: 'center',
        },
        '& input::placeholder': {
          color: '#FFFFFF', // Changed placeholder color
          opacity: 1, // Ensure placeholder is fully visible
        },
      }}
      inputProps={{
        style: { paddingTop: '15px' },
        placeholder: "2700$", // Placeholder text
      }}
      value={askingPrice}
      onChange={(e) => setAskingPrice(e.target.value)}
    />
  </Box>
</Box>


        <Box sx={{
          display: 'flex',
          gap: '25px',
          marginTop: '25px',

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
              <MenuItem value="" disabled>Select State</MenuItem>
              {statesList.map((state) => (
                <MenuItem key={state.code} value={state.code}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        {/* Seller Address input */}
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

        {/* New row for Listing and Occupancy inputs under Seller Address */}
        <Box sx={{
          display: 'flex',
          gap: '25px',
          flexDirection: { xs: 'column', sm: 'row' },
          marginTop: '25px',
        }}>
          <Box sx={{ flex: 1, position: 'relative' }}>
            <InputLabel
              htmlFor="listing"
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
              shrink={!!selectedListing}
            >
              Listing:
            </InputLabel>
            <Select
              id="listing"
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
              value={selectedListing}
              onChange={(e) => setSelectedListing(e.target.value)}
            >
              <MenuItem value="" disabled>Select Listing Type</MenuItem>
              {listingOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ flex: 1, position: 'relative' }}>
            <InputLabel
              htmlFor="occupancy"
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
              shrink={!!selectedOccupancy}
            >
              Occupancy:
            </InputLabel>
            <Select
              id="occupancy"
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
              value={selectedOccupancy}
              onChange={(e) => setSelectedOccupancy(e.target.value)}
            >
              <MenuItem value="" disabled>Select Occupancy Status</MenuItem>
              {occupancyOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

      {/* New row for Lead Temperature and Closing inputs */}
<Box sx={{
  display: 'flex',
  gap: '25px',
  flexDirection: { xs: 'column', sm: 'row' },
  marginTop: '25px',
}}>
  <Box sx={{ flex: 1, position: 'relative' }}>
    <InputLabel
      htmlFor="lead-temperature"
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
      shrink={!!selectedLeadTemperature}
    >
      Lead Temperature:
    </InputLabel>
    <Select
      id="lead-temperature"
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
      value={selectedLeadTemperature}
      onChange={(e) => setSelectedLeadTemperature(e.target.value)}
    >
      <MenuItem value="" disabled>Select Lead Temperature</MenuItem>
      {leadTemperatureOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </Box>

  <Box sx={{ flex: 1, position: 'relative' }}>
    <InputLabel
      htmlFor="closing"
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
      shrink={!!selectedClosing}
    >
      Closing:
    </InputLabel>
    <Select
      id="closing"
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
      value={selectedClosing}
      onChange={(e) => setSelectedClosing(e.target.value)}
    >
      <MenuItem value="" disabled>Select Closing Status</MenuItem>
      {closingOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </Box>
</Box>

{/* New row for Zillow Estimate and Best Callback Time inputs */}
<Box sx={{
  display: 'flex',
  gap: '25px',
  flexDirection: { xs: 'column', sm: 'row' },
  marginTop: '25px',
}}>
  <Box sx={{ flex: 1, position: 'relative' }}>
    <InputLabel
      htmlFor="zillow-estimate"
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
      shrink={!!zillowEstimate}
    >
      Zillow Estimate:
    </InputLabel>
    <TextField
      id="zillow-estimate"
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
      placeholder="$0.00"
      value={zillowEstimate}
      onChange={(e) => setZillowEstimate(e.target.value)}
    />
  </Box>

  <Box sx={{ flex: 1, position: 'relative' }}>
    <InputLabel
      htmlFor="best-callback-time"
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
      shrink={!!bestCallbackTime}
    >
      Best Callback Time:
    </InputLabel>
    <TextField
      id="best-callback-time"
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
      placeholder="HH:MM AM/PM"
      value={bestCallbackTime}
      onChange={(e) => setBestCallbackTime(e.target.value)}
    />
  </Box>
</Box>
{/* Existing code for Zillow Estimate and Best Callback Time inputs */}

{/* New row for Reason for Selling input */}
<Box sx={{
  display: 'flex',
  gap: '25px',
  flexDirection: { xs: 'column', sm: 'row' },
  marginTop: '25px',
}}>
  <Box sx={{ flex: 1, position: 'relative' }}>
    <InputLabel
      htmlFor="reason-for-selling"
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
      shrink={!!reasonForSelling}
    >
      Reason for Selling:
    </InputLabel>
    <TextField
      id="reason-for-selling"
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
      placeholder="Enter reason"
      value={reasonForSelling}
      onChange={(e) => setReasonForSelling(e.target.value)}
    />
  </Box>
</Box>
{/* New row for Zillow URL and Call URL inputs */}
<Box sx={{
  display: 'flex',
  gap: '25px',
  flexDirection: { xs: 'column', sm: 'row' },
  marginTop: '25px',
}}>
  <Box sx={{ flex: 1, position: 'relative' }}>
    <InputLabel
      htmlFor="zillow-url"
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
      shrink={!!zillowUrl}
    >
      Zillow URL:
    </InputLabel>
    <TextField
      id="zillow-url"
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
      placeholder="Enter Zillow URL"
      value={zillowUrl}
      onChange={(e) => setZillowUrl(e.target.value)}
    />
  </Box>

  <Box sx={{ flex: 1, position: 'relative' }}>
    <InputLabel
      htmlFor="call-url"
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
      shrink={!!callUrl}
    >
      Call URL:
    </InputLabel>
    <TextField
      id="call-url"
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
      placeholder="Enter Call URL"
      value={callUrl}
      onChange={(e) => setCallUrl(e.target.value)}
    />
  </Box>
</Box>

{/* Last row for Add Lead button */}
<Box sx={{
  marginTop: '25px',
  width: '100%', // Full width
}}>
<Button
  className='AddLeadBtn'
  variant="contained"
  sx={{
    width: '100%', // Full width
    backgroundColor: '#191919', // Background color
    color: '#FFFFFF', // Text color
    fontSize: '30px', // Font size
    borderRadius: '20px', // Rounded corners
    padding: '5px 15px', // Adjusted padding for smaller height (5px top/bottom, 15px left/right)
    '&:hover': {
      backgroundColor: '#333333', // Darker shade on hover for effect
    },
  }}
  onClick={() => {
    // Add your click handler logic here
    console.log('Add Lead button clicked!');
  }}
>
  Add Lead
</Button>


</Box>

      </Box>
    </Layout>
  );
};

export default AddLead;
