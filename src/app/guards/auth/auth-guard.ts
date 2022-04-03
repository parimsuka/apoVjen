import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AppState } from 'src/store/AppState';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private store: Store<AppState>, private router: Router) { }

  canLoad(): Observable<boolean> {
    return this.store.select('login').pipe(
      take(1),
      switchMap(loginState => {
        if(loginState.isLoggedIn || localStorage.getItem('loggedInUser') !== null) {
          return of(true);
        }

        this.router.navigateByUrl('login');
        return of(false);
      })
    )
  }
}
