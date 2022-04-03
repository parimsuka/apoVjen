import { createAction, props } from "@ngrx/store";

export const signOut = createAction("[SignOut]");
export const signOutSuccess = createAction("[SignOut] success");
export const signOutFail = createAction("[SignOut] fail", props<{error: any}>());