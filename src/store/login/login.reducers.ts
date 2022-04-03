import { LoginState } from "./LoginState";
import { createReducer, on } from "@ngrx/store";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess, signOut, signOutFail, signOutSuccess } from "./login.actions";
import { AppInitialState } from "../AppInitialState";

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(initialState,
    on(recoverPassword, currentState => {
        return {
            ...currentState,
            isRecoveredPassword: false,
            isRecoveringPassword: true,
            isSigningOut: false
        };
    }),
    on(recoverPasswordSuccess, currentState => {
        return {
            ...currentState,
            isRecoveredPassword: true,
            isRecoveringPassword: false,
            isSigningOut: false
        };
    }),
    on(recoverPasswordFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isRecoveredPassword: false,
            isRecoveringPassword: false,
            isSigningOut: false
        };
    }),
    on(login, currentState => {
        return {
            ...currentState,
            error: null,
            isLoggedIn: false,
            isLoggingIn: true,
            isSigningOut: false
        }
    }),
    on(loginSuccess, (currentState, user) => {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        return {
            ...currentState,
            error: null,
            isLoggedIn: true,
            isLoggingIn: false,
            isSigningOut: false
        }
    }),
    on(loginFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isLoggedIn: false,
            isLoggingIn: false,
            isSigningOut: false
        }
    }),
    on(signOut, currentState => {
        return {
            ...currentState,
            isLoggedIn: true,
            isLoggingIn: false,
            isSigningOut: true
        }
    }),
    on(signOutSuccess, currentState => {
        return {
            ...currentState,
            isLoggedIn: false,
            isLoggingIn: false,
            isSigningOut: false
        }
    }),
    on(signOutFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isLoggedIn: true,
            isLoggingIn: false,
            isSigningOut: false
        }
    })
)

export function loginReducer(state: LoginState, action) {
    return reducer(state, action);
}