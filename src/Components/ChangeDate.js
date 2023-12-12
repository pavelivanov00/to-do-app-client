import React from 'react';
import '../Css/ChangeDate.css'

const ChangeDate = ({ chosenDay, onDayClick, fetchTasks }) => {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const year = chosenDay.getFullYear();
  const month = chosenDay.getMonth();
  const hours = chosenDay.getHours();
  const minutes = chosenDay.getMinutes();
  const seconds = chosenDay.getSeconds();

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
    const clickedDate = new Date(year, month, day, hours, minutes, seconds);
    onDayClick(clickedDate, () => {
      fetchTasks(clickedDate);
    });
  };

  return (
    <div>
      <h2>Choose a new date</h2>
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
                        onClick={() => handleDayClick(day)}>{day}</button>
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
