import { createAction, props } from "@ngrx/store";
import { Trip } from "src/app/model/trip/Trip";

export const createTrip = createAction("[Create]", props<{trip: Trip}>());
export const createTripSuccess = createAction("[Create] success");
export const createTripFail = createAction("[Create] fail", props<{error: any}>());