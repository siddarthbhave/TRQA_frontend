import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
const Instrument = ({}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [createError, setCreateError] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    isLoading,
    onSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      InstrumentNo: 0,
      InstrumentName: "",
      ManufacturerName: "",
      Description: "",
      Range: 0,
      Type: "",
      YearOfPurchase: 0,
      GST: 0,
      CalibrationSchedule: 0,
      Year: 0,
      LeastCount: 0,
      ModelNo: 0,
      CompanySLNo: 0,
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {};
  return (
    <>
      <div className="fixed inset-0 z-[1000] flex justify-center items-center w-screen max-w-screen overflow-auto bg-black/50">
        <div className=" max-w-4xl w-[100%] h-screen mx-auto my-auto rounded-lg bg-white p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*  {
      InstrumentNo:0,
      InstrumentName:"",
      ManufacturerName:"",
      Description:"",
      Range:0,
      Type:"",
      YearOfPurchase:0,
      GST:0,
      CalibrationSchedule:0,
      Year:0,
      LeastCount:0,
      ModelNo:0,
      CompanySLNo:0,
    }, */}
            <Input
              label="Instrument Number"
              id="InstrumentNo"
              type="text"
              register={register}
              errors={errors}
              disabled={isLoading}
            />

            <Input
              label="Instrument Name"
              id="InstrumentName"
              type="text"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <Input
              label="Manufacturer Name"
              id="ManufacturerName"
              type="text"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <Input
              label="Description"
              id="Description"
              type="text"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <Input
              label="Range"
              id="Range"
              type="text"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <Input
              label="Type"
              id="Type"
              type="text"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <Button disabled={isLoading} fullWidth type="submit">
              Add instrument
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Instrument;
