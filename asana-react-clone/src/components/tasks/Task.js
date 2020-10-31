import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";
import TaskForm from "../projects/ProjectForm";
import { showForm } from "../../store/actions/ui";
import { getTask } from "../../store/actions/task";

const Task = ({ tasks }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getTask());
  // }, []);

  return (
    <main>
      <nav>
        {tasks.map((task) => {
          return (
            <li
              className='task'
              id={ task.id }
              // key={i}
            >
  {/*             <button id={ task.id } onClick={toggleComplete}>
                <div className={ task.completed ?
                  'checkmark-done' : 'checkmark-not-done' }>
                </div>
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
            </li>
          )
        })};
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
