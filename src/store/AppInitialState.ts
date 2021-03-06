import { AppState } from "./AppState";

export const AppInitialState: AppState = {
    loading: {
        show: false
    },
    login: {
        error: null,
        isRecoveredPassword: false,
        isRecoveringPassword: false,
        isLoggedIn: false,
        isLoggingIn: false
    },
    register: {
        error: null,
        isRegistering: false,
        isRegistered: false
    },
    createTrip: {
        error: null,
        isCreating: false,
        isCreated: false
    },
    signOut: {
        error: null,
        isSigningOut: false,
        isSignedOut: true
    },
    editProfile: {
        error: null,
        isEditingProfile: false,
        isProfileEdited: false
    },
    changePassword: {
        error: null,
        isChangingPassword: false,
        isPasswordChanged: false
    },
    changeProfilePic: {
        error: null,
        isChangingProfilePic: false,
        isProfilePicChanged: false
    },
    bookTrip: {
        error: null,
        isBooking: false,
        isBooked: false,
        isUnBooked: false
    },
    review: {
        error: null,
        isReviewing: false,
        isReviewed: false
    }
}