import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CreateTripEffects } from "./createTrip/createTrip.effects";
import { createTripReducer } from "./createTrip/createTrip.reducers";
import { loadingReducer } from "./loading/loading.reducers";
import { LoginEffects } from "./login/login.effects";
import { loginReducer } from "./login/login.reducers";
import { RegisterEffects } from "./register/register.effects";
import { registerReducer } from "./register/register.reducers";
import { SignOutEffects } from "./signout/signout.effects";
import { signOutReducer } from "./signout/signout.reducers";

export const AppStoreModule = [
    StoreModule.forRoot([]),
    StoreModule.forFeature("loading", loadingReducer),
    StoreModule.forFeature("login", loginReducer),
    StoreModule.forFeature("register", registerReducer),
    StoreModule.forFeature("createTrip", createTripReducer),
    StoreModule.forFeature("signOut", signOutReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([
        LoginEffects,
        RegisterEffects,
        CreateTripEffects,
        SignOutEffects
    ])
]