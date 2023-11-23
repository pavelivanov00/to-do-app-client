import React, { Component } from 'react';
import RenderItem from './RenderItem';
import '../Css/InputItem.css';
import axios from 'axios';

class InputItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: '',
      userInputList: [],
      chosenDay: new Date()
    };
  }

  componentDidMount() {
    this.fetchTodosForCurrentDay();
  }

  handleChange = event => {
    this.setState({
      userInput: event.target.value,
    });
  }

  clickHandler = () => {
    const { userInput, userInputList } = this.state;

    if (userInput.trim() !== '' && userInput.length !== 0) {
      this.setState({
        userInputList: [...userInputList, userInput],
        userInput: '',
      });
    }
  }

  handleDelete = index => {
    const { userInputList } = this.state;
    const updatedUserInputList = [...userInputList];
    updatedUserInputList.splice(index, 1);
    this.setState({
      userInputList: updatedUserInputList,
    });
  }

  handleUpdate = (index, updatedText) => {
    const updatedUserInputList = [...this.state.userInputList];
    updatedUserInputList[index] = updatedText;

    this.setState({ userInputList: updatedUserInputList });
  }

  handleSave = () => {
    const { userInputList, chosenDay } = this.state;

    axios.post('http://localhost:5000/todos/save', { day: chosenDay, todos: userInputList })
      .then(response => {
        console.log('To-do items saved successfully:', response.data);
      })
      .catch(error => {
        console.error('Error saving to-do items:', error);
      });
  };

  fetchTodosForCurrentDay = async () => {
    try {
      const { chosenDay } = this.state;
      
      const response = await axios.get('http://localhost:5000/todos', {
        params: {
          chosenDay: chosenDay.toISOString()
        },
      });

      console.log('To-do items fetched successfully:', response.data);

      const queriedTodos = response.data.map(item => item.todos).flat();
      this.setState({
        userInputList: queriedTodos,
      });
      
    } catch (error) {
      console.error('Error fetching to-do items:', error);
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

    const { userInput, userInputList } = this.state;

    return (
      <div>
        <div className='dayInfo'>Chosen day: {day} {monthName}</div>

        <input type="text" className='userInput' value={userInput} onChange={this.handleChange} />
        <button onClick={this.clickHandler}>Input</button>

        <div>
          {userInputList.map((userInput, index) => (
            <RenderItem
              key={index}
              uniqueKey={index}
              userInput={userInput}
              onDelete={() => this.handleDelete(index)}
              onUpdate={updatedText => this.handleUpdate(index, updatedText)}
            />
          ))}
        </div>

        <button onClick={this.handleSave} className='saveButton'>Save</button>
      </div>
    );
  }
}

export default InputItem;
