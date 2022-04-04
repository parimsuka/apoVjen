import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing"
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "src/app/model/user/User";
import { UserRegister } from "src/app/model/user/UserRegister";

describe('Login effects', () => {

    // let effects: RegisterEffects;
    // let actions$: Observable<Action>;
    // let error = {error: 'error'};
    // let user = new User();
    // user.id = 'anyUserId';

    // let authServiceMock = {
    //     register(userRegister: UserRegister) {
    //         if (userRegister.email == "error@email.com") {
    //             return throwError(error);
    //         }
    //         return of({});
    //     }
    // }

    // beforeEach(() => {
    //     TestBed.configureTestingModule({
    //         imports: [
    //             StoreModule.forRoot([]),
    //             EffectsModule.forRoot([]),
    //             EffectsModule.forFeature([
    //                 RegisterEffects
    //             ])
    //         ],
    //         providers: [
    //             provideMockActions(() => actions$)
    //         ]
    //     }).overrideProvider(AuthService, {useValue: authServiceMock});

    //     effects = TestBed.get(RegisterEffects);
    // })

    // it('should register return success', (done) => {
    //     actions$ = of(register({userRegister: new UserRegister()}));

    //     effects.register$.subscribe(newAction => {
    //         expect(newAction).toEqual(registerSuccess());
    //         done();
    //     })
    // })

    // it('should register return an error', (done) => {
    //     const userRegister = new UserRegister();
    //     userRegister.email = "error@email.com";

    //     actions$ = of(register({userRegister}));

    //     effects.register$.subscribe(newAction => {
    //         expect(newAction).toEqual(registerFail({error}));
    //         done();
    //     })
    // })

})