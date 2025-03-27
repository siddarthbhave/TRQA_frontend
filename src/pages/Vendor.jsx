import React, { useState ,lazy} from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Edit,
  Page,
  Toolbar,
  Group,
  ExcelExport,
  PdfExport,
  Filter
} from "@syncfusion/ej2-react-grids";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { Header } from "../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

// const CreateVendor = lazy(()=>import("../forms/AddVendor"))
import CreateVendor from "../forms/AddVendor";
const Vendor = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  let grid;
  const { excelExportProperties, addId } = useStateContext();

  const employeesGrid = [
    {
      field: "sl_no",
      headerText: "Sl No",
      width: "120",
      textAlign: "Center",
    },
    {
      field: "vendor_id",
      headerText: "Vendor ID",
      width: "150",
      textAlign: "Center",
      visible: false, // Hide the Vendor ID field
    },
    {
      field: "name",
      headerText: "Name",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "location",
      headerText: "Location",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "address",
      headerText: "Address",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "phone_number",
      headerText: "Phone number",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "email",
      headerText: "Email",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "vendor_type_name",
      headerText: "Vendor Type",
      width: "150",
      textAlign: "Center",
      template: (data) => {
        const vendorTypes = ["Manufacturer", "Dealer", "Calibration Agency"];
        return vendorTypes[data.vendor_type - 1]; // Assuming vendor_type is 1, 2, or 3
      },
    },
  ];

  const date = new Date().toISOString().split("T")[0];

  const toolbarClick = (args) => {
    const exportPattern = /(excelexport|pdfexport)$/;

    if (exportPattern.test(args.item.id)) {
      if (args.item.id.endsWith("pdfexport")) {
        const pdfExportProperties = {
          pageOrientation: "Landscape",
          header: {
            fromTop: 0,
            height: 130,
            contents: [
              {
                type: "Text",
                value: "TechnoRings, Shimoga",
                position: { x: 0, y: 50 },
                style: { textBrushColor: "#000000", fontSize: 20 },
              },
            ],
          },
        };
        grid.pdfExport(pdfExportProperties);
      } else if (args.item.id.endsWith("excelexport")) {
        grid.excelExport(excelExportProperties(employeesGrid.length));
      }
    }
  };

  const fetchVendorData = async (vendor_id) => {
    try {
      await axios.get(
        `${import.meta.env.VITE_APP_URL}/vendor_details/${vendor_id}/`
      );

      navigate(`${vendor_id}`);
    } catch (error) {
      console.error("Error fetching tool data:", error);
    }
  };

  const editing = {
    allowDeleting: true,
    allowEditing: true,
    allowAdding: true,
    mode: "Dialog",
  };
  const { data: vendors, refetch } = useQuery({
    queryKey: ["vendors"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_URL}/vendor/`
      );

      return addId(response?.data?.vendors);
    },
  });
  const handleActionComplete = async (args) => {
    if (args.requestType === "save") {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_URL}/add_vendor/`,
          args.data
        );

        if (response.data.success === false) {
          // Parse the error message from the response and toast it
          const errors = JSON.parse(response.data.errors);
          const errorMessage = errors.phone_number[0].message;
          toast.error(errorMessage);
        } else {
          toast.success("Successfully added vendor");
          refetch();
        }
      } catch (error) {
        console.error("Error inserting data:", error);
        toast.error("An error occurred while adding vendor");
      }
      refetch();
    } else if (args.requestType === "delete") {
      try {
        await axios.delete(`${import.meta.env.VITE_APP_URL}/${args.data[0].id}`);
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };
  const handleDialogClose = () => {
    setOpen(false);
    refetch();
  };
  const handleDialogOpen = () => {
    setOpen(true);
  };
  const rowSelected = (args) => {
    const selectedRecord = args.data["vendor_id"];
    fetchVendorData(selectedRecord);
  };

  return (
    <div className="m-2 pt-2 md:m-10 mt-24 md:p-10 bg-white rounded-3xl">
      <button
        className="bg-blue-500 rounded-sm py-2 px-4 text-white"
        onClick={handleDialogOpen}
      >
        Add Vendor
      </button>
      <Header category="Page" title="Vendors" />
      <ToastContainer />
      <GridComponent
        dataSource={vendors}
        width="auto"
        toolbar={["Search", "ExcelExport", "PdfExport"]}
        allowPaging
        allowSorting
        allowExcelExport
        toolbarClick={toolbarClick}
        allowPdfExport
        allowGrouping
        allowFiltering
        pageSettings={{ pageSize: 10 }}
        editSettings={editing}
        sortSettings={{
          columns: [{ field: "vendor_id", direction: "Descending" }],
        }}
        actionComplete={handleActionComplete}
        rowSelected={rowSelected}
        ref={(g) => (grid = g)}
      >
        <ColumnsDirective>
          {employeesGrid.map((item, index) => (
            <ColumnDirective
              key={index}
              field={item.field}
              width={item.width}
              textAlign={item.textAlign}
              headerText={item.headerText}
              visible={item.visible !== false} // Set visibility if defined
            />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Search,
            Toolbar,
            Edit,
            Group,
            Filter,
            ExcelExport,
            PdfExport,
            Page,
          ]}
        />
      </GridComponent>
      <CreateVendor open={open} handleClose={handleDialogClose} />
    </div>
  );
};

export default Vendor;
