import {
  LOAD_NOTIFICATIONS,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATIONS,
  REMOVE_ALL_NOTIFICATIONS,
} from "../notifications/notificationActionTypes";

const initialState = {};

function notifications(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      console.log("notificationReducer action.payload: ", action.payload);
      if (action.payload === null) {
        return { ...state };
      }
      const id = action.payload.id;
      return {
        ...state,
        [id]: { ...action.payload },
      };

    case LOAD_NOTIFICATIONS:
      if (action.payload === null) {
        return { ...state };
      }
      return {
        ...action.payload,
      };

    case REMOVE_NOTIFICATIONS:
      // Remove any notifications less than EOD today
      return {
        ...Object.keys(state)
          .filter((key) => key > action.payload.removeDateTime)
          .reduce((obj, key) => {
            obj[key] = state[key];
            return obj;
          }, {}),
      };
    case REMOVE_ALL_NOTIFICATIONS:
      return initialState;
    default:
      return state;
  }
}

export default notifications;
