import React,{useState,lazy,useEffect,useMemo} from "react";
import {GridComponent,ColumnsDirective,ColumnDirective,Page,Resize,Inject,Edit,Toolbar,Sort,Filter, PdfExport, ExcelExport, Group} from '@syncfusion/ej2-react-grids'
import { Header } from "../components";
import axios from "axios"
import { useQuery } from "@tanstack/react-query";
import ToolDialog from "./ToolDialog";
import { useSelector } from "react-redux";
import { useStateContext } from "../context/ContextProvider";
// const CreateMovement = lazy(()=> import("../forms/Transport"))
import CreateMovement from "../forms/Transport";
const History = () => {
      const [open, setOpen] = useState(false);
         const [openn, setOpenn] = useState(false);
    const [movementId, setMovementId] = useState(null);
 const { role,user } = useSelector((state) => state.auth);
  const {excelExportProperties,addId} = useStateContext()
  const { data: transportOrders, refetch } = useQuery({
  queryKey: ["transportorders"],
  queryFn: async () => {
    const response = await axios.get(`${import.meta.env.VITE_APP_URL}/all_transport_orders/`);
    let transformedData = response.data.transport_orders.map(order => ({
      ...order,
      acknowledgment: order.acknowledgment ? "accepted" : "not accepted"
    }));

  
    if(role === "shed"){
      transformedData = transformedData.filter((order)=> order.destination_shed_name === user || order.source_shed_name === user)
    }
   
    return addId(transformedData);
  },
});
  console.log(transportOrders)


 
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
 
  useEffect(()=> {
    window.scrollTo(0,0);
  },[])
   const transportGridColumns = [
     {field: "sl_no",
    headerText: "Sl No",
    width: "120",
    textAlign: "Center"},
    { field: "movement_id", headerText: "Movement ID", width: "150", textAlign: "Center",visible:false },
    { field: "movement_date", headerText: "Movement date", width: "150", textAlign: "Center" },
    { field: "acknowledgment", headerText: "Status", width: "150", textAlign: "Center" },
    { field: "source_shed_name", headerText: "Source shed", width: "150", textAlign: "Center" },
    { field: "destination_shed_name", headerText: "Destination shed", width: "150", textAlign: "Center" },
    { field: "tool_count", headerText: "Instrument count", width: "150", textAlign: "Center" }
  ];
    const handleRowClick = (args) => {
    const movementId = args.data.movement_id;
  
      setMovementId(movementId)
      handleDialogOpenn();
   
  };
    const date = new Date().toISOString().split('T')[0];
let grid;
  const toolbarClick = (args) => {
  if (grid) {
    switch (args.item.id) {
      case 'gridcomp_pdfexport':
        grid.pdfExport({
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
        });
        break;
      case 'gridcomp_excelexport':
        grid.excelExport(excelExportProperties(transportGridColumns.length));
        break;
      default:
        break;
    }
  }
};

  // const toolbarClickk = (args) => {
  //   if(grid){
  //     if (args.item.id === 'gridcomp_pdfexport') {
  //           const pdfExportProperties = {
  //               pageOrientation: 'Landscape',
  //               header: {
  //                   fromTop: 0,
  //                   height: 130,
  //                   contents: [
  //                       {
  //                           type: 'Text',
  //                           value: 'TechnoRings, Shimoga',
  //                           position: { x: 0, y: 50 },
  //                           style: { textBrushColor: '#000000', fontSize: 20 }
  //                       }
  //                   ]
  //               }
  //           };
  //           grid.pdfExport(pdfExportProperties);
  //       } else if (args.item.id === 'gridcomp_excelexport') {
  //           const excelExportProperties = {
  //               header: {
  //                   headerRows: 2,
  //                   rows: [
  //                       {
  //                           cells: [
  //                               {
  //                                   colSpan: transportGridColumns.length, // Adjust according to your column span
  //                                   value: 'TechnoRings, Shimoga',
  //                                   style: { fontColor: '#000000', fontSize: 20, hAlign: 'Center', bold: true }
  //                               }
  //                           ]
  //                       }, {
  //                           cells: [
  //                               {
  //                                   colSpan: transportGridColumns.length, // Adjust according to your column span
  //                                   value: `List of monitoring and measuring equipments including calibration schedule and calibration history of all sheds planned on ${date}`,
  //                                   style: { fontColor: '#000000', fontSize: 10, hAlign: 'Center',wAlign:'Center', bold: true }
  //                               }
  //                           ] 
  //                       }
  //                   ]
  //               }
        
                
  //           };
  //           grid.excelExport(excelExportProperties);
  //       }
  //   }
  //   };

   const transportOrdersMemo = useMemo(() => transportOrders, [transportOrders]);
console.log(grid)
 return (
  <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <button       className="bg-blue-500 rounded-sm py-2 px-4 text-white" 
 onClick={handleDialogOpen}>Add Instrument Movement</button>
 
      <Header className="Page" title="Instrument movement" />
      <GridComponent
        ref={(g)=>grid=g}
        dataSource={transportOrdersMemo}  // Use memoized data to prevent clearing
        width="auto"
        allowFiltering
        allowGrouping
        allowPaging
        allowSelection
        allowSorting
        toolbar={["ExcelExport", "PdfExport"]}
        pageSettings={{ pageSize: 10 }}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        toolbarClick={toolbarClick}
        allowExcelExport
        sortSettings={{ columns: [{ field: 'movement_id', direction: 'Descending' }] }}
        allowPdfExport
        rowSelected={handleRowClick}
      >
        <ColumnsDirective>
          {transportGridColumns.map((item, index) => (
            <ColumnDirective key={index} {...item}></ColumnDirective>
          ))}
        </ColumnsDirective>
        <Inject services={[Group, Toolbar, Sort, Filter, Page, Resize, Edit, PdfExport, ExcelExport]} />
      </GridComponent>
        <CreateMovement open={open} handleClose={handleDialogClose} />
      <ToolDialog open={openn} handleClose={() => setOpenn(false)} movementId={movementId} />
    </div>
  );
};

export default History;