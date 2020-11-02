import { baseUrl } from "../../config";
import { hideForm } from "./ui"; // TODO: Create hideForm

export const LOAD = "asana/project/LOAD";

export const load = (list) => ({ type: LOAD, list });

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
    dispatch(getProject());
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
    const list = await response.json();
    dispatch(load(list));
  }
};
