import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { createTrip, createTripSuccess } from "./createTrip.actions";
import { CreateTripEffects } from "./createTrip.effects"
import { provideMockActions } from "@ngrx/effects/testing"
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "src/app/model/user/User";
import { Trip } from "src/app/model/trip/Trip";

describe('Create trip effects', () => {

    let effects: CreateTripEffects;
    let actions$: Observable<Action>;
    let error = {error: 'error'};
    let user = new User();
    user.id = 'anyUserId';

    let authServiceMock = {
        createTrip: (trip: Trip) => {
            return of(trip);
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot([]),
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([
                    CreateTripEffects
                ])
            ],
            providers: [
                provideMockActions(() => actions$)
            ]
        }).overrideProvider(AuthService, {useValue: authServiceMock});

        effects = TestBed.get(CreateTripEffects);
    })

    it('should create trip with valid data and return success', (done) => {
        actions$ = of(createTrip({
            trip: {
                id: 'anyId',
                time: '15:15',
                username: 'anyName',
                from: 'anyCity',
                to: 'anotherCity',
                availablePlaces: 42,
                bookedBy: []}
            }));

        effects.createTrip$.subscribe(newAction => {
            expect(newAction).toEqual(createTripSuccess());
            done();
        })
    })
})