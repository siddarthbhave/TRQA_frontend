import React, { useState,lazy } from "react";
import {  useNavigate, useParams } from "react-router-dom";

import { GridComponent, ColumnsDirective, ColumnDirective, Page, Toolbar, Sort, Filter, Inject, Edit, PdfExport, ExcelExport } from '@syncfusion/ej2-react-grids';
import { Header } from "../components";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { useQuery } from "@tanstack/react-query";
import { useStateContext } from "../context/ContextProvider";
// const CreateVendorHandleData = lazy(()=>import("../forms/VendorHandle"));
// const BackButton = lazy(()=>import("../components/BackButton"));
// const CreateVendor = lazy(()=>import("../forms/AddVendor"));
import CreateVendorHandleData from "../forms/VendorHandle";
import BackButton from "../components/BackButton";
import CreateVendor from "../forms/AddVendor";
const VendorsDetail = () => {
  
       const [open, setOpen] = useState(false);
         const [openn,setOpenn] = useState(false)
  const {excelExportProperties,addId} = useStateContext()
      const [vendorName,setVendorname] = useState("")
  const id=useParams()
  // const [vendorHandle,setVendorHandle] = useState([])
    const [vendor,setVendor] = useState([])


const {data:vendorHandles,refetch } = useQuery({
    queryKey: ["vendorhandle",id["id"]],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}/vendor_details/${id["id"]}/`);
      // setVendorHandle(getId(response?.data?.vendor_handles))
        setVendorname(response?.data?.vendor?.name)
        setVendor(response?.data?.vendor)
        return addId(response?.data?.vendor_handles)
    },
  });
 
 
  let grid;

    
  

    const handleDialogClose = () => {
        setOpen(false);
        refetch()
    };
  const handleDialogOpen = () => {
        setOpen(true);
    };

     const handleDialogClosee = () => {
        setOpenn(false);
        refetch()
    };
  const handleDialogOpenn = () => {
        setOpenn(true);
    };
  
  const vendorGridColumns = [
    {type:"checkbox",width:"50"},
    {field: "sl_no",
    headerText: "Sl No",
    width: "120",
    textAlign: "Center"},
    {field: "vendorhandle_id",
    headerText: "Id",
    width: "120",
    textAlign: "Center",
  visible:false},
      { field: "tool", headerText: "Instrument Family ID", width: "150", textAlign: "Center",visible:false },
           { field: "tool_name", headerText: "Instrument Family", width: "150", textAlign: "Center" },
        { field: "vendor_name", headerText: "Vendor", width: "150", textAlign: "Center" },
  { field: "turnaround_time", headerText: "Turnaround Time", width: "150", textAlign: "Center" },
  { field: "cost", headerText: "Cost", width: "150", textAlign: "Center" },


];


  

const toolbarClick = (args) => {
    const exportPattern = /(excelexport|pdfexport)$/;

    if (exportPattern.test(args.item.id)) {
        if (args.item.id.endsWith('pdfexport')) {
            grid.pdfExport({
                pageOrientation: 'Landscape'
            });
        } else if (args.item.id.endsWith('excelexport')) {
            grid.excelExport(excelExportProperties(vendorGridColumns.length));
        }
    }
};

 
  const vendor_id = id["id"]
  const navigate = useNavigate()
  const handleDelete = async ()=> {
     try {
    await axios.post(`${import.meta.env.VITE_APP_URL}/vendor/${vendor_id}/delete/`);
      toast.success("Vendor deleted successfully");
      setTimeout(()=> {
        navigate(-1);
      },2000)
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
   const handleActionComplete=async (args)=> {
    console.log(args)
      if (args.requestType === "delete") {
    try {
      const id=args.data[0].vendorhandle_id;
      await axios.post(`${import.meta.env.VITE_APP_URL}/vendor_handles/${id}/delete/`);
            toast.success("Vendor handle deleted successfully")
        setTimeout(()=> {
            navigate(-1);
        },2000)
    } catch (error) {
            toast.error(error.message)

    refetch()
    }
  } else if (args.requestType === "save"){
    try {
      const id=args.data.vendorhandle_id;
      console.log({...args.data, tool_group_id: args.data.tool})
      await axios.post(`${import.meta.env.VITE_APP_URL}/update_vendor_handles/${id}/`,{...args.data, tool_group_id: args.data.tool});
            toast.success("Vendor handle updated successfully")
        refetch()
    } catch (error) {
      console.log(error)
            toast.error(error.message)
       
      refetch()
    }
  }
     }

  return (
  
          <div>
             <div className="flex justify-start ml-10 mt-10">
       <BackButton/>
     </div>
    

            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
              
        <Header className="Page" title="Vendor handle" />
        <div className="text-[20px]">
                <strong>Vendor name: </strong>{vendorName}<br/>
                <strong>Location: </strong> {vendor?.location}<br/>
                   <strong>Address: </strong> {vendor?.address}<br/>
                      <strong>Phone number: </strong> {vendor?.phone_number}<br/>
                         <strong>Email: </strong> {vendor?.email}<br/>
                         <strong>Vendor type: </strong> {vendor?.vendor_type_name}<br/>
                           <strong>NABL number: </strong> {vendor?.nabl_number}<br/>
                          {/* <strong>Certificate: </strong> {vendor?.nabl_certificate}<br/> */}

                         <br/>

              </div>
         <div className="flex flex-row justify-between mb-3">
          <button       className="bg-blue-500 py-2 my-2 px-4 rounded-md text-white" 
 onClick={handleDialogOpen}>Add Vendor Handle</button>
  <button       className="bg-blue-500 rounded-md py-2 my-2 px-4 text-white" 
 onClick={handleDialogOpenn}>Update Vendor</button>
        <button type="button" className="px-5 py-2 bg-red-500 rounded-md my-2 text-white font-semibold hover:bg-red-600" onClick={handleDelete}>Delete vendor</button>
         </div>
        <ToastContainer/>
        <GridComponent
          dataSource={vendorHandles}
          width="auto"
          id="grid"
        
          allowPaging
          allowFiltering
          allowSorting
          editSettings={{allowEditing:true,allowDeleting:true,mode:'Dialog'}}
          toolbar={['PdfExport','ExcelExport','Delete','Edit']}
          allowPdfExport
          allowExcelExport
      pageSettings={{pageSize: 5}}
            ref={g => grid = g}
            sortSettings={{
          columns: [{ field: "vendorhandle_id", direction: "Descending" }],
        }}
          toolbarClick={toolbarClick}
          actionComplete={handleActionComplete}
        >
          <ColumnsDirective>
            {vendorGridColumns.map((item, index) => (
              <ColumnDirective key={index} {...item}  visible={item.visible !== false}></ColumnDirective>
            ))}
          </ColumnsDirective>
          <Inject services={[ Toolbar, Sort, Filter, Page, Edit, PdfExport,ExcelExport]} />
        </GridComponent>
      </div>
                        <CreateVendorHandleData open={open} handleClose={handleDialogClose} id={id} vendorName={vendorName} />
                                      <CreateVendor open={openn} handleClose={handleDialogClosee} vendorData={vendor} />

          </div>
   
  )
}

export default VendorsDetail