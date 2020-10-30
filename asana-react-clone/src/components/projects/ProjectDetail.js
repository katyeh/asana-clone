import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { imageUrl } from "./config";
import { getOneProject } from "./store/actions/current-proj";

const ProjectDetail = ({ project, getOneProject }) => {
  const { id } = useParams();
  useEffect(() => {
    getOneProject(id);
  }, [id]);

  if (!project) {
    return null;
  }
  return (
    <div className="project-detail">
      <div>
        <h1 className="bigger">{project.name}</h1>
      </div>
      <div className="project-detail-lists">
        <div>
          <h2>Information</h2>
          <ul>
            <li>
              <b></b> {project.attack}
            </li>
            <li>
              <b>Defense</b> {project.defense}
            </li>
            <li>
              <b>Moves</b>
              <ul>
                {project.moves.map((move) => (
                  <li key={move}>{move}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <h2>Items</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Happiness</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {project.items.map((item) => (
                <tr key={item.price * item.happiness}>
                  <td>
                    <img
                      className="item-image"
                      alt={item.imageUrl}
                      src={`${imageUrl}${item.imageUrl}`}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td className="centered">{item.happiness}</td>
                  <td className="centered">${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ProjectDetailContainer = () => {
  const project = useSelector((state) => state.project2[state.currentProject]);
  const dispatch = useDispatch();

  return (
    <ProjectDetail
      project={project}
      getOneProject={(id) => dispatch(getOneProject(id))}
    />
  );
};

export default ProjectDetailContainer;
