import React, { Component } from 'react';
import RenderItem from './RenderItem';
import '../Css/InputItem.css'

class ItemInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: '',
      userInputList: [],
    };
  }

  handleChange = (event) => {
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

  render() {
    const { userInput, userInputList } = this.state;

    return (
      <div>
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
      </div>
    );
  }
}

export default ItemInput;