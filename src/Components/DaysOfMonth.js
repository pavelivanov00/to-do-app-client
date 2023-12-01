import React from 'react';

const DaysOfMonth = ({ chosenDay, onDayClick, fetchTasks }) => {
    const year = chosenDay.getFullYear();
    const month = chosenDay.getMonth();
    const daysInMonth = Array.from(
        { length: new Date(year, month + 1, 0).getDate() },
        (_, index) => index + 1
    );

    const handleClick = day => {
        onDayClick(new Date(year, month, day), () => {
            fetchTasks();
        });
    }

    return (
        <div>
            <h2>Days of the Current Month</h2>
            {daysInMonth.map((day) => (
                <button key={day} onClick={() => handleClick(day)}>
                    {day}
                </button>
            ))}
        </div>
    );
}
export default DaysOfMonth;
