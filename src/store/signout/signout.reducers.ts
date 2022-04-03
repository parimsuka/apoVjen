import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppInitialState";
import { signOut, signOutFail, signOutSuccess } from "./signout.actions";
import { SignOutState } from "./SignOutState";

const initialState = AppInitialState.signOut;
const reducer = createReducer(initialState,
    on(signOut, currentState => {
        return {
            ...currentState,
            isSigningOut: true,
            isSignedOut: false
        }
    }),
    on(signOutSuccess, currentState => {
        localStorage.removeItem('loggedInUser');
        return {
            ...currentState,
            isSigningOut: false,
            isSignedOut: true
        }
    }),
    on(signOutFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isSigningOut: false,
            isSignedOut: false
        }
    })
);

export function signOutReducer(state: SignOutState, action) {
    return reducer(state, action);
}