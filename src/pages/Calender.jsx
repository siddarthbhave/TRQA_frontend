import React, { useState } from "react";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from "@syncfusion/ej2-react-schedule";
import { Header } from '../components';
import { service_orders_data  } from '../data/apps';
import { scheduleData } from "../data/apps";
const Calender = () => {
  const [newEventTitle, setNewEventTitle] = useState("");

  const handleEventCreate = (args) => {
    const { data } = args;
   
    if(data){
      const newEventTitle = data[0]?.Subject // Assuming Subject holds the title
    setNewEventTitle(newEventTitle);
    }

    
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
      <ScheduleComponent
        eventSettings={{ dataSource: scheduleData }}
        selectedDate={new Date(2021, 0, 10)}
        height="650px"
        actionComplete={handleEventCreate} // Call handleEventCreate when an event is added
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </div>
  );
};

export default Calender;
