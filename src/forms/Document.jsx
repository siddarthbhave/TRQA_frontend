// DocumentForm.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { setDocumentInfo,clearDocumentInfo } from "../store/actions";
import { toast,ToastContainer } from "react-toastify";

const StyledForm = styled(Box)({
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const DocumentForm = () => {
  const dispatch = useDispatch();
  const documentInfo = useSelector((state) => state.document);

  const [documentRef, setDocumentRef] = useState(documentInfo.documentRef || "");
  const [revNo, setRevNo] = useState(documentInfo.revNo || "");
    const [historyRef, setHistoryRef] = useState(documentInfo.historyRef || "");
     const [date, setDate] = useState(documentInfo.date || "");
  

  const handleDocumentRefChange = (event) => {
    setDocumentRef(event.target.value);
  };

  const handleRevNoChange = (event) => {
    setRevNo(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
    const handleHistoryRefChange = (event) => {
    setHistoryRef(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setDocumentInfo(documentRef, revNo,historyRef,date));
    toast.success("Details updated successfully")

    
  };

  const handleClear = () => {
    dispatch(clearDocumentInfo());
    toast.success("Details cleared successfully")
    setDocumentRef("")
    setRevNo("")
    setHistoryRef("")
    setDate("")
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: "20px", marginTop: "50px" }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Document Form
        </Typography>
        <ToastContainer/>
        <StyledForm component="form" onSubmit={handleSubmit}>
          <TextField
            label="Document Reference"
            variant="outlined"
            value={documentRef}
            onChange={handleDocumentRefChange}
            fullWidth
            required
          />
          <TextField
            label="Rev Date"
            variant="outlined"
            value={date}
            type="date"
            onChange={handleDateChange}
            fullWidth
            required
          />
          <TextField
            label="Revision Number"
            variant="outlined"
            value={revNo}
            onChange={handleRevNoChange}
            fullWidth
            required
          />
           <TextField
            label="Calibration History Ref"
            variant="outlined"
            value={historyRef}
            onChange={handleHistoryRefChange}
            fullWidth
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              padding: "10px",
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClear}
            fullWidth
            sx={{
              padding: "10px",
              marginTop: "10px",
            }}
          >
            Clear
          </Button>
        </StyledForm>
      </Paper>
    </Container>
  );
};

export default DocumentForm;
