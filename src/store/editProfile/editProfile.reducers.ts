import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppInitialState";
import { editProfile, editProfileFail, editProfileSuccess } from "./editProfile.actions";
import { EditProfileState } from "./EditProfileState";

const initialState = AppInitialState.editProfile;
const reducer = createReducer(initialState,
    on(editProfile, state => {
        return {
            ...state,
            error: null,
            isEditingProfile: true,
            isProfileEdited: false
        }
    }),
    on(editProfileSuccess, state => {
        return {
            ...state,
            isEditingProfile: false,
            isProfileEdited: true
        }
    }),
    on(editProfileFail, (state, action) => {
        return {
            ...state,
            error: action.error,
            isEditingProfile: false,
            isProfileEdited: false
        }
    })
);

export function editProfileReducer(state: EditProfileState, action) {
    return reducer(state, action);
}