import * as actionTypes from './actions';

const initialState = {
    addedCourses:[
    ],
    loggedInUser:{
        firstName:'',
        lastName: '',
        email:'',
    },
};

const reducer = (state= initialState, action)=>{
    switch(action.type){
        case actionTypes.ADD_COURSE:
            return{
                ...state,
                addedCourses:[
                    ...state.addedCourses,
                    action.payload
                ],
            };
        case actionTypes.LOGIN:
            return{
                ...state,
                addedCourses:[

                ],
                loggedInUser:{
                    firstName: action.firstName,
                    lastName: action.lastName,
                    email: action.email
                }
            };
        default:
            return state;
    }
}

export default reducer;