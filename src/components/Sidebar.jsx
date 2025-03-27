import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { links } from "../data/info";
import { useSelector, useDispatch } from "react-redux";
import { useStateContext } from "../context/ContextProvider";
import { logout } from "../store/actions";
import UpdateShed from "../forms/UpdateShed";
import { useQuery, useMutation } from "@tanstack/react-query"; // Import useMutation for making POST/PUT requests
import axios from "axios";
import { ContactSupport } from "@mui/icons-material";

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
  const { role, id, user } = useSelector((state) => state.auth);

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  // Fetch shed details using useQuery
  const { data: shed, isLoading: shedLoading, refetch } = useQuery({
    queryKey: ["shed",id],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}/shed_detail/${id}/`);
      return response.data;
    },
  });

  
 

  const [update, setUpdate] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to track if editing mode is active
  const [shedDetails, setShedDetails] = useState(""); // State for the textarea content

  // Update shed details state when data is fetched
  React.useEffect(() => {
    if (shed) {
      setShedDetails(shed.shed); // Initialize shedDetails with the fetched data
    }
  }, [shed]);

  const updateShed = () => {
    setUpdate(true);
  };

  const closeShed = () => {
    setUpdate(false);
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  // Mutation to update shed details
  const updateShedDetails = async (newDetails)=> {
      const data = {
        "shed_note": newDetails
      }
      
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/update_shed_note/shed/${id}/`, data);
      if(response.data.success){
        setIsEditing(false)
      }
     
      
   
  }
  
  const handleEdit = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleSave = () => {
    updateShedDetails(shedDetails); // Save the updated details
  };

  return (
    <div className="px-3 h-screen md:overflow-hidden bg-main-dark-bg left-0 overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          {/* Render UpdateShed form conditionally */}
          {update && shed && (
            <UpdateShed
              shed={shed}
              open={update}
              handleClose={closeShed} // Pass an onClose prop to handle form closing
            />
          )}

          <div className="flex justify-between items-center">
            <Link
              to="/home"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Techno Rings</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {role !== "admin" && (
              <div
                className={`flex hover:cursor-pointer items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 bg-[#7352FF]`}
              >
                <span
                  onClick={updateShed}
                  className="capitalize text-center font-semibold flex mx-auto"
                >
                  {user}
                </span>
              </div>
            )}

            {links.map((item) => (
              <div key={item.title}>
                <p className="text-white m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map(
                  (link) =>
                    link.role.includes(role) && (
                      <NavLink
                        to={link.link === "shed-tools" ? `/${link.link}/${id}` : `/${link.link}`}
                        key={link.name}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : "",
                        })}
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                      >
                        {link.icon}
                        <span className="capitalize ">
                          {link.name === "shed instruments" ? `${user} Instruments List` : link.name}
                        </span>
                      </NavLink>
                    )
                )}
              </div>
            ))}

            {/* Add Textarea for Shed Details */}
            <div className="mt-6">
              <p className="text-white mb-2">Shed Details:</p>
              <textarea
                value={shedDetails?.shed_note}
                onChange={(e) => setShedDetails(e.target.value)}
                disabled={!isEditing}
                className="w-full h-32 p-2 text-gray-800 rounded-md bg-white resize-none"
              />
              <div className="flex justify-end mt-2">
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            {/* <NavLink
              onClick={handleLogout}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : "",
              })}
              className={`absolute bottom-0 w-[90%] flex mx-4 items-center left-0 justify-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 ${currentColor}`}
            >
              <span className="capitalize text-center font-semibold flex mx-auto">
                LOGOUT
              </span>
            </NavLink> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
