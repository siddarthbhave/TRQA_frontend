import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Autocomplete } from "@mui/material";

const UpdateCalibrationDetailsForm = ({ onClose, tools,deliveryChallan, caVendors,setUpdate, existingToolDetails }) => {

  const [toolCount, setToolCount] = useState(existingToolDetails.length || 1);

  const [toolDetails, setToolDetails] = useState(
    existingToolDetails.map((tool) => ({
      toolName: tool.calibration_tool || "",
      calibrationDate: tool.calibration_date || new Date().toISOString().split('T')[0],
      calibrationReportNumber: tool.calibration_report_no || "",
      calibrationAgency: tool.calibration_agency || "",
      result: tool.result || "",
      action: tool.action || "",
      nextCalibrationDate: tool.next_calibration_date || "",
      remark: tool.remark || "",
      file: null,
      file2: null,
    }))
  );
  

  // Handle changes in form fields
  const handleInputChange = (index, field, value) => {
    const updatedToolDetails = [...toolDetails];
    updatedToolDetails[index][field] = value;
    setToolDetails(updatedToolDetails);
  };

  // Handle file changes separately
  const handleFileChange = (index, field, file) => {
    const updatedToolDetails = [...toolDetails];
    updatedToolDetails[index][field] = file;
    setToolDetails(updatedToolDetails);
  };

  // Add a new tool row
  const handleAddTool = () => {
    setToolCount(toolCount + 1);
    setToolDetails([
      ...toolDetails,
      {
        toolName: "",
        calibrationDate: new Date().toISOString().split('T')[0],
        calibrationReportNumber: "",
        calibrationAgency: "",
        result: "",
        action: "",
        nextCalibrationDate: "",
        remark: "",
        file: null,
        file2: null,
      },
    ]);
  };

  // Remove the last tool row
  const handleRemoveTool = () => {
    if (toolCount > 1) {
      setToolCount(toolCount - 1);
      setToolDetails(toolDetails.slice(0, toolCount - 1));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation and data preparation
    const toolsData = toolDetails.map((tool, index) => ({
      calibration_tool: tool.toolName,
      calibration_date: tool.calibrationDate,
      calibration_report_no: tool.calibrationReportNumber,
      calibration_agency: tool.calibrationAgency,
      result: tool.result,
      action: tool.action,
      notification_date: '2024-05-19', // Placeholder date, can be dynamic
      next_calibration_date: tool.nextCalibrationDate || '2024-05-19', // Placeholder
      remark: tool.remark,
      file: tool.file,
      file2: tool.file2,
    }));

    // Perform validation
    const isValid = validateForm(toolsData);
    if (isValid) {
    
      toast.success("Form submitted successfully!");
      onClose(); // Optionally close the form modal
    } else {
      toast.error("Please fill all required fields!");
    }
  };

  // Validation logic
  const validateForm = (data) => {
    // Basic validation logic; can be more comprehensive
    return data.every((tool) => tool.calibration_tool && tool.calibration_date && tool.calibration_report_no);
  };

  // Handle agency selection changes
  const handleAgencyChange = (selectedOption, index) => {
    const updatedToolDetails = [...toolDetails];
    updatedToolDetails[index].calibrationAgency = selectedOption;
    setToolDetails(updatedToolDetails);
  };

  // Render tool rows
  const renderToolRows = () => {
    return toolDetails.map((tool, i) => (
      <tr key={i}>
        <td className="py-0 text-sm bg-white border-b border-gray-200">
          <select
            name={`toolName${i}`}
            value={tool.toolName}
            onChange={(e) => handleInputChange(i, 'toolName', e.target.value)}
            className="form-select border-2 border-gray-300 py-2 mx-auto rounded-md mt-1 w-full text-center"
            style={{ textAlignLast: 'center' }}
            required
          >
            <option value="">Select Instrument Code</option>
            {tools?.map((tool) => (
              <option className="px-10 text-center" key={tool.instrument_no} value={tool.instrument_no}>
                {tool.instrument_name}
              </option>
            ))}
          </select>
        </td>

        <td className="px-2 py-0 text-sm bg-white border-b border-gray-200">
          <input
            name={`calibrationDate${i}`}
            type="date"
            value={tool.calibrationDate}
            onChange={(e) => handleInputChange(i, 'calibrationDate', e.target.value)}
            className="form-select border-2 border-gray-300 border-b py-2 px-2 rounded-md mt-1 w-full"
            required
          />
        </td>

        <td className="px-2 py-0 text-sm bg-white border-b border-gray-200">
          <input
            name={`calibrationReportNumber${i}`}
            type="text"
            value={tool.calibrationReportNumber}
            onChange={(e) => handleInputChange(i, 'calibrationReportNumber', e.target.value)}
            className="form-select border-2 border-gray-300 border-b py-2 px-2 rounded-md mt-1 w-full"
            required
          />
        </td>

        <td className="px-2 py-0 text-sm bg-white border-b border-gray-200">
          <Autocomplete
            freeSolo
            value={tool.calibrationAgency}
            options={caVendors?.map((vendor) => vendor.vendor_name)}
            onChange={(event, newValue) => handleAgencyChange(newValue, i)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Calibration Agency"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                onChange={(e) => handleAgencyChange(e.target.value, i)}
              />
            )}
          />
        </td>

        <td className="px-2 py-0 text-sm bg-white border-b border-gray-200">
          <input
            name={`result${i}`}
            type="text"
            value={tool.result}
            onChange={(e) => handleInputChange(i, 'result', e.target.value)}
            className="form-input border-2 border-gray-300 border-b py-2 px-2 rounded-md mt-1 w-full"
            required
          />
        </td>

        <td className="px-2 py-0 text-sm bg-white border-b border-gray-200">
          <input
            name={`action${i}`}
            type="text"
            value={tool.action}
            onChange={(e) => handleInputChange(i, 'action', e.target.value)}
            className="form-select border-2 border-gray-300 border-b py-2 px-2 rounded-md mt-1 w-full"
            required
          />
        </td>

        <td className="px-2 py-0 text-sm bg-white border-b border-gray-200">
          <textarea
            name={`remark${i}`}
            value={tool.remark}
            onChange={(e) => handleInputChange(i, 'remark', e.target.value)}
            className="form-select border-2 border-gray-300 border-b py-2 px-2 rounded-md mt-1 w-full"
            rows="3"
          ></textarea>
        </td>

        <td className="px-2 py-0 text-sm bg-white border-b border-gray-200">
          <input
            type="file"
            name={`file${i}`}
            onChange={(e) => handleFileChange(i, 'file', e.target.files[0])}
            className="form-select border-2 border-gray-300 border-b py-2 px-2  rounded-md mt-1 w-full"
            required
          />
        </td>

        <td className="px-2 py-0 text-sm bg-white border-b border-gray-200">
          <input
            type="file"
            name={`file2${i}`}
            onChange={(e) => handleFileChange(i, 'file2', e.target.files[0])}
            className="form-select border-2 border-gray-300 border-b py-2 px-2  rounded-md mt-1 w-full"
            required
          />
        </td>
      </tr>
    ));
  };

  return (
    <div className="fixed inset-0 w-2xl flex justify-center items-center bg-gray-900 bg-opacity-50 z-[100]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full overflow-x-scroll">
        <button onClick={onClose} className="absolute top-0 right-0 m-2 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Calibration Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-center text-sm border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b border-gray-300">Instrument Code</th>
                  <th className="px-4 py-2 border-b border-gray-300">Calibration Date</th>
                  <th className="px-4 py-2 border-b border-gray-300">Report Number</th>
                  <th className="px-4 py-2 border-b border-gray-300">Calibration Agency</th>
                  <th className="px-4 py-2 border-b border-gray-300">Result</th>
                  <th className="px-4 py-2 border-b border-gray-300">Action</th>
                  <th className="px-4 py-2 border-b border-gray-300">Remark</th>
                  <th className="px-4 py-2 border-b border-gray-300">File</th>
                  <th className="px-4 py-2 border-b border-gray-300">File 2</th>
                </tr>
              </thead>
              <tbody>{renderToolRows()}</tbody>
            </table>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleAddTool}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Add Tool
            </button>
            <button
              type="button"
              onClick={handleRemoveTool}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Remove Tool
            </button>
          </div>
          <div className="flex justify-center gap-x-4 mt-6">
            
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={()=>setUpdate(false)}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateCalibrationDetailsForm;
