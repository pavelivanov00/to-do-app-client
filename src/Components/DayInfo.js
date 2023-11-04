import React from 'react'
import '../Css/DayInfo.css'

const today = new Date();
const day = today.getDate();
const month = today.getMonth();

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

const monthName = monthNames[month];

function DayInfo() {
    return (
        <div className='dayInfo'>Today is {day} {monthName}</div>
    )
}

export default DayInfo