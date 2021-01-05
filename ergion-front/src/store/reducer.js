import * as actionTypes from "./actions";

const initialState = {
  addedCourses: [],
  loggedInUser: {
    firstName: "",
    lastName: "",
    profilePicture: "",
  },
  qSnackBar: false,
  snackBar: false,
  replies: {},
  comments: [],
  likes: {},
  open: {},
  nCommentString: {},
  courseUnansweredQuestionsList: [],
  snackBarQ: false,
  snackBarCopyLink: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COURSE:
      return {
        ...state,
        addedCourses: [...state.addedCourses, action.payload],
      };
    case actionTypes.LOGIN:
      return {
        ...state,
        loggedInUser: {
          firstName: action.firstName,
          lastName: action.lastName,
          profilePicture: action.profilePicture,
        },
      };
    case actionTypes.SNACKBAR:
      return {
        ...state,
        snackBar: action.snackBarOpenOrClose,
      };
    case actionTypes.REPLY:
      return {
        ...state,
        replies: {
          ...state.replies,
          [action.id]: action.payload,
        },
      };
    case actionTypes.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case actionTypes.LIKE_COMMENT:
      return {
        ...state,
        likes: {
          ...state.likes,
          [action.id]: action.like,
        },
      };
    case actionTypes.OPEN_REPLAY:
      return {
        ...state,
        open: {
          ...state.open,
          [action.id]: action.open,
        },
      };
    case actionTypes.NEW_COMMENT_TEXT:
      return {
        ...state,
        nCommentString: {
          ...state.nCommentString,
          [action.id]: action.txt,
        },
      };
    case actionTypes.SNACKBAR_NEW_Q:
      return {
        ...state,
        snackBarQ: action.snackBarOpenOrClose,
      };
    case actionTypes.COURSE_UNANSWERED_QUESTIONS_LIST:
      return {
        ...state,
        courseUnansweredQuestionsList: [
          ...state.courseUnansweredQuestionsList,
          action.addToList,
        ],
      };
    case actionTypes.CHANGE_COURSE_UNANSWERED_QUESTIONS_LIST:
      return {
        ...state,
        courseUnansweredQuestionsList: state.courseUnansweredQuestionsList.map(
          (item, i) => (i === action.index ? action.addToList : item)
        ),
      };
    case actionTypes.QSNACKBAR:
      return {
        ...state,
        qSnackBar: action.qSnackBarOpenOrClose,
      };
    case actionTypes.SNACKBAR_COPY_LINK:
      return {
        ...state,
        snackBarCopyLink: action.snackBarOpenOrClose,
      };
    default:
      return state;
  }
};

export default reducer;
