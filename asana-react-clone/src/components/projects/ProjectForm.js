import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProject } from "../../store/actions/project";
import Modal from "react-modal";
import { Grid, TextField } from "@material-ui/core"
import './modal.css'
// import getpokemontypes (tasks??)
import { hideForm } from "../../store/actions/ui";

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(95, 95, 95, 0.75)'
  },
  content : {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

const ProjectForm = ({ createProject, hideForm }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name,
      description,
    };
    createProject(payload);
  };

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>+</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        // onAfterOpen={toggleNewProject}
        style={modalStyles}
        contentLabel="New Project Modal"
      >
        <div className="new-project-form">
          <div className="new-project-header">
            <h2>New Project</h2>
            <button onClick={() => setIsOpen(false)}>X</button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>PROJECT NAME</label>
            <input
              value={name}
              onChange={updateProperty(setName)}
              />

            <label>DESCRIPTION</label>
            <input
              value={description}
              onChange={updateProperty(setDescription)}
            />
            <button type="submit">Create Project</button>
          </form>

        </div>
      </Modal>
    </div>
  )
};

const ProjectFormContainer = () => {
  const dispatch = useDispatch();

  return (
    <ProjectForm
      createProject={(project) => dispatch(createProject(project))}
      hideForm={() => dispatch(hideForm())}
    />
  );
};

export default ProjectFormContainer;
