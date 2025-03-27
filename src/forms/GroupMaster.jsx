import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddInstrumentGroupDialog = ({ open, handleClose, instrumentGroup,family,id }) => {
  const [toolGroupName, setToolGroupName] = useState('');
  const [toolGroupCode, setToolGroupCode] = useState('');

  const [instrumentFamilyGroups, setInstrumentFamilyGroups] = useState([]);
  const [selectedFamilyGroup, setSelectedFamilyGroup] = useState(family);
  useEffect(() => {
   

    const fetchInstrumentGroupData = async () => {
      if (instrumentGroup) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_APP_URL}/update_instrument_group/${instrumentGroup}/`);
          const data = response.data.data;
         
          setToolGroupName(data.tool_group_name || '');
          setToolGroupCode(data.tool_group_code || '');
          setSelectedFamilyGroup(data.instrument_family_id || '');
        } catch (error) {
          toast.error("Failed to fetch instrument group data.");
        }
      }
    };

    fetchInstrumentGroupData();
  }, [instrumentGroup]);

  const handleSave = async () => {
    const data = {
      tool_group_name: toolGroupName,
      tool_group_code: toolGroupCode,
      tool_family: id,
    };

    try {
      if (instrumentGroup) {
       
        const response = await axios.post(`${import.meta.env.VITE_APP_URL}/update_instrument_group/${instrumentGroup}/`, data);
   
        toast.success("Instrument group master updated successfully");
      } else {
        // Add new instrument group
        const response = await axios.post(`${import.meta.env.VITE_APP_URL}/add_instrument_group_master/`, data);
     
        if(response.data.success){
        toast.success("Instrument group master added successfully");
         setTimeout(() => {
        handleClose();
      }, 2000);
        } else {
          const errors = JSON.parse(response.data.errors);
        const errorMessage = errors.tool_group_name[0].message;
        toast.error(errorMessage)
          
        }
      }
     
    } catch (error) {
      
      const errors = JSON.parse(error.data.errors);
        const errorMessage = errors.name[0].message;
        toast.error(errorMessage)
      
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{instrumentGroup ? "Update Instrument Group" : "Add Instrument Group"}</DialogTitle>
      <ToastContainer />
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Instrument Group Name"
          type="text"
          fullWidth
          variant="outlined"
          value={toolGroupName}
          onChange={(e) => setToolGroupName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Instrument Group Code"
          type="text"
          fullWidth
          variant="outlined"
          value={toolGroupCode}
          onChange={(e) => setToolGroupCode(e.target.value)}
        />
      {family &&  <TextField
  type="text"
  margin="dense"
  label="Instrument Family Group"
  fullWidth
  variant="outlined"
  
  value={family}
  InputLabelProps={{ shrink: true }}
/>}

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

export default AddInstrumentGroupDialog;
