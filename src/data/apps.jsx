

export const shedToolsData = [
  { shedtool_id: 1, shed_id: 1, using_tool_id: 'Tool 1' },
  { shedtool_id: 2, shed_id: 1, using_tool_id: 'Tool 2' },
  { shedtool_id: 3, shed_id: 2, using_tool_id: 'Tool 3' },
  { shedtool_id: 4, shed_id: 3, using_tool_id: 'Tool 4' },
  { shedtool_id: 5, shed_id: 4, using_tool_id: 'Tool 5' }
];

export const shedVendorsData = [
  { shedvendor_id: 1, shed_id: 1, vendor_id: 'Vendor 1' },
  { shedvendor_id: 2, shed_id: 1, vendor_id: 'Vendor 2' },
  { shedvendor_id: 3, shed_id: 2, vendor_id: 'Vendor 3' },
  { shedvendor_id: 4, shed_id: 3, vendor_id: 'Vendor 4' },
  { shedvendor_id: 5, shed_id: 4, vendor_id: 'Vendor 5' }
];

export const shedDetailsGrid = [
 
    {field: "sl_no",
    headerText: "Sl No",
    width: "120",
    textAlign: "Center"},
  
  {
    field: "shed_id",
    headerText: "ID",
    width: "120",
    textAlign: "Center",
    visible:false
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
    field: "phone_number",
    headerText: "Phone number",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "password",
    headerText: "Password",
    width: "150",
    textAlign: "Center",
  },
]

export const shedVendorsGrid = [
  { type: 'checkbox', width: '50' },
  {
    field: "shed_id",
    headerText: "ID",
    width: "120",
    textAlign: "Center",
  },
   {
    field: "shedvendor_id",
    headerText: "Shed vendor",
    width: "120",
    textAlign: "Center",
  },
   {
    field: "vendor_id",
    headerText: "Vendor",
    width: "150",
    textAlign: "Center",
  },
  
]


export const CalibrationGrid = [

    {field: "sl_no",
    headerText: "Sl No",
    width: "120",
    textAlign: "Center"},
  {
  field: "instrument_no",
    headerText: "Instrument Number",
    width: "120",
    textAlign: "Center",
    visible:false
  },
  

    {
    field: "type_of_tool_name",
    headerText: "Instrument Name",
    width: "150",
    textAlign: "Center",
  },
 
  {
    field: "manufacturer_name",
    headerText: "Manufacturer Name",
    width: "150",
    textAlign: "Center",
  },
    {
    field: "instrument_name",
    headerText: "Instrument Code",
    width: "150",
    textAlign: "Center",
  },
   {
    field: "current_shed_name",
    headerText: "Shed",
    width: "150",
    textAlign: "Center",
  },
 
  {
    field: "year_of_purchase",
    headerText: "Year of purchase",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "gst",
    headerText: "GST",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "instrument_range",
    headerText: "Range",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "least_count",
    headerText: "Least Count",
    width: "100",
    textAlign: "Center",
  },
 
  
  {
    field: "calibration_frequency",
    headerText: "Calibration Frequency",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "calibration_date",
    headerText: "Calibration Date",
    width: "150",
    textAlign: "Center",
  },
   {
    field: "next_calibration_date",
    headerText: "Next Calibration Date",
    width: "150",
    textAlign: "Center",
  },
   {
    field: "description",
    headerText: "Remarks",
    width: "120",
    textAlign: "Center",
  },

];

export const calibrationHistoryGrid = [
  {
   field: "sl_no",
   headerText: "Sl No",
    width: "120",
    textAlign: "Center", 
  },
  {
   field: "calibration_date",
    headerText: "Calibration Date",
    width: "150",
    textAlign: "Center", 
  },
    {
    field: "calibration_report_no",
    headerText: "Calibration Report Number",
    width: "150",
    textAlign: "Center",
  },
  
  {
   field: "calibration_agency",
    headerText: "Calibration agency",
    width: "150",
    textAlign: "Center", 
  },
   {
   field: "result",
    headerText: "Result",
    width: "150",
    textAlign: "Center", 
  },
   {
   field: "action",
    headerText: "Action taken",
    width: "150",
    textAlign: "Center", 
  },
   {
   field: "next_calibration_date",
    headerText: "Next Calibration Date",
    width: "150",
    textAlign: "Center", 
  },
   {
   field: "remark",
    headerText: "Remark",
    width: "150",
    textAlign: "Center", 
  },
  
  
  
 

]


