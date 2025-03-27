import { TextBoxComponent, NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import React from 'react';

const CreateVendor = (props) => {
  return (
    <div className="w-[100%] flex justify-center items-center">
    <div className="grid grid-cols-1 gap-y-4 gap-x-2 w-full">
      <div className="flex flex-row justify-between items-center  gap-x-3">
        <label htmlFor="MovementDate" className="w-1/2 px-3">Movement Date</label>
        <TextBoxComponent id="MovementDate" value={props.MovementDate} floatLabelType="Auto" className="w-1/2" />
      </div>
      <div className="flex flex-row justify-between items-center gap-x-3">
        <label htmlFor="Tool" className="w-1/2 px-3">Instrument</label>
        <TextBoxComponent id="Tool" value={props.Tool} floatLabelType="Auto" className="w-1/2"   />
        </div>
      <div className="flex flex-row justify-between items-center gap-x-3">
        <label htmlFor="SourceShed" className="w-1/2 px-3">Source Shed</label>
        <TextBoxComponent id="SourceShed" value={props.SourceShed} floatLabelType="Auto" className="w-1/2" />
      </div>
      <div className="flex flex-row justify-between items-center gap-x-3">
        <label htmlFor="DestinationShed" className="w-1/2 px-3">Destination Shed</label>
        <TextBoxComponent id="DestinationShed" value={props.DestinationShed} floatLabelType="Auto" className="w-1/2"/>
      </div>
      <div className="flex flex-row justify-between items-center gap-x-3">
        <label htmlFor="ToolCount" className="w-1/2 px-3">Instrument Count</label>
        <NumericTextBoxComponent id="ToolCount" value={props.ToolCount} floatLabelType="Auto" className="w-1/2" />
      </div>
      <div className="flex flex-row justify-between items-center gap-x-3">
        <label htmlFor="InstrumentName" className="w-1/2 px-3">Instrument Name</label>
        <TextBoxComponent id="InstrumentName" value={props.InstrumentName} floatLabelType="Auto" className="w-1/2"/>
      </div>
    </div>
    </div>
  );
}

export default CreateVendor;
