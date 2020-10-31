import merge from 'lodash/merge';
import { LOAD } from "../actions/task";
import { SET_CURRENT } from "../actions/current-proj";

export default function reducer(state = {}, action) {
  Object.freeze(state);

  switch (action.type) {
   /*  case LOAD: {
      const task = action.list.Tasks.map((proj) => ({ [proj.id]: proj }));
      return merge({}, state, ...task);
      return {
        ...state,
        ...action.list.Tasks
      }; */
    // }
    case SET_CURRENT: {
      const task = action.current.tasks.map((task) => ({ [task.id]: task }));
      return merge({}, state, ...task)
    };

    default:
      return state;
  }
}
