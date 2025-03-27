import React,{useState,useEffect,lazy} from "react";
import {GridComponent,ColumnsDirective,ColumnDirective,Page,Resize,ContextMenu,Inject,Edit,Toolbar,Sort,Filter, PdfExport, ExcelExport, Group} from '@syncfusion/ej2-react-grids'
import { Header } from "../components";
import axios from "axios"
import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";


import { useStateContext } from "../context/ContextProvider";

// const AddInstrumentFamilyDialog = lazy(()=>import("../forms/InstrumentGroup"));
import AddInstrumentFamilyDialog from "../forms/InstrumentGroup";
const InstrumentFamily = () => {
  const [open, setOpen] = useState(false);
  const {excelExportProperties,addId} = useStateContext()


  const { data: masters, refetch } = useQuery({
    queryKey: ["family"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}/instrument-family-group-tools/`);
      return addId(response.data.instrument_family_groups);
    },
  });

  const handleDialogClose = () => {
    setOpen(false);
    refetch();
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();

  const handleRowClick = async (args) => {
    const id = args.data.instrument_family_id;
    navigate(`master/${id}`)
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const transportGridColumns = [
    
    {field: "sl_no",
    headerText: "Sl No",
    width: "120",
    textAlign: "Center"},
    { field: "instrument_family_id", headerText: "Instrument Family ID", width: "150", textAlign: "Center",visible:false },
    { field: "instrument_family_name", headerText: "Instrument Family Name", width: "150", textAlign: "Center" },
   
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
  let grid;
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
               <button className="px-5 py-2 bg-blue-500 rounded-md text-white font-semibold" onClick={handleDialogOpen}>Add instrument family</button>

      <AddInstrumentFamilyDialog open={open} handleClose={handleDialogClose} />

      <Header className="Page" title="Instrument family group" />

      <GridComponent
        id="gridcomp"
        dataSource={masters}
        width="auto"
        allowPaging
        allowSelection
        allowSorting
        allowFiltering
        allowGrouping
        toolbarClick={toolbarClick}
        toolbar={["ExcelExport","PdfExport"]}
        pageSettings={{ pageSize: 10 }}
       
        allowExcelExport
        sortSettings={{ columns: [{ field: 'instrument_family_id', direction: 'Descending' }] }}
        allowPdfExport
        rowSelected={handleRowClick} // Add rowSelected event handler
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
            Group,
            
            Page,
            Edit,
            PdfExport,
            ExcelExport
          ]}
        />
      </GridComponent>

    </div>
  );
};

export default InstrumentFamily;
