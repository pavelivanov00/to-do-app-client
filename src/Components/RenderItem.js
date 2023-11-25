import React, { Component } from 'react'
import '../Css/RenderItem.css'

class RenderItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      updatedTask: this.props.task,
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
  
  render() {
    const { isEditing } = this.state;
    const { task, onDelete } = this.props;

    return (
      <div className='userItem'>
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
            onClick={this.handleUpdate} className='space'>
            <img src='/edit.png' alt='edit.png' className='image-size'/>
          </button>
        ) : (
          <button
            onClick={this.handleEdit} className='space'>
            <img src='/edit.png' alt='edit.png' className='image-size'/>
          </button>
        )}
        <button onClick={onDelete} className='delete-button space'>X</button>
      </div>
    )
  }
}

export default RenderItem