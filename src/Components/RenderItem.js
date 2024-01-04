import React, { Component } from 'react'
import '../Css/RenderItem.css'

class RenderItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      updatedTask: this.props.task,
      completedTasks: this.props.completedTasks
    };
  }

  handleEdit = () => {
    this.setState({ isEditing: true });
  }

  handleInputChange = event => {
    this.setState({ updatedTask: event.target.value });
  }

  handleUpdate = () => {
    const { updatedTask } = this.state;
    const { onUpdate } = this.props;

    onUpdate(updatedTask);

    this.setState({
      isEditing: false
    });
  }

  handleDelete = () => {
    const { uniqueKey, onDelete } = this.props;

    onDelete(uniqueKey);
  }

  handleCheckboxChange = () => {
    const { uniqueKey, onCheckboxChange } = this.props;

    onCheckboxChange(uniqueKey);
  }

  isTaskCompleted = () => {
    const {uniqueKey, completedTasks} = this.props;
    
    return completedTasks && completedTasks[uniqueKey];
  }

  render() {
    const { isEditing } = this.state;
    const { task } = this.props;

    return (
      <div className={`task ${this.isTaskCompleted() ? 'checked' : ''}`}>
        <input
          type='checkbox'
          checked={this.isTaskCompleted() || false}
          onChange={this.handleCheckboxChange}
          className='checkbox'
        />
        {isEditing ? (
          <input
            type="text"
            onChange={this.handleInputChange}
          />
        ) : (
          <p>{task}</p>
        )}
        {isEditing ? (
          <button
            onClick={this.handleUpdate}
            className='editButton'
          >
            <img src='/edit.png'
              alt='edit.png'
              className='imageSize'
            />
          </button>
        ) : (
          <button
            onClick={this.handleEdit}
            className='editButton'
          >
            <img
              src='/edit.png'
              alt='edit.png'
              className='imageSize'
            />
          </button>
        )}
        <button onClick={this.handleDelete} className='deleteButton'>X</button>
      </div>
    )
  }
}

export default RenderItem