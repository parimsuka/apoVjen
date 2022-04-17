import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from "rxjs";
import { book, bookFail, bookReset, bookSuccess, unbook, unbookSuccess } from "./book.actions";
import { BackendService } from "src/app/services/backend/backend.service";

@Injectable()
export class BookEffects {

    constructor(private actions$: Actions, private backEndService: BackendService) {

    }

    book$ = createEffect(() => this.actions$.pipe(
        ofType(book),
        switchMap((payload: {userID: string, tripID: string}) => this.backEndService.bookTrip(payload).pipe(
            map(() => bookSuccess()),
            catchError(error => of(bookFail({error})))
        ))
    ))

    unbook$ = createEffect(() => this.actions$.pipe(
        ofType(unbook),
        switchMap((payload: {userID: string, tripID: string}) => this.backEndService.unbookTrip(payload).pipe(
            map(() => unbookSuccess()),
            catchError(error => of(bookFail({error})))
        ))
    ))

    bookReset$ = createEffect(() => new Observable().pipe(
            map(() => bookReset()),
            catchError(error => of(bookFail({error})))
        ))

}