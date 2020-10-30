const express = require('express');
const { checkSchema } = require('express-validator');

const TaskRepository = require("../../db/task-repository");

const { Task } = require('../../db/models');
const { asyncHandler, hashPassword } = require('../../utils');
const { handleValidationErrors, validateTask, taskNotFoundError } = require('../../validations');
const { authenticated, generateToken } = require('./security-utils');

const router = express.Router();

router.get(
  '/:id(\\d+)',
  authenticated,
  asyncHandler(async function (req, res, next) {
    const task = await TaskRepository.one(req.params.id);
    if (task) {
      res.json(task);
    } else {
      next(taskNotFoundError);
    }
  })
);

router.put(
  '/:id(\\d+)',
  // authenticated,
  validateTask,
  handleValidationErrors,
  asyncHandler(async function (req, res, next) {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);
    if (task) {
      await task.update({
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        assigneeId: req.body.assigneeId,
        creatorId: req.user.id,
        completed: req.body.completed,
      })
      res.json({ task })
    } else {
      next(taskNotFoundError(taskId));
    }
  })
);

router.delete(
  '/:id(\\d+)',
  // authenticated,
  asyncHandler(async function (req, res, next) {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);

    if (req.user.id !== task.creatorId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to delete this project.";
      err.title = "Unauthorized";
      throw err;
    }
    
    if (task) {
      await task.destroy();
      res.json({ message: `Deleted the task with id of ${taskId}`});
    } else {
      next(taskNotFoundError(taskId));
    }
    res.status(204).end();
  })
);

module.exports = router;
