import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const GenerateBill = () => {
  const { id } = useParams(); // Fetch the service ID from URL parameters
  const [serviceId, setServiceId] = useState(id.id || ""); // Initialize serviceId with the value from URL params or an empty string
  const [billData, setBillData] = useState(null);

  const fetchBillData = async (id) => {
    try {
      const response = await axios.get(`https://practicehost.pythonanywhere.com/generate_bill/${id}/`);
      setBillData(response.data);
      toast.success("Bill data fetched successfully");
    } catch (error) {
      console.error("Failed to fetch bill data:", error);
      toast.error("Failed to fetch bill data. Please try again.");
    }
  };

  useEffect(() => {
    if (id) {
      fetchBillData(id.id);
    }
  }, [id]);

  const handleFetchBill = () => {
    if (serviceId) {
      fetchBillData(serviceId);
    } else {
      toast.error("Please enter a service ID");
    }
  };

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Bill_Service_${serviceId}`,
  });

  return (
    <div style={{ padding: "20px" }}>
      <ToastContainer />
      <div className="bg-white w-[30%] px-5 flex flex-col mx-auto my-5">
        <TextField
          label="Service ID"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchBill}
          style={{ marginBottom: "20px", paddingInline: "20px" }}
        >
          Generate Bill
        </Button>
      </div>

      {billData && (
        <div className="w-[80%] flex justify-center flex-col mx-auto">
          <Paper ref={componentRef} style={{ padding: "20px" }}>
            <h2>Bill</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tool</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {billData.bill_items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.tool}</TableCell>
                      <TableCell>{item.cost}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}>Total Amount</TableCell>
                    <TableCell>{billData.total_amount}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Button
            variant="contained"
            color="secondary"
            onClick={handlePrint}
            style={{ marginTop: "20px", width: "150px", display: "flex", marginInline: "auto" }}
          >
            Export as PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default GenerateBill;
