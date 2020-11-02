// import React from 'react';
// import { ListItem } from '@material-ui/core';
// import { createTask } from "../../store/actions/task"
// import { useState } from 'react';

// const TaskDetail = ({ tasks }) => {
//   const [taskName, setTaskName] = useState("");
//   const [taskDescrip, setTaskDescrip] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [completed, setCompleted]  = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const payload = {
//       taskName,
//       taskDescrip,
//       deadline,
//       completed,
//     };
//     createTask(payload)
//   };

//   const updateProperty = (callback) => (e) => {
//     callback(e.target.value);
//   };

//   return (
//     <div>
//       <h1>Create New Task</h1>
//     {/*   {tasks.map((task) => {
//         return( */}
//           <div className='title'>
//            {/*  <input
//               id={ tasks[0].id }
//               value={ tasks[0].taskName ? tasks[0].taskName : "" }
//               // value={ task.taskName ? task.taskName : "" }
//             >
//             </input> */}
//             <label>Task Name</label>
//             <input
//               value={taskName}
//               onChange={updateProperty(setTaskName)}
//             >
//             </input>
//           </div>
//       {/*   )
//       })} */}
//     </div>
//   )
// }

// export default TaskDetail;
