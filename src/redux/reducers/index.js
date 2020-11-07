import { combineReducers } from "redux";
import decks from "../decks/deckReducer";
import notifications from "../notifications/notificationReducer";

export default combineReducers({ decks, notifications });
