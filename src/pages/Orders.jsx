import React from "react";
import {
  GridComponent,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
  ColumnsDirective,
  Toolbar
} from "@syncfusion/ej2-react-grids";
import { Header } from "../components";
import { ordersGrid, ordersData } from "../data/info";
const Orders = () => {
  let grid;
  const toolbar = ['PdfExport'];
  const toolbarClick = (args) => {
    if (grid && args.item.id === 'Grid_pdfexport') {
      const exportProperties = {
          dataSource: ordersData
      };
      grid.pdfExport(exportProperties);
    }
  }
   const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header className="Page" title="Orders" />
      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        width="auto"
        toolbar={toolbar}
        toolbarClick={toolbarClick} ref={g => grid = g}
        allowPaging
        allowSelection
        allowSorting
        allowExcelExport
        allowPdfExport
        
        editSettings={editing}
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}></ColumnDirective>
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
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default Orders;
