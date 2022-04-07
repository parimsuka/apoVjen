import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from "src/app/services/auth/auth.service";
import { of } from "rxjs";
import { changeProfilePic, changeProfilePicFail, changeProfilePicSuccess } from "./changeProfilePic.actions";

@Injectable()
export class ChangeProfilePicEffects {

    constructor(private actions$: Actions, private authService: AuthService) {

    }

    changeProfilePic$ = createEffect(() => this.actions$.pipe(
        ofType(changeProfilePic),
        switchMap((payload: {img: File}) => this.authService.changeProfilePicture(payload).pipe(
            map(() => changeProfilePicSuccess()),
            catchError(error => of(changeProfilePicFail({error})))
        ))
    ))
}