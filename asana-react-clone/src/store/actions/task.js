import { baseUrl } from "../../config";
import { hideForm } from "./ui"; // TODO: Create hideForm

export const LOAD = "asana/task/LOAD";

export const load = (list) => ({ type: LOAD, list });

export const createTask = (data, projectId) => async(dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/projects/${projectId}/tasks`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    dispatch(hideForm());
    dispatch(getTask());
  }
};

export const getTask = (projectId) => async(dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/projects/${projectId}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};
