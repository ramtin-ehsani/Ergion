import * as actionTypes from './actions';

const initialState = {
    addedCourses: [
    ],
    loggedInUser: {
        firstName: '',
        lastName: '',
        profilePicture: '',
    },
<<<<<<< HEAD
    snackBar: false,
=======
    replies: {

    },
    comments: [

    ],
    likes: {

    },
    open: {

    },
>>>>>>> 68f93a2ae928ed705c48838832f3e59fd4aa6087
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
        case actionTypes.REPLY:
            return {
                ...state,
                replies: {
                    ...state.replies,
                    [action.id] : action.payload
                }
            }
        case actionTypes.ADD_COMMENT:
            return {
                ...state,
                comments:[
                    ...state.comments,
                    action.payload
                ]
            }
        case actionTypes.LIKE_COMMENT:
            return {
                ...state,
                likes:{
                    ...state.likes,
                    [action.id] : action.like
                }
            }
        case actionTypes.OPEN_REPLAY:
            return {
                ...state,
                open: {
                    ...state.open,
                    [action.id] : action.open
                }
            }
        default:
            return state;
    }
}

export default reducer;