import { ChangePasswordState } from "./changePassword/ChangePasswordState";
import { CreateTripState } from "./createTrip/CreateTrip";
import { EditProfileState } from "./editProfile/EditProfileState";
import { LoadingState } from "./loading/LoadingState";
import { LoginState } from "./login/LoginState";
import { RegisterState } from "./register/RegisterState";
import { SignOutState } from "./signout/SignOutState";

export interface AppState {
    loading: LoadingState;
    login: LoginState;
    register: RegisterState;
    createTrip: CreateTripState;
    signOut: SignOutState;
    editProfile: EditProfileState;
    changePassword: ChangePasswordState;
}