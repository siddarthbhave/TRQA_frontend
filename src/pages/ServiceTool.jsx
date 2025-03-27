import React, { useEffect, useState,lazy } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
// const Service = lazy(()=>import("../forms/Service"));
import Service from "../forms/Service";
const ServiceTool = ({ open, handleClose, serviceId }) => {
  const [billData, setBillData] = useState(null);
const { data, isLoading, error } = useQuery({
  queryKey: ["serviceorders", serviceId],
  queryFn: async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/service_orders/${serviceId}/`
    );
    return response.data;
  },
  onError: (error) => {
    console.error("Error fetching service order details:", error);
  },
  enabled: Boolean(serviceId)
});
  useEffect(() => {
    if (data) {
      const fetchBillData = async () => {
        try {
          const response = await axios.get(`https://practicehost.pythonanywhere.com/generate_bill/${data.service_order.service_id}/`);
          setBillData(response.data);
        } catch (error) {
          console.error("Error fetching bill data:", error);
        }
      };

      fetchBillData();
    }
  }, [data]);
  const [openn,setOpenn] = useState(false);
  const handleDialogOpenn=()=> {
    setOpenn(true);
  }
  const handleDialogClosee=()=> {
    setOpenn(false)
  }
  const handleDelete =async ()=> {
    const response =await axios.post(`https://practicehost.pythonanywhere.com/service_order/${data.service_order.service_id}/delete/`);
    if(response.data.success){
      toast.success(response.data.message);
      setTimeout(()=>{
        handleClose();
      },2000)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle>Service Order Details</DialogTitle>
      <DialogContent>
        {data ? (
          <div>
            <p>
              <strong>Service ID:</strong>{" "}
              {data?.service_order?.service_id}
            </p>
            <p>
              <strong>Date:</strong> {data?.service_order?.date}
            </p>
            <p>
              <strong>Total Amount:</strong> {billData?.total_amount}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {data?.service_order?.description}
            </p>
            <p>
              <strong>Instrument count:</strong>{" "}
              {data?.service_order?.tool_count}
            </p>

            <h3 className="mt-3 font-bold text-[18px]">Service Instruments</h3>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Instrument Code</TableCell>
                    <TableCell>Service Remarks</TableCell>
                    <TableCell>Service Type</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.service_tools?.map((tool, index) => {
                    const billItem = billData?.bill_items?.find(item => item.tool === tool.tool_name);
                    return (

                      <TableRow key={index}>
                        <TableCell>{tool.tool_name}</TableCell>
                        <TableCell>{tool.service_remarks}</TableCell>
                        <TableCell>{tool.service_type_name}</TableCell>
                        <TableCell>{billItem?.amount || "N/A"}</TableCell>
                      </TableRow>
                      
                    );
                   
                  })}
                 
                </TableBody>
                  
              </Table>
            </Paper>
                          <p className="font-semibold my-4 text-[16px]">Total amount: {billData?.total_amount}</p>

          </div>
        ) : (
          <p>Loading...</p>
        )}
      </DialogContent>
     <ToastContainer/>
      <DialogActions>
          {data && data?.service_order?.service_pending && <button  className="px-5 py-2 bg-blue-500 mx-auto text-[14px] rounded-md text-white font-semibold" onClick={handleDialogOpenn} color="primary">
          Update service order
        </button> }
        <button  className="px-5 py-2 bg-red-500 mx-auto text-[14px] rounded-md text-white font-semibold" onClick={handleDelete}>
          Delete service order
        </button>
        <button  className="px-5 py-2 bg-indigo-500 mx-auto text-[14px] rounded-md text-white font-semibold" onClick={handleClose} color="primary">
          Close
        </button>
      </DialogActions>
      <Service open={openn} handleClose={handleDialogClosee} serviceOrder={data} id={data?.service_order?.service_id}/>
    </Dialog>
  );
};

export default ServiceTool;
