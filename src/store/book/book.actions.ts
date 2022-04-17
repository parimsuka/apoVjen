import { createAction, props } from "@ngrx/store";

export const book = createAction("[Book]", props<{userID: string, tripID: string}>());
export const bookSuccess = createAction("[Book] success");
export const bookFail = createAction("[Book] fail", props<{error: any}>());

export const bookReset = createAction("[Book] reset");

export const unbook = createAction("[UnBook]", props<{userID: string, tripID: string}>());
export const unbookSuccess = createAction("[UnBook] success");
