import merge from 'lodash/merge';
import { LOAD, ADDPROJECT } from "../actions/project";
import { SET_CURRENT } from "../actions/current-proj";

export default function reducer(state = {}, action) {
  Object.freeze(state);

  switch (action.type) {
    case LOAD: {
      const project = action.list.Projects.map((proj) => ({ [proj.id]: proj }));
      return merge({}, state, ...project);
      return {
        ...state,
        ...action.list.Projects
      };
    }
    case ADDPROJECT: {
      return {
        ...state,
        [action.project.id]: action.project,
      };
    }
    case SET_CURRENT: {
      return {
        ...state,
        [action.current.project.id]: action.current.project,
      };
    }

    default:
      return state;
  }
}

// const projectsReducer = (state = {}, action) => {
//   Object.freeze(state);
//   switch (action.type) {
//     case RECEIVE_PROJECTS:
//       return action.projects;
//     case RECEIVE_PROJECT:
//       return merge({}, state, { [action.project.id]: action.project });
//     case REMOVE_PROJECT:
//       let newState = merge({}, state);
//       delete newState[action.projectId];
//       return newState;
//     default:
//       return state;
//   }
// };

// export default projectsReducer;
