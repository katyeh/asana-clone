import { baseUrl } from "../../config";
import { hideForm } from "./ui"; // TODO: Create hideForm

export const LOAD = "asana/project/LOAD";
export const ADDPROJECT = "ADDPROJECT";

export const load = (list) => ({ type: LOAD, list });

export const addProject = (project) => {
  return {
    type: ADDPROJECT,
    project
  };
};

// TODO: Figure out where is passing data from
export const createProject = (data) => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/projects`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    dispatch(hideForm());
    const project = await response.json()
    dispatch(getProject());
    dispatch(addProject(project));
  }
};

export const getProject = (userId) => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/users/${userId}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const project = await response.json();
    dispatch(load(project));
  }
};
