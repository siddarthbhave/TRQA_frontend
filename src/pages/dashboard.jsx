import React, { useEffect, useState } from 'react';
import { BsPersonWorkspace } from "react-icons/bs";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { FaWarehouse } from 'react-icons/fa';

import axios from "axios";


import { useSelector } from 'react-redux';

const Homepage = () => {
  const [displayedOrders, setDisplayedOrders] = useState(5);
    const [displayedNotifications, setNotifications] = useState(5);
  const [request, setRequest] = useState("recent_transport_orders");
  const [table, setTable] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Current month as default
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
 const {  role,user } = useSelector((state) => state.auth);

  const [count, setCount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${import.meta.env.VITE_APP_URL}/count_of/${selectedMonth}/`);
        if (response.data["data"]) {
          const data = response.data["data"];
       

          // Update the state with the fetched data
          setCount(data);
        
        if(role ===  "shed"){
         const filteredTools = data.tools_to_notify.filter((tool) => tool.current_shed === user);

            // Update the count state with the filtered tools
            setCount((prevCount) => ({
              ...prevCount,
              tools_to_notify: filteredTools,
              tools_to_notify_count: filteredTools.length
            }));
        }
      }
      } catch (error) {
        console.error('Error fetching count data:', error);
      }
    };
    fetchData();
  }, [selectedMonth]);

 

 
  

 

  const handleLoadMore = () => {
    setDisplayedOrders((prevCount) => prevCount + 5);
  };

  const handleLoadLess = () => {
    setDisplayedOrders((prevCount) => Math.max(prevCount - 5, 5));
  };
  
  const handleLoadMoreNotifications = () => {
    setNotifications((prevCount) => prevCount + 5);
  };

  const handleLoadLessNotifications = () => {
    setNotifications((prevCount) => Math.max(prevCount - 5, 5));
  };

  const transportOrdersHeaders = [
    { label: "Movement ID", key: "movement_id" },
    { label: "Movement Date", key: "movement_date" },
    { label: "Status", key: "acknowledgment" },
    { label: "Instrument count", key: "tool_count" },
    { label: "Source shed", key: "source_shed_name" },
    { label: "Destination shed", key: "destination_shed_name" }
  ];

  const serviceOrdersHeaders = [
    { label: "Service ID", key: "service_id" },
    { label: "Date", key: "date" },
    { label: "Amount", key: "amount" },
    { label: "Description", key: "description" },
    { label: "Instrument count", key: "tool_count" },
    { label: "Vendor", key: "vendor_name" }
  ];

  const deliveryChallanHeaders = [
    { label: "ID", key: "deliverychallan_id" },
    { label: "Received date", key: "received_date" },
    { label: "Vendor", key: "vendor_name" },
    { label: "Shed", key: "shed_name" },
    { label: "Service ID", key: "service" }
  ];

  useEffect(() => {
    if (request) {
      axios.get(`${import.meta.env.VITE_APP_URL}/${request}/`)
        .then((response) => {
          const parts = request.split('_');
          const lastTwoWords = parts.slice(-2).join('_');
          let data = response.data[lastTwoWords]
     
          if(lastTwoWords === "transport_orders"){
            setTable(data.filter((order)=> order.acknowledgment === false ))
          }
           else {
            setTable(data);
           }
          
          if(role === "shed")
          {
            if (
              data.some((order) => 'destination_shed_name' in order) ||
              data.some((order) => 'shed_name' in order)
            ) {
              const filteredData = data.filter((order) =>
                order.destination_shed_name
                  ? order.destination_shed_name === user
                  : order.shed_name === user
              );

              // Update the table with the filtered data
              setTable(filteredData);

          }
        }
      }
    ).catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [request]);

  const convertToSentenceCase = (str) => {
    if (!str) return str;

    // Replace underscores with spaces
    const spacedStr = str.replace(/_/g, ' ');

    // Convert to sentence case
    return spacedStr.charAt(0).toUpperCase() + spacedStr.slice(1).toLowerCase();
  };

  const getHeaders = () => {
    switch (request) {
      case "recent_transport_orders":
        return transportOrdersHeaders;
      case "recent_service_orders":
        return serviceOrdersHeaders;
      case "recent_delivery_challan":
        return deliveryChallanHeaders;
      default:
        return [];
    }
  };
  const headers = getHeaders();
  
  return (
    <div className='bg-main-dark-bg m-10 flex flex-col gap-y-auto mt-12'>
      {/* <div className='w-full flex justify-end items-end '>
        <button onClick={handleLogout} className=' px-6 text-white font-semibold py-2 rounded-md bg-indigo-600 hover:bg-indigo-800'>LOGOUT</button>
      </div> */}
      <div className='w-full flex flex-row justify-start h-[500px]  gap-x-5'>
        <div className='grid grid-cols-1 lg:grid-cols-1 max-h-10 gap-5 lg:w-1/4'>
          <div className='bg-gray-800 p-8'>
            <p className='text-light-gray-500 flex flex-row h-10 items-center gap-x-3 text-xl text-white'>
              <span className='p-1 bg-[#8177d5] rounded-md'>
                <BsPersonWorkspace color='#2e1cc9'/>
              </span>Instrument movement</p>
            <p className='mt-3 font-semibold text-white text-2xl'>{count && count?.transport_order_count}</p>
            <p className='text-sm text-gray-500'>Active</p>
            <p onClick={() => setRequest("recent_transport_orders")} className='text-sm text-white px-3 py-2 bg-[#2e1cc9] rounded-md my-3 hover:cursor-pointer mx-10 flex justify-center'>View more</p>
          </div>
      
      {role === "admin" &&
        <div className='bg-gray-800 p-8'>
          <p className='text-light-gray-500 flex flex-row h-10 items-center gap-x-3 text-xl text-white'>
            <span className='p-1 bg-[#8177d5] rounded-md'>
              <FaWarehouse color='#2e1cc9'/>
            </span>Delivery Challan</p>
          <p className='mt-3 font-semibold text-white text-2xl'>{count && count?.deliverychallan_count}</p>
          <p className='text-sm text-gray-500'>Active</p>
          <p onClick={() => setRequest("recent_delivery_challan")} className='text-sm text-white px-3 py-2 bg-[#2e1cc9] rounded-md my-3 hover:cursor-pointer mx-10 flex justify-center'>View more</p>
        </div>
      }
         {
          role === "admin" &&  <div className='bg-gray-800 p-8'>
            <p className='text-light-gray-500 flex flex-row h-10 items-center gap-x-3 text-xl text-white'>
              <span className='p-1 bg-[#8177d5] rounded-md'>
                <MdOutlineMiscellaneousServices color='#2e1cc9'/>
              </span>Services</p>
            <p className='mt-3 font-semibold text-white text-2xl'>{count && count?.service_order_count}</p>
            <p className='text-sm text-gray-500'>Active</p>
            <p onClick={() => setRequest("recent_service_orders")} className='text-sm text-white px-3 py-2 bg-[#2e1cc9] rounded-md my-3 hover:cursor-pointer mx-10 flex justify-center'>View more</p>
          </div>
         }
          
        </div>
           <div className=" w-3/4 overflow-x-auto">
        <p className='font-bold text-3xl text-white mb-3'> {convertToSentenceCase(request === "recent_transport_orders" ? "recent_instrument_movements" : request)}</p>
        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              {headers.map((header, index) => (
                <th key={index} scope="col" className="px-6 py-3 text-center">{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table?.slice(0, displayedOrders).map((row, index) => (
              <tr key={index} className="border-b bg-gray-800 text-white border-gray-700">
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-center">
                    {header.key === "acknowledgment"
                      ? row[header.key] ? "Acknowledged" : "Not Acknowledged"
                      : row[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
         <div className="text-center my-4">
        {table && table.length > displayedOrders && (
          <button onClick={handleLoadMore} className="text-sm text-white px-3 py-2 bg-[#2e1cc9] rounded-md my-2">
            Load More
          </button>
        )}
        {displayedOrders > 5 && (
          <button onClick={handleLoadLess} className="text-sm text-white px-3 py-2 bg-[#2e1cc9] rounded-md my-2">
            Load Less
          </button>
        )}
      </div>
      </div>
      </div>

     
     
      <div className='flex flex-col gap-5  mt-[20%] gap-x-3'>
       <div className='flex flex-row mx-auto gap-x-4'>
          <div className='text-center'>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className='px-6 py-3 text-lg bg-[#2e1cc9] text-gray-300 rounded-md'
        >
          {Array.from({ length: 12 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {new Date(0, index).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className='px-6 py-3 text-lg bg-[#2e1cc9] text-gray-300 rounded-md'
        >
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index} value={new Date().getFullYear() + index}>
      {new Date().getFullYear() + index}
    </option>
          ))}
        </select>
      </div>
       </div>
        
        {/* {notificationData && notificationData.length > 0 && ( */}
          <div className='bg-gray-700 p-4 h-auto rounded-md lg:w-full'>
            <p className='font-bold text-white uppercase text-xl text-center mb-2'>Notifications</p>
            <div className='overflow-x-auto'>
              <table className='min-w-full bg-white'>
                <thead className='bg-gray-900 text-white'>
                  <tr>
                    <th className='w-1/3 text-center py-3 px-4 uppercase font-semibold text-sm'>Instrument Code</th>
                    <th className='w-1/3 text-center py-3 px-4 uppercase font-semibold text-sm'>Shed name</th>
                    <th className='w-1/3 text-center py-3 px-4 uppercase font-semibold text-sm'>Next calibration date</th>
                    <th className='w-1/3 text-center py-3 px-4 uppercase font-semibold text-sm'>Remaining days</th>
                  </tr>
                </thead>
                <tbody className='text-gray-700'>
                  {count && count.tools_to_notify
          ?.filter(notification => {
            const notificationYear = new Date(notification.notification_date).getFullYear();

            
            return notificationYear === selectedYear;
          }).slice(0,displayedNotifications).map((notification, index) => (
                    <tr key={index} className='bg-gray-200'>
                      <td className='w-1/3 text-center py-3 px-4'>{notification.instrument_name}</td>
                      <td className='w-1/3 text-center py-3 px-4'>{notification.current_shed}</td>
                      <td className='w-1/3 text-center py-3 px-4'>{notification.next_calibration_date === null ? "Null" : notification.next_calibration_date}</td>
                      <td className='w-1/3 text-center py-3 px-4'>{notification.remaining_days}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
             <div className="text-center my-4">
        {count && count.tools_to_notify_count > displayedOrders && (
          <button onClick={handleLoadMoreNotifications} className="text-sm text-white px-3 py-2 bg-[#2e1cc9] rounded-md my-2">
            Load More
          </button>
        )}
        {displayedOrders > 5 && (
          <button onClick={handleLoadLessNotifications} className="text-sm text-white px-3 py-2 bg-[#2e1cc9] rounded-md my-2">
            Load Less
          </button>
        )}
      </div>
          </div>
    {/* )} */}
      </div>

 
    </div>
  );
};

export default Homepage;
