import { CreateTripState } from "./CreateTrip";
import { createTripReducer } from "./createTrip.reducers";
import { createTrip, createTripFail, createTripSuccess } from "./createTrip.actions";
import { AppInitialState } from "../AppInitialState";

describe("Create trip store", () => {

    it("Create trip", () => {
        const initialState: CreateTripState = AppInitialState.createTrip;

        const newState = createTripReducer(initialState, createTrip({
            trip: {
                id: 'anyId',
                time: '15:15',
                username: 'anyName',
                from: 'anyCity',
                to: 'anotherCity',
                availablePlaces: 42,
                bookedBy: []}
            }));

        expect(newState).toEqual({
            ...initialState,
            error: null,
            isCreating: true,
            isCreated: false,
        })
    })

    it("Create trip success", () => {
        const initialState: CreateTripState = AppInitialState.createTrip;

        const newState = createTripReducer(initialState, createTripSuccess());

        expect(newState).toEqual({
            ...initialState,
            error: null,
            isCreating: false,
            isCreated: true,
        })
    })

    it("Create trip fail", () => {
        const initialState: CreateTripState = AppInitialState.createTrip;

        const error = {error: 'error'};
        const newState = createTripReducer(initialState, createTripFail({error}));

        expect(newState).toEqual({
            ...initialState,
            error,
            isCreating: false,
            isCreated: false,
        })
    })

})