const { Task } = require('./models');

async function create(content, projectId, userId) {
  const {
    name,
    description,
    deadline,
    assigneeId,
    completed,
  } = content
  const task = await Task.create({
    name,
    description,
    deadline,
    projectId: projectId,
    assigneeId,
    creatorId: userId,
    completed,
  })
  return task.id;
};

async function list(id) {
  return await Task.findAll({
    where: { projectId: id },
  });
};

async function listTasks(userId) {
  return await Task.findAll({
    where: { assigneeId: userId },
  });
};

async function one(id) {
  const task = await Task.findByPk(id);
    return {
      taskName: task.name,
      taskDescrip: task.description,
      deadline: task.deadline,
      projectId: task.projectId,
      assigneeId: task.assigneeId,
      creatorId: task.creatorId,
      completed: task.completed,
    }
};

module.exports = {
  create,
  list,
  listTasks,
  one,
};
