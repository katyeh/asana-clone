import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneProject } from "../../store/actions/current-proj";
import TaskContainer from '../tasks/Task';

const ProjectDetail = ({ project, getOneProject }) => {
  const { id } = useParams();
  useEffect(() => {
    getOneProject(id);
  }, [id]);

  if (!project || !project.tasksIds) {
    return null;
  }
  return (
    <div className="project-detail">
      <div>
        <h1 className="bigger">{project.name}</h1>
        <TaskContainer
          project={project}
        />
      </div>
    </div>
  );
};

const ProjectDetailContainer = () => {
  const { id } = useParams();
  const project = useSelector((state) => state.project[id]);
  const dispatch = useDispatch();

  return (
    <div>
      <ProjectDetail
        project={project}
        getOneProject={(id) => dispatch(getOneProject(id))}
      />
    </div>
  );
};

export default ProjectDetailContainer;
