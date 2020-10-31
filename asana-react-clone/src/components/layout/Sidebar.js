import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Switch, Route } from "react-router-dom";
import ProjectForm from "../projects/ProjectForm";
import Fab from "../Sidebar/Fab";
import { showForm } from "../../store/actions/ui";
import { getProject } from "../../store/actions/project";
import ProjectDetail from "../projects/ProjectDetail";
import { Box, ListItem } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  boxItem: {
    '&:hover': {
      backgroundColor: 'darkGray'
    }
  },
  active: {
    backgroundColor: 'blue'
  }
})

const ProjectBrowser = ({ formVisible, showForm }) => {
  const classes = useStyles();
  const id = useSelector(state => state.authentication.userId);
  const projects = useSelector(state => Object.values(state.project))
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProject(id));
  }, [id]);

  const projectId = Number.parseInt(id);

  if (!projects) {
    return null;
  }
  return (
    <main>
      <nav>
      <ProjectForm />
      <Box
        display="flex"
        flexDirection="column"
      >
        {projects.map((project) => {
          return (
            <Box item
            className={ `${classes.boxItem}` }
            width="15vw"
            >
              <ListItem
              // TODO: Style this
              >
                <NavLink
                key={project.name}
                to={`/project/${project.id}`}
                style={{ textDecoration: 'none', color: 'black', height: '10vw', }}
                >
                  <div
                    className={
                      projectId === project.id
                        ? "nav-entry is-selected"
                        : "nav-entry"
                    }
                  >
                  <div>
                    <div className="primary-text">{project.name}</div>
                    {/* <div className="secondary-text">
                      {new Date(project.updatedAt).toDateString()}
                    </div> */}
                  </div>
                </div>
              </NavLink>
            </ListItem>
          </Box>
          );
        })}
      </Box>
      </nav>
        <Switch>
          {/* <Route
            exact={true}
            path="/Project/:id"
            render={(props) => <ProjectDetail {...props} />}
          />
          <Redirect to="/" /> */}
        </Switch>
      {/* )} */}
    </main>
  );
};

const ProjectBrowserContainer = () => {
  // const formVisible = useSelector((state) => state.ui.formVisible);
  // const Project = useSelector((state) => Object.values(state.Project2)); */
  const dispatch = useDispatch();
  return (
    <ProjectBrowser
      // project={project}
      // formVisible={formVisible}
      // getProject={() => dispatch(getProject())}
      showForm={() => dispatch(showForm())}
    />
  );
};

export default ProjectBrowserContainer;
