import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppInitialState";
import { changeProfilePic, changeProfilePicFail, changeProfilePicSuccess } from "./changeProfilePic.actions";
import { ChangeProfilePicState } from "./ChangeProfilePicState";

const initialState = AppInitialState.changeProfilePic;
const reducer = createReducer(initialState,
    on(changeProfilePic, currentState => {
        return {
            ...currentState,
            isChangingProfilePic: true,
            isProfilePicChanged: false
        }
    }),
    on(changeProfilePicSuccess, currentState => {
        return {
            ...currentState,
            isChangingProfilePic: false,
            isProfilePicChanged: true
        }
    }),
    on(changeProfilePicFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isChangingProfilePic: false,
            isProfilePicChanged: false
        }
    })
);

export function changeProfilePicReducer(state: ChangeProfilePicState, action) {
    return reducer(state, action);
}