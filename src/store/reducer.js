import { LOGIN_SUCCESS, LOGOUT } from './actions';

const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,  // Add role to the state
  id: null
};



const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:

      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        role: action.payload.role,  // Set the role
        id:action.payload.id
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        role: null,  // Reset the role
        id:null
      };
    default:

      return state;
  }
};

export default authReducer;
