import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppInitialState";
import { book, bookFail, bookReset, bookSuccess, unbook, unbookSuccess } from "./book.actions";
import { BookState } from "./BookState";

const initialState = AppInitialState.bookTrip;
const reducer = createReducer(initialState,
    on(book, currentState => {
        return {
            ...currentState,
            isBooking: true,
            isBooked: false,
            isUnBooked: false
        }
    }),
    on(bookSuccess, currentState => {
        return {
            ...currentState,
            isBooking: false,
            isBooked: true,
            isUnBooked: false
        }
    }),
    on(bookFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isBooking: false,
            isBooked: false,
            isUnBooked: false
        }
    }),
    on(unbookSuccess, currentState => {
        console.log('success');
        return {
            ...currentState,
            error: null,
            isBooking: false,
            isBooked: false,
            isUnBooked: true
        }
    }),
    on(unbook, currentState => {
        console.log('called');
        return {
            ...currentState,
            isBooking: true,
            isBooked: false,
            isUnBooked: false
        }
    }),
    on(bookReset, () => {
        return initialState;
    })
);

export function bookTripReducer(state: BookState, action) {
    return reducer(state, action);
}