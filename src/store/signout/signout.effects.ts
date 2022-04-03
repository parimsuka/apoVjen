import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from "src/app/services/auth/auth.service";
import { of } from "rxjs";
import { signOut, signOutFail, signOutSuccess } from "./signout.actions";

@Injectable()
export class SignOutEffects {

    constructor(private actions$: Actions, private authService: AuthService) {

    }

    signOut$ = createEffect(() => this.actions$.pipe(
        ofType(signOut),
        switchMap(() => this.authService.signOut().pipe(
            map(() => signOutSuccess()),
            catchError(error => of(signOutFail({error})))
        ))
    ))

}