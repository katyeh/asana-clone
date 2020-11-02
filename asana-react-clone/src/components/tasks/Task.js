import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";
import { showForm } from "../../store/actions/ui";
import { getTask } from "../../store/actions/task";
import { merge } from 'lodash/merge';
import { ListItem, Checkbox, Drawer } from '@material-ui/core';
import TaskForm from "./TaskForm";
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 300;
const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
});

const Task = ({ tasks, formVisible }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const toggleDrawer = () => {
    setIsOpen(true)
  }

  const handleChange = (e) => {
    setChecked({[e.target.name]: e.target.checked});
    setCompleted(true); // TODO: Make this work
  };

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
        <button onClick={() => setIsOpen(true)}>Add Task</button>
        {tasks.map((task) => {
          return (
            <ListItem
              className='task'
              id={ task.id }
              key={ task.id }
              style={{ textDecoration: 'none' }}
              onClick={(e) => setIsOpen(true)}
              // to={`/task/${task.id}`}
              >
                <Checkbox
                  // checked={checked === setCompleted}
                  value={task.task}
                  onChange={ handleChange }
                  // onClick={setCompleted}
                  name={ task.id }
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
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

        <Drawer
        variant="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
        open={isOpen}
        // onClose={toggleDrawer(false)}
      >
        <div>
          <button align="right" onClick={() => setIsOpen(false)}>X</button>
        </div>
        {/* <TaskDetail tasks={tasks} /> */}
        <TaskForm />
      </Drawer>
      </nav>
    </main>
  )
}

const TaskContainer = ({ project }) => {
  const formVisible = useSelector((state) => state.ui.formVisible);
  const tasks = useSelector((state) => project.tasksIds.map((taskId) => state.task[taskId] ));
  /* const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const toggleDrawer = () => {
    setIsOpen(true)
  } */

  return (
    <div className="tasks">
      <div id='header'>
        {/* <button onClick={() => setIsOpen(true)}>Add Task</button> */}

      </div>
      <Task
        tasks={tasks}
        // formVisible={formVisible}
      />
      {/* <Drawer
        variant="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
        open={isOpen}
        // onClose={toggleDrawer(false)}
      >
        <div>
          <button align="right" onClick={() => setIsOpen(false)}>X</button>
        </div>
        <TaskDetail tasks={tasks} />
      </Drawer> */}
    </div>
  )
}

export default TaskContainer;
