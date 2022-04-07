import { createAction, props } from "@ngrx/store";

export const changeProfilePic = createAction("[ChangeProfilePic]", props<{img: File}>());
export const changeProfilePicSuccess = createAction("[ChangeProfilePic] success");
export const changeProfilePicFail = createAction("[ChangeProfilePic] fail", props<{error: any}>());