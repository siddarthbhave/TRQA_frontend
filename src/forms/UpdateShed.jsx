import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import {  IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const UpdateShed = ({ open, handleClose, shed, mode }) => {
  const [shedId, setShedId] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    if (shed) {
      setShedId(shed.shed_id || '');
      setName(shed.name || '');
      setLocation(shed.location || '');
      setPhoneNumber(shed.phone_number || '');
      setPassword(shed.password || '')
      // if (mode === 'update') {
      //   setPassword(''); // Clear password field for update mode
      // }
    }
  }, [shed, mode]);

  const handleSave = async () => {
    const data = {
      shed_id: shedId,
      name: name,
      location: location,
      phone_number: phoneNumber,

     password1: password  // Include password only in add mode
    };


    try {
      let response;
      if (mode === 'add') {
        response = await axios.post(`${import.meta.env.VITE_APP_URL}/add_shed/`, data);
        console.log(response)
       if(response.data.success){
         toast.success("Shed added successfully");
       } else {
        const errors = JSON.parse(response.data.errors);
        const errorMessage = errors.name[0].message;
        toast.error(errorMessage)
       }
      } else {
        
        response = await axios.post(`${import.meta.env.VITE_APP_URL}/update_shed/${shedId}/`, data);
  
        if(response.data.success){
          toast.success(response.data.message);
        } else {
           
        toast.error(response.data.message)
        }
      }
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      
      toast.error(error.response.data.message);
    }
  };
  const handleTogglePasswordVisibility = () => {
  setShowPassword((prevShowPassword) => !prevShowPassword);
};


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{mode === 'add' ? 'Add Shed' : 'Update Shed Details'}</DialogTitle>
      <ToastContainer />
      <DialogContent>
        {mode === 'update' && (
          <TextField
            autoFocus
            margin="dense"
            label="Shed ID"
            type="text"
            fullWidth
            variant="outlined"
            value={shedId}
            onChange={(e) => setShedId(e.target.value)}
            disabled
          />
        )}
        <TextField
          autoFocus={mode === 'add'}
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          disabled={shed ? true : false}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Location"
          type="text"
          fullWidth
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          type="text"
          fullWidth
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

          <TextField
  margin="dense"
  label="Password"
  type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
  fullWidth
  variant="outlined"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleTogglePasswordVisibility}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  }}
/>

        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateShed;
