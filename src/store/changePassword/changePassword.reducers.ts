import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppInitialState";
import { changePassword, changePasswordFail, changePasswordResetState, changePasswordSuccess } from "./changePassword.actions";
import { ChangePasswordState } from "./ChangePasswordState";

const initialState = AppInitialState.changePassword;
const reducer = createReducer(initialState,
    on(changePassword, currentState => {
        return {
            ...currentState,
            isChangingPassword: true,
            isPasswordChanged: false
        }
    }),
    on(changePasswordSuccess, currentState => {
        return {
            ...currentState,
            isChangingPassword: false,
            isPasswordChanged: true
        }
    }),
    on(changePasswordFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isChangingPassword: false,
            isPasswordChanged: false
        }
    }),
    on(changePasswordResetState, () => {
        return initialState;
    })
);

export function changePasswordReducer(state: ChangePasswordState, action) {
    return reducer(state, action);
}