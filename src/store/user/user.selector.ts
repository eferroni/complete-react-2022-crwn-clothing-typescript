import { UserState } from "./user.reducer";
import { RootState } from "../store";
import { createSelector } from "reselect";

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser
);

export const selectUserIsLoading = (state: RootState): boolean =>
  state.user.isLoading;
