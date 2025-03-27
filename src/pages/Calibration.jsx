import React, { useState, Suspense, lazy } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Group,
  Toolbar,
  Sort,
  Filter,
  Inject,
  Edit,
  PdfExport,
  ExcelExport,
} from "@syncfusion/ej2-react-grids";
import { CalibrationGrid } from "../data/apps";
import { useNavigate } from "react-router-dom";
import { Header } from "../components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateContext } from "../context/ContextProvider";
import { useSelector } from "react-redux";

// Lazy load components
// const CalibrationDialog = lazy(() => import("../forms/CalibrationDialog"));
// const FullPageLoading = lazy(() => import("../components/FullPageLoading"));
import CalibrationDialog from "../forms/CalibrationDialog";
import FullPageLoading from "../components/FullPageLoading";
const Calibration = () => {
  let grid;
  const date = new Date().toISOString().split("T")[0];
  const { calibrationData, refetch, isLoadingg } = useStateContext();
  const documentInfo = useSelector((state) => state.document);


  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const fetchToolData = async (instrument_no, instrument) => {
    try {
      navigate(`${instrument_no}`, { state: { instrument } });
    } catch (error) {
      console.error("Error fetching tool data:", error);
    }
  };

  const rowSelected = (args) => {
    const selectedRecord = args.data["instrument_no"];
    fetchToolData(selectedRecord, args.data);
  };

  const toolbarClick = (args) => {
    if (args.item.id === "gridcomp_pdfexport") {
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
    } else if (args.item.id === "gridcomp_excelexport") {
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
                  value: `LIST OF MONITORING & MEASURING EQUIPMENTS INCLUDING CALIBRATION SCHEDULE & CALIBRATION HISTORY OF ALL SHEDS PLANNED ON ${date}`,
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
                  colSpan: 11,
                  value: " "
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
    if (args.item.id === "Add") {
      setOpen(true);
    }
  };

  const pdfExportComplete = () => {
    grid.hideSpinner();
  };

  const handleDialogClose = () => {
    setOpen(false);
  };
  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleAddTool = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/add_instrument1/`,
        data
      );
      if (response.data.success === false) {
        toast.error(response.data.errors, {
          position: "top-center",
          autoClose: 1000,
          style: { width: "auto", style: "flex justify-center" },
          closeButton: false,
          progress: undefined,
        });
      } else {
        toast.success("Tool added successfully");
        refetch();
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.errors, {
        position: "top-center",
        autoClose: 1000,
        style: { width: "auto", style: "flex justify-center" },
        closeButton: false,
        progress: undefined,
      });
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <ToastContainer />
      <div className="flex justify-between">
        <div>
          <button
            className="bg-blue-500 rounded-sm py-2 px-4 text-white"
            onClick={handleDialogOpen}
          >
            Add Instrument
          </button>
        </div>
        <div></div>
      </div>
      <Header className="Page" title="Instrument details" />

      <Suspense fallback={<FullPageLoading />}>
        {isLoadingg ? ( // Conditional rendering based on loading state
          <FullPageLoading />
        ) : (
          <GridComponent
            id="gridcomp"
            dataSource={calibrationData}
            width="auto"
            allowGrouping
            allowPaging
            allowFiltering
            allowSorting
            toolbar={["PdfExport", "ExcelExport"]}
            allowExcelExport
            allowPdfExport
            pageSettings={{ pageSize: 10 }}
            rowSelected={rowSelected}
            pdfExportComplete={pdfExportComplete}
            sortSettings={{
              columns: [{ field: "instrument_no", direction: "Descending" }],
            }}
            toolbarClick={toolbarClick}
            ref={(g) => (grid = g)}
          >
            <ColumnsDirective>
              {CalibrationGrid?.map((item, index) => (
                <ColumnDirective key={index} {...item} visible={item.visible !== false} />
              ))}
            </ColumnsDirective>
            <Inject
              services={[
                Group,
                Toolbar,
                Sort,
                Filter,
                Page,
                Edit,
                PdfExport,
                ExcelExport,
              ]}
            />
          </GridComponent>
        )}

        <CalibrationDialog
          open={open}
          handleClose={handleDialogClose}
          handleAdd={handleAddTool}
        />
      </Suspense>
    </div>
  );
};

export default Calibration;
