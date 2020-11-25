import * as actionTypes from './actions';

const initialState = {
    addedCourses: [
    ],
    loggedInUser: {
        firstName: '',
        lastName: '',
        profilePicture: '',
    },
    snackBar: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_COURSE:
            return {
                ...state,
                addedCourses: [
                    ...state.addedCourses,
                    action.payload
                ],
            };
        case actionTypes.LOGIN:
            return {
                ...state,
                loggedInUser: {
                    firstName: action.firstName,
                    lastName: action.lastName,
                    profilePicture: action.profilePicture,
                }
            };
        case actionTypes.SNACKBAR:
            return {
                ...state,
                snackBar: action.snackBarOpenOrClose
            };
        default:
            return state;
    }
}

export default reducer;