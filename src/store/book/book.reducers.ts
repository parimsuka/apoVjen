import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppInitialState";
import { book, bookFail, bookSuccess } from "./book.actions";
import { BookState } from "./BookState";

const initialState = AppInitialState.bookTrip;
const reducer = createReducer(initialState,
    on(book, currentState => {
        return {
            ...currentState,
            isBooking: true,
            isBooked: false
        }
    }),
    on(bookSuccess, currentState => {
        return {
            ...currentState,
            isBooking: false,
            isBooked: true
        }
    }),
    on(bookFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isBooking: false,
            isBooked: false
        }
    })
);

export function bookTripReducer(state: BookState, action) {
    return reducer(state, action);
}