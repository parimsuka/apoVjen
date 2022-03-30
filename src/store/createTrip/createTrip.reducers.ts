import { CreateTripState } from "./CreateTrip";
import { createReducer, on } from "@ngrx/store";
import { createTrip, createTripFail, createTripSuccess } from "./createTrip.actions";
import { AppInitialState } from "../AppInitialState";

const initialState: CreateTripState = AppInitialState.createTrip;

const reducer = createReducer(initialState,
    on(createTrip, currentState => {
        return {
            ...currentState,
            isCreating: true,
            isCreated: false
        };
    }),
    on(createTripSuccess, currentState => {
        return {
            ...currentState,
            isCreating: false,
            isCreated: true
        };
    }),
    on(createTripFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isCreating: false,
            isCreated: false
        };
    })
)

export function createTripReducer(state: CreateTripState, action) {
    return reducer(state, action);
}