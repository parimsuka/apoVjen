import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from 'rxjs/operators';
import { Review } from "src/app/model/review/Review";
import { BackendService } from "src/app/services/backend/backend.service";
import { review, reviewFail, reviewResetState, reviewSuccess } from "./review.actions";

@Injectable()
export class ReviewEffects {

    constructor(private actions$: Actions, private backEndService: BackendService) {

    }

    review$ = createEffect(() => this.actions$.pipe(
        ofType(review),
        switchMap((payload: {review: Review}) => this.backEndService.addReview(payload.review).pipe(
            map(() => reviewSuccess(), reviewResetState()),
            catchError(error => of(reviewFail({error}), reviewResetState()))
        ))
    ))

}