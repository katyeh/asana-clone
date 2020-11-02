import React from 'react';
import { TextField } from '@material-ui/core';
import { createTask } from "../../store/actions/task"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const TaskForm = ({ createTask }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [completed, setCompleted]  = useState(false);
  // const { projectId } = useParams();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name,
      description,
      deadline,
      completed,
    };
    console.log('id', id)
    createTask(payload, id)
  };

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  return (
    <div>
      <h1>Create New Task</h1>
      <form onSubmit={handleSubmit}>
          <div className='title'>
            <label>Task Name</label>
            <TextField
              value={name}
              onChange={updateProperty(setName)}
            >
            </TextField>
          </div>
          <div className="description">
            <label>Description</label>
            <TextField
              multiline
              rows={2}
              rowsMax={4}
              value={description}
              onChange={updateProperty(setDescription)}
            >
            </TextField>
          </div>
          <div className="deadline">
            <label>Deadline</label>
            <TextField
              placeholder="YYYY-MM-DD"
              value={deadline}
              onChange={updateProperty(setDeadline)}
            >
            </TextField>
          </div>
          <div className="createTaskBtn">
            <button type="submit">Create Task</button>
          </div>
      </form>
    </div>
  )
}

const TaskFormContainer = () => {
  const dispatch = useDispatch();

  return (
    <TaskForm
      createTask={(task) => dispatch(createTask(task))}
    />
  );
};

export default TaskFormContainer;
