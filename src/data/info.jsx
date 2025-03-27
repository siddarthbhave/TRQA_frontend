
import { MdInventory } from "react-icons/md";
import product from "./product.jpg";
import { useSelector } from "react-redux";
import { FaWarehouse } from "react-icons/fa";
import {
  AiOutlineCalendar,
  AiOutlineTransaction,

} from "react-icons/ai";
import {
  FiShoppingBag,

} from "react-icons/fi";
import {
  BsKanban,

} from "react-icons/bs";
import avatar from "./avatar.jpg";
import { IoMdContacts } from "react-icons/io";

import { HiDocumentReport } from "react-icons/hi";

import { GrLocation } from "react-icons/gr";
import hero from "./na_feb_10.jpg";
export const images = { hero, avatar };
export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);
const customerGridImage = (props) => (
  <div className="image flex gap-4">
    <img
      className="rounded-full w-10 h-10"
      src={props.CustomerImage}
      alt="employee"
    />
    <div>
      <p>{props.CustomerName}</p>
      <p>{props.CustomerEmail}</p>
    </div>
  </div>
);

const customerGridStatus = (props) => (
  <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
    <p style={{ background: props.StatusBg }} className="rounded-full h-3 w-3" />
    <p>{props.Status}</p>
  </div>
);

export const customersGrid = [
  { type: 'checkbox', width: '50' },
  { headerText: 'Name',
    width: '150',
    template: customerGridImage,
    textAlign: 'Center' },
  { field: 'ProjectName',
    headerText: 'Project Name',
    width: '150',
    textAlign: 'Center' },
  { field: 'Status',
    headerText: 'Status',
    width: '130',
    format: 'yMd',
    textAlign: 'Center',
    template: customerGridStatus },
  {
    field: 'Weeks',
    headerText: 'Weeks',
    width: '100',
    format: 'C2',
    textAlign: 'Center' },
  { field: 'Budget',
    headerText: 'Budget',
    width: '100',
    format: 'yMd',
    textAlign: 'Center' },

  { field: 'Location',
    headerText: 'Location',
    width: '150',
    textAlign: 'Center' },

  { field: 'CustomerID',
    headerText: 'Customer ID',
    width: '120',
    textAlign: 'Center',
    isPrimaryKey: true,
  },

];

export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);

export const links = [
  
  {
    title: "Dashboard",
    links: [
      {
        name: "Home",
        icon: <FiShoppingBag />,
        link:"home",
        role:["admin" , "shed"],
      },
    ],
  },
  {
    title: "Pages",
    links: [
      {
        name: "Vendors",
        icon: <IoMdContacts />,
        link:"vendors",
        role:["admin"],
      },
      
      {
        name: "shed",
        icon: <FaWarehouse />,
        link:"shed",
        role:["admin"],
      },
        {
        name: "shed instruments",
        icon: <FaWarehouse />,
        link:`shed-tools`,
        role:["shed"],
      },
     

      {
        name: "Instruments list",
        icon: <MdInventory />,
        link:"calibration",
        role:["admin"],
      },
      
       {
        name: "Instrument History",
        icon: <AiOutlineTransaction />,
        link:"instruments",
        role:["admin"],
      },
       
       {
        name: "Instrument Family",
        icon: <AiOutlineTransaction />,
        link:"instrument-family",
        role:["admin"],
      },
        
     
      {
        name: "Instrument movement",
        icon: <AiOutlineTransaction />,
        link:"transport-history",
        role:["shed","admin"],
        shed:true,
      },
       {
        name: "Service orders",
        icon: <AiOutlineTransaction />,
        link:"service-history",
        role:["admin"],
      },
      {
        name: "Return order",
        icon: <HiDocumentReport />,
        link:`deliverychallan`,
        role:["admin"],
      },
       {
        name: "Document Details",
        icon: <HiDocumentReport />,
        link:`document-form`,
        role:["admin"],
      },
      // {
      //   name: "Generate Bill",
      //   icon: <HiDocumentReport />,
      //   link:`generate-bill/0`
      // },
    ],
  }
  // {
  //   title: "Apps",
  //   links: [
  //     {
  //       name: "calendar",
  //       icon: <AiOutlineCalendar />,
  //       link:"calendar"
  //     },
  //     {
  //       name: "kanban",
  //       icon: <BsKanban />,
  //       link:"kanban"
  //     },
      
  //   ],
  // },
];


export const employeesGrid = [
  {
    headerText: "Employee",
    width: "150",
    template: (props) => <gridEmployeeProfile {...props} />,
    textAlign: "Center",
  },
  { field: "Name", headerText: "", width: "0", textAlign: "Center" },
  {
    field: "Title",
    headerText: "Designation",
    width: "170",
    textAlign: "Center",
  },
  {
    headerText: "Country",
    width: "120",
    textAlign: "Center",
    template: (props) => <gridEmployeeCountry {...props} />,
  },
  {
    field: "HireDate",
    headerText: "Hire Date",
    width: "135",
    format: "yMd",
    textAlign: "Center",
  },
  {
    field: "ReportsTo",
    headerText: "Reports To",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "EmployeeID",
    headerText: "Employee ID",
    width: "125",
    textAlign: "Center",
  },
];

export const employeesData = [
  {
    EmployeeID: 1,
    Name: "Nancy Davolio",
    Title: "Sales Representative",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar || null,
  },
  {
    EmployeeID: 2,
    Name: "Nasimiyu Danai",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar || null,
  },
  {
    EmployeeID: 3,
    Name: "Iulia Albu",
    Title: "HR",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar || null,
  },
  {
    EmployeeID: 4,
    Name: "Siegbert Gottfried",
    Title: "Marketing Head",
    HireDate: "01/02/2021",
    Country: "USA",
    ReportsTo: "Carson",
    EmployeeImage: avatar || null,
  },
];

export const ordersGrid = [
  {
    headerText: "Image",
    template: gridOrderImage,
    textAlign: "Center",
    width: "120",
  },
  {
    field: "OrderItems",
    headerText: "Item",
    width: "150",
    editType: "dropdownedit",
    textAlign: "Center",
  },
  {
    field: "CustomerName",
    headerText: "Customer Name",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "TotalAmount",
    headerText: "Total Amount",
    format: "C2",
    textAlign: "Center",
    editType: "numericedit",
    width: "150",
  },
  {
    headerText: "Status",
    template: gridOrderStatus,
    field: "OrderItems",
    textAlign: "Center",
    width: "120",
  },
  {
    field: "OrderID",
    headerText: "Order ID",
    width: "120",
    textAlign: "Center",
  },

  {
    field: "Location",
    headerText: "Location",
    width: "150",
    textAlign: "Center",
  },
];

export const ordersData = [
  {
    OrderID: 10248,
    CustomerName: "Vinet",

    TotalAmount: 32.38,
    OrderItems: "Fresh Tomato",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage: product,
  },
  {
    OrderID: 345653,
    CustomerName: "Carson Darrin",
    TotalAmount: 56.34,
    OrderItems: "Butter Scotch",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product,
  },
  {
    OrderID: 390457,
    CustomerName: "Fran Perez",
    TotalAmount: 93.31,
    OrderItems: "Candy Gucci",
    Location: "New York",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product,
  },
  {
    OrderID: 893486,
    CustomerName: "Anika Viseer",
    TotalAmount: 93.31,
    OrderItems: "Night Lamp",
    Location: "Germany",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product,
  },
  {
    OrderID: 748975,
    CustomerName: "Miron Vitold",
    TotalAmount: 23.99,
    OrderItems: "Healthcare Erbology",
    Location: "Spain",
    Status: "rejected",
    StatusBg: "red",
    ProductImage: product,
  },
  {
    OrderID: 94757,
    CustomerName: "Omar Darobe",
    TotalAmount: 95.99,
    OrderItems: "Makeup Lancome Rouge",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product,
  },
  {
    OrderID: 944895,
    CustomerName: "Lulia albu",
    TotalAmount: 17.99,
    OrderItems: "Skincare",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product,
  },
  {
    OrderID: 845954,
    CustomerName: "Penjani",
    TotalAmount: 59.99,
    OrderItems: "Headphone",
    Location: "USA",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product,
  },
  {
    OrderID: 845954,
    CustomerName: "Jie Yan",
    TotalAmount: 87.99,
    OrderItems: "Shoes",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage:
      "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    OrderID: 38489,
    CustomerName: "Miron",
    TotalAmount: 87.99,
    OrderItems: "Ice Cream",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg",
  },
  {
    OrderID: 24546,
    CustomerName: "Frank",
    TotalAmount: 84.99,
    OrderItems: "Pan Cake",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    OrderID: 10248,
    CustomerName: "Vinet",

    TotalAmount: 32.38,
    OrderItems: "Fresh Tomato",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage: product,
  },
  {
    OrderID: 345653,
    CustomerName: "Carson Darrin",
    TotalAmount: 56.34,
    OrderItems: "Butter Scotch",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product,
  },
  {
    OrderID: 390457,
    CustomerName: "Fran Perez",
    TotalAmount: 93.31,
    OrderItems: "Candy Gucci",
    Location: "New York",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product,
  },
  {
    OrderID: 893486,
    CustomerName: "Anika Viseer",
    TotalAmount: 93.31,
    OrderItems: "Night Lamp",
    Location: "Germany",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product,
  },
  {
    OrderID: 748975,
    CustomerName: "Miron Vitold",
    TotalAmount: 23.99,
    OrderItems: "Healthcare Erbology",
    Location: "Spain",
    Status: "rejected",
    StatusBg: "red",
    ProductImage: product,
  },
  {
    OrderID: 94757,
    CustomerName: "Omar Darobe",
    TotalAmount: 95.99,
    OrderItems: "Makeup Lancome Rouge",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product,
  },
  {
    OrderID: 944895,
    CustomerName: "Lulia albu",
    TotalAmount: 17.99,
    OrderItems: "Skincare",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product,
  },
  {
    OrderID: 845954,
    CustomerName: "Penjani",
    TotalAmount: 59.99,
    OrderItems: "Headphone",
    Location: "USA",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product,
  },
  {
    OrderID: 845954,
    CustomerName: "Jie Yan",
    TotalAmount: 87.99,
    OrderItems: "Shoes",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage:
      "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    OrderID: 38489,
    CustomerName: "Miron",
    TotalAmount: 87.99,
    OrderItems: "Ice Cream",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg",
  },
  {
    OrderID: 24546,
    CustomerName: "Frank",
    TotalAmount: 84.99,
    OrderItems: "Pan Cake",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    OrderID: 10248,
    CustomerName: "Vinet",

    TotalAmount: 32.38,
    OrderItems: "Fresh Tomato",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage: product,
  },
  {
    OrderID: 345653,
    CustomerName: "Carson Darrin",
    TotalAmount: 56.34,
    OrderItems: "Butter Scotch",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product,
  },
  {
    OrderID: 390457,
    CustomerName: "Fran Perez",
    TotalAmount: 93.31,
    OrderItems: "Candy Gucci",
    Location: "New York",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product,
  },
  {
    OrderID: 893486,
    CustomerName: "Anika Viseer",
    TotalAmount: 93.31,
    OrderItems: "Night Lamp",
    Location: "Germany",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product,
  },
  {
    OrderID: 748975,
    CustomerName: "Miron Vitold",
    TotalAmount: 23.99,
    OrderItems: "Healthcare Erbology",
    Location: "Spain",
    Status: "rejected",
    StatusBg: "red",
    ProductImage: product,
  },
  {
    OrderID: 94757,
    CustomerName: "Omar Darobe",
    TotalAmount: 95.99,
    OrderItems: "Makeup Lancome Rouge",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product,
  },
  {
    OrderID: 944895,
    CustomerName: "Lulia albu",
    TotalAmount: 17.99,
    OrderItems: "Skincare",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product,
  },
  {
    OrderID: 845954,
    CustomerName: "Penjani",
    TotalAmount: 59.99,
    OrderItems: "Headphone",
    Location: "USA",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product,
  },
  {
    OrderID: 845954,
    CustomerName: "Jie Yan",
    TotalAmount: 87.99,
    OrderItems: "Shoes",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage:
      "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    OrderID: 38489,
    CustomerName: "Miron",
    TotalAmount: 87.99,
    OrderItems: "Ice Cream",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg",
  },
  {
    OrderID: 24546,
    CustomerName: "Frank",
    TotalAmount: 84.99,
    OrderItems: "Pan Cake",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    OrderID: 10248,
    CustomerName: "Vinet",

    TotalAmount: 32.38,
    OrderItems: "Fresh Tomato",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage: product,
  },
  {
    OrderID: 345653,
    CustomerName: "Carson Darrin",
    TotalAmount: 56.34,
    OrderItems: "Butter Scotch",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product,
  },
  {
    OrderID: 390457,
    CustomerName: "Fran Perez",
    TotalAmount: 93.31,
    OrderItems: "Candy Gucci",
    Location: "New York",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product,
  },
  {
    OrderID: 893486,
    CustomerName: "Anika Viseer",
    TotalAmount: 93.31,
    OrderItems: "Night Lamp",
    Location: "Germany",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product,
  },
  {
    OrderID: 748975,
    CustomerName: "Miron Vitold",
    TotalAmount: 23.99,
    OrderItems: "Healthcare Erbology",
    Location: "Spain",
    Status: "rejected",
    StatusBg: "red",
    ProductImage: product,
  },
  {
    OrderID: 94757,
    CustomerName: "Omar Darobe",
    TotalAmount: 95.99,
    OrderItems: "Makeup Lancome Rouge",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage: product,
  },
  {
    OrderID: 944895,
    CustomerName: "Lulia albu",
    TotalAmount: 17.99,
    OrderItems: "Skincare",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage: product,
  },
  {
    OrderID: 845954,
    CustomerName: "Penjani",
    TotalAmount: 59.99,
    OrderItems: "Headphone",
    Location: "USA",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage: product,
  },
  {
    OrderID: 845954,
    CustomerName: "Jie Yan",
    TotalAmount: 87.99,
    OrderItems: "Shoes",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    ProductImage:
      "https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
  {
    OrderID: 38489,
    CustomerName: "Miron",
    TotalAmount: 87.99,
    OrderItems: "Ice Cream",
    Location: "USA",
    Status: "active",
    StatusBg: "#03C9D7",
    ProductImage:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dairy-free-ice-cream-eae372d.jpg",
  },
  {
    OrderID: 24546,
    CustomerName: "Frank",
    TotalAmount: 84.99,
    OrderItems: "Pan Cake",
    Location: "Delhi",
    Status: "complete",
    StatusBg: "#8BE78B",
    ProductImage:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  },
  {
    OrderID: 874534,
    CustomerName: "Danai",
    TotalAmount: 122.99,
    OrderItems: "Watch",
    Location: "USA",
    Status: "canceled",
    StatusBg: "#FF5C8E",
    ProductImage:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
  },
];

export const contextMenuItems = [
  "AutoFit",
  "AutoFitAll",
  "SortAscending",
  "SortDescending",
  "Copy",
  "Edit",
  "Delete",
  "Save",
  "Cancel",
  "PdfExport",
  "ExcelExport",
  "CsvExport",
  "FirstPage",
  "PrevPage",
  "LastPage",
  "NextPage",
];
