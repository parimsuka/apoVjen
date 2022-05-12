import { createAction, props } from "@ngrx/store";
import { Review } from "src/app/model/review/Review";

export const review = createAction("[Review]", props<{review: Review}>());
export const reviewSuccess = createAction("[Review] success");
export const reviewFail = createAction("[Review] fail", props<{error: any}>());

export const reviewResetState = createAction("[Review] reset");