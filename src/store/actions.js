export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const SET_DOCUMENT_INFO = 'SET_DOCUMENT_INFO';
export const CLEAR_DOCUMENT_INFO = 'CLEAR_DOCUMENT_INFO';


export const loginSuccess = (user, role,id) => ({
  type: LOGIN_SUCCESS,
  payload: { user, role ,id},
});

export const logout = () => ({
  type: LOGOUT,
});



export const setDocumentInfo = (documentRef, revNo,historyRef,date) => ({
  type: SET_DOCUMENT_INFO,
  payload: { documentRef, revNo,historyRef,date },
});

export const clearDocumentInfo = () => ({
  type: CLEAR_DOCUMENT_INFO,
});
