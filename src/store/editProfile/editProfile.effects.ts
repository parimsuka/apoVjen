import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from "rxjs";
import { UserRegister } from "src/app/model/user/UserRegister";
import { editProfile, editProfileFail, editProfileSuccess } from "./editProfile.actions";
import { AuthService } from "src/app/services/auth/auth.service";

@Injectable()
export class EditProfileEffects {

    constructor(private actions$: Actions, private authService: AuthService) {

    }

    editProfile$ = createEffect(() => this.actions$.pipe(
        ofType(editProfile),
        switchMap((payload: {userRegister: UserRegister}) => this.authService.editProfile(payload.userRegister).pipe(
            map(user => editProfileSuccess()),
            catchError(error => of(editProfileFail({error})))
        ))
    ))

}