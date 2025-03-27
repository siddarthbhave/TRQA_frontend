// documentReducer.js

import { SET_DOCUMENT_INFO, CLEAR_DOCUMENT_INFO } from './actions';

// Initial state for the document reducer
const initialDocumentState = {
  documentRef: null,
  date: null,
  revNo: null,
  historyRef: null
};

// Utility function to load state from localStorage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('documentInfo');
    if (serializedState === null) {
      return initialDocumentState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return initialDocumentState;
  }
};

// Utility function to save state to localStorage
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('documentInfo', serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

// Initial state loaded from localStorage
const persistedState = loadStateFromLocalStorage();

// Document reducer
const documentReducer = (state = persistedState, action) => {
  switch (action.type) {
    case SET_DOCUMENT_INFO:
      const updatedState = {
        ...state,
        documentRef: action.payload.documentRef,
      
        revNo: action.payload.revNo,
        historyRef: action.payload.historyRef,
          date: action.payload.date,
      };
      saveStateToLocalStorage(updatedState); // Save to localStorage
      return updatedState;

    case CLEAR_DOCUMENT_INFO:
      const clearedState = {
        ...state,
        documentRef: null,
     
        revNo: null,
        historyRef: null,
           date: null,
      };
      saveStateToLocalStorage(clearedState); // Save to localStorage
      return clearedState;

    default:
      return state;
  }
};

export default documentReducer;
