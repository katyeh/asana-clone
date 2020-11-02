import { baseUrl } from '../../config';

const TOKEN_KEY = 'asana/authentication/token';
const SET_TOKEN = 'asana/authentication/SET_TOKEN';
const REMOVE_TOKEN = 'asana/authentication/REMOVE_TOKEN';

export const removeToken = (token) => ({ type: REMOVE_TOKEN });
export const setToken = (token) => ({ type: SET_TOKEN, token });

export const loadToken = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  const userId = window.localStorage.getItem("USER_ID");
  const loadUser = { token: token, user: { id: userId } };
  if (token) {
    dispatch(setToken(loadUser));
  }
};

export const signUp = (user) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/users`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const token = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    dispatch(setToken(token));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch(`${baseUrl}/session`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const user = await response.json();
    window.localStorage.setItem(TOKEN_KEY, user.token);
    window.localStorage.setItem("USER_ID", user.user.id);
    dispatch(setToken(user));
  }
};

export const logout = () => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/session`, {
    method: 'delete',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    window.localStorage.removeItem(TOKEN_KEY);
    dispatch(removeToken());
  }
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token.token,
        userId: action.token.user.id
      };
    }

    case REMOVE_TOKEN: {
      const newState = { ...state };
      delete newState.token;
      return newState;
    }

    default:
      return state;
  }
}
