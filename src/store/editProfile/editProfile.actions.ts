import { createAction, props } from "@ngrx/store";
import { UserRegister } from "src/app/model/user/UserRegister";

export const editProfile = createAction('[Edit Profile]', props<{userRegister: UserRegister}>());
export const editProfileSuccess = createAction('[Edit Profile] success');
export const editProfileFail = createAction('[Edit Profile] fail', props<{error: any}>());