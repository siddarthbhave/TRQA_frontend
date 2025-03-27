import React,{useState,lazy} from "react";
import {GridComponent,ColumnsDirective,ColumnDirective,Page,Resize,Inject,Edit,Toolbar,Sort,Filter} from '@syncfusion/ej2-react-grids'
import { Header } from "../components";
import axios from "axios"
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

import { ToastContainer, toast } from "react-toastify";
// const CalibrationDialog = lazy(()=> import("./CalibrationDialog"));
// const AddInstrumentGroupDialog = lazy(()=> import("./GroupMaster"));
import CalibrationDialog from "./CalibrationDialog";
import AddInstrumentGroupDialog from "./GroupMaster";
const MasterToolsDialog = () => {
  const {id} = useParams();
  const [toolGroup,setToolGroup] = useState()
   const { data: tools, refetch } = useQuery({
    queryKey: ["tools"],
    queryFn: async () => {
 
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}/instruments_by_tool_group/${id}/`);
    
      setToolGroup(response.data.tool_group)
      return response.data.instruments;
    },
  });
   const [open,setOpen] = useState(false)
   const [openn,setOpenn] = useState(false)
   const CalibrationGrid = [

  {
    field: "instrument_no",
    headerText: "Instrument Number",
    width: "80",
    textAlign: "Center",
  },
  
  {
    field: "instrument_name",
    headerText: "Instrument Code",
    width: "150",
    textAlign: "Center",
  },
    {
    field: "type_of_tool_name",
    headerText: "Instrument Name",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "current_shed_name",
    headerText: "Shed",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "manufacturer_name",
    headerText: "Manufacturer Name",
    width: "150",
    textAlign: "Center",
  },
 
  {
    field: "year_of_purchase",
    headerText: "Year of purchase",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "gst",
    headerText: "GST",
    width: "120",
    textAlign: "Center",
  },
 
  {
    field: "least_count",
    headerText: "Least Count",
    width: "100",
    textAlign: "Center",
  },

 

];
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
            toast.success("Instrument added successfully", {
                    position: "top-center",
                    autoClose: 1000,
                    style: { width: "auto", style: "flex justify-center" },
                    closeButton: false,
                    progress: undefined,
                });
             
            
              
                
                 refetch()
                }
            } catch (error) {
             
            }
    };

const handleDialogOpen = ()=> {
  setOpen(true);
  setInstrumentGroup(true);
}
const handleDialogClose=()=> {
  setOpen(false)
} 
const handleDialogOpenn = ()=> {
  setOpenn(true);

}
const handleDialogClosee=()=> {
  setOpenn(false)
} 
const navigate = useNavigate();
const handleDelete=async ()=> {
  try {
    const response =await axios.post(`${import.meta.env.VITE_APP_URL}/instrument_group/${id}/delete/`);
   if(response.data.success){
     toast.success("Instrument group master deleted successfully!!");
     setTimeout(()=> {
      navigate(-1)
     },2000)
   } else {
        toast.error("Unknown error! Try again later");

   }
  } catch (error) {
    
    toast.error("Unknown error! Try again later");
  }
}
const [instrumentGroup,setInstrumentGroup] = useState(false)
   return (
    <div>
       <div className="flex justify-start ml-10 mt-10">
       <BackButton/>
     </div>
     
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div>
        <strong>Instrument group name: </strong>{toolGroup}
      </div>
       <div className="flex flex-row justify-between gap-x-5 my-4">
          <button className="px-5 py-2 bg-blue-500 rounded-md text-white font-semibold" onClick={handleDialogOpen}>Update instrument group master</button>

          <button className="px-5 py-2 bg-red-500 rounded-md text-white font-semibold" onClick={handleDelete}>Delete instrument group masters</button>
        </div>
    <ToastContainer/>
      <Header className="Page" title="Instrument group masters tools" />
      <button className="px-5 py-2 bg-blue-500 rounded-md mb-3 text-white font-semibold" onClick={handleDialogOpenn}>Add instrument</button>

      <GridComponent
        id="gridcomp"
        dataSource={tools}
        width="auto"
        allowPaging
        allowSelection
        allowSorting
         allowFiltering
        pageSettings={{ pageSize: 10 }}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        allowExcelExport
        sortSettings={{ columns: [{ field: 'tool_group_id', direction: 'Descending' }] }}
        allowPdfExport
      >
        <ColumnsDirective>
          {CalibrationGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}></ColumnDirective>
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Toolbar,
            Resize,
            Sort,
            
            Filter,
            Page,
            Edit,
          ]}
        />
      </GridComponent>
          <AddInstrumentGroupDialog open={open} handleClose={handleDialogClose} instrumentGroup={id} />
          <CalibrationDialog open={openn} handleClose={handleDialogClosee} family={toolGroup} familyAdd={true} id={id} handleAdd={handleAddTool}/>

    </div>
    </div>
   )
}


export default MasterToolsDialog