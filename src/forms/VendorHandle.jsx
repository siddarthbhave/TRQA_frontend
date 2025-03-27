import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,

  TextField,
  Button,
  MenuItem,
} from "@mui/material";

const CreateVendorHandleData = ({ open, handleClose, id ,vendorName}) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const [vendors, setVendors] = useState([]);
  const [tools, setTools] = useState([]);
  const [defaultVendorName, setDefaultVendorName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendorResponse = await axios.get(`${import.meta.env.VITE_APP_URL}/vendor`);
        const toolResponse = await axios.get(`${import.meta.env.VITE_APP_URL}/instrument-group-master-tools/`);
        setVendors(vendorResponse.data.vendors);
        setTools(toolResponse.data.instrument_group_masters);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to fetch vendors or tools data.");
      }
    };

    fetchData();
  }, []);


  useEffect(()=> {

  },[defaultVendorName])

  const submitHandler = async (data) => {
    try {
      const vendorId = id.id;
      const formData = {
        ...data,
        vendor: vendorId,
      };
      await axios.post(
        `${import.meta.env.VITE_APP_URL}/add_vendor_handles/`,
        formData
      );
  
      toast.success("Vendor handle data added successfully");
      setTimeout(()=> {
        handleClose();
      },2000)
    } catch (error) {
   
      toast.error("Failed to add vendor handle data. Please try again later.");
    }
  };


  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Vendor Handle Data</DialogTitle>
      <ToastContainer />
      <DialogContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <TextField

            value={vendorName}
            
            label="Vendor"
            fullWidth
            margin="normal"
          />

          <TextField
            {...register("tool", { required: "Tool is required" })}
            select
            label="Instrument"
            fullWidth
            margin="normal"
            error={!!errors.tool}
            helperText={errors.tool?.message}
          >
            {tools.map((tool) => (
              <MenuItem key={tool.tool_group_id} value={tool.tool_group_id}>
                {tool.tool_group_name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            {...register("turnaround_time", { required: "Turnaround time is required" })}
            type="number"
            label="Turnaround Time in days"
            fullWidth
            margin="normal"
            error={!!errors.turnaround_time}
            helperText={errors.turnaround_time?.message}
          />

          <TextField
            {...register("cost", { required: "Cost is required" })}
            type="number"
            label="Cost"
            fullWidth
            margin="normal"
            error={!!errors.cost}
            helperText={errors.cost?.message}
          />

         <div className="flex flex-row justify-between">
           <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: "20px 0" }}
          >
            Add Vendor Handle Data
          </Button>
           <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
         </div>
        </form>
      </DialogContent>
      
      <ToastContainer />
    </Dialog>
  );
};

export default CreateVendorHandleData;
