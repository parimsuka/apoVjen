import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from "src/app/services/auth/auth.service";
import { of } from "rxjs";
import { changePassword, changePasswordFail, changePasswordSuccess } from "./changePassword.actions";

@Injectable()
export class ChangePasswordEffects {

    constructor(private actions$: Actions, private authService: AuthService) {

    }

    changePassword$ = createEffect(() => this.actions$.pipe(
        ofType(changePassword),
        switchMap((payload: {password: string}) => this.authService.changePassword(payload).pipe(
            map(() => changePasswordSuccess()),
            catchError(error => of(changePasswordFail({error})))
        ))
    ))
}