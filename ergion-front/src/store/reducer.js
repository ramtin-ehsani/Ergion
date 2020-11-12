import * as actionTypes from './actions';

// import myimg from '../Pics/math.jpg';
// import myimg2 from '../Pics/physics.jpg';
// import myimg3 from '../Pics/lit.jpg';
// import myimg4 from '../Pics/cl.jpg';

const initialState = {
    addedCourses: [
        // { id: '123', name:'ریاضی 1', image:myimg, link:'/riazi1', teacher:'استاد علیپور'},
        // { id: '125', name:'ادبیات 1', image:myimg3, link:'/adabiat1', teacher:'استاد رضایی'},
        // { id: '126', name:'فیزیک 2', image:myimg2, link:'/phisic2', teacher:'استاد غلامی'},
        // { id: '127', name:'ریاضی 3', image:myimg4, link:'/riazi3', teacher:'استاد علیپور'},
        // { id: '129', name:'ریاضی 1', image:myimg, link:'/riazi1', teacher:'استاد جعفری'},
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