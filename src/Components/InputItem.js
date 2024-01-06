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
      completedTasks: [],
      chosenDate: new Date()
    };
  }

  componentDidMount() {
    this.fetchTasksForChosenDate();
  };

  fetchTasksForChosenDate = async () => {
    try {
      const { chosenDate } = this.state;

      const response = await axios.get('http://localhost:5000/tasks', {
        params: {
          chosenDate: chosenDate.toISOString()
        },
      });

      console.log('Tasks fetched successfully:', response.data);

      const queriedTasks = response.data[0]?.tasks || [];
      const taskList = queriedTasks.map(task => task.description);
      const completedTasks = queriedTasks.map(task => task.completed);

      this.setState({
        taskList: taskList,
        completedTasks: completedTasks
      });

    } catch (error) {
      console.error('Error when fetching tasks:', error);
    }
  };

  handleInputChange = event => {
    this.setState({ task: event.target.value });
  };

  handleAddTask = () => {
    const { task, taskList } = this.state;

    if (task.trim() !== '' && task.length !== 0) {
      this.setState({
        taskList: [...taskList, task],
        task: '',
        showDays: false,
      });
    }
  };

  handleSave = () => {
    const { chosenDate, taskList, completedTasks } = this.state;

    axios.post('http://localhost:5000/tasks/save', {
      chosenDate: chosenDate.toISOString(),
      taskList: taskList,
      completedTasks: completedTasks
    }).then(response => {
      console.log('Tasks saved successfully:', response.data);
    }).catch(error => {
      console.error('Error when saving tasks:', error);
    });
  };

  handleCheckboxChange = index => {
    const updatedCompletedTasks = [...this.state.completedTasks];
    updatedCompletedTasks[index] = !updatedCompletedTasks[index];

    this.setState({ completedTasks: updatedCompletedTasks });
  };

  handleTaskUpdate = (index, updatedTask) => {
    const updatedTaskList = [...this.state.taskList];
    updatedTaskList[index] = updatedTask;

    this.setState({ taskList: updatedTaskList });
  };

  handleDelete = index => {
    const { taskList, completedTasks } = this.state;
    const updatedTaskList = [...taskList];
    const updatedCompletedTasks = [...completedTasks];

    updatedTaskList.splice(index, 1);
    updatedCompletedTasks.splice(index, 1);

    this.setState({
      taskList: updatedTaskList,
      completedTasks: updatedCompletedTasks,
    });
  };

  handleToggleDays = () => {
    this.setState(prevState => ({ showDays: !prevState.showDays }));
  };

  handleDayClick = (day, callback) => {
    this.setState({ chosenDate: day }, callback);
    this.handleToggleDays();

    this.setState({ completedTasks: [] })
  };

  render() {
    const { chosenDate } = this.state;
    const day = chosenDate.getDate();
    const month = chosenDate.getMonth();
    const year = chosenDate.getFullYear();

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[month];

    const { task, taskList, completedTasks } = this.state;

    return (
      <div>
        <div className='dateInfo'>Chosen date: {day} {monthName} {year}</div>

        <input
          type="text"
          className='userInput'
          value={task}
          onChange={this.handleInputChange}
        />
        <button
          onClick={this.handleAddTask}
          className='addTaskButton'>
          Add task
        </button>

        <div>
          {taskList.map((task, index) => (
            <RenderItem
              key={index}
              uniqueKey={index}
              task={task}
              completedTasks={completedTasks}
              onCheckboxChange={() => this.handleCheckboxChange(index)}
              onDelete={() => this.handleDelete(index)}
              onUpdate={updatedTask => this.handleUpdate(index, updatedTask)}
            />
          ))}
        </div>

        <button
          onClick={this.handleSave}
          className='saveButton'
        >Save
        </button>
        <p>
          <button
            onClick={this.handleToggleDays}
            className='changeDateButton'
          >Change date
          </button>
        </p>

        {this.state.showDays && (
          <div>
            <ChangeDate
              onDayClick={this.handleDayClick}
              chosenDate={chosenDate}
              fetchTasks={this.fetchTasksForChosenDate}
            />
          </div>
        )}
      </div>
    );
  }
}

export default InputItem;
