import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Switch, Route, Link } from "react-router-dom";
import ProjectForm from "../projects/ProjectForm";
import Fab from "../Sidebar/Fab";
import { showForm } from "../../store/actions/ui";
import { getProject } from "../../store/actions/project";
import ProjectDetail from "../projects/ProjectDetail";
import { Box, ListItem } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  boxItem: {
    '&:hover': {
      backgroundColor: 'darkGray'
    }
  },
}));

const ProjectBrowser = ({ formVisible, showForm }) => {
  const classes = useStyles();
  const id = useSelector(state => state.authentication.userId);
  const projects = useSelector(state => Object.values(state.project))
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

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
        backgroundColor='black'
      >
        {projects.map((project) => {
          return (
            <Box item
            className={ `${classes.boxItem}` }
            >
              <ListItem
                selected={selectedIndex === project.id}
                onClick={(e) => handleListItemClick(e, project.id)}
                component={Link}
                style={{ color: 'black' }}
                to={`/project/${project.id}`}
                value={project.name}
              >
           {/*      <NavLink
                key={project.name}
                to={`/project/${project.id}`}
                style={{ textDecoration: 'none', color: 'black', height: '10vw', }}
                > */}
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
              {/* </NavLink> */}
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
