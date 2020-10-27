# Back End Routes

* users
  * GET /users => gets all users
  * GET /users/:id => gets a single users info (return fullName and email)
  * GET /users/:id/projects => gets all projects associated with a single user
  * POST /users => create a new user (returns userId and token)
  * POST users/token => verifies user login and returns token for the user
  * DELETE /users/:id => delete a user
* projects
  * GET /project/:id => gets a single project (returns title, all tasks for a project, creator, and createdAt)
  * POST /projects => create a new project
  * PUT /project/:id => updates project info (returns full project info)
  * DELETE /project/:id => delete a project
* teams
  * GET /teams/:id/projects => gets all projects for a single team
  * POST /teams => create a new team
  * DELETE /team/:id => delete a team
* tasks
  * GET /tasks => gets all tasks for a single user
  * GET /project/:id/tasks => gets all tasks for a single project
  * GET /task/:id => gets a single task (returns asignee, due date, associated project, description)
  * POST /project/:id/task => create a new task
  * PUT /task/:id => updates a task
  * DELETE /task/:id => delete a task
* comments
  * GET /project/:id/comments=> gets all comments for a single project
  * POST /project/:id/comments => create a new comment
  * DELETE /comments/:id => delete a comment
* memberships
  * GET /memberships => gets all memberships
  * POST /team/:id/membership/:id => Add a member to the team by id
  * DELETE /team/:id/membership/:id => Remove a member from the team
