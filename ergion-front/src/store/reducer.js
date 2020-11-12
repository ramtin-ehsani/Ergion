import * as actionTypes from './actions';

const initialState = {
    addedCourses: [
    ],
    loggedInUser: {
        firstName: '',
        lastName: '',
        email: '',
        profilePicture: '',
        grade: 1,
    },
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
                    ...state.loggedInUser,
                    firstName: action.firstName,
                    lastName: action.lastName,
                    email: action.email,
                    profilePicture: action.profilePicture,
                    grade: action.grade,
                }
            };
        default:
            return state;
    }
}

export default reducer;