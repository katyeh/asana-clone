const express = require('express');
const { checkSchema } = require('express-validator');

const ProjectRepository = require("../../db/project-repository");
const TaskRepository = require("../../db/task-repository");

const { Project } = require('../../db/models');
const { asyncHandler, hashPassword } = require('../../utils');
const { handleValidationErrors, validateProject, validateTask, projectNotFoundError, validateEmailAndPassword } = require('../../validations');
const { authenticated, generateToken } = require('./security-utils');

const router = express.Router();

router.get(
  '/:id(\\d+)',
  authenticated,
  asyncHandler(async function (req, res, next) {
    const project = await ProjectRepository.one(req.params.id);
    if (project) {
      res.json(project);
    } else {
      next(projectNotFoundError);
    }
  })
);

router.post(
  '/',
  authenticated,
  validateProject,
  handleValidationErrors,
  asyncHandler(async function (req, res, next) {
    const id = await ProjectRepository.create(req.body, req.user.id);
      return res.redirect(`${req.baseUrl}/${id}`)
  }));

router.put(
  '/:id(\\d+)',
  authenticated,
  validateProject,
  handleValidationErrors,
  asyncHandler(async function (req, res, next) {
    const projectId = req.params.id;
    const project = await Project.findByPk(projectId);
    if (project) {
      await project.update({
        name: req.body.name,
        description: req.body.description
      })
      res.json({ project })
    } else {
      next(projectNotFoundError(projectId));
    }
  })
);

router.delete(
  '/:id(\\d+)',
  authenticated,
  asyncHandler(async function (req, res, next) {
    const projectId = req.params.id;
    const project = await Project.findByPk(projectId);

    if (req.user.id !== project.creatorId) {
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to delete this project.";
      err.title = "Unauthorized";
      throw err;
    }

    if (project) {
      await project.destroy();
      res.json({ message: `Deleted the project with id of ${projectId}`});
    } else {
      next(projectNotFoundError(projectId));
    }
    res.status(204).end();
  })
)

// Get all tasks for a project
router.get(
  '/:id/tasks',
  // authenticated,
  asyncHandler(async function(req, res) {
    const tasks = await TaskRepository.list(req.params.id);
    res.json(tasks);
  })
);

router.post(
  '/:id/tasks',
  authenticated,
  validateTask,
  handleValidationErrors,
  asyncHandler(async function (req, res, next) {
    const id = await TaskRepository.create(req.body, req.params.id, req.user.id);
      return res.redirect(`${req.baseUrl}/${id}`)
}));

module.exports = router;
