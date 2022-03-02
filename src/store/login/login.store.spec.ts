import { LoginState } from "./LoginState";
import { loginReducer } from "./login.reducers";
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { AppInitialState } from "../AppInitialState";

describe("Login store", () => {

    it("recover password", () => {
        const initialState: LoginState = AppInitialState.login;

        const newState = loginReducer(initialState, recoverPassword());

        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true,
        })
    })

    it("recover passwordSuccess", () => {
        const initialState: LoginState = AppInitialState.login;

        const newState = loginReducer(initialState, recoverPasswordSuccess());

        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: true,
            isRecoveringPassword: false,
        })
    })

    it("recover passwordFail", () => {
        const initialState: LoginState = AppInitialState.login;

        const error = {error: 'error'};
        const newState = loginReducer(initialState, recoverPasswordFail({error}));

        expect(newState).toEqual({
            ...initialState,
            error,
            isRecoveredPassword: false,
            isRecoveringPassword: false,
        })
    })

})