import { createAction, props } from "@ngrx/store";

export const changePassword = createAction("[ChangePassword]", props<{currentPassword: string, newPassword: string}>());
export const changePasswordSuccess = createAction("[ChangePassword] success");
export const changePasswordFail = createAction("[ChangePassword] fail", props<{error: any}>());

export const changePasswordResetState = createAction("[ChangePassword] reset");