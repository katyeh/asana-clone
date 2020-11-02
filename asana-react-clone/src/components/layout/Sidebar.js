import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Switch, Route, Link } from "react-router-dom";
import ProjectForm from "../projects/ProjectForm";
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
                  <div
                    className={
                      projectId === project.id
                        ? "nav-entry is-selected"
                        : "nav-entry"
                    }
                  >
                  <div>
                    <div className="primary-text">{project.name}</div>

                  </div>
                </div>
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
  const dispatch = useDispatch();
  return (
    <ProjectBrowser
      showForm={() => dispatch(showForm())}
    />
  );
};

export default ProjectBrowserContainer;
