import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const AddInstrumentFamilyDialog = ({ open, handleClose, instrumentGroup }) => {
  const [familyID, setFamilyID] = useState('');
  const [familyName, setFamilyName] = useState('');

  useEffect(() => {
    const fetchInstrumentGroupData = async () => {
      if (instrumentGroup) {
        
          
          setFamilyID(instrumentGroup.instrument_family_id || '');
          setFamilyName(instrumentGroup.instrument_family_name || '');
       
      }
    };

    fetchInstrumentGroupData();
  }, [instrumentGroup]);

  const handleSave = async () => {
    const data = {
      familyID,
      instrument_family_name: familyName,
    };


    try {
      if (instrumentGroup) {
        // Update existing instrument group
        const response = await axios.post(`${import.meta.env.VITE_APP_URL}/update_instrument_family/${instrumentGroup.instrument_family_id}/`, data);
     
        toast.success("Instrument family updated successfully");
      } else {
        // Add new instrument group
           const response = await axios.post(`${import.meta.env.VITE_APP_URL}/add_instrument_family/`, data);
           if(response.data.success){
        toast.success("Instrument family  added successfully");
           } else {
            toast.error()
           }
      }
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      toast.error("Unknown error!");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{instrumentGroup ? "Update Instrument Family" : "Add Instrument Family"}</DialogTitle>
      <ToastContainer />
      <DialogContent>
       {
        instrumentGroup &&  <TextField
          margin="dense"
          label="Instrument family ID"
          type="text"
          fullWidth
          variant="outlined"
          value={familyID}
          disabled
        />
       }
        <TextField
          margin="dense"
          label="Instrument family name"
          type="text"
          fullWidth
          variant="outlined"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          {instrumentGroup ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddInstrumentFamilyDialog;
