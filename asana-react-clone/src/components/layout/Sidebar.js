import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";

// import { imageUrl } from "./config";
// import LogoutButton from "./LogoutButton";
// import ProjectDetail from "./ProjectDetail";
import ProjectForm from "../projects/ProjectForm";
import Fab from "../Sidebar/Fab";
import { showForm } from "../../store/actions/ui";
import { getProject } from "../../store/actions/project";

const ProjectBrowser = ({ formVisible, showForm }) => {
  const id = useSelector(state => state.authentication.userId);
  const projects = useSelector(state => Object.values(state.project))
  const dispatch = useDispatch();

  /* useEffect(() => {
    dispatch(getProject(id));
  }, [id]); */

  const projectId = Number.parseInt(id);

  if (!projects) {
    return null;
  }
  return (
    <main>
      <nav>
        {projects.map((project) => {
          return (
            <NavLink key={project.name} to={`/project/${project.id}`}>
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
          );
        })}
      </nav>
        <ProjectForm />
        <Switch>
          {/* <Route
            exact={true}
            path="/Project/:id"
            render={(props) => <ProjectDetail {...props} />}
          /> */}
          <Redirect to="/" />
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
