import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const AddShedTools = ({setClose}) => {
   const [tools,setTools] = useState([]);
  useEffect(() => {

       const fetchTools = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}/instrument-tools/`);
      setTools(response.data);
    } catch (error) {
      console.error("Error fetching sheds:", error);
    }
  };

  fetchTools();
  }, []);
  const shed = useParams()
 
 

  const {
    register,
    handleSubmit,
    formState: {  },
  } = useForm({
    defaultValues: {
      shed_id:shed,
      tool:null
     
    },
    mode: "onChange",
  });

  const submitHandler = async (data) => {
    try {
      const requestData = {
      shed_id: shed.id,
      tool_id: data.tool,
      
    };
   
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/add_shed_tools/`, requestData);
     
      toast.success("Tool added successfully", {
        position: "top-center",
        autoClose: 1000,
        style: {
          width: "auto",
          style: "flex justify-center",
        },
        closeButton: false,
        progress: undefined,
      });
      setTimeout(()=> {
        setClose()
      },2000)
    } catch (error) {
      toast.error("Unable to add tools")
      console.error('Error sending data:', error);
    }
  };




  return (
    <div className="fixed inset-0 z-[1000] flex justify-center  w-full overflow-auto bg-black/50">
      <div className="h-fit max-w-4xl w-[500px] mx-auto my-auto bg-secondary-dark-bg rounded-lg text-white p-5">
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="w-[400px] my-5 p-0 space-y-6 mx-auto"
            >
              

              <div className="w-[400px]">
                <label className="flex flex-row justify-center items-center">
                  <span className="font-semibold w-full">Tool:</span>
                  <select
                    {...register("tool", {
                      required: {
                        value: true,
                        message: "Source shed is required",
                      },
                    })}
                    name="tool"
                    className="form-select py-2 px-2 dark:bg-main-dark-bg rounded-md mt-1 w-full"
                  
                    required
                  >
                    <option value="">Select a tool</option>
                    {tools?.instrument_models?.map((tool) => (
                      <option key={tool.instrument_no} value={tool.instrument_no}>
                        {tool.instrument_name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              

           


              

              <div className="flex flex-row justify-center items-center my-auto">
                <button
                  type="submit"
                  className="bg-black flex mt-3 text-white font-semibold py-2 px-2 rounded-md mx-auto items-center hover:bg-gray-950"
                >
                  Add Tool
                </button>
                <button
                  type="button"
                  onClick={()=>setClose(false)}
                  className="bg-black flex mt-3 text-white font-semibold py-2 px-2 rounded-md mx-auto items-center hover:bg-gray-950"
                >
                  Cancel
                </button>
                
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
    
  );
};

export default AddShedTools;