export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];


export const service_orders_data = [
    {
        "Id": 1,
        "Subject": "Oil Change",
        "Location": "Vendor A",
        "StartTime": "2021-01-10T09:00:00.000Z",
        "EndTime": "2021-01-10T10:00:00.000Z",
        "CategoryColor": "#1aaa55"
    },
    {
        "Id": 2,
        "Subject": "Engine Overhaul",
        "Location": "Vendor B",
        "StartTime": "2021-02-15T11:00:00.000Z",
        "EndTime": "2021-02-15T14:00:00.000Z",
        "CategoryColor": "#357cd2"
    },
    {
        "Id": 3,
        "Subject": "Tire Replacement",
        "Location": "Vendor C",
        "StartTime": "2021-03-20T08:00:00.000Z",
        "EndTime": "2021-03-20T09:30:00.000Z",
        "CategoryColor": "#7fa900"
    }
]

export const scheduleData = [
  {
    Id: 1,
    Subject: 'Explosion of Betelgeuse Star',
    Location: 'Space Center USA',
    StartTime: '2021-01-10T04:00:00.000Z',
    EndTime: '2021-01-10T05:30:00.000Z',
    CategoryColor: '#1aaa55',
  },
  {
    Id: 2,
    Subject: 'Thule Air Crash Report',
    Location: 'Newyork City',
    StartTime: '2021-01-11T06:30:00.000Z',
    EndTime: '2021-01-11T08:30:00.000Z',
    CategoryColor: '#357cd2',
  },
  {
    Id: 3,
    Subject: 'Blue Moon Eclipse',
    Location: 'Space Center USA',
    StartTime: '2021-01-12T04:00:00.000Z',
    EndTime: '2021-01-12T05:30:00.000Z',
    CategoryColor: '#7fa900',
  },
  {
    Id: 4,
    Subject: 'Meteor Showers in 2021',
    Location: 'Space Center USA',
    StartTime: '2021-01-13T07:30:00.000Z',
    EndTime: '2021-01-13T09:00:00.000Z',
    CategoryColor: '#ea7a57',
  },
  {
    Id: 5,
    Subject: 'Milky Way as Melting pot',
    Location: 'Space Center USA',
    StartTime: '2021-01-14T06:30:00.000Z',
    EndTime: '2021-01-14T08:30:00.000Z',
    CategoryColor: '#00bdae',
  },
  {
    Id: 6,
    Subject: 'Mysteries of Bermuda Triangle',
    Location: 'Bermuda',
    StartTime: '2021-01-14T04:00:00.000Z',
    EndTime: '2021-01-14T05:30:00.000Z',
    CategoryColor: '#f57f17',
  },
  {
    Id: 7,
    Subject: 'Glaciers and Snowflakes',
    Location: 'Himalayas',
    StartTime: '2021-01-15T05:30:00.000Z',
    EndTime: '2021-01-15T07:00:00.000Z',
    CategoryColor: '#1aaa55',
  },
  {
    Id: 8,
    Subject: 'Life on Mars',
    Location: 'Space Center USA',
    StartTime: '2021-01-16T03:30:00.000Z',
    EndTime: '2021-01-16T04:30:00.000Z',
    CategoryColor: '#357cd2',
  },
  {
    Id: 9,
    Subject: 'Alien Civilization',
    Location: 'Space Center USA',
    StartTime: '2021-01-18T05:30:00.000Z',
    EndTime: '2021-01-18T07:30:00.000Z',
    CategoryColor: '#7fa900',
  },
  {
    Id: 10,
    Subject: 'Wildlife Galleries',
    Location: 'Africa',
    StartTime: '2021-01-20T05:30:00.000Z',
    EndTime: '2021-01-20T07:30:00.000Z',
    CategoryColor: '#ea7a57',
  },
  {
    Id: 11,
    Subject: 'Best Photography 2021',
    Location: 'London',
    StartTime: '2021-01-21T04:00:00.000Z',
    EndTime: '2021-01-21T05:30:00.000Z',
    CategoryColor: '#00bdae',
  },
  {
    Id: 12,
    Subject: 'Smarter Puppies',
    Location: 'Sweden',
    StartTime: '2021-01-08T04:30:00.000Z',
    EndTime: '2021-01-08T06:00:00.000Z',
    CategoryColor: '#f57f17',
  },
  {
    Id: 13,
    Subject: 'Myths of Andromeda Galaxy',
    Location: 'Space Center USA',
    StartTime: '2021-01-06T05:00:00.000Z',
    EndTime: '2021-01-06T07:00:00.000Z',
    CategoryColor: '#1aaa55',
  },
  {
    Id: 14,
    Subject: 'Aliens vs Humans',
    Location: 'Research Center of USA',
    StartTime: '2021-01-05T04:30:00.000Z',
    EndTime: '2021-01-05T06:00:00.000Z',
    CategoryColor: '#357cd2',
  },
  {
    Id: 15,
    Subject: 'Facts of Humming Birds',
    Location: 'California',
    StartTime: '2021-01-19T04:00:00.000Z',
    EndTime: '2021-01-19T05:30:00.000Z',
    CategoryColor: '#7fa900',
  },
  {
    Id: 16,
    Subject: 'Sky Gazers',
    Location: 'Alaska',
    StartTime: '2021-01-22T05:30:00.000Z',
    EndTime: '2021-01-22T07:30:00.000Z',
    CategoryColor: '#ea7a57',
  },
  {
    Id: 17,
    Subject: 'The Cycle of Seasons',
    Location: 'Research Center of USA',
    StartTime: '2021-01-11T00:00:00.000Z',
    EndTime: '2021-01-11T02:00:00.000Z',
    CategoryColor: '#00bdae',
  },
  {
    Id: 18,
    Subject: 'Space Galaxies and Planets',
    Location: 'Space Center USA',
    StartTime: '2021-01-11T11:30:00.000Z',
    EndTime: '2021-01-11T13:00:00.000Z',
    CategoryColor: '#f57f17',
  },
  {
    Id: 19,
    Subject: 'Lifecycle of Bumblebee',
    Location: 'San Fransisco',
    StartTime: '2021-01-14T00:30:00.000Z',
    EndTime: '2021-01-14T02:00:00.000Z',
    CategoryColor: '#7fa900',
  },
  {
    Id: 20,
    Subject: 'Alien Civilization',
    Location: 'Space Center USA',
    StartTime: '2021-01-14T10:30:00.000Z',
    EndTime: '2021-01-14T12:30:00.000Z',
    CategoryColor: '#ea7a57',
  },
  {
    Id: 21,
    Subject: 'Alien Civilization',
    Location: 'Space Center USA',
    StartTime: '2021-01-10T08:30:00.000Z',
    EndTime: '2021-01-10T10:30:00.000Z',
    CategoryColor: '#ea7a57',
  },
  {
    Id: 22,
    Subject: 'The Cycle of Seasons',
    Location: 'Research Center of USA',
    StartTime: '2021-01-12T09:00:00.000Z',
    EndTime: '2021-01-12T10:30:00.000Z',
    CategoryColor: '#00bdae',
  },
  {
    Id: 23,
    Subject: 'Sky Gazers',
    Location: 'Greenland',
    StartTime: '2021-01-15T09:00:00.000Z',
    EndTime: '2021-01-15T10:30:00.000Z',
    CategoryColor: '#ea7a57',
  },
  {
    Id: 24,
    Subject: 'Facts of Humming Birds',
    Location: 'California',
    StartTime: '2021-01-16T07:00:00.000Z',
    EndTime: '2021-01-16T09:00:00.000Z',
    CategoryColor: '#7fa900',
  },
];