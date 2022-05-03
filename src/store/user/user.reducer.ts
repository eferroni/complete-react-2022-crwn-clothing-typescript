import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import {
  emailSignInStart,
  googleSignInStart,
  signInFailed,
  signInSuccess,
  signOutFail,
  signOutStart,
  signOutSuccess,
  signUpFail,
  signUpStart,
  signUpSuccess,
} from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): UserState => {
  // SIGN IN
  if (emailSignInStart.match(action) || googleSignInStart.match(action)) {
    return { ...state, isLoading: true, error: null };
  }
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload, isLoading: false };
  }
  if (signInFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  // SIGN UP
  if (signUpStart.match(action)) {
    return { ...state, isLoading: true, error: null };
  }
  if (signUpSuccess.match(action)) {
    return { ...state, isLoading: false };
  }
  if (signUpFail.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  // SIGN OUT
  if (signOutStart.match(action)) {
    return { ...state, isLoading: true, error: null };
  }
  if (signOutSuccess.match(action)) {
    return { ...state, isLoading: false, currentUser: null };
  }
  if (signOutFail.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }
  return state;
};
