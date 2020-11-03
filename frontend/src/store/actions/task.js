import { baseUrl } from "../../config";
import { hideForm } from "./ui"; // TODO: Create hideForm

export const LOAD = "asana/task/LOAD";
export const ADDTASK = "ADDTASK";

export const load = (list) => ({ type: LOAD, list });

export const addTask = (task) => {
  return {
    type: ADDTASK,
    task
  };
};

export const createTask = (data, id) => async(dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/projects/${id}/tasks`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const task = await response.json();
    dispatch(hideForm());
    dispatch(getTask(id));
    dispatch(addTask(task));
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
