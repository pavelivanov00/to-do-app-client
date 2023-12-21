import React, { Component } from 'react'
import '../Css/RenderItem.css'

class RenderItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      updatedTask: this.props.task,
      isCompleted: false
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
    this.setState(prevState => ({
      isCompleted: !prevState.isCompleted,
    }));
  }

  render() {
    const { isEditing, isCompleted } = this.state;
    const { task, onDelete } = this.props;

    return (
      <div className={`task ${isCompleted ? 'checked' : ''}`}>
        <input
          type='checkbox'
          checked={isCompleted}
          onClick={this.handleCheckboxChange}
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
        <button onClick={onDelete} className='deleteButton'>X</button>
      </div>
    )
  }
}

export default RenderItem