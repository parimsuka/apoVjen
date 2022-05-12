import { createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppInitialState";
import { review, reviewFail, reviewResetState, reviewSuccess } from "./review.actions";
import { ReviewState } from "./ReviewState";

const initialState = AppInitialState.review;
const reducer = createReducer(initialState,
    on(review, currentState => {
        return {
            ...currentState,
            isReviewing: true,
            isReviewed: false
        }
    }),
    on(reviewSuccess, currentState => {
        return {
            ...currentState,
            isReviewing: false,
            isReviewed: true
        }
    }),
    on(reviewFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isReviewing: false,
            isReviewed: false
        }
    }),
    on(reviewResetState, () => {
        return initialState;
    })
);

export function reviewReducer(state: ReviewState, action) {
    return reducer(state, action);
}