import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";
import TaskForm from "../projects/ProjectForm";
import { showForm } from "../../store/actions/ui";
import { getTask } from "../../store/actions/task";
import { merge } from 'lodash/merge';
import { ListItem, Checkbox } from '@material-ui/core';

const Task = ({ tasks }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);
  // useEffect(() => {
  //   dispatch(getTask());
  // }, []);

  // function toggleComplete(e){
  //   e.preventDefault();
  //   const taskId = parseInt(e.currentTarget.id);
  //   const currentStatus = state[taskId].completed;
  //   const update = { id: taskId, completed: !currentStatus };
  //   const newState = merge({}, state, { [taskId]: { completed: !currentStatus }}
  //   );

  //   props.updateTask(update);
  // }

  return (
    <main>
      <nav>
        {tasks.map((task) => {
          return (
            <ListItem
              className='task'
              id={ task.id }
              key={ task.id }
              style={{ textDecoration: 'none' }}
              >
              {task.taskName}
           {/*    <button id={ task.id } onClick={toggleComplete}>
                <div className={ task.completed ?
                  'checkmark-done' : 'checkmark-not-done' }>
                </div>}
              </button> */}

            {/*   <input
                id={ task.id }
                onFocus={ handleFocus }
                onKeyPress={ handleKeyPress }
                onKeyDown={ handleKeyDown }
                onBlur={ handleOnBlur }
                onChange={ e => handleInput(e, 'title') }
                value={ title ? title : '' }>
              </input> */}
            </ListItem>
          )
        })}
      </nav>
    </main>
  )
}

const TaskContainer = ({ project }) => {
  console.log(project)
  const tasks = useSelector((state) => project.tasksIds.map((taskId) => state.task[taskId] ));
  return (
    <Task
      tasks={tasks}
    />
  )
}

export default TaskContainer;
