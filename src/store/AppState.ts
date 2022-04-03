import { CreateTripState } from "./createTrip/CreateTrip";
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
}