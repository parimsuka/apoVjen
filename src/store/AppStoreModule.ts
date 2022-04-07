import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ChangePasswordEffects } from "./changePassword/changePassword.effects";
import { changePasswordReducer } from "./changePassword/changePassword.reducers";
import { CreateTripEffects } from "./createTrip/createTrip.effects";
import { createTripReducer } from "./createTrip/createTrip.reducers";
import { EditProfileEffects } from "./editProfile/editProfile.effects";
import { editProfileReducer } from "./editProfile/editProfile.reducers";
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
    StoreModule.forFeature("editProfile", editProfileReducer),
    StoreModule.forFeature("changePassword", changePasswordReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([
        LoginEffects,
        RegisterEffects,
        CreateTripEffects,
        SignOutEffects,
        EditProfileEffects,
        ChangePasswordEffects
    ])
]