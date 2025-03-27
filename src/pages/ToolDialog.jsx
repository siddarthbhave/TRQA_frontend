import React, { useState, useEffect ,lazy} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Button,
  FormControlLabel,
} from "@mui/material";

import axios from "axios";

import { toast,ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

// const CreateMovement = lazy(()=>import("../forms/Transport"));
import CreateMovement from "../forms/Transport";
const ToolDialog = ({ open, handleClose,movementId }) => {
  const [selectedToolIds, setSelectedToolIds] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const {user,role} = useSelector((user)=> user.auth)
const { data, isLoading, error } = useQuery({
  queryKey: ["transportorders", movementId],
  queryFn: async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/transport_orders/${movementId}/`
    );
    return response.data;
  },
  onError: (error) => {
    console.error("Error fetching transport order details:", error);
  },
});


  useEffect(() => {
    if (data) {
      const allToolIds = data.transport_tools.map(tool => tool.tool);
      setSelectedToolIds(allToolIds);
    }
  }, [data]);

  const handleCheckboxChange = (toolId) => {
    setSelectedToolIds((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedToolIds([]);
    } else {
      const allToolIds = data.transport_tools.map(tool => tool.tool);
      setSelectedToolIds(allToolIds);
    }
    setAllSelected(!allSelected);
  };

  const acknowledgeTools = async () => {
    if (!data) return;

    try {
      await axios.post(`${import.meta.env.VITE_APP_URL}/transport_acknowledge_tools/${data.transport_order.movement_id}/`, {
        tool_ids: selectedToolIds,
      });
      handleClose();
    } catch (error) {
      console.error("Failed to acknowledge tools:", error);
    }
  };
  const [openn,setOpenn] = useState(false);
  const handleDialogOpenn=()=> {
    setOpenn(true)
  }
  const handleDialogClosee=()=> {
    setOpenn(false)
  }
   const handleDelete =async ()=> {
    const response =await axios.post(`https://practicehost.pythonanywhere.com/transport_order/${data.transport_order.movement_id}/delete/`);
    if(response.data.success){
      toast.success(response.data.message);
      setTimeout(()=>{
        handleClose();
      },2000)
    }
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle className="text-center">Transport Order Details</DialogTitle>
      <DialogContent>
        {data ? (
          <div className="px-10">
            <p><strong>Movement ID:</strong> {data.transport_order.movement_id}</p>
            <p><strong>Movement Date:</strong> {data.transport_order.movement_date}</p>
            <p><strong>Acknowledgment:</strong> {data.transport_order.acknowledgment ? "Yes" : "No"}</p>
            <p><strong>Tool Count:</strong> {data.transport_order.tool_count}</p>
            <p><strong>Source Shed:</strong> {data.transport_order.source_shed_name}</p>
            <p><strong>Destination Shed:</strong> {data.transport_order.destination_shed_name}</p>
            <h3>Transport Tools</h3>
           
            {data?.transport_tools.map((tool) => (
              <div key={tool.tool}>
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={tool.acknowledgment ? true : false}
                      checked={selectedToolIds.includes(tool.tool)}
                      onChange={() => handleCheckboxChange(tool.tool)}
                    />
                  }
                  label={<><strong>Tool ID:</strong> {tool.tool_name}</>}
                />
                <p><strong>Remarks:</strong> {tool.tool_movement_remarks}</p>
              </div>
            ))}
             <Button onClick={handleSelectAll} color="primary">
              {allSelected ? "Deselect All" : "Select All"}
            </Button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
              <div className="flex flex-row mx-auto gap-x-4 justify-center items-center">
  {((role === "admin" && !data?.transport_order?.acknowledgment)  || (
    data &&
    data.transport_order?.source_shed_name === user && 
    !data.transport_order?.acknowledgment
  )) && (
    <button
      className="px-2 py-2 text-blue-500 mx-4 text-[16px] rounded-md font-semibold"
      onClick={handleDialogOpenn}
    >
      Update transport order
    </button>
  )}
<button  className="px-2 py-2 mx-4 text-[16px] rounded-md text-red-500 font-semibold" onClick={handleDelete}>
          Delete transport order
        </button>
              </div>
      </DialogContent>

      <DialogActions>
        <button className="px-5 py-2 text-[16px] rounded-md text-white bg-red-500 font-semibold" onClick={handleClose}>
          Close
        </button>
        {
          !data?.transport_order.acknowledgment && data?.transport_order.destination_shed_name === user && (
            <button className="px-5 py-2  text-[16px] rounded-md bg-blue-500 text-white font-semibold" onClick={acknowledgeTools}>
              Acknowledge
            </button>
          )
        }
      </DialogActions>
      <ToastContainer/>
      <CreateMovement open={openn} handleClose={handleDialogClosee} transportOrder={data}/>
    </Dialog>
  );
};

export default ToolDialog;
