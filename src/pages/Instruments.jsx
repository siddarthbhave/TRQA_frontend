import React, { useState, useEffect } from "react";
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Group, Toolbar, Sort, Filter, Inject, Edit, PdfExport, ExcelExport } from '@syncfusion/ej2-react-grids';
import { Header } from "../components";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {  calibrationHistoryGrid } from "../data/apps";
import { useStateContext } from "../context/ContextProvider";
const Instruments = () => {
  const [service, setService] = useState([]);
  const [transportOrder, setTransportOrder] = useState([]);
  const [shedDetails, setShedDetails] = useState({}); // State to store shed details
  const [instrument, setInstrument] = useState(null); // State to store instrument details
    const [instrumentDetails, setInstrumentDetails] = useState(null); // State to store instrument details
  
  let grid;
    const {excelExportProperties,calibrationData} = useStateContext()

 
  const { register, handleSubmit, watch } = useForm();
  const toolId = watch("toolId");

 

  const fetchToolData = async (toolId) => {
    try {
       const instrumentDetail = await axios.get(`${import.meta.env.VITE_APP_URL}/instrument-calibration-history/${toolId}`);
       const mappedInstrumentDetails = instrumentDetail?.data?.calibration_history?.map((detail, index) => ({
          sl_no: index + 1, 
          ...detail, // Spread the rest of the properties
        }));
      setInstrument(instrumentDetail?.data?.instrument);
      setInstrumentDetails(mappedInstrumentDetails)
     
     
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}/instrument-transport-history/${toolId}/`);
      const response1 = await axios.get(`${import.meta.env.VITE_APP_URL}/instrument-service-history/${toolId}/`);
      setService(response1?.data?.service_history);
      setTransportOrder(response?.data?.transport_orders);
      
    } catch (error) {
      console.error("Error fetching Instrument data:", error);
    }
  };

  // Fetch shed details from the server
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_URL}/shed-details/`)
      .then(response => {
        const shedMap = {};
        response.data.shed_details.forEach(shed => {
          shedMap[shed.shed_id] = shed.name;
        });
        // Set the shed details state
        setShedDetails(shedMap);
      })
      .catch(error => {
        console.error('Error fetching shed details:', error);
      });
  }, []);

 const documentInfo = useSelector((state) => state.document);

  // Columns configuration for the service grid
  const serviceGridColumns = [
  
    { field: "service_id", headerText: "Service ID", width: "150", textAlign: "Center" },
    { field: "vendor", headerText: "Vendor", width: "150", textAlign: "Center" },
    { field: "date", headerText: "Date", width: "150", textAlign: "Center" },
    { field: "amount", headerText: "Amount", width: "150", textAlign: "Center" },
    { field: "description", headerText: "Description", width: "150", textAlign: "Center" },
    { field: "tool_count", headerText: "Instrument count", width: "150", textAlign: "Center" }
  ];

  // Columns configuration for the transport grid
  const transportGridColumns = [
    { field: "movement_id", headerText: "Movement ID", width: "150", textAlign: "Center" },
    { field: "movement_date", headerText: "Movement date", width: "150", textAlign: "Center" },
    { field: "acknowledgment", headerText: "Status", width: "150", textAlign: "Center" },
    { field: "source_shed_name", headerText: "Source shed", width: "150", textAlign: "Center" },
    { field: "destination_shed_name", headerText: "Destination shed", width: "150", textAlign: "Center" },
    { field: "tool_count", headerText: "Instrument count", width: "150", textAlign: "Center" }
  ];

 const toolbarClick = (args) => {
    const exportPattern = /(excelexport|pdfexport)$/;
    
    if (exportPattern.test(args.item.id)) {
        if (args.item.id.endsWith('pdfexport')) {
            grid.pdfExport({
                pageOrientation: 'Landscape'
            });
        } else if (args.item.id.endsWith('excelexport')) {
        
          
            
            grid.excelExport();
         
    }
};
 }

 const toolbarClickk = (args) => {
    const exportPattern = /(excelexport|pdfexport)$/;
   
    if (exportPattern.test(args.item.id)) {
        if (args.item.id.endsWith('pdfexport')) {
            grid.pdfExport({
                pageOrientation: 'Landscape'
            });
        } else if (args.item.id.endsWith('excelexport')) {
        
       
             const excelExportProperties = {
                header: {
                    headerRows: 7,
                    rows: [
                      {
                            cells: [
                        {
                            colSpan: calibrationHistoryGrid.length, // Adjusted colSpan for main header
                            value: 'Calibration History Card',
                            style: {
                                fontColor: '#000000',
                                fontSize: 22,
                                hAlign: 'Center',
                                bold: true,
                            },
                        },
                        
                    ],
                        },{
                          cells: [
                            {
                            // Ensures "TR/QAD/F13:R0" is placed in the remaining two columns
                            colSpan:calibrationHistoryGrid.length,
                            value: `${documentInfo.historyRef}`,
                            style: {
                                fontColor: '#000000',
                                fontSize: 16,
                                hAlign: 'Right',
                                bold: true,
                            },
                        },
                          ]
                        },
                        {
                            cells: [
                                {
                                    colSpan: 1, // Adjust according to your column span
                                    value: "Instrument name",
                                    style: { fontColor: '#000000', fontSize: 12, hAlign: 'Left', bold: true }
                                },
                                {
                                    colSpan: 1, // Adjust according to your column span
                                    value: instrument.type_of_tool_name,
                                    style: { fontColor: '#000000', fontSize: 12, hAlign: 'Left', bold: false }
                                }
                            ]
                        },{
                            cells: [
                                {
                                    colSpan: 1, // Adjust according to your column span
                                    value: "ID No",
                                    style: { fontColor: '#000000', fontSize: 12, hAlign: 'Left', bold: true }
                                },
                                {
                                    colSpan: 1, // Adjust according to your column span
                                    value: instrument.instrument_name,
                                    style: { fontColor: '#000000', fontSize: 12, hAlign: 'Left', bold: false }
                                }
                            ]
                        },{
                            cells: [
                                {
                                    colSpan: 1, // Adjust according to your column span
                                    value: "Calibration frequency",
                                    style: { fontColor: '#000000', fontSize: 12, hAlign: 'Left', bold: true }
                                },
                                {
                                    colSpan: 1, // Adjust according to your column span
                                    value: `${instrument.calibration_frequency} days`,
                                    style: { fontColor: '#000000', fontSize: 12, hAlign: 'Left', bold: false }
                                }
                            ]
                        },{
                            cells: [
                                {
                                    colSpan: 1, // Adjust according to your column span
                                    value: "Range",
                                    style: { fontColor: '#000000', fontSize: 12, hAlign: 'Left', bold: true }
                                },
                                {
                                    colSpan: 1, // Adjust according to your column span
                                    value: instrument.instrument_range,
                                    style: { fontColor: '#000000', fontSize: 12, hAlign: 'Left', bold: false }
                                }
                            ]
                        },{
                            cells: [
                                {
                                    colSpan: 1, // Adjust according to your column span
                                    value: "Location",
                                    style: { fontColor: '#000000', fontSize: 12, hAlign: 'Left', bold: true }
                                },
                                {
                                    colSpan: 1, // Adjust according to your column span
                                    value: instrument.current_shed_name,
                                    style: { fontColor: '#000000', fontSize: 12, hAlign: 'Left', bold: false }
                                }
                            ]
                        }
                    ]
                }
        
                
            };
            grid.excelExport(excelExportProperties);
         
        }
    }
};


  const handleActionComplete = async (args) => {
    if (args.requestType === "delete") {
      try {
        await axios.post(`${import.meta.env.VITE_APP_URL}/transport_order/${args.data[0].movement_id}/delete/`);
        toast.success("Transport order deleted successfully");
      } catch (error) {
        toast.error(error.message);
        console.error("Error deleting data:", error);
      }
    }
  };

  const handleActionComplete1 = async (args) => {
    if (args.requestType === "delete") {
      try {
         await axios.post(`${import.meta.env.VITE_APP_URL}/service_order/${args.data[0].service_id}/delete/`);
        toast.success("Service order deleted successfully");
      } catch (error) {
        toast.error(error.message);
        console.error("Error deleting data:", error);
      }
    }
  };

  const rowSelected2 = async (args) => {
    const id = Object.values(args.data)[0];
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/shed/${id}/delete/`);
    
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
 const handleCalibrationHistoryActionComplete = async (args) => {
 
  if (args.requestType === "delete") {
    try {
      // Assuming calibration_id is the identifier for each calibration record
      const calibrationId = args.data[0].calibrationtool_id;
      await axios.post(`${import.meta.env.VITE_APP_URL}/calibration_report/${calibrationId}/delete/`);
      toast.success("Calibration history record deleted successfully");
    } catch (error) {
      toast.error("Error deleting calibration history record");
     
    }
  }
};

  
  const [toolIdd,setToolId] = useState("")
  const submitHandler= async (data)=> {
     fetchToolData(data.toolId)
   
  }

  return (
    <div>
      <div className="w-[40%] mt-24 flex mx-auto flex-col justify-center items-center p-6 bg-white rounded-3xl">
        <div className="w-full flex flex-row gap-x-5 mx-auto">
          <div className="w-full max-w-md">
            <Header className="Page" title="Enter Instrument ID" />
            <form onSubmit={handleSubmit(submitHandler)} className="mb-4">
              <label htmlFor="toolId" className="block text-sm font-medium text-gray-700">
                Instrument code
              </label>
               <select
      id="toolId"
      {...register("toolId")}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
      value={toolIdd} // Bind the value to state
      onChange={(e) => setToolId(e.target.value)} // Update state on change
    >
      <option value="" disabled>
        Select instrument
      </option>
      {calibrationData?.map((tool) => (
        <option key={tool.instrument_no} value={tool.instrument_no}>
          {tool.instrument_name}
        </option>
      ))}
    </select>
                          <button type="submit" className="bg-blue-500 px-4 mt-3 text-white font-semibold py-2 rounded-md flex mx-auto">Submit</button>

            </form>
            <ToastContainer />
          </div>
          
        </div>
          <div className="w-full flex mx-auto">
            {instrument && <div className="instrument-details bg-white flex mx-auto rounded-md flex-col w-[90%] gap-y-2">
        <p><strong>Instrument No:</strong> {instrument.instrument_no}</p>
        <p><strong>Instrument Code:</strong> {instrument.instrument_name}</p>
        <p><strong>Manufacturer Name:</strong> {instrument.manufacturer_name}</p>
        <p><strong>Instrument name:</strong> {instrument.type_of_tool_name}</p>
         <p><strong>Current Shed:</strong> {instrument.current_shed_name}</p>
            <p><strong>Manufacturer Name:</strong> {instrument.manufacturer_name}</p>
             <p><strong>Service Status:</strong> {instrument.service_status ? "Service pending" : "Service done" }</p>
             <p><strong>Calibration Date:</strong> {instrument.calibration_date}</p>
             <p><strong>Next Calibration Date:</strong> {instrument.next_calibration_date}</p>
      </div>}
          </div>
      </div>
    

      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header className="Page" title="Service orders" />
        <GridComponent
          dataSource={service}
          width="auto"
          allowGrouping
          allowPaging
          allowFiltering
          allowSorting
          pageSettings={{ pageSize: 10 }}
          allowDeleting
          toolbar={['PdfExport','ExcelExport','Delete']}
          allowPdfExport
          allowExcelExport
            ref={g => grid = g}
          editSettings={{ allowDeleting: true }}
          toolbarClick={toolbarClick}
          rowSelected={rowSelected2}
          actionComplete={handleActionComplete1}
        >
          <ColumnsDirective>
            {serviceGridColumns.map((item, index) => (
              <ColumnDirective key={index} {...item}></ColumnDirective>
            ))}
          </ColumnsDirective>
          <Inject services={[Group, Toolbar, Sort, Filter, Page, Edit, PdfExport,ExcelExport]} />
        </GridComponent>
      </div>

      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header className="Page" title="Instrument movement" />
        <GridComponent
          dataSource={transportOrder}
          width="auto"
          allowGrouping
          allowPaging
          allowFiltering
          allowSorting
          pageSettings={{ pageSize: 10 }}
          allowDeleting
          toolbar={['PdfExport','ExcelExport', 'Delete']}
          allowPdfExport
           ref={g => grid = g}
           allowExcelExport
          actionComplete={handleActionComplete}
          editSettings={{ allowDeleting: true }}
          toolbarClick={toolbarClick}
        >
          <ColumnsDirective>
            {transportGridColumns.map((item, index) => (
              <ColumnDirective key={index} {...item}></ColumnDirective>
            ))}
          </ColumnsDirective>
          <Inject services={[Group, Toolbar, Sort, Filter, Page, Edit, PdfExport,ExcelExport]} />
        </GridComponent>
      </div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header className="Page" title="Calibration History" />
        <GridComponent
          dataSource={instrumentDetails}
          width="auto"
          allowGrouping
          allowPaging
          allowFiltering
          allowSorting
          pageSettings={{ pageSize: 10 }}
          allowDeleting
          
          toolbar={['PdfExport','ExcelExport','Delete']}
          allowPdfExport
          allowExcelExport
            actionComplete={handleCalibrationHistoryActionComplete}
          editSettings={{ allowDeleting: true }}
          toolbarClick={toolbarClickk}
            ref={g => grid = g}
        >
          <ColumnsDirective>
            {calibrationHistoryGrid?.map((item, index) => (
              <ColumnDirective key={index} {...item}></ColumnDirective>
            ))}
          </ColumnsDirective>
          <Inject services={[Group, Toolbar, Sort, Filter, Page, Edit, PdfExport,ExcelExport]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Instruments;
