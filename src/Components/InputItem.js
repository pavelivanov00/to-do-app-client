import React, { Component } from 'react';
import RenderItem from './RenderItem';
import ChangeDate from './ChangeDate'
import '../Css/InputItem.css';
import axios from 'axios';


class InputItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: '',
      taskList: [],
      chosenDay: new Date()
    };
  }

  handleDayClick = (day, callback) => {
    this.setState({ chosenDay: day }, callback);
    this.handleToggleDays();
  };

  handleToggleDays = () => {
    this.setState(prevState => ({ showDays: !prevState.showDays }));
  };

  componentDidMount() {
    this.fetchTasksForChosenDay();
  }

  handleChange = event => {
    this.setState({
      task: event.target.value,
    });
  }

  clickHandler = () => {
    const { task, taskList } = this.state;

    if (task.trim() !== '' && task.length !== 0) {
      this.setState({
        taskList: [...taskList, task],
        task: '',
        showDays: false,
      });
    }
  }

  handleDelete = index => {
    const { taskList } = this.state;
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);
    this.setState({
      taskList: updatedTaskList,
    });
  }

  handleUpdate = (index, updatedTask) => {
    const updatedTaskList = [...this.state.taskList];
    updatedTaskList[index] = updatedTask;

    this.setState({ taskList: updatedTaskList });
  }

  handleSave = () => {
    const { taskList, chosenDay } = this.state;

    axios.post('http://localhost:5000/tasks/save', { chosenDay: chosenDay.toISOString(), taskList: taskList })
      .then(response => {
        console.log('Tasks saved successfully:', response.data);
      })
      .catch(error => {
        console.error('Error when saving tasks:', error);
      });
  };

  fetchTasksForChosenDay = async () => {
    try {
      const { chosenDay } = this.state;

      const response = await axios.get('http://localhost:5000/tasks', {
        params: {
          chosenDay: chosenDay.toISOString()
        },
      });

      console.log('Tasks fetched successfully:', response.data);

      const queriedTasks = response.data.map(result => result.tasks).flat();
      this.setState({
        taskList: queriedTasks
      });

    } catch (error) {
      console.error('Error when fetching tasks:', error);
    }
  };

  render() {
    const { chosenDay } = this.state;
    const day = chosenDay.getDate();
    const month = chosenDay.getMonth();

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[month];

    const { task, taskList } = this.state;

    return (
      <div>
        <div className='dayInfo'>Chosen date: {day} {monthName}</div>

        <input type="text" className='userInput' value={task} onChange={this.handleChange} />
        <button onClick={this.clickHandler}>Add task</button>

        <div>
          {taskList.map((task, index) => (
            <RenderItem
              key={index}
              uniqueKey={index}
              task={task}
              onDelete={() => this.handleDelete(index)}
              onUpdate={updatedTask => this.handleUpdate(index, updatedTask)}
            />
          ))}
        </div>

        <button onClick={this.handleSave} className='saveButton'>Save</button>

        <button onClick={this.handleToggleDays}>Choose date</button>
        {this.state.showDays && (
          <div>
            <ChangeDate
              onDayClick={this.handleDayClick}
              chosenDay={chosenDay}
              fetchTasks={this.fetchTasksForChosenDay}
            />

          </div>
        )}
      </div>
    );
  }
}

export default InputItem;
