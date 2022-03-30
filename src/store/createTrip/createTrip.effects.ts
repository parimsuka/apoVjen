import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createTrip, createTripFail, createTripSuccess } from "./createTrip.actions";
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from "src/app/services/auth/auth.service";
import { of } from "rxjs";
import { Trip } from "src/app/model/trip/Trip";

@Injectable()
export class CreateTripEffects {

    constructor(private actions$: Actions, private authService: AuthService) {

    }

    createTrip$ = createEffect(() => this.actions$.pipe(
        ofType(createTrip),
        switchMap((payload: {trip: Trip}) => this.authService.createTrip(payload.trip).pipe(
            map(() => createTripSuccess()),
            catchError(error => of(createTripFail({error})))
        ))
    ))

}