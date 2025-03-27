import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem,Autocomplete, IconButton } from '@mui/material';

const Service = ({ open, handleClose, serviceOrder, id }) => {
  const [toolCount, setToolCount] = useState(serviceOrder?.service_tools?.length || 1);
  const [tools, setTools] = useState([{ id: 1, tool: "", service_type: "", service_remarks: "" }]);
 
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [description, setDescription] = useState(serviceOrder?.service_order?.description || "");
  const [isUpdate, setIsUpdate] = useState(false);
  const date = new Date().toISOString().split('T')[0];
  const [instruments,setInstruments] = useState([])
  
  useEffect(() => {
    if (selectedVendor) {
      axios.get(`${import.meta.env.VITE_APP_URL}/vendor_details/${selectedVendor}/`)
        .then(response => {
       
          setInstruments(response.data.instruments);
        
        })
        .catch(error => {
          console.error("Error fetching vendor tools:", error);
        });
    }
  }, [selectedVendor]);

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/service_types/`);
        setServiceTypes(response.data);
      } catch (error) {
        console.error("Error fetching service types:", error);
      }
    };

    fetchServiceTypes();
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/vendor/`);
        setVendors(response.data);
        
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);
 
  useEffect(() => {
    if (id) {
      setTools(serviceOrder?.service_tools);
      setSelectedVendor(serviceOrder?.service_order?.vendor || "");
      setIsUpdate(true);
    }
  }, [id, serviceOrder]);

  const handleToolChange = (index, key, value) => {
    const newTools = [...tools];
    newTools[index][key] = value;
    setTools(newTools);
  };

  const addToolField = () => {
    setToolCount(prevCount => prevCount + 1);
    setTools(prevTools => [...prevTools, { id: toolCount + 1, tool: "", service_type: "", service_remarks: "" }]);
  };

  const subtractToolField = () => {

    if (toolCount > 1) {
      setToolCount(prevCount => prevCount - 1);
      setTools(prevTools => prevTools.slice(0, -1));
    }
  };

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      date: date,
      amount: serviceOrder?.service_order?.amount || "",
      vendor: serviceOrder?.service_order?.vendor || "",
    },
    mode: "onChange",
  });
  
 
  const submitHandler = async (data) => {
    const requestData = {
      date: data.date,
      amount: 0,
      description: description,
      tool_count: toolCount,
      vendor: parseInt(data.vendor),
      tools: tools.map(tool => ({
        tool: parseInt(tool.tool),
        service_type: parseInt(tool.service_type),
        service_remarks: tool.service_remarks,
        vendor: parseInt(data.vendor),
      })),
    };

    try {
      if (id) {
        const response = await axios.post(`${import.meta.env.VITE_APP_URL}/update_service_order/${id}/`, requestData);
        if (response.data.success) {
          toast.success("Service order updated successfully", {
            position: "top-center",
            autoClose: 1000,
            closeButton: false,
          });
        } else {
          toast.error("Failed to update service order");
        }
      } else {
        const response = await axios.post(`${import.meta.env.VITE_APP_URL}/service-order/`, requestData);
        toast.success("Service order added successfully", {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        });
      }
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  useEffect(() => {
    if (isUpdate) {
      setValue("vendor", selectedVendor);
    }
  }, [isUpdate, selectedVendor, setValue]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{id ? "Update Service Order" : "Add Service Order"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
          <TextField
            {...register("date", {
              required: "Date is required",
            })}
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.date}
            helperText={errors.date?.message}
            margin="normal"
            required
          />
          <TextField
            {...register("vendor", {
              required: "Vendor is required",
            })}
            select
            label="Vendor"
            fullWidth
            onChange={(e) => setSelectedVendor(e.target.value)}
            error={!!errors.vendor}
            helperText={errors.vendor?.message}
            margin="normal"
            value={selectedVendor || ""}
            required
          >
            <MenuItem value="">
              <em>Select a vendor</em>
            </MenuItem>
            {vendors?.vendors?.map((vendor) => (
              <MenuItem key={vendor.vendor_id} value={vendor.vendor_id}>
                {vendor.name} - {vendor.location}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Description"
            type="text"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
         
      {tools.map((toolItem, index) => (
        <div key={index}>
          <Autocomplete
            options={instruments}
            getOptionLabel={(option) => option.instrument_name}
            value={instruments.find((tool) => tool.instrument_no === tools[index]?.tool) || null}
            onChange={(e, newValue) => handleToolChange(index, "tool", newValue ? newValue.instrument_no : "")}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`Service Instrument ${index + 1}`}
                margin="normal"
                fullWidth
                required
              />
            )}
          />
         
              <TextField
                select
                label={`Service Type ${index + 1}`}
                fullWidth
                value={tools[index]?.service_type || ""}
                onChange={(e) => handleToolChange(index, "service_type", e.target.value)}
                margin="normal"
                required
              >
                <MenuItem value="">
                  <em>Select a service type</em>
                </MenuItem>
                {serviceTypes.map((serviceType) => (
                  <MenuItem key={serviceType.servicetype_id} value={serviceType.servicetype_id}>
                    {serviceType.service_type}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label={`Service Remarks ${index + 1}`}
                type="text"
                fullWidth
                value={tools[index]?.service_remarks || ""}
                onChange={(e) => handleToolChange(index, "service_remarks", e.target.value)}
                margin="normal"
              />
            </div>
          ))}
          <IconButton onClick={addToolField} color="primary" aria-label="add tool">
            <p className="text-[14px] mr-4">Add Instrument</p>
          </IconButton>
          <IconButton onClick={subtractToolField} color="primary" aria-label="remove tool">
            <p className="text-[14px]">Remove Instrument</p>
          </IconButton>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  );
};

export default Service;
