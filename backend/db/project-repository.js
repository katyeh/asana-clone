const { Project, Task, User, UserProjects } = require('./models');

async function create(content, userId) {
  const { name, description } = content
  const project = await Project.create({
    name,
    description,
    creatorId: userId,
    teamId: 1 // TODO: Team ID!!
  })
  return project.id;
};

async function list(id) {
  return await User.findOne({
    where: { id: id },
    include: [{model: Project}],
    attributes: ['id', 'fullName', 'email']
  });
};


async function one(id) {
  const project = await Project.findByPk(id, {
    include: ["tasks"],
  });

  const tasksIds = [];
  const tasks = [];

  project.tasks.forEach((task) => {
    tasksIds.push(task.id);
    tasks.push({
      id: task.id,
      taskName: task.name,
      taskDescrip: task.description,
      deadline: task.deadline,
      projectId: task.projectId,
      assigneeId: task.assigneeId,
      creatorId: task.creatorId,
      completed: task.completed,
    });
  });
  const projectInfo = {
    id: project.id,
    name: project.name,
    description: project.description,
    creator: project.creatorId,
    team: project.teamId,
    tasksIds
  }
  return { projectInfo, tasks }
};

module.exports = {
  create,
  list,
  one,
};
