import React, { useState, useEffect ,lazy} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

import { useStateContext } from "../context/ContextProvider";

// const UpdateCalibrationDetailsForm = lazy(()=>import("../forms/UpdateCalibrationHistory"));
import UpdateCalibrationDetailsForm from "../forms/UpdateCalibrationHistory";
const ChallanTools = ({ open, handleClose, transportOrder }) => {
  const [calibrationReports, setCalibrationReports] = useState([]);

  useEffect(() => {
    if (open) {
      fetchCalibrationReports();
    }
  }, [open]);

  const fetchCalibrationReports = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/calibration_reports/`);
      const data = await response.json();
      setCalibrationReports(data.calibration_reports);
    } catch (error) {
      console.error("Error fetching calibration reports:", error);
    }
  };

  const getToolName = (toolId) => {
    const tool = transportOrder.delivery_challan_tools.find(
      (tool) => tool.tool === toolId
    );
    return tool ? tool.tool_name : "Unknown tool";
  };

  const getCalibrationReportsForTool = (toolId) => {
    return calibrationReports.filter(
      (report) => report.calibrationtool_id === toolId
    );
  };
  const {calibrationData} = useStateContext()
 
  const history = [
    {
    "calibrationtool_id": 24,
    "calibration_date": "2024-07-11",
    "calibration_report_no": "TR/A/1/01",
    "calibration_agency": "MICROWAVE",
    "result": "12",
    "action": "OK",
    "next_calibration_date": "2025-07-11",
    "notification_date": "2025-07-04",
    "remark": "ok",
    "calibration_report_file": "/media/calibration_reports/gcp_quiz1_j0lImxh.pdf",
    "calibration_report_file2": "/media/samplereport.txt",
    "calibration_tool": 1
},{
    "calibrationtool_id": 25,
    "calibration_date": "2024-07-11",
    "calibration_report_no": "TR/A/1/01",
    "calibration_agency": "MICROWAVE",
    "result": "pass",
    "action": "OK",
    "next_calibration_date": "2025-07-11",
    "notification_date": "2025-07-04",
    "remark": "ok",
    "calibration_report_file": "/media/calibration_reports/gcp_quiz1_avQYuve.pdf",
    "calibration_report_file2": "/media/calibration_reports2/VendorType-2024-06-24_QrleB7p.csv",
    "calibration_tool": 2
}
  ]

  const [serviceTools,setServiceTools] =  useState([])

    useEffect(() => {

      const fetchServiceTools = async () => {
        try {         
           const response1 = await axios.get(`${import.meta.env.VITE_APP_URL}/pending_service_order_tools/15/`);
          setServiceTools(response1.data.data);
        } catch (error) {
          console.error("Error fetching service tools:", error);
        }
      };
      fetchServiceTools();
    
  }, []);
  const handleDeleteChallan = async (id) => {
    const url = `${import.meta.env.VITE_APP_URL}/delivery_challan/${id}/delete/`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {

        toast.success("Delivery Challan deleted successfully");
        setTimeout(()=> {
          handleClose()
        },2000)
        fetchCalibrationReports();
      } else {
        console.error('Failed to delete the tool.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
   const handleDeleteTool = async (toolId) => {
    const url = `${import.meta.env.VITE_APP_URL}/delivery_challan_tool/${toolId}/delete/`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
      
        toast.success("Challan tool deleted successfully");
        setTimeout(()=> {
          handleClose()
        },2000)
        fetchCalibrationReports();
      } else {
        console.error('Failed to delete the tool.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const [update,setUpdate] = useState(false)

  

  return (
    <>
    {update && <UpdateCalibrationDetailsForm existingToolDetails={history} tools={calibrationData} setUpdate={setUpdate}></UpdateCalibrationDetailsForm>}
    <Dialog open={open} onClose={handleClose} maxWidth="xl" sx={{zIndex:40}}>
      <DialogTitle>Delivery Challan Details</DialogTitle>
      <ToastContainer/>
      <DialogContent>
        {transportOrder ? (
          <div>
            <p>
              <strong>Received Date:</strong>{" "}
              {transportOrder.delivery_challan?.received_date}
            </p>
            <p>
              <strong>Vendor:</strong> {transportOrder.delivery_challan?.vendor_name}
            </p>
            <p>
              <strong>Shed:</strong> {transportOrder.delivery_challan?.shed_name}
            </p>
            <h3>Delivery Challan Tools</h3>
            {transportOrder?.delivery_challan_tools?.map((tool) => (
              <div className="mt-3" key={tool.deliverychallantool_id}>
                <p>
                  <strong>Tool ID:</strong> {getToolName(tool.tool)}
                </p>
                <p>
                  <strong>Calibration Report:</strong>{" "}
                  {tool.calibration_report}
                </p>
                <h4>Calibration Reports</h4>
                <Paper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Calibration Date</TableCell>
                        <TableCell>Report No</TableCell>
                        <TableCell>Agency</TableCell>
                        <TableCell>Result</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell>Next Calibration Date</TableCell>
                        <TableCell>Remark</TableCell>
                        <TableCell>Report File</TableCell>
                        <TableCell>Report File 2</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getCalibrationReportsForTool(tool.calibration_report).map((report) => (
                        <TableRow key={report.calibrationtool_id}>
                          <TableCell>{report.calibration_date}</TableCell>
                          <TableCell>{report.calibration_report_no}</TableCell>
                          <TableCell>{report.calibration_agency}</TableCell>
                          <TableCell>{report.result}</TableCell>
                          <TableCell>{report.action}</TableCell>
                          <TableCell>{report.next_calibration_date}</TableCell>
                          <TableCell>{report.remark}</TableCell>
                          <TableCell>
                            <a className="bg-indigo-700 px-3 py-1 text-white rounded-md" href={`https://practicehost.pythonanywhere.com${report.calibration_report_file}`} target="_blank" rel="noopener noreferrer">
                              View Report
                            </a>
                          </TableCell>
                          <TableCell>
                            <a className="bg-indigo-700 px-3 py-1 text-white rounded-md" href={`https://practicehost.pythonanywhere.com${report.calibration_report_file2}`} target="_blank" rel="noopener noreferrer">
                              View Report 2
                            </a>
                          </TableCell>
                          <TableCell sx={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: 3,
          display:'flex',
          gap:'10px',
          justifyContent:'space-between',
          alignItems:'start'
        }}>
                            {/* <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleUpdateTool(tool.deliverychallantool_id)}
                            >
                              Update
                            </Button> */}
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleDeleteTool(tool.deliverychallantool_id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </DialogContent>
      <DialogActions sx={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: 3,
          display:'flex',
          justifyContent:'space-between',
          alignItems:'start'
        }}>
       <Button
  sx={{
    backgroundColor: 'red',
    paddingBlock: '10px',
    paddingInline: '20px',
    borderRadius: '10px',
    boxShadow: 3,
    color: 'white',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'start',
    // Ensure hover keeps the same background color
    '&:hover': {
      backgroundColor: 'red', // Keeps the same red color on hover
    },
  }}
  onClick={() =>
    handleDeleteChallan(transportOrder?.delivery_challan?.deliverychallan_id)
  }
>
  Delete
</Button>
<Button
  sx={{
    backgroundColor: 'blue',
    color: 'white',
    paddingBlock: '10px',
    paddingInline: '20px',
    borderRadius: '10px',
    boxShadow: 3,
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'start',
    // Ensure hover keeps the same background color
    '&:hover': {
      backgroundColor: 'blue', // Keeps the same blue color on hover
    },
  }}
  onClick={handleClose}
>
  Close
</Button>

      </DialogActions>

    </Dialog>
    </>
  );
};

export default ChallanTools;
