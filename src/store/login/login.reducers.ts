import { LoginState } from "./LoginState";
import { createReducer, on } from "@ngrx/store";
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { AppInitialState } from "../AppInitialState";

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(initialState,
    on(recoverPassword, currentState => {
        return {
            ...currentState,
            isRecoveredPassword: false,
            isRecoveringPassword: true,
        };
    }),
    on(recoverPasswordSuccess, currentState => {
        return {
            ...currentState,
            isRecoveredPassword: true,
            isRecoveringPassword: false,
        };
    }),
    on(recoverPasswordFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isRecoveredPassword: false,
            isRecoveringPassword: false,
        };
    })
)

export function loginReducer(state: LoginState, action) {
    return reducer(state, action);
}