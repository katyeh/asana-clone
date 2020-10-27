const { userNotFoundError } = require('../validations');
const { Project, Task, User } = require('./models');
const userRepository = require('./user-repository');

async function create(details, owner) {
  details.creatorId = owner.id;
  const project = await Project.create(details, { include: Task})
  return project.id;
}

async function list(id) {
  const userId = id
  return await User.findAll({

  });
}

// async function one(id) {
//   const project = await Project.findByPk(id, {
//     include: ["tasks"],
//   });

//   return {
//     name: project.name,
//     description: project.description,
//     creator: project.creatorId,
//     team: project.teamId,
//     tasks: project.tasks.map((task) => {
//       return {
//         taskName: task.name,
//         taskDescrip: task.description,
//         deadline: task.deadline,
//         projectId: task.projectId,
//         assigneeId: task.assigneeId,
//         creatorId: task.creatorId,
//         completed: task.completed,
//       }
//     })
//   }
// };

module.exports = {
  create,
  list,
  // one,
};
