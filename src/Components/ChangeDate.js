import React, { useState } from 'react';
import '../Css/ChangeDate.css'

const ChangeDate = ({ chosenDate, onDayClick, fetchTasks }) => {
  const getYear = chosenDate.getFullYear();
  const [year, setYear] = useState(getYear);
  const getMonth = chosenDate.getMonth();
  const [month, setMonth] = useState(getMonth);

  const hours = chosenDate.getHours();
  const minutes = chosenDate.getMinutes();
  const seconds = chosenDate.getSeconds();

  const daysInMonth = Array.from(
    { length: new Date(year, month + 1, 0).getDate() },
    (_, index) => index + 1
  );
  const firstDayOfMonth = new Date(year, month, 0).getDay();

  const chunkArray = (array, size) => {
    return array.reduce((acc, _, i) => (i % size ? acc : [...acc, array.slice(i, i + size)]), []);
  };

  const weeks = chunkArray([...Array(firstDayOfMonth).fill(null), ...daysInMonth], 7);

  const handleDayClick = day => {
    const changedDate = new Date(year, month, day, hours, minutes, seconds);
    onDayClick(changedDate, () => {
      fetchTasks(changedDate);
    });
  };

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[month];

  const prevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    }
    else setMonth(month - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    }
    else setMonth(month + 1);
  };

  return (
    <div>
      <h2>Choose a new date</h2>
      <button
        className='changeYear'
        onClick={() => setYear(year - 1)}
      >
        {'<<'}
      </button>
      <button
        className='changeMonth'
        onClick={prevMonth}
      >
        {'<'}
      </button>

      <h2 className='date'>{monthName} {year}</h2>

      <button
        className='changeMonth'
        onClick={nextMonth}
      >
        {'>'}
      </button>
      <button
        className='changeYear'
        onClick={() => setYear(year + 1)}
      >
        {'>>'}
      </button>

      <div className='outernDiv'>
        <table>
          <thead>
            <tr>
              {weekdays.map(weekday => (
                <th key={weekday} className='weekday'>
                  {weekday}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => (
                  <td key={dayIndex}>
                    {day !== null && (
                      <button
                        className='dayButton'
                        onClick={() => handleDayClick(day)}>
                        {day}
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChangeDate;
