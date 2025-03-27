import React, { useState, useEffect,lazy} from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Group, Toolbar, Sort, Filter, Inject, Edit, PdfExport, ExcelExport } from '@syncfusion/ej2-react-grids';
import { Header } from "../components";

import axios from "axios";

import { toast,ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import { useSelector } from "react-redux";
import { useStateContext } from "../context/ContextProvider";
import { CalibrationGrid } from "../data/apps";

// const CalibrationDialog = lazy(()=>import("../forms/CalibrationDialog"));
// const BackButton = lazy(()=>import("../components/BackButton"));
// const UpdateShed = lazy(()=>import("../forms/UpdateShed"));
// const AddShedTools = lazy(()=>import("../forms/AddShedTool"));
import CalibrationDialog from "../forms/CalibrationDialog";
import BackButton from "../components/BackButton";
import UpdateShed from "../forms/UpdateShed";
import AddShedTools from "../forms/AddShedTool";
const ShedTools = () => {
  const [shedTools, setShedTools] = useState([]);
  const [tools, setTools] = useState([]);
  const [name, setName] = useState();
  const [shed,setShed] = useState();
 const date = new Date().toISOString().split('T')[0];
  const id = useParams();
    const {excelExportProperties} = useStateContext()

const [open,setOpen] = useState(false)
    const [openn,setOpenn] = useState(false)
  const { refetch } = useQuery({
    queryKey: ["shedtools"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}/shed_detail/${id["id"]}/`);
      setShed(response?.data.shed)
     
      setName(response?.data?.shed?.name)
      setShedTools(response?.data?.shed_tools);
  
    },
  });

  const fetchToolsData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}/instrument-tools/`);
      setTools(response?.data?.instrument_models);
    } catch (error) {
      console.error("Error fetching tool data:", error);
    }
  };

  useEffect(() => {
    // fetchToolData(id["id"]);
    fetchToolsData();
  }, []);
 const documentInfo = useSelector((state) => state.document);
  const {user,role} = useSelector((state)=> state.auth)
const mergedToolsData = shedTools.map((shedTool, index) => {
  // Find matching tool details
  const toolDetails = tools.find(
    (tool) => tool.instrument_no === shedTool.using_tool.instrument_no
  );

  // Merge shedTool and toolDetails
  return {
    sl_no: index + 1, // Add serial number
    ...shedTool.using_tool, // Include shed tool data
    ...toolDetails, // Include additional tool details if found
  };
});

 const toolbarClick = (args) => {
    const exportPattern = /(excelexport|pdfexport)$/;

    if (exportPattern.test(args.item.id)) {
        if (args.item.id.endsWith('pdfexport')) {
            const pdfExportProperties = {
                pageOrientation: 'Landscape',
                header: {
                    fromTop: 0,
                    height: 130,
                    contents: [
                        {
                            type: 'Text',
                            value: 'TechnoRings, Shimoga',
                            position: { x: 0, y: 50 },
                            style: { textBrushColor: '#000000', fontSize: 20 }
                        }
                    ]
                }
            };
            grid.pdfExport(pdfExportProperties);
        } else if (args.item.id.endsWith('excelexport')) {
            const excelExportProperties = {
        header: {
          headerRows: 6,
          rows: [
            {
              cells: [
                {
                 
                  colSpan: 11, // Adjust according to your column span
                  value: "M/S. TECHNORINGS, SHIMOGA",
                  style: {
                    fontColor: "#000000",
                    fontSize: 24,
                    hAlign: "Center",
                    bold: true,
                  },
                },
                
              ],
            },
            {
              cells: [
               
                {

  colSpan: 11, // Set the appropriate column span
  value: `DOC REF :${documentInfo.documentRef}`,
  style: {
    fontColor: "#000000",
    fontSize: 14,
    hAlign: "Right", // Ensures the text is aligned to the right
    bold: true,
  },
},

              ],
            },
             {
              cells: [
               
                {

  colSpan: 11, // Set the appropriate column span
  value: `REV NO: ${documentInfo.revNo}`,
  style: {
    fontColor: "#000000",
    fontSize: 14,
    hAlign: "Right", // Ensures the text is aligned to the right
    bold: true,
  },
},

              ],
            },
             {
              cells: [
               
                {

  colSpan: 11, // Set the appropriate column span
  value: `REV DATE: ${documentInfo.date}`,
  style: {
    fontColor: "#000000",
    fontSize: 14,
    hAlign: "Right", // Ensures the text is aligned to the right
    bold: true,
  },
},

              ],
            },
            
            {
              cells: [
                {
                  colSpan: 11, // Adjust according to your column span
                  value: `LIST OF MONITORING & MEASURING EQUIPMENTS INCLUDING CALIBRATION SCHEDULE & CALIBRATION HISTORY - ${user} ${date}`,
                  style: {
                    fontColor: "#000000",
                    fontSize: 14,
                    hAlign: "Center",
                    bold: true,
                  },
                },
              ],
            },
            {
              cells: [
                {
                  colSpan:11,
                  value:" "
                }
              ]
            },
          ],
        },
      };
   if (grid) {
  
           
            grid.columns[6].visible = false;
            grid.columns[7].visible = false;
        }
      grid.excelExport(excelExportProperties);
        }
    }
};




  const [showAddShedTools, setShowAddShedTools] = useState(false);
 
 
  const navigate=useNavigate();
  const handleDelete = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/shed/${id["id"]}/delete/`);
      if(response.data.success){
        toast.success(response.data.message)
        setTimeout(()=> {
          navigate(-1);
        },2000)
      } else {
        toast.error("Error deleting shed!!")
      }
    } catch (error) {
      toast.error("Error deleting shed!!")
      console.error("Error deleting data:", error);
    }
  };
  const handleAddTool =async (data) => {
      
        try {
                const response = await axios.post(`${import.meta.env.VITE_APP_URL}/add_instrument1/`, data);
                if(response.data.success === false){
                     setOpenn(false)
                toast.error("An error occured! Try again..", {
                    position: "top-center",
                    autoClose: 1000,
                    style: { width: "auto", style: "flex justify-center" },
                    closeButton: false,
                    progress: undefined,
                });
               
                   
               
            } else{
                       setOpenn(false);
            toast.success("Tool added successfully", {
                    position: "top-center",
                    autoClose: 1000,
                    style: { width: "auto", style: "flex justify-center" },
                    closeButton: false,
                    progress: undefined,
                });
             
            
              
                
                 refetch()
                }
            } catch (error) {
                toast.error("Error inserting data:");
            }
    };
const handleDialogOpenn = ()=> {
  setOpenn(true);

}
const handleDialogClosee=()=> {
  setOpenn(false)
} 


  let grid;
  const handleDialogOpen = ()=> {
    setOpen(true);
  }
   const handleDialogClose = ()=> {
    setOpen(false);
    refetch()
  }
  

  const handleClose = ()=> {
    setShowAddShedTools(false)
    refetch()
  }
  return (
    <div>
      <div className="flex justify-start ml-10 mt-10">
        <BackButton />
      </div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        {showAddShedTools && <AddShedTools setClose={handleClose} />}
        <ToastContainer/>
        <div className="flex flex-row justify-between gap-x-5 my-4">
          <button className="px-5 py-2 bg-blue-500 rounded-md text-white font-semibold" onClick={handleDialogOpen}>Update shed</button>

{
  name !== "QA"   &&  role === "admin"       && <button className="px-5 py-2 bg-red-500 rounded-md text-white font-semibold" onClick={handleDelete}>Delete shed</button>

}        </div>
        <Header className={`Shed tools`} title={name}/>
        
        <div>
                <button className="px-5 py-2 bg-blue-500 rounded-md mb-3 text-white font-semibold" onClick={handleDialogOpenn}>Add instrument</button>

        </div>
        <GridComponent
          id="gridcomp"
          dataSource={mergedToolsData}
          width="auto"
          allowGrouping
          allowPaging
          allowFiltering
          allowSorting
          allowExcelExport
          toolbar={['PdfExport','ExcelExport']}
          allowPdfExport
           ref={g => grid = g}
          toolbarClick={toolbarClick}
          pageSettings={{pageSize:10}}
        >
          <ColumnsDirective>
            {CalibrationGrid.map((item, index) => (
              <ColumnDirective key={index} {...item}></ColumnDirective>
            ))}
          </ColumnsDirective>
          <Inject
            services={[Group, Toolbar, Sort, Filter, Page, Edit, PdfExport,ExcelExport]}
          />
        </GridComponent>
                    <UpdateShed open={open} handleClose={handleDialogClose} shed={shed} />
                <CalibrationDialog open={openn} handleClose={handleDialogClosee} shed={shed} handleAdd={handleAddTool}/>

      </div>
    </div>
  );
};

export default ShedTools;
