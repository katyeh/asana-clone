import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTask } from '../../store/actions/task';
import { getTask } from '../../store/actions/task'

const TaskDetail = ({ createTask }) => {
  // const dispatch = useDispatch();
  // const tasks = useSelector(state => Object.values(state.task))

  // useEffect(() => {
  //   dispatch(getTask(id));
  // }, [id]);

      {/* {tasks.map((task) => { */}
        return (
          <div className="task-detail">
            <div id="header">
              {/* <div id="assignee">
                <button
                  id={assigneeIsOpen ? 'opened' : 'closed' }
                  onClick={ toggleAssignee}
                >
                </button>
                {assigneeIsOpen ? assigneeDropdown() : null }
              </div> */}

              <button id="delete"
                // onClick={ deleteTask }
              >
                Delete
              </button>
              {/* <button id="close" onClick={ tryToggle }>x</button> */}
            </div>

            <div className='title'>
              {/* <button id={ task.id } onClick={ toggleComplete }>
                <div className={ completed ?
                    'checkmark-done' : 'checkmark-not-done'}>L</div>
              </button> */}

              <input
                // id={ task.id }
                // value={ task[task.id].taskName ? task[task.id].taskName : '' }
      /*          onChange={ handleTitle }
                onKeyPress={ handleKeyPress } */
                placeholder='New Task Title'></input>
            </div>

            {/* <textarea
              id='description'
              value={ task[task.id].description ? task[task.id].description : ''}
              // onChange={ handleInput('description') }
              // onKeyPress={ handleKeyPress }
              placeholder='Description'></textarea> */}

            <div id='divider'></div>

          {/*   <div id='timestamps'>
              <div id='created'>{ `Created task. ${createdDate}` }</div>
              <div id='updated'>{ `Updated task. ${updatedDate}` }</div>
            </div> */}

            <div id='subtasks'></div>
          </div>
        );
      {/* })} */}
}

export default TaskDetail;
