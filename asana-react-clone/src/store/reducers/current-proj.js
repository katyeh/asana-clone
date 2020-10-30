import { SET_CURRENT } from "../actions/current-proj";

export default function reducer(state = null, action) {
  switch (action.type) {
    case SET_CURRENT: {
      return action.current.id;
    }

    default:
      return state;
  }
}
