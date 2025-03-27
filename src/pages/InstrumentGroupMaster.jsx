import React, { useState, useEffect,lazy } from "react";
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Resize, ContextMenu, Inject, Edit, Toolbar, Sort, Filter, PdfExport, ExcelExport } from '@syncfusion/ej2-react-grids';
import { Header } from "../components";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


import {  useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { toast,ToastContainer } from "react-toastify";

import { useStateContext } from "../context/ContextProvider";

// const AddInstrumentGroupDialog = lazy(()=> import("../forms/GroupMaster"));
// const AddInstrumentFamilyDialog = lazy(()=> import("../forms/InstrumentGroup"));
import AddInstrumentFamilyDialog from "../forms/InstrumentGroup";
import AddInstrumentGroupDialog from "../forms/GroupMaster";
const GroupMaster = () => {
  const { id } = useParams();  // Extracting the id from URL params
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [name,setName] = useState()
    const {excelExportProperties,addId} = useStateContext()
  const [instrumentGroup,setInstrumentGroup] = useState()
  const { data, refetch } = useQuery({
    queryKey: ["masters", id], 
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}/instruments_by_instrument_family/${id}/`);
      setInstrumentGroup({
        instrument_family_id:id,
        instrument_family_name: response.data.tool_family
      })
      setName(response.data.tool_family)
      return addId(response.data.tools);
    },
  });

  const handleDialogClose = () => {
    setOpen(false);
    refetch();
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleRowClick = (args) => {
    const id = args.data.tool_group_id;
    navigate(`/instrument-family/master/tools/${id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const transportGridColumns = [
    
    {field: "sl_no",
    headerText: "Sl No",
    width: "120",
    textAlign: "Center"},
    { field: "tool_group_id", headerText: "Instrument Group ID", width: "150", textAlign: "Center",visible:false },
    { field: "tool_group_name", headerText: "Instrument Group Name", width: "150", textAlign: "Center" },
    { field: "tool_group_code", headerText: "Instrument Group Code", width: "150", textAlign: "Center" },
  ];
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
          
            grid.excelExport(excelExportProperties(transportGridColumns.length));
        }
  };

  const handleDelete=async ()=> {
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/instrument_family/${id}/delete/ `);

      if(response.data.success){
        toast.success(response.data.message)
        setTimeout(()=> {
          navigate(-1);
        },2000)
    } else {
            toast.error("Error deleting instrument family ")

    }
   } catch (error) {
      toast.error("Error deleting instrument family ")
    }
  }
  const [openn,setOpenn] = useState(false);
 const handleDialogOpenn = ()=> {
  setOpenn(true);
 }
  const handleDialogClosee = ()=> {
  setOpenn(false);
  refetch();
 }

  let grid;
  return (
    <div>
       <div className="flex justify-start ml-10 mt-10">
        <BackButton />
      </div>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
       <div className="my-3 text-[22px] flex justify-between">
    <div>
      <strong>Family name: </strong>{name}
    </div>
    <div>
               <button className="px-5 py-2 bg-blue-500 text-[18px] rounded-md text-white font-semibold" onClick={handleDialogOpenn}>   Update instrument family
</button>
    </div>
    <div>
      
                <button className="px-5 py-2 bg-red-500 text-[18px] rounded-md text-white font-semibold" onClick={handleDelete}>   Delete instrument family
</button>
    
    </div>
  </div>
                <button className="px-5 py-2 bg-blue-500 rounded-md text-white font-semibold" onClick={handleDialogOpen}>        Add Instrument Group
</button>
<ToastContainer/>
    

      <AddInstrumentGroupDialog open={open} handleClose={handleDialogClose} family={name} mode="add" id={id} />

      <Header className="Page" title="Instrument Group Masters" />

      <GridComponent
        id="gridcomp"
        dataSource={data}
        width="auto"
        allowPaging
        allowSelection
        allowFiltering
        allowSorting
        toolbarClick={toolbarClick}
        toolbar={["ExcelExport", "PdfExport"]}
        pageSettings={{ pageSize: 10 }}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        allowExcelExport
        sortSettings={{ columns: [{ field: 'tool_group_id', direction: 'Descending' }] }}
        allowPdfExport
        rowSelected={handleRowClick}
        ref={g => grid = g}
      >
        <ColumnsDirective>
          {transportGridColumns.map((item, index) => (
            <ColumnDirective key={index} {...item}  visible={item.visible !== false}></ColumnDirective>
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Toolbar,
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            Edit,
            PdfExport,
            ExcelExport
          ]}
        />
      </GridComponent>
      <AddInstrumentFamilyDialog open={openn} handleClose={handleDialogClosee} instrumentGroup={instrumentGroup}/>
    </div>
    </div>
  );
};

export default GroupMaster;
