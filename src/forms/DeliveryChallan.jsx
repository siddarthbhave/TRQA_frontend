import React, { useState, useEffect,lazy } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// const CalibrationDetailsForm = lazy(()=>import("./CalibrationDetails"));
import CalibrationDetailsForm from "./CalibrationDetails";
const DeliveryChallan = ({ open, handleClose,refetch }) => {
  const [showCalibrationModal, setShowCalibrationModal] = useState(false);

  // const [services, setServices] = useState([]);
  const [serviceTools, setServiceTools] = useState([]);
  const [vendorTypes, setVendorTypes] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [pendingServiceOrders, setPendingServiceOrders] = useState([]);
  const date = new Date().toISOString().split('T')[0];

  

  const { data: shedDetails,isFetching,isLoading ,error} = useQuery({
    queryKey: ["shed"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}/shed-details/`);
      return response.data;
    },
  });

  useEffect(() => {
    const fetchVendorTypes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/vendor_types/`);
        setVendorTypes(response.data.vendor_types);
      } catch (error) {
        console.error("Error fetching vendor types:", error);
        toast.error("Failed to fetch vendor types.");
      }
    };

    fetchVendorTypes();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    errors,
    formState: {  },
  } = useForm({
    defaultValues: {
      receivedDate: date,
      vendorType: "",
      vendor: "",
      shed: "",
      service: "",
    },
    mode: "onChange",
  });

  const selectedVendorTypeId = watch("vendorType");
  const selectedServiceId = watch("service");
  const selectedVendor = watch("vendor");
  const [caVendors,setCaVendors] = useState([])
  useEffect(() => {
    if (selectedVendorTypeId) {
      const fetchVendorsByType = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_APP_URL}/pending_service_orders/vendor/${selectedVendorTypeId}/`);
          setCaVendors()
          setVendors(response.data);
        } catch (error) {
          console.error("Error fetching vendors by type:", error);
        }
      };
      fetchVendorsByType();
    }
  }, [selectedVendorTypeId]);
  useEffect(() => {
    if (selectedVendorTypeId) {
      const fetchVendorsByType = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_APP_URL}/pending_service_orders/vendor/1/`);
        
          setCaVendors(response.data);
        } catch (error) {
          console.error("Error fetching vendors by type:", error);
        }
      };
      fetchVendorsByType();
    }
  }, [selectedVendorTypeId]);
  const [allTools,setAllTools] = useState([])
  useEffect(() => {
    if (selectedServiceId) {
      const fetchServiceTools = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_APP_URL}/service_orders/${selectedServiceId}/`);
          setAllTools(response.data.service_tools);
           const response1 = await axios.get(`${import.meta.env.VITE_APP_URL}/pending_service_order_tools/${selectedServiceId}/`);
          setServiceTools(response1.data.data);
        } catch (error) {
          console.error("Error fetching service tools:", error);
        }
      };
      fetchServiceTools();
    }
  }, [selectedServiceId]);

  useEffect(() => {
    if (selectedVendor) {
      const vendor = vendors.find((v) => v.vendor_id === selectedVendor);
      setPendingServiceOrders(vendor?.pending_service_orders || []);
    }
  }, [selectedVendor, vendors]);

  const handleAddCalibrationDetails = () => {
    handleClose();
    setTimeout(()=> {
      setShowCalibrationModal(true);
    },500)
   
  };

  const submitHandler = async (data) => {
    try {
      const formData = new FormData();
      formData.append("received_date", getValues("receivedDate"));
      formData.append("vendor", getValues("vendor"));
      formData.append("shed", getValues("shed"));
      formData.append("service", getValues("service"));
      
      data.forEach((tool, index) => {
        
        formData.append(`toolData[${index}][calibration_tool]`, tool.calibration_tool);
        formData.append(`toolData[${index}][calibration_date]`, tool.calibration_date);
        formData.append(`toolData[${index}][calibration_report_no]`, tool.calibration_report_no);
        formData.append(`toolData[${index}][calibration_agency]`, tool.calibration_agency);
        formData.append(`toolData[${index}][result]`, tool.result);
        formData.append(`toolData[${index}][action]`, tool.action);
        formData.append(`toolData[${index}][next_calibration_date]`, tool.next_calibration_date);
        formData.append(`toolData[${index}][remark]`, tool.remark);
        formData.append(`toolData[${index}][notification_date]`, "2024-01-01");
        if (tool.file) {
          formData.append(`toolData[${index}][calibration_report_file]`, tool.file);
        }
        if (tool.file2) {
          formData.append(`toolData[${index}][calibration_report_file2]`, tool.file2);
        }
      });


      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      await axios.post(`${import.meta.env.VITE_APP_URL}/store-delivery-challan/`, formData, config);
  
       

     
      toast.success("Calibration details added successfully");
      alert("Success")
      
       setShowCalibrationModal(false);
     
     refetch()
      
     
      

    } catch (error) {
      console.error("Error submitting calibration details:", error);
      alert("Unknown error!! Try again")
      toast.error("Failed to add calibration details. Please try again later.");
    }
  };

  const handleToolDetails = (toolDetails) => {};
  const [shed_details,setShedDetails] = useState([])
  useEffect(()=> {
    
    setShedDetails(shedDetails?.shed_details)
  },[shedDetails])

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Instrument</DialogTitle>
        <ToastContainer />
        <DialogContent>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="w-[400px] flex flex-col h-[100%] pt-4 p-0 my-auto space-y-6 mx-auto"
          >
            <div>
              <TextField
                {...register("receivedDate", {
                  required: {
                    value: true,
                    message: "Received date is required",
                  },
                })}
                type="date"
                name="receivedDate"
                label="Received Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </div>

            <div>
              <TextField
                {...register("vendorType", {
                  required: {
                    value: true,
                    message: "Vendor type is required",
                  },
                })}
                name="vendorType"
                label="Vendor Type"
                select
                fullWidth
                required
              >
                <MenuItem value="">
                  <em>Select a vendor type</em>
                </MenuItem>
                {vendorTypes?.map((vendorType) => (
                  <MenuItem key={vendorType.vendortype_id} value={vendorType.vendortype_id}>
                    {vendorType.vendor_type}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div>
              <TextField
                {...register("vendor", {
                  required: {
                    value: true,
                    message: "Vendor name is required",
                  },
                })}
                name="vendor"
                label="Vendor"
                select
                fullWidth
                required
              >
                <MenuItem value="">
                  <em>Select a vendor</em>
                </MenuItem>
                {vendors?.map((vendor) => (
                  <MenuItem key={vendor.vendor_id} value={vendor.vendor_id}>
                    {vendor.vendor_name}
                  </MenuItem>
                ))}
              </TextField>
            </div>

          
              <div>
              <TextField
                {...register("shed", {
                  required: {
                    value: true,
                    message: "Shed name is required",
                  },
                })}
                name="shed"
                label="Shed"
                select
                fullWidth
                required
              >
                <MenuItem value="">
                  <em>Select shed</em>
                </MenuItem>
                {error ? <div>Error</div> : isLoading || isFetching ? <div>Loading</div> : shed_details?.map((shed) => (
                  <MenuItem key={shed.shed_id} value={shed.shed_id}>
                    {shed.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          

            <div>
              <TextField
                {...register("service", {
                  required: {
                    value: true,
                    message: "Service is required",
                  },
                })}
                name="service"
                label="Service"
                select
                fullWidth
                required
              >
                <MenuItem value="">
                  <em>Select service</em>
                </MenuItem>
                {pendingServiceOrders?.map((service) => (
                  <MenuItem key={service.service_id} value={service.service_id}>
                    {service.service_id} - Date: {service.date}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            {allTools && allTools?.map((tool) => (
              <div key={tool.tool_id} className="instrument-details bg-white flex mx-auto rounded-md flex-col w-[90%] gap-y-2">
                <p><strong>Instrument code:</strong> {tool.tool_name}</p>
              </div>
            ))}

            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddCalibrationDetails}
                fullWidth
              >
                Add calibration details
              </Button>
            </div>

            <ToastContainer />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {showCalibrationModal && (
        <CalibrationDetailsForm
          onClose={() => setShowCalibrationModal(false)}
          onSubmit={submitHandler}
          register={register}
          getValues={getValues}
          reset={reset}
          tools={serviceTools}
          caVendors={caVendors}
          errors={errors}
          sendToolDetails={handleToolDetails}
        />
      )}
    </>
  );
};

export default DeliveryChallan;
