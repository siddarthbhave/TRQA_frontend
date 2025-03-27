import React,{useState,lazy} from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Edit,
  Toolbar,
  Group,
  Sort,
  Filter,
  PdfExport,
  ExcelExport,
  Search,
} from "@syncfusion/ej2-react-grids";
import { Header } from "../components";
import { shedDetailsGrid } from "../data/apps";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useStateContext } from "../context/ContextProvider";


// const UpdateShed = lazy(()=> import("../forms/UpdateShed"));
import UpdateShed from "../forms/UpdateShed";
const Shed = () => {
      const {excelExportProperties,addId} = useStateContext()
  const { data: shedDetailsData, refetch } = useQuery({
    queryKey: ["shed"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}/shed-details/`);
      return response.data;
    },
  });


  let grid;

  const navigate = useNavigate();

  const handleActionComplete = async (args) => {
    if (args.requestType === "save") {
      if (args.action === "add") {
        try {
          
          const response = await axios.post(`${import.meta.env.VITE_APP_URL}/add_shed/`, args.data);
      
          toast.success("Shed added successfully", {
            position: "top-center",
            autoClose: 1000,
            style: {
              width: "auto",
              style: "flex justify-center",
            },
            closeButton: false,
            progress: undefined,
          });
          refetch();
        } catch (error) {
          toast.error("Error inserting data");
        }
      } else if (args.action === "edit") {
        // Update operation
        try {
           await axios.put(`${import.meta.env.VITE_APP_URL}/update_shed/${args.data.shed_id}/`, args.data);
          toast.success("Shed updated successfully", {
            position: "top-center",
            autoClose: 1000,
            style: {
              width: "auto",
              style: "flex justify-center",
            },
            closeButton: false,
            progress: undefined,
          });
          refetch();
        } catch (error) {
          console.error("Error updating data:", error);
          toast.error("Error updating data");
        }
      }
    } else if (args.requestType === "delete") {
      // Delete operation
      try {
        await axios.delete(`${import.meta.env.VITE_APP_URL}/delete_shed/${args.data[0].shed_id}/`);
        toast.success("Shed deleted successfully", {
          position: "top-center",
          autoClose: 1000,
          style: {
            width: "auto",
            style: "flex justify-center",
          },
          closeButton: false,
          progress: undefined,
        });
        refetch();
      } catch (error) {
        toast.error("Error deleting data");
      }
    }
  };


  const [open,setOpen] = useState(false);
  const fetchToolData = async (shed_id) => {
    try {
      await axios.get(`${import.meta.env.VITE_APP_URL}/shed_detail/${shed_id}/`);
      navigate(`${shed_id}`);
    } catch (error) {
      console.error("Error fetching tool data:", error);
    }
  };

   const handleDialogOpen = ()=> {
    setOpen(true);
   
  }
   const handleDialogClose = ()=> {
    setOpen(false);
     refetch()
  }
  const rowSelected = (args) => {
    // console.log(args)
    const selectedRecord = args.data.shed_id;
    fetchToolData(selectedRecord);
  };
    const date = new Date().toISOString().split('T')[0];


  const toolbarClick = (args) => {
     if (args.item.id === 'gridcomp_pdfexport') {
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
        } else if (args.item.id === 'gridcomp_excelexport') {
           
            grid.excelExport(excelExportProperties(shedDetailsGrid.length));
        }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header className="Page" title="Shed" />
      <ToastContainer className="z-[10001]" />
      <button type="button" onClick={handleDialogOpen}  className="bg-blue-500 rounded-sm py-2 px-4 text-white" >Add Shed</button>
      <div className="my-5">
        
        <GridComponent
          id="gridcomp"
          dataSource={addId(shedDetailsData?.shed_details)}
          width="auto"
          allowGrouping
          allowPaging
          allowSelection
           pageSettings={{pageSize:10}}
          allowSorting
          allowSearching
          allowFiltering
          toolbarClick={toolbarClick}
          toolbar={["Search", "PdfExport","ExcelExport"]}
          rowSelected={rowSelected}
          allowPdfExport
          allowExcelExport
          sortSettings={{
          columns: [{ field: "shed_id", direction: "Descending" }],
        }}
          actionComplete={handleActionComplete}
          ref={g => grid = g}
        >
          <ColumnsDirective>
            {shedDetailsGrid.map((item, index) => (
             
              <ColumnDirective key={index} {...item}  visible={item.visible !== false} ></ColumnDirective>
            ))}
          </ColumnsDirective>
          <Inject
            services={[
              Group,
                        Toolbar,
                        Sort,
                        Search,
                        Filter,
                        Page,
                        Edit,
                        PdfExport,
                        ExcelExport
            ]}
          />
        </GridComponent>
                            <UpdateShed open={open} handleClose={handleDialogClose} mode="add" />

      </div>
    </div>
  );
};

export default Shed;
