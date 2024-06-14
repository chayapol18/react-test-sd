import { combineReducers } from '@reduxjs/toolkit';
import applicantSlice from './applicantSlice';

const rootReducer = combineReducers({
  applicant: applicantSlice,
});

export default rootReducer;