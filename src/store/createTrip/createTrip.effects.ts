import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createTrip, createTripFail, createTripSuccess } from "./createTrip.actions";
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from "rxjs";
import { Trip } from "src/app/model/trip/Trip";
import { BackendService } from "src/app/services/backend/backend.service";

@Injectable()
export class CreateTripEffects {

    constructor(private actions$: Actions, private backEndService: BackendService) {

    }

    createTrip$ = createEffect(() => this.actions$.pipe(
        ofType(createTrip),
        switchMap((payload: {trip: Trip}) => this.backEndService.createTrip(payload.trip).pipe(
            map(() => createTripSuccess()),
            catchError(error => of(createTripFail({error})))
        ))
    ))

}