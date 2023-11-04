import React, { Component } from 'react'
import '../Css/RenderItem.css'

class RenderItem extends Component {

  handleDelete = () => {
    const { index, onDelete } = this.props;
    onDelete(index);
  }

  render() {
    const userInput = this.props.userInput;
    return (
      <div className='userItem'> 
        <div>{userInput}</div>
        <button className='delete-button' onClick={this.handleDelete}>X</button>
      </div>
    )
  }
}

export default RenderItem